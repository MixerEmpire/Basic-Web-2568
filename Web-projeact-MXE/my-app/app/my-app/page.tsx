'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowLeft, Search, ShieldCheck, Zap, LogOut, History as HistoryIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

// --- DATA SOURCE ---
const games = [
  { id: 1, name: 'MOBILE LEGENDS', image: '/thumbnail/mlbb.jpg' },
  { id: 2, name: 'LEAGUE OF LEGENDS', image: '/thumbnail/LOL.jpg' },
  { id: 3, name: 'PUBG', image: '/thumbnail/pubg.jpg' },
  { id: 4, name: 'VALORANT', image: '/thumbnail/valorant.jpg' },
  { id: 5, name: 'HONKAI: STAR RAIL', image: '/thumbnail/hsr.jpg' },
  { id: 6, name: 'GENSHIN IMPACT', image: '/thumbnail/GenshinImpact.jpg' },
  { id: 7, name: 'DOTA 2', image: '/thumbnail/dota.jpg' },
  { id: 8, name: 'ROV', image: '/thumbnail/rov.png' },
  { id: 9, name: 'OVERWATCH', image: '/thumbnail/Overwatch.jpg' },
  { id: 10, name: 'APEX LEGENDS', image: '/thumbnail/Apex_Legends.jpg' },
  { id: 11, name: 'CALL OF DUTY MOBILE', image: '/thumbnail/Call_of_Duty.png' },
  { id: 12, name: 'BLOOD STRIKE', image: '/thumbnail/Boold_Strike.jpg' },
];

const packages = [
  { id: 1, name: "50 คูปอง", price: "50฿" },
  { id: 2, name: "100 คูปอง", price: "95฿" },
  { id: 3, name: "300 คูปอง", price: "280฿" },
  { id: 4, name: "500 คูปอง", price: "450฿" },
  { id: 5, name: "1000 คูปอง", price: "890฿" },
  { id: 6, name: "2000 คูปอง", price: "1750฿" },
];

const banners = ['/thumbnail/banner1.jpg', '/thumbnail/banner2.jpg', '/thumbnail/banner3.jpg'];

