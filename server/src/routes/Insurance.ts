import express from 'express';
import controller from '../controllers/Insurance';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.get('/', controller.getAllInsurances);
router.put('/:insuranceId?', ValidateJoi(Schemas.insurance.upsert), controller.upsertInsurance);
router.delete('/:insuranceId', controller.deleteInsurance);

export = router;
