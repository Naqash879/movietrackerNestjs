"use client";
import Image from "next/image";
import Header from "../header/header";
import { useState } from "react";
export default function MovieDetail() {
  const [search, setSearch] = useState<string>("");
  return (
    <>
      <Header setSearch={setSearch} />
      {search ? (
        <h1> searchdata:{search}</h1>
      ) : (
        <div className="grid grid-cols-1 sm:flex flex-row gap-6">
          <div className="bg-white md:flex flex-col w-full rounded-xl shadow overflow-hidden">
            <div className=" md:flex">
              <div className="relative w-full h-40 md:h-100 md:w-1/2 lg:w-1/4 bg-gray-100 flex items-center justify-center">
                <Image
                  src="/images/Component1.png"
                  alt="Cover"
                  fill
                  className="object-cover md:object-fill"
                  sizes="200vw"
                />
              </div>
              <div className="flex flex-col">
                <div className="px-4 pt-3">
                  <h3 className="text-lg font-semibold">Card Title</h3>
                  <p>The Gray Man</p>
                </div>
                <div className="px-4 pb-4 pt-1 md:pt-4">
                  <h3 className="text-lg font-semibold">Card Description</h3>
                  <p className="text-sm text-gray-600">
                    Yeh short description hai jo card ke neeche show hogi.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="px-4 pb-4 pt-1 flex justify-between">
                <p className="font-bold">
                  Reviews:
                  <span className="text-[14px] text-gray-300"> 8k</span>{" "}
                </p>
                <p className="font-bold">
                  Rating:
                  <span className="text-[14px] text-gray-300"> 8/10</span>{" "}
                </p>
              </div>
              <div className="px-4 pb-4 pt-1 flex justify-between">
                <p className="font-bold">
                  Created-At:{" "}
                  <span className="text-[14px] text-gray-300">
                    {" "}
                    03/02/2026
                  </span>{" "}
                </p>
                <p className="font-bold">
                  Updated-At:{" "}
                  <span className="text-[14px] text-gray-300"> 03/02/2026</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
