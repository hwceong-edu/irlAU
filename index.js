const express = require("express")
const app = express()
const server = require("http").createServer(app)

const port = 8000

// game rules
const playerComp = {
	"crewmates": 6,
	"imposters": 2
}

const taskList = {
	"1": "Connect The Dots",
	"2": "Sudoku",
	"3": "Word Search",
	"4": "Crossword",
	"5": "Spot The Difference"
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

app.use(express.static('public'))

app.get('/newplayer', (_,res) => {
	var tasksIndex = []
	while (tasksIndex.length < 3) {
		var r = Math.floor(Math.random() * 5) + 1
		if (tasksIndex.indexOf(r) === -1) {
			tasksIndex.push(r)
		}
	}
	var tasks = tasksIndex.map(i => taskList[i.toString()])

	if (playerId.length > 0) {
		res.send({page: 'tasks', id: playerId.pop(), tasks: tasks})
	} else {
		res.send({page: 'full'})
	}
})

var listener = server.listen(process.env.PORT || port, () => console.log(`Listening on ${listener.address().port}`))
