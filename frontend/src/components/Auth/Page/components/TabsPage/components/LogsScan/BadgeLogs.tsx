import { useState } from "react";
import { useBadgeStore } from "../../../../../../../store/useBadgeStore";
import { Pagination } from "../../../../../../Pagination/Pagination";
import { BadgeLogsTable } from "./BadgeLogsTable";
import { useBadgeLogs } from "./useBadgeLogs";

import style from "./Style.module.css";

export function BadgeLogs() {
  const { badgeId } = useBadgeStore();
  const [page, setPaginationPage] = useState(1);

  const { data, isLoading, isError } = useBadgeLogs(badgeId, page);

  if (isLoading) return <div>Завантаження...</div>;
  if (isError) return <div>Помилка завантаження</div>;

  if (!data) return;

  console.log(data);

  return (
    <div className={style.log_page_wrapper}>
      <BadgeLogsTable logs={data.logs} />
      <Pagination
        page={page}
        totalPages={data.totalPages}
        onPageChange={setPaginationPage}
      />
    </div>
  );
}
