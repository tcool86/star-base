import { socket } from '../game';
import { user } from '../game';
import GameInput from '../../player/GameInput';
import { SocketPlayerUpdateData } from '../../player/Player';
import Player from '../../player/Player';

export class MainScene extends Phaser.Scene {
	public players: Player[];
	public gameInput: GameInput;

	public loadedCallback: Function;

	static BACKGROUND_LAYER = -1;

	constructor(key) {
		super({
			key
		});
		this.players = [];
	}

	preload(): void {
		this.load.image("space-background", "./assets/space-background.jpg");
		this.load.image("green", "./src/boilerplate/assets/green.png");
		this.load.image("blue", "./src/boilerplate/assets/blue.png");
		this.load.image("red", "./src/boilerplate/assets/red.png");
		this.load.image("yellow", "./src/boilerplate/assets/yellow.png");
	}

	create(): void {
		this.gameInput = new GameInput(this.input);
		const background = this.add.image(0, 0, 'space-background');
		background.setOrigin(0.5, 0.5);
		background.setDisplaySize(1600,1200);
		background.setDepth(MainScene.BACKGROUND_LAYER);
		if (this.loadedCallback) {
			this.loadedCallback();
			this.ready();
		}
	}

	ready(): void {
		this.cameras.main.setBounds(-800, -600, 800 * 2, 600 * 2);
		this.physics.world.setBounds(-800, -600, 800 * 2, 600 * 2);
		this.cameras.main.startFollow(user.playerSprite, true);
	}

	update(): void {
		const players = this.players;
		const playerIds = Object.keys(players);
		const count = playerIds.length;
		const input = this.gameInput;
		if (count >= 1) {
			var userPlayer = players[user.id];
			if (!userPlayer) {
				return;
			}

			var horiz = 0;
			var vert = 0;
			horiz = input.horizontalMotion();
			vert = input.verticalMotion();
			userPlayer.move(horiz, vert);
			socket.emit('playerUpdate', userPlayer.getUpdate());
			input.update(this.input);
		}
	}

	public updatePlayers(data: SocketPlayerUpdateData): void {
		const players = this.players;
		const playerIds = Object.keys(players);
		// ^ use to check other players
		const updatePlayer = players[data.id];
		updatePlayer.networkUpdate(data);
	}
}