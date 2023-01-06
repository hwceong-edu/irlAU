import React from 'react'
import ReactDOM from 'react-dom'
import { io } from 'socket.io-client'
import App from './app'
	
const socket = io()

const alertAudio = new Audio('bell.wav')
alertAudio.src = 'bell.wav'

socket.on('connect', () => {
	console.log(socket.id)
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<App alertAudio={alertAudio} socket={socket} />
)
