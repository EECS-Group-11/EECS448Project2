import game_service from './GameState.service.js'
import {AIDifficulty as AID, GridCellState, isValidTargetCell} from '../module/util.js'


/**
 * AI service for playing against computer.
 */
class AI {

	/**
	 * It's the AI Difficulty
	 * @private
	 * @type {string}
	 */
	difficulty = AID.Easy

	/**
   * Generates locations for and places Boats
	 * @param {function} placement
	 */
	generateBoats(placement) {
		let xPlaceCoord = 0
		let yPlaceCoord = 0
		let placeShipType = ""
		for(let i = 0; i <= (game_service.get_n_boats()-1); i++){
			placeShipType = `1x${i+1}`
			attemptPlace: try {
				//choose orientation
				if(Math.random() > 0.5){
					//horizontal
					xPlaceCoord = (Math.floor(Math.random() * Math.floor(9 - i)))
					yPlaceCoord = (Math.floor(Math.random() * Math.floor(9)))
					game_service.place_ship(placeShipType, [yPlaceCoord, xPlaceCoord], [yPlaceCoord, xPlaceCoord+i])
				}
				else{
					//vertical
					xPlaceCoord = (Math.floor(Math.random() * Math.floor(9)))
					yPlaceCoord = (Math.floor(Math.random() * Math.floor(9 - i)))
					game_service.place_ship(placeShipType, [yPlaceCoord, xPlaceCoord], [yPlaceCoord+i, xPlaceCoord])
				}
				placement()
				break attemptPlace;
			} catch (e) {
				//retry placement of this ship
				i--
			}
		}

	}

	/**
	 * Generates coordinates for the AI to fire on based its difficulty
	 * return {number[]}
	 */
	fireLocation() {
		//get players board so we can see where their boats are
		const opponent = game_service.player_x_game_board[game_service.players[0]]
		let listOfLocs = []
		//generates list of nonboat spaces for use in Easy and Medium
		for (let i = 0; i < opponent.length; i++) {
			for (let j = 0; j < opponent[0].length; j++) {
				if (isValidTargetCell(opponent[i][j].render)) listOfLocs.push([i,j])
			}
		}

		if (this.difficulty === AID.Easy) {
			return listOfLocs[Math.floor(Math.random() * listOfLocs.length)]
		}
		else if (this.difficulty === AID.Medium) {
			for (let i = 0; i < opponent.length; i++) {
				for (let j = 0; j < opponent[0].length; j++) {
					if (opponent[i][j].render === GridCellState.Damaged) {
						if (i > 0 && isValidTargetCell(opponent[i - 1][j].render)) {
							return [i - 1, j]
						}
						else if (i < opponent.length - 1 && isValidTargetCell(opponent[i + 1][j].render)) {
							return [i + 1, j]
						}
						else if (j > 0 && isValidTargetCell(opponent[i][j - 1].render)) {
							return [i, j - 1]
						}
						else if (j < opponent[0].length - 1 && isValidTargetCell(opponent[i][j + 1].render)) {
							return [i, j + 1]
						}
					}
				}
			}
			return listOfLocs[Math.floor(Math.random() * listOfLocs.length)]
		}
		else {
			//fires at the first boat space it finds lmao
			for (let i = 0; i < opponent.length; i++) {
				for (let j = 0; j < opponent[0].length; j++) {
					if (opponent[i][j].render === GridCellState.Ship) {
						return [i,j]
					}
				}
			}
		}

	}

	/**
	 * Sets the difficulty for the AI
	 * @param {number} number difficulty 1-easy, 2-medium, 3-hard
	 */
	setDifficulty(number) {
		if (number === 1) {
			this.difficulty = AID.Easy;
		} else if (number === 2) {
			this.difficulty = AID.Medium;
		} else if (number === 3) {
			this.difficulty = AID.Hard;
		}
	}
}

const theAI = new AI()
export default theAI
