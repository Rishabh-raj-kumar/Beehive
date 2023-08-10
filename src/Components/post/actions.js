import { useContext, useState } from "react";
import userContext from "../../context/usercontext";
import Firebasecontext from "../../context/firebase";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

export default function Actions({
  content,
  docId,
  photoId,
  userIds,
  totalLikes,
  likedPhoto,
  handleFocus,
}) {
  const {
    user: { uid: userId = "" },
  } = useContext(userContext);
  const [toggleLiked, setToggleLiked] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);
  const { firebase } = useContext(Firebasecontext);

  const handleToggleLiked = async () => {
    console.log(userIds);
    setToggleLiked(!toggleLiked);
    // we have to update it in firebase likes also..
    const db = getFirestore(firebase);
    const docs = doc(db, "photos", docId);

    await updateDoc(docs, {
      likes: toggleLiked ? arrayRemove(`${userId}`) : arrayUnion(`${userId}`),
    });

    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };

  return (
    <>
      <div className=" flex justify-between p-4">
        <div className="flex">
          <svg
          onClick={handleToggleLiked}
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            fill={toggleLiked ? "#FF0000" : "none"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
              stroke={toggleLiked ? "#FF0000" : "#fff"}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <Link to={`/c/${docId}`}>
            <svg
              onClick={handleFocus}
              width="40px"
              height="40px"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              className="ml-3 mt-2 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
          </Link>
        </div>
      </div>
      <p className="p-4 pt-0 pb-2 font-semibold text-white">likes {likes}</p>
    </>
  );
}
