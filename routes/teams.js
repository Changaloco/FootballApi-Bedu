const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getTeam,
  getTeams,
  createTeam,
  editTeam,
  deleteTeam
} = require("../controllers/teams");


// GET /teams
// Get all teams
/**
 * @openapi
 * '/teams':
 *  get:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Teams
 *     summary: Get all teams
 *     description: Get all teams from database
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
 *                  id_team:
 *                    type: number
 *                  teamName:
 *                    type: string
 *                  teamAKA:
 *                    type: string
 *                  regionName:
 *                    type: string
 *                  country:
 *                    type: string
 *                  manager:
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
router.get("/", auth.isAdmin, getTeams);


// GET /teams/:id_team
// Get team by id
/**
 * @openapi
 * '/teams/{id_team}':
 *  get:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Teams
 *     summary: Get a team by id
 *     description: Get a team if exists in the database
 *     parameters:
 *        - name: id_team
 *          in: path
 *          description: Id of the team
 *          required: true
 *     responses:
 *       200:
 *         description: Success return a team
 *         content:
 *          application/json:
 *            schema:
 *               properties:
 *                  id_team:
 *                    type: number
 *                  teamName:
 *                    type: string
 *                  teamAKA:
 *                    type: string
 *                  regionName:
 *                    type: string
 *                  country:
 *                    type: string
 *                  manager:
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
router.get("/:id", auth.isAdmin, getTeam);

// POST /teams
/**
 * @openapi
 * '/teams':
 *  post:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Teams
 *     summary: Create a team
 *     description: Create a new team in the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - teamName
 *              - teamAKA
 *              - regionName
 *              - country
 *              - manager
 *            properties:
 *              teamName:
 *                type: string
 *                default: "Team Name"
 *              teamAKA:
 *                type: string
 *                default: 'Team AKA'
 *              regionName:
 *                type: string
 *                default: 'Region Name'
 *              country:
 *                type: string
 *                default: 'Moldova'
 *              manager:
 *                type: string
 *                default: 'Manager Name'
 *
 *     responses:
 *      201:
 *        description: Created team successfully
 *        content:
 *          application/json:
 *            schema:
 *               properties:
 *                  id_team:
 *                    type: number
 *                  teamName:
 *                    type: string
 *                  teamAKA:
 *                    type: string
 *                  regionName:
 *                    type: string
 *                  country:
 *                    type: string
 *                  manager:
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
router.post("/", auth.isAdmin, createTeam)


// PATCH /teams/:id_team
// Update team by id
/**
 * @openapi
 * '/teams/{id_team}':
 *  patch:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Teams
 *     summary: Update a team
 *     description: Update a team if exists by id from database
 *     parameters:
 *        - name: id_team
 *          in: path
 *          description: Id of the id_team
 *          required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - teamName
 *              - teamAKA
 *              - regionName
 *              - country
 *              - manager
 *            properties:
 *              teamName:
 *                type: string
 *                default: "Team Name"
 *              teamAKA:
 *                type: string
 *                default: 'Team AKA'
 *              regionName:
 *                type: string
 *                default: 'Region Name'
 *              country:
 *                type: string
 *                default: 'Moldova'
 *              manager:
 *                type: string
 *                default: 'Manager Name'
 *              
 *     responses:
 *      200:
 *        description: Updated match successfully
 *        content:
 *          application/json:
 *            schema:
 *               properties:
 *                  id_team:
 *                    type: number
 *                  teamName:
 *                    type: string
 *                  teamAKA:
 *                    type: string
 *                  regionName:
 *                    type: string
 *                  country:
 *                    type: string
 *                  manager:
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
router.patch("/:id", auth.isAdmin, editTeam)

// DELETE /teams/:id_team
// Delete team by id
/**
 * @openapi
 * '/teams/{id_team}':
 *  delete:
 *     security:
 *       - Authorization: []
 *     tags:
 *     - Teams
 *     summary: Delete a team by id
 *     description: Delete a team if exists by id from database
 *     parameters:
 *        - name: id_team
 *          in: path
 *          description: Id of the team
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
router.delete("/:id", auth.isAdmin, deleteTeam)

module.exports = router;
