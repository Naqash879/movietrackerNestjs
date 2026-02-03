import Image from "next/image";
import Header from "@/module/header/header";
import Main from "@/module/main/main";
export default function Home() {
  return (
    <div className="flex gap-6 flex-col min-h-screen p-2  bg-zinc-50 font-sans dark:bg-black">
      <Main />
    </div>
  );
}
