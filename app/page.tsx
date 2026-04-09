"use client";

import React, { useState } from "react";
import { SEASONS, SeasonConfig, ShapeType, getNCSeasonIdx } from "./seasons";

/* ── Flower SVG paths (svgrepo.com/svg/10098 – rounded 6-petal flower)
   viewBox: 0 0 378.832 378.832 – rendered via <symbol> + <use> ── */
const FLOWER_PATHS = [
  // petal upper-right
  "M208.556,171.543c4.136-2.547,8.403-5.034,12.664-7.531c4.294-2.445,8.578-4.903,12.854-7.217c2.127-1.175,4.251-2.319,6.363-3.429c2.104-1.11,4.184-2.223,6.25-3.268c8.241-4.247,16.062-7.987,22.858-11.027c6.796-3.05,12.566-5.398,16.66-6.954c2.034-0.793,3.679-1.343,4.779-1.748c1.116-0.383,1.712-0.582,1.712-0.582s-0.478,0.411-1.36,1.188c-0.901,0.751-2.201,1.896-3.905,3.265c-3.394,2.762-8.312,6.591-14.349,10.953c-6.033,4.364-13.184,9.266-20.98,14.276c-1.939,1.272-3.939,2.517-5.96,3.783c-2.016,1.276-4.065,2.543-6.149,3.796c-4.142,2.553-8.412,5.029-12.674,7.524c-4.294,2.443-8.577,4.896-12.859,7.207c-0.468,0.26-0.933,0.495-1.401,0.749c22.938,4.027,85.072,12.512,117.978-6.487c74.679-43.117,33.771-50.114,17.416-78.445c-16.358-28.33-1.969-67.258-76.646-24.141c-32.899,18.999-56.62,77.048-64.605,98.929C207.655,172.103,208.093,171.819,208.556,171.543z",
  // petal lower-right
  "M214.46,197.051c4.282,2.311,8.565,4.766,12.859,7.207c4.262,2.496,8.532,4.974,12.677,7.524c2.081,1.253,4.132,2.521,6.148,3.796c2.019,1.269,4.019,2.508,5.957,3.78c7.799,5.015,14.949,9.913,20.981,14.28c6.036,4.361,10.955,8.186,14.349,10.95c1.704,1.368,3.004,2.517,3.905,3.264c0.886,0.779,1.36,1.191,1.36,1.191s-0.596-0.201-1.711-0.583c-1.103-0.403-2.744-0.956-4.779-1.748c-4.091-1.558-9.865-3.902-16.661-6.953c-6.794-3.042-14.617-6.782-22.855-11.028c-2.069-1.044-4.148-2.157-6.253-3.27c-2.112-1.105-4.236-2.252-6.363-3.428c-4.276-2.312-8.562-4.77-12.854-7.215c-4.261-2.497-8.527-4.984-12.664-7.531c-0.463-0.276-0.899-0.561-1.356-0.842c7.985,21.881,31.706,79.929,64.607,98.927c74.681,43.113,60.288,4.188,76.646-24.141c16.354-28.332,57.262-35.333-17.416-78.445c-32.904-18.999-95.038-10.513-117.978-6.491C213.527,196.556,213.992,196.791,214.46,197.051z",
  // petal bottom
  "M195.327,214.924c0.134,4.857,0.155,9.8,0.189,14.738c-0.032,4.938-0.042,9.876-0.182,14.739c-0.04,2.429-0.111,4.842-0.213,7.226c-0.086,2.381-0.166,4.735-0.293,7.05c-0.45,9.258-1.112,17.899-1.876,25.308c-0.761,7.407-1.616,13.581-2.312,17.904c-0.331,2.156-0.679,3.855-0.874,5.016c-0.233,1.156-0.354,1.775-0.354,1.775s-0.119-0.619-0.353-1.775c-0.196-1.159-0.541-2.857-0.873-5.016c-0.695-4.323-1.552-10.497-2.313-17.904c-0.761-7.407-1.426-16.05-1.874-25.306c-0.128-2.315-0.209-4.671-0.294-7.052c-0.102-2.384-0.174-4.797-0.213-7.226c-0.14-4.863-0.148-9.8-0.182-14.738c0.034-4.939,0.056-9.88,0.188-14.739c0.013-0.534,0.033-1.055,0.053-1.59c-14.955,17.854-53.368,67.42-53.368,105.415c0.001,86.229,26.517,54.305,59.227,54.306c32.712-0.002,59.228,31.922,59.228-54.306c0-37.995-38.412-87.562-53.367-105.415C195.294,213.869,195.315,214.389,195.327,214.924z",
  // petal lower-left
  "M170.277,207.289c-4.137,2.546-8.404,5.034-12.664,7.531c-4.294,2.444-8.579,4.903-12.855,7.216c-2.127,1.175-4.251,2.32-6.363,3.429c-2.104,1.109-4.185,2.224-6.251,3.269c-8.241,4.245-16.063,7.988-22.858,11.027c-6.796,3.051-12.569,5.397-16.66,6.954c-2.035,0.792-3.679,1.344-4.78,1.747c-1.116,0.384-1.711,0.583-1.711,0.583s0.475-0.412,1.359-1.189c0.902-0.749,2.202-1.895,3.906-3.266c3.394-2.765,8.314-6.589,14.349-10.95c6.033-4.365,13.184-9.267,20.98-14.277c1.94-1.271,3.94-2.516,5.96-3.783c2.016-1.274,4.066-2.543,6.149-3.796c4.144-2.552,8.413-5.028,12.676-7.523c4.294-2.442,8.576-4.896,12.858-7.208c0.468-0.259,0.934-0.493,1.402-0.754c-22.939-4.021-85.073-12.507-117.979,6.492c-74.679,43.116-33.771,50.115-17.416,78.445c16.358,28.331,1.968,67.254,76.645,24.142c32.904-18.999,56.624-77.048,64.608-98.929C171.178,206.729,170.739,207.014,170.277,207.289z",
  // petal upper-left
  "M164.372,181.781c-4.282-2.312-8.564-4.765-12.858-7.208c-4.263-2.496-8.532-4.972-12.676-7.523c-2.083-1.253-4.134-2.521-6.149-3.796c-2.02-1.268-4.02-2.512-5.959-3.782c-7.798-5.013-14.949-9.912-20.981-14.278c-6.034-4.362-10.955-8.187-14.349-10.951c-1.704-1.37-3.004-2.516-3.906-3.264c-0.885-0.779-1.359-1.191-1.359-1.191s0.595,0.2,1.711,0.583c1.102,0.404,2.744,0.955,4.779,1.747c4.092,1.557,9.865,3.904,16.661,6.954c6.794,3.042,14.617,6.78,22.856,11.028c2.068,1.044,4.148,2.158,6.253,3.268c2.112,1.108,4.236,2.253,6.363,3.429c4.276,2.313,8.562,4.771,12.855,7.216c4.26,2.497,8.527,4.984,12.664,7.53c0.462,0.277,0.898,0.562,1.355,0.842c-7.984-21.88-31.705-79.929-64.608-98.928C32.346,30.344,46.737,69.269,30.38,97.6c-16.354,28.331-57.262,35.331,17.416,78.444c32.904,19,95.038,10.514,117.979,6.494C165.306,182.277,164.84,182.04,164.372,181.781z",
  // petal top
  "M183.504,163.907c-0.133-4.859-0.153-9.798-0.188-14.738c0.033-4.939,0.042-9.875,0.181-14.738c0.04-2.43,0.113-4.842,0.214-7.226c0.085-2.381,0.165-4.735,0.293-7.05c0.449-9.258,1.113-17.899,1.875-25.307c0.762-7.407,1.617-13.582,2.312-17.904c0.332-2.158,0.678-3.856,0.874-5.016c0.232-1.157,0.353-1.775,0.353-1.775s0.119,0.618,0.354,1.775c0.195,1.159,0.542,2.857,0.874,5.016c0.693,4.322,1.551,10.497,2.312,17.904c0.762,7.407,1.426,16.049,1.875,25.307c0.128,2.313,0.208,4.669,0.293,7.05c0.102,2.384,0.174,4.796,0.214,7.226c0.14,4.863,0.147,9.799,0.182,14.738c-0.034,4.94-0.057,9.879-0.188,14.738c-0.013,0.536-0.034,1.057-0.052,1.591c14.954-17.854,53.366-67.42,53.366-105.415c0-86.229-26.517-54.305-59.228-54.305s-59.227-31.924-59.227,54.305c0,37.995,38.413,87.562,53.367,105.415C183.538,164.964,183.518,164.443,183.504,163.907z",
];

