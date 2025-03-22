"use client";

import { useState, useEffect } from "react";
import { getClaimHistory } from "@/services/admin.service";
import { ClaimHistory as ClaimHistoryType } from "@/types";

export default function ClaimHistory() {
  const [history, setHistory] = useState<ClaimHistoryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getClaimHistory();
        setHistory(data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Claim History</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Coupon Code</th>
            <th className="p-2">IP</th>
            <th className="p-2">Session ID</th>
            <th className="p-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry) => (
            <tr key={entry._id} className="border-b">
              <td className="p-2">{entry.couponCode}</td>
              <td className="p-2">{entry.ip}</td>
              <td className="p-2">{entry.sessionId}</td>
              <td className="p-2">{new Date(entry.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}