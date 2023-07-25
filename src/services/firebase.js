import {  firebase } from '../firebase/firebase';
import {FieldValue, arrayRemove, arrayUnion, collection, doc, getDocs, getFirestore, limit, onSnapshot, query, updateDoc, where} from 'firebase/firestore'
export async function doesUserExist(username){
    const db = getFirestore(firebase);
    const result = collection(db,'users');
    const q = query(result, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    let results = querySnapshot.docs.map((doc) => (
         doc.data.length > 0
        ));

    return results;
}

export async function getUserByUserId(uid){
    const db = getFirestore(firebase);
    const result = collection(db,'users');
    const q = query(result, where("userId", "==", uid));

    const querySnapshot = await getDocs(q);
    let user = querySnapshot.docs.map((doc) => ({
     ...doc.data(),
     docId : doc.id    
    }));

    return user;
}

export async function getSuggestedProfiles(userId,following){
    const db = getFirestore(firebase);
    const result = collection(db,'users');
    const q = query(result, limit(3));
    const querySnapshot = await getDocs(q);

    let user = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId : doc.id    
       })).filter((profile) =>  profile.userId !== userId
       && !following.includes(profile.userId));

    return user;
}

export async function updateLoggedInUserFollowing(loggedInUserDocId,profileId,isFollowingProfile){
   const db = getFirestore(firebase);
   console.log(loggedInUserDocId);
   const docs = doc(db,'users',loggedInUserDocId);

   const res = await updateDoc(docs,{
         following :  isFollowingProfile
         ? arrayRemove(`${profileId}`)
         : arrayUnion(`${profileId}`)
   })

   return res;
}

export async function updateFolllowedUserFollowers(profileId,loggedInUserDocId,isFollowingProfile){
    const db = getFirestore(firebase);
    const docs = doc(db,'users',profileId);
 
    const res = await updateDoc(docs,{
          followers :  isFollowingProfile
          ? arrayRemove(loggedInUserDocId)
          : arrayUnion(loggedInUserDocId)
    })
 
    return res;
 }

 export async function getPhotos(userId,following){
     const db = getFirestore(firebase);
     const col = collection(db,'photos');
     const q = query(col,where('userId','in',following));
     const getDOcs = await getDocs(q);

     let userFollowedPhotos = getDOcs.docs.map((doc) => ({
        ...doc.data(),
        docId : doc.id    
       }))

       //check wether we are able to fetch photos..
    //    console.log(userFollowedPhotos);
       
     const PhotoWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) =>{
            let userLikedPhotO = false;
            if(photo.likes.includes(userId)){
                userLikedPhotO = true;
            }

            const user = await getUserByUserId(photo.userId);
            const {username} = user[0];
            return { username, ...photo, userLikedPhotO};
        })
     )

     return PhotoWithUserDetails;
 }

 export async function getUserByUserName(username){
    const db = getFirestore(firebase);
    const result = collection(db,'users');
    const q = query(result, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    let results = querySnapshot.docs.map((doc) => (
         {...doc.data(),
          docId : doc.id
         }));

    return results.length > 0 ? results : false;
}

export async function getUserPhotosByUserName(username){
    const [user] = await getUserByUserName(username);
    const db = getFirestore(firebase);
    const result = collection(db,'photos');
    const q = query(result, where("userId", "==", user.userId));
    const res = await getDocs(q);

    return res.docs.map((item) =>({
      ...item.data(),
      docId : item.id
    }))
}

export async function isUserFollowingProfile(loggedInUsername,profileUserId){
    const db = getFirestore(firebase);
    const result = collection(db,'users');
    const q = query(result,where("username", "==", loggedInUsername),where('following','array-contains',profileUserId));
    const querySnapshot = await getDocs(q);

    const [results = {}] = querySnapshot.docs.map((doc) => (
         {...doc.data(),
          docId : doc.id
         }));

    return results;
}

export async function toggleFollowUser(
    isFollowingProfile,
    activeUserDocId,
    profileDocId,
    profileUserId,
    followingUserId
){
    // console.log()
    await updateLoggedInUserFollowing(activeUserDocId,profileDocId,isFollowingProfile);
    await updateFolllowedUserFollowers(profileDocId,followingUserId,isFollowingProfile);

}
