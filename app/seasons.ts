export type ShapeType =
  | "sakura"
  | "round-petal"
  | "teardrop"
  | "leaf"
  | "maple"
  | "snowflake"
  | "pine-needle"
  | "berry"
  | "pinecone"
  | "acorn"
  | "flower"
  | "daisy";

export interface ElementDef {
  shape: ShapeType;
  /** CSS background values (solid color or gradient string) */
  colors: string[];
  minW: number;
  maxW: number;
  /** height = width × random in this range */
  hRatio: [number, number];
  /** text rendered inside span (e.g. ❄ ❅ ❆) */
  content?: string;
  /**
   * Relative weight controlling how many particles this element gets.
   * weight:3 gets 3× as many as weight:1. Defaults to 1.
   */
  weight?: number;
}

export interface SeasonConfig {
  id: "spring" | "summer" | "fall" | "winter";
  label: string;
  emoji: string;
  background: string;
  textColor: string;
  cardBg: string;
  toggleBg: string;
  toggleColor: string;
  elements: ElementDef[];
  totalCount: number;
}

export const SEASONS: SeasonConfig[] = [
  /* ─────────── Spring ─────────── */
  {
    id: "spring",
    label: "Spring",
    emoji: "🌸",
    background: "linear-gradient(160deg,#fff0f5 0%,#ffe4ee 60%,#ffd6e7 100%)",
    textColor: "#7a2040",
    cardBg: "rgba(255,255,255,0.45)",
    toggleBg: "rgba(255,182,193,0.88)",
    toggleColor: "#7a2040",
    totalCount: 65,
    elements: [
      /* Sakura petals */
      {
        shape: "sakura",
        colors: [
          "#ffb7c5",
          "#ff99b0",
          "#ffc0cb",
          "#f4a0b5",
          "#ffccd5",
          "#f9a8c0",
        ],
        minW: 8,
        maxW: 22,
        hRatio: [0.5, 1],
        weight: 2,
      },
      /* Dahlia – round, purple/pink */
      {
        shape: "round-petal",
        colors: [
          "#da70d6",
          "#ee82ee",
          "#dda0dd",
          "#ba55d3",
          "#e6b3ff",
          "#ff69b4",
        ],
        minW: 8,
        maxW: 18,
        hRatio: [0.8, 1.3],
        weight: 1,
      },
      /* Rose – teardrop, red/crimson */
      {
        shape: "teardrop",
        colors: [
          "#ff6b6b",
          "#ff4757",
          "#c44569",
          "#e84393",
          "#ff7f9c",
          "#dc143c",
        ],
        minW: 8,
        maxW: 18,
        hRatio: [1.2, 1.8],
        weight: 1,
      },
      /* Violet – small, purple/blue */
      {
        shape: "round-petal",
        colors: [
          "#8b6fff",
          "#6c5ce7",
          "#a29bfe",
          "#9b59b6",
          "#d7bde2",
          "#7b68ee",
        ],
        minW: 5,
        maxW: 12,
        hRatio: [1.0, 1.5],
        weight: 1,
      },
      /* 6-petal rounded flower – mixed spring colors */
      {
        shape: "flower",
        colors: [
          "#ff69b4",
          "#da70d6",
          "#ba55d3",
          "#ff99b0",
          "#e84393",
          "#8b6fff",
          "#c44569",
          "#ee82ee",
          "#f4a0b5",
          "#a29bfe",
        ],
        minW: 16,
        maxW: 30,
        hRatio: [1, 1],
        weight: 2,
      },
    ],
  },

  /* ─────────── Summer ─────────── */
  {
    id: "summer",
    label: "Summer",
    emoji: "☀️",
    background: "linear-gradient(160deg,#fffde7 0%,#f0fff4 60%,#e3f2fd 100%)",
    textColor: "#33500a",
    cardBg: "rgba(255,255,255,0.5)",
    toggleBg: "rgba(255,235,80,0.88)",
    toggleColor: "#5a3a00",
    totalCount: 80,
    elements: [
      /* Sunflower petals – long yellow (dominant) */
      {
        shape: "sakura",
        colors: [
          "#ffd600",
          "#ffab00",
          "#ffc107",
          "#ffe082",
          "#ffee58",
          "#fff176",
        ],
        minW: 5,
        maxW: 11,
        hRatio: [2.5, 4.0],
        weight: 5,
      },
      /* Tomato-red flower petals */
      {
        shape: "round-petal",
        colors: ["#e53935", "#c62828", "#ef5350", "#ff5252", "#d32f2f"],
        minW: 8,
        maxW: 18,
        hRatio: [0.9, 1.3],
        weight: 1,
      },
      /* Bellflower – blue, slightly elongated */
      {
        shape: "teardrop",
        colors: ["#1565c0", "#1976d2", "#5c85d6", "#7986cb", "#5c6bc0"],
        minW: 8,
        maxW: 16,
        hRatio: [1.4, 2.0],
        weight: 1,
      },
      /* Morning glory – round, purple/blue/pink */
      {
        shape: "round-petal",
        colors: [
          "#7b1fa2",
          "#8e24aa",
          "#ab47bc",
          "#ce93d8",
          "#9c27b0",
          "#e040fb",
        ],
        minW: 8,
        maxW: 20,
        hRatio: [0.85, 1.2],
        weight: 1,
      },
      /* Green leaves */
      {
        shape: "leaf",
        colors: [
          "#2e7d32",
          "#388e3c",
          "#43a047",
          "#66bb6a",
          "#1b5e20",
          "#33691e",
        ],
        minW: 12,
        maxW: 26,
        hRatio: [1.6, 2.5],
        weight: 2,
      },
      /* Daisies – mixed summer colors, golden center fixed in SVG */
      {
        shape: "daisy",
        colors: [
          "#ffd600",
          "#ffe082",
          "#ffb74d",
          "#ff8a65",
          "#4fc3f7",
          "#ba68c8",
          "#81c784",
          "#f48fb1",
        ],
        minW: 14,
        maxW: 26,
        hRatio: [1, 1],
        weight: 2,
      },
    ],
  },

  /* ─────────── Fall ─────────── */
  {
    id: "fall",
    label: "Fall",
    emoji: "🍂",
    background: "linear-gradient(160deg,#fff8e1 0%,#fff3e0 60%,#fbe9e7 100%)",
    textColor: "#5a2000",
    cardBg: "rgba(255,240,220,0.5)",
    toggleBg: "rgba(255,180,90,0.88)",
    toggleColor: "#5a2000",
    totalCount: 70,
    elements: [
      /* Brown maple leaves (dominant) */
      {
        shape: "maple",
        colors: [
          "#5d4037",
          "#795548",
          "#6d4c41",
          "#4e342e",
          "#8d6e63",
          "#a1887f",
        ],
        minW: 18,
        maxW: 34,
        hRatio: [0.9, 1.1],
        weight: 5,
      },
      /* Red maple leaves */
      {
        shape: "maple",
        colors: [
          "#c62828",
          "#d32f2f",
          "#e53935",
          "#b71c1c",
          "#c0392b",
          "#e74c3c",
        ],
        minW: 18,
        maxW: 32,
        hRatio: [0.9, 1.1],
        weight: 2,
      },
      /* Yellow maple leaves */
      {
        shape: "maple",
        colors: [
          "#f57f17",
          "#f9a825",
          "#ffb300",
          "#ff8f00",
          "#e65100",
          "#ff6f00",
        ],
        minW: 18,
        maxW: 32,
        hRatio: [0.9, 1.1],
        weight: 2,
      },
      /* Pinecones */
      {
        shape: "pinecone",
        colors: [
          "repeating-linear-gradient(135deg,#5d4037,#5d4037 3px,#795548 3px,#795548 7px)",
          "repeating-linear-gradient(135deg,#4e342e,#4e342e 3px,#6d4c41 3px,#6d4c41 7px)",
          "repeating-linear-gradient(135deg,#3e2723,#3e2723 3px,#5d4037 3px,#5d4037 7px)",
        ],
        minW: 8,
        maxW: 14,
        hRatio: [1.6, 2.2],
        weight: 1,
      },
      /* Oak nuts / acorns */
      {
        shape: "acorn",
        colors: [
          "linear-gradient(to bottom,#4e342e 0%,#4e342e 38%,#8d6e63 38%,#8d6e63 100%)",
          "linear-gradient(to bottom,#3e2723 0%,#3e2723 38%,#795548 38%,#795548 100%)",
          "linear-gradient(to bottom,#5d4037 0%,#5d4037 38%,#a1887f 38%,#a1887f 100%)",
        ],
        minW: 7,
        maxW: 13,
        hRatio: [1.3, 1.7],
        weight: 1,
      },
    ],
  },

  /* ─────────── Winter ─────────── */
  {
    id: "winter",
    label: "Winter",
    emoji: "❄️",
    background: "linear-gradient(160deg,#ABDEFF 0%,#eef2ff 60%,#f8f0ff 100%)",
    textColor: "#1a3050",
    cardBg: "rgba(220,235,255,0.5)",
    toggleBg: "rgba(200,230,255,0.9)",
    toggleColor: "#1a3050",
    totalCount: 75,
    elements: [
      /* Classic ❄ snowflakes – large */
      {
        shape: "snowflake",
        colors: [
          "rgba(255,255,255,0.97)",
          "rgba(210,235,255,0.95)",
          "rgba(200,230,255,0.93)",
        ],
        minW: 20,
        maxW: 36,
        hRatio: [1, 1],
        content: "❄",
        weight: 3,
      },
      /* ❅ tight trifoliate – medium */
      {
        shape: "snowflake",
        colors: [
          "rgba(220,240,255,0.92)",
          "rgba(255,255,255,0.95)",
          "rgba(190,220,250,0.90)",
        ],
        minW: 14,
        maxW: 26,
        hRatio: [1, 1],
        content: "❅",
        weight: 3,
      },
      /* ❆ heavy chevron – small */
      {
        shape: "snowflake",
        colors: [
          "rgba(200,230,255,0.88)",
          "rgba(230,245,255,0.93)",
          "rgba(255,255,255,0.90)",
        ],
        minW: 10,
        maxW: 20,
        hRatio: [1, 1],
        content: "❆",
        weight: 2,
      },
      /* Pine needles */
      {
        shape: "pine-needle",
        colors: ["#1b5e20", "#2e7d32", "#388e3c", "#33691e", "#1a3a1a"],
        minW: 2,
        maxW: 3,
        hRatio: [8, 15],
        weight: 2,
      },
      /* Red berries with snow glint */
      {
        shape: "berry",
        colors: [
          "radial-gradient(circle at 32% 28%,rgba(255,255,255,0.88) 0%,rgba(255,255,255,0.45) 18%,transparent 36%),#cc2222",
          "radial-gradient(circle at 32% 28%,rgba(255,255,255,0.88) 0%,rgba(255,255,255,0.45) 18%,transparent 36%),#b71c1c",
          "radial-gradient(circle at 32% 28%,rgba(255,255,255,0.88) 0%,rgba(255,255,255,0.45) 18%,transparent 36%),#c0392b",
        ],
        minW: 7,
        maxW: 14,
        hRatio: [1, 1],
        weight: 2,
      },
    ],
  },
];

/**
 * Returns the index into SEASONS for the current meteorological season in NC
 * (Northern Hemisphere astronomical dates).
 *   0 = Spring  (Mar 20 – Jun 20)
 *   1 = Summer  (Jun 21 – Sep 22)
 *   2 = Fall    (Sep 23 – Dec 20)
 *   3 = Winter  (Dec 21 – Mar 19)
 */
export function getNCSeasonIdx(): number {
  const now = new Date();
  const m = now.getMonth() + 1; // 1–12
  const d = now.getDate();

  if ((m === 3 && d >= 20) || m === 4 || m === 5 || (m === 6 && d <= 20))
    return 0; // Spring
  if ((m === 6 && d >= 21) || m === 7 || m === 8 || (m === 9 && d <= 22))
    return 1; // Summer
  if ((m === 9 && d >= 23) || m === 10 || m === 11 || (m === 12 && d <= 20))
    return 2; // Fall
  return 3; // Winter
}
