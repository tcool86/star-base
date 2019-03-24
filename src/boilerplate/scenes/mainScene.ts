import { socket } from '../game';
import { user } from '../game';
import GameInput from '../../player/GameInput';
import { SocketPlayerUpdateData } from '../../player/Player';
import Player from '../../player/Player';
import { each } from 'lodash';

export class MainScene extends Phaser.Scene {
	public players: Player[];
	public gamepad: Phaser.Input.Gamepad.Gamepad;
	public cursors: Phaser.Input.Keyboard.CursorKeys;
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
		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update(): void {
		const players = this.players;
		const playerIds = Object.keys(players);
		const count = playerIds.length;
		if (count >= 1) {
			var userPlayer = players[user.id];
			if (!userPlayer) {
				return;
			}
			this.gamepad = this.input.gamepad.getPad(0);
			if (!this.gamepad) {
				var horiz = 0;
				var vert = 0;
				if (this.cursors.left.isDown) {
					horiz -= 1;
				} else if (this.cursors.right.isDown) {
					horiz += 1;
				}
				if (this.cursors.up.isDown) {
					vert -= 1;
				} else if (this.cursors.down.isDown) {
					vert += 1;
				}
				userPlayer.move(horiz*0.5, vert*0.5);
			}
			if (this.gamepad && this.gamepad.connected) {
				var horiz = this.gamepad.axes[0].getValue();
				var vert = this.gamepad.axes[1].getValue();
				userPlayer.move(horiz, vert);
			}
			socket.emit('playerUpdate', userPlayer.getUpdate());
		}
	}

	public updatePlayers(data: SocketPlayerUpdateData): void {
		const players = this.players;
		const playerIds = Object.keys(players);
		// ^ use to check other players
		const updatePlayer = players[data.id];
		updatePlayer.networkUpdate(data);
	}
}