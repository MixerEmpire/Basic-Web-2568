'use client';

import React, { useState, useMemo, useEffect } from 'react'; // เพิ่ม useEffect
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

const banners = ['/thumbnail/banner1.jpg', '/thumbnail/banner2.jpg', '/thumbnail/banner3.jpg'];

export default function NebulaApp() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentBanner, setCurrentBanner] = useState(0);

  // --- ระบบเลื่อน Banner อัตโนมัติ (Optional) ---
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(timer);
  }, [currentBanner]);

  const nextSlide = () => {
    setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const filteredGames = useMemo(() => {
    return [...games].filter((game) => game.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const handleGameSelect = () => {
    router.push('/my-app-login');
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-blue-500/30">
      
      {/* Background Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-[100] bg-black/60 backdrop-blur-xl border-b border-white/5 px-10 py-5">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <h1 onClick={() => router.push('/my-app-home')} className="text-xl font-black tracking-[0.2em] cursor-pointer text-blue-400">
            NEBULA<span className="text-white">.</span>
          </h1>

          <div className="flex-1 max-w-xl mx-10 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="ค้นหาเกม..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-12 pr-6 outline-none focus:border-blue-500/50 transition-all text-xs tracking-widest uppercase"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/my-app-register')} className="px-5 py-2 rounded-xl bg-black border border-blue-500/30 text-[10px] font-black uppercase tracking-widest text-blue-300 hover:text-white transition-all">
              Register
            </button>
            <button onClick={() => router.push('/my-app-login')} className="px-5 py-2 rounded-xl bg-blue-600 border border-blue-400 text-[10px] font-black uppercase tracking-widest text-white hover:bg-blue-500 transition-all">
              Login
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 px-6 py-8">
        <section className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-700">

          {/* --- BANNER CAROUSEL (แก้ไขแล้ว) --- */}
          <div className="relative group">
            <div className="relative w-full h-[350px] rounded-[3rem] overflow-hidden border border-blue-500/20 shadow-[0_0_50px_rgba(0,102,255,0.1)]">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              
              {/* ใช้ Mapping หรือแสดงผลตาม Index ปัจจุบัน */}
              <Image 
                src={banners[currentBanner]} 
                alt={`Banner ${currentBanner + 1}`} 
                fill 
                className="object-cover opacity-80 transition-opacity duration-500" 
              />
              
              <div className="absolute top-6 left-10 z-20">
                <span className="text-[10px] font-black tracking-[0.5em] text-blue-400 uppercase">Featured Banner {currentBanner + 1}</span>
              </div>

              {/* Indicator dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {banners.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${currentBanner === idx ? 'w-8 bg-blue-500' : 'w-2 bg-white/20'}`}
                  />
                ))}
              </div>
            </div>

            {/* ปุ่มเลื่อนซ้าย */}
            <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 border border-white/10 hover:bg-blue-500/20 transition">
              <ChevronLeft size={20} className="text-blue-400" />
            </button>
            
            {/* ปุ่มเลื่อนขวา */}
            <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 border border-white/10 hover:bg-blue-500/20 transition">
              <ChevronRight size={20} className="text-blue-400" />
            </button>
          </div>

          {/* Games Grid */}
          <div className="space-y-10">
            <h2 className="text-center text-[10px] font-black tracking-[0.5em] text-blue-500 uppercase">Available Missions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-10 gap-y-14">
              {filteredGames.map((game) => (
                <div key={game.id} onClick={handleGameSelect} className="group cursor-pointer flex flex-col items-center space-y-4">
                  <div className="relative w-32 h-32 rounded-[2.2rem] overflow-hidden border-2 border-transparent transition-all duration-500 group-hover:border-blue-500 group-hover:shadow-[0_0_30px_rgba(0,102,255,0.4)] group-hover:-translate-y-2">
                    <Image src={game.image} alt={game.name} fill className="object-cover transition duration-700 group-hover:scale-110" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 group-hover:text-blue-400 tracking-widest text-center uppercase transition-colors">
                    {game.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}