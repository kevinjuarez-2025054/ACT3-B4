import { Request, Response } from 'express';
import { FormulaService } from '../services/formula.service';

export class FormulaController {
  private service = new FormulaService();

  getFormulas = (_req: Request, res: Response): void => {
    res.json(this.service.getFormulas());
  };

  calculateResult = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const { variables } = req.body;
      const formulaId = Array.isArray(id) ? id[0] : (id as string);
      
      const result = this.service.calculate(formulaId, variables);
      res.json({ result });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
