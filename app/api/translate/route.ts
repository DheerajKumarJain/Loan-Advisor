import { NextResponse } from "next/server"
import { translateText } from "@/lib/sarvam-api"

export async function POST(req: Request) {
  try {
    const { text, targetLanguage } = await req.json()

    if (!text || !targetLanguage) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const sourceLanguage = "en" // Assuming source is English
    const translatedText = await translateText(text, sourceLanguage, targetLanguage)

    return NextResponse.json({ translatedText })
  } catch (error) {
    console.error("Translation API error:", error)
    return NextResponse.json({ error: "An error occurred during translation" }, { status: 500 })
  }
}

