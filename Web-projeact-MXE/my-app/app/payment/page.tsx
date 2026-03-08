"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link';

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ดึงค่าจาก Params (ถ้าไม่มีให้ใช้ค่า Default)
  const amount = searchParams.get('amount') || "0฿";
  const packageName = searchParams.get('package') || "Unknown Pack";
  const gameName = searchParams.get('game') || "Unknown Game";
  const uid = searchParams.get('uid') || "Not Provided";

  const INITIAL_TIME = 300; //ตั้งเวลาเริ่มต้น 5 นาที (300 วินาที)
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isExpired, setIsExpired] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (isExpired || isPaid) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isExpired, isPaid]);

  const formatTime = (time: number) => {
    const mins = String(Math.floor(time / 60)).padStart(2, "0");
    const secs = String(time % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const confirmPayment = async () => {
    if (!isExpired) {
      try {
        const amountNum = parseInt(amount.replace(/[^\d]/g, ''));
        if (isNaN(amountNum) || amountNum <= 0) {
          console.error('Invalid amount:', amount);
          alert('กรุณาใส่จำนวนเงินที่ถูกต้อง');
          return;
        }
        const response = await fetch('/api/topup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: 1,
            game: gameName,
            amount: amountNum,
            currency: 'THB',
            method: 'online-banking',
            status: 'SUCCESS',
            reference: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
          }),
        });
        // guard against non-JSON responses (HTML error pages, etc.)
        const ct = response.headers.get('content-type') || '';
        let data: any = null;
        if (ct.includes('application/json')) {
          data = await response.json();
        } else {
          const text = await response.text();
          console.error('Expected JSON but got:', text);
          throw new Error('Unexpected response from server');
        }
        console.log('API Response:', { status: response.status, data });
        if (response.ok) {
          setIsPaid(true);
          setTimeout(() => router.push('/topup-history'), 2000);
        } else {
          alert(`Error: ${data.error || 'Unknown error occurred'}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const isDanger = timeLeft <= 60 && !isExpired;

  return (
    <div className="wrapper">
      {/* ================= NAVBAR ================= */}
      <nav className="navbar-top">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-3 items-center">
          <div className="flex items-center gap-8">
            <div className="text-xl font-bold tracking-widest bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent cursor-pointer" onClick={() => router.push('/my-app')}>
              NEBULA
            </div>
            <div className="hidden md:flex items-center gap-3">
              {['UserID', 'SALE'].map((item) => (
                <button key={item} className="px-4 py-1.5 rounded-xl bg-black border border-blue-500/30 text-[10px] font-bold text-blue-300 hover:bg-blue-600 hover:text-white transition-all">
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div></div>
        </div>
      </nav>

      <div className="payment-card">
        {/* HEADER */}
        <div className="header">
          {/* ปรับให้ย้อนกลับไปหน้าแรก หรือหน้าที่แล้ว */}
          
          <button className="back-btn font-bold text-xs" onClick={() => router.push('/my-app')}>
            ← ย้อนกลับไปเลือกเกม
          </button>
          <div className="brand">NEBULA SECURE PAYMENT</div>
        </div>

        {/* STATUS */}
        <div className="status-section">
          <p className="status-label uppercase tracking-widest mb-2">
            {isPaid ? "Received" : isExpired ? "Expired" : "รอการชำระเงิน"}
          </p>

          {isExpired ? (
            <div className="status-badge expired">การชำระเงินหมดเวลา</div>
          ) : isPaid ? (
            <div className="status-badge success">ชำระเงินสำเร็จ</div>
          ) : (
            <div className={`timer-display ${isDanger ? "danger" : ""}`}>
              {formatTime(timeLeft)}
            </div>
          )}

          {!isExpired && !isPaid && (
            <p className="timer-subtext uppercase tracking-tighter mt-2">
              โปรดโอนเงินตามยอดที่ระบุ ภายในเวลาที่กำหนด
            </p>
          )}
        </div>

        <hr className="divider" />

        {/* MAIN */}
        <div className="main-content">
          <div className="qr-section">
            <div className="qr-container bg-white p-4 rounded-[2rem] shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              <div className="qr-frame relative w-[220px] h-[220px]">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                  alt="Payment QR Code"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <p className="qr-hint mt-4 uppercase font-bold text-[10px] tracking-widest">Scan with Banking App</p>
          </div>

          <div className="payment-details flex-1">
            <div className="info-grid bg-white/5 p-6 rounded-3xl border border-blue-500/10 mb-8">
              <div className="info-item border-b border-white/5 pb-3">
                <label className="block text-[10px] text-blue-400 font-bold uppercase mb-1">Target Game / UID</label>
                <span className="text-white font-medium">{gameName} | <span className="text-blue-300">{uid}</span></span>
              </div>
              <div className="info-item border-b border-white/5 py-3">
                <label className="block text-[10px] text-blue-400 font-bold uppercase mb-1">Package</label>
                <span className="text-white font-medium">{packageName}</span>
              </div>
              <div className="info-item pt-3">
                <label className="block text-[10px] text-blue-400 font-bold uppercase mb-1">Total Amount</label>
                <span className="amount text-3xl font-black text-blue-500">{amount}</span>
              </div>
            </div>

            <button
              className={`action-btn py-5 uppercase tracking-[0.2em] font-black ${isPaid ? "paid" : ""}`}
              onClick={confirmPayment}
              disabled={isExpired || isPaid}
            >
              {isPaid ? "SUCCESSFUL" : isExpired ? "TIME EXPIRED" : "ชำระเงินแล้ว"}
            </button>
          </div>
        </div>
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
          background-image: radial-gradient(circle at 2px 2px, rgba(0,150,255,0.07) 1px, transparent 0);
          background-size: 32px 32px;
        }
        .navbar-top {
          position: fixed;
          top: 0; width: 100%;
          z-index: 50;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0,150,255,0.1);
          padding: 1.2rem 0;
        }
        .payment-card {
          position: relative;
          z-index: 1;
          background: rgba(10,10,10,0.8);
          backdrop-filter: blur(40px);
          border: 1px solid rgba(0,150,255,0.2);
          padding: 50px;
          border-radius: 40px;
          width: 100%;
          max-width: 800px;
          box-shadow: 0 30px 100px rgba(0,0,0,0.8);
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        .back-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(0,150,255,0.2);
          padding: 10px 20px;
          border-radius: 14px;
          color: #60a5fa;
          cursor: pointer;
          transition: all 0.3s;
        }
        .back-btn:hover {
          background: #2563eb;
          color: white;
          box-shadow: 0 0 30px rgba(37,99,235,0.4);
        }
        .timer-display {
          font-size: 5rem;
          font-weight: 900;
          color: #3b82f6;
          line-height: 1;
        }
        .timer-display.danger { color: #ef4444; }
        .status-badge {
          padding: 12px 30px;
          border-radius: 100px;
          display: inline-block;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .status-badge.success { background: #2563eb; color: white; }
        .status-badge.expired { background: #7f1d1d; color: white; }
        .divider { border: 0; border-top: 1px solid rgba(255,255,255,0.05); margin: 40px 0; }
        .main-content { display: flex; gap: 50px; align-items: flex-start; }
        .action-btn {
          width: 100%;
          border-radius: 20px;
          background: #2563eb;
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .action-btn:hover:not(:disabled) {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(37,99,235,0.5);
        }
        .action-btn:disabled { background: #1f2937; color: #4b5563; cursor: not-allowed; }
        
        @media (max-width: 768px) {
          .main-content { flex-direction: column; align-items: center; }
          .payment-card { padding: 30px; }
        }
      `}</style>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center">Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}