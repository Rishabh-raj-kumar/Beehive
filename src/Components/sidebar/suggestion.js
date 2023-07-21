import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from "./SuggestedProfile";

function Suggestions({ userId, following }) {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    async function suggestedProfile() {
      const responce = await getSuggestedProfiles(userId, following);
      console.log(responce);
      setProfile(responce);
    }

    if (userId) {
      suggestedProfile();
    }
  }, [userId]);

  return (
    <>
    <div>
      {profile.length === 0 ? (
        <Skeleton count={2} height={100} className="mt-5" />
      ) : profile.length > 0 ? (
        <div>
          {profile.map((x => (
            <div>
            <SuggestedProfile
            key={x.docId}
            spDocId = {x.docId}
            profileId = {x.userId}
            username = {x.username}
            userId = {userId}
            />
            </div>
          )))}
        </div>
      ) : null}
      </div>
    </>
  );
}

export default Suggestions;
