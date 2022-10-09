const router = require("express").Router();

const {
  createPlayer,
  getPlayers,
  getPlayerById,
  updatePlayerById,
  deletePlayerById,
} = require("../controllers/players");
const auth = require("../middlewares/auth");
/**
 * @openapi
 * '/players':
 *  post:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Players
 *     summary: Create a player
 *     description: Create a new player in the database
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
 *                default: 'Lionel'
 *              playerSurname:
 *                type: string
 *                default: 'Messi'
 *              birthDate:
 *                type: date
 *                default: '1987-06-24'
 *              position:
 *                type: string
 *                default: 'Forward'
 *
 *     responses:
 *      201:
 *        description: Created player successfully
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
 *                    type: date
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
router.post("/", auth.isAdmin, createPlayer);

// GET /players
// Get all players
/**
 * @openapi
 * '/players':
 *  get:
 *     security:
 *       - Authorization: []
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
 *                    type: date
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
router.get("/", auth.isAdmin, getPlayers);

// GET /players/:id_player
// Get player by id
/**
 * @openapi
 * '/players/{id_player}':
 *  get:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Players
 *     summary: Get a player by id
 *     description: Get a player if exists in the database
 *     parameters:
 *        - name: id_player
 *          in: path
 *          description: Id of the player
 *          required: true
 *     responses:
 *       200:
 *         description: Success return a player
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
 *                    type: date
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
router.get("/:id_player", auth.isAdmin, getPlayerById);

// PUT /players/:id_player
// Update player by id
/**
 * @openapi
 * '/players/{id_player}':
 *  put:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Players
 *     summary: Update a player
 *     description: Update a player if exists by id from database
 *     parameters:
 *        - name: id_player
 *          in: path
 *          description: Id of the id_player
 *          required: true
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
 *                default: 'Lionel'
 *              playerSurname:
 *                type: string
 *                default: 'Messi'
 *              birthDate:
 *                type: date
 *                default: '1987-06-24'
 *              position:
 *                type: string
 *                default: 'Forward'
 *              
 *     responses:
 *      200:
 *        description: Updated player successfully
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
 *                    type: date
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
 *      404:
 *        description: Not found
 *        content:
 *          application/json:
 *           schema:
 *              properties:
 *                 message:
 *                   type: string
 *                 error:
 *                  type: string
 */
router.put("/:id_player", auth.isAdmin, updatePlayerById);

// DELETE /players/:id_player
// Delete player by id
/**
 * @openapi
 * '/players/{id_player}':
 *  delete:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Players
 *     summary: Delete a player by id
 *     description: Delete a player if exists by id from database
 *     parameters:
 *        - name: id_player
 *          in: path
 *          description: Id of the player
 *          required: true
 *     responses:
 *       204:
 *         description: Success delete
 *
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
router.delete("/:id_player", auth.isAdmin, deletePlayerById);

module.exports = router;
