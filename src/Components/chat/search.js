import { useState } from "react";
import { firebase } from "../../firebase/firebase";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";

const Search = () =>{
    const [username,setUsername] = useState('');
    const [user,setUser] = useState('');

    const handleSearch = async () =>{
        try{
            // console.log(username)
            const db = getFirestore(firebase);
            const result = collection(db, "users");
            const q = query(result, where("username", "==", username));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            })
        }catch(err){
            console.log(err);
        }
    }
    const handleEvent = (e) =>{
       e.code === 'Enter' && handleSearch();
    }
   return (
    <div className=" border-b-2 border-gray-400">
        <div className="p-2">
            <input type="text"
            placeholder="Search"
             className=" bg-slate-800 border-none outline-none w-full text-white" 
             onClick={e => setUsername(e.target.value)}
             onKeyDown={handleEvent}/>
        </div>
        {username.length > 0 ?
        (<div className=" p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-600 text-white">
            <img src={user.image} className=" w-12 h-12 rounded-full object-cover"/>
            <div className="">
                <span>{user.username}</span>
            </div>
        </div>)
        :null}
    </div>
   )    
}
export default Search;