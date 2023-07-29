import { useContext, useEffect, useState } from "react";
import userContext from "../context/usercontext";
import { getUserByUserId } from "../services/firebase";

export default function useUser(){
    const [ActiveUser, setActiveUser] = useState([]);
    const { user} = useContext(userContext) ?? {};

    useEffect(() =>{
        async function getUserObjById(){
            try{
            // we need a function that calls a user by id.
            const responce = await getUserByUserId(user.uid);
            // console.log(responce);
            if(responce){
              setActiveUser(responce);
            }
            }catch(err){
                console.log(err);
            }
        }
        if( user?.uid){
            getUserObjById();
        }
    },[user]);

    return { user : ActiveUser}
}