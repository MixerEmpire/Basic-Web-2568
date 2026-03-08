// 'use client';

// import { useState, useMemo, useEffect } from 'react';
// import Image from 'next/image';
// import { ChevronLeft, ChevronRight, Eye, EyeOff, ArrowLeft } from 'lucide-react';

// const games = [
//   { id: 1, name: 'Mobile Legends', image: '/thumbnail/mlbb.jpg' },
//   { id: 2, name: 'League of Legends', image: '/thumbnail/LOL.jpg' },
//   { id: 3, name: 'PUBG', image: '/thumbnail/pubg.jpg' },
//   { id: 4, name: 'Valorant', image: '/thumbnail/valorant.jpg' },
//   { id: 5, name: 'Honkai: Star Rail', image: '/thumbnail/hsr.jpg' },
//   { id: 6, name: 'Genshin Impact', image: '/thumbnail/GenshinImpact.jpg' },
//   { id: 7, name: 'Dota 2', image: '/thumbnail/dota.jpg' },
//   { id: 8, name: 'ROV', image: '/thumbnail/rov.png' },
// ];

// export default function Home() {
//   // --- States ---
//   const [view, setView] = useState<'home' | 'login' | 'register'>('home');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

//   // Form States
//   const [userForm, setUserForm] = useState({ username: '', password: '' });

//   const banners = ['/thumbnail/banner1.jpg', '/thumbnail/banner2.jpg', '/thumbnail/banner3.jpg'];

//   // --- Logic ---
//   const handleNextBanner = () => setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
//   const handlePrevBanner = () => setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);

//   const onRegister = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (userForm.username.length >= 4 && userForm.password.length >= 8) {
//       alert('สร้างบัญชีสำเร็จ! กำลังไปหน้าล้อคอิน...');
//       setView('login'); // 6. สร้างไอดีเสร็จไปหน้าล้อคอินอัตโนมัติ
//     } else {
//       alert('ชื่อต้องมีอย่างน้อย 4 ตัว และรหัสผ่าน 8 ตัวอักษร');
//     }
//   };

//   const onLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     setView('home'); // 6. ล้อคอินเสร็จไปหน้าหลักอัตโนมัติ
//   };

//   const filteredGames = useMemo(() => {
//     return [...games]
//       .sort((a, b) => a.name.localeCompare(b.name))
//       .filter((game) => game.name.toLowerCase().includes(searchTerm.toLowerCase()));
//   }, [searchTerm]);

//   return (
//     <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans">
      
//       {/* BACKGROUND DECORATION */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,150,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,150,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
//       </div>

//       {/* NAVBAR */}
//       <nav className="relative z-50 bg-black/80 backdrop-blur-xl border-b border-blue-500/20 py-5 px-6">
//         <div className="max-w-[1400px] mx-auto grid grid-cols-3 items-center">
          
//           {/* LEFT: LOGO ONLY (UID Button Removed) */}
//           <div className="flex items-center">
//             <div 
//               onClick={() => setView('home')}
//               className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-blue-100 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition"
//             >
//               NEBULA
//             </div>
//           </div>

//           {/* CENTER: SEARCH FIELD (Hidden on Auth views) */}
//           <div className="flex justify-center">
//             {view === 'home' && (
//               <div className="w-full max-w-[400px] flex items-center px-6 py-3 rounded-2xl bg-black/40 border border-blue-500/30 focus-within:border-blue-400 focus-within:shadow-[0_0_15px_rgba(0,150,255,0.3)] transition-all">
//                 <input
//                   type="text"
//                   placeholder="ค้นหาเกมของคุณ..."
//                   className="bg-transparent w-full outline-none text-xs text-center tracking-[0.2em] uppercase placeholder-gray-600"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             )}
//           </div>

//           {/* RIGHT: AUTH BUTTONS */}
//           <div className="flex items-center gap-6 justify-end">
//             <button 
//               onClick={() => setView('register')} 
//               className="text-xs font-bold text-gray-400 hover:text-blue-400 uppercase tracking-[0.15em] transition"
//             >
//               Register
//             </button>
//             <button 
//               onClick={() => setView('login')}
//               className="px-8 py-2.5 rounded-xl bg-blue-600 border border-blue-400 text-white text-xs font-black hover:shadow-[0_0_20px_rgba(0,150,255,0.5)] transition-all uppercase tracking-widest"
//             >
//               Login
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* MAIN CONTENT AREA */}
//       <main className="relative z-10 pt-10 pb-20">
        
