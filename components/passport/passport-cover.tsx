"use client"

import { useState } from "react"

interface PassportCoverProps {
  data: {
    fullName: string
    dateOfBirth: string
    nationality: string
    destination: string
    photo?: string
  }
  onOpen: () => void
}

export default function PassportCover({ data, onOpen }: PassportCoverProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="perspective w-full max-w-lg">
      <style>{`
        @keyframes coverSlide {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .passport-cover {
          animation: coverSlide 0.8s ease-out;
        }
        
        .cover-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        
        .passport-cover:hover .cover-shine {
          left: 100%;
        }
      `}</style>

      <div
        className="passport-cover relative w-full cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onOpen}
      >
        {/* Main passport cover */}
        <div className="relative w-full bg-blue-900 rounded-lg overflow-hidden shadow-2xl border border-amber-600/30 aspect-[9/14] flex flex-col items-center justify-center p-8 text-center">
          {/* Decorative top border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-80" />

          {/* Embossed seal circle */}
          <div className="absolute top-8 text-6xl drop-shadow-lg opacity-20">🛡️</div>

          {/* Content */}
          <div className="relative space-y-6 flex flex-col items-center justify-center h-full">
            {/* Main title */}
            <div className="space-y-4">
              <p className="text-xs font-bold text-amber-300 tracking-[0.3em] opacity-80">OFFICIAL DOCUMENT</p>
              <h1 className="text-5xl font-serif font-bold text-white tracking-widest">PASSPORT</h1>
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto opacity-70" />
            </div>

            {/* Passport number */}
            <div className="space-y-3 pt-4">
              <p className="text-[10px] text-amber-300/60 tracking-widest font-light">PASSPORT NUMBER</p>
              <p className="text-sm font-mono text-amber-200 tracking-widest">
                {`PP${Math.random().toString(36).substring(2, 10).toUpperCase()}`}
              </p>
            </div>

            {/* Bottom text */}
            <div className="absolute bottom-6 space-y-2 text-center">
              <p className="text-[10px] text-amber-200/50 tracking-widest">CLICK TO OPEN</p>
              <p
                className={`text-xs text-amber-200/70 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                Official Travel Authorization
              </p>
            </div>
          </div>

          {/* Decorative bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-80" />

          {/* Shine effect */}
          <div className="cover-shine" />
        </div>
      </div>
    </div>
  )
}
