import "phaser";
import { socket } from '../boilerplate/game';
// TODO use interface rather than player
import { Player } from "../player/Player";

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
		socket.emit('ballUpdate', {
			owner: playerData,
		});
	}

	public followPlayer(players) {
		if (!this.owner) {
			return;
		}
		const player: Player = players[this.owner];
		if (!player) {
			return;
		}
		this.ballSprite.setX(player.playerSprite.x - 100);
		this.ballSprite.setY(player.playerSprite.y - 100);
	}

	public networkUpdate(data) {
		this.owner = data.owner;
	}
}

export default CaptureBall;