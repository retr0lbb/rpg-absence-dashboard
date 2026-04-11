import { AbsenceGraph } from "./_components/absence-graph";

export default function Home() {
  return (
    <div className="w-full h-dvh">
      <div className="w-full flex items-center justify-center mt-10">
        <h1 className="text-3xl text-zinc-200">Grafico das ramelações que teve no rpg do Vitão.</h1>
      </div>

      <div className="w-full h-full flex items-center justify-center gap-20">
        <div className="flex flex-1 max-w-4/5">
          <AbsenceGraph />
        </div>
      </div>
    </div>
  );
}
