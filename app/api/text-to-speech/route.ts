import { NextResponse } from "next/server"
import { textToSpeech } from "@/lib/sarvam-api"

export async function POST(req: Request) {
  try {
    const { text, language, voice } = await req.json()

    if (!text) {
      return NextResponse.json({ error: "Missing required text parameter" }, { status: 400 })
    }

    const audioUrl = await textToSpeech(text, language, voice)

    // For API routes, we need to return the audio as a blob
    const response = await fetch(audioUrl)
    const audioBlob = await response.blob()

    return new NextResponse(audioBlob, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": "inline",
      },
    })
  } catch (error) {
    console.error("Text-to-speech API error:", error)
    return NextResponse.json({ error: "An error occurred during text-to-speech conversion" }, { status: 500 })
  }
}

