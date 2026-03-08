'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // ฟังก์ชันจัดการการสมัครสมาชิกกับ Database
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Registration failed
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }

      // Registration successful
      setSuccess(true);
      setTimeout(() => {
        router.push('/my-app-login');
      }, 2000);

    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex items-center justify-center p-4 overflow-hidden font-sans">
      
      {/* ===== BACKGROUND GRID & GLOW ===== */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,150,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,150,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-white/5 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="p-10 rounded-3xl bg-black/70 backdrop-blur-2xl border border-blue-500/20 shadow-[0_0_60px_rgba(0,120,255,0.15)]">
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-[0.2em] bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
              NEBULA
            </h1>
            <p className="text-blue-300/50 mt-2 text-xs uppercase tracking-widest">Create New Identity</p>
          </div>

          {/* 5. เพิ่ม onSubmit ใน Form */}
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Error Message Display */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3">
                <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {/* Success Message Display */}
            {success && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center gap-3">
                <ShieldCheck size={20} className="text-green-400 flex-shrink-0" />
                <p className="text-sm text-green-300">Registration successful! Redirecting to login...</p>
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-blue-300 ml-1 uppercase tracking-wider">Username</label>
              <div className="relative mt-1.5">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500/50" size={18} />
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/50 border border-blue-500/30 text-white placeholder-gray-600 focus:outline-none focus:border-blue-400 focus:shadow-[0_0_15px_rgba(0,150,255,0.1)] transition-all"
                  placeholder="Commander_01"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-blue-300 ml-1 uppercase tracking-wider">Email Address</label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500/50" size={18} />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/50 border border-blue-500/30 text-white placeholder-gray-600 focus:outline-none focus:border-blue-400 focus:shadow-[0_0_15px_rgba(0,150,255,0.1)] transition-all"
                  placeholder="pilot@nebula.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-blue-300 ml-1 uppercase tracking-wider">Password</label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500/50" size={18} />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/50 border border-blue-500/30 text-white placeholder-gray-600 focus:outline-none focus:border-blue-400 focus:shadow-[0_0_15px_rgba(0,150,255,0.1)] transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 ml-1 py-2">
              <input required type="checkbox" className="mt-1 accent-blue-500 cursor-pointer" id="terms" />
              <label htmlFor="terms" className="text-[10px] text-gray-500 uppercase tracking-tight cursor-pointer">
                I agree to the Nebula security protocols and terms of service.
              </label>
            </div>

            {/* 6. ปรับปุ่มให้รองรับ Loading State */}
            <button
              disabled={loading || success}
              type="submit"
              className="w-full group px-6 py-4 rounded-xl bg-blue-600 text-white font-bold tracking-widest hover:bg-blue-500 disabled:bg-blue-800/50 disabled:cursor-not-allowed transition-all shadow-[0_0_30px_rgba(0,110,255,0.4)] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  PROCESSING...
                </>
              ) : success ? (
                <>
                  <ShieldCheck size={18} />
                  SUCCESS!
                </>
              ) : (
                <>
                  REGISTER IDENTITY
                  <ShieldCheck size={18} className="group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-blue-500/10 pt-6">
            <p className="text-sm text-gray-500">
              Already have an ID? <Link href="/my-app-login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}