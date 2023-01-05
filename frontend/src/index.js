import React from 'react'
import ReactDOM from 'react-dom'
import { io } from 'socket.io-client'
import App from './app'
	
const socket = io()

socket.on("alert", (msg) => {
	alert(msg)
})

// TODO: Move socket listeners into respective components for better UI then alert
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<App socket={socket} />
)
