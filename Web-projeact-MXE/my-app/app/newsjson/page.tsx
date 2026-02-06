"use client";
import axios from "axios";
import { useEffect, useState } from "react";

function NewsJson() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    function fetchNews() {
      axios
        .get(
          "https://newsdata.io/api/1/latest?apikey=pub_5281385ba9e64182517f03918881c22ab1bf1&language=th"
        )
        .then((res) => {
          setArticles(res.data.results);
        });
    }

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-blue-200 px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-slate-800">
        📰 ข่าวล่าสุด
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles.map((item) => (
          <div
            key={item.article_id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1"
          >
            <div className="overflow-hidden rounded-t-2xl">
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600">
                  ไม่มีรูป
                </div>
              )}
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold text-slate-800 line-clamp-2">
                {item.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsJson;
