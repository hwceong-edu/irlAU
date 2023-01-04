const express = require("express")
const app = express()
const server = require("http").createServer(app)

const PORT = process.env.PORT || 8000

// game rules
const playerComp = {
	"civilians": 6,
	"imposters": 2
}

const taskList = {
	"1": "task1",
	"2": "task2",
	"3": "task3",
	"4": "task4"
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

	for (let i = 0; i < comp.civilians; i++) {
		array.push("civilian")
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
		var r = Math.floor(Math.random() * 4) + 1
		if (tasksIndex.indexOf(r) === -1) {
			tasksIndex.push(r)
		}
	}
	var tasks = tasksIndex.map(i => taskList[i.toString()])
	
	res.send({page: 'tasks', id: playerId.pop(), tasks: tasks})
})

var listener = server.listen(PORT, () => console.log(`Listening on ${listener.address().port}`))
