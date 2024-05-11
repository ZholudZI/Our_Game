let delayer = true

document.getElementById("title-screen").onclick = function Skip() {
	document.getElementById("title-screen").style.animation = "none"
	document.getElementById("title-screen").style.display = "none"
	document.getElementById("team-screen").style.display = "flex"
	delayer = false
}

setTimeout(function () {
	if (delayer) {
		document.getElementById('team-screen').style.display = 'flex'
		document.getElementById('team-screen').style.animation = '2s team-screen-anim ease forwards'
	}
}, 6000)

var result = [];
var blockNow = {};
var balance = 0;
var gameData = {};
var state = 'waitForRoomId';
var userAnswer = '';
var roomId;
var playersNum = 0;
var lobby = true;
var firstNameFormChage = false;
var teams = [];
var turn = 0;
var roomsData = [];
var username = `player${Math.floor(Math.random() * 1000)}`;
var delay = ms => new Promise(res => setTimeout(res, ms));
var flag = false;
var serverIp = 'http://' + window.location.toString().split('/')[2].split(':')[0] + ':8000'
/*function ask(block) { //функция онлайн-мультиплеера
	blockNow = block
	questionArea = document.getElementById('question')
	submitButton = document.getElementById('submit')
	answerArea = document.getElementById('answer')

	document.getElementById('table').style.display = 'none';

	questionArea.textContent = `Вопрос: ${block.question}`
	
	questionArea.style.display = 'block'
	submitButton.style.display = 'block'
	answerArea.style.display = 'block'
	document.getElementById('question-div').style.display = 'flex'
}*/
function ask2(block) {
	blockPos = { x: blockNow.pos.x, y: blockNow.pos.y };
	blockNow = block
	questionArea = document.getElementById('question')
	questionArea.textContent = block.question
	submitButton = document.getElementById('submit2')
	answerArea = document.getElementById('answer')
	if (result[blockPos.x][blockPos.y].image == undefined) {
		document.getElementById("question-with-img").style.justifyContent = "center"
		document.getElementById("question").style.width = "100%"
		document.getElementById("question").style.textAlign = "center"
	} else {
		document.getElementById("question-with-img").style.justifyContent = "space-between"
		document.getElementById('question-image2').src = './images/' + result[blockPos.x][blockPos.y].image
		questionImage = document.getElementById('question-image2')
		document.getElementById("question").style.width = "567px"
		document.getElementById("question").style.textAlign = "start"
	}

	document.getElementById('task-table').style.display = 'none';

	let answers
	for (let i = 0; i < teams.length; i++){
		if (teams[i].turnOrder == turn)
			answers = i
	}
	document.getElementById('rt1').innerHTML = "Отвечает: " + teams[answers].name;
	document.getElementById('rt1co').innerHTML = "Цена вопроса: " + result[blockPos.x][blockPos.y].cost;
	document.getElementById('rt1th').innerHTML = "Тема вопроса: " + result[blockPos.x][blockPos.y].topic;
	document.getElementById('rt1').style.color = teams[answers].color;
	if (result[blockPos.x][blockPos.y].image)
		questionImage.style.display = 'block'
	document.getElementById('question-block').style.display = 'flex'
}

function look_answer(){
	document.getElementById('check-answer-window').showModal();
	document.getElementById('answer-text').innerHTML = blockNow.answer
}

/*function submit_answer() { //функция онлайн-мультиплеера
	answerElem = document.getElementById('answer')
	buttonElem = document.getElementById('submit')

	userAnswer = answerElem.value.toLowerCase()

	answerElem.style.display = 'none'
	buttonElem.style.display = 'none'
	document.getElementById('question').style.display = 'none'
	document.getElementById('table').style.display = 'inline-table'

	fetchTable('answer')
	document.getElementById('question-div').style.display = 'none'

}*/

function submit_answersolo() {

	buttonElem = document.getElementById('submit2')
	let answers
		for (let i = 0; i < teams.length; i++){
			if (teams[i].turnOrder == turn)
				answers = i
		}

	document.getElementById('question-block').style.display = 'none'
	document.getElementById('question-image2').style.display = 'none'
	document.getElementById('task-table').style.display = 'flex'
	teams[answers].score += blockNow.cost

	result[blockPos.x][blockPos.y].answered = true

	turn += 1
	if (turn > teams.length)
		turn = 1

	processServerRessolo(gameData)
	
}

