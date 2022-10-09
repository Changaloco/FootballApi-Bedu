const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getMatches,
  getMatch,
  createMatch,
  editMatches,
  deleteMatch,
  getMatchesByTournament,
  getMatchesByTeam
} = require("../controllers/matches");

// GET /matches
// Get all matches
/**
 * @openapi
 * '/matches':
 *  get:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Matches
 *     summary: Get all matches
 *     description: Get all matches from database
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
 *                  id_match:
 *                    type: number
 *                  winner:
 *                    type: string
 *                  homeGoals:
 *                    type: integer
 *                  awayGoals:
 *                    type: integer
 *                  matchDate:
 *                    type: date
 *                  id_tournament:
 *                    type: integer
 *                  id_away:
 *                    type: integer
 *                  id_home:
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
router.get("/", auth.isAdmin, getMatches);


// GET /matches/:id_match
// Get matches by id
/**
 * @openapi
 * '/matches/{id_match}':
 *  get:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Matches
 *     summary: Get a match by id
 *     description: Get a match if exists in the database
 *     parameters:
 *        - name: id_match
 *          in: path
 *          description: Id of the match
 *          required: true
 *     responses:
 *       200:
 *         description: Success return a match
 *         content:
 *          application/json:
 *            schema:
 *               properties:
 *                  id_match:
 *                    type: number
 *                  winner:
 *                    type: string
 *                  homeGoals:
 *                    type: integer
 *                  awayGoals:
 *                    type: integer
 *                  matchDate:
 *                    type: date
 *                  id_tournament:
 *                    type: integer
 *                  id_away:
 *                    type: integer
 *                  id_home:
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
router.get("/:id", auth.isAdmin, getMatch);

// POST /matches
/**
 * @openapi
 * '/matches':
 *  post:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Matches
 *     summary: Create a match
 *     description: Create a new match in the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - winner
 *              - homeGoals
 *              - awayGoals
 *              - matchDate
 *              - id_tournament
 *              - id_away
 *              - id_home
 *            properties:
 *              winner:
 *                type: string
 *                default: 'home'
 *              homeGoals:
 *                type: integer
 *                default: 3
 *              awayGoals:
 *                type: integer
 *                default: 1
 *              matchDate:
 *                type: date
 *                default: '2021-01-01'
 *              id_tournament:
 *                type: integer
 *                default: 1
 *              id_away:
 *                type: integer
 *                default: 1
 *              id_home:
 *                type: integer
 *                default: 2
 *
 *     responses:
 *      201:
 *        description: Created match successfully
 *        content:
 *          application/json:
 *            schema:
 *               properties:
 *                  id_match:
 *                    type: number
 *                  winner:
 *                    type: string
 *                  homeGoals:
 *                    type: integer
 *                  awayGoals:
 *                    type: integer
 *                  matchDate:
 *                    type: date
 *                  id_tournament:
 *                    type: integer
 *                  id_away:
 *                    type: integer
 *                  id_home:
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
router.post("/", auth.isAdmin, createMatch);


// PATCH /matches/:id_match
// Update match by id
/**
 * @openapi
 * '/matches/{id_match}':
 *  patch:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Matches
 *     summary: Update a match
 *     description: Update a match if exists by id from database
 *     parameters:
 *        - name: id_match
 *          in: path
 *          description: Id of the id_match
 *          required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - winner
 *              - homeGoals
 *              - awayGoals
 *              - matchDate
 *              - id_tournament
 *              - id_away
 *              - id_home
 *            properties:
 *              winner:
 *                type: string
 *                default: 'home'
 *              homeGoals:
 *                type: integer
 *                default: 3
 *              awayGoals:
 *                type: integer
 *                default: 1
 *              matchDate:
 *                type: date
 *                default: '2021-01-01'
 *              id_tournament:
 *                type: integer
 *                default: 1
 *              id_away:
 *                type: integer
 *                default: 1
 *              id_home:
 *                type: integer
 *                default: 2
 *              
 *     responses:
 *      200:
 *        description: Updated match successfully
 *        content:
 *          application/json:
 *            schema:
 *               properties:
 *                  id_match:
 *                    type: number
 *                  winner:
 *                    type: enum
 *                  homeGoals:
 *                    type: integer
 *                  awayGoals:
 *                    type: integer
 *                  matchDate:
 *                    type: date
 *                  id_tournament:
 *                    type: integer
 *                  id_away:
 *                    type: integer
 *                  id_home:
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
router.patch("/:id", auth.isAdmin, editMatches);

// DELETE /matches/:id_match
// Delete match by id
/**
 * @openapi
 * '/matches/{id_match}':
 *  delete:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Matches
 *     summary: Delete a match by id
 *     description: Delete a match if exists by id from database
 *     parameters:
 *        - name: id_match
 *          in: path
 *          description: Id of the match
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
router.delete("/:id", auth.isAdmin, deleteMatch);

// GET /matches/tournaments/:id_tournament
// Get matches by tournament id
/**
 * @openapi
 * '/matches/tournaments/{id_tournament}':
 *  get:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Matches
 *     summary: Get matches by tournament id
 *     description: Get matches by tournament id from database
 *     parameters:
 *        - name: id_tournament
 *          in: path
 *          description: Id of the tournament
 *          required: true
 *     responses:
 *       200:
 *         description: Success get matches
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id_match:
 *                    type: number
 *                  winner:
 *                    type: string
 *                  homeGoals:
 *                    type: integer
 *                  awayGoals:
 *                    type: integer
 *                  matchDate:
 *                    type: date
 *                  Tournament:
 *                    type: object
 *                    properties:
 *                     id_tournament:
 *                      type: number
 *                     tournamentName:
 *                      type: string
 *                     year:
 *                      type: integer
 *                     startDate:
 *                      type: date
 *                     endDate:
 *                      type: date
 *                     winner:
 *                      type: string
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
router.get("/tournaments/:id", auth.isAdmin, getMatchesByTournament);


// GET /matches/teams/:id_team
// Get matches by team id
/**
 * @openapi
 * '/matches/teams/{id_team}':
 *  get:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Matches
 *     summary: Get matches by team id
 *     description: Get matches by team id from database
 *     parameters:
 *        - name: id_team
 *          in: path
 *          description: Id of the team
 *          required: true
 *     responses:
 *       200:
 *         description: Success get matches
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id_match:
 *                    type: number
 *                  winner:
 *                    type: string
 *                  homeGoals:
 *                    type: integer
 *                  awayGoals:
 *                    type: integer
 *                  matchDate:
 *                    type: date
 *                  Tournament:
 *                    type: object
 *                    properties:
 *                     id_tournament:
 *                      type: number
 *                     tournamentName:
 *                      type: string
 *                     year:
 *                      type: integer
 *                     startDate:
 *                      type: date
 *                     endDate:
 *                      type: date
 *                     winner:
 *                      type: string
 *                     typeTournament:
 *                      type: string
 *                  home:
 *                    type: object
 *                    properties:
 *                     id_team:
 *                      type: number
 *                     teamName:
 *                      type: string
 *                     teamAKA:
 *                      type: string
 *                     regionName:
 *                      type: string
 *                     country:
 *                      type: string
 *                     away:
 *                      type: string
 * 
 *                  away:
 *                    type: object
 *                    properties:
 *                     id_team:
 *                      type: number
 *                     teamName:
 *                      type: string
 *                     teamAKA:
 *                      type: string
 *                     regionName:
 *                      type: string
 *                     country:
 *                      type: string
 *                     away:
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
router.get("/teams/:id", auth.isAdmin, getMatchesByTeam);
module.exports = router;
