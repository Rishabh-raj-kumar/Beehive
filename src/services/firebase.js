import {  firebase, FieldValue } from '../firebase/firebase';
import {collection, getFirestore, onSnapshot, where} from 'firebase/firestore'
export async function doesUserExist(username){
    const db = getFirestore(firebase);
    const result = collection(db,'users');

    onSnapshot(result,(snap) =>{
        snap.docs.map((user) => user.data.length > 0 );
    })
    return result;
}