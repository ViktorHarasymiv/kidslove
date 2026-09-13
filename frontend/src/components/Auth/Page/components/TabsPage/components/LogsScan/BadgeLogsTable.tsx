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
          <tr>
            <th>Liczba</th>
            <th>Data</th>
            <th>IP</th>
            <th>Przeglądarka</th>
            <th>System</th>
            <th>Miasto (GPS)</th>
            <th>Dzielnica (GPS)</th>
            <th>Ulica (GPS)</th>
            <th>Miasto (IP)</th>
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
