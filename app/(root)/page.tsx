// pages/index.tsx
import React from "react";
import { Header } from "@/components/Header";
import ContentManager from "@/components/ContentManager";
import { Item } from "@/types";

const initialItems: Item[] = [
  {
    id: 1,
    title: "Item 1",
    subItems: [
      { id: 1.1, title: "Subitem 1.1", content: { title: "Subitem 1.1", body: "This is the content for Subitem 1.1. Lorem ipsum dolor sit amet, consectetur adipiscing elit." } },
      { id: 1.2, title: "Subitem 1.2", content: { title: "Subitem 1.2", body: "This is the content for Subitem 1.2. Lorem ipsum dolor sit amet, consectetur adipiscing elit." } },
    ],
  },
  {
    id: 2,
    title: "Item 2",
    subItems: [
      { id: 2.1, title: "Subitem 2.1", content: { title: "Subitem 2.1", body: "This is the content for Subitem 2.1. Lorem ipsum dolor sit amet, consectetur adipiscing elit." } },
      { id: 2.2, title: "Subitem 2.2", content: { title: "Subitem 2.2", body: "This is the content for Subitem 2.2. Lorem ipsum dolor sit amet, consectetur adipiscing elit." } },
    ],
  },
];

const initialSelectedContent = initialItems[0].subItems[0].content;

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ContentManager initialItems={initialItems} initialSelectedContent={initialSelectedContent} />
    </div>
  );
};

export default Home;
