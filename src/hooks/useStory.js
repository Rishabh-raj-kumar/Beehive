import React, { useContext, useEffect, useState } from 'react'
import userContext from '../context/usercontext';
import { getUserByUserId
    , getStory } from '../services/firebase';

function useStory() {
    const [story,setStory] = useState(null);
    const [followedUser,setUser] = useState(null);
    const {user} = useContext(userContext);

    useEffect(() =>{
        const {uid : userId =''} = user;
        async function getTimelinePhotos(){
            const [{ following }] = await getUserByUserId(userId);
            if(following.length > 0){
            // console.log(following)
            const userStory = await getStory(userId,following);
            // console.log(userStory)
            //re arrange photos to the newest accordingly date created
            userStory.userStory.sort((a,b) => b.dateCreated - a.dateCreated);
            setStory(userStory.userStory);
            setUser(userStory.StoryWithUser)
            }

        }

        getTimelinePhotos();
    },[])
  return {story,followedUser};
}

export default useStory;