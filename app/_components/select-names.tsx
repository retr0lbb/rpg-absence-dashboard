"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Props {
  players: string[]
  selectedPlayer?: string
  name: string
}

export function NameSelectorInput({ players, selectedPlayer, name }: Props) {
  const [inputValue, setInputValue] = useState(selectedPlayer ?? "")
  const [isFocused, setIsFocused] = useState(false)

  const router = useRouter()

  function handleSelect(player: string) {
    setInputValue(player)
    setIsFocused(false)

    router.push(`?player=${player}`)
  }

  const filteredPlayers = players.filter(p =>
    p.toLowerCase().includes(inputValue.toLowerCase())
  )

  // 🔥 só mostra se tiver foco E tiver resultado
  const shouldShowDropdown = isFocused && filteredPlayers.length > 0

  return (
    <div className="relative w-72">
      
      {/* INPUT */}
      <input
        name={name}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          // delay pra permitir clique no dropdown antes de fechar
          setTimeout(() => setIsFocused(false), 100)
        }}
        placeholder="Selecione ou digite um nome..."
        className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-white/10 focus:outline-none"
      />

      {/* DROPDOWN */}
      {shouldShowDropdown && (
        <div className="absolute w-full mt-1 bg-zinc-800 border border-white/10 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
          
          {filteredPlayers.map(player => (
            <div
              key={player}
              onMouseDown={() => handleSelect(player)} // 🔥 melhor que onClick
              className="px-4 py-2 hover:bg-zinc-700 cursor-pointer"
            >
              {player}
            </div>
          ))}

        </div>
      )}

    </div>
  )
}