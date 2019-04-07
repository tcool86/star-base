import "phaser";
import { game } from '../boilerplate/game';
// TODO use interface rather than player
import { Player } from "../player/Player";
import SocketMediator from '../engine/SocketMediator';

class CaptureBall {
	ballSprite: Phaser.Physics.Arcade.Sprite;
	imageKey: string;
	owner?: string;

	constructor() {
		this.imageKey = 'capture-ball';
		this.owner = null;
	}

	public attachToScene(scene): void {
		const ballSprite = scene.physics.add.image(0, 0, this.imageKey);
		ballSprite.setCollideWorldBounds(true);
		ballSprite.setDamping(true);
		ballSprite.setCircle(16);
		ballSprite.setBounce(1);
		this.ballSprite = ballSprite;
	}

	public collisionWithPlayer(player, ball) {
		const playerData = player.getData('id');
		SocketMediator.updateGameProperty({
			ball: {
				owner: playerData,
			},
		})
	}

	public networkUpdate(data) {
		this.owner = data.owner;
	}
}

export default CaptureBall;