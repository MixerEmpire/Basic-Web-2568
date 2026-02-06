"use client";
import axios from "axios";
import { useEffect, useState } from "react";
function JirkanPage() {
    const [animations, setAnimations] = useState([]);

    useEffect(() => {
        function fetchAnimations() {

            axios.get("https://api.jikan.moe/v4/anime").then((res) => {
                console.log(res);
                setAnimations(res.data.data);
            });
        }
        fetchAnimations();
    }, []);
    return (
        <div className="text-4xl text-center my-5 font-semibold">
            Welcome to Jikan API
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {animations.map((item) => {
                    return (
                        <div key={item.title} className="bg-gray-200 w-full rounded-xl p-2">
                            <h2 className="text-center text-2xl">{item.title}</h2>
                            <div className="flex justify-center">
                                <img src={item.images.jpg.image_url} alt={item.title} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

}
export default JirkanPage;