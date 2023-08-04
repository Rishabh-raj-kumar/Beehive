import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import AddComments from "./addcomments";

export default function Comments({docId, comments : allComments, posted, commentInput}){
    const [comments,setComment] = useState(allComments);
    return(
        <>
         <div className="p-4 pt-1">
            {comments.length >= 3 && (
                <Link to={`/c/${docId}`}>
                <p className=" text-sm mb-1 cursor-pointer">
                    view all {comments.length} comments.
                </p>
                </Link>
            )}
            {comments.slice(0,3).map(item => (
                <p className=" mb-1">
                    <Link to={`/p/${item.displayName}`}>
                        <span className="mr-1 font-bold">{item.displayName}</span>
                    </Link>
                    <span>{item.comment}</span>
                </p>
            ))}
            {/* <p className=" text-sm text-gray-500 font-medium">{formatDistance(posted, new Date())} ago</p> */}
         </div>
         <AddComments
           docId={docId}
           comments={comments}
           setComments={setComment}
           commentInput={commentInput} 
         />
        </>
    )
}