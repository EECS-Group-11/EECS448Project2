import {Component} from '../../lib/vues6.js'
import {GameState, ShipType} from '../module/util.js'
import {instructions} from '../module/lang.js'
import game_service from '../services/GameState.service.js'
import {GameSounds} from '../module/sounds.js'

//creating a button to test ai functionality
import theAI from '../services/AI.service.js'

const template = `
<div class="top-level-container">
	<div class="top-level-component">
		<!-- Choose the game mode -->
		<div v-if="current_state === GameState.ChoosingGameMode" class="game-choose-ships-container">
			<span v-if="instructions"><h1 class="instructions">{{ instructions }}</h1></span>
			<div class="btn_container">
                <div class="buttonTest" id="buttonOption2">
                    <button @click="game_mode(1)" id="dub-arrow"><img src="https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true" alt="" />
                    </button>
                    <a href="#">PVP</a>
                </div>
                <div class="buttonTest" id="buttonOption2">
                    <button @click="game_mode(2)" id="dub-arrow"><img src="https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true" alt="" />
                    </button>
                    <a href="#">PVE</a>
                </div>
            </div>
		</div>
		<div v-if="current_state === GameState.ChoosingAIDifficulty" class="game-choose-ships-container">
			<span v-if="instructions"><h1 class="instructions">{{ instructions }}</h1></span>
			<div class="btn_container">
                <div class="buttonTest" id="buttonOption2">
                    <button @click="difficulty(1)" id="dub-arrow"><img src="https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true" alt="" />
                    </button>
                    <a href="#">easv</a>
                </div>
                <div class="buttonTest" id="buttonOption2">
                    <button @click="difficulty(2)" id="dub-arrow"><img src="https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true" alt="" />
                    </button>
                    <a href="#">medium</a>
				</div>
				<div class="buttonTest" id="buttonOption2">
                    <button @click="difficulty(3)" id="dub-arrow"><img src="https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true" alt="" />
                    </button>
                    <a href="#">hard</a>
                </div>
            </div>
		</div>
		<!-- Select AI difficulty -->
        <div v-if="current_state === GameState.ChoosingNumberOfShips" class="game-choose-ships-container">
            <span v-if="instructions"><h1 class="instructions">{{ instructions }}</h1></span>
            <div class="btn_container">
<!--                <button @click="ship(1)" class="btn btn1">1 ship</button>
                <button @click="ship(2)" class="btn btn2">2 ships</button>
                <button @click="ship(3)" class="btn btn3">3 ships</button>
                <button @click="ship(4)" class="btn btn4">4 ships</button>
                <button @click="ship(5)" class="buttonTest">5 ships</button>-->
                <div class="buttonTest" id="buttonOption2">
                    <button @click="ship(1)" id="dub-arrow"><img src="https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true" alt="" />
                    </button>
                    <a href="#"> 1 ship</a>
                </div>
                <div class="buttonTest" id="buttonOption2">
                    <button @click="ship(2)" id="dub-arrow"><img src="https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true" alt="" />
                    </button>
                    <a href="#"> 2 ships</a>
                </div>
                <div class="buttonTest" id="buttonOption2">
                    <button @click="ship(3)" id="dub-arrow"><img src="https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true" alt="" />
                    </button>
                    <a href="#"> 3 ships</a>
                </div>
                <div class="buttonTest" id="buttonOption2">
                    <button @click="ship(4)" id="dub-arrow"><img src="https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true" alt="" />
                    </button>
                    <a href="#"> 4 ships</a>
                </div>
                <div class="buttonTest" id="buttonOption2">
                    <button @click="ship(5)" id="dub-arrow"><img src="https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true" alt="" />
                    </button>
                    <a href="#"> 5 ships</a>
                </div>
            </div>
        </div>
        <div v-if="current_state === GameState.PromptPlayerChange" class="game-player-change-container">
            it is now {{ current_player_display }}'s turn!
<!--            <button @click="confirm_player_change" class="playerBtn">continue</button>-->
            <div class="buttonTest" id="buttonOption2">
                    <button @click="confirm_player_change" id="dub-arrow"><img src="https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true" alt="" />
                    </button>
                    <a href="#">continue</a>
            </div>
        </div>
        <div
			v-if="current_state !== GameState.ChoosingNumberOfShips && current_state !== GameState.PromptPlayerChange 
			&& current_state !== GameState.ChoosingGameMode
			&& current_state !== GameState.ChoosingAIDifficulty && instructions"
            class="instructions"
        >
            {{ instructions.replace('{player}', current_player_display) }}
        </div>
        <div
            v-if="current_state !== GameState.ChoosingNumberOfShips
                    && current_state !== GameState.PromptPlayerChange
					&& current_state !== GameState.PlayerVictory
					&& current_state !== GameState.ChoosingGameMode
					&& current_state !== GameState.ChoosingAIDifficulty"
            class="game-boards-container"
        >
            <!-- Opponent's board -->
            <div class="game-board">
                <app-game-board
                    v-bind:rows="opponent_rows"
                    v-bind:is_missile_mode="player_is_firing_missiles"
                    @missilefired="on_missile_fired"
                ></app-game-board>
                <div class="fleet-label">Opposing fleet</div>
            </div>
    
            <!-- Player's board -->
            <div class="game-board">
                <app-game-board
                    v-bind:rows="player_rows"
                    v-bind:is_placement_mode="player_is_placing_ships"
                    v-bind:ships_to_place="ships_to_place"
                    @shipplaced="on_ship_placed"
                ></app-game-board>
                <div class="fleet-label">Your fleet</div>
            </div>
            <div class="scoreboard-container">
            <app-scoreboard></app-scoreboard>
        </div>
        </div>
        <div
            v-if="current_state === GameState.PlayerVictory"
            class="game-boards-container"
        >
            <!-- Winner's board -->
            <div class="game-board">
                <app-game-board
                    v-bind:rows="player_rows"
                ></app-game-board>
                <div class="fleet-label">{{ current_player_display }}'s fleet (winner)</div>
            </div>
    
            <!-- Loser's board -->
            <div class="game-board">
                <app-game-board
                    v-bind:rows="opponent_rows"
                ></app-game-board>
                <div class="fleet-label">{{ current_opponent_display }}'s fleet</div>
            </div>
        </div>
    </div>

</div>
`

