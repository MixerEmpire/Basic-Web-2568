'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, Loader2, User } from 'lucide-react'; // เพิ่ม Loader2
import { useRouter } from 'next/navigation'; // นำเข้า useRouter

export default function LoginPage() {
  const router = useRouter(); // ประกาศใช้งาน router
  const [loading, setLoading] = useState(false);

  // ฟังก์ชันสำหรับ Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // จำลองการโหลด 1.5 วินาที แล้วค่อยเปลี่ยนหน้า
    setTimeout(() => {
      router.push('/my-app'); // ใส่ Path ของหน้า NebulaApp ของคุณ (เช่น /main หรือ /dashboard)
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex items-center justify-center p-4 overflow-hidden font-sans">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,150,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,150,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-white/5 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="p-10 rounded-3xl bg-black/70 backdrop-blur-2xl border border-blue-500/20 shadow-[0_0_60px_rgba(0,120,255,0.15)]">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-[0.2em] bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
              NEBULA
            </h1>
            {/* <p className="text-blue-300/50 mt-2 text-xs uppercase tracking-widest">Authorized Access Only</p> */}
          </div>
          

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-xs font-medium text-blue-300 ml-1 uppercase tracking-wider">Username</label>
              <div className="relative mt-1.5">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500/50" size={18} />
                <input
                  required
                  type="username"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/50 border border-blue-500/30 text-white placeholder-gray-600 focus:outline-none focus:border-blue-400 focus:shadow-[0_0_20px_rgba(0,150,255,0.2)] transition-all"
                  placeholder="User_004"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between ml-1">
                <label className="text-xs font-medium text-blue-300 uppercase tracking-wider">Password</label>
                {/* <Link href="#" className="text-xs text-blue-500/60 hover:text-blue-400">Forgot?</Link> */}
              </div>
              <div className="relative mt-1.5">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500/50" size={18} />
                <input
                  required
                  type="password"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/50 border border-blue-500/30 text-white placeholder-gray-600 focus:outline-none focus:border-blue-400 focus:shadow-[0_0_20px_rgba(0,150,255,0.2)] transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full group mt-4 px-6 py-4 rounded-xl bg-blue-600 text-white font-bold tracking-widest hover:bg-blue-500 disabled:bg-blue-800/50 disabled:cursor-not-allowed transition-all shadow-[0_0_30px_rgba(0,110,255,0.4)] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  AUTHENTICATING...
                </>
              ) : (
                <>
                  SIGN IN
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-blue-500/10 pt-6">
            <p className="text-sm text-gray-500">
              New Create <Link href="/my-app-register" className="text-blue-400 hover:text-blue-300 font-semibold">Create an ID</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}