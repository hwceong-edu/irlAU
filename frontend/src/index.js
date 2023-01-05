import React from 'react'
import ReactDOM from 'react-dom'
import { io } from 'socket.io-client'
import App from './app'
	
const socket = io()
socket.on('connect', () => {
	console.log(socket.id)
})
socket.on("alert", (msg) => {
	document.getElementById('report').play()
	alert(msg)
})

// TODO: Move socket listeners into respective components for better UI then alert
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<App socket={socket} />
)
