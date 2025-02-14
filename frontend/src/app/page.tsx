"use client"

import ribbon from "../../public/stickers/ribbon.png"
import waxSeal from "../../public/stickers/wax seal.png"
import starButton from "../../public/stickers/starButton.png"

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[15rem] h-[10rem] bg-white border border-gray-200 rounded-lg shadow-lg mt-36">
        <h1 className="absolute mt-4 text-left text-[12px] font-amiri w-[6rem] mx-auto left-0 right-0">
          "To my Melany,
          Here's a little space I made for 
          you this Valentines! I hope you
          enjoy it" 
        </h1>
        <Image src={ribbon} alt="ribbon" className="absolute -top-8 -left-4" />
        <Image src={waxSeal} alt="wax seal" className="absolute -top-4 right-0" />
        <Image src={starButton} alt="star button" className="absolute top-20 left-0" />
      </div>
    </div>
  );
}
