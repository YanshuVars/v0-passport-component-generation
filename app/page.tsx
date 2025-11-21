"use client"

import { useState } from "react"
import PassportForm from "@/components/passport/passport-form"
import PassportDisplay from "@/components/passport/passport-display"

interface PassportData {
  fullName: string
  dateOfBirth: string
  nationality: string
  destination: string
  photo?: string
}

export default function Home() {
  const [passportData, setPassportData] = useState<PassportData | null>(null)

  const handleReset = () => {
    setPassportData(null)
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4">
      {!passportData ? (
        <PassportForm onSubmit={setPassportData} />
      ) : (
        <PassportDisplay data={passportData} onReset={handleReset} />
      )}
    </main>
  )
}
