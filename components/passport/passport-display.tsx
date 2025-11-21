"use client"

import { useState, useEffect } from "react"
import PassportCover from "./passport-cover"
import PassportPage from "./passport-page"
import { Button } from "@/components/ui/button"

interface PassportDisplayProps {
  data: {
    fullName: string
    dateOfBirth: string
    nationality: string
    destination: string
    photo?: string
  }
  onReset: () => void
}

export default function PassportDisplay({ data, onReset }: PassportDisplayProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showStamp, setShowStamp] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const stampTimer = setTimeout(() => {
        setShowStamp(true)
      }, 3000)
      return () => clearTimeout(stampTimer)
    }
  }, [isOpen])

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center relative py-8 px-4">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-100 to-blue-50 pointer-events-none" />

      {/* Main passport area */}
      <div className="relative z-20 flex items-center justify-center">
        {!isOpen ? (
          <PassportCover data={data} onOpen={() => setIsOpen(true)} />
        ) : (
          <PassportPage data={data} showStamp={showStamp} onClose={() => setIsOpen(false)} />
        )}
      </div>

      {/* Reset button */}
      {isOpen && (
        <Button
          onClick={onReset}
          variant="outline"
          className="absolute bottom-8 left-8 z-30 border-slate-400 text-slate-700 hover:bg-slate-100 bg-transparent"
        >
          Start Over
        </Button>
      )}
    </div>
  )
}
