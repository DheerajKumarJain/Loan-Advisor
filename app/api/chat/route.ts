import { NextResponse } from "next/server"
import { analyzeText } from "@/lib/sarvam-api"
import { type ConversationState, getNextPrompt, processUserMessage, getFinancialTips } from "@/lib/conversation-manager"

// Sarvam AI API configuration
const SARVAM_API_KEY = "b3357093-6ee0-422b-bd16-7a5d47029256"
const SARVAM_API_URL = "https://api.sarvam.ai/v1/chat/completions"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages, language = "english", conversationState } = await req.json()

    // Process the last user message if available
    let currentState: ConversationState = conversationState || { stage: "greeting" }

    if (messages.length > 0 && messages[messages.length - 1].role === "user") {
      const lastUserMessage = messages[messages.length - 1].content
      currentState = processUserMessage(lastUserMessage, currentState)
    }

    // Get the next prompt based on the updated state
    let nextPrompt = ""

    // If we're at the eligibility check stage, include financial tips
    if (currentState.stage === "financial_tips") {
      const tips = getFinancialTips(currentState)
      nextPrompt =
        getNextPrompt(currentState) +
        "\n\nHere are some financial tips that might help:\n\n" +
        tips.map((tip, index) => `${index + 1}. ${tip}`).join("\n")
    } else {
      nextPrompt = getNextPrompt(currentState)
    }

    // Create a system message based on the selected language
    let systemMessage = "You are a helpful, friendly loan advisor assistant. "

    // Add language instruction
    if (language !== "english") {
      systemMessage += `Respond in ${language}. `
    }

    // Add domain expertise
    systemMessage += `
      You specialize in:
      1. Loan eligibility assessment - asking relevant questions about income, credit score, and financial situation
      2. Loan application guidance - explaining required documents and steps
      3. Financial literacy tips - providing simple advice to improve financial health
      
      Keep your responses concise, friendly, and easy to understand. Avoid using complex financial jargon.
      If asked about specific loan products or rates, clarify that you provide general guidance only and recommend speaking with an actual loan officer for specific products.
      
      Current conversation state: ${JSON.stringify(currentState)}
      
      Next prompt to guide the conversation: ${nextPrompt}
    `

    // If the last message is from the user, analyze its sentiment
    let sentimentInfo = ""
    if (messages.length > 0 && messages[messages.length - 1].role === "user") {
      try {
        const lastMessage = messages[messages.length - 1].content
        const analysis = await analyzeText(lastMessage)

        if (analysis && analysis.sentiment) {
          const sentiment = analysis.sentiment.score
          // Add sentiment information to the system message
          if (sentiment < -0.5) {
            sentimentInfo =
              "The user seems frustrated or concerned. Be extra supportive and reassuring in your response."
          } else if (sentiment > 0.5) {
            sentimentInfo = "The user seems positive and engaged. Match their enthusiasm in your response."
          }
        }
      } catch (error) {
        console.error("Error analyzing sentiment:", error)
        // Continue without sentiment analysis if it fails
      }
    }

    if (sentimentInfo) {
      systemMessage += " " + sentimentInfo
    }

    // Prepare messages for Sarvam AI format
    const formattedMessages = [{ role: "system", content: systemMessage }, ...messages]

    // Create a new ReadableStream for streaming the response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await fetch(SARVAM_API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${SARVAM_API_KEY}`,
            },
            body: JSON.stringify({
              model: "sarvam-1",
              messages: formattedMessages,
              stream: true,
              max_tokens: 1000,
            }),
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(`Sarvam API error: ${error.message || response.statusText}`)
          }

          if (!response.body) {
            throw new Error("Response body is null")
          }

          const reader = response.body.getReader()
          const decoder = new TextDecoder()

          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value)
            const lines = chunk.split("\n").filter((line) => line.trim() !== "")

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6)
                if (data === "[DONE]") continue

                try {
                  const parsed = JSON.parse(data)
                  if (parsed.choices && parsed.choices[0].delta.content) {
                    const content = parsed.choices[0].delta.content

                    // Format the chunk as expected by the AI SDK
                    const aiChunk =
                      JSON.stringify({
                        type: "text-delta",
                        text: content,
                      }) + "\n"

                    controller.enqueue(new TextEncoder().encode(aiChunk))
                  }
                } catch (e) {
                  console.error("Error parsing JSON:", e)
                }
              }
            }
          }

          // Send the updated conversation state
          const stateChunk =
            JSON.stringify({
              type: "conversation-state",
              state: currentState,
            }) + "\n"

          controller.enqueue(new TextEncoder().encode(stateChunk))
        } catch (error) {
          console.error("Error in stream processing:", error)
          controller.error(error)
        } finally {
          controller.close()
        }
      },
    })

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json({ error: "An error occurred while processing your request" }, { status: 500 })
  }
}

