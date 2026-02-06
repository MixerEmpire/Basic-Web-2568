"use client";
import axios from "axios";
import { useEffect, useState } from "react";

function Gamejson() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    function fetchDeals() {
      axios
        .get("https://www.cheapshark.com/api/1.0/deals")
        .then((res) => {
          setDeals(res.data);
        });
    }

    fetchDeals();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100 px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-emerald-800">
         💲เกมลดราคา💲
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {deals.map((item) => (
          <div
            key={item.dealID}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1"
          >
            <img
              src={item.thumb}
              alt={item.title}
              className="w-full h-48 object-cover rounded-t-2xl"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold line-clamp-2">
                {item.title}
              </h2>

              <div className="mt-3 text-sm">
                <p className="line-through text-gray-400">
                  ฿{item.normalPrice}
                </p>
                <p className="text-emerald-600 font-bold text-lg">
                  ฿{item.salePrice}
                </p>
                <p className="text-red-500">
                  ลด {Math.round(item.savings)}%
                </p>
              </div>

              <a
                href={`https://www.cheapshark.com/redirect?dealID=${item.dealID}`}
                target="_blank"
                className="inline-block mt-4 text-emerald-700 font-medium hover:underline"
              >
                ดูดีล →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gamejson;
