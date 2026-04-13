"use client"
import { useState } from "react";
import { AbsenceGraph } from "./_components/absence-graph";
import { Modal } from "./_components/modal";
import { CreateAbsenceForm } from "./_components/form";
import { ShowAbsencesForPlayer } from "./_components/show-absences";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="w-full min-h-dvh overflow-x-hidden flex flex-col">
      <div className="w-full min-h-dvh flex flex-col">
        <div className="w-full flex items-center justify-center mt-10">
        <h1 className="text-3xl text-zinc-200">Grafico das <strong className="text-cyan-300">{"ramelações".toUpperCase()}</strong> que teve no rpg do Vitão.</h1>
      </div>

      <div className="w-full h-full flex flex-1 flex-col items-center justify-center gap-6">
        <div className="flex w-full items-center justify-center">
          <AbsenceGraph />
        </div>

        <div className="w-2/3 px-20">
          <button className="px-5 py-2 bg-zinc-900 
            text-xl border border-zinc-800 
            rounded-md cursor-pointer text-zinc-200 
            hover:bg-white/10 transition-all"
            onClick={() => setIsVisible(true)}
          >
            Nova Ramelação
           </button>
         </div>
      </div>

      <Modal isVisible={isVisible} closeModal={() => setIsVisible(false)}>
        <CreateAbsenceForm />
      </Modal>
      </div>

      <ShowAbsencesForPlayer />
    </div>
  );
}
