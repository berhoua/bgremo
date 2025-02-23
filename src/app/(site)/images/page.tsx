import DropZone from "@/components/DropZone";
import HowTo from "@/components/HowTo";
import ImageGallery from "@/components/ImageGallery";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "AI Background Remover",
  description: "Remove image background automatically in one click",
  creator: "WEB PROJECT SOLUTIONS LTD",
};

export default function page() {
  return (
    <section className='mx-auto flex max-w-[100dvw] flex-1 flex-col gap-10 px-4 py-10 md:w-[840px]'>
      <div className="mx-auto text-center space-y-6">
        <div className="relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#6C5CE7] to-transparent" />
          <div className="flex items-center justify-center gap-4 mb-4">
           
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CE7] to-[#574db2]">
              Background Remover
            </h1>
          </div>
          <p className="text-secondary text-xl max-w-[600px] mx-auto leading-relaxed font-medium">
            Transform your images instantly. <span className="text-[#6C5CE7]">Remove backgrounds</span> with a single click and unleash your creative vision.
          </p>
        </div>
      </div>
      <DropZone />
      <HowTo />
      <Suspense>
        <ImageGallery />
      </Suspense>
    </section>
  )
}