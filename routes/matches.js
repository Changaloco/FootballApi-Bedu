const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getMatches,
  getMatch,
  createMatch,
  editMatches,
  deleteMatch,
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
 *                    type: enum
 *                  homeGoals:
 *                    type: int
 *                  awayGoals:
 *                    type: int
 *                  matchDate:
 *                    type: date
 *                  fk_tournament:
 *                    type: int
 *                  fk_away:
 *                    type: int
 *                  fk_home:
 *                    type: int
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
 *                    type: enum
 *                  homeGoals:
 *                    type: int
 *                  awayGoals:
 *                    type: int
 *                  matchDate:
 *                    type: date
 *                  fk_tournament:
 *                    type: int
 *                  fk_away:
 *                    type: int
 *                  fk_home:
 *                    type: int
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
 *              - fk_tournament
 *              - fk_away
 *              - fk_home
 *            properties:
 *              winner:
 *                type: enum
 *                default: 'home'
 *              homeGoals:
 *                type: int
 *                default: 3
 *              awayGoals:
 *                type: int
 *                default: 1
 *              matchDate:
 *                type: date
 *                default: '2021-01-01'
 *              fk_tournament:
 *                type: int
 *                default: 1
 *              fk_away:
 *                type: int
 *                default: 1
 *              fk_home:
 *                type: int
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
 *                    type: enum
 *                  homeGoals:
 *                    type: int
 *                  awayGoals:
 *                    type: int
 *                  matchDate:
 *                    type: date
 *                  fk_tournament:
 *                    type: int
 *                  fk_away:
 *                    type: int
 *                  fk_home:
 *                    type: int
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
 *              - fk_tournament
 *              - fk_away
 *              - fk_home
 *            properties:
 *              winner:
 *                type: enum
 *                default: 'home'
 *              homeGoals:
 *                type: int
 *                default: 3
 *              awayGoals:
 *                type: int
 *                default: 1
 *              matchDate:
 *                type: date
 *                default: '2021-01-01'
 *              fk_tournament:
 *                type: int
 *                default: 1
 *              fk_away:
 *                type: int
 *                default: 1
 *              fk_home:
 *                type: int
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
 *                    type: int
 *                  awayGoals:
 *                    type: int
 *                  matchDate:
 *                    type: date
 *                  fk_tournament:
 *                    type: int
 *                  fk_away:
 *                    type: int
 *                  fk_home:
 *                    type: int
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

module.exports = router;
