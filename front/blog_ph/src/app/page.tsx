"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import Header from '@/src/components/header';
import Banner from "../components/banner";
import Posts from "../components/posts";

export default function Homepage() {

  return (
    <div className="min-h-screen h-full overflow-y-auto flex flex-col">
      <Header />
      <Banner />
      <Posts />
      {/* <div>
        <h1 className="text-2xl font-bold mb-4">Posts</h1>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="p-4 border rounded-lg shadow">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
