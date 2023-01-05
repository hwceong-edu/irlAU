import React, { useState } from 'react'
import ListItem from '../components/listitem'
import styles from '../styles/taskpage.module.css'

function TaskPage(props) {
	const [hide, setHide] = useState(true)
	const [alert, showAlert] = useState(false)
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

	props.socket.on("alert", (_) => {
		document.getElementById('report').play()	
		showAlert(true)
	})

	const closePrompt = (event) => {
		showAlert(false)
		event.stopPropagation()
	}


	return (
		<div className={styles.taskContainer}>
			{ alert ? 
				<div onClick={e => closePrompt(e)} className={styles.backdrop}>
					<div onClick = {e => e.stopPropagation()} className={styles.modal}>
						EMERGENCY MEETING
					</div>
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
		</div>
	)
}

export default TaskPage