/* ── Daisy SVG (svgrepo.com/svg/daisy – 8-petal daisy with center circle)
   viewBox: 0 0 378.371 378.371 – rendered via <symbol> + <use> ── */
const DAISY_PATH =
  "M319.006,183.076c-8.965-2.401-19.715-3.776-32.007-4.109c11.017-2.646,21.521-6.109,30.464-10.655" +
  "c19.912-10.118,33.313-21.178,39.83-32.872c5.832-10.461,6.09-21.546,0.748-32.056c-5.23-10.295-14.033-16.538-25.563-18.183" +
  "c2.012-11.472-1.195-21.775-9.359-29.939c-6.61-6.612-14.473-9.965-23.362-9.965c-14.952,0-32.095,9.56-50.947,28.413" +
  "c-7.078,7.077-13.608,15.955-19.529,25.573c3.199-10.831,5.438-21.623,5.972-31.618c1.193-22.305-1.685-39.44-8.552-50.932" +
  "c-6.146-10.279-15.614-16.046-27.388-16.676C198.61,0.019,197.912,0,197.217,0c-10.607,0-19.691,4.518-26.433,13.103" +
  "c-6.423-5.396-13.59-8.128-21.342-8.128c-3.019,0-6.138,0.426-9.269,1.265c-14.25,3.818-35.949,18.454-21.178,73.579" +
  "c2.591,9.669,7.012,19.765,12.382,29.699c-7.781-8.186-16.008-15.52-24.397-20.98C88.567,76.553,72.508,70.475,59.25,70.475" +
  "c-12.282,0-22.237,5.32-28.789,15.385c-6.3,9.678-7.306,20.423-2.964,31.23c-10.94,3.993-18.261,11.923-21.25,23.076" +
  "c-3.051,11.388-0.505,22.18,7.363,31.208c8.795,10.093,24.194,18.142,45.769,23.922c8.964,2.401,19.715,3.776,32.007,4.11" +
  "c-11.017,2.646-21.519,6.109-30.462,10.654c-50.878,25.854-47.264,51.775-40.581,64.928c5.231,10.295,14.034,16.537,25.564,18.183" +
  "c-2.012,11.472,1.195,21.776,9.36,29.94c6.611,6.611,14.471,9.965,23.361,9.965c0.001,0,0,0,0.001,0" +
  "c14.953,0,32.095-9.561,50.948-28.413c7.078-7.078,13.611-15.956,19.531-25.576c-3.199,10.832-5.438,21.625-5.972,31.621" +
  "c-3.048,56.987,21.208,66.819,35.939,67.606c0.701,0.037,1.399,0.057,2.093,0.057c10.606,0,19.691-4.518,26.434-13.102" +
  "c6.423,5.395,13.59,8.127,21.342,8.127c3.021,0,6.14-0.426,9.271-1.264c14.249-3.818,35.947-18.455,21.178-73.58" +
  "c-2.591-9.668-7.013-19.764-12.383-29.699c7.78,8.186,16.008,15.52,24.396,20.979c18.412,11.985,34.471,18.063,47.731,18.063" +
  "c0,0,0,0,0.002,0c12.279,0,22.234-5.32,28.785-15.385c6.301-9.679,7.307-20.423,2.965-31.229" +
  "c10.941-3.994,18.262-11.923,21.25-23.077C375.957,223.957,374.129,197.848,319.006,183.076z" +
  "M189.186,239.186c-27.613,0-50-22.387-50-50c0-27.613,22.387-50,50-50c27.616,0,50,22.387,50,50" +
  "C239.186,216.799,216.802,239.186,189.186,239.186z";

