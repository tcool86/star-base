import "phaser";
import SocketMediator from '../engine/SocketMediator';
import { Game, config, MainScene } from '../engine/GameCore';
import { Player } from "../player/Player";

const socket = new SocketMediator().socket;

// when the page is loaded, create our game instance
var game: Game = null;
var user: Player = null;

function startGame() {
	var userNameInput = document.getElementById('userName');
	//@ts-ignore
	var userName = userNameInput.value;
	var userColorInput = document.getElementById('userColor');
	//@ts-ignore
	var userColor = userColorInput.value;
	const player = new Player({
		name: userName,
		avatar: userColor,
	});
	user = player;
	player.isUser = true;

	const key = 'MainScene';
	const currentScene = game.startScene(key);
	currentScene.loadedCallback = () => {
		game.addPlayerToScene(player, currentScene);
		const networkPlayer =  {
			player,
			team: 0,
		};
		socket.emit('playerJoin', networkPlayer);
		socket.emit('requestPlayers');
	}
	SocketMediator.createListeners(game, key, user);
}

window.addEventListener("load", () => {
	game = new Game(config);
	var joinButton = document.getElementById('joinGame');
	joinButton.addEventListener('click', startGame);

	// Testing purposes
	// setTimeout(() => {
		// @ts-ignore
		// document.getElementById('userName').value = 'Tim';
		// joinButton.click();
	// }, 0);
});

export { socket };
export { game };
export { user };