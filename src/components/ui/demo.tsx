'use client'

import { LetterSwapForward, LetterSwapPingPong } from "@/components/ui/letter-swap"

function AllFeaturesExample() {
  return (
    <div className="w-full h-full rounded-lg text-xl md:text-3xl flex flex-col items-center justify-center font-calendas">
      <div className="p-12 text-[#0015ff] rounded-xl align-text-top gap-y-1 md:gap-y-2 flex flex-col">
        <LetterSwapForward
          label="Hover me chief!"
          reverse={true}
          className="italic"
        />
        <LetterSwapForward
          label="{awesome}"
          reverse={false}
          className="font-bold"
        />
        <LetterSwapForward
          label="Good day!"
          staggerFrom={"center"}
          className="mono"
        />
        <LetterSwapPingPong
          label="More text?"
          staggerFrom={"center"}
          reverse={false}
          className="font-overusedGrotesk font-bold"
        />
        <LetterSwapPingPong
          label="oh, seriously?!"
          staggerFrom={"last"}
        />
      </div>
    </div>
  )
}

function StaggerDirectionsExample() {
  return (
    <div className="w-full h-full text-3xl flex md:flex-row flex-col items-center justify-center font-calendas gap-x-12 gap-y-4 text-[#0015ff]">
      <LetterSwapForward label="First" staggerFrom={"first"} />
      <LetterSwapForward label="Center" staggerFrom={"center"} />
      <LetterSwapForward label="Last" staggerFrom={"last"} />
    </div>
  )
}

function InstantAnimationExample() {
  return (
    <div className="w-full h-full min-h-[500px] text-3xl flex flex-row gap-12 items-center justify-center font-calendas bg-[#0015ff]">
      <div className="items-center justify-center grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 text-white">
        <LetterSwapForward label="oh, wow!" staggerDuration={0} />
        <LetterSwapForward label="nice!" staggerDuration={0} reverse={false} />
      </div>
    </div>
  )
}

export {
  AllFeaturesExample,
  StaggerDirectionsExample,
  InstantAnimationExample
}
