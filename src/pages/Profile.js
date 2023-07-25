import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { getUserByUserName } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from '../Components/header';
import UserProfile from "../Components/profile/index";

export default function Profile(){
    const {username} = useParams();
    const [user,setUser] = useState(null);
    const [userExist,setUserExists] = useState(false);
    let history = useNavigate();

    useEffect(() =>{
           async function checkUserExists(){
            try{
            const result = await getUserByUserName(username);
            if(result.length > 0){
                setUser(result[0]);
                setUserExists(true);
            }else{
                setUserExists(false);
                history(ROUTES.NOTFOUND);
            }
           }catch(err){
            console.log(err)
           }
        }
           checkUserExists();
    },[username,history]);

    return(
        <div>
            <Header />
            <div>
                <UserProfile username={username}/>
            </div>
        </div>
    )
}