/* ── Shape → inline style map ── */
const SHAPE_STYLES: Partial<Record<ShapeType, React.CSSProperties>> = {
  sakura: { borderRadius: "150% 0 150% 0" },
  "round-petal": { borderRadius: "50% 20% 50% 20% / 60% 30% 60% 30%" },
  teardrop: { borderRadius: "50% 50% 35% 35% / 70% 70% 30% 30%" },
  // Simple ovoid leaf: pointed tip → broad belly → narrow base
  leaf: {
    clipPath:
      "polygon(50% 0%,72% 18%,92% 48%,78% 82%,50% 100%,22% 82%,8% 48%,28% 18%)",
  },
  // Derived from the actual Canadian flag maple leaf SVG
  // (commons.wikimedia.org/wiki/File:Maple_Leaf.svg, viewBox -2015 -2000 4030 4030)
  // All 37 vertices of the path normalised to percentage of bounding box.
  maple: {
    clipPath:
      "polygon(" +
      "47.6% 100%," +   /* stem left              */
      "48.8% 78.6%," +  /* base left              */
      "45.8% 76.2%," +  /* arc: base-left notch   */
      "22.7% 79.9%," +  /* lower-left lobe        */
      "25.8% 72%," +    /* upper of lower-left    */
      "25.3% 70.1%," +  /* arc: left basal sinus  */
      "0% 51.2%," +     /* LEFT TIP               */
      "5.7% 48.8%," +   /* above left tip         */
      "6.6% 46.8%," +   /* arc: left-tip notch    */
      "1.6% 32.6%," +   /* upper-left lobe tip    */
      "16.2% 35.5%," +  /* sinus going right      */
      "18.1% 34.6%," +  /* arc: upper-left sinus  */
      "21% 28.4%," +    /* shoulder               */
      "32.3% 39.7%," +  /* inner valley           */
      "35.3% 38.3%," +  /* arc: inner sinus       */
      "29.8% 12.2%," +  /* UPPER-LEFT LOBE TIP    */
      "38.6% 16.8%," +  /* going right to top     */
      "41.1% 16.2%," +  /* arc: upper-left notch  */
      "50% 0%," +       /* TOP TIP                */
      "58.9% 16.2%," +  /* arc: upper-right notch */
      "61.4% 16.8%," +  /* going left from top    */
      "70.2% 12.2%," +  /* UPPER-RIGHT LOBE TIP   */
      "64.7% 38.3%," +  /* arc: inner sinus       */
      "67.7% 39.7%," +  /* inner valley           */
      "79% 28.4%," +    /* shoulder               */
      "81.9% 34.6%," +  /* arc: upper-right sinus */
      "83.8% 35.5%," +  /* sinus going left       */
      "98.4% 32.6%," +  /* upper-right lobe tip   */
      "93.4% 46.8%," +  /* arc: right-tip notch   */
      "94.3% 48.8%," +  /* above right tip        */
      "100% 51.2%," +   /* RIGHT TIP              */
      "74.7% 70.1%," +  /* arc: right basal sinus */
      "74.2% 72%," +    /* upper of lower-right   */
      "77.3% 79.9%," +  /* lower-right lobe       */
      "54.2% 76.2%," +  /* arc: base-right notch  */
      "51.2% 78.6%," +  /* base right             */
      "52.4% 100%" +    /* stem right             */
      ")",
  },
  snowflake: {
    background: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "1",
  },
  "pine-needle": { borderRadius: "1px" },
  berry: { borderRadius: "50%" },
  pinecone: { borderRadius: "45% 45% 60% 60% / 40% 40% 55% 55%" },
  acorn: { borderRadius: "45% 45% 55% 55%" },
};

