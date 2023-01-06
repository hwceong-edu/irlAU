import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import JoinPage from './pages/joinPage'
import TaskPage from './pages/taskPage'
import FullPage from './pages/fullPage'

function App(props) {
	const cookieData = Cookies.get('irlau') ? JSON.parse(Cookies.get('irlau')) : false
	const [page, setPage] = useState(cookieData ? cookieData.page : 'join')
	const [playerData, setPlayerData] = useState(cookieData ? cookieData : null)
	const API_URL = window.location.href
	const pages = {
		'join': <JoinPage 
					api={API_URL}
					setPage={setPage}
					setPlayerData={setPlayerData} />,
		'tasks': <TaskPage 
					socket={props.socket}
					alertAudio={props.alertAudio}
					setPage={setPage}
					setPlayerData={setPlayerData}
					playerData={playerData} />,
		'full': <FullPage />
	}

	useEffect(() => {
		Cookies.set('irlau', JSON.stringify(playerData))
	}, [playerData])
	
	if (cookieData) {
		fetch('check_gameid', {
			method: "GET"
		}).then(res => res.json()).then(data => {
			if (data.gameid !== cookieData.gameid) {
				setPage('join')
			}
		})
	} 

	return (
		(pages[page])
	)
}

export default App
