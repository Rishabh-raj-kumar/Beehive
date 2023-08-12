import React, { useEffect, useState } from "react";
import { firebase } from "../../firebase/firebase";
import { deleteStatus } from "../../services/firebase";
import {
  Timestamp,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import useUser from "../../hooks/useuser";

function Post({ setPlay, play, followedUserImg, video, docs, dateCreate,text }) {
  const [data, setData] = useState(null);
  const db = getFirestore(firebase);
  const [profId, setProfId] = useState(null);
  const { user } = useUser();
  const [profUser, setProfUser] = useState(null);
  // console.log(user);
  useEffect(() => {
    async function getUser() {
      try {
        const q = query(
          collection(db, "status"),
          where("userId", "==", docs),
          where("createdAt", "==", dateCreate)
        );
        const doc = await getDocs(q);
        const users = doc.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));

        // console.log(users[0].userId);
        setData(users[0].docId);
        setProfId(users[0].userId);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, [docs, dateCreate]);

  const handledelete = async () =>{
    const res = await deleteStatus(data, video);
  }

  useEffect(() => {
    try {
      console.log(user[0]);
      setProfUser(user[0]);
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  return (
    <div className="z-50 w-full h-screen overflow-hidden absolute top-0 md:top-32 md:left-1/4 ">
      <div className="relative w-full h-full md:w-1/2 aspect-square md:aspect-video shadow-xl bg-white">
        <div className=" flex gap-2 z-30 absolute top-3 right-4">
          <div className="" onClick={() => setPlay(!play)}>
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/ios-filled/50/close-window.png"
              alt="close-window"
            />
          </div>
          {profUser && (
            <div>
              {profUser.userId === profId ? (
                <div id="deletebtn" onClick={handledelete}>
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 12V17"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14 12V17"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4 7H20"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          )}
          <div>
            <a href={video} download={"status"} target="_blank">
              <button type="button" onClick={() => setPlay(!play)}>
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12ZM12 6.25C12.4142 6.25 12.75 6.58579 12.75 7V12.1893L14.4697 10.4697C14.7626 10.1768 15.2374 10.1768 15.5303 10.4697C15.8232 10.7626 15.8232 11.2374 15.5303 11.5303L12.5303 14.5303C12.3897 14.671 12.1989 14.75 12 14.75C11.8011 14.75 11.6103 14.671 11.4697 14.5303L8.46967 11.5303C8.17678 11.2374 8.17678 10.7626 8.46967 10.4697C8.76256 10.1768 9.23744 10.1768 9.53033 10.4697L11.25 12.1893V7C11.25 6.58579 11.5858 6.25 12 6.25ZM8 16.25C7.58579 16.25 7.25 16.5858 7.25 17C7.25 17.4142 7.58579 17.75 8 17.75H16C16.4142 17.75 16.75 17.4142 16.75 17C16.75 16.5858 16.4142 16.25 16 16.25H8Z"
                    fill="#000000"
                  />
                </svg>
              </button>
            </a>
          </div>
        </div>
        <div className="--status_user bg-gray-300 w-10 h-10 rounded-full absolute left-2 top-2 overflow-hidden">
          {followedUserImg && (
            <img src={followedUserImg} className="w-10 h-10 object-cover" />
          )}
        </div>
        <div className="w-full h-full grid place-items-center">
          <video autoPlay={true} className=" w-full h-auto">
            <source src={video} type="video/mp4" />
          </video>
        </div>
        {text && <div className=" absolute bottom-4 left-1/2 -translate-x-1/2">
           <p className=" text-lg font-semibold text-center">{text}</p>
        </div>}
      </div>
    </div>
  );
}

export default Post;
