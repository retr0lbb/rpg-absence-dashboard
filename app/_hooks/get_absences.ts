import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { getPlayersAbsenceData } from "../_actions/get-players-absence";


type AbsenceDataType = {
    _count: {
        player_name: number
    },
    player_name: string  
}

// Fetcher function to retrieve absence data
const absenceFetcher = async () => {
    const data = await getPlayersAbsenceData()
    return data as AbsenceDataType[]
};

// React Query hook for absence data
export function useAbsencesData() {
    return useSuspenseQuery({
        queryKey: ["get-absence"],
        queryFn: absenceFetcher,
        staleTime: 5 * 60 * 1000, // Cache data as stale after 5 minutes
        gcTime: 10 * 60 * 1000, // Keep unused queries in memory for 10 minutes (updated)
    });
}

// Function to invalidate the cache
export function invalidateAbsencesCache() {
    const queryClient = useQueryClient();
    queryClient.invalidateQueries({ queryKey: ["get-absence"] }); // Invalidate the "get-absence" cache
}