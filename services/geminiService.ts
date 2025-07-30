import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface GenerationResult {
    adjective: string;
    imageUrl: string;
}

export const generateTeacherAdjective = async (): Promise<GenerationResult> => {
    try {
        // 1. 수식어 텍스트 생성
        const textPrompt = "지치고 힘든 하루를 보낸 선생님을 위한, 긍정적이고 힘이 되는 아름다운 수식어를 딱 하나만, 명사구 형태로 짧게 만들어줘. 예를 들어 '세상을 밝히는 등대'나 '지혜의 샘'처럼. 따옴표나 부가 설명 없이 수식어구만 대답해줘.";

        const textResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: textPrompt,
            config: {
                temperature: 0.9,
                topK: 50,
                topP: 0.95,
            },
        });
        
        const adjective = textResponse.text.trim().replace(/["']/g, '');

        // 2. 생성된 수식어를 기반으로 이미지 생성
        const imagePrompt = `A beautiful, high-quality, real-life photograph that visually represents the meaning of the Korean phrase '${adjective}'. Cinematic lighting, inspiring mood. Absolutely no text, words, or letters should be visible in the image.`;

        const imageResponse = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: imagePrompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '4:3',
            },
        });

        const base64ImageBytes: string = imageResponse.generatedImages[0].image.imageBytes;
        const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;

        return { adjective, imageUrl };

    } catch (error) {
        console.error("Error generating content:", error);
        throw new Error("AI 콘텐츠를 생성하는 데 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
};