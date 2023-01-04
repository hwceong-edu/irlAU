import React from 'react'
import Button from '../components/button'

function JoinPage(props) {
	const joinCallback = () => {
		fetch(props.api+'newplayer', {
			method: 'GET'
		}).then(res => res.json()).then(data => {
			props.setPage(data.page)
			props.setPlayerData(data)
		})	
	}

	return (
		<Button callback={joinCallback} text="join" />
	)
}

export default JoinPage
