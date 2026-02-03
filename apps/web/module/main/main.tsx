"use client";
import Image from "next/image";
import Header from "../header/header";
import { useState } from "react";
export default function Main() {
  const [search, setSearch] = useState<string>("");
  return (
    <>
      <Header setSearch={setSearch} />
      {search ? (
        <h1> searchdata:{search}</h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center">
              <Image
                src="/images/Component1.png"
                alt="Cover"
                fill
                className="object-cover"
                sizes="200vw"
              />
            </div>

            <div className="px-4 pt-3">
              <h3 className="text-lg font-semibold">Card Title</h3>
            </div>
            <div className="px-4 pb-4 pt-1">
              <p className="text-sm text-gray-600">
                Yeh short description hai jo card ke neeche show hogi.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center">
              <Image
                src="/images/Component1.png"
                alt="Cover"
                fill
                className="object-cover"
                sizes="200vw"
              />
            </div>

            <div className="px-4 pt-3">
              <h3 className="text-lg font-semibold">Card Title</h3>
            </div>
            <div className="px-4 pb-4 pt-1">
              <p className="text-sm text-gray-600">
                Yeh short description hai jo card ke neeche show hogi.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center">
              <Image
                src="/images/Component1.png"
                alt="Cover"
                fill
                className="object-cover"
                sizes="200vw"
              />
            </div>

            <div className="px-4 pt-3">
              <h3 className="text-lg font-semibold">Card Title</h3>
            </div>
            <div className="px-4 pb-4 pt-1">
              <p className="text-sm text-gray-600">
                Yeh short description hai jo card ke neeche show hogi.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center">
              <Image
                src="/images/Component1.png"
                alt="Cover"
                fill
                className="object-cover"
                sizes="200vw"
              />
            </div>

            <div className="px-4 pt-3">
              <h3 className="text-lg font-semibold">Card Title</h3>
            </div>
            <div className="px-4 pb-4 pt-1">
              <p className="text-sm text-gray-600">
                Yeh short description hai jo card ke neeche show hogi.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center">
              <Image
                src="/images/Component1.png"
                alt="Cover"
                fill
                className="object-cover"
                sizes="200vw"
              />
            </div>

            <div className="px-4 pt-3">
              <h3 className="text-lg font-semibold">Card Title</h3>
            </div>
            <div className="px-4 pb-4 pt-1">
              <p className="text-sm text-gray-600">
                Yeh short description hai jo card ke neeche show hogi.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center">
              <Image
                src="/images/Component1.png"
                alt="Cover"
                fill
                className="object-cover"
                sizes="200vw"
              />
            </div>

            <div className="px-4 pt-3">
              <h3 className="text-lg font-semibold">Card Title</h3>
            </div>
            <div className="px-4 pb-4 pt-1">
              <p className="text-sm text-gray-600">
                Yeh short description hai jo card ke neeche show hogi.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
