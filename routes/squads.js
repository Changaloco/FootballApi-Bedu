const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getSquads,
  getSquad,
  createSquad,
  editSquad,
  deleteSquad,
  getTeamSquad,
  getSquadTeamTournaments,
} = require("../controllers/squads");

// GET /squads
// Get all squads
/**
 * @openapi
 * '/squads':
 *  get:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Squads
 *     summary: Get all squads
 *     description: Get all squads from database
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
 *                  id_squad:
 *                    type: number
 *                  position:
 *                    type: string
 *                  number:
 *                    type: integer
 *                  id_team:
 *                    type: integer
 *                  id_player:
 *                    type: integer
 *                  id_tournament:
 *                    type: integer
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
router.get("/", auth.isAdmin, getSquads)

// GET /squads/:id_squad
// Get player by id
/**
 * @openapi
 * '/squads/{id_squad}':
 *  get:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Squads
 *     summary: Get a squads by id
 *     description: Get a squads if exists in the database
 *     parameters:
 *        - name: id_squad
 *          in: path
 *          description: Id of the squad
 *          required: true
 *     responses:
 *       200:
 *         description: Success return a squad
 *         content:
 *          application/json:
 *            schema:
 *               properties:
 *                  id_squad:
 *                    type: number
 *                  position:
 *                    type: string
 *                  number:
 *                    type: integer
 *                  id_team:
 *                    type: integer
 *                  id_player:
 *                    type: integer
 *                  id_tournament:
 *                    type: integer
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
router.get("/:id", auth.isAdmin, getSquad)


// POST /squads
/**
 * @openapi
 * '/squads':
 *  post:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Squads
 *     summary: Create a squad
 *     description: Create a new squad in the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - position
 *              - number
 *              - id_team
 *              - id_player
 *              - id_tournament
 *            properties:
 *              position:
 *                type: string
 *                default: "GK"
 *              number:
 *                type: integer
 *                default: 1
 *              id_team:
 *                type: integer
 *                default: 1
 *              id_player:
 *                type: integer
 *                default: 1
 *              id_tournament:
 *                type: integer
 *                default: 1
 *
 *     responses:
 *      201:
 *        description: Created squad successfully
 *        content:
 *          application/json:
 *            schema:
 *               properties:
 *                  id_squad:
 *                    type: number
 *                  position:
 *                    type: string
 *                  number:
 *                    type: integer
 *                  id_team:
 *                    type: integer
 *                  id_player:
 *                    type: integer
 *                  id_tournament:
 *                    type: integer
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
router.post("/", auth.isAdmin, createSquad)


// PATCH /squads/:id_squad
// Update player by id
/**
 * @openapi
 * '/squads/{id_squad}':
 *  patch:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Squads
 *     summary: Update a squad
 *     description: Update a squad if exists by id from database
 *     parameters:
 *        - name: id_squad
 *          in: path
 *          description: Id of the id_squad
 *          required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - position
 *              - number
 *              - id_team
 *              - id_player
 *              - id_tournament
 *            properties:
 *              position:
 *                type: string
 *                default: "GK"
 *              number:
 *                type: integer
 *                default: 1
 *              id_team:
 *                type: integer
 *                default: 1
 *              id_player:
 *                type: integer
 *                default: 1
 *              id_tournament:
 *                type: integer
 *                default: 1
 *              
 *     responses:
 *      200:
 *        description: Updated player successfully
 *        content:
 *          application/json:
 *            schema:
 *               properties:
 *                  id_squad:
 *                    type: number
 *                  position:
 *                    type: string
 *                  number:
 *                    type: integer
 *                  id_team:
 *                    type: integer
 *                  id_player:
 *                    type: integer
 *                  id_tournament:
 *                    type: integer
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
router.patch("/:id", auth.isAdmin, editSquad)



// DELETE /squads/:id_squad
// Delete squads by id
/**
 * @openapi
 * '/squads/{id_squad}':
 *  delete:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Squads
 *     summary: Delete a squad by id
 *     description: Delete a squad if exists by id from database
 *     parameters:
 *        - name: id_squad
 *          in: path
 *          description: Id of the squad
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
router.delete("/:id", auth.isAdmin, deleteSquad)


// GET /squads/team/:id_team
// Get squads by team id
/**
 * @openapi
 * '/squads/teams/{id_team}':
 *  get:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Squads
 *     summary: Get squads by team id
 *     description: Get squads by team id from database
 *     parameters:
 *        - name: id_team
 *          in: path
 *          description: Id of the team
 *          required: true
 *     responses:
 *       200:
 *         description: Success get squads
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id_squad:
 *                    type: number
 *                  position:
 *                    type: string
 *                  number:
 *                    type: integer
 *                  id_team:
 *                    type: integer
 *                  id_player:
 *                    type: integer
 *                  id_tournament:
 *                    type: integer
 *                  Player:
 *                    type: object
 *                    properties:
 *                     id_player:
 *                      type: number
 *                     playerName:
 *                      type: string
 *                     playerSurname:
 *                      type: string
 *                     birthDate:
 *                      type: date
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
router.get("/teams/:id", auth.isAdmin, getTeamSquad);

// GET /squads/teams/tournaments/:id
// Get squads by team id and tournament id
/**
 * @openapi
 * '/squads/teams/tournaments/{id_team}':
 *  get:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Squads
 *     summary: Get squads by team id and tournament id
 *     description: Get squads by team id and tournament from database
 *     parameters:
 *        - name: id_team
 *          in: path
 *          description: Id of the team
 *          required: true
 *     responses:
 *       200:
 *         description: Success get squads
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id_squad:
 *                    type: number
 *                  fk_team:
 *                    type: integer
 *                  Tournament:
 *                    type: object
 *                    properties:
 *                     id_tournament:
 *                      type: number
 *                     tournamentName:
 *                      type: string
 *                     year:
 *                      type: integer
 *                     typeTournament:
 *                      type: string
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
router.get("/teams/tournaments/:id", auth.isAdmin, getSquadTeamTournaments);
module.exports = router;
