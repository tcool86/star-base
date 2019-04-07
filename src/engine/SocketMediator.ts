/*
	Socket Mediator object will mediate communication
	between the game and the server.
*/
import { includes } from 'lodash';
import {
	MainScene,
	Game,
	SocketGameUpdate
} from './GameCore';
import {
	Player,
	SocketPlayerUpdateData,
	SocketPlayerJoinData,
	SocketRequestedPlayerData
} from '../player/Player';
import * as io from 'socket.io-client';

class SocketMediator {
	private static instance: SocketMediator;
	public socket: SocketIO.Socket;
	public payload: any;

	constructor() {
		if (SocketMediator.instance) {
			return SocketMediator.instance;
		}
		SocketMediator.instance = this;
		this.payload = '';
		this.connect();
	}

	static getInstance(): SocketMediator {
		SocketMediator.instance = SocketMediator.instance || new SocketMediator();
		return SocketMediator.instance;
	}

	static getSocket(): SocketIO.Socket {
		return SocketMediator.instance.socket;
	}

	static addData(data: any) {}

	public connect() {
		const localNames = ['127.0.0.1', 'localhost'];
		const hostName = location.hostname;
		const isLocal = (includes(localNames, hostName));
		if (isLocal) {
			this.socket = io(`//localhost:3000`);
			return;
		}
		this.socket = io(`//star-base-net.herokuapp.com`);
	}

	static createListeners(game: Game, key: string, user: Player) {
		const socket = SocketMediator.getSocket();
		const scene = <MainScene> game.scene.getScene(key);
		socket.on('gameUpdate', (data: SocketGameUpdate) => {
			scene.updateGame(data);
		});
		socket.on('playerUpdate', (data: SocketPlayerUpdateData) => {
			scene.updatePlayers(data);
		});
		socket.on('playerJoin', (data: SocketPlayerJoinData) => {
			const player = new Player({
				name: data.player.name,
				avatar: data.player.avatar,
				id: data.player.id,
			});
			game.addPlayerToScene(player, scene);
		});
		socket.on('addPlayer', (requesterId) => {
			if (requesterId === socket.id) {
				return;
			}
			const join = {
				player: user,
				team: 0,
			}
			const data: SocketRequestedPlayerData = {
				joiningPlayer: join,
				client: requesterId,
			};
			socket.emit('sendPlayer', data);
			socket.emit('playerUpdate', user.getUpdate());
		});
		socket.on('removePlayer', (playerId) => {
			if (user.id !== playerId) {
				scene.removePlayer(playerId);
			}
		});
	}
}

export default SocketMediator;