const router = require('express').Router();

const { createPlayer, getPlayers, getPlayersByPosition} = require('../controllers/players')

/**
 * @openapi
 * '/players':
 *  post:
 *     tags:
 *     - Players
 *     summary: Create a player
 *     description: Create a player
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - playerName
 *              - playerSurname
 *              - birthDate
 *              - position
 *            properties:
 *              playerName:
 *                type: string
 *                default: Lionel
 *              playerSurname:
 *                type: string
 *                default: Messi
 *              birthDate:
 *                type: string
 *                default: 1987-06-24
 *              position:
 *                type: string
 *                default: Forward
 *     responses:
 *      201:
 *        description: Created player
 *        content:
 *          application/json:
 *            schema:
 *               properties:
 *                  id_player:
 *                    type: number
 *                  playerName:
 *                    type: string
 *                  playerSurname:
 *                    type: string
 *                  birthDate:
 *                    type: string
 *                  position:
 *                    type: string
 * 
 *      409:
 *        description: Conflict
 *        content:
 *          application/json:
 *           schema:
 *              properties:
 *                 message:
 *                   type: string
 *                 error:
 *                  type: string
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *           schema:
 *              properties:
 *                 message:
 *                   type: string
 *                 error:
 *                  type: string
 */
router.post('/', createPlayer)


// GET /players
// Get all players
/**
 * @openapi
 * '/players':
 *  get:
 *     tags:
 *     - Players
 *     summary: Get all players
 *     description: Get all players from database
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id_player:
 *                    type: number
 *                  playerName:
 *                    type: string
 *                  playerSurname:
 *                    type: string
 *                  birthDate:
 *                    type: string
 *                  position:
 *                    type: string
 *       400:
 *         description: Bad request
 *         content:
 *          application/json:
 *           schema:
 *              properties:
 *                 message:
 *                  type: string
 * 
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *              properties:
 *                 message:
 *                  type: string
 */
router.get('/', getPlayers)

// GET /players/:position
// Get all players by position
/**
 * @openapi
 * '/players/{position}':
 *  get:
 *     tags:
 *     - Players
 *     summary: Get all players with the same position
 *     description: Get all players with the same position from database
 *     parameters:
 *        - name: position
 *          in: params
 *          description: Position of the player
 *          required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *               properties:
 *                  id_player:
 *                    type: number
 *                  playerName:
 *                    type: string
 *                  playerSurname:
 *                    type: string
 *                  birthDate:
 *                    type: string
 *                  position:
 *                    type: string
 *       404:
 *         description: Not found
 *         content:
 *          application/json:
 *           schema:
 *              properties:
 *                 message:
 *                  type: string
 * 
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *              properties:
 *                 message:
 *                  type: string
 */
router.get('/', getPlayersByPosition)

module.exports = router;