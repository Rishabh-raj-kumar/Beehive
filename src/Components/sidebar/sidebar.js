import React, { useEffect, useState } from "react";
import useUser from "../../hooks/useuser";
import Suggestions from "./suggestion";
import { getUserByUserId } from "../../services/firebase";
import News from "./News";

function Sidebar({ photos }) {
  const { user } = useUser();
  const [fullname, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [following, setFollowing] = useState("");
  const [docId, setDoc] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    try {
      if (user) {
        // usr was in first index of array so we used shift..
        const { fullname, username, userId, image, following, docId } =
          user.shift();
        console.log();
        setFullName(fullname);
        setUserName(username);
        setImage(image);
        setUserId(userId);
        setFollowing(following);
        setDoc(docId);
      }
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await getUserByUserId(content.userId);
        //  console.log(res)
        setProfileImage(res[0].image);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  });

  return (
    <>
      <div className=" relative w-full overflow-hidden">
        <div className="suggestion p-4 sticky top-12" style={{ width : '400px'}}>
          <News />
          <Suggestions
            userId={userId}
            following={following}
            loggedInUserDocId={docId}
            image={image}
          />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