function submit_answersolo2() {
	buttonElem = document.getElementById('submit2')
	let answers
		for (let i = 0; i < teams.length; i++){
			if (teams[i].turnOrder == turn)
				answers = i
		}
	document.getElementById('question-block').style.display = 'none'
	document.getElementById('question-image2').style.display = 'none'
	document.getElementById('task-table').style.display = 'flex'

	result[blockPos.x][blockPos.y].answered = true

	turn += 1
	if (turn > teams.length)
		turn = 1

	processServerRessolo(gameData)
}

/*async function reply() { //функция онлайн-мультиплеера
	fetchTable('reply')
}*/

function getUnicalElements(arr) {
	var output = ""
	arr.forEach(item => {
		if (!output.includes(item))
			output += `${item};`
	});
	output = output.slice(0, -1)
	return output.split(';')
}




/*function tableCreate(costs, topics) { //функция онлайн-мультиплеера
	tbl = document.getElementById("table");
	tbl.innerHTML = ''
	for (let row = 0; row < topics.length + 1; row++) {
		const tr = tbl.insertRow();
		for (let col = 0; col < costs.length + 1; col++) {

			const td = tr.insertCell();
			try {
				if (row != 0 && col != 0 && result[row - 1][col - 1]) {
					var btn = document.createElement("button");
					btn.classList.add("question-select")
					btn.innerHTML = costs[col - 1];
					btn.disabled = !(state == 'waitForSelectThis');
					btn.onclick = function () {
						blockNow.pos = { x: row - 1, y: col - 1 };
						fetchTable('question-select')
					}
					if(!(state == 'waitForSelectThis')){
						btn.classList.add('.button-disabled')
					}

				} else if (row == 0 ^ col == 0) { 
					var btn = document.createElement("p");
					btn.innerHTML = `${(row == 0 ? costs[col - 1] : topics[row - 1])}`
					btn.classList.add("table-element")
				} else {
					var btn = document.createTextNode(``);
				}

				td.appendChild(btn);
			} catch (err) {
				debugger;
				console.log(err)
			}
		}
	}
	return
}*/

function tableCreateSolo(costs, topics) {
	tbl = document.getElementById("task-table-block");
	tbl.innerHTML = ''
	for (let row = 0; row < topics.length + 1; row++) {
		const tr = tbl.insertRow();
		for (let col = 0; col < costs.length + 1; col++) {

			const td = tr.insertCell();
			td.classList.add("number-field")
			try {
				if (row != 0 && col != 0 && result[row - 1][col - 1]) {
					var btn = document.createElement("button");
					btn.innerHTML = costs[col - 1];
					btn.disabled = !(state == 'waitForSelectThis');
					btn.classList.add('button')
					if (!result[row - 1][col - 1].answered)
						btn.onclick = function () {
							blockNow.pos = { x: row - 1, y: col - 1 };
							processServerRessolo(gameData)
						}
					else
						btn.classList.replace('button', 'used-already')
					

				} else if (row == 0 ^ col == 0) { 
					var btn = document.createElement("h2");
					btn.innerHTML = `${(row == 0 ? costs[col - 1] : topics[row - 1])}`
				} else {
					var btn = document.createTextNode(``);
				}

				td.appendChild(btn);
			} catch (err) {
				debugger;
				console.log(err)
			}
		}
	}
	return
}

/*async function fetchTable(type) { //функция онлайн-мультиплеера
	fetch(`${serverIp}/fetch?${type == 'answer' ? `btnPos=${JSON.stringify(blockNow.pos)}&answer=${userAnswer}&` : ``}id=${roomId}&user=${username}&type=${type}${type == 'question-select' ? `&btnPos=${JSON.stringify(blockNow.pos)}` : ``}`)
		.then(data => data.json())
		.then(async function (data) {
			processServerRes(data)
		})
		.catch(err => { console.log(err); alert('can\'t connect to servers'); debugger; })
}*/

async function fetchTablesolo(type) {
	fetch(`${serverIp}/fetchsolo?${type == 'answer' ? `btnPos=${JSON.stringify(blockNow.pos)}&answer=${userAnswer}&` : ``}id=${1}&user=${username}&type=${type}${type == 'question-select' ? `&btnPos=${JSON.stringify(blockNow.pos)}` : ``}`)
		.then(data => data.json())
		.then(async function (data) {
			processServerRessolo(data)
		})
		.catch(err => { console.log(err); alert('can\'t connect to servers'); debugger; })
}

