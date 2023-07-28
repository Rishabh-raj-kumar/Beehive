import Sidebar from '../Components/chat/sidebar'
import Chat from '../Components/chat/chat'

const ChatHome = () =>{
    return (
        <div className=' bg-gray-900 w-screen h-screen flex items-center justify-center'>
            <div className='border-2 border-white w-2/3 h-3/4 flex rounded-xl overflow-hidden'>
                <Sidebar/>
                <Chat />
            </div>
        </div>
    )
}

export default ChatHome;