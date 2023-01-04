import React from 'react'
import styles from '../styles/button.module.css'

function Button(props) {
	return (
		<button className={styles.button} onClick={props.callback}>{props.text}</button>
	)
}

export default Button
