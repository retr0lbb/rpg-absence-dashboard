"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface Props {
    players: string[]
    selectedPlayer: string
}

export function PlayerSelector({ players, selectedPlayer }: Props) {
    const [dropdownVisible, setDropdownVisible] = useState(false)

    const router = useRouter()
    const searchParams = useSearchParams()

    function handleToggleDropdown() {
        setDropdownVisible(prev => !prev)
    }

    function handlePlayerSelect(player: string) {
        const params = new URLSearchParams(searchParams.toString())
        params.set("player", player)

        router.push(`?${params.toString()}`)
        setDropdownVisible(false)
    }

    return (
        <div className="relative">
            <h1 className="text-zinc-200 text-3xl">
                Mostrando todas as faltas de{" "}
                <strong
                    className="text-cyan-400 cursor-pointer hover:underline"
                    onClick={handleToggleDropdown}
                >
                    {selectedPlayer}
                </strong>
            </h1>

            {dropdownVisible && (
                <div className="absolute mt-2 bg-zinc-800 border border-white/10 rounded-lg w-64 shadow-lg z-10">
                    {players.map((name) => (
                        <div
                            key={name}
                            className="px-4 py-2 text-white hover:bg-zinc-700 cursor-pointer"
                            onClick={() => handlePlayerSelect(name)}
                        >
                            {name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}