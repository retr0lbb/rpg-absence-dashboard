"use client";
import { useState } from "react";
import { Modal } from "./modal";
import { CreateAbsenceForm } from "./form";

interface CreateAbsenceModalProps {
	names: string[];
}
export function CreateAbsenceModal({ names }: CreateAbsenceModalProps) {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<>
			<div className="w-full px-5 flex items-center justify-center">
				<button
					type="button"
					className="px-5 py-2 bg-zinc-900 
                  text-xl border border-zinc-800 
                  rounded-md cursor-pointer text-zinc-200 
                  hover:bg-white/10 transition-all"
					onClick={() => setIsVisible(true)}
				>
					Nova Ramelação
				</button>
			</div>

			<Modal isVisible={isVisible} closeModal={() => setIsVisible(false)}>
				<CreateAbsenceForm players={names} />
			</Modal>
		</>
	);
}
