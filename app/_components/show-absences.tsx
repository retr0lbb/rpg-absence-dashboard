import { getUserNames } from "../_actions/get-names";
import { getPlayerAbsence } from "../_actions/get-player-absence";
import { AbsenceList } from "./absence-list";
import { PlayerSelector } from "./player-selector";


interface ShowAbsencesForPlayerProps {
    selectedPlayer?: string
}
export async function ShowAbsencesForPlayer({selectedPlayer} : ShowAbsencesForPlayerProps) {

    const players = await getUserNames()

    const playerList = players.map(p => p.player_name)

    const currentPlayer = selectedPlayer || playerList[0]

    const absences = await getPlayerAbsence(currentPlayer)


    return (
        <div className="w-full h-dvh bg-zinc-900 flex flex-col items-center justify-center gap-10">
            <PlayerSelector players={playerList} selectedPlayer={currentPlayer} />
            <AbsenceList absences={absences}/>
        </div>
    )
}