/**
 * Top-level component which manages the display of the entire game.
 * @extends Component
 */
class TopLevelComponent extends Component {
    static get selector() { return 'app-top-level' }
    static get template() { return template }
    static get props() { return [] }

    ai = theAI

    /**
     * Make the game state accessible w/in the template.
     * @type {object}
     */
    GameState = GameState

    /**
     * The current game state.
     * @type {GameState|undefined}
     */
    current_state = undefined

    /**
     * The opponent's grid data.
     * @type {object[][]}
     */
    opponent_rows = []

    /**
     * The player's grid data.
     * @type {object[][]}
     */
    player_rows = []

    /**
     * The current instructions to be shown to the user.
     * @type {string}
     */
	// instructions = instructions[GameState.ChoosingNumberOfShips]
	instructions = instructions[GameState.ChoosingGameMode]

    /**
     * True if the player should be able to place their ships.
     * @type {boolean}
     */
    player_is_placing_ships = false

    /**
     * True if the player should be able to fire missiles at their opponent.
     * @type {boolean}
     */
    player_is_firing_missiles = false

    /**
     * True if there is a missile fire in progressm
     * @type {boolean}
     */
    fire_in_progress = false

    /**
     * If in placement mode, the ships that are yet to be placed.
     * @type {ShipType[]}
     */
    ships_to_place = []

    /**
     * The display name of the current player.
     * @type {string}
     */
    current_player_display = ''

    /**
     * The display name of the current opponent.
     * @type {string}
     */
    current_opponent_display = ''

    /**
     * Called when the component is initialized.
     * @return {Promise<void>}
     */
    async vue_on_create() {
        this.current_state = game_service.get_game_state()
        game_service.confirm_player_change = this.confirm_player_change
        // Called every time the game state is updated
        game_service.on_state_change( async (next_state, was_refresh) => {
            this.current_state = next_state
            this.opponent_rows = game_service.get_current_opponent_state()
            this.player_rows = game_service.get_current_player_state()
            this.current_player_display = game_service.get_player_display(game_service.get_current_player())
            this.current_opponent_display = game_service.get_player_display(game_service.get_current_opponent())

            this.player_is_placing_ships = next_state === GameState.PlayerSetup
            this.player_is_firing_missiles = next_state === GameState.PlayerTurn
            if ( !was_refresh && this.player_is_placing_ships ) {
                this.ships_to_place = game_service.get_possible_boats()
            }

            if ( next_state === GameState.PlayerVictory ) {
                await GameSounds.Victory.play()
                const [victor_state, loser_state] = game_service.get_player_victory_state()
                this.player_rows = victor_state
                this.opponent_rows = loser_state
            }

            this.instructions = instructions[this.current_state]
        })
    }

	/**
	 * set AI difficulty.
	 * @param {number} n
	 */
	difficulty(n){
		game_service.set_ai_difficulty(n);
		this.on_state_change();
	}

	/**
	 * Select game mode.
	 * @param {number} n
	 */
	async game_mode(n){
		game_service.set_game_mode(n);
		this.on_state_change();
	}

    /**
     * Set the number of boats.
     * @param {number} n
     */
    ship(n) {
        game_service.set_n_boats(n)
        game_service.advance_game_state()
    }

    /**
     * Called when the current user has placed a ship.
     */
	on_ship_placed() {
		this.ships_to_place.shift()
		if (this.ships_to_place.length < 1) {
            // We've placed all the ships. Let's move on.
            game_service.advance_game_state()
        }
    }

    /**
     * Called when the player attempts to fire a missile.
     * @param {number} row_index
     * @param {number} column_index
     */
    async on_missile_fired([row_index, column_index]) {
		if (this.player_is_firing_missiles && !this.fire_in_progress) {
            this.player_is_firing_missiles = false
            this.fire_in_progress = true

            this.$nextTick(async () => {
                await GameSounds.Fire.play()
				let success;
                try {
                  success = game_service.attempt_missile_fire([row_index, column_index])
                } catch (e) {
                  await GameSounds.Miss.play()
                  this.fire_in_progress = false
                  this.player_is_firing_missiles = true
                  return;
                }
				if (success) await GameSounds.Hit.play()
                else await GameSounds.Miss.play()

                game_service.advance_game_state()
                this.fire_in_progress = false
            })
        }
    }

    /**
     * Called when the player has confirmed the player change.
     */
    confirm_player_change() {
      if (!game_service.has_ai) {
        game_service.advance_game_state()
    }
      else {
        if (game_service.get_current_player() === game_service.players[1]) {
          if (this.player_is_placing_ships) {
            this.ships_to_place = game_service.get_possible_boats();
            this.ai.generateBoats(this.on_ship_placed);
          }
          else if (this.player_is_firing_missiles) {
            this.fire_in_progress = false;
            this.on_missile_fired(this.ai.fireLocation())
          }
        }
      }
    }
}

export default TopLevelComponent
