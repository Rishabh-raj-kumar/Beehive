import { useEffect, useReducer, useState } from "react";
import { getUserByUserName, getUserPhotosByUserName } from "../../services/firebase";
import Header from "./header";
import Photos from "./photo";
import useUser from '../../hooks/useuser';
import Loader from "../Loader";

export default function Profile({ username }) {
  const {user} =useUser();
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [loading,setLoading] = useState(false);
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };
  const [{ profile, photosCollection, followerCount,profileDesc,ImportPers  }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileAndPhotoInfo(){
      try{
        const [user] = await getUserByUserName(username);
        const photo = await getUserPhotosByUserName(username);
        // console.log(photo);
        if(user){
          // console.log(user.ImportPers)
        dispatch({ profile : user, photosCollection : photo, followerCount : user.following.length,profileDesc : user.description,ImportPers : user.ImportPers});
        }
      }catch(err){
        console.log(err);
      }
    }
    getProfileAndPhotoInfo();
  },[])
  return (<>
  {loading ? (<>
    <Loader/>
    </>) : (<>
  <Header photosCount={photosCollection ? photosCollection.length : 0}
  profile={profile}
  followerCount={followerCount}
  setFollowerCount={dispatch}
  profileDesc={profileDesc }
  username={username}
  ImportPers={ImportPers}
  user={user}
  setLoader={setLoading}/>

   <hr className=" mt-3 border-1 border-gray-400"/>
  <Photos photo={photosCollection}/>
  </>)}
  </>)
}
