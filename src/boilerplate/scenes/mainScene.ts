import { socket } from '../game';
import { user } from '../game';
import GameInput from '../../player/GameInput';
import { SocketPlayerUpdateData } from '../../player/Player';
import Player from '../../player/Player';
import { includes, flatten } from 'lodash';

export class MainScene extends Phaser.Scene {
	public players: Player[];
	public gamepad: Phaser.Input.Gamepad.Gamepad;
	constructor() {
		super({
			key: "MainScene"
		});
	}

	preload(): void {
		this.load.image("green", "./src/boilerplate/assets/green.png");
		this.load.image("blue", "./src/boilerplate/assets/blue.png");
		this.load.image("red", "./src/boilerplate/assets/red.png");
		this.load.image("yellow", "./src/boilerplate/assets/yellow.png");
	}

	create(): void {
		this.players = [];
	}

	update(): void {
		var players = this.players;
		const count = Object.keys(players).length;
		if (count >= 1) {
			var userPlayer = players[user];
			if (!userPlayer) {
				return;
			}
			this.gamepad = this.input.gamepad.getPad(0);
			if (!this.gamepad) {
				return;
			}
			if (this.gamepad.connected) {
				var horiz = this.gamepad.axes[0].getValue();
				var vert = this.gamepad.axes[1].getValue();
				userPlayer.move(horiz, vert);
			}
			socket.emit('playerUpdate', userPlayer.getUpdate());
		}
	}

	public updatePlayers(data: SocketPlayerUpdateData): void {
		const players = this.players;
		if (players.length === 0) {
			return;
		}
		const playerIds = flatten(players, 'id');
		if (!includes(playerIds, data.id)) {
			// TODO potential drop-in style adding a player
			console.warn('player not found!');
		}

	}
}