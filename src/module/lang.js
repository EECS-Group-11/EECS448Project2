/** @module lang **/

import { GameState } from './util.js'

/**
 * Enum of all possible instructions.
 * @type {object}
 */
const instructions = {
  [GameState.ChoosingNumberOfShips]: 'Select the number of ships both players will play with.',
  [GameState.PlayerSetup]: 'Place your ships on your fleet\'s grid. You can hold the shift key to change the orientation.',
  [GameState.PlayerTurn]: 'Select a cell on the opposing fleet\'s grid to fire a missile or press space bar to fire a bomb. You can hold the shift key to fire bombs horizontally.',
  [GameState.PlayerVictory]: '{player} won!'
}

export { instructions }
