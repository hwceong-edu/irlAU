import React, { useState } from 'react'
import ListItem from '../components/listitem'
import styles from '../styles/taskpage.module.css'

function TaskPage(props) {
	const [hide, setHide] = useState(true)
	const hideToggle = () => {
		setHide(!hide)
		console.log(hide)
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
			{props.playerData.tasks.map(task => (
				<ListItem text={task} />
			))}
		</div>
	)
}

export default TaskPage
