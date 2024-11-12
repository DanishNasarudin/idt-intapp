"use client";
import { useState } from "react";

type Props = {
  question: string;
  answer: string;
};

const Question = ({ question, answer }: Props) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div
      className="flex flex-col cursor-pointer"
      onClick={() => {
        setToggle(!toggle);
      }}
    >
      <h3 className="mb-4">{question}</h3>
      <div
        className={` ${
          toggle ? "grid-rows-[1fr] mb-4" : "grid-rows-[0fr]"
        } grid transition-all`}
      >
        <div className="overflow-hidden">
          <p>{answer}</p>
        </div>
      </div>
      <div className="border-[1px] border-zinc-700"></div>
    </div>
  );
};

export default Question;