async function processServerRessolo(data) {
	try {
		gameData = data;
		gameTheme = gameData.theme;
		result = gameData.result
		tableCreateSolo(gameData.costsList, gameData.topicsList);
		balanceContent = ``
		let answers
		for (let i = 0; i < teams.length; i++){
			balanceContent += `<section>
                <h2 style="color:${teams[i].color}">${teams[i].name}</h2>
                <h3 style="background-color:${teams[i].color}">${teams[i].score}</h3>
            </section>`
			if (teams[i].turnOrder == turn)
				answers = i
		}
		document.getElementById('rt2').innerHTML = `Выбирает: ${teams[answers].name}`
		document.getElementById('rt2').style.color = teams[answers].color;
		document.getElementById('rt3').innerHTML = `Тема викторины:  ${gameTheme}`
		document.getElementById('team-points-block').innerHTML = balanceContent //вывод баланса
		if (blockNow.pos)
			ask2(result[blockNow.pos.x][blockNow.pos.y])
		let flag = true
		for (let i = 0; i<=3; i++){
			for (let j = 0; j<=4; j++){
				if (!gameData.result[i][j].answered)
					flag = false
			}
		}
		if (flag == true)
			finishGame()
	} catch(err) {
		console.log(err)
	}
}

/*async function processServerRes(data) { //функция онлайн-мультиплеера
	try {
		playersNum = data.playersNum;
		document.getElementById('marker').textContent = `Ожидание игроков(${playersNum}/${data.maxPlayers})... `

		if (playersNum >= data.maxPlayers && lobby)
			setup()

		gameData = data; //сохраняем
		balance = data.balance; // получаем баланс
		state = data.states[username]
		result = data.result //2д массив 

		if (state == 'waitForWhoAnswering') {
			document.getElementById('reply-div').style.display = 'block'
            document.getElementById('table').style.display = 'none'
            document.getElementById('question-preview').textContent = result[gameData.blockNow.pos.x][gameData.blockNow.pos.y].question
			document.getElementById('question-image').src = './images/' + (result[gameData.blockNow.pos.x][gameData.blockNow.pos.y].image || 'empty.png')
        }
		else
			document.getElementById('reply-div').style.display = 'none'
		if (state == 'waitForSelectOther' || state == 'waitForSelectThis')
			document.getElementById('table').style.display = 'table'

		if (state == 'waitForAnswerThis')
			ask(result[data.blockNow.pos.x][data.blockNow.pos.y])


		balanceContent = `баланс команд: <br>`
		Object.keys(balance).forEach(item => balanceContent += `${item}: ${balance[item]}<br>`)
		document.getElementById('balance').innerHTML = balanceContent //вывод баланса

		tableCreate(data.costsList, data.topicsList); //таблица  

		document.getElementById('answer').value = '' //стираем ответ

		await delay(1000)

		if (['waitForSelectOther', 'waitForSelectThis', 'waitForAnswerOther', 'waitForOthers', 'waitForWhoAnswering'].includes(state))
			fetchTable('get')
	} catch(err) {
		console.log(err)
	}
}*/

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable)
			return pair[1];
	}
	return undefined;
}

/*function waitForOthers() { //функция онлайн-мультиплеера
	state = 'waitForOthers'

	document.getElementById('submit_username').style.display = 'none'
	document.getElementById('login').style.display = 'none'

	fetchTable('newPlayer')

	marker = document.getElementById('marker')
	marker.style.display = 'block'
}*/
/*function setup() { //функция онлайн-мультиплеера
	document.getElementById('marker').style.display = 'none'

	fetchTable('get')
	document.getElementById('balance').style.display = 'flex'
	document.getElementById('table').style.display = 'inline-table'

	lobby = false
}*/

/*async function apply_username() { //функция онлайн-мультиплеера
	var un = document.getElementById('username').value;
	var ri = parseInt(document.getElementById('game-id').value, 16);
	
	if(!roomsData[idHash(ri)])
		return alert('ID команды неверный')
	if (!roomsData[idHash(ri)].all.includes(un))
		return alert('Такая команда не существует')
	if (roomsData[idHash(ri)].joined.includes(un))
		return alert('Команда набрана!')
	roomId = ri
	username = un
	waitForOthers()
}*/

