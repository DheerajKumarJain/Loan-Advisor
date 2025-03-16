import { NextResponse } from "next/server"
import { analyzeText } from "@/lib/sarvam-api"

export async function POST(req: Request) {
  try {
    const { text } = await req.json()

    if (!text) {
      return NextResponse.json({ error: "Missing required text parameter" }, { status: 400 })
    }

    const analysis = await analyzeText(text)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Text analysis API error:", error)
    return NextResponse.json({ error: "An error occurred during text analysis" }, { status: 500 })
  }
}

