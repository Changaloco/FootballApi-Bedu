const router = require("express").Router();

const {
  createTournament,
  getTournaments,
  getTournamentById,
  updateTournamentById,
  deleteTournamentById,
} = require("../controllers/tournaments");
const auth = require("../middlewares/auth");

/**
 * @openapi
 * '/tournaments':
 *  post:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Tournaments
 *     summary: Create a tournament
 *     description: Create a new tournament in the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - tournamentName
 *              - year
 *              - startDate
 *              - endDate
 *              - winner
 *              - typeTournament
 *            properties:
 *              tournamentName:
 *                type: string
 *                default: 'Champions League'
 *              year:
 *                type: integer
 *                default: 2020
 *              startDate:
 *                type: date
 *                default: '2020-09-01'
 *              endDate:
 *                type: date
 *                default: '2020-12-01'
 *              winner:
 *                type: string
 *                default: 'Real Madrid'
 *              typeTournament:
 *                type: string
 *                default: 'International'
 *
 *     responses:
 *      201:
 *        description: Created tournament successfully
 *        content:
 *          application/json:
 *            schema:
 *               properties:
 *                  id_tournament:
 *                    type: number
 *                  tournamentName:
 *                    type: string
 *                  year:
 *                    type: integer
 *                  startDate:
 *                    type: date
 *                  endDate:
 *                    type: date
 *                  winner:
 *                    type: string
 *                  typeTournament:
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
router.post("/", auth.isAdmin, createTournament);

// GET /tournaments
// Get all tournaments
/**
 * @openapi
 * '/tournaments':
 *  get:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Tournaments
 *     summary: Get all tournaments
 *     description: Get all tournaments from database
 *     responses:
 *       200:
 *         description: Success return all tournaments
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id_tournament:
 *                    type: number
 *                  tournamentName:
 *                    type: string
 *                  year:
 *                    type: integer
 *                  startDate:
 *                    type: date
 *                  endDate:
 *                    type: date
 *                  winner:
 *                    type: string
 *                  typeTournament:
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
router.get("/", getTournaments);

// GET /tournaments/:id_tournament
// Get a tournament by id
/**
 * @openapi
 * '/tournaments/{id_tournament}':
 *  get:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Tournaments
 *     summary: Get a tournament by id
 *     description: Get a tournament by id
 *     parameters:
 *        - name: id_tournament
 *          in: path
 *          description: Id of the tournament
 *          required: true
 *     responses:
 *       200:
 *         description: Success return a tournament
 *         content:
 *          application/json:
 *            schema:
 *               properties:
 *                  id_tournament:
 *                    type: number
 *                  tournamentName:
 *                    type: string
 *                  year:
 *                    type: integer
 *                  startDate:
 *                    type: date
 *                  endDate:
 *                    type: date
 *                  winner:
 *                    type: string
 *                  typeTournament:
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
router.get("/:id_tournament", getTournamentById);

// PUT /tournaments/:id_tournament
// Update a tournament by id
/**
 * @openapi
 * '/tournaments/{id_tournament}':
 *  put:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Tournaments
 *     summary: Update a tournament
 *     description: Update a tournament if exists by id from database
 *     parameters:
 *        - name: id_tournament
 *          in: path
 *          description: Id of the tournament
 *          required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - tournamentName
 *              - year
 *              - startDate
 *              - endDate
 *              - winner
 *              - typeTournament
 *            properties:
 *              tournamentName:
 *                type: string
 *                default: 'Champions League'
 *              year:
 *                type: integer
 *                default: 2020
 *              startDate:
 *                type: date
 *                default: '2020-09-01'
 *              endDate:
 *                type: date
 *                default: '2020-12-01'
 *              winner:
 *                type: string
 *                default: 'Real Madrid'
 *              typeTournament:
 *                type: string
 *                default: 'International'
 *
 *     responses:
 *      200:
 *        description: Updated tournament successfully
 *        content:
 *          application/json:
 *            schema:
 *               properties:
 *                  id_tournament:
 *                    type: number
 *                  tournamentName:
 *                    type: string
 *                  year:
 *                    type: integer
 *                  startDate:
 *                    type: date
 *                  endDate:
 *                    type: date
 *                  winner:
 *                    type: string
 *                  typeTournament:
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
router.put("/:id_tournament", auth.isAdmin, updateTournamentById);

// DELETE /tournaments/:id_tournament
// Delete a tournament by id
/**
 * @openapi
 * '/tournaments/{id_tournament}':
 *  delete:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Tournaments
 *     summary: Delete a tournament by id
 *     description: Delete a tournament if exists by id from database
 *     parameters:
 *        - name: id_tournament
 *          in: path
 *          description: Id of the tournament
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
router.delete("/:id_tournament", auth.isAdmin, deleteTournamentById);

module.exports = router;
