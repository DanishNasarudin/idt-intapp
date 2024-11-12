import InputHeader from "../../components/gallery/InputHeader";

type Props = {};

const Gallery = (props: Props) => {
  return (
    <>
      <div className="hidden md:flex flex-col gap-16 w-full py-8">
        <h2>PC Photo Gallery</h2>
        <InputHeader />
        <section>table</section>
      </div>
      <div className="md:hidden flex justify-center items-center h-[100vh] text-center w-full">
        <h2>Use Desktop PC</h2>
      </div>
    </>
  );
};

export default Gallery;
