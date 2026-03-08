'use client'
import { useState } from "react";

function CountPage() {
    const [count, setCount] = useState(1);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 pt-10">
            
            <h1 className="text-3xl bg-red-500 border-4 border-black px-6 py-3 text-white mb-8">
                บทเรียนที่ 2: State ของการเพิ่มตัวเลข
            </h1>

            <div className="text-6xl font-bold mb-8">
                {count}
            </div>

            <div className="flex gap-6">
                <button
                    onClick={() => setCount(count + 1)}
                    className="px-8 py-4 text-2xl bg-blue-500 text-white rounded-xl shadow-lg hover:bg-blue-600 active:scale-95 transition"
                >
                    ➕ เพิ่ม
                </button>

                <button
                    onClick={() => setCount(count -1)}
                    className="px-8 py-4 text-2xl bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 active:scale-95 transition"
                >
                    ➖ ลด
                </button>
            </div>
        </div>
    );
}

export default CountPage;
