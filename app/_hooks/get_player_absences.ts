import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { getPlayerAbsence } from "../_actions/get-player-absence";

export type PlayerAbsences = {
    absences: {
        id: string;
        player_name: string;
        reason: string | null;
        date: Date;
        created_at: Date;
        updated_at: Date;
    }[]
}

// Fetcher function to retrieve absence data
const playerAbsenceFetcher = async (name: string) => {
    const data = await getPlayerAbsence(name)

    return { absences: data } as PlayerAbsences

};

// React Query hook for absence data
export function usePlayerAbsencesData(playerName: string) {
    return useSuspenseQuery({
        queryKey: ["get-player-absence", playerName],
        queryFn: (e) => playerAbsenceFetcher(playerName),
        staleTime: 5 * 60 * 1000, // Cache data as stale after 5 minutes
        gcTime: 10 * 60 * 1000, // Keep unused queries in memory for 10 minutes (updated)
    });
}

// Function to invalidate the cache
export function invalidateAbsencesCache() {
    const queryClient = useQueryClient();
    queryClient.invalidateQueries({ queryKey: ["get-player-absence"] }); // Invalidate the "get-absence" cache
}