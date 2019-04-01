import "phaser";

class CaptureBall {
	ballSprite: Phaser.Physics.Arcade.Sprite;
	imageKey: string;

	constructor() {
		this.imageKey = 'capture-ball';
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
		// ball.setVelocityX(player.body.velocity.x/2);
		// ball.setVelocityY(player.body.velocity.y/2);
	}
}

export default CaptureBall;