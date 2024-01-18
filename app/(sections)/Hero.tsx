import React from "react";
import Image from "next/image";
import Link from "next/link";
import hero from "@/public/hero-graphic.webp";
import heromob from "@/public/hero-graphic-mob.webp";

type Props = {};

const Hero = (props: Props) => {
  const imageSize = 300;
  return (
    <div className="w-full flex flex-col gap-4 item-center relative h-[100vh]">
      <div
        className="max-w-[1060px] mx-auto w-full flex gap-10 relative justify-center items-center py-8 pb-4 sm:py-8 md:py-[85px] sm:pb-24 md:pb-[150px] px-4 z-[5]
      "
      >
        <div className="texts flex flex-col gap-4 items-center text-center max-w-[500px] w-full">
          <h1 className="leading-none">
            Ideal Tech PC <br /> Internal App
          </h1>
          <p>Hopefully this helps.</p>
          <div className="flex gap-4 mt-0 sm:mt-8">
            <Link href={"#positions"}>
              <button className="py-2 px-4 sm:py-4 sm:px-8 border-white border-[1px] rounded-lg w-fit mx-auto mobilehover:hover:bg-white/20 transition-all">
                <p className="text-[10px] sm:text-sm">
                  <b>Nothing Yet..</b>
                </p>
              </button>
            </Link>
            <Link href={"/warranty"}>
              <button className="py-2 px-4 sm:py-4 sm:px-8 border-transparent border-[1px] rounded-lg bg-accent mobilehover:hover:bg-accent/80 w-fit mx-auto transition-all">
                <p className="text-[10px] sm:text-sm">
                  <b>Warranty Entry</b>
                </p>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden sm:block bg-gradient-to-r from-transparent from-0% md:from-20% via-primary to-100% md:to-80% to-primary h-full w-full absolute z-[2]" />
      <div className="hidden sm:block bg-gradient-to-r from-transparent from-0% md:from-20% via-primary to-100% md:to-80% to-primary h-full w-full absolute z-[2]" />
      <Image
        src={hero}
        alt="bg-graphic"
        className="absolute max-w-[800px] w-full top-[-180px] md:top-[-80px] left-[-170px] md:left-[100px] hidden sm:block opacity-90"
      />
      <div className="block sm:hidden overflow-clip w-full h-[150px]">
        <Image
          src={heromob}
          alt="bg-graphic"
          className="max-w-[800px] mt-[-320px] ml-[-180px] block sm:hidden opacity-90"
        />
      </div>
    </div>
  );
};

export default Hero;
