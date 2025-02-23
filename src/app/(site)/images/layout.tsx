import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Background Remover",
  description: "Remove image background automatically in one click",
  creator: "WEB PROJECT SOLUTIONS LTD",
};

export default function ImagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 