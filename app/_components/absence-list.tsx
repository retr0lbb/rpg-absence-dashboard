import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import { CalendarDays } from "lucide-react";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface Props {
	absences: {
		id: string;
		date: Date;
		reason: string | null;
	}[];
}

export function AbsenceList({ absences }: Props) {
	return (
		<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-4 px-4 md:px-16 lg:px-32">
			{absences.map((ab, index) => (
				<Absence
					key={ab.id}
					date={new Date(ab.date)}
					index={index}
					reason={ab.reason ?? ""}
				/>
			))}
		</div>
	);
}

function Absence(props: { reason: string; date: Date; index: number }) {
	return (
		<div className="flex flex-col gap-4 w-full h-full p-4 bg-zinc-800 rounded-md border border-white/20">
			<div className="flex items-center justify-between">
				<p className="text-sm text-zinc-400 flex items-center gap-2">
					<CalendarDays /> {dayjs(props.date).format("DD/MM/YYYY")}
				</p>
			</div>

			<p className="font-light text-zinc-200">{props.reason}</p>
		</div>
	);
}
