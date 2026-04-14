import { useEffect, useState } from "react"
import { useGetPlayerList } from "../_hooks/get_players_nameList"
import { usePlayerAbsencesData } from "../_hooks/get_player_absences"


export function ShowAbsencesForPlayer() {

    const { data: playerList, isError, isPending } = useGetPlayerList()

    const [selectedPlayer, setSelectedPlayer] = useState<string>("")
    const [dropdownVisible, setDropdownVisible] = useState(false)

    const formattedPlayerList = playerList?.map(p => p.player_name) ?? []

    useEffect(() => {
    if (formattedPlayerList.length > 0 && !selectedPlayer) {
        setSelectedPlayer(formattedPlayerList[0])
    }
    }, [formattedPlayerList, selectedPlayer])

    // ✅ HOOK SEMPRE CHAMADO
    const {
    data: absence,
    isPending: playerPending,
    isError: playerError
    } = usePlayerAbsencesData(selectedPlayer)

    function handleToggleDropdown() {
    setDropdownVisible(prev => !prev)
    }

    function handlePlayerSelect(player: string) {
        setSelectedPlayer(player)
        setDropdownVisible(false)
    }

    // 🔽 AGORA SIM pode ter returns
    if (isError || isPending) {
        return "Waiting players list"
    }

    if (!selectedPlayer || playerPending) {
        return "Loading player data..."
    }

    if (playerError) {
        return "Erro ao carregar faltas"
    }
    return (
        <div className="w-full h-dvh bg-zinc-900 flex flex-col items-center justify-center gap-10">
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

                {/* Conditionally render the PlayerSelect dropdown */}
                {dropdownVisible && (
                    <div className="absolute mt-2 bg-zinc-800 border border-white/10 rounded-lg w-64 shadow-lg z-10">
                        {/* Render all player names as options */}
                        {formattedPlayerList.map((name) => (
                            <div
                                key={name}
                                className="
                                    px-4 py-2 text-white hover:bg-zinc-700 transition-all cursor-pointer"
                                onClick={() => handlePlayerSelect(name)} // Click to select a player
                            >
                                {name}
                            </div>
                        ))} 
                    </div>
                )}
            </div>

            <div className="w-full grid grid-cols-3 place-items-center gap-5 px-32">
                {absence.absences.map((ab, index) => {
                    return (
                        <Absence 
                            date={new Date(ab.date).toISOString()}
                            index={index}
                            reason={ab.reason ?? ""}
                            key={ab.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}

function Absence(props: { reason: string; date: string, index: number }) {
    return (
        <div className="flex flex-col gap-4 w-full h-full p-4 bg-zinc-800 rounded-md border border-white/20">
            <div className="flex items-center justify-between">
                <p>date: {props.date}</p>
                <p>id: {props.index}</p>
            </div>

            <p className="px-5 text-lg whitespace-break-spaces">
                {props.reason}
            </p>
        </div>
    )
}