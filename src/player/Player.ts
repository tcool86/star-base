import "phaser";

type PlayerConfig = {
	name: string;
	avatar: string;
}

class Player {
	id: string;
	name: string;
	avatar: string;
	currentFrame: number;
	isUser: boolean;

	container: Phaser.GameObjects.Container;

	constructor(config: PlayerConfig) {
		this.name = config.name;
		this.avatar = config.avatar;
		this.id = `${config.name}_${Math.random() * 999999}`;

		// These properties require a scene
		this.container = null;
	}

	public attachToScene(scene): void {
		this.container = scene.add.container(400, 300);
		var playerSprite = scene.add.sprite(0, 0, this.avatar);
		const textColor = (this.isUser) ? 'yellow' : 'cyan';
		var nameSprite = scene.add.text(0, 50, this.name, {
			font: "9px Arial",
			fill: textColor,
		});
		nameSprite.setOrigin(0.5, 0.5);
		this.container.add(playerSprite);
		this.container.add(nameSprite);
		// TODO change this to a map
		scene.players[this.id] = this;
	}

	public move(horiz, vert): void {
		this.container.x += 10 * horiz;
		this.container.y += 10 * vert;
	}

	public getUpdate(): SocketPlayerUpdateData {
		return {
			id: this.id,
			x: this.container.x,
			y: this.container.y,
			frame: this.currentFrame,
		};
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

export default Player;