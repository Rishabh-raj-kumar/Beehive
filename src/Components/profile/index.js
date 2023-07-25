import { useEffect, useReducer } from "react";
import { getUserByUserName, getUserPhotosByUserName } from "../../services/firebase";
import Header from "./header";
import Photos from "./photo";
import useUser from '../../hooks/useuser';

export default function Profile({ username }) {
  const {user} =useUser();
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
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
        dispatch({ profile : user, photosCollection : photo, followerCount : user.following.length});
        }
      }catch(err){
        console.log(err);
      }
    }
    getProfileAndPhotoInfo();
  },[])
  return (<>
  {/* {console.log(profile)} */}
  <Header photosCount={photosCollection ? photosCollection.length : 0}
  profile={profile}
  followerCount={followerCount}
  setFollowerCount={dispatch}
  username={username}
  user={user}/>

  <Photos photo={photosCollection}/>
  </>)
}
