import { Router } from 'express';

import {
  createHospitalHandler,
  deleteHospitalHandler,
  getHospitalHandler,
  listHospitalHandler,
  updateHospitalHandler,
} from './hospital.controller';
import { isAuthenticated } from '../auth/auth.services';

const router = Router();

/**
 * @openapi
 * /api/Hospitals:
 *  get:
 *    tags:
 *    - Hospitals
 *    summary: Get all Hospitals
 *    description: Get all Hospitals from the database
 *    security:
 *    - ApiKeyAuth: []
 *    responses:
 *      200:
 *        description: Get all Hospitals
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ListHospitalsResponse'
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server error
 */
router.get('/', isAuthenticated, listHospitalHandler);
router.delete('/:id', isAuthenticated, deleteHospitalHandler);

/**
 * @openapi
 * /api/Hospitals/{id}:
 *  get:
 *    tags:
 *    - Hospitals
 *    summary: Get Hospital
 *    description: Get Hospital from the database
 *    security:
 *    - ApiKeyAuth: []
 *    responses:
 *      200:
 *        description: Get Hospital
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ListHospitalResponse'
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server error
 */
router.get('/:id', isAuthenticated, getHospitalHandler);
router.patch('/:id', isAuthenticated, updateHospitalHandler);

/**
 * @openapi
 * /api/Hospitals:
 *  post:
 *    tags:
 *    - Hospitals
 *    summary: Create Hospital
 *    security:
 *    - ApiKeyAuth: []
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateHospitalRequest'
 *    responses:
 *      200:
 *        description: Create Hospital
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateHospitalResponse'
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server error
 */
router.post('/', createHospitalHandler);

export default router;
