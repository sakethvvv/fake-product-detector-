import express from 'express';
import cors from 'cors';
import { GoogleGenAI, Type } from "@google/genai";
import path from 'path';
import { fileURLToPath } from 'url';

// Helper for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Use process.env.PORT for deployment environments (Heroku, Render, etc.)
const port = process.env.PORT || 3000;

// Enable CORS to allow requests
app.use(cors());
app.use(express.json());

// Serve static files from the root directory
// This ensures the website loads when the server is deployed
app.use(express.static(__dirname));

// Initialize Gemini API Client for backend-side analysis (optional fallback)
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

app.post('/api/analyze', async (req, res) => {
  try {
    const { input } = req.body;
    
    if (!input) {
      return res.status(400).json({ error: "Input text or URL is required." });
    }

    const model = "gemini-3-flash-preview";
    
    const systemInstruction = `
      You are a professional Cyber-Fraud Analyst specializing in E-commerce deception and Sentiment Analysis.
      Analyze the provided product URL or description for signs of fraud.
      
      CORE ENHANCEMENT: Perform Sentiment Analysis on the reviews. 
      1. Sentiment Check: Look for "Toxic Positivity" (overly enthusiastic, generic praise without specific product details).
      2. Review Patterns: Repetitive language, identical sentence structures across multiple reviews, or bot-like enthusiasm.
      3. Sentiment vs Fact: Genuine reviews usually balance sentiment with specific details (e.g., "the battery lasts 4 hours but the screen is dim"). Fake reviews often have 100% positive sentiment with 0% technical detail.
      4. Pricing: Unrealistic discounts compared to market average.
      5. Seller Data: Lack of history or poor ratings.
      
      Return a detailed analysis in JSON format.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: `Analyze this product and its sentiment profile: ${input}`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            risk_level: {
              type: Type.STRING,
              enum: ['Safe', 'Risky', 'Likely Fake'],
              description: "The overall risk assessment."
            },
            trust_score: {
              type: Type.NUMBER,
              description: "A score from 0-100 indicating reliability."
            },
            review_score: {
              type: Type.NUMBER,
              description: "Score for reviews (0-100) based on sentiment authenticity and patterns."
            },
            seller_score: {
              type: Type.NUMBER,
              description: "Score for seller credibility (0-100)."
            },
            price_score: {
              type: Type.NUMBER,
              description: "Score for price realism (0-100)."
            },
            product_name: {
              type: Type.STRING,
              description: "Identified product name if possible."
            },
            reasoning: {
              type: Type.OBJECT,
              properties: {
                reviews: { 
                  type: Type.STRING,
                  description: "Detailed analysis including sentiment findings."
                },
                seller: { type: Type.STRING },
                price: { type: Type.STRING }
              },
              required: ["reviews", "seller", "price"]
            }
          },
          required: ["risk_level", "trust_score", "review_score", "seller_score", "price_score", "reasoning"]
        }
      }
    });

    const jsonStr = response.text?.trim() || "{}";
    const analysisResult = JSON.parse(jsonStr);
    
    res.json(analysisResult);

  } catch (error) {
    console.error("Backend Analysis Error:", error);
    res.status(500).json({ 
      error: "Failed to analyze product",
      details: error.message || "Unknown error occurred"
    });
  }
});

// Fallback route for SPA (Single Page Application)
// This captures any other requests and sends index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});