/**
 * TODO support checks, other buttons
 * look at phaser 3 gamepad stuffs
 */
class GameInput {
	gamepad: Phaser.Input.Gamepad.Gamepad;
	cursors: Phaser.Input.Keyboard.CursorKeys;
	keys: Phaser.Input.Keyboard.KeyCodes;

	// This could be abstracted in to class of "input"
	// i.e. Player Movement, Menu Navigation, etc
	// for now focus only on moving the player
	horiz: number;
	vert: number;

	constructor(input) {
		this.gamepad = input.gamepad.getPad(0);
		this.cursors = input.keyboard.createCursorKeys();
		this.horiz = 0;
		this.vert = 0;
	}

	dump() {
		console.log(this.gamepad);
	}

	getGamepad() {
		const gamepad = this.gamepad;
		return gamepad && gamepad.connected;
	}

	verticalMotion() {
		const keys = this.cursors;
		const gamepad = this.gamepad;
		this.vert = 0;
		if (keys.up.isDown) {
			this.vert = -0.5;
		} else if (keys.down.isDown) {
			this.vert = 0.5;
		}
		if (this.getGamepad()) {
			this.vert = gamepad.axes[1].getValue();
		}
		return this.vert;
	}
	
	horizontalMotion() {
		const keys = this.cursors;
		const gamepad = this.gamepad;
		this.horiz = 0;
		if (keys.left.isDown) {
			this.horiz = -0.5;
		} else if (keys.right.isDown) {
			this.horiz = 0.5;
		}
		if (this.getGamepad()) {
			this.horiz = gamepad.axes[0].getValue();
		}
		return this.horiz;
	}

	update(input) {
		if (!this.getGamepad()) {
			this.gamepad = input.gamepad.getPad(0);
		}
	}
}

export default GameInput;