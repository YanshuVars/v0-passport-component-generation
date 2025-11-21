"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PassportFormProps {
  onSubmit: (data: {
    fullName: string
    dateOfBirth: string
    nationality: string
    destination: string
    photo?: string
  }) => void
}

export default function PassportForm({ onSubmit }: PassportFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    nationality: "",
    destination: "",
    photo: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          photo: event.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.fullName && formData.dateOfBirth && formData.nationality && formData.destination) {
      onSubmit(formData)
    }
  }

  return (
    <div className="w-full max-w-md relative z-10">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .form-container {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>

      <div className="form-container glass rounded-2xl p-8 backdrop-blur-xl border border-blue-300/20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Passport Generator</h1>
          <p className="text-slate-600 text-sm">Fill your details to create your official passport</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label className="text-slate-700 font-medium">Full Name</Label>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Alexander Smith"
              className="border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label className="text-slate-700 font-medium">Date of Birth</Label>
            <Input
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="border-slate-300 text-slate-900 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Nationality */}
          <div className="space-y-2">
            <Label className="text-slate-700 font-medium">Nationality</Label>
            <Input
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              placeholder="United States"
              className="border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Destination */}
          <div className="space-y-2">
            <Label className="text-slate-700 font-medium">Destination</Label>
            <Input
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Paris, France"
              className="border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label className="text-slate-700 font-medium">Profile Photo</Label>
            <label className="border-slate-300 border-2 border-dashed rounded-lg p-4 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition flex flex-col items-center justify-center bg-slate-50">
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              {formData.photo ? (
                <img
                  src={formData.photo || "/placeholder.svg"}
                  alt="Profile"
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <div className="text-center">
                  <div className="text-3xl mb-2">📷</div>
                  <p className="text-slate-600 text-sm">Click to upload your photo</p>
                </div>
              )}
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-950 text-white font-semibold py-3 rounded-lg transition duration-300 mt-8 shadow-lg hover:shadow-xl"
          >
            Generate Passport
          </Button>
        </form>
      </div>
    </div>
  )
}
