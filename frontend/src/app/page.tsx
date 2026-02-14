"use client"

import Image from "next/image";
import confetti from "canvas-confetti";

import first_frame from "../../public/polaroids/first_frame.png"
import second_frame from "../../public/polaroids/second_frame.png"
import third_frame from "../../public/polaroids/third_frame.png"
import fourth_frame from "../../public/polaroids/fourth_frame.png"

import felix from "../../public/stickers2/felix.png"
import lily from "../../public/stickers2/lily.png"
import miffy from "../../public/stickers2/miffy.png"
import smiski from "../../public/stickers2/smiski.png"

import paper from "../../public/other/paper.svg"
import scrapbook from "../../public/other/scrapbook.svg"

import { useState, useRef, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";

const Crossword = dynamic(
  () => import("@jaredreisinger/react-crossword").then((mod) => mod.default),
  { ssr: false }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) as any;

function fireworkCelebration() {
  const duration = 2500;
  const end = Date.now() + duration;
  const colors = ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff", "#5f27cd"];

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
      shapes: ["circle", "square"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
      shapes: ["circle", "square"],
    });
    confetti({
      particleCount: 5,
      angle: 90,
      spread: 100,
      origin: { x: 0.5, y: 0.6 },
      colors,
      shapes: ["circle", "square"],
      scalar: 1.2,
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
}

export default function Home() {
  const [noClicks, setNoClicks] = useState(0);
  const [saidYes, setSaidYes] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const [carouselIndex, setCarouselIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const [paperDismissed, setPaperDismissed] = useState(false);
  const paperTouchStartX = useRef(0);

  const answerKey = [
    { num: 1, answer: "GOODFRIENDS" },
    { num: 2, answer: "DUMPLINGHOUSE" },
    { num: 3, answer: "CLIFFBAR" },
    { num: 4, answer: "SNORLAX" },
    { num: 5, answer: "BIS2A" },
    { num: 6, answer: "SUSHI" },
    { num: 7, answer: "SANFRANCISCO" },
    { num: 8, answer: "CHEETOH" },
  ];
  const paperTouchDeltaX = useRef(0);

  const carouselFrames = [first_frame, second_frame, third_frame, fourth_frame];

  const crosswordData = useMemo(
    () => ({
      across: {
        1: { clue: "Our poke place", answer: "GOODFRIENDS", row: 0, col: 0 },
        6: { clue: "Your fav pillow", answer: "SUSHI", row: 5, col: 5 },
        4: { clue: "Our favorite food to eat together", answer: "SNORLAX", row: 6, col: 8 },
        7: { clue: "Our 1 year date", answer: "SANFRANCISCO", row: 11, col: 11 },
      },
      down: {
        2: { clue: "Our first date", answer: "DUMPLINGHOUSE", row: 0, col: 9 },
        3: { clue: "My old morning snacks I'd buy at the MU", answer: "CLIFFBAR", row: 5, col: 12 },
        5: { clue: "Our only class together", answer: "BIS2A", row: 2, col: 13 },
        8: { clue: "Cat we saw", answer: "CHEETOH", row: 11, col: 18 },
      },
    }),
    []
  );

  const crosswordTheme = useMemo(
    () => ({
      columnBreakpoint: "0px",
      gridBackground: "transparent",
      cellBackground: "#fff",
      cellBorder: "#000",
      textColor: "#000",
      numberColor: "rgba(0,0,0,0.4)",
      focusBackground: "#f7c6c7",
      highlightBackground: "#fef3f3",
    }),
    []
  );

  const handleSwipeStart = useCallback((clientX: number) => {
    touchStartX.current = clientX;
    touchDeltaX.current = 0;
    setDragging(true);
  }, []);

  const handleSwipeMove = useCallback((clientX: number) => {
    if (!dragging) return;
    const delta = clientX - touchStartX.current;
    touchDeltaX.current = delta;
    setDragOffset(delta);
  }, [dragging]);

  const handleSwipeEnd = useCallback(() => {
    if (!dragging) return;
    setDragging(false);
    setDragOffset(0);
    if (touchDeltaX.current < -40) {
      setCarouselIndex((prev) => Math.min(prev + 1, carouselFrames.length - 1));
    } else if (touchDeltaX.current > 40) {
      setCarouselIndex((prev) => Math.max(prev - 1, 0));
    }
  }, [dragging, carouselFrames.length]);

  const handlePaperSwipeStart = useCallback((clientX: number) => {
    paperTouchStartX.current = clientX;
    paperTouchDeltaX.current = 0;
  }, []);

  const handlePaperSwipeMove = useCallback((clientX: number) => {
    paperTouchDeltaX.current = clientX - paperTouchStartX.current;
  }, []);

  const handlePaperSwipeEnd = useCallback(() => {
    if (Math.abs(paperTouchDeltaX.current) > 80) {
      setPaperDismissed(true);
    }
  }, []);

  const questionText = saidYes
    ? "Yay!"
    : noClicks === 0
      ? "Will you be my valentine?"
      : noClicks === 1
        ? "Are you sure?"
        : "Please reconsider";

  const yesButtonSize =
    noClicks === 0 ? "px-12 py-8" : noClicks === 1 ? "px-14 py-9 text-base" : "px-16 py-10 text-lg";
  const noButtonSize =
    noClicks === 0 ? "px-12 py-8" : noClicks === 1 ? "px-10 py-6 text-sm" : "px-6 py-4 text-xs";

  const noButtonClicked = () => setNoClicks((prev) => Math.min(prev + 1, 2));
  return (
    <div className="flex flex-col items-center min-h-screen mb-12">
      {/* first section, gif + yes or no button */}
      <div className="flex flex-col items-center justify-center w-full max-w-[250px] text-center mt-16">
        <Image
          src="https://media.tenor.com/QhaBUYKxgb0AAAAi/dance-gomu.gif"
          alt="Dance Gomu sticker"
          width={239}
          height={232}
          className="w-full h-auto object-contain"
          unoptimized
        />
        {!showContent && (
          <>
         <h1 className="text-lg sm:text-xl md:text-[24px] font-amiri mt-4 font-bold px-2">{questionText}</h1>
         <div className="flex flex-row gap-4 mt-4 justify-center items-center">
          <button
            onClick={() => {
            setSaidYes(true);
            setTimeout(() => setShowContent(true), 500);
          }}
            className={`bg-[#075019] text-white rounded-md border border-black transition-all ${yesButtonSize}`}
          >
            Yes
          </button>
          <button
            onClick={noButtonClicked}
            className={`bg-[#BE2C2C] text-white rounded-md border border-black transition-all ${noButtonSize}`}
          >
            No
          </button>
         </div>
          </>
        )}
        {saidYes && !showContent && (
          <div className="flex flex-col items-center mt-8">
            <div className="pixel-loading-bar">
              <div className="pixel-loading-bar-fill" />
            </div>
            <span className="pixel-loading-text">LOADING...</span>
          </div>
        )}
      </div>
      {showContent && (
        <>
      {/* carousel of polaroids */}
      <div className="flex flex-col items-center mt-8 w-full max-w-[250px]">
        <div
          className="relative w-[250px] h-[370px] overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing select-none"
          onTouchStart={(e) => handleSwipeStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleSwipeMove(e.touches[0].clientX)}
          onTouchEnd={handleSwipeEnd}
          onMouseDown={(e) => { e.preventDefault(); handleSwipeStart(e.clientX); }}
          onMouseMove={(e) => handleSwipeMove(e.clientX)}
          onMouseUp={handleSwipeEnd}
          onMouseLeave={handleSwipeEnd}
        >
          <div
            className={`flex h-full ${!dragging ? "transition-transform duration-300 ease-in-out" : ""}`}
            style={{
              transform: `translateX(calc(-${carouselIndex * 250}px + ${dragOffset}px))`,
            }}
          >
            {carouselFrames.map((frame, index) => {
              const stickers = [miffy, smiski, felix, lily];
              const positions = [
                "top-0 -right-2",     // miffy: top-right
                "top-0 -left-2",      // smiski: top-left
                "bottom-1 -left-8",   // felix: bottom-left
                "bottom-0 -right-2",  // lily: bottom-right
              ];
              return (
                <div key={index} className="relative w-[250px] h-[370px] flex-shrink-0 overflow-hidden">
                  <Image
                    src={frame}
                    alt={`polaroid ${index + 1}`}
                    fill
                    className="object-contain pointer-events-none"
                    draggable={false}
                  />
                  <Image
                    src={stickers[index]}
                    alt="sticker"
                    width={120}
                    height={120}
                    className={`absolute ${positions[index]} z-10 pointer-events-none`}
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {/* star indicators */}
        <div className="flex gap-2 mt-3">
          {carouselFrames.map((_, index) => (
            <button
              key={index}
              onClick={() => setCarouselIndex(index)}
              className="transition-colors text-[14px] leading-none"
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === carouselIndex ? "★" : "☆"}
            </button>
          ))}
        </div>
      </div>

      {/* crossword puzzle */}
      <div className="crossword-section relative mt-16 sm:mt-24 md:mt-32 w-full max-w-[800px] flex flex-row flex-wrap gap-x-2 px-2 sm:px-4 pb-12 sm:pb-0">
        {!paperDismissed ? (
          <div
            className="absolute bottom-[-0.5rem] left-1/2 -translate-x-1/2 sm:bottom-auto sm:left-auto sm:translate-x-0 sm:-top-12 sm:-right-8 md:-top-20 md:-right-20 z-10 cursor-grab active:cursor-grabbing select-none touch-pan-y w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-52 lg:h-52"
            onTouchStart={(e) => handlePaperSwipeStart(e.touches[0].clientX)}
            onTouchMove={(e) => handlePaperSwipeMove(e.touches[0].clientX)}
            onTouchEnd={handlePaperSwipeEnd}
            onMouseDown={(e) => { e.preventDefault(); handlePaperSwipeStart(e.clientX); }}
            onMouseMove={(e) => handlePaperSwipeMove(e.clientX)}
            onMouseUp={handlePaperSwipeEnd}
            onMouseLeave={handlePaperSwipeEnd}
          >
            <div className="relative w-full h-full">
              <Image
                src={paper}
                alt="paper"
                fill
                sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 176px, 208px"
                draggable={false}
                className="pointer-events-none object-contain"
              />
            </div>
          </div>
        ) : (
          <div
            className="absolute bottom-[-0.5rem] left-1/2 -translate-x-1/2 sm:bottom-auto sm:left-auto sm:translate-x-0 sm:-top-12 sm:-right-8 md:-top-20 md:-right-60 z-10 w-[200px] sm:w-[260px] md:w-[320px] lg:w-[360px] origin-center"
            style={{ transform: "rotate(12deg)" }}
          >
            <div className="bg-transparent text-gray-800/90 text-xs sm:text-sm font-medium space-y-1 sm:space-y-2 p-2 sm:p-4">
              {answerKey.map(({ num, answer }, i) => (
                <div key={i} className="flex gap-1 sm:gap-2 items-baseline">
                  <span className="text-gray-600/90 shrink-0">{num}.</span>
                  <span className="font-mono tracking-wide break-all">{answer}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <Crossword
    onCrosswordComplete={(correct: boolean) => {
      if (correct) fireworkCelebration();
    }}
    data={crosswordData}
    theme={crosswordTheme}
    useStorage
    storageKey="valentines-crossword"
  />
      </div>

      {/* scrapbook */}
      <div className="flex justify-center mt-16 w-full px-4">
        <Image
          src={scrapbook}
          alt="Scrapbook"
          width={500}
          height={500}
          className="w-full max-w-[500px] h-auto object-contain"
        />
      </div>
    </>
    )}
    </div>
  );
}
