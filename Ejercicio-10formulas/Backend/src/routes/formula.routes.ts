import { Router } from 'express';
import { FormulaController } from '../controller/formula.controller';

const router = Router();
const controller = new FormulaController();

router.get('/api/formulas', controller.getFormulas);
router.post('/api/formulas/:id/calculate', controller.calculateResult);

export default router;
