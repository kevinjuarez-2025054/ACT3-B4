import { FormulaRepository } from '../repositories/formula.respository';
import { Formula } from '../models/formula.model';

export class FormulaService {
  private repository = new FormulaRepository();

  getFormulas(): Formula[] {
    return this.repository.getAll();
  }

  calculate(id: string, vars: { [key: string]: number }): number {
    const formula = this.repository.getById(id);
    if (!formula) throw new Error('Fórmula no encontrada');

    switch (id) {
    case '1': return vars.base * vars.altura;
    case '2': return vars.tiempo === 0 ? 0 : vars.distancia / vars.tiempo;
    case '3': return vars.masa * vars.aceleracion;
    case '4': return Math.sqrt(Math.pow(vars.catetoA, 2) + Math.pow(vars.catetoB, 2));
    case '5': return vars.volumen === 0 ? 0 : vars.masa / vars.volumen;
    case '6': return 0.5 * vars.masa * Math.pow(vars.velocidad, 2);
    case '7': return vars.area === 0 ? 0 : vars.fuerza / vars.area;
    case '8': return vars.corriente * vars.resistencia;
    case '9': return 2 * Math.PI * vars.radio;
    case '10': return vars.fuerza * vars.distancia;
    default: throw new Error('Cálculo no implementado');
    }
  }
}
