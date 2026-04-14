interface Props {
    absences: {
        id: string
        date: Date
        reason: string | null
    }[]
}

export function AbsenceList({ absences }: Props) {
    return (
        <div className="w-full grid grid-cols-3 place-items-center gap-5 px-32">
            {absences.map((ab, index) => (
                <Absence
                    key={ab.id}
                    date={new Date(ab.date).toISOString()}
                    index={index}
                    reason={ab.reason ?? ""}
                />
            ))}
        </div>
    )
}

function Absence(props: { reason: string; date: string; index: number }) {
    return (
        <div className="flex flex-col gap-4 w-full h-full p-4 bg-zinc-800 rounded-md border border-white/20">
            <div className="flex items-center justify-between">
                <p>date: {props.date}</p>
                <p>id: {props.index}</p>
            </div>

            <p className="px-5 text-lg whitespace-break-spaces">
                {props.reason}
            </p>
        </div>
    )
}