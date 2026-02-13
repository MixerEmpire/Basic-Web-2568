"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, nickName }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Register failed');
      return;
    }

    router.push('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={submit} className="w-full max-w-md p-8 border-4 border-red-700 rounded-lg bg-gray-900/60">
        <h2 className="text-2xl mb-4 text-red-400 font-bold">สมัครสมาชิก</h2>
        {error && <div className="mb-2 text-red-200">{error}</div>}

        <label className="block mb-2">
          <span className="text-sm text-gray-300">ชื่อ</span>
          <input className="input input-bordered w-full mt-1 bg-black text-white" value={name} onChange={e => setName(e.target.value)} />
        </label>

        <label className="block mb-2">
          <span className="text-sm text-gray-300">ชื่อเล่น</span>
          <input className="input input-bordered w-full mt-1 bg-black text-white" value={nickName} onChange={e => setNickName(e.target.value)} />
        </label>

        <label className="block mb-2">
          <span className="text-sm text-gray-300">Email</span>
          <input type="email" className="input input-bordered w-full mt-1 bg-black text-white" value={email} onChange={e => setEmail(e.target.value)} />
        </label>

        <label className="block mb-4">
          <span className="text-sm text-gray-300">Password</span>
          <input type="password" className="input input-bordered w-full mt-1 bg-black text-white" value={password} onChange={e => setPassword(e.target.value)} />
        </label>

        <div className="flex justify-between items-center">
          <button className="btn btn-error">สมัคร</button>
          <a href="/" className="text-sm text-red-300 underline">กลับไปหน้าเข้าสู่ระบบ</a>
        </div>
      </form>
    </div>
  );
}
