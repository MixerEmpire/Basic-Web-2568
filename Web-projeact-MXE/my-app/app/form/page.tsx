'use client';

import { useState } from 'react';

function FormPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (!email || !password) {
            setError('กรุณากรอกข้อมูลให้ครบถ้วน');
            return;
        }

        if (!email.includes('@')) {
            setError('รูปแบบอีเมลไม่ถูกต้อง');
            return;
        }

        if (password.length < 6) {
            setError('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setSuccess('ลงทะเบียนสำเร็จ!');
            setEmail('');
            setPassword('');
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center pt-10 px-4">
            <h1 className="text-4xl text-center bg-red-500 border-4 border-black px-6 py-3 text-white mb-2 rounded-lg">
                ลงทะเบียนเข้าสู่ระบบ
            </h1>
            <p className="text-xl text-center mb-8 text-gray-700">
                กรุณากรอกข้อมูลของคุณ
            </p>
            <div className="flex justify-center w-full">
                <form className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                    {/* Email Section */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">
                            กรุณาระบุ E-mail
                        </label>
                        <input 
                            type="email" 
                            placeholder="your@email.com" 
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password Section */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">
                            กรุณาระบุรหัสผ่าน
                        </label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="bg-green-100 border-2 border-green-500 text-green-700 px-4 py-3 rounded-lg">
                            {success}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 text-lg"
                    >
                        {loading ? 'กำลังประมวลผล...' : 'ลงทะเบียน'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FormPage;