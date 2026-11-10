import type {
  ApiTool,
  WikipediaToolPage,
  WikipediaToolResponse,
} from "../Types/api";

const API_URL =
  "https://en.wikipedia.org/w/api.php?action=query&titles=Hammer%7CCircular%20saw%7CLadder%7CDrill&prop=pageimages%7Cextracts&exintro=1&explaintext=1&pithumbsize=400&format=json&origin=*";
const EXPECTED_TOOL_TITLES = ["Hammer", "Circular saw", "Ladder", "Drill"];
const TOOL_TITLES_IN_INDONESIAN: Record<string, string> = {
  Hammer: "Palu",
  "Circular saw": "Gergaji Sirkular",
  Ladder: "Tangga Aluminium",
  Drill: "Bor Tangan",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isWikipediaToolPage(value: unknown): value is WikipediaToolPage {
  return (
    isRecord(value) &&
    typeof value.pageid === "number" &&
    typeof value.title === "string" &&
    typeof value.extract === "string" &&
    isRecord(value.thumbnail) &&
    typeof value.thumbnail.source === "string"
  );
}

function isWikipediaToolResponse(
  value: unknown,
): value is WikipediaToolResponse {
  return (
    isRecord(value) &&
    isRecord(value.query) &&
    isRecord(value.query.pages) &&
    Object.values(value.query.pages).every(isWikipediaToolPage)
  );
}

export async function fetchApiTools(): Promise<ApiTool[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Permintaan API gagal (HTTP ${response.status}).`);
  }

  const data: unknown = await response.json();

  if (!isWikipediaToolResponse(data)) {
    throw new Error("Format data alat dari Wikipedia API tidak sesuai.");
  }

  const pages = Object.values(data.query.pages);
  const pageTitles = new Set(pages.map((page) => page.title));

  if (
    pages.length !== EXPECTED_TOOL_TITLES.length ||
    EXPECTED_TOOL_TITLES.some((title) => !pageTitles.has(title))
  ) {
    throw new Error(
      "Wikipedia API tidak mengembalikan tepat empat alat bangunan yang diminta.",
    );
  }

  return pages.map((page) => ({
    id: page.pageid,
    title: TOOL_TITLES_IN_INDONESIAN[page.title],
    description: page.extract.trim(),
    thumbnail: page.thumbnail.source,
  }));
}

export function getApiTools(): Promise<ApiTool[]> {
  return new Promise((resolve, reject) => {
    fetchApiTools().then(resolve).catch(reject);
  });
}