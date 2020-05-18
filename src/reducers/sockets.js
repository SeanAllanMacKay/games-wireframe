import io from "socket.io-client";
import { name } from '@config/constants'

export const socket = io(`/${name}`)

export const emit = async (event, data) => {
    switch(event){
        case 'start-game':
            socket.emit('start-game', data)
            break;
        case 'join-game':
            await socket.emit('join-game', data)
            break;
        case 'leave-game':
            await socket.emit('leave-game', data)
            break;
        case 'all-in':
            socket.emit('all-in', data)
            break;
        case 'change-turn':
            socket.emit('change-turn', data)
            break;
        case 'disconnect':
            socket.emit('disconnect')
            break;
        default:
            break;
    }
}