"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface TopUpRecord {
  id: number;
  userId: number;
  game?: string | null; // optional game name added
  amount: number;
  currency: string;
  method: string | null;
  status: "PENDING" | "SUCCESS" | "FAILED";
  reference: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function TopUpHistoryPage() {
  const router = useRouter();
  const [topups, setTopups] = useState<TopUpRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopUpHistory = async () => {
    setLoading(true);
    try {
      console.log('[TopupHistory] Fetching data...');
      const response = await fetch("/api/topup?userId=1&limit=50");
      console.log('[TopupHistory] Response status:', response.status);
      const ct = response.headers.get('content-type') || '';
      let data: any = null;
      if (ct.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('[TopupHistory] expected json but got html/text:', text);
        throw new Error('Invalid response from server');
      }
      console.log('[TopupHistory] Response data:', data);
      if (response.ok) {
        console.log('[TopupHistory] Setting topups:', data.topups?.length || 0, 'records');
        setTopups(data.topups || []);
      } else {
        setError(data.error || "Failed to fetch history");
      }
    } catch (err) {
      console.error('[TopupHistory] Fetch error:', err);
      setError("Error fetching data: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopUpHistory();
  }, []);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "badge-success";
      case "PENDING":
        return "badge-pending";
      case "FAILED":
        return "badge-failed";
      default:
        return "badge-default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "สำเร็จ";
      case "PENDING":
        return "รอดำเนินการ";
      case "FAILED":
        return "ล้มเหลว";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="wrapper">
      {/* ================= NAVBAR ================= */}
      <nav className="navbar-top">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-3 items-center">
          <div className="flex items-center gap-8">
            <div
              className="text-xl font-bold tracking-widest bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent cursor-pointer"
              onClick={() => router.push("/my-app")}
            >
              NEBULA
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={fetchTopUpHistory}
                disabled={loading}
                className="px-4 py-1.5 rounded-xl bg-black border border-blue-500/30 text-[10px] font-bold text-blue-300 hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
              >
                {loading ? "กำลังโหลด..." : "รีเฟรช"}
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="history-container">
        {/* HEADER */}
        <div className="history-header">
          <button className="back-btn font-bold text-xs" onClick={() => router.push("/my-app")}>
            ← ย้อนกลับ
          </button>
          <h1 className="title">ประวัติการเติมเงิน</h1>
          <button
            onClick={fetchTopUpHistory}
            disabled={loading}
            className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            {loading ? "กำลังโหลด..." : "รีเฟรช"}
          </button>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>กำลังโหลดข้อมูล...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p className="error-text">⚠️ {error}</p>
            <button className="retry-btn" onClick={() => window.location.reload()}>
              ลองใหม่
            </button>
          </div>
        ) : topups.length === 0 ? (
          <div className="empty-state">
            <p className="empty-text">ไม่มีประวัติการเติมเงิน</p>
            <Link href="/payment">
              <button className="action-btn">เติมเงินตอนนี้</button>
            </Link>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="history-table">
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>วันเวลา</th>
                  <th>จำนวนเงิน</th>
                  <th>เกม</th>
                  <th>สถานะ</th>
                  <th>อ้างอิง</th>
                </tr>
              </thead>
              <tbody>
                {topups.map((topup, index) => (
                  <tr key={topup.id} className="row-item">
                    <td className="serial">{index + 1}</td>
                    <td className="date">{formatDate(topup.createdAt)}</td>
                    <td className="amount">
                      <span className="amount-value">
                        {topup.amount.toLocaleString()} {topup.currency}
                      </span>
                    </td>
                    <td className="method">{topup.game || "—"}</td>
                    <td className="status">
                      <span className={`badge ${getStatusBadgeClass(topup.status)}`}>
                        {getStatusText(topup.status)}
                      </span>
                    </td>
                    <td className="reference">
                      <code>{topup.reference || "—"}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* FOOTER ACTION */}
        {!loading && !error && topups.length > 0 && (
          <div className="footer-action">
            <Link href="/payment">
              <button className="action-btn">เติมเงินเพิ่มเติม</button>
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        .wrapper {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          padding-top: 120px;
          background: #000;
        }
        .wrapper::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 2px 2px, rgba(0, 150, 255, 0.07) 1px, transparent 0);
          background-size: 32px 32px;
        }
        .navbar-top {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 50;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 150, 255, 0.1);
          padding: 1.2rem 0;
        }
        .history-container {
          position: relative;
          z-index: 1;
          background: rgba(10, 10, 10, 0.8);
          backdrop-filter: blur(40px);
          border: 1px solid rgba(0, 150, 255, 0.2);
          padding: 40px;
          border-radius: 30px;
          width: 100%;
          max-width: 1000px;
          box-shadow: 0 30px 100px rgba(0, 0, 0, 0.8);
        }
        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        .back-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(0, 150, 255, 0.2);
          padding: 10px 20px;
          border-radius: 14px;
          color: #60a5fa;
          cursor: pointer;
          transition: all 0.3s;
        }
        .back-btn:hover {
          background: #2563eb;
          color: white;
          box-shadow: 0 0 30px rgba(37, 99, 235, 0.4);
        }
        .title {
          font-size: 28px;
          font-weight: 900;
          color: white;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .spacer {
          flex: 1;
        }
        .loading-state,
        .empty-state,
        .error-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          text-align: center;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(0, 150, 255, 0.2);
          border-top-color: #0096ff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .loading-state p,
        .empty-state p,
        .error-state p {
          color: #999;
          font-size: 16px;
        }
        .empty-text {
          color: #aaa !important;
          font-size: 18px;
          margin-bottom: 30px;
        }
        .error-text {
          color: #ff6b6b !important;
          margin-bottom: 20px;
        }
        .retry-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 10px 30px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s;
        }
        .retry-btn:hover {
          background: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(239, 68, 68, 0.4);
        }
        .table-wrapper {
          overflow-x: auto;
          border-radius: 15px;
          border: 1px solid rgba(0, 150, 255, 0.1);
        }
        .history-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .history-table thead {
          background: rgba(0, 150, 255, 0.05);
          border-bottom: 2px solid rgba(0, 150, 255, 0.2);
        }
        .history-table th {
          padding: 15px;
          text-align: left;
          color: #60a5fa;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 1px;
        }
        .history-table tbody tr {
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          transition: background 0.2s;
        }
        .history-table tbody tr:hover {
          background: rgba(0, 150, 255, 0.03);
        }
        .history-table td {
          padding: 15px;
          color: #e5e7eb;
        }
        .serial {
          color: #999;
          font-weight: 600;
        }
        .date {
          color: #b3b3b3;
        }
        .amount-value {
          font-weight: 700;
          color: #60a5fa;
          font-size: 15px;
        }
        .method {
          color: #999;
          text-transform: capitalize;
        }
        .badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .badge-success {
          background: rgba(34, 197, 94, 0.2);
          color: #4ade80;
          border: 1px solid rgba(34, 197, 94, 0.4);
        }
        .badge-pending {
          background: rgba(59, 130, 246, 0.2);
          color: #60a5fa;
          border: 1px solid rgba(59, 130, 246, 0.4);
        }
        .badge-failed {
          background: rgba(239, 68, 68, 0.2);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.4);
        }
        .reference {
          color: #666;
        }
        .reference code {
          background: rgba(255, 255, 255, 0.05);
          padding: 4px 8px;
          border-radius: 4px;
          font-family: "Courier New", monospace;
          font-size: 11px;
          color: #aaa;
        }
        .footer-action {
          margin-top: 30px;
          text-align: center;
        }
        .action-btn {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: white;
          border: none;
          padding: 12px 40px;
          border-radius: 12px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 14px;
        }
        .action-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(37, 99, 235, 0.5);
        }
        @media (max-width: 768px) {
          .history-container {
            padding: 25px;
            border-radius: 20px;
          }
          .history-header {
            flex-direction: column;
            gap: 15px;
          }
          .title {
            font-size: 22px;
          }
          .history-table {
            font-size: 12px;
          }
          .history-table th,
          .history-table td {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
}
