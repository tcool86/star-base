import "phaser";
import { MainScene } from "./scenes/mainScene";
import * as io from 'socket.io-client';
import Player from "../player/Player";
import { SocketPlayerUpdateData } from '../player/Player';

// TODO use prod flag to determine host name
const socket = io('//localhost:3000');
export { socket };

const config: GameConfig = {
	width: 800,
	height: 600,
	type: Phaser.AUTO,
	parent: "game",
	scene: MainScene,
	input: {
		gamepad: true,
	},
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
			gravity: {
				y: 0,
			}
		}
	}
};

// game class
export class Game extends Phaser.Game {
	constructor(config: GameConfig) {
		super(config);
	}

	public addPlayerToScene(player: Player, scene): void {
		player.attachToScene(scene);
	}
}

// when the page is loaded, create our game instance
var game = null;
var player = null;
window.addEventListener("load", () => {
	game = new Game(config);
	var joinButton = document.getElementById('joinGame');
	joinButton.addEventListener('click', (event) => {
		var userNameInput = document.getElementById('userName');
		//@ts-ignore
		var userName = userNameInput.value;
		var userColorInput = document.getElementById('userColor');
		//@ts-ignore
		var userColor = userColorInput.value;
		player = new Player({
			name: userName,
			avatar: userColor,
		});
		var currentScene = game.scene.scenes[0];
		game.addPlayerToScene(player, currentScene);
	})
	socket.on('playerUpdate', (data: SocketPlayerUpdateData) => {
		var currentScene = game.scene.scenes[0];
		currentScene.updatePlayers(data);
	});
});

export { game };
export { player };