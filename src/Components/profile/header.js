import { useEffect, useState } from 'react';
import { isUserFollowingProfile, toggleFollowUser,uploadProfilePhoto } from '../../services/firebase';
import Skeleton from 'react-loading-skeleton';

export default function Header({ photosCount,
  profile : {docId : profileDocId, userId : profileUserId,fullname,image : img,followers,following}
  ,followerCount,setFollowerCount,username : profileUsername,user}) {

    const [isFollowing,setIsFollowing] = useState(false);
    const [photo,setPhoto] = useState(null);
    const [loading,setLoading] = useState(false);
    const [activeBtnFollow,setActive] = useState(null);

    // const [activebtn,setActiveBtn] = useState(user[0].username && user[0].username !== profileUsername);

    useEffect(() =>{
        try{
          if(user){
            setActive( user[0].username && user[0].username !== profileUsername);
            console.log(activeBtnFollow)
          }
        }catch(err){
          console.log(err)
        }
    },[user])
    const handleFollow = async() =>{
      setIsFollowing((isFollowing) => !isFollowing);
      setFollowerCount(
         followerCount =  isFollowing ? followers.length - 1 : followers.length + 1
      )
      console.log(isFollowing,followers.length,followerCount);
      // console.log(user[0].userId)
      await toggleFollowUser(isFollowing,user[0].docId,profileDocId,profileUserId,user[0].userId);  
    }

    useEffect(() =>{
         async function isLoggedInUserFollowingProfile(){
          try{
            if(user){
          // console.log(user[0].username,profile.userId)
          const isFollow = await isUserFollowingProfile(user[0].username,profileUserId);
          console.log(!!isFollow)
           setIsFollowing(!!isFollow);
            }
          }catch(err){
            console.log(err);
          }
        };

          isLoggedInUserFollowingProfile();
    },[profileUserId])

    const handleChange = (e) =>{
      if(e.target.files[0]){
        setPhoto(e.target.files[0]);
      }
    }
    const handleUpload = async(e) =>{
      try{
      const reso = await uploadProfilePhoto(profileDocId,photo,profileUserId,setLoading);
      if(reso){
       location.reload();
      }
    }catch(err){
      consol.log(err)
    }
    }
  return (
    <>
    {/* {console.log(img)} */}
    {/* {console.log(user[0])} */}
     <div className='mt-3 grid grid-cols-3 gap-4 justify-between max-w-lg-screen'>
      <div className='container flex justify-center'>
        <img className='rounded-full w-28 h-28'
        src={img ? `${img}` :`https://api.multiavatar.com/Binx Bond.svg`}/>
      </div>
      {console.log(isFollowing)}
      <div className='flex items-center justify-center flex-col col-span-2'>
      <div className='container flex items-center'>
        <p className='text-2xl mr-4'>{profileUsername}</p>
        {activeBtnFollow && 
        <button className=' font-bold text-sm rounded text-white bg-blue-500 p-2 uppercase'
        onClick={handleFollow}>
          {isFollowing === true ? 'unfollow' : 'follow'}</button>}
      </div>
      <div className='container flex mt-4'>
         {followers === undefined || following === undefined ?(
           <Skeleton count={1} width={677} height={24}/>
         ): 
         (<><p className='mr-10'>
          <span className='font-bold'>{photosCount} Photos</span>
         </p>
         <p className='mr-10'>
         <span className='font-bold'>{followers.length} followers</span>
        </p>
        <p className='mr-10'>
        <span className='font-bold'>{following.length} following</span>
       </p></>)}
      </div>
     </div>
     </div>
     <div>
      {!activeBtnFollow && <>
      <input type='file' onChange={handleChange}/>
      <button type="button" onClick={handleUpload}
      disabled={loading || !photo}
      className=' bg-blue-400 p-2 rounded'>upload</button>
      </>}
     </div>
    </>
  )
}
