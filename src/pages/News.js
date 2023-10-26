import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

function News() {
  // const [items, setItems] = useState([]);
  // const [category, setCategory] = useState("general");

  // useEffect(() => {
  //   try {
  //     fetch(
  //       `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=c10d9cfbadf0469cb2f174003492eb3e`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => setItems(data.articles));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [category]);
  // return (
  //   <>
  //   {items.length > 0 ? (<div className=" bg-white rounded-lg">
  //     <h2 className=" font-medium text-xl p-3">Latest News</h2>
  //     <div className=" h-screen overflow-y-scroll">
  //       <div className=" flex flex-col lg:grid lg:grid-cols-2 gap-2 overflow-y-scroll">
  //         {items.map((x) => (
  //           <div className=" flex-1 bg-white rounded shadow-md p-2">
  //             <img src={x.urlToImage} className=" w-full h-28 md:h-80" />
  //             <h2 className=" text-lg font-medium">{x.title}</h2>
  //             <p>{x.description}</p>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>) : (<>
  //     {[...new Array(3)].map((_,index)=>(
  //         <Skeleton count={1} key={index} width={400} height={300}
  //         className=' mb-5'/>
  //       ))}
  //     </>)}
  //     </>
  return(
    <div>Hello world</div>
  );
}

export default News;
