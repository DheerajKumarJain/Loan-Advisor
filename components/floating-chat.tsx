"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useChat } from "ai/react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Send,
  Mic,
  MicOff,
  Globe,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  X,
  MessageSquare,
  RotateCcw,
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { languageCodes } from "@/lib/sarvam-api"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
import type { ConversationState } from "@/lib/conversation-manager"

interface FloatingChatProps {
  initialOpen?: boolean
  initialPrompt?: string
}

export default function FloatingChat({ initialOpen = false, initialPrompt = "" }: FloatingChatProps) {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const [isMinimized, setIsMinimized] = useState(false)
  const [language, setLanguage] = useState("english")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [sentiment, setSentiment] = useState<{ score: number; label: string } | null>(null)
  const [conversationState, setConversationState] = useState<ConversationState>({ stage: "greeting" })
  const [isExpanded, setIsExpanded] = useState(false)
  const recognitionRef = useRef<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput, setMessages } = useChat({
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "Hey, what can I help you with today?",
      },
    ],
    body: {
      language,
      conversationState,
    },
    onFinish: (message) => {
      // Check if the message contains conversation state information
      if (message.content.includes("conversation-state")) {
        try {
          // Extract and parse the conversation state
          const stateMatch = message.content.match(/conversation-state.*?({.*})/)
          if (stateMatch && stateMatch[1]) {
            const stateData = JSON.parse(stateMatch[1])
            setConversationState(stateData.state)

            // Remove the state information from the displayed message
            const cleanedContent = message.content.replace(/conversation-state.*?({.*})/, "").trim()

            // Update the message with cleaned content
            setMessages((prev) =>
              prev.map((msg) => (msg.id === message.id ? { ...msg, content: cleanedContent } : msg)),
            )
          }
        } catch (error) {
          console.error("Error parsing conversation state:", error)
        }
      }
    },
    onResponse: (response) => {
      // Parse the streamed response for conversation state updates
      const reader = response.body?.getReader()
      if (!reader) return

      const decoder = new TextDecoder()

      const processStream = async () => {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n").filter((line) => line.trim() !== "")

          for (const line of lines) {
            try {
              const data = JSON.parse(line)
              if (data.type === "conversation-state" && data.state) {
                setConversationState(data.state)
              }
            } catch (e) {
              // Not JSON or not the data we're looking for
            }
          }
        }
      }

      processStream().catch(console.error)
    },
  })

  // Handle initial prompt
  useEffect(() => {
    if (initialPrompt && initialOpen) {
      setInput(initialPrompt)
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent<HTMLFormElement>
      setTimeout(() => {
        handleSubmit(fakeEvent)
      }, 500)
    }
  }, [initialPrompt, initialOpen, setInput, handleSubmit])

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Set up speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join("")

        setTranscript(transcript)
        setInput(transcript)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error)
        setIsListening(false)
        toast({
          title: "Voice Recognition Error",
          description: `Error: ${event.error}. Please try again.`,
          variant: "destructive",
        })
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [setInput])

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.onended = () => {
      setIsSpeaking(false)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Analyze sentiment when user sends a message
  useEffect(() => {
    const analyzeUserMessage = async () => {
      if (messages.length > 0 && messages[messages.length - 1].role === "user") {
        try {
          const response = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: messages[messages.length - 1].content }),
          })

          if (response.ok) {
            const data = await response.json()
            if (data.sentiment) {
              setSentiment({
                score: data.sentiment.score,
                label: data.sentiment.score < -0.3 ? "negative" : data.sentiment.score > 0.3 ? "positive" : "neutral",
              })
            }
          }
        } catch (error) {
          console.error("Error analyzing sentiment:", error)
        }
      }
    }

    analyzeUserMessage()
  }, [messages])

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser doesn't support voice recognition. Please use a modern browser like Chrome.",
        variant: "destructive",
      })
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
      setTranscript("")
      setInput("")
    }
  }

  const speakMessage = async (text: string) => {
    if (isSpeaking && audioRef.current) {
      audioRef.current.pause()
      setIsSpeaking(false)
      return
    }

    try {
      setIsSpeaking(true)

      const langCode = languageCodes[language]?.code || "en"
      const voice = languageCodes[language]?.voice || "en-IN"

      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language: langCode, voice }),
      })

      if (!response.ok) {
        throw new Error("Failed to convert text to speech")
      }

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)

      if (audioRef.current) {
        audioRef.current.src = audioUrl
        audioRef.current.play()
      }
    } catch (error) {
      console.error("Error speaking message:", error)
      setIsSpeaking(false)
      toast({
        title: "Text-to-Speech Error",
        description: "Failed to speak the message. Please try again.",
        variant: "destructive",
      })
    }
  }

  const translateMessage = async (text: string, targetLanguage: string) => {
    try {
      const langCode = languageCodes[targetLanguage]?.code
      if (!langCode) {
        throw new Error(`Unsupported language: ${targetLanguage}`)
      }

      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLanguage: langCode }),
      })

      if (!response.ok) {
        throw new Error("Translation failed")
      }

      const data = await response.json()
      return data.translatedText
    } catch (error) {
      console.error("Translation error:", error)
      toast({
        title: "Translation Error",
        description: "Failed to translate the message. Please try again.",
        variant: "destructive",
      })
      return text // Return original text if translation fails
    }
  }

  const getSentimentColor = () => {
    if (!sentiment) return "bg-gray-200"

    if (sentiment.label === "positive") return "bg-green-500"
    if (sentiment.label === "negative") return "bg-red-500"
    return "bg-yellow-500"
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setIsMinimized(false)
    }
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const resetConversation = () => {
    setConversationState({ stage: "greeting" })
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hey, what can I help you with today?",
      },
    ])
  }

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={toggleChat}
          className="rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-primary to-secondary"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </motion.div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`fixed ${isExpanded ? "bottom-0 right-0 left-0 md:left-auto md:right-6 md:bottom-6 md:w-[500px]" : "bottom-6 right-6 w-96"} z-50 transition-all duration-300 ease-in-out ${isMinimized ? "w-72" : ""}`}
      >
        <Card className="border-primary/20 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-primary to-secondary p-3">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary-foreground text-primary text-xs">AI</AvatarFallback>
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=AI" />
              </Avatar>
              <CardTitle className="text-primary-foreground text-sm">Loan Advisor</CardTitle>
            </div>
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={resetConversation}
                      className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/20"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">Reset Conversation</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleExpand}
                      className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/20"
                    >
                      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">{isExpanded ? "Collapse" : "Expand"}</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMinimize}
                      className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/20"
                    >
                      {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">{isMinimized ? "Expand" : "Minimize"}</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleChat}
                      className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">Close</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <div className="flex items-center justify-between px-3 py-2 bg-muted/50">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-[180px] h-8 text-xs">
                    <Globe className="mr-2 h-3 w-3" />
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(languageCodes).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.nativeName} ({key})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {sentiment && (
                  <Badge variant="outline" className="text-xs flex items-center gap-1">
                    Sentiment:
                    <span className={`inline-block w-2 h-2 rounded-full ${getSentimentColor()}`}></span>
                    {sentiment.label}
                  </Badge>
                )}
              </div>

              <CardContent className="p-0">
                <ScrollArea className={`${isExpanded ? "h-[500px] md:h-[600px]" : "h-[350px]"} p-3`}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex mb-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <Avatar className="mr-2 mt-1 flex-shrink-0 h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">AI</AvatarFallback>
                          <AvatarImage src="/placeholder.svg?height=32&width=32&text=AI" />
                        </Avatar>
                      )}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`px-3 py-2 rounded-lg max-w-[75%] ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-tr-none"
                            : "bg-muted rounded-tl-none"
                        }`}
                      >
                        {message.content}
                        {message.role === "assistant" && (
                          <div className="flex gap-1 mt-1 opacity-70">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => speakMessage(message.content)}
                              className="h-5 w-5 hover:opacity-100"
                            >
                              {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                            </Button>

                            {language === "english" && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={async () => {
                                        // Get a random Indian language that's not English
                                        const indianLanguages = Object.keys(languageCodes).filter(
                                          (l) => l !== "english",
                                        )
                                        const randomLang =
                                          indianLanguages[Math.floor(Math.random() * indianLanguages.length)]

                                        const translated = await translateMessage(message.content, randomLang)
                                        toast({
                                          title: `Translated to ${languageCodes[randomLang].nativeName}`,
                                          description: translated,
                                        })
                                      }}
                                      className="h-5 w-5 hover:opacity-100"
                                    >
                                      <Globe className="h-3 w-3" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="top">Translate to regional language</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        )}
                      </motion.div>
                      {message.role === "user" && (
                        <Avatar className="ml-2 mt-1 flex-shrink-0 h-8 w-8">
                          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                            You
                          </AvatarFallback>
                          <AvatarImage src="/placeholder.svg?height=32&width=32&text=You" />
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start mb-4">
                      <Avatar className="mr-2 mt-1 flex-shrink-0 h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">AI</AvatarFallback>
                        <AvatarImage src="/placeholder.svg?height=32&width=32&text=AI" />
                      </Avatar>
                      <div className="px-3 py-2 rounded-lg max-w-[75%] bg-muted rounded-tl-none">
                        <div className="flex space-x-2">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-primary/60"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 rounded-full bg-primary/60"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.15 }}
                          />
                          <motion.div
                            className="w-2 h-2 rounded-full bg-primary/60"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.3 }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {isListening && (
                    <div className="flex justify-end mb-4">
                      <div className="px-3 py-2 rounded-lg max-w-[75%] bg-accent text-accent-foreground rounded-tr-none">
                        <div className="flex items-center">
                          <div className="mr-2 text-sm">Listening...</div>
                          <div className="flex space-x-1">
                            <motion.div
                              className="w-1.5 h-1.5 rounded-full bg-accent-foreground"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, delay: 0 }}
                            />
                            <motion.div
                              className="w-1.5 h-1.5 rounded-full bg-accent-foreground"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, delay: 0.5 }}
                            />
                            <motion.div
                              className="w-1.5 h-1.5 rounded-full bg-accent-foreground"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, delay: 1 }}
                            />
                          </div>
                        </div>
                        {transcript && <div className="mt-1 text-sm">{transcript}</div>}
                      </div>
                      <Avatar className="ml-2 mt-1 flex-shrink-0 h-8 w-8">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">You</AvatarFallback>
                        <AvatarImage src="/placeholder.svg?height=32&width=32&text=You" />
                      </Avatar>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>

              <CardFooter className="border-t p-3">
                <form onSubmit={handleSubmit} className="flex w-full space-x-2">
                  <Input
                    name="message"
                    value={input}
                    onChange={handleInputChange}
                    placeholder={isListening ? "Listening..." : "Type your message..."}
                    className="flex-1 h-9 text-sm border-primary/20 focus-visible:ring-primary"
                    disabled={isListening}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant={isListening ? "destructive" : "outline"}
                          size="icon"
                          onClick={toggleListening}
                          className={`h-9 w-9 ${isListening ? "animate-pulse" : ""}`}
                        >
                          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">{isListening ? "Stop Recording" : "Start Recording"}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="submit"
                          size="icon"
                          className="h-9 w-9 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                          disabled={isLoading || isListening || !input.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">Send Message</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </form>
              </CardFooter>
            </>
          )}

          {isMinimized && (
            <CardContent className="p-3">
              <div className="text-sm text-muted-foreground">
                Chat minimized. Click the expand button to continue your conversation.
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