//         {view === 'home' ? (
//           /* ================= HOME VIEW ================= */
//           <div className="animate-in fade-in duration-700">
//             <div className="max-w-5xl mx-auto px-6 mb-16 flex items-center gap-6">
//               <button onClick={handlePrevBanner} className="text-blue-500 hover:scale-125 transition"><ChevronLeft size={44} /></button>
//               <div className="relative w-full h-[280px] rounded-[2rem] overflow-hidden border border-blue-500/20 shadow-[0_0_40px_rgba(0,120,255,0.1)]">
//                 <Image src={banners[currentBannerIndex]} alt="Banner" fill className="object-cover" />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//               </div>
//               <button onClick={handleNextBanner} className="text-blue-500 hover:scale-125 transition"><ChevronRight size={44} /></button>
//             </div>

//             <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-10">
//               {filteredGames.map((game) => (
//                 <div key={game.id} className="group cursor-pointer flex flex-col items-center">
//                   <div className="relative w-32 h-32 rounded-[2rem] overflow-hidden border-2 border-blue-500/20 group-hover:border-blue-400 group-hover:shadow-[0_0_30px_rgba(0,150,255,0.4)] transition-all duration-500">
//                     <Image src={game.image} alt={game.name} fill className="object-cover group-hover:scale-110 transition duration-700" />
//                   </div>
//                   <span className="mt-4 text-[10px] font-bold text-gray-500 group-hover:text-blue-300 transition uppercase tracking-[0.2em] text-center">{game.name}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           /* ================= AUTH VIEW (Login/Register) ================= */
//           <div className="max-w-md mx-auto px-6 mt-10 animate-in slide-in-from-bottom-6 duration-500">
//             <div className="p-10 rounded-[3rem] bg-black/60 border border-blue-500/20 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,100,255,0.15)] relative">
              
//               {/* BACK BUTTON (For Register Only) */}
//               {view === 'register' && (
//                 <button 
//                   onClick={() => setView('home')}
//                   className="absolute top-10 left-10 text-gray-500 hover:text-white transition"
//                 >
//                   <ArrowLeft size={20} />
//                 </button>
//               )}

//               <h2 className="text-2xl font-black text-center mb-10 tracking-[0.3em] uppercase bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
//                 {view === 'login' ? 'Authentication' : 'Registration'}
//               </h2>

//               <form onSubmit={view === 'login' ? onLogin : onRegister} className="space-y-7">
//                 {/* USERNAME FIELD */}
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-1">Username</label>
//                   <input 
//                     type="text"
//                     required
//                     placeholder="MIN 4 CHARACTERS"
//                     className="w-full bg-blue-500/5 border border-blue-500/20 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all text-sm placeholder:text-gray-700"
//                     onChange={(e) => setUserForm({...userForm, username: e.target.value})}
//                   />
//                 </div>

//                 {/* PASSWORD FIELD WITH HIDDEN BUTTON */}
//                 <div className="space-y-2 relative">
//                   <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-1">Password</label>
//                   <input 
//                     type={showPassword ? "text" : "password"}
//                     required
//                     placeholder="MIN 8 CHARACTERS"
//                     className="w-full bg-blue-500/5 border border-blue-500/20 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all text-sm placeholder:text-gray-700"
//                     onChange={(e) => setUserForm({...userForm, password: e.target.value})}
//                   />
//                   <button 
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-6 bottom-4 text-gray-600 hover:text-blue-400 transition"
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>

//                 {/* SUBMIT BUTTON */}
//                 <button 
//                   type="submit"
//                   className="w-full py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-blue-500 shadow-[0_10px_40px_rgba(0,110,255,0.3)] hover:shadow-[0_0_30px_rgba(0,150,255,0.5)] transition-all"
//                 >
//                   {view === 'login' ? 'Confirm Access' : 'Create Identity'}
//                 </button>
//               </form>

//               <p className="mt-10 text-center text-[10px] text-gray-600 tracking-widest uppercase">
//                 {view === 'login' ? "New Operator?" : "Already Authorized?"}{' '}
//                 <span 
//                   onClick={() => setView(view === 'login' ? 'register' : 'login')}
//                   className="text-blue-400 cursor-pointer font-bold hover:text-blue-300 transition ml-2 underline decoration-blue-500/30 underline-offset-4"
//                 >
//                   {view === 'login' ? 'SIGN UP' : 'LOG IN'}
//                 </span>
//               </p>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// Default export for build
export default function Home() {
  return <div>Welcome</div>;
}