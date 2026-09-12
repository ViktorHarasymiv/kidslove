import { useBadgeStore } from "../../../../../../../services/store/useBadgeStore";
import { BadgeLogsTable } from "./BadgeLogsTable";
import { useBadgeLogs } from "./useBadgeLogs";

export function BadgeLogs() {
  const { badgeId } = useBadgeStore();
  const page = 1;
  const { data, isLoading, isError } = useBadgeLogs(badgeId, page);

  if (isLoading) return <div>Завантаження...</div>;
  if (isError) return <div>Помилка завантаження</div>;

  if (!data) return;

  console.log(data);

  return <BadgeLogsTable logs={data.logs} />;
}