/*function create_room() { //функция онлайн-мультиплеера
	hideWeloceElements()
	document.getElementById('team').innerHTML = ''
	document.getElementById('team-creating-ui').style.display = 'flex'
	document.getElementById('submit-teams-solo').style.display = 'none'
	document.getElementById('submit-teams').style.display = 'block'
	while(teams.length < 2)
		create_team()
	
}*/

function create_solo_room() {
	hideWeloceElements()
	document.getElementById('team').innerHTML = ''
	document.getElementById('team-creating-ui').style.display = 'flex'
	document.getElementById('submit-teams').style.display = 'none'
	document.getElementById('submit-teams-solo').style.display = 'block'
	while(teams.length < 2)
		create_team()
	
}

/*function join_room() { //функция онлайн-мультиплеера

	hideWeloceElements()
	document.getElementById('login').style.display = 'flex'
	document.getElementById('submit_username').style.display = 'block'

	fetch(`${serverIp}/fetch?type=get-all`)
		.then(data => data.json())
		.then(async function (data) {
			roomsData = data
		})
		.catch(err => { console.log(err); alert('can\'t connect to ' + serverIp); debugger; })
	
}*/

function hideWeloceElements() {
	document.getElementById('start').style.display = 'none'
	document.getElementById('login').style.display = 'none'
	document.getElementById('team-creating-ui').style.display = 'none'
	document.getElementById('select-mode-ui').style.display = 'none'
}

function create_team() {
	if (teams.length > 5){
		document.getElementById('Cant-create-team-message').style.animation = '2s blink-anim ease forwards'
		setTimeout(() => document.getElementById('Cant-create-team-message').style.animation = 'none', 2000) //спросить про флаг
		return
	}
	var defaultName = 'Команда'
	var defaultColor = "#00994B"
	let teamsNames = ["Команда"]
	var teamName = {
		name:defaultName,
		color:defaultColor,
		score:0,
		turnOrder:0
	}
	teamName.name = `${defaultName} ${teams.length + 1}`
	teams.push(teamName)
	document.getElementById('team-list').innerHTML += `
		<div class="team-element" id='div-team:${teamName.name}' sty>
            <div class="team-editor">
                <input placeholder="Имя команды" type="text" value='${teamName.name}' maxlength="12" onChange="editTeam('div-team:${teamName.name}', this.value)"></input>
            	<section class="team-edit-buttons">
					<div class="color-changer">
						<input type="color" value="#6c6c6c" onInput="realTimeRecolor('div-team:${teamName.name}', this.value)">
					</div>
                	<button onClick="removeTeam('div-team:${teamName.name}')"><img src="images/trash_bin.png" alt="Удалить команду"></button>
            	</section>
            </div>
            <hr>
        </div>
	`
}

function removeTeam(elementID) {
	elem = document.getElementById(elementID);
	teams.filter(item => 
		{
			if (item.name == elementID.split(':')[1]){
				teams.splice(teams.indexOf(item), 1);
			}
		}
	)
	elem.remove()
}

function editTeam(elementID, defName) {
	var newname
	let teamsNames = []
	var elem = document.getElementById(elementID);
	if (defName == null){
			console.log(elem.children[0].children[0].value)
			newname = elem.children[0].children[0].value
	}
	else
		newname = defName
	defColor = elem.children[0].children[1].children[0].children[0].value
	for (let i = 0; i <= teams.length; i++)
	{
		if (teams[i]){
			if (teams[i].name == elementID.split(':')[1]){
				teams[i].name = newname;
			}
		}
	}
	elem.id = `div-team:${newname}`
	elem.innerHTML = `
		
		<div class="team-editor">
			<input placeholder="Имя команды" type="text" value='${newname}' maxlength="12" onChange="editTeam('div-team:${newname}', this.value)" style="color:${defColor}"></input>
			<section class="team-edit-buttons">
				<div class="color-changer">
					<input type="color" value = '${defColor}' onInput="realTimeRecolor('div-team:${newname}', this.value)">
				</div>
				<button onClick="removeTeam('div-team:${newname}')"><img src="images/trash_bin.png" alt="Удалить команду"></button>
			</section>
		</div>
		<hr style="background-color:${defColor}; color:${defColor}">
	`
}

function realTimeRecolor(elementID, defColor){
	var elem = document.getElementById(elementID);
	elem.children[0].children[0].style.color = defColor;
	elem.children[1].style.color = defColor;
	elem.children[1].style.backgroundColor = defColor;
	for (let i = 0; i <= teams.length; i++)
	{
		if (teams[i]){
			if (teams[i].name == elementID.split(':')[1]){
				teams[i].color = defColor;
			}
		}
	}
}


