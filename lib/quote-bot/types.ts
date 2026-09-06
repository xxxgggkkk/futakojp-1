export type ProductClues = {
  isProduct: boolean;
  confidence: number;
  brand?: string;
  productName?: string;
  category?: string;
  keywords: string[];
};

export type QuoteCandidate = {
  title: string;
  url: string;
  domain: string;
  imageUrl?: string;
  jpyPrice: number;
  twdPrice: number;
  score: number;
};

