import { Suspense } from "react";
import { AbsenceGraph } from "./_components/absence-graph";
import { ShowAbsencesForPlayer } from "./_components/show-absences";
import { CreateAbsenceModal } from "./_components/create-absence-modal";
import { getPlayersAbsenceData } from "./_actions/get-players-absence";
import { getUserNames } from "./_actions/get-names";

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ player?: string }>
}) {

  const params = await searchParams

  const playerData = await getPlayersAbsenceData()
  const names = await getUserNames()

  const mappedNames = names.map(n => n.player_name)

  return (
    <div className="w-full min-h-dvh overflow-x-hidden flex flex-col">
      <div className="w-full min-h-dvh flex flex-col">
        <div className="w-full flex items-center justify-center mt-10">
        <h1 className="text-3xl text-zinc-200">Grafico das <strong className="text-cyan-300">{"ramelações".toUpperCase()}</strong> que teve no rpg do Vitão.</h1>
      </div>

      <div className="w-full h-full flex flex-1 flex-col items-center justify-center gap-6">
        <div className="flex w-full items-center justify-center">
          <Suspense fallback={<p>Loading data...</p>}>
            <AbsenceGraph data={playerData} />
          </Suspense>
        </div>

        <CreateAbsenceModal names={mappedNames} />

      </div>
      </div>

      <Suspense fallback={<p>Loading data</p>}>
        <ShowAbsencesForPlayer selectedPlayer={params.player} />
      </Suspense>
    </div>
  );
}