/*function submit_teams() { //функция онлайн-мультиплеера
	let teamsNames = []
	for (let i = 0; i < teams.length; i++){
		if (teams[i])
			teamsNames.push(teams[i].name)
	}
	fetch(`${serverIp}/fetch?type=create_room&teams=${JSON.stringify(teamsNames)}`)
		.then(data => data.json())
		.then(async function (data) {
			document.getElementById('roomId').style.display = 'block'
			var roomID = data.roomID.toString(16).toUpperCase();
			var link = `${window.location.toString().split('?')[0]}?Id=${roomID}`
			document.getElementById('roomId').innerHTML = `Ваша ссылка для приглашения учасников: <a href=${link}>${link}</a> <button style = 'null' class='na_angliskom' onClick="navigator.clipboard.writeText('${link}')">	
			&#128203;</button> (ваш ID: ${roomID})`
		})
		.catch(err => { console.log(err); alert('can\'t connect to servers'); debugger; })
	document.getElementById('team-creating-ui').style.display = 'none'

}*/

function startupsolo() {
	let turnorders = []
	for (let i = 1; i <= teams.length; i++){
		turnorders.push(i)
	}
	for (let i = 0; i < teams.length; i++){
		let choose = randInt(0, turnorders.length - 1)
		teams[i].turnOrder = turnorders[choose]
		turnorders.splice(choose, 1);
	}
	turn = 1
	state = 'waitForSelectThis';
	document.getElementById('team-screen').style.display = 'none'
	fetchTablesolo('get')
	document.getElementById('task-table').style.display = 'flex'
	lobby = false
}

function backToMain(divId) {
	teams = []
	document.getElementById('results-screen').style.display = 'none'
	createstarterteams()
	document.getElementById('team-screen').style.display = 'flex'
}

function finishGame(){
	teams.sort(function (a, b) {
		return b.score - a.score;
	});
	document.getElementById('results-table').innerHTML = ""
	for (let i = 0; i < teams.length; i++){
		let placedisplay
		if (i + 1 == 1){
			placedisplay = `<img src="images/gold_crown.svg" alt="Первое место">`
		}
		else if (i + 1 == 2){
			placedisplay = `<img src="images/silver_crown.svg" alt="Второе место">`
		}
		else if (i + 1 == 3){
			placedisplay = `<img src="images/bronze_crown.svg" alt="Третье место">`
		}
		else{
			placedisplay = `<p class="place-num">${i+1}</p>`
		}
		document.getElementById('results-table').innerHTML += `
			<div class="winner-table-unit" style="background-color:${teams[i].color}">
				${placedisplay}
				<p>${teams[i].name}</p>
				<p>${teams[i].score}</p>
			</div>`;
	}
	document.getElementById('task-table').style.display = "none"
	document.getElementById('results-screen').style.display = "flex"
	document.getElementById('results-title').innerHTML = `Победитель: ${teams[0].name}`
	/*teams = teams.map(e => {e.color = e.color.substring(1); return e})
	fetch(`${serverIp}/gameResults?results=${JSON.stringify(teams)}`)
		.catch(err => { console.log(err); alert('can\'t connect to servers'); debugger; })*/
	teams = []
	state = 'waitForRoomId'
}

function idHash (id) {
	var level1 = id ^ 0x323B0239
	var level2 = level1 / 0xFFFFFFFF
	var level3 = Math.sin(level2 * 90) * 0xFFFFFFFF
	var level4 = Math.floor(level3)
	return level4
}

function select_mode() {
	hideWeloceElements()
	document.getElementById('select-mode-ui').style.display = 'flex'
	
}

function clearIntervals(){
	for (let i = 1; i < interval_id; i++) {
		clearInterval(i);
	  }
}

if(getQueryVariable('Id') != undefined){ 
	roomIdHex = getQueryVariable('Id')
	roomId = parseInt(roomIdHex, 16);
	join_room();
	state = 'waitForUsername';
	document.getElementById('game-id').value = roomIdHex;
	document.getElementById('login-back').style.display = 'none'
}

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.round(Math.random() * (max - min)) + min;
}

window.addEventListener('load', () => {
	createstarterteams()
  });

function createstarterteams(){
	document.getElementById('team-list').innerHTML = ''
	create_team();
	create_team();
	create_team();
}
  