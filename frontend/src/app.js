import React, { useState } from 'react'
import Cookies from 'js-cookie'

import JoinPage from './pages/joinPage'
import TaskPage from './pages/taskPage'
import FullPage from './pages/fullPage'

function App() {
	const cookieData = Cookies.get('irlau') ? JSON.parse(Cookies.get('irlau')) : false
	const [page, setPage] = useState(cookieData ? cookieData.page : 'join')
	const [playerData, setPlayerData] = useState(cookieData ? cookieData : null)
	const API_URL = window.location.href
	const pages = {
		'join': <JoinPage api={API_URL} setPage={setPage} setPlayerData={setPlayerData} />,
		'tasks': <TaskPage setPage={setPage} playerData={playerData} />,
		'full': <FullPage />
	}

	return (
		(pages[page])
	)
}

export default App
