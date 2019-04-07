import "phaser";
import { MainScene } from "../boilerplate/scenes/mainScene";
import { Player } from "../player/Player";

const config: GameConfig = {
	width: 800,
	height: 600,
	type: Phaser.AUTO,
	parent: "game",
	scene: [],
	input: {
		gamepad: true,
	},
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
			gravity: {
				y: 0,
			}
		}
	}
};

class Game extends Phaser.Game {
	constructor(config: GameConfig) {
		super(config);
	}

	public addPlayerToScene(playerData: any, scene): void {
		const player = new Player({
			name: playerData.name,
			avatar: playerData.avatar,
			id: playerData.id,
		});
		player.attachToScene(scene);
	}

	public startScene(key: string): MainScene {
		// TODO dynamic scene loading
		let scene = new MainScene(key);
		this.scene.add(key, scene, true);
		return scene;
	}
}

export { config };
export { Game };
export type SocketGameUpdate = {
	id: string,
	bases: object,
	ball: {
		owner: string,
	},
}
export { MainScene };