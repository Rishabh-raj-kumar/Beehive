import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { firebase } from "../firebase/firebase";
import Loader from "../Components/Loader";
import Skeleton from "react-loading-skeleton";
import { getUserByUserId } from "../services/firebase";

function Comments() {
  const { docId } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkPostExists() {
      const db = getFirestore(firebase);
      const docRef = doc(db, "photos", docId);
      try {
        const res = await getDoc(docRef);
        if (res.exists()) {
          console.log(res.data());
          setPost(res.data());
        }
      } catch (err) {
        console.log(err);
      }
    }
    checkPostExists();
  }, []);

  useEffect(() => {
    async function getUser() {
      try {
        if (post) {
          // console.log(post.comments);
          const res = await getUserByUserId(post.userId);
          console.log(res[0]);
          setUser(res[0]);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, [post]);

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="font-poppins grid place-items-center w-full h-screen bg-black">
          {post ? (
            <div
              className=" relative bg-black md:w-1/2 p-3 rounded m-2"
              style={{ boxShadow: `rgba(0, 255, 255, 0.1) 0px 10px 50px` }}
            >
              {user && (
                <div className=" mt-2 flex flex-col overflow-hidden px-2 p-1 sm:px-0 border-b border-dashed border-gray-300">
                  <div className=" w-auto overflow-hidden flex gap-2">
                    <img
                      src={user.image}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className=" flex flex-col gap-0 text-white">
                      <p className=" font-bold text-base sm:text-lg">
                        {user.fullname}
                      </p>
                      <p className=" font-normal text-sm sm:text-base">
                        {post.caption}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {post.comments &&
                post.comments.map((x) => (
                  <>
                    <div className=" mt-2 flex flex-col overflow-hidden px-2 sm:px-0">
                      <div className=" w-auto h-14 rounded-full overflow-hidden flex items-center gap-2">
                        <img
                          src={x.userImg}
                          className=" w-10 h-10 md:w-14 md:h-14 rounded-full object-cover"
                        />
                        <div className=" flex gap-2 text-white">
                          <p className=" font-medium text-base sm:text-lg">
                            {x.fullname}
                          </p>
                          <p className=" font-normal text-xs sm:text-base">
                            @{x.name}
                          </p>
                        </div>
                      </div>
                      <div className=" border-l-2 border-dashed border-gray-300 mx-8 w-full flex flex-col gap-1 px-2 pb-2">
                        <p className="text-white text-sm sm:text-base">
                          {x.comment}
                        </p>
                        <div className=" mt-2 flex items-center gap-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            id="heart"
                            className=" w-4 h-4 md:w-6 md:h-6"
                          >
                            <path
                              fill="none"
                              fill-rule="evenodd"
                              stroke="#fff"
                              stroke-width="2"
                              d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z"
                            ></path>
                          </svg>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className=" w-5 h-5 md:w-6 md:h-6"
                          >
                            <path
                              d="M8 12H8.009M11.991 12H12M15.991 12H16"
                              stroke="#ffff"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z"
                              stroke="#ffffff"
                              stroke-width="1.5"
                            />
                          </svg>
                          <svg
                            viewBox="0 -0.5 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className=" w-5 h-5 md:w-6 md:h-6"
                          >
                            <path
                              d="M12.5 6.25C12.9142 6.25 13.25 5.91421 13.25 5.5C13.25 5.08579 12.9142 4.75 12.5 4.75V6.25ZM20.25 12.5C20.25 12.0858 19.9142 11.75 19.5 11.75C19.0858 11.75 18.75 12.0858 18.75 12.5H20.25ZM19.5 6.25C19.9142 6.25 20.25 5.91421 20.25 5.5C20.25 5.08579 19.9142 4.75 19.5 4.75V6.25ZM15.412 4.75C14.9978 4.75 14.662 5.08579 14.662 5.5C14.662 5.91421 14.9978 6.25 15.412 6.25V4.75ZM20.25 5.5C20.25 5.08579 19.9142 4.75 19.5 4.75C19.0858 4.75 18.75 5.08579 18.75 5.5H20.25ZM18.75 9.641C18.75 10.0552 19.0858 10.391 19.5 10.391C19.9142 10.391 20.25 10.0552 20.25 9.641H18.75ZM20.0303 6.03033C20.3232 5.73744 20.3232 5.26256 20.0303 4.96967C19.7374 4.67678 19.2626 4.67678 18.9697 4.96967L20.0303 6.03033ZM11.9697 11.9697C11.6768 12.2626 11.6768 12.7374 11.9697 13.0303C12.2626 13.3232 12.7374 13.3232 13.0303 13.0303L11.9697 11.9697ZM12.5 4.75H9.5V6.25H12.5V4.75ZM9.5 4.75C6.87665 4.75 4.75 6.87665 4.75 9.5H6.25C6.25 7.70507 7.70507 6.25 9.5 6.25V4.75ZM4.75 9.5V15.5H6.25V9.5H4.75ZM4.75 15.5C4.75 18.1234 6.87665 20.25 9.5 20.25V18.75C7.70507 18.75 6.25 17.2949 6.25 15.5H4.75ZM9.5 20.25H15.5V18.75H9.5V20.25ZM15.5 20.25C18.1234 20.25 20.25 18.1234 20.25 15.5H18.75C18.75 17.2949 17.2949 18.75 15.5 18.75V20.25ZM20.25 15.5V12.5H18.75V15.5H20.25ZM19.5 4.75H15.412V6.25H19.5V4.75ZM18.75 5.5V9.641H20.25V5.5H18.75ZM18.9697 4.96967L11.9697 11.9697L13.0303 13.0303L20.0303 6.03033L18.9697 4.96967Z"
                              fill="#ffffff"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          ) : (
            <>
              <Skeleton count={3} width={600} height={200} />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Comments;
