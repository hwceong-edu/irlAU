import React, { useState } from 'react'
import JoinPage from './pages/joinPage'
import TaskPage from './pages/taskPage'

function App() {
	const [page, setPage] = useState('join')
	const [playerData, setPlayerData] = useState()
	const API_URL = window.location.href
	const pages = {
		'join': <JoinPage api={API_URL} setPage={setPage} setPlayerData={setPlayerData} />,
		'tasks': <TaskPage setPage={setPage} playerData={playerData} />
	}

	return (
		(pages[page])
	)
}

export default App
