import Skeleton from "react-loading-skeleton";

export default function Photos({photo}){
    return(
        <div className="grid gap-5 mt-4 mb-12 p-4" style={{ gridTemplateColumns : `repeat(auto-fit,minmax(320px,1fr))`}}>
           {!photo ? (<>
                <Skeleton count={1} width={320} height={400}/>
           </>) : photo.length > 0 ? ( 
            photo.map((x) =>(
                <div className="relative group h-80">
                    <img src={x.imageSrc} alt={x.caption}
                    className="m-2 w-full h-full"/>
                </div> 
            ))): (<>
            <p className=" font-bold text-lg">No Posts Yet...</p>
            </>)}
        </div>
    )
}