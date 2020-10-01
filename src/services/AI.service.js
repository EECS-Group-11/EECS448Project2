import game_service from './GameState.service.js'
import {AIDifficulty as AID, GridCellState} from '../module/util.js'


class AI {

	difficulty = AID.Easy

	constructor() {
	}

	//rng based game board setup function
	generateBoats(placement) {
		console.log("generate boats")
		let xPlaceCoord = 0
		let yPlaceCoord = 0
		let placeShipType = ""
		const opponent = game_service.player_x_game_board[game_service.players[0]]
		for(let i = 0; i <= (game_service.get_n_boats()-1); i++){
			//Works for 1x1 but has weird errors on anything more, need number of ships, 
			//need to figure out 'render' error, doesn't move on after more than one placed might be onShipPlaced in toplevel
			placeShipType = `1x${i+1}`
			console.log("placing ship" + placeShipType)
			attemptPlace: try {
				xPlaceCoord = (Math.floor(Math.random() * Math.floor(9)))+1
				yPlaceCoord = (Math.floor(Math.random() * Math.floor(9)))+1
				if(Math.random() == 0){
					game_service.place_ship(placeShipType, [yPlaceCoord, xPlaceCoord], [yPlaceCoord, xPlaceCoord+i])
				}
				else{
					game_service.place_ship(placeShipType, [yPlaceCoord, xPlaceCoord], [yPlaceCoord+i, xPlaceCoord])
				}
				break attemptPlace;
			} catch (e) {
				console.log(e)
			}
			console.log("ship " + (i+1) + " placed")
			placement()
		}
		
	}

	//guess logic function, returns coordinates? I think
	fireLocation() {
		//get players board so we can see where their boats are
		const opponent = game_service.player_x_game_board[game_service.players[0]]
		let listOfLocs = []
		//generates list of nonboat spaces for use in Easy and Medium
		for (let i = 0; i < opponent.length; i++) {
			for (let j = 0; j < opponent[0].length; j++) {
				if ([GridCellState.Available, GridCellState.Ship].includes(opponent[i][j].render)) listOfLocs.push([i,j])
			}
		}

		if (this.difficulty === AID.Easy) {
			return listOfLocs[Math.floor(Math.random() * listOfLocs.length)]
		}
		else if (this.difficulty === AID.Medium) {
			for (let i = 0; i < opponent.length; i++) {
				for (let j = 0; j < opponent[0].length; j++) {
					if (opponent[i][j].render === GridCellState.Damaged) {
						if (i > 0 && [GridCellState.Available, GridCellState.Ship].includes(opponent[i - 1][j].render)) {
							return [i - 1, j]
						}
						else if (i < opponent.length - 1 && [GridCellState.Available, GridCellState.Ship].includes(opponent[i + 1][j].render)) {
							return [i + 1, j]
						}
						else if (j > 0 && [GridCellState.Available, GridCellState.Ship].includes(opponent[i][j - 1].render)) {
							return [i, j - 1]
						}
						else if (j < opponent[0].length - 1 && [GridCellState.Available, GridCellState.Ship].includes(opponent[i][j + 1].render)) {
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
}

const theAI = new AI()
export default theAI
