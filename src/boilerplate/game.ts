import "phaser";
import { MainScene } from "./scenes/mainScene";
import * as io from 'socket.io-client';
import Player from "../player/Player";

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
		player = new Player();
		player.name = userName;
		player.avatar = userColor;
		var currentScene = game.scene.scenes[0];
		var playerContainer = currentScene.add.container(400, 300);
		var playerSprite = currentScene.add.sprite(0, 0, player.avatar);
		var nameSprite = currentScene.add.text(0, 50, player.name, {
			font: "9px Arial",
			fill: player.avatar,
		});
		nameSprite.setOrigin(0.5, 0.5);
		playerContainer.add(playerSprite);
		playerContainer.add(nameSprite);
		currentScene.playerContainer = playerContainer;
	})
});

export { game };
export { player };