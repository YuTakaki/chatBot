import '../../styles/strangerChatBot.scss';
import React, {useEffect, useContext} from 'react';
import { socket } from '../socket';
import { INTERESTS } from '../../context/interests';

const StrangerChatBot = (props) => {
    const {interest} = useContext(INTERESTS);
    const leaveChat = () => {
        props.history.push('/')
    }
    useEffect(() => {
        socket.connect();
        socket.emit('connectingStrangerChatbox', {interest});
        socket.emit('findStranger');
        socket.on('findStranger', user => {
            console.log(user);
            if(user){
                socket.emit('checkUserIfReady')
            }
        });
        socket.on('checkUserIfReady', user => {
            console.log(user);
            if(!user ){
                socket.emit('checkUserIfReady')
            }else{
                console.log(user)
            }
        });
        socket.on('matchComplete', user => {
            console.log(user);
        })
        return () => {
            socket.disconnect()
            socket.off('findStranger');
            socket.off('checkUserIfReady');
            console.log('hi');
        }

    },[])
    return (
        <div className='stranger-chatbox'>
            <header className='.header'>
                <i onClick={leaveChat} className='fa fa-arrow-left'></i>
                <button className='fa fa-arrow-right'>Next</button>
            </header>
            <div className='interests'>

            </div>
            <div className='chatbox'>
                <div className='others-message-content'>
                    <p>Yu Takaki</p>
                    <div className='message'>
                        <p>Commodo ullamco consequat fugiat deserunt excepteur cupidatat tempor ea. Sint labore ad nisi fugiat. Ex ut consequat sunt nisi aliquip nostrud officia elit enim quis cupidatat tempor cupidatat. Ullamco ex cillum amet enim magna.</p>
                    </div>
                    
                </div>
                <div className='users-message-content'>
                    <p>Yu Takaki</p>
                    <div className='message'>
                        <p>Commodo ullamco consequat fugiat deserunt excepteur cupidatat tempor ea. Sint labore ad nisi fugiat. Ex ut consequat sunt nisi aliquip nostrud officia elit enim quis cupidatat tempor cupidatat. Ullamco ex cillum amet enim magna.</p>
                    </div>
                    
                </div>

            </div>
            <form>
                <textarea></textarea>
                <i className='fa fa-send-o'></i>
            </form>
        </div>
    )
}

export default StrangerChatBot