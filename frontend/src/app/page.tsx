"use client"

import ribbon from "../../public/stickers/ribbon.png"
import waxSeal from "../../public/stickers/wax seal.png"
import starButton from "../../public/stickers/starButton.png"
import sfPolaroid from "../../public/stickers/sfPolaroid.png"
import miffy1 from "../../public/stickers/miffy1.png"
import stargazerLily from "../../public/stickers/stargazerLily.png"
import strawberry from "../../public/stickers/strawberry.png"
import matcha from "../../public/stickers/matcha.png"
import kiwi from "../../public/stickers/kiwi.png"
import conch from "../../public/stickers/conch.png"
import blueHeart from "../../public/stickers/blueHeart.png"

import point5Polaroid from "../../public/stickers/point5 polaroid.png"

import miffyPolaroid from "../../public/stickers/miffy polaroid.png"

import gardenPolaroid from "../../public/stickers/garden polaroid.png"
import tomato from "../../public/stickers/tomato.png"

import museumPolaroid from "../../public/stickers/museum polaroid.png"
import animeSticker from "../../public/stickers/animeIcon.png"

import sushiPolaroid from "../../public/stickers/sushi polaroid.png"
import sonnyAngel from "../../public/stickers/sonnyAngel.png"

import aquariumPolaroid from "../../public/stickers/aquarium polaroid.png"
import goldfish from "../../public/stickers/goldfish.png"
import purpleButton from "../../public/stickers/purpleButton.png"

import snoopyAndMiffy from "../../public/stickers/snoopyAndMiffyHugging.png"
import arrow from "../../public/stickers/arrow.png"

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [noClicks, setNoClicks] = useState(0);
  const [saidYes, setSaidYes] = useState(false);
  const [showContent, setShowContent] = useState(false);

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
         <h1 className="text-[24px] font-amiri mt-4 font-bold">{questionText}</h1>
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
      {/* first header, should be able to open up a side panel */}
      <div className="relative w-[8rem] h-[3rem] bg-white border border-gray-200 rounded-lg shadow-lg mt-8">
        <ol className="absolute mt-4 text-center text-[12px] font-amiri w-[6rem] mx-auto left-0 right-0">
          1. Start here! 🍵
        </ol>
      </div>
      {/* sf polaroid */}
      <div className="relative mt-10">
        {/* polaroid base */}
        <div className="relative w-[150px] h-[175px]">
          <Image 
            src={sfPolaroid} 
            alt="sf polaroid" 
            className="absolute top-0 left-0"
            width={300}
            height={400}
          />
          <p className="absolute bottom-4 left-0 right-0 text-center text-[12px] font-mooMoo">
            SF with you was so lovely
          </p>
          <Image src={stargazerLily} alt="stargazer lilly" className="absolute top-0 left-48" width={50} height={50} />
          <Image src={strawberry} alt="strawberry" className="absolute top-0 right-44" width={70} height={67} />
          <Image src={matcha} alt="matcha" className="absolute top-32 left-48" width={100} height={80} />
        </div>
        
        {/* miffy sticker overlay */}
        <div className="absolute w-[40px] h-[60px] top-[-20px] left-[20px] z-10">
          <Image 
            src={miffy1} 
            alt="miffy" 
            className="absolute -top-2 left-24"
          />
        </div>
      </div>
      {/* header 2 */}
      <div className="relative w-[12rem] h-[3rem] bg-white border border-gray-200 rounded-lg shadow-lg mt-12">
        <ol className="absolute mt-4 text-center text-[12px] font-amiri w-[10rem] mx-auto left-0 right-0">
          2. Couple things I love about you 
        </ol>
        <Image 
          src={kiwi} 
          alt="kiwi" 
          className="absolute top-6 -left-24" 
          width={55} 
          height={60} 
          priority
        />
      </div>
      {/* Grid container with relative positioning */}
      <div className="relative grid grid-cols-3 gap-4 mt-8">
        {[
          "You're the smartest animal science girl from Santa Ana I know",
          "I love the way you always make me laugh",
          "You're very sweet, caring, and creative",
          "Nobody loves Miffy like you do",
          "Your outfits are always so cute",
          "Thank you for always trying to wake me up even if it doesn't work",
          "I love how we can always talk about anything and everything",
          "Thank you for laughing at my stupid jokes",
          "I appreciate you being so understanding and patient with me",
        ].map((text, index) => (
          <div 
            key={index}
            className="w-[8rem] h-[4rem] bg-white border border-gray-200 rounded-lg shadow-lg mt-6"
          >
            <p className="text-[12px] font-amiri text-center">
              {text}
            </p>
          </div>
        ))}
        {/* conch sticker */}
        <div className="absolute -right-4 top-16">
          <Image src={conch} alt="conch" width={60} height={80} />
        </div>
        {/* blue heart sticker */}
        <div className="absolute left-64 top-48">
          <Image src={blueHeart} alt="blue heart" width={40} height={40} />
        </div>
      </div>

      {/* header 3 */}
      <div className="relative w-[12rem] h-[3rem] bg-white border border-gray-200 rounded-lg shadow-lg mt-12">
        <ol className="absolute mt-4 text-center text-[12px] font-amiri w-[10rem] mx-auto left-0 right-0">
          3. Some of my favorite moments
        </ol>
      </div>
      {/* photo display of polaroids */}
      <div className="relative grid grid-cols-2 gap-y-28 gap-x-10 mt-8 justify-items-center max-w-[400px] mx-auto">
        {[
          point5Polaroid,
          miffyPolaroid,
          gardenPolaroid,
          museumPolaroid,
          sushiPolaroid,
          aquariumPolaroid,
        ].map((polaroid, index) => (
          <div key={index} className="relative w-[150px] h-[175px]">
            <Image src={polaroid} alt="polaroid" className="absolute top-0 left-0" />
            {polaroid === museumPolaroid && (
              <><Image
                src={animeSticker}
                alt="anime sticker"
                className="absolute -bottom-14 -right-4"
                width={90}
                height={90} 
              /><Image
                  src={sonnyAngel}
                  alt="sonny angel"
                  className="absolute top-52 right-60"
                  width={60}
                  height={60} />
                <Image
                  src={tomato}
                  alt="tomato"
                  className="absolute top-40 right-72"
                  width={35}
                  height={35} />
                <Image
                  src={goldfish}
                  alt="goldfish"
                  className="absolute top-60 -right-2 z-10"
                  width={90}
                  height={90} />
                <Image
                  src={purpleButton}
                  alt="purple button"
                  className="absolute top-[27rem] right-28 z-10"
                  width={35}
                  height={35} />
              </>
            )}
          </div>
        ))}
      </div>
      {/* snoopy and miffy image */}
      <div className="relative w-[150px] h-[175px] mt-8">
        <Image src={snoopyAndMiffy} alt="snoopy and miffy" className="absolute top-0 right-12" />
        <Image src={arrow} alt="arrow" className="absolute top-6 -right-8" />
        <p className="absolute -top-2 -right-20 text-[40px] font-mooMoo">Us</p>
      </div>
        </>
      )}

    </div>
  );
}
