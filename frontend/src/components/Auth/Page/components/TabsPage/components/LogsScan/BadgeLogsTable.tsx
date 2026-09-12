import type { BadgeScanLog } from "../../../../../../../types/logsType";

interface Props {
  logs: BadgeScanLog[];
}

export function BadgeLogsTable({ logs }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">Дата</th>
            <th className="px-4 py-2 text-left">IP</th>
            <th className="px-4 py-2 text-left">Пристрій</th>
            <th className="px-4 py-2 text-left">Браузер</th>
            <th className="px-4 py-2 text-left">OS</th>
            <th className="px-4 py-2 text-left">Місто (GPS)</th>
            <th className="px-4 py-2 text-left">Район (GPS)</th>
            <th className="px-4 py-2 text-left">Вулиця (GPS)</th>
            <th className="px-4 py-2 text-left">Місто (IP)</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log._id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">
                {new Date(log.scannedAt).toLocaleString()}
              </td>

              <td className="px-4 py-2">{log.ip || "—"}</td>

              <td className="px-4 py-2">{log.device?.model || "—"}</td>

              <td className="px-4 py-2">{log.device?.browser || "—"}</td>

              <td className="px-4 py-2">{log.device?.os || "—"}</td>

              <td className="px-4 py-2">{log.location.accurate.city || "—"}</td>

              <td className="px-4 py-2">
                {log.location.accurate.district || "—"}
              </td>

              <td className="px-4 py-2">
                {log.location.accurate.street || "—"}
              </td>

              <td className="px-4 py-2">{log.location.ipBased.city || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
