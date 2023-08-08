import {Link} from 'react-router-dom';

export default function Header({ username, img }){
    return (
        <div className=' flex border-b border-gray-900 h-4 p-4 py-8'>
            <div className=' flex items-center'>
                <Link to={`/p/${username}`} className='flex items-center'>
                <img
                className=" rounded-full h-8 w-8 mr-3 object-cover" 
                src={`${img}`}/>
                <p>{username}</p>
                </Link>
            </div>
        </div>
    )
}