import game_service from './GameState.service.js'
import {AIDifficulty as AID} from '../module/util.js'

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
		if (this.difficulty === AID.Easy) {
			loc = [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)]
		}
		else if (this.difficulty === AID.Medium) {
		
		}
		else {
			opponent = game_service.player_x_game_board[Player.One]
			
		}
	}
}

const theAI = new AI()
export default theAI
