import React, { useState } from 'react'
import ListItem from '../components/listitem'
import styles from '../styles/taskpage.module.css'

function TaskPage(props) {
	const [hide, setHide] = useState(true)
	const [alert, showAlert] = useState(false)
	const [msg, setMsg] = useState("")
	const hideToggle = () => {
		setHide(!hide)
	}

	const setCookieTaskComplete = (i) => {
		const tempData = {...props.playerData}
		tempData.tasks.forEach(task => {
			if (task.index === i) {
				task.completed = true
			}
		})
		props.setPlayerData(tempData)	

	}

	props.socket.on("alert", (msg) => {
		setMsg(msg)
		props.alertAudio.play()
		showAlert(true)
	})

	const closePrompt = (event) => {
		props.alertAudio.pause()
		props.alertAudio.currentTime = 0
		showAlert(false)
		event.stopPropagation()
	}


	return (
		<div className={styles.taskContainer}>
			{ alert ? 
				<div onClick={e => closePrompt(e)} className={styles.backdrop}>
					<div onClick = {e => e.stopPropagation()} className={styles.modal}>{msg}</div>
				</div>
				: null}
			<div className={styles.identity}>
				<div
					onClick={hideToggle}
					className={styles.shield}
					style={hide?{opacity: 1}:{opacity: 0}}
				></div>
				{props.playerData.id}		
			</div>
			{props.playerData.tasks.map((task, i) => (
				<ListItem id={props.playerData.id} text={task.text}  completed={task.completed} setCookie={() => setCookieTaskComplete(i)} />
			))}
			<button onClick={() => {
				props.socket.emit("report")	
			}}>Report</button>
			<button onClick={() => {
				props.alertAudio.play()
				props.alertAudio.pause()
				props.alertAudio.currentTime = 0
			}}>IOS unlock audio</button>
		</div>
	)
}

export default TaskPage
