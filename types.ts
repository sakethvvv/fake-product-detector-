
export enum RiskLevel {
  SAFE = 'Safe',
  RISKY = 'Risky',
  FAKE = 'Likely Fake'
}

export interface AnalysisResult {
  risk_level: RiskLevel;
  trust_score: number;
  review_score: number;
  seller_score: number;
  price_score: number;
  reasoning: {
    reviews: string;
    seller: string;
    price: string;
  };
  product_name?: string;
}

export interface ProductData {
  url?: string;
  details?: string;
}

export interface TeamMember {
  name: string;
  rollNumber?: string;
  role?: string;
  image?: string;
}
