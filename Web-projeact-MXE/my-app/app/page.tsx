function HomePage() {
    return (
        <div>
            <div className="text-center mt-5 p-5 border-8 border-black">
                <h1 className="text-4xl bg-blue-500 border-4 border-black p-2 text-white">
                    ยินดีต้อนรับสู่แอพของฉัน
                </h1>
                <p className="text-2xl m-2 bg-red-500 border-4 border-black p-2 text-white">
                    นี่คือ Next.js ที่ฉันเรียนเพื่อรู้
                </p>
            </div>

            <div className="text-center text-2xl mt-6 text-blue-500">
                <a href="/light" className="underline">
                    บทเรียนที่ 1: state ของการเปิด / ปิด หลอดไฟ
                </a>
                <br />
                <a href="/count" className="underline">
                    บทเรียนที่ 2: state ของการเพิ่มตัวเลข
                </a>
                <br />
                <a href="/hide-show" className="underline">
                    บทเรียนที่ 3: state ของการแสดง / ซ่อน ข้อความ
                </a>
                <br />
                <a href="/jirkan" className="underline">
                    บทเรียนที่ 4: Jirkan Page 
                </a>
                <br />
                <a href="/newsjson" className="underline">
                    บทเรียนที่ 5: newsjson Page (งาน')
                </a>
                <br />
                <a href="/gamejson" className="underline">
                    บทเรียนที่ 6: gamejson Page (งาน')
                </a>
            </div>
        </div>
    );
}

export default HomePage;
