const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getSquads,
  getSquad,
  createSquad,
  editSquad,
  deleteSquad,
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
 *                    type: int
 *                  fk_team:
 *                    type: int
 *                  fk_player:
 *                    type: int
 *                  fk_tournament:
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
 *                    type: int
 *                  fk_team:
 *                    type: int
 *                  fk_player:
 *                    type: int
 *                  fk_tournament:
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
 *              - fk_team
 *              - fk_player
 *              - fk_tournament
 *            properties:
 *              position:
 *                type: enum
 *                default: "GK"
 *              number:
 *                type: int
 *                default: 1
 *              fk_team:
 *                type: int
 *                default: 1
 *              fk_player:
 *                type: int
 *                default: 1
 *              fk_tournament:
 *                type: int
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
 *                    type: enum
 *                  number:
 *                    type: int
 *                  fk_team:
 *                    type: int
 *                  fk_player:
 *                    type: int
 *                  fk_tournament:
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
 *              - fk_team
 *              - fk_player
 *              - fk_tournament
 *            properties:
 *              position:
 *                type: enum
 *                default: "GK"
 *              number:
 *                type: int
 *                default: 1
 *              fk_team:
 *                type: int
 *                default: 1
 *              fk_player:
 *                type: int
 *                default: 1
 *              fk_tournament:
 *                type: int
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
 *                    type: enum
 *                  number:
 *                    type: int
 *                  fk_team:
 *                    type: int
 *                  fk_player:
 *                    type: int
 *                  fk_tournament:
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

module.exports = router;
