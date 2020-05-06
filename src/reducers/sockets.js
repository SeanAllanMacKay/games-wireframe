import io from "socket.io-client";
import { name } from '@config/constants'

export const socket = io(`/${name}`)

export const emit = (event, data) => {
    switch(event){
        case 'start-game':
            socket.emit('start-game', data)
            break;
        case 'join-game':
            socket.emit('join-game', data)
            break;
        case 'leave-game':
            socket.emit('leave-game', data)
            break;
        case 'all-in':
            socket.emit('all-in', data)
            break;
        case 'disconnect':
            socket.emit('disconnect')
            break;
        default:
            break;
    }
}