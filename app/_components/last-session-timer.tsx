"use client";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";
import { Modal } from "./modal";

dayjs.extend(duration);

const STORAGE_KEY = "lastSessionDate";

function getInitialDate(): Date | null {
	if (typeof window === "undefined") return null;
	const stored = localStorage.getItem(STORAGE_KEY);
	return stored ? new Date(stored) : null;
}

export function LastSessionTimer() {
	const [lastSession, setLastSession] = useState<Date | null>(getInitialDate);
	const [now, setNow] = useState(dayjs());
	const [modalOpen, setModalOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		const stored = getInitialDate();
		if (stored) setLastSession(stored);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setNow(dayjs());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	function handleSave() {
		if (!inputValue) return;
		const date = new Date(inputValue);
		localStorage.setItem(STORAGE_KEY, date.toISOString());
		setLastSession(date);
		setModalOpen(false);
	}

	function handleOpenModal() {
		if (lastSession) {
			const local = dayjs(lastSession).format("YYYY-MM-DDTHH:mm");
			setInputValue(local);
		} else {
			setInputValue("");
		}
		setModalOpen(true);
	}

	function formatDuration() {
		if (!lastSession) return null;

		const diff = now.diff(dayjs(lastSession));
		const dur = dayjs.duration(diff);

		const days = Math.floor(dur.asDays());
		const hours = dur.hours();
		const minutes = dur.minutes();
		const seconds = dur.seconds();

		const pad = (n: number) => String(n).padStart(2, "0");

		return (
			<div className="flex items-center gap-3 text-5xl md:text-7xl font-mono font-bold tracking-wider tabular-nums">
				<span className="flex flex-col items-center">
					<span>{pad(days)}</span>
					<span className="text-xs md:text-sm font-sans font-normal text-zinc-500 uppercase tracking-widest">
						dias
					</span>
				</span>
				<span className="text-zinc-600 -mt-6">:</span>
				<span className="flex flex-col items-center">
					<span>{pad(hours)}</span>
					<span className="text-xs md:text-sm font-sans font-normal text-zinc-500 uppercase tracking-widest">
						horas
					</span>
				</span>
				<span className="text-zinc-600 -mt-6">:</span>
				<span className="flex flex-col items-center">
					<span>{pad(minutes)}</span>
					<span className="text-xs md:text-sm font-sans font-normal text-zinc-500 uppercase tracking-widest">
						min
					</span>
				</span>
				<span className="text-zinc-600 -mt-6">:</span>
				<span className="flex flex-col items-center">
					<span>{pad(seconds)}</span>
					<span className="text-xs md:text-sm font-sans font-normal text-zinc-500 uppercase tracking-widest">
						seg
					</span>
				</span>
			</div>
		);
	}

	return (
		<>
			<div className="flex flex-col items-center gap-4">
				<button
					type="button"
					onClick={handleOpenModal}
					className="text-lg md:text-xl text-zinc-400 hover:text-cyan-300 transition-colors cursor-pointer"
				>
					{lastSession
						? `Última sessão foi há`
						: "Clique para definir a última sessão"}
				</button>

				{formatDuration()}

				{lastSession && (
					<p className="text-xs text-zinc-600">
						{dayjs(lastSession).format("DD/MM/YYYY [às] HH:mm")}
					</p>
				)}
			</div>

			<Modal isVisible={modalOpen} closeModal={() => setModalOpen(false)}>
				<div className="flex flex-col gap-5 p-4">
					<h2 className="text-2xl font-medium text-zinc-200">
						Definir última sessão
					</h2>

					<label className="flex flex-col gap-2 text-zinc-400">
						Data e hora da última sessão:
						<input
							type="datetime-local"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							className="px-3 py-2 bg-zinc-900 text-white border border-zinc-600 rounded-md focus:outline-none focus:border-cyan-500"
						/>
					</label>

					<div className="flex gap-3 justify-end">
						<button
							type="button"
							onClick={() => setModalOpen(false)}
							className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 rounded-md cursor-pointer transition-colors"
						>
							Cancelar
						</button>
						<button
							type="button"
							onClick={handleSave}
							className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md cursor-pointer transition-colors"
						>
							Salvar
						</button>
					</div>
				</div>
			</Modal>
		</>
	);
}
