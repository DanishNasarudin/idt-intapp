type Props = {
  src: string;
  text: string;
};

function Offer({ src, text }: Props) {
  return (
    <div className="w-full h-full flex justify-start items-center text-left xs:max-w-[240px] bg-zinc-900 p-4 rounded-2xl">
      <img
        src={src}
        alt={"offer"}
        className="min-w-[32px] max-w-[50px] xs:max-w-none w-[40%]"
      />
      <h6 className="ml-4 min-w-[68px] w-full">{text}</h6>
    </div>
  );
}

export default Offer;
