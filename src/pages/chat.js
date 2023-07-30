import Sidebar from '../Components/chat/sidebar'
import Chat from '../Components/chat/chat'

const ChatHome = () =>{
    return (
        <div className=' bg-gray-900 w-screen h-screen flex items-center justify-center'>
            <div className='border-2 border-white h-screen md:w-2/3 md:h-3/4 flex flex-col md:flex-row rounded-xl overflow-hidden'>
                <Sidebar/>
                <Chat />
            </div>
        </div>
    )
}

export default ChatHome;