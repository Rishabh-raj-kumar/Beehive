import React, { useState } from "react";
import Test from "../Components/BeeThreads/Test";
function BeeComb() {
  const [count,setCount] = useState(1);
  const [text,seText] =  useState('')
  const [change,setchang] = useState([]);
  const [post,setPost] = useState(true);

  const handleClick = () =>{
    setCount(i => i +1);
    console.log(text);
    let threadId = count;
    if(text !== ''){
      setchang([{text,threadId}, ...change])
    }
    seText('');
    console.log(change);
  }

  return (
    <div>
    <section className="w-screen min-h-screen grid place-items-center">
      {post ? (<div className=" flex flex-col gap-2">
      {[...new Array(count)].map((x,_) => (
        <>
          <input type="text" 
          className=" w-36 p-2 mt-2 border outline-none"
          placeholder="new thread"
          onChange={(e) => seText(()=> e.target.value)}/>
        </>
      ))}
      <button onClick={handleClick} className=" w-20 p-2 bg-blue-200">add</button>
      <button onClick={() => setPost(post => !post)} className=" w-20 p-2 bg-blue-200">Post</button>
      </div>) : (
        <>
          <div className=" p-1 bg-slate-200">
             {change.map((x,index) =>(
                  <h1>{x.text}</h1>
             ))}
          </div>
        </>
      )}
      <Test/>
    </section>
    </div>
  );
}

export default BeeComb;
