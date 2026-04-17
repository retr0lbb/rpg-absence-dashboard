"use client";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

interface AbsenceGraphProps {
	data: {
		_count: {
			player_name: number;
		};
		player_name: string;
	}[];
}

export function AbsenceGraph({
	data: unFormattedAbsenceData,
}: AbsenceGraphProps) {
	const absenceData = unFormattedAbsenceData.map((ab) => {
		return {
			count: ab._count.player_name,
			name: ab.player_name,
		};
	});

	const data = {
		labels: absenceData.map((item) => item.name), // X-Axis = Names
		datasets: [
			{
				label: "Faltas",
				data: absenceData.map((item) => item.count), // Y-Axis = Count
				borderColor: "rgb(63, 63, 70)",
				backgroundColor: "rgb(0, 187, 167)",
				tension: 0.4,
			},
		],
	};

	const options: import("chart.js").ChartOptions<"bar"> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "center",
				display: false,
			},

			title: {
				display: false,
				text: "Absences Overview",
			},
		},
		scales: {
			y: {
				display: false,
			},
		},
	};

	return (
		<div className="w-full px-8 py-16 flex items-center h-120 justify-center">
			<Bar data={data} options={options} />
		</div>
	);
}
