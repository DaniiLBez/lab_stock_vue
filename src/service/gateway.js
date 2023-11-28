import { io } from 'socket.io-client'

export const stocksSocket = io('http://localhost:3000/stock')
export const controllerSocket = io('http://localhost:3000/controller')
