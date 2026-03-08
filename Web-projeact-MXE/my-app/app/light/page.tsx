"use client";

import { useState } from "react";
function LightPage() {
    const [isLightOn, setIsLightOn] = useState(false);

    return (
        <div>
            <div className="text-center mt-6 p-4">
                <h1 className="text-3xl bg-red-500 border-4 border-black p-2 text-white">
                    บทเรียนที่ 1: State ของการเปิด/ปิด หลอดไฟ
                </h1>
            </div>

            <div className="flex justify-center mt-4">
                <button
                    type="button"
                    className="bg-green-500 p-5 rounded-2xl text-xl cursor-pointer hover:bg-red-600"
                    onClick={() => setIsLightOn(!isLightOn)} //เอาไว้คลิก เขียน Airlo Funtion
                >
                    เปิด / ปิด หลอดไฟ
                </button>
            </div>

            <div className="text-center mt-4">
                <h1>
                    สถานะหลอดไฟ: {isLightOn ? "เปิด" : "ปิด"}
                </h1>
                <div className="flex justify-center">
                {isLightOn ?(
                    <img src="https://www.w3schools.com/js/pic_bulbon.gif" />
                ):(
                    <img src="https://www.w3schools.com/js/pic_bulboff.gif" />
                )}
                </div>
            </div>
        </div>
    );
}
export default LightPage;
