'use client'
import { useState } from "react";
function ShowHidePage() {
    const [show, setShow] = useState(false);
    return (
        <div>
            <div className="text-center mt-6 p-4">
                <h1 className="text-3xl bg-red-500 border-4 border-black p-2 text-white text-center mt-10">
                    สร้างปุ่มแสดง/ซ่อน ข้อความ Hide/Show
                </h1>
                <div className="p-4 justify-center text-center">
                    <button
                        type="button"
                        className="bg-green-500 p-5 rounded-2xl text-xl cursor-pointer hover:bg-red-600"
                        onClick={() => setShow(!show)} //เอาไว้คลิก เปลี่ยนสี
                    >
                        {show ? "ซ่อนข้อความ" : "แสดงข้อความ"}
                    </button>
                    {show && (
                        <div className="mt-4 text-lg">
                         Hello Comrade
                        </div>
                    )}
                </div>
                    
            </div>
        </div>
    );
}
export default ShowHidePage;