import React, { useState } from 'react'
import styles from '../styles/listitem.module.css'

function ListItem(props) {
	const [showModal, toggleModal] = useState(false)
	const [completed, setComplete] = useState(false)
	const openPrompt = () => {
		toggleModal(true)
	}
	const closePrompt = (event) => {
		toggleModal(false)
		event.stopPropagation()
	}

	return (
		<div>
			{ showModal ?
			<div onClick={e => closePrompt(e)} className={styles.backdrop}>
				<div onClick={event => event.stopPropagation()} className={styles.modal}>
					Did you complete the task?
					<button onClick={(event)=>{
						setComplete(true)
						toggleModal(false)
						event.stopPropagation()
					}} className={styles.modal_button_primary}>Yes</button>
					<button onClick={e=> closePrompt(e)} className={styles.modal_button_secondary}>No</button>
				</div>	
			</div>
			: null}
			<div onClick={openPrompt} className={`${styles.item} ${completed ? styles.completed : styles.uncompleted}`}>
				<div>{props.text}</div>
			</div>
		</div>
	)
}

export default ListItem
