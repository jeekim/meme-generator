import { GoogleGenAI, Type, Modality } from '@google/genai';
import type { MemeCaption } from '../types';
import { AI_CONFIG, ERROR_MESSAGES } from '../config';

if (!process.env.API_KEY) {
  throw new Error(ERROR_MESSAGES.API_KEY_MISSING);
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Converts a base64 data URL to a format suitable for the Gemini API
 */
async function fileToGenerativePart(base64Data: string) {
  const dataPart = base64Data.split(',')[1];
  const mimeType = base64Data.split(';')[0].split(':')[1];
  return {
    inlineData: {
      data: dataPart,
      mimeType,
    },
  };
}

/**
 * Generates meme captions using AI based on the provided image
 * @param imageBase64 - Base64 encoded image data URL
 * @returns Array of generated meme captions
 */
export async function generateCaptions(imageBase64: string): Promise<MemeCaption[]> {
  const imagePart = await fileToGenerativePart(imageBase64);

  const prompt = `You are a world-class meme generator. Based on the provided image, create ${AI_CONFIG.CAPTION_COUNT} funny and viral-worthy meme captions.
Each caption should have a top text and a bottom text.
Return your response as a JSON object with a single key "captions", which is an array of objects. Each object in the array should have "topText" and "bottomText" keys.
Be creative and hilarious. The captions should be short and punchy.`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      captions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            topText: { type: Type.STRING },
            bottomText: { type: Type.STRING },
          },
          required: ['topText', 'bottomText'],
        },
      },
    },
    required: ['captions'],
  };

  const response = await ai.models.generateContent({
    model: AI_CONFIG.CAPTION_MODEL,
    contents: { parts: [imagePart, { text: prompt }] },
    config: {
      responseMimeType: 'application/json',
      responseSchema: schema,
    },
  });

  const jsonText = response.text.trim();
  const parsed = JSON.parse(jsonText);
  return parsed.captions;
}

/**
 * Edits an image using AI based on a text prompt
 * @param imageBase64 - Base64 encoded image data URL
 * @param prompt - Text prompt describing the desired edit
 * @returns Base64 encoded edited image data
 */
export async function editImage(imageBase64: string, prompt: string): Promise<string> {
  const imagePart = await fileToGenerativePart(imageBase64);

  const response = await ai.models.generateContent({
    model: AI_CONFIG.IMAGE_EDIT_MODEL,
    contents: {
      parts: [imagePart, { text: prompt }],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  const firstPart = response.candidates?.[0]?.content?.parts?.[0];
  if (firstPart && firstPart.inlineData) {
    return firstPart.inlineData.data;
  }

  throw new Error(ERROR_MESSAGES.NO_IMAGE_GENERATED);
}
