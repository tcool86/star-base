import { socket } from '../game';
import { player } from '../game';
import GameInput from '../../player/GameInput';

export class MainScene extends Phaser.Scene {
	public playerContainer: Phaser.GameObjects.Container;
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
		
	}

	update(): void {
		if (this.playerContainer) {
			this.gamepad = this.input.gamepad.getPad(0);
			if (!this.gamepad) {
				return;
			}
			if (this.gamepad.connected) {
				var horiz = this.gamepad.axes[0].getValue();
				var vert = this.gamepad.axes[1].getValue();

				this.playerContainer.x += 10 * horiz;
				this.playerContainer.y += 10 * vert;
			}
		}
	}
}
