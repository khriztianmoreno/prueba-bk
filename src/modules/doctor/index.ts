import { Router } from 'express';

import {
  createDoctorHandler,
  deleteDoctorHandler,
  getDoctorHandler,
  listDoctorHandler,
  updateDoctorHandler,
} from './doctor.controller';
import { isAuthenticated } from '../auth/auth.services';

const router = Router();

/**
 * @openapi
 * /api/Doctors:
 *  get:
 *    tags:
 *    - Doctors
 *    summary: Get all Doctors
 *    description: Get all Doctors from the database
 *    security:
 *    - ApiKeyAuth: []
 *    responses:
 *      200:
 *        description: Get all Doctors
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ListDoctorsResponse'
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server error
 */
router.get('/', isAuthenticated, listDoctorHandler);
router.delete('/:id', isAuthenticated, deleteDoctorHandler);

/**
 * @openapi
 * /api/Doctors/{id}:
 *  get:
 *    tags:
 *    - Doctors
 *    summary: Get Doctor
 *    description: Get Doctor from the database
 *    security:
 *    - ApiKeyAuth: []
 *    responses:
 *      200:
 *        description: Get Doctor
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ListDoctorResponse'
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server error
 */
router.get('/:id', isAuthenticated, getDoctorHandler);
router.patch('/:id', isAuthenticated, updateDoctorHandler);

/**
 * @openapi
 * /api/Doctors:
 *  post:
 *    tags:
 *    - Doctors
 *    summary: Create Doctor
 *    security:
 *    - ApiKeyAuth: []
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDoctorRequest'
 *    responses:
 *      200:
 *        description: Create Doctor
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateDoctorResponse'
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server error
 */
router.post('/', createDoctorHandler);

export default router;
