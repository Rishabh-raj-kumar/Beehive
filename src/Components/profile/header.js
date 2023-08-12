import { useEffect, useState } from "react";
import {
  isUserFollowingProfile,
  isUsersFreind,
  toggleFollowUser,
  updateNotification,
  uploadProfilePhoto,
} from "../../services/firebase";
import Skeleton from "react-loading-skeleton";
import Loader from "../Loader";

export default function Header({
  photosCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullname,
    image: img,
    followers,
    following,
  },
  followerCount,
  setFollowerCount,
  username: profileUsername,
  profileDesc,
  ImportPers,
  user,
  setLoader,
}) {
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [activeBtnFollow, setActive] = useState(null);
  const [isFreinds, setisFreinds] = useState(false);
  const [sentReq,setSendReq] = useState(false)

  // const [activebtn,setActiveBtn] = useState(user[0].username && user[0].username !== profileUsername);

  useEffect(() => {
    try {
      if (user) {
        setActive(user[0].username && user[0].username !== profileUsername);
      }
    } catch (err) {
      // console.log(err)
    }
  }, [user]);
  console.log(followers,following)

  const handleFollow = async () => {
    // console.log(isFollowing,followers.length,followerCount);
    // console.log(user[0].userId)
    const res = await toggleFollowUser(
      isFollowing,
      user[0].docId,
      profileDocId,
      profileUserId,
      user[0].userId
    ).then(() =>{
      location.reload()
    });

    setIsFollowing((isFollowing) => !isFollowing);
    setFollowerCount(
      (followerCount = isFollowing
        ? followers.length - 1
        : followers.length + 1)
    );
  };

  useEffect(() => {
    async function isLoggedInUserFollowingProfile() {
      try {
        if (user) {
          // console.log(user[0].username,profile.userId)
          const isFollow = await isUserFollowingProfile(
            user[0].username,
            profileUserId
          );
          console.log(!!isFollow)
          setIsFollowing(!!isFollow);

          const isFreinds = await isUsersFreind(
            user[0].username,
            profileUserId
          )

          console.log(!!isFreinds);
          setisFreinds(!!isFreinds);
        }
      } catch (err) {
        // console.log(err);
      }
    }

    isLoggedInUserFollowingProfile();
  }, [profileUserId]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };
  const handleUpload = async (e) => {
    setLoader(true);
    try {
      const reso = await uploadProfilePhoto(
        profileDocId,
        photo,
        profileUserId,
        setLoading
      );
      if (reso) {
        setLoader(false);
        location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFriend = async() =>{
    console.log(user[0].docId,user[0].userId,profileUserId,profileDocId)
       const res = await updateNotification(user[0].docId,user[0].userId,profileUserId,profileDocId)
       setSendReq((sentReq) => !sentReq)
  };

  return (
    <>
      {/* {console.log(img)} */}
      {/* {console.log(user[0])} */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 justify-between max-w-lg-screen">
        <div className="container w-full flex items-center justify-center">
          <div className="relative">
          <img
            className="rounded-full w-28 h-28 object-cover"
            src={img ? `${img}` : `https://api.multiavatar.com/Binx Bond.svg`}
          />
             {!activeBtnFollow &&  <img width="36" height="36" src="https://img.icons8.com/fluency/30/add.png" alt="add"
             className="absolute bottom-0 right-0"
             onClick={() =>{
                let inp = document.getElementById('inp');
                inp.click();
             }}/>}
          </div>
        </div>

        {/* {console.log(isFollowing)} */}
        <div className="flex justify-center items-center sm:items-start flex-col col-span-2">
          <div className="flex flex-col">
            <div className="container flex items-center sm:items-start flex-col gap-3">
              <div>
              <p className="text-2xl mr-4">{profileUsername}</p>
              {profileDesc && <p className=" mt-1 text-lg">{profileDesc}</p>}
              </div>
              <div className=" flex gap-1">
              {activeBtnFollow && (
                <button
                  className=" mr-4 font-bold text-sm rounded text-white bg-blue-500 p-2 uppercase"
                  onClick={handleFollow}
                >
                  {isFollowing === true ? "unfollow" : "follow"}
                </button>
              )}
              {activeBtnFollow &&
              <div>
                {isFreinds ? (<>
                  <button
                  className=" mr-4 font-bold text-sm rounded text-white bg-blue-500 p-2 uppercase"
                >
                  Freinds
                </button>
                </>) :  (<button
                  className=" mr-4 font-bold text-sm rounded text-white bg-blue-500 p-2 uppercase"
                  onClick={handleFriend}
                  disabled={sentReq}
                >
                  {sentReq === true ? "Request Sent" : "Add Friend"}
                </button>)}
                </div>}
              {ImportPers && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="32px"
                  height="32px"
                >
                  <polygon
                    fill="#42a5f5"
                    points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"
                  />
                  <polygon
                    fill="#fff"
                    points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"
                  />
                </svg>
              )}
            </div>
            </div>
          </div>
          <div className="container flex mt-4">
            {followers === undefined || following === undefined ? (
              <Skeleton count={1} width={677} height={24} />
            ) : (
              <>
                <p className="mr-10">
                  <span className="font-bold">{photosCount} Photos</span>
                </p>
                <p className="mr-10">
                  <span className="font-bold">
                    {followers.length} followers
                  </span>
                </p>
                <p className="mr-10">
                  <span className="font-bold">
                    {following.length} following
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        {!activeBtnFollow && (
          <>
          <div className=" mt-1 w-64 grid place-items-end">
            <input type="file" onChange={handleChange} id="inp" hidden />
            { photo && 
            <button
              type="button"
              onClick={handleUpload}
              disabled={loading || !photo}
              className=" bg-green-600 text-white p-2 rounded"
            >
              Update
            </button>
              }
            </div>
          </>
        )}
      </div>
    </>
  );
}
