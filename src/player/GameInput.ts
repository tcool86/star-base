import { game } from '../boilerplate/game';

/**
 * TODO support checks, other buttons
 * look at phaser 3 gamepad stuffs
 */
class GameInput {
	gamePad: GamepadInputConfig;
	constructor() {
		// game.input.gamepad.start();
		// game.input.onDown.add(this.dump, game);
		// this.gamePad = game.input.gamepad.pad1;
	}

	dump() {
		console.log(this.gamePad.target);
	}

	getInputs() {
		const gamePad = this.gamePad;
	}
	upPressed() {}
	downPressed() {}
}

export default GameInput;