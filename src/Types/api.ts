export interface ApiTool {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
}

export interface WikipediaToolPage {
  pageid: number;
  title: string;
  extract: string;
  thumbnail: {
    source: string;
  };
}

export interface WikipediaToolResponse {
  query: {
    pages: Record<string, WikipediaToolPage>;
  };
}