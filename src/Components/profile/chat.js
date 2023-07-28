// import React, { useEffect, useState } from 'react'
// import Header from '../header'
// import useUser from '../../hooks/useuser'
// import {ChatEngine} from 'react-chat-engine'
// import axios from 'axios';

// function Chat() {
//   const {user} =useUser();
//   const [name,setName] = useState('')
//   const [id,setId] = useState('');

//   const getFile = async(url) =>{
//       const responce = await fetch(url);
//       const data = await responce.blob();

//       return new File([data],"userPhoto.jpg",{type : 'image/jpeg'})
//   }

//   useEffect(() =>{
//     if(!user){
//       console.log(user)
//       setName('roni')
//       setId('sjxjsdjsvjdjajd');
//       axios.get('https://api.chatengine.io/users/me',{
//         headers : {
//           "project-id" : "45bdae7e-f665-4a22-a95b-ac8f02143182",
//           "user-name" : 'roni',
//           "user-secret" : "sjxjsdjsvjdjajd"
//         }
//       }).catch(()=>{
//         let formdata = new FormData();
//         formdata.append('username','roni');
//         formdata.append('secret','sjxjsdjsvjdjajd');
//         getFile('roni').then((avatar) =>{
//           formdata.append('avatar',avatar,avatar.name);

//           axios.post('https://api.chatengine.io/users',
//           formdata,
//           {headers : {"private-key" : "7e24de00-950a-4c58-b2c8-acef4996fb39"}}).catch(err =>{
//             console.log(err)
//           })
//         });
//       })
//     }
//   },[user])

//   return (
//     <div>
//         <Header/>
//         <ChatEngine
//         height="calc(100vh-66px)"
//         projectID="45bdae7e-f665-4a22-a95b-ac8f02143182"
//         userName={'roni'}
//         userSecret={'sjxjsdjsvjdjajd'}
//         />
//     </div>
//   )
// }

// export default Chat