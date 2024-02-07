"use client";

import { useState } from "react";
import { RiArrowDropDownFill, RiArrowDropLeftFill } from "react-icons/ri";
import Offer from "../(components)/Offer";

type Props = {};

const offers = [
  {
    src: "https://idealtech.com.my/wp-content/uploads/2023/03/icons-01.png",
    text: "Lifetime FREE Labor Charges.",
  },
  {
    src: "https://idealtech.com.my/wp-content/uploads/2023/03/icons-02.png",
    text: "90 days One to One Exchange.",
  },
  {
    src: "https://idealtech.com.my/wp-content/uploads/2023/03/icons-03.png",
    text: "FREE On-Site Service in KL, Johor, Penang.",
  },
  {
    src: "https://idealtech.com.my/wp-content/uploads/2023/03/icons-04.png",
    text: "Full Years Warranty Up to 10 Years.",
  },
  {
    src: "https://idealtech.com.my/wp-content/uploads/2023/03/icons-05.png",
    text: "FREE Warranty Pick-Return All Malaysia.",
  },
  {
    src: "https://idealtech.com.my/wp-content/uploads/2023/03/icons-08.png",
    text: "Lifetime Technical Support.",
  },
];

function Offers({}: Props) {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div
        className="
            flex flex-wrap gap-4 justify-evenly [&>div]:w-full xs:[&>div]:w-auto
            "
        id="idt__main-section"
      >
        <div>
          <Offer src={offers[0].src} text={offers[0].text} />
        </div>
        <div>
          <Offer src={offers[1].src} text={offers[1].text} />
        </div>
        <div>
          <Offer src={offers[2].src} text={offers[2].text} />
        </div>
        <div className={`hidden offer:block`}>
          <Offer src={offers[3].src} text={offers[3].text} />
        </div>
        <div className={`hidden offer:block`}>
          <Offer src={offers[4].src} text={offers[4].text} />
        </div>
        <div className={`hidden offer:block`}>
          <Offer src={offers[5].src} text={offers[5].text} />
        </div>
      </div>
      <div
        className={` ${
          toggle ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        } grid transition-all`}
      >
        <div className="overflow-hidden flex flex-wrap gap-4 justify-evenly pt-4 sm:py-0 [&>div]:w-full xs:[&>div]:w-auto">
          <div className={`block offer:hidden`}>
            <Offer src={offers[3].src} text={offers[3].text} />
          </div>
          <div className={`block offer:hidden`}>
            <Offer src={offers[4].src} text={offers[4].text} />
          </div>
          <div className={`block offer:hidden`}>
            <Offer src={offers[5].src} text={offers[5].text} />
          </div>
        </div>
      </div>

      <button
        className="
      relative z-[1] flex text-center mx-auto underline text-accent items-center my-4 mobilehover:hover:text-white
      offer:hidden"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        See More{" "}
        {toggle ? (
          <RiArrowDropDownFill size={30} />
        ) : (
          <RiArrowDropLeftFill size={30} />
        )}
      </button>
      {/* <p className="text-center text-zinc-400 mb-10">
        Terms & Conditions Apply.
      </p> */}
    </>
  );
}

export default Offers;
