import "phaser";

type PlayerConfig = {
	name: string;
	avatar: string;
	id?: string;
}
class Player {
	id: string;
	name: string;
	avatar: string;
	currentFrame: number;
	isUser: boolean;

	container: Phaser.GameObjects.Container;
	playerSprite: Phaser.Physics.Arcade.Sprite;

	constructor(config: PlayerConfig) {
		this.name = config.name;
		this.avatar = config.avatar;
		this.id = config.id || `${config.name}_${Math.random() * 999999}`;

		// These properties require a scene
		this.container = null;
	}

	public attachToScene(scene): void {
		this.container = scene.add.container(400,300);
		const playerSprite = scene.physics.add.image(0, 0, this.avatar);
		playerSprite.setCollideWorldBounds(true);
		const textColor = (this.isUser) ? 'yellow' : 'cyan';
		var nameSprite = scene.add.text(0, 50, this.name, {
			font: "9px Arial",
			fill: textColor,
		});
		nameSprite.setOrigin(0.5, 0.5);
		this.container.add(nameSprite);
		this.playerSprite = playerSprite;
		// TODO change this to a map
		scene.players[this.id] = this;
	}

	public move(horiz, vert): void {
		this.playerSprite.setVelocityX(horiz * 1000);
		this.playerSprite.setVelocityY(vert * 1000);
		this.container.setPosition(this.playerSprite.x, this.playerSprite.y);
	}

	public networkUpdate(data, scene: Phaser.Scene): void {
		scene.tweens.add({
			targets: [this.container, this.playerSprite],
			x: data.x,
			y: data.y,
			duration: 16,
			ease: 'Quint.easeOut',
		});
	}

	public getUpdate(): SocketPlayerUpdateData {
		return {
			id: this.id,
			x: this.playerSprite.x,
			y: this.playerSprite.y,
			frame: this.currentFrame,
		};
	}

	public remove() {
		this.container.destroy();
		this.playerSprite.destroy();
	}
}

export type SocketPlayerUpdateData = {
	id: string,
	x: number,
	y: number,
	frame: number,
};

export type SocketPlayerJoinData = {
	player: Player,
	team: number,
};

export type SocketRequestedPlayerData = {
	joiningPlayer: SocketPlayerJoinData,
	client: string,
}

export default Player;