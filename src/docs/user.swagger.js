/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users with filters and pagination
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Server error
 *   post:
 *     summary: Add a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Invalid Input
 *
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: unique identifier for the user
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: unique identifier for the user
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: unique identifier for the user
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 */