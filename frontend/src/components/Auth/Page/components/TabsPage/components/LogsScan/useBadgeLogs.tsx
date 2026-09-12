import { useQuery } from "@tanstack/react-query";
import { fetchBadgeLogs } from "../../../../../../../services/Api/logsScan";
import type { BadgeLogsResponse } from "../../../../../../../types/logsType";

export function useBadgeLogs(badgeId: string, page: number) {
  return useQuery<BadgeLogsResponse>({
    queryKey: ["badgeLogs", badgeId, page],
    queryFn: () => fetchBadgeLogs(badgeId, page, 20),
    staleTime: 1000 * 30, // 30 секунд кешу
  });
}
