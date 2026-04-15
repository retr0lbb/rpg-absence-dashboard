"use client"

import { useRef } from "react"
import { savePlayerAbsence } from "../_actions/save-player-absence"
import { NameSelectorInput } from "./select-names"

export function CreateAbsenceForm({ players }: { players: string[] }) {

  const formRef = useRef<HTMLFormElement>(null)
  function handleTodayDate() {
    const today = new Date().toISOString().split("T")[0]
    if (formRef.current) {
      formRef.current.date.value = today
    }
  }

  return (
    <form
      ref={formRef}
      action={async(formData) => {
        await savePlayerAbsence(formData)
      }}
      className="flex flex-col gap-5 p-5"
    >
      <div className="w-full text-4xl font-medium text-zinc-200 py-4">
        Quem Ramelou?
      </div>

      <label className="flex flex-col gap-2">
        Nome do Ramelão:

        {/* 🔥 IMPORTANTE: precisa ter name */}
        <NameSelectorInput
          players={players}
          name="playerName"
        />
      </label>

      <label className="flex flex-col gap-2">
        Razão:
        <textarea
          name="reason"
          className="w-full py-1.5 px-2 mt-2 border border-zinc-500 focus:border-blue-500 bg-zinc-800 text-white"
        />
      </label>

      <label className="flex items-center gap-2">
        Data:
        <input
          type="date"
          name="date"
          className="px-2 py-1 bg-zinc-800 text-white border border-zinc-500"
        />

        <button
          type="button"
          onClick={handleTodayDate}
          className="px-3 py-1 bg-zinc-700 text-white rounded"
        >
          Hoje
        </button>
      </label>

      <button
        type="submit"
        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  )
}