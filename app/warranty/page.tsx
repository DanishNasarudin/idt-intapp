import React from "react";

type Props = {};

const Warranty = (props: Props) => {
  return (
    <>
      <div className="hidden sm:flex flex-col gap-16 w-full px-8 py-4">
        <div>Home</div>
      </div>
      <div className="sm:hidden flex justify-center items-center h-[100vh] text-center w-full">
        <h2>Use Desktop PC</h2>
      </div>
    </>
  );
};

export default Warranty;
