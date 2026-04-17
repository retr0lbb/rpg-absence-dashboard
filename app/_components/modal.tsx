/** biome-ignore-all lint/a11y/noStaticElementInteractions: It should not behave as a button */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: Only intended to work with Mouse and click */
"use client";
import type React from "react";

interface ModalProps {
	isVisible: boolean;
	children: React.ReactNode;
	closeModal: () => void;
}

export function Modal({ isVisible, children, closeModal }: ModalProps) {
	if (!isVisible) return null;

	return (
		<div
			className="flex z-20 items-center justify-center fixed inset-0 w-full p-5 h-full bg-zinc-950/40 backdrop-blur-lg"
			onClick={(e) => {
				if (e.target === e.currentTarget) closeModal();
			}}
		>
			<div
				className="bg-zinc-800 p-5 rounded-md w-full max-w-125 z-30"
				onClick={(e) => e.isPropagationStopped()}
			>
				{children}
			</div>
		</div>
	);
}
