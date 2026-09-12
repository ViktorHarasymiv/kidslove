import type { BadgeScanLog } from "../../../../../../../types/logsType";

import style from "./Style.module.css";

interface Props {
  logs: BadgeScanLog[];
}

export function BadgeLogsTable({ logs }: Props) {
  return (
    <div className={style.table_wrapper}>
      <table className={style.table}>
        <thead className={style.thead}>
          <tr className={style.tr}>
            <th className="px-4 py-2 text-left">К-сть</th>
            <th className="px-4 py-2 text-left">Дата</th>
            <th className="px-4 py-2 text-left">IP</th>
            <th className="px-4 py-2 text-left">Браузер</th>
            <th className="px-4 py-2 text-left">OS</th>
            <th className="px-4 py-2 text-left">Місто (GPS)</th>
            <th className="px-4 py-2 text-left">Район (GPS)</th>
            <th className="px-4 py-2 text-left">Вулиця (GPS)</th>
            <th className="px-4 py-2 text-left">Місто (IP)</th>
          </tr>
        </thead>

        <tbody className={style.tbody}>
          {logs.map((log, index) => (
            <tr key={log._id}>
              <td>{index + 1}</td>
              <td>{new Date(log.scannedAt).toLocaleString()}</td>

              <td>{log.ip || "—"}</td>

              <td>{log.device?.browser || "—"}</td>

              <td>{log.device?.os || "—"}</td>

              <td>{log.location.accurate.city || "—"}</td>

              <td>{log.location.accurate.district || "—"}</td>

              <td>{log.location.accurate.street || "—"}</td>

              <td>{log.location.ipBased.city || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
