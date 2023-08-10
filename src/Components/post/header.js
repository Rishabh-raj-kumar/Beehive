import {Link} from 'react-router-dom';

export default function Header({ username, img }){
    return (
        <div className=' flex border-b border-gray-400 h-4 p-4 py-6'>
            <div className=' flex items-center'>
                <Link to={`/p/${username}`} className='flex items-center'>
                <img
                className=" rounded-full h-8 w-8 mr-3 object-cover border" 
                src={`${img}`}/>
                <p className=' text-white'>{username}</p>
                </Link>
            </div>
        </div>
    )
}