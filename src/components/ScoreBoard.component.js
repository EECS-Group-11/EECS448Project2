import {Component} from '../../lib/vues6.js'
import game_service from '../services/GameState.service.js'
import {Player, GameState} from '../module/util.js'

const template = `
<div class="app-scoreboard-component">
    <table class="scoreboard_table" style="width:50%">
        <tr class="scoreboard_rows">
            <th class="scoreboard_table_header" colspan="4">scoreboard</th>            
        </tr>
        <tr class="scoreboard_header_playerScoreProgress">
            <td class="scoreboard_data">player</td>
            <td class="scoreboard_data">score</td>
            <td class="scoreboard_data">progress</td>
            <td class="scoreboard_data">remaining bombs</td>
        </tr>
        <tr class="scoreboard_rows_score&progress">
            <td class="scoreboard_player">{{ current_player === Player.One ? '➜' : '' }}player_1{{ winning_player === Player.One ? ' ★' : '' }}</td>
            <td class="scoreboard_data_value">{{player_one_score}}</td>
            <td class="scoreboard_data_value">{{player_one_progress * 100}}%</td>
            <td class="scoreboard_data_value">{{player_one_bombs}}</td>
        </tr>
        <tr class="scoreboard_lastRow">
            <td class="scoreboard_player">{{ current_player === Player.Two ? '➜' : '' }}player_2{{ winning_player === Player.Two ? ' ★' : '' }}</td>
            <td class="scoreboard_data_value">{{player_two_score}}</td>
            <td class="scoreboard_data_value">{{player_two_progress * 100}}%</td>
            <td class="scoreboard_data_value">{{player_two_bombs}}</td>
        </tr>
    </table>
</div>
`

/**
 * A component which represents the programmable scoreboard.
 * @extends Component
 */
class ScoreBoardComponent extends Component {
    static get selector() { return 'app-scoreboard' }
    static get template() { return template }
    static get props() { return [] }

    /**
     * The score of player one.
     * @type {number}
     */
    player_one_score = 0

    /**
     * The score of player two.
     * @type {number}
     */
    player_two_score = 0

    /**
     * The progress of player one, as a decimal.
     * @type {number}
     */
    player_one_progress = 0

    /**
     * The progress of player two, as a decimal.
     * @type {number}
     */
    player_two_progress = 0

    /**
     * The number of bombs for player 1.
     * @type {number}
     */
    player_one_bombs = 1

    /**
     * The number of bombs for player 2.
     * @type {number}
     */
    player_two_bombs = 1

    /**
     * The current player.
     * @type {string|undefined}
     */
    current_player = undefined

    /**
     * The winning player.
     * @type {string|undefined}
     */
    winning_player = undefined

    Player = Player

    /**
     * Called when the component is initialized.
     * @return {Promise<void>}
     */
    async vue_on_create() {
        game_service.on_state_change(() => {
            this.update()
        })

        this.update()
    }

    /**
     * Fetch new data from the game service.
     */
    update() {
        // here is where you should fetch the data from the game service and update variables on the class
        this.player_one_score = game_service.get_player_score(Player.One)
        this.player_two_score = game_service.get_player_score(Player.Two)
        this.player_one_progress = game_service.get_progress(Player.One)
        this.player_two_progress = game_service.get_progress(Player.Two)
        this.player_one_bombs = game_service.get_player1_bombs()
        this.player_two_bombs = game_service.get_player2_bombs()


        if ( game_service.get_game_state() !== GameState.PlayerVictory )
            this.current_player = game_service.get_current_player()
        else {
            this.current_player = undefined
            this.winning_player = game_service.get_current_player()
        }
    }
}

export default ScoreBoardComponent
