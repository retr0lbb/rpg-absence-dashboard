"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
	players: string[];
	selectedPlayer: string;
}

export function PlayerSelector({ players, selectedPlayer }: Props) {
	const [dropdownVisible, setDropdownVisible] = useState(false);

	const router = useRouter();
	const searchParams = useSearchParams();

	function handleToggleDropdown() {
		setDropdownVisible((prev) => !prev);
	}

	function handlePlayerSelect(player: string) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("player", player);

		router.push(`?${params.toString()}`, { scroll: false });
		setDropdownVisible(false);
	}

	return (
		<div className="relative">
			<h1 className="text-zinc-200 text-2xl md:text-3xl w-full flex text-center flex-col px-6">
				Mostrando todas as faltas de
				<button
					type="button"
					className="text-cyan-400 cursor-pointer hover:underline text-4xl flex items-center justify-center active:outline"
					onClick={handleToggleDropdown}
				>
					{selectedPlayer}

					{dropdownVisible === false && <ChevronDown />}
					{dropdownVisible === true && <ChevronUp />}
				</button>
			</h1>

			{dropdownVisible && (
				<div className="absolute bg-zinc-800 border border-white/10 rounded-lg w-auto px-6 h-auto flex flex-col shadow-lg z-10">
					{players.map((name) => (
						<button
							type="button"
							key={name}
							className="px-4 py-2 text-white hover:bg-zinc-700 cursor-pointer"
							onClick={() => handlePlayerSelect(name)}
						>
							{name}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
