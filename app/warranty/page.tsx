import React from "react";

type Props = {};

const Warranty = (props: Props) => {
  return (
    <>
      <div className="hidden md:flex flex-col gap-16 w-full px-8 py-4 h-[100vh]">
        <div>Home</div>
        <div>Stay tuned...</div>
      </div>
      <div className="md:hidden flex justify-center items-center h-[100vh] text-center w-full">
        <h2>Use Desktop PC</h2>
      </div>
    </>
  );
};

export default Warranty;
