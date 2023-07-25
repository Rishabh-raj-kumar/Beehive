import Skeleton from "react-loading-skeleton";

export default function Photos({photo}){
    return(
        <div className="grid grid-cols-3 gap-5 mt-4 mb-12 p-4">
           {!photo ? (<>
                <Skeleton count={1} width={320} height={400}/>
           </>) : photo.length > 1 ? ( 
            photo.map((x) =>(
                <div className="relative group">
                    <img src={x.imageSrc} alt={x.caption}
                    className="m-2"/>
                </div> 
            ))): (<>
            <p className=" font-bold text-lg">No Posts Yet...</p>
            </>)}
        </div>
    )
}