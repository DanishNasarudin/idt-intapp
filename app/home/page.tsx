import { Inter } from "next/font/google";
import Hero from "../(sections)/Hero";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  return (
    <main className={`${inter.className} flex flex-col mx-auto`}>
      {/* <section className="h-[80px]"></section> */}
      <Hero />
    </main>
  );
}
