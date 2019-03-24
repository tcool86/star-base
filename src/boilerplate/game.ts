import "phaser";
import { MainScene } from "./scenes/mainScene";
import * as io from 'socket.io-client';
import Player from "../player/Player";
import {
	SocketPlayerUpdateData,
	SocketPlayerJoinData,
	SocketRequestedPlayerData
} from '../player/Player';

let socket;
if (location.hostname === '127.0.0.1') {
	socket = io(`//${location.hostname}:3000`);
} else {
	socket = io(`//star-base-net.herokuapp.com`);
}

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
var user: Player = null;
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
		const player = new Player({
			name: userName,
			avatar: userColor,
		});
		user = player;
		player.isUser = true;
		const currentScene = game.scene.scenes[0];
		game.addPlayerToScene(player, currentScene);
		const networkPlayer =  {
			player,
			team: 0,
		};
		socket.emit('playerJoin', networkPlayer);
		socket.emit('requestPlayers');
	});
	socket.on('playerUpdate', (data: SocketPlayerUpdateData) => {
		const currentScene = game.scene.scenes[0];
		currentScene.updatePlayers(data);
	});
	socket.on('playerJoin', (data: SocketPlayerJoinData) => {
		const currentScene = game.scene.scenes[0];
		const player = new Player({
			name: data.player.name,
			avatar: data.player.avatar,
			id: data.player.id,
		});
		game.addPlayerToScene(player, currentScene);
	});
	socket.on('addPlayer', (requesterId) => {
		if (requesterId === socket.id) {
			return;
		}
		const join = {
			player: user,
			team: 0,
		}
		const data: SocketRequestedPlayerData = {
			joiningPlayer: join,
			client: requesterId,
		};
		socket.emit('sendPlayer', data);
	});
});

export { game };
export { user };