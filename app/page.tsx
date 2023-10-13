"use client";

import React, { useState } from "react";

import Image from "next/image";
import { images } from "./images";

export default function Home() {
  const data: any = images;

  type DataItem = {
    filename: string;
    title: string;
    featured: boolean;
    collection: string;
  };

  const [featured, setFeatured] = React.useState<boolean>(true);
  const [collections, setCollections] = React.useState<string[]>([]);

  const toggleCollections = (collection: string) => {
    collections.includes(collection)
      ? setCollections(collections.filter((e) => e !== collection))
      : setCollections((collections) => [...collections, collection]);
  };

  return (
    <>
      <header className="p-6">
        <h1 className="text-3xl font-mono text-center">
          Jamie Newbigging Pics
        </h1>
      </header>
      <main>
        <div className="flex items-center w-screen flex items-center justify-center">
          <div className="bg-pink-500 p-4 rounded-lg m-2">
            <p className="text-white text-lg font-bold">Filters</p>
          </div>

          <form className="bg-purple-500 p-4 rounded-lg m-2">
            <label>
              Featured
              <input
                type="radio"
                value="Featured"
                checked={featured === true}
                onChange={() => setFeatured(true)}
                className="mx-2"
              />
            </label>
            <label>
              All
              <input
                type="radio"
                value="Featured"
                checked={featured === false}
                onChange={() => setFeatured(false)}
                className="mx-2"
              />
            </label>
          </form>

          <div className="flex items-center bg-blue-500 p-4 rounded-lg">
            <p>Collection: </p>
            {["Dublin", "Edinburgh", "Glasgow"].map((collection) => (
              <div key={collection} className="mx-2">
                <label htmlFor={collection}>{collection}</label>
                <input
                  type="checkbox"
                  name={collection}
                  checked={collections.includes(collection)}
                  onChange={() => toggleCollections(collection)}
                  className="mx-1"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="">
          {data.map((item: DataItem, i: number) => {
            if (featured && !item.featured) {
              return;
            }
            if (collections.length > 0) {
              if (!collections.includes(item.collection)) {
                return;
              }
            }
            return (
              <div
                key={i}
                className="w-screen flex items-center justify-center"
              >
                <div className="m-2 bg-gray-900 p-4 rounded-lg">
                  <Image
                    src={`/${item.filename}.jpg`}
                    alt={item.title}
                    width={1}
                    height={1}
                    sizes="100vw"
                    style={{
                      maxWidth: "25vw",
                      width: "100%",
                      height: "auto",
                    }}
                    className="rounded-lg"
                  />
                  <p className="text-center pt-3">{item.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
