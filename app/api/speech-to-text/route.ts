import { NextResponse } from "next/server"
import { speechToText } from "@/lib/sarvam-api"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const audioFile = formData.get("audio") as File
    const language = (formData.get("language") as string) || "en"

    if (!audioFile) {
      return NextResponse.json({ error: "Missing audio file" }, { status: 400 })
    }

    const audioBlob = new Blob([await audioFile.arrayBuffer()], { type: audioFile.type })
    const text = await speechToText(audioBlob, language)

    return NextResponse.json({ text })
  } catch (error) {
    console.error("Speech-to-text API error:", error)
    return NextResponse.json({ error: "An error occurred during speech-to-text conversion" }, { status: 500 })
  }
}

