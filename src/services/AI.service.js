import game_service from './GameState.service.js'
import {AIDifficulty as AID, GridCellState} from '../module/util.js'

class AI {

	difficulty = AID.Easy

	constructor(diff) {
		this.difficulty = diff
	}

	//rng based game board setup function
	generateBoats() {

	}

	//guess logic function, returns coordinates? I think
	fireLocation() {
		const opponent = game_service.player_x_game_board[game_service.players[0]]
		let listOfLocs = []
		for (let i = 0; i < opponent.length; i++) {
			for (let j = 0; j < opponent[0].length; j++) {
				if (opponent[i][j].render === GridCellState.Available) listOfLocs.push([i,j])
			}
		}
		
		if (this.difficulty === AID.Easy) {
			loc = listOfLocs[Math.floor(Math.random() * listOfLocs.length)]
			return loc
		}
		else if (this.difficulty === AID.Medium) {

		}
		else {
			for (let i = 0; i < opponent.length; i++) {
				for (let j = 0; j < opponent[0].length; j++) {
					if (opponent[i][j].render === GridCellState.Ship) {
						return [i,j]
					}
				}
			}
		}
	}
}

const theAI = new AI(AID.Easy)
export default theAI
