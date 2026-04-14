import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { getUserNames } from "../_actions/get-names";

export type PlayerName = {
    player_name: string
}

// Fetcher function to retrieve absence data
const playerNameFetcher = async () => {

    const data = await getUserNames()

    return data as PlayerName[]

};

// React Query hook for absence data
export function useGetPlayerList() {
    return useSuspenseQuery({
        queryKey: ["get-player-name"],
        queryFn: playerNameFetcher,
        
        staleTime: 5 * 60 * 1000, // Cache data as stale after 5 minutes
        gcTime: 10 * 60 * 1000, // Keep unused queries in memory for 10 minutes (updated)
    });
}

// Function to invalidate the cache
export function invalidateAbsencesCache() {
    const queryClient = useQueryClient();
    queryClient.invalidateQueries({ queryKey: ["get-player-name"] }); // Invalidate the "get-absence" cache
}