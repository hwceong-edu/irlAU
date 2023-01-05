import React, { useState } from 'react'
import ListItem from '../components/listitem'
import styles from '../styles/taskpage.module.css'

function TaskPage(props) {
	const [hide, setHide] = useState(true)
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

	return (
		<div className={styles.taskContainer}>
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
				document.getElementById('report').play()
				props.socket.emit("report")	
			}}>Report</button>
		</div>
	)
}

export default TaskPage
