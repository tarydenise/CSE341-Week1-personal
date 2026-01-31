const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contactsController');

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     responses:
 *       200:
 *         description: A list of contacts
 */
router.get('/', contactsController.getAll);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *        required: true
 *     responses:
 *       200:
 *         description: Contact found
 *      404:
 *       description: Contact not found
 */
router.get('/:id', contactsController.getSingle);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          required: [firstName, lastName, email, favoriteColor, birthday]
 *          properties:
 *           firstName: { type: string }
 *           lastName: { type: string }
 *           email: { type: string }
 *           favoriteColor: { type: string }
 *           birthday: { type: string }
 *     responses:
 *       201:
 *         description: Contact created
 */
router.post('/', contactsController.createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Contact updated
 */
router.put('/:id', contactsController.updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Contact deleted
 */
router.delete('/:id', contactsController.deleteContact);

module.exports = router;