export default function NebulaEnterprise() {
  const router = useRouter();
  const [view, setView] = useState<'main' | 'package'>('main');
  const [selectedGameIdx, setSelectedGameIdx] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [uid, setUid] = useState('');
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(null);
  const [currentBanner, setCurrentBanner] = useState(0);

  // Auto-slide Banner
  useEffect(() => {
    if (view === 'main') {
      const timer = setInterval(() => {
        setCurrentBanner(prev => (prev === banners.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [view]);

  const filteredGames = useMemo(() => {
    return games.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const handleGameSelect = (gameName: string) => {
    const idx = games.findIndex(g => g.name === gameName);
    setSelectedGameIdx(idx !== -1 ? idx : 0);
    setUid('');
    setSelectedPackageId(null);
    setView('package');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmOrder = () => {
    if (selectedPackageId && uid) {
      const pkg = packages.find(p => p.id === selectedPackageId);
      const params = new URLSearchParams({
        game: games[selectedGameIdx].name,
        uid: uid,
        package: pkg?.name || '',
        amount: pkg?.price || '0฿'
      });
      router.push(`/payment?${params.toString()}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">

      {/* --- BG GRID & GLOW --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:45px_45px] opacity-[0.15]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-[100] bg-slate-950/80 backdrop-blur-xl border-b border-white/5 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('main')}>
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              <Zap size={18} className="text-white fill-current" />
            </div>
            <h1 className="text-xl font-black tracking-[0.2em] text-white">NEBULA</h1>
          </div>

          <div className="flex-1 max-w-lg mx-10 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="SEARCH PROTOCOL..."
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-12 pr-6 outline-none focus:border-blue-500/50 transition-all text-[10px] tracking-widest uppercase"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button onClick={() => router.push('/topup-history')} className="flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-500 hover:text-yellow-400 transition-colors uppercase">
            <HistoryIcon size={14} /> History
          </button>

          <button onClick={() => router.push('/my-app-home')} className="flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-500 hover:text-red-400 transition-colors uppercase">
            <LogOut size={14} /> LogOut
          </button>

        </div>
      </nav>

      <main className="relative z-10 px-6 py-12">
        {view === 'main' && (
          <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* --- BANNER --- */}
            <div className="relative group overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl">
              <div className="relative w-full h-[380px]">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
                <Image src={banners[currentBanner]} alt="Banner" fill className="object-cover opacity-80 transition-transform duration-1000 scale-105 group-hover:scale-100" />

                <div className="absolute top-8 left-10 z-20 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-blue-500" />
                  <span className="text-[10px] font-black tracking-[0.5em] text-blue-400 uppercase">Featured Operations</span>
                </div>
              </div>

              {/* Navigation */}
              <button onClick={() => setCurrentBanner(p => (p === 0 ? banners.length - 1 : p - 1))} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-slate-950/50 border border-white/10 hover:bg-blue-600 transition-all opacity-0 group-hover:opacity-100"><ChevronLeft size={20} /></button>
              <button onClick={() => setCurrentBanner(p => (p === banners.length - 1 ? 0 : p + 1))} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-slate-950/50 border border-white/10 hover:bg-blue-600 transition-all opacity-0 group-hover:opacity-100"><ChevronRight size={20} /></button>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {banners.map((_, i) => (
                  <div key={i} className={`h-1 transition-all duration-300 ${currentBanner === i ? 'w-8 bg-blue-500' : 'w-2 bg-white/20'}`} />
                ))}
              </div>
            </div>

            {/* --- GAMES --- */}
            <div className="space-y-12">
              <div className="flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-white/5" />
                <h2 className="text-[10px] font-black tracking-[0.8em] text-blue-500 uppercase">Available Protocols</h2>
                <div className="h-[1px] flex-1 bg-white/5" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {filteredGames.map((game) => (
                  <div key={game.id} onClick={() => handleGameSelect(game.name)} className="group cursor-pointer">
                    <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/5 transition-all duration-500 group-hover:border-blue-500 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                      <Image src={game.image} alt={game.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                    </div>
                    <p className="mt-4 text-[10px] font-bold text-slate-500 group-hover:text-blue-400 tracking-widest text-center transition-colors uppercase">{game.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'package' && (
          <div className="max-w-6xl mx-auto animate-in zoom-in-95 duration-500">
            <button onClick={() => setView('main')} className="group mb-12 flex items-center gap-3 text-slate-500 hover:text-white transition-all font-black uppercase text-[10px] tracking-widest">
              <ArrowLeft size={16} /> Back to Games
            </button>

            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 sticky top-32">
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                  <Image src={games[selectedGameIdx].image} alt="selected" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <h2 className="absolute bottom-10 left-10 text-4xl font-black italic uppercase tracking-tighter">{games[selectedGameIdx].name}</h2>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-3xl">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck size={14} /> กรอก UID / PLAYER ID
                    </label>
                    <input
                      type="text"
                      value={uid}
                      onChange={(e) => setUid(e.target.value)}
                      placeholder="ENTER UID / PLAYER ID"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-5 px-8 outline-none focus:border-blue-500 transition-all font-mono font-bold text-lg tracking-wider"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {packages.map(pkg => (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`p-6 rounded-2xl border transition-all cursor-pointer ${selectedPackageId === pkg.id
                          ? 'bg-blue-600 border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.3)]'
                          : 'bg-white/5 border-white/5 hover:border-white/10 text-slate-400'
                          }`}
                      >
                        <div className="text-[10px] font-black uppercase mb-1">{pkg.name}</div>
                        <div className="text-xl font-black text-white">{pkg.price}</div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleConfirmOrder}
                    disabled={!selectedPackageId || !uid}
                    className="w-full py-6 rounded-2xl font-black text-xl uppercase tracking-[0.2em] bg-blue-600 hover:bg-blue-500 disabled:opacity-20 transition-all shadow-[0_0_40px_rgba(59,130,246,0.2)]"
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}