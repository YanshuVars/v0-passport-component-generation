"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface PassportPageProps {
  data: {
    fullName: string
    dateOfBirth: string
    nationality: string
    destination: string
    photo?: string
  }
  showStamp: boolean
  onClose: () => void
}

export default function PassportPage({ data, showStamp, onClose }: PassportPageProps) {
  const [stampVisible, setStampVisible] = useState(false)
  const [stampRotation, setStampRotation] = useState(0)
  const [fadeInElements, setFadeInElements] = useState(false)

  useEffect(() => {
    setFadeInElements(true)
  }, [])

  useEffect(() => {
    if (showStamp) {
      setStampRotation(Math.random() * 20 - 10)
      setStampVisible(true)
    }
  }, [showStamp])

  const generateDreamID = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 9; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const dreamID = generateDreamID()
  const issuedDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
  const expiryDate = new Date(new Date().setFullYear(new Date().getFullYear() + 10)).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="w-full max-w-5xl">
      <style>{`
        @keyframes bookOpen {
          from {
            opacity: 0;
            transform: perspective(1200px) rotateY(90deg) rotateX(0deg);
          }
          to {
            opacity: 1;
            transform: perspective(1200px) rotateY(0deg) rotateX(0deg);
          }
        }

        @keyframes fadeInStaggered {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes stampSlam {
          0% {
            opacity: 0;
            transform: translate(-40%, -50%) scale(1.3) rotate(-30deg);
          }
          70% {
            transform: translate(-40%, -50%) scale(0.9) rotate(var(--stamp-rotation));
          }
          100% {
            opacity: 1;
            transform: translate(-40%, -50%) scale(1) rotate(var(--stamp-rotation));
          }
        }

        .book-container {
          animation: bookOpen 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .fade-in-element {
          opacity: ${fadeInElements ? 1 : 0};
          transform: translateY(${fadeInElements ? 0 : 8}px);
          transition: all 0.6s ease-out;
        }

        .fade-in-1 { transition-delay: 0.4s; }
        .fade-in-2 { transition-delay: 0.6s; }
        .fade-in-3 { transition-delay: 0.8s; }
        .fade-in-4 { transition-delay: 1s; }
        .fade-in-5 { transition-delay: 1.2s; }

        .stamp-container {
          --stamp-rotation: ${stampRotation}deg;
          animation: stampSlam 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      <div className="book-container grid grid-cols-2 gap-0 bg-white rounded-lg shadow-2xl overflow-hidden border border-slate-200">
        {/* LEFT PAGE - Cover Interior */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-12 flex flex-col justify-between items-center text-center border-r-2 border-slate-300">
          <div className="space-y-8">
            {/* Emblem */}
            <div className="text-7xl opacity-30">🛡️</div>

            {/* Title */}
            <div className="space-y-4">
              <p className="text-sm font-bold text-amber-300 tracking-widest">ISSUED BY</p>
              <h2 className="text-3xl font-serif font-bold text-white">OFFICIAL</h2>
              <h2 className="text-3xl font-serif font-bold text-amber-200">PASSPORT</h2>
            </div>
          </div>

          {/* Footer */}
          <div className="space-y-2">
            <p className="text-xs text-amber-200/60 tracking-widest">VALID INDEFINITELY</p>
            <p className="text-[10px] text-amber-200/50">For official travel use only</p>
          </div>
        </div>

        {/* RIGHT PAGE - Main Details */}
        <div className="bg-gradient-to-b from-amber-50 to-orange-50 p-12 space-y-8">
          {/* Header */}
          <div className="fade-in-element fade-in-1 text-center space-y-2 border-b-2 border-amber-300/40 pb-4">
            <p className="text-xs font-bold text-amber-900 tracking-widest">PERSONAL INFORMATION</p>
            <h1 className="text-2xl font-serif font-bold text-amber-950">PASSPORT</h1>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-3 gap-6">
            {/* Photo */}
            <div className="fade-in-element fade-in-2 col-span-1 flex flex-col items-center space-y-2">
              <div className="w-28 h-36 bg-slate-300 rounded border-2 border-amber-900 flex items-center justify-center overflow-hidden shadow-md">
                {data.photo ? (
                  <img
                    src={data.photo || "/placeholder.svg"}
                    alt="Passport photo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl">📷</span>
                )}
              </div>
              <p className="text-[8px] font-bold text-amber-900 tracking-widest">PHOTO</p>
            </div>

            {/* Details */}
            <div className="fade-in-element fade-in-3 col-span-2 space-y-4">
              {/* Name */}
              <div>
                <p className="text-[8px] font-bold text-amber-800 tracking-wider mb-1">SURNAME / GIVEN NAMES</p>
                <p className="text-base font-serif font-bold text-amber-950 uppercase">{data.fullName}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[8px] font-bold text-amber-800 tracking-wider mb-1">DATE OF BIRTH</p>
                  <p className="text-xs font-mono text-amber-900">{formatDate(data.dateOfBirth)}</p>
                </div>
                <div>
                  <p className="text-[8px] font-bold text-amber-800 tracking-wider mb-1">NATIONALITY</p>
                  <p className="text-xs font-mono text-amber-900">{data.nationality}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Destination */}
          <div className="fade-in-element fade-in-4 space-y-2 border-y-2 border-amber-300/40 py-3">
            <p className="text-[8px] font-bold text-amber-800 tracking-widest">AUTHORIZED DESTINATION</p>
            <p className="text-lg font-serif font-bold text-amber-950 uppercase">{data.destination}</p>
          </div>

          {/* Footer Details */}
          <div className="fade-in-element fade-in-5 grid grid-cols-3 gap-4 text-center text-xs">
            <div>
              <p className="text-[8px] font-bold text-amber-800 tracking-widest mb-1">PASSPORT ID</p>
              <p className="font-mono text-amber-900">{dreamID}</p>
            </div>
            <div>
              <p className="text-[8px] font-bold text-amber-800 tracking-widest mb-1">ISSUED</p>
              <p className="text-amber-900">{issuedDate}</p>
            </div>
            <div>
              <p className="text-[8px] font-bold text-amber-800 tracking-widest mb-1">EXPIRES</p>
              <p className="text-amber-900">{expiryDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stamp - Overlays on the right page */}
      {stampVisible && (
        <div className="absolute right-24 top-1/2 transform -translate-y-1/2 stamp-container pointer-events-none">
          <svg className="w-32 h-32" viewBox="0 0 120 120" style={{ transform: `rotate(${stampRotation}deg)` }}>
            <circle cx="60" cy="60" r="50" fill="none" stroke="#dc2626" strokeWidth="3" opacity="0.9" />
            <circle cx="60" cy="60" r="45" fill="none" stroke="#dc2626" strokeWidth="1" opacity="0.5" />
            <text
              x="60"
              y="55"
              textAnchor="middle"
              className="font-bold text-2xl"
              fill="#dc2626"
              opacity="0.9"
              style={{ fontSize: "20px", fontWeight: "bold" }}
            >
              ✓
            </text>
            <text
              x="60"
              y="72"
              textAnchor="middle"
              className="text-xs font-bold"
              fill="#dc2626"
              opacity="0.9"
              style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "0.2em" }}
            >
              APPROVED
            </text>
          </svg>
        </div>
      )}

      {/* Close Button */}
      <div className="mt-8 flex justify-center">
        <Button
          onClick={onClose}
          className="bg-blue-900 hover:bg-blue-950 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Close Passport
        </Button>
      </div>
    </div>
  )
}
