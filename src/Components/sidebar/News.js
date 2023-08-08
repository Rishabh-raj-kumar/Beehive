import React, { useEffect, useState } from "react";

function News() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("general");

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=c10d9cfbadf0469cb2f174003492eb3e`
    )
      .then((res) => res.json())
      .then((data) => setItems(data.articles));
  }, [category]);
  return (
    <div className=" bg-white rounded-lg">
      <h2 className=" font-medium text-xl p-3">Latest News</h2>
      <div className=" h-96 overflow-y-scroll">
        <div className=" flex flex-col gap-2 overflow-y-scroll">
          {items.map((x) => (
            <div className=" flex-1 bg-white rounded shadow-md p-2">
              <img src={x.urlToImage} className=" w-full h-28" />
              <h2 className=" text-lg font-medium">{x.title}</h2>
              <p>{x.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default News;