/* ── Seeded PRNG (LCG) ── */
function seededRand(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* ── Particle data ── */
interface Particle {
  id: number;
  shape: ShapeType;
  left: string;
  width: number;
  height: number;
  color: string;
  fallDuration: string;
  swayDuration: string;
  delay: string;
  rotate: number;
  content?: string;
}

function generateParticles(season: SeasonConfig, seed: number): Particle[] {
  const rand = seededRand(seed);
  const particles: Particle[] = [];
  let id = 0;

  const totalWeight = season.elements.reduce((s, e) => s + (e.weight ?? 1), 0);

  for (const el of season.elements) {
    const n = Math.round(season.totalCount * (el.weight ?? 1) / totalWeight);
    for (let i = 0; i < n; i++) {
      const width = Math.floor(rand() * (el.maxW - el.minW + 1)) + el.minW;
      const ratio = el.hRatio[0] + rand() * (el.hRatio[1] - el.hRatio[0]);
      const height = Math.max(1, Math.floor(width * ratio));
      const color = el.colors[Math.floor(rand() * el.colors.length)];

      particles.push({
        id: id++,
        shape: el.shape,
        left: `${(rand() * 100).toFixed(2)}%`,
        width,
        height,
        color,
        fallDuration: `${(rand() * 9 + 8).toFixed(1)}s`,
        swayDuration: `${(rand() * 4 + 3).toFixed(1)}s`,
        delay: `${(rand() * 14).toFixed(1)}s`,
        rotate: Math.floor(rand() * 360),
        content: el.content,
      });
    }
  }

  return particles;
}

/* Pre-generate all season particles once (stable across renders) */
const ALL_PARTICLES = SEASONS.map((s, i) => generateParticles(s, 42 + i * 17));

/* ── Particle renderer ── */
function Particle({ p }: { p: Particle }) {
  const isSnowflake = p.shape === "snowflake";
  const isFlower = p.shape === "flower";
  const isDaisy = p.shape === "daisy";
  const shapeStyle = SHAPE_STYLES[p.shape] ?? {};

  const baseAnim: React.CSSProperties = {
    left: p.left,
    width: p.width,
    height: p.height,
    animationName: "fall, sway",
    animationDuration: `${p.fallDuration}, ${p.swayDuration}`,
    animationDelay: `${p.delay}, ${p.delay}`,
    transform: `rotate(${p.rotate}deg)`,
  };

  if (isFlower) {
    return (
      <svg
        className="petal"
        viewBox="0 0 378.832 378.832"
        aria-hidden="true"
        style={{ ...baseAnim, color: p.color, overflow: "visible" }}
      >
        <use href="#flower-sym" />
      </svg>
    );
  }

  if (isDaisy) {
    return (
      <svg
        className="petal"
        viewBox="0 0 378.371 378.371"
        aria-hidden="true"
        style={{ ...baseAnim, color: p.color, overflow: "visible" }}
      >
        <use href="#daisy-sym" />
      </svg>
    );
  }

  const style: React.CSSProperties = {
    ...shapeStyle,
    ...baseAnim,
    background: isSnowflake ? "transparent" : p.color,
    color: isSnowflake ? p.color : undefined,
    fontSize: isSnowflake ? p.width : undefined,
  };

  return (
    <span className="petal" style={style}>
      {p.content}
    </span>
  );
}

/* ── Main page ── */
export default function Home() {
  // Default to the current NC season based on today's date
  const [idx, setIdx] = useState(() => getNCSeasonIdx());
  const season = SEASONS[idx];
  const particles = ALL_PARTICLES[idx];

  const next = () => setIdx((i) => (i + 1) % SEASONS.length);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: season.background,
        transition: "background 1.2s ease",
      }}
    >
      {/* ── SVG symbol defs (hidden, reused by SVG particles) ── */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <symbol id="flower-sym" viewBox="0 0 378.832 378.832">
            <g fill="currentColor">
              {FLOWER_PATHS.map((d, i) => <path key={i} d={d} />)}
            </g>
          </symbol>
          <symbol id="daisy-sym" viewBox="0 0 378.371 378.371">
            <path fill="currentColor" d={DAISY_PATH} />
            <circle fill="#fbbf24" cx="189.186" cy="189.186" r="26.5" />
          </symbol>
        </defs>
      </svg>

      {/* ── Falling particles ── */}
      <div className="petals-container" aria-hidden="true">
        {particles.map((p) => (
          <Particle key={p.id} p={p} />
        ))}
      </div>

      {/* ── Welcome card ── */}
      <div
        className="welcome-text"
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "2rem 3rem",
          borderRadius: "1.5rem",
          background: season.cardBg,
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          border: "1px solid rgba(255,255,255,0.5)",
          transition: "background 1.2s ease",
        }}
      >
        <p
          style={{
            fontSize: "clamp(1.4rem, 4vw, 2.4rem)",
            fontWeight: 300,
            letterSpacing: "0.04em",
            color: season.textColor,
            margin: 0,
            lineHeight: 1.4,
            transition: "color 1.2s ease",
          }}
        >
          It&apos;s {" "}
          {idx == getNCSeasonIdx() ? "" : "not"}
          {" "}
          <span style={{ fontWeight: 600 }}>{season.label}</span>

          {" "}in North Carolina.
        </p>
      </div>

      {/* ── Season toggle (fixed bottom-right, persists on scroll) ── */}
      <button
        className="season-toggle"
        onClick={next}
        style={{
          background: season.toggleBg,
          color: season.toggleColor,
          transition: "background 0.6s ease, color 0.6s ease",
        }}
        title="Switch season"
        aria-label={`Current season: ${season.label}. Click to switch.`}
      >
        {season.emoji}&nbsp;{season.label}
      </button>
    </main>
  );
}
