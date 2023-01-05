const express = require("express")
const app = express()
const server = require("http").createServer(app)
const cookieParser = require('cookie-parser')
const { Server } = require('socket.io')
const { totalmem } = require("os")
const io = new Server(server)

app.use(cookieParser())

const port = 8000

// game rules
const playerComp = {
	"crewmates": 2,
	"imposters": 1
}

const totalTask = playerComp.crewmates * 3
let completedTask = 0

const taskList = {
	"1": "Connect The Dots",
	"2": "Sudoku",
	"3": "Word Search",
	"4": "Crossword",
	"5": "Spot The Difference"
}

function makeid(length) {
    var result           = ''
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }

	return array
}

function getIdDist(comp) {
	let array = []

	for (let i = 0; i < comp.crewmates; i++) {
		array.push("crewmate")
	}

	for (let i = 0; i < comp.imposters; i++) {
		array.push("imposter")
	}
	
	return shuffleArray(array)
}

const playerId = getIdDist(playerComp)
const gameId = makeid(8)

app.use(express.static('public'))

app.get('/newplayer', (_,res) => {
	var tasksIndex = []
	while (tasksIndex.length < 3) {
		var r = Math.floor(Math.random() * 5) + 1
		if (tasksIndex.indexOf(r) === -1) {
			tasksIndex.push(r)
		}
	}

	if (playerId.length > 0) {
		var tasks = tasksIndex.map((i,relI) => ({
			index: relI,
			text: taskList[i.toString()],
			completed: false
		}))

		const resObj = {gameid: gameId, page: 'tasks', id: playerId.pop(), tasks: tasks}
		res.cookie('irlau', JSON.stringify(resObj), { maxAge: 1800000 }).send(resObj)

	} else {
		res.send({page: 'full'})
	}
})

app.get('/check_gameid', (_,res) => {
	res.send({gameid: gameId})
})

app.post('/complete_task', (_, res) => {
	console.log(completedTask === totalTask)
	if (completedTask === totalTask) {
		io.sockets.emit("alert", "Crewmates won")
	} else if (completedTask < totalTask) {
		completedTask += 1
		res.send(completedTask.toString())
	} else {
		res.send("not counted")
	}
})

io.on('connection', (socket) => {
	console.log(socket.id)
})

var listener = server.listen(process.env.PORT || port, () => console.log(`Listening on ${listener.address().port}`))
