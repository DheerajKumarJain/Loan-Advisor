// Sarvam API integration utilities
const SARVAM_API_KEY = "b3357093-6ee0-422b-bd16-7a5d47029256"

// Base headers for all API calls
const baseHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${SARVAM_API_KEY}`,
}

/**
 * Translates text from one language to another
 */
export async function translateText(text: string, sourceLanguage: string, targetLanguage: string) {
  try {
    const response = await fetch("https://api.sarvam.ai/translate", {
      method: "POST",
      headers: baseHeaders,
      body: JSON.stringify({
        text,
        source_language: sourceLanguage,
        target_language: targetLanguage,
      }),
    })

    if (!response.ok) {
      throw new Error(`Translation failed: ${response.statusText}`)
    }

    const data = await response.json()
    return data.translated_text
  } catch (error) {
    console.error("Translation error:", error)
    throw error
  }
}

/**
 * Converts speech to text
 */
export async function speechToText(audioBlob: Blob, language = "en") {
  try {
    const formData = new FormData()
    formData.append("audio", audioBlob)
    formData.append("language", language)

    const response = await fetch("https://api.sarvam.ai/speech-to-text", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SARVAM_API_KEY}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Speech-to-text failed: ${response.statusText}`)
    }

    const data = await response.json()
    return data.text
  } catch (error) {
    console.error("Speech-to-text error:", error)
    throw error
  }
}

/**
 * Converts text to speech
 */
export async function textToSpeech(text: string, language = "en", voice = "default") {
  try {
    const response = await fetch("https://api.sarvam.ai/text-to-speech", {
      method: "POST",
      headers: baseHeaders,
      body: JSON.stringify({
        text,
        language,
        voice,
      }),
    })

    if (!response.ok) {
      throw new Error(`Text-to-speech failed: ${response.statusText}`)
    }

    const audioBlob = await response.blob()
    return URL.createObjectURL(audioBlob)
  } catch (error) {
    console.error("Text-to-speech error:", error)
    throw error
  }
}

/**
 * Analyzes text for sentiment, entities, etc.
 */
export async function analyzeText(text: string) {
  try {
    const response = await fetch("https://api.sarvam.ai/text-analytics", {
      method: "POST",
      headers: baseHeaders,
      body: JSON.stringify({
        text,
        features: ["sentiment", "entities", "keywords"],
      }),
    })

    if (!response.ok) {
      throw new Error(`Text analysis failed: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Text analysis error:", error)
    throw error
  }
}

// Language code mapping with focus on Indian languages
export const languageCodes: Record<string, { code: string; voice?: string; nativeName: string }> = {
  english: { code: "en", voice: "en-IN", nativeName: "English" },
  hindi: { code: "hi", voice: "hi-IN", nativeName: "हिन्दी" },
  tamil: { code: "ta", voice: "ta-IN", nativeName: "தமிழ்" },
  telugu: { code: "te", voice: "te-IN", nativeName: "తెలుగు" },
  kannada: { code: "kn", voice: "kn-IN", nativeName: "ಕನ್ನಡ" },
  malayalam: { code: "ml", voice: "ml-IN", nativeName: "മലയാളം" },
  marathi: { code: "mr", voice: "mr-IN", nativeName: "मराठी" },
  bengali: { code: "bn", voice: "bn-IN", nativeName: "বাংলা" },
  gujarati: { code: "gu", voice: "gu-IN", nativeName: "ગુજરાતી" },
  punjabi: { code: "pa", voice: "pa-IN", nativeName: "ਪੰਜਾਬੀ" },
  odia: { code: "or", voice: "or-IN", nativeName: "ଓଡ଼ିଆ" },
  urdu: { code: "ur", voice: "ur-IN", nativeName: "اردو" },
}

