"use client";

import { useEffect, useState } from "react";

const WORDS = [
  { left: "ROCK N", right: "' ROLL" },
  { left: "ENTRE", right: "VISTAS" },
  { left: "CENA ", right: "LOCAL" },
  { left: "CUIA", right: "BANA" },
  { left: "PROSA ", right: "ROCK" },
];

const WORD_INTERVAL = 380;
const OPEN_DELAY = WORDS.length * WORD_INTERVAL + 350;
const HIDE_DELAY = OPEN_DELAY + 800;

export function Curtain() {
  const [show, setShow] = useState(true);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const wordTimer = setInterval(() => {
      setIndex((current) => {
        if (current < WORDS.length - 1) return current + 1;
        clearInterval(wordTimer);
        return current;
      });
    }, WORD_INTERVAL);

    const openTimer = setTimeout(() => setOpen(true), OPEN_DELAY);
    const hideTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, HIDE_DELAY);

    return () => {
      clearInterval(wordTimer);
      clearTimeout(openTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  const transformFor = (i: number) =>
    i <= index ? `translateY(-${(index - i) * 100}%)` : "translateY(100%)";

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden font-display text-4xl font-extrabold uppercase text-white md:text-8xl">
      <div
        className={`flex h-full w-screen items-center justify-end overflow-hidden bg-black transition-transform duration-700 ease-in-out ${
          open ? "-translate-x-full" : ""
        }`}
      >
        <div className="relative flex h-[1em] w-full items-center overflow-hidden pr-1">
          {WORDS.map((word, i) => (
            <span
              key={`left-${i}`}
              className="absolute w-full text-right transition-transform duration-500 ease-in-out"
              style={{ transform: transformFor(i) }}
            >
              {word.left}
            </span>
          ))}
        </div>
      </div>

      <div
        className={`flex h-full w-screen items-center justify-start overflow-hidden bg-black transition-transform duration-700 ease-in-out ${
          open ? "translate-x-full" : ""
        }`}
      >
        <div className="relative flex h-[1em] w-full items-center overflow-hidden pl-1">
          {WORDS.map((word, i) => (
            <span
              key={`right-${i}`}
              className="absolute w-full text-left transition-transform duration-500 ease-in-out"
              style={{ transform: transformFor(i) }}
            >
              <span className="prosa-gradient-text">{word.right}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
