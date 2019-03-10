import { socket } from '../game';
import { player } from '../game';
import GameInput from '../../player/GameInput';
import { SocketPlayerUpdateData } from '../../player/Player';
import Player from '../../player/Player';

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
		if (players.length >= 1) {
			var p1 = players[0];
			this.gamepad = this.input.gamepad.getPad(0);
			if (!this.gamepad) {
				return;
			}
			if (this.gamepad.connected) {
				var horiz = this.gamepad.axes[0].getValue();
				var vert = this.gamepad.axes[1].getValue();
				p1.move(horiz, vert);
			}
			socket.emit('playerUpdate', p1.getUpdate());
		}
	}

	public updatePlayers(data: SocketPlayerUpdateData): void {

	}
}