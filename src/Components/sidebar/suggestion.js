import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from "./SuggestedProfile";

function Suggestions({ userId, following, loggedInUserDocId, image }) {
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
      <div className="bg-white rounded mb-3 p-3">
        <h2 className=" text-xl font-medium">Suggestion for You.</h2>
        <div>
          {!profile ? (
            <Skeleton count={2} height={100} className="mt-5" />
          ) : profile.length > 0 ? (
            <div className="w-full">
             
              {profile.map((x) => (
                <div>
                  <SuggestedProfile
                    key={x.docId}
                    spDocId={x.docId}
                    profileId={x.userId}
                    username={x.username}
                    userId={userId}
                    image={image}
                    loggedInUserDocId={loggedInUserDocId}
                  />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div>
                <p>Seems there is no more user to follow.</p>
                <p>Go to search bar in menu, and search for more users and follow them.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Suggestions;
