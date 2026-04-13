import { useQuery, useQueryClient } from "@tanstack/react-query";

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
    const response = await fetch(`/api/absence/${name}`);

    if (!response.ok) {
        throw new Error(`Error fetching absence data: ${response.statusText}`);
    }

    return response.json() as Promise<PlayerAbsences>

};

// React Query hook for absence data
export function usePlayerAbsencesData(playerName: string) {
    return useQuery({
        queryKey: ["get-player-absence", playerName],
        queryFn: (e) => playerAbsenceFetcher(playerName),
        enabled: !!playerName,
        staleTime: 5 * 60 * 1000, // Cache data as stale after 5 minutes
        gcTime: 10 * 60 * 1000, // Keep unused queries in memory for 10 minutes (updated)
    });
}

// Function to invalidate the cache
export function invalidateAbsencesCache() {
    const queryClient = useQueryClient();
    queryClient.invalidateQueries({ queryKey: ["get-player-absence"] }); // Invalidate the "get-absence" cache
}