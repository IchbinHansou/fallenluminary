'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import Image from 'next/image'
import PoemSection from '@/components/PoemSection'
import PoetryHero from '@/components/PoetryHero'
import SpecialPoemAtlas from '@/components/SpecialPoemAtlas'
import SpecialPoemMythOfGenius from '@/components/SpecialPoemMythOfGenius'
import TableOfContents from '@/components/TableOfContents'
import MusicListPlayer from '@/components/MusicListPlayer'
import Navigation from '@/components/Navigation'

const poems = [
  {
    id: 2,
    title: "坠落的星辰",
    lines: [
      "我曾是天空中最亮的那颗星",
      "在黑夜里为迷途的旅人指引方向",
      "可我累了",
      "厌倦了永恒的闪烁",
      "",
      "于是我坠落",
      "像一滴泪水滑过宇宙的脸颊",
      "人们说那是流星",
      "其实那是我对自由的渴望",
      "",
      "坠入人间的那一刻",
      "我失去了光芒",
      "却得到了温暖",
      "原来，黯淡也是一种美丽"
    ]
  },
  {
    id: 3,
    title: "夜语",
    lines: [
      "月亮对我说",
      "\"你不需要永远发光\"",
      "",
      "星星对我说",
      "\"有时候，静静陪伴就够了\"",
      "",
      "而夜空对我说",
      "\"在我怀里，你可以休息\"",
      "",
      "所以我学会了",
      "在黑暗中",
      "温柔地",
      "做自己"
    ]
  },
  {
    id: 4,
    title: "光的记忆",
    lines: [
      "我还记得成为星星前的日子",
      "那时我只是一粒尘埃",
      "在宇宙深处漂浮",
      "",
      "后来我燃烧、发光",
      "人们仰望我，赞美我",
      "可他们不知道",
      "光芒的背后是孤独的燃烧",
      "",
      "现在我坠落了",
      "重新成为尘埃",
      "却不再感到渺小",
      "因为我懂得了",
      "每一粒尘埃",
      "都曾是星辰"
    ]
  }
]

export default function PoemsPage() {
  // 生成静态星星位置（使用 useMemo 确保只生成一次）
  const stars = useMemo(() => 
    Array.from({ length: 80 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.2,
    })), []
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <Navigation />
      {/* 诗歌英雄头图 */}
      <PoetryHero />

      {/* 苹果风格纯黑色背景 */}
      <div className="relative z-10 bg-black">
        <div className="fixed inset-0 bg-black" />
        
        {/* 微妙的星星背景 */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {stars.map((star, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
              animate={{
                opacity: [star.opacity, star.opacity * 1.5, star.opacity],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 pt-32 pb-32">
          {/* 第一首特殊诗歌 - Atlas */}
          <div id="atlas">
            <SpecialPoemAtlas />
          </div>

          {/* 第二首特殊诗歌 - The Myth of Genius */}
          <div id="myth-of-genius" className="mt-32">
            <SpecialPoemMythOfGenius />
          </div>

          {/* 其他诗歌 */}
          <div className="space-y-32 mt-32">
            {poems.map((poem, index) => (
              <div key={poem.id} id={poem.id === 2 ? 'fallen-stars' : poem.id === 3 ? 'night-whispers' : 'light-memory'}>
                <PoemSection poem={poem} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <TableOfContents />
      <MusicListPlayer />
    </div>
  )
}

