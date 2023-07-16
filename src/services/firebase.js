import {  firebase, FieldValue } from '../firebase/firebase';
import {collection, getDocs, getFirestore, onSnapshot, query, where} from 'firebase/firestore'
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