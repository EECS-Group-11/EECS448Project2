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
		if (difficulty === AID.Easy) {
		
		}
		else if (difficulty === AID.Medium) {
		
		}
		else {
		
		}
	}
}

const theAI = new AI()
export default theAI
