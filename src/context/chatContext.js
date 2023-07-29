import { createContext, useEffect, useReducer, useState } from "react";
import useUser from "../hooks/useuser";

export const ChatContext = createContext();

export const ChatContextProvider =  ({children}) =>{
    const {user : CurrUser} = useUser() ?? {};
    const [CurrUserId,setCurrUserId] = useState('');

    const INITIAL_STATE = {
        chatId : "null",
        user : {}
    }
    useEffect(() =>{
        try{
          if(CurrUser){
            console.log(CurrUser)
            setCurrUserId(CurrUser[0].userId);
          }
        }catch(err){
          console.log(err);
        }
    },[CurrUser])

    const chatReducer = (state,action) =>{
        switch(action.type){
            case "CHANGE_USER":
                return {
                    user : action.payload,
                    chatId : CurrUserId > action.payload.uid ? CurrUserId + action.payload.uid : action.payload.uid  + CurrUserId
                }
            default:
                return state;
        }
    };

    const [state,dispatch] = useReducer(chatReducer,INITIAL_STATE);

    return(
        <ChatContext.Provider value={{ data:state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}
