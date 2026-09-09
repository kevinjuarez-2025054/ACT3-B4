import { Formula } from '../models/formula.model';

export class FormulaRepository {
  private formulas: Formula[] = [
    { id: '1', name: 'Área del Rectángulo', description: 'Base por altura', variables: ['base', 'altura'], equation: 'A = b * h' },
    { id: '2', name: 'Velocidad Media', description: 'Distancia entre tiempo', variables: ['distancia', 'tiempo'], equation: 'v = d / t' },
    { id: '3', name: 'Fuerza (2da Ley Newton)', description: 'Masa por aceleración', variables: ['masa', 'aceleracion'], equation: 'F = m * a' },
    { id: '4', name: 'Teorema de Pitágoras (Hipotenusa)', description: 'Raíz de la suma de catetos al cuadrado', variables: ['catetoA', 'catetoB'], equation: 'c = √(a² + b²)' },
    { id: '5', name: 'Densidad', description: 'Masa entre volumen', variables: ['masa', 'volumen'], equation: 'ρ = m / V' },
    { id: '6', name: 'Energía Cinética', description: 'Un medio de la masa por velocidad al cuadrado', variables: ['masa', 'velocidad'], equation: 'Ec = 0.5 * m * v²' },
    { id: '7', name: 'Presión', description: 'Fuerza sobre área', variables: ['fuerza', 'area'], equation: 'P = F / A' },
    { id: '8', name: 'Ley de Ohm (Voltaje)', description: 'Corriente por resistencia', variables: ['corriente', 'resistencia'], equation: 'V = I * R' },
    { id: '9', name: 'Perímetro del Círculo', description: 'Dos por pi por radio', variables: ['radio'], equation: 'P = 2 * π * r' },
    { id: '10', name: 'Trabajo Mecánico', description: 'Fuerza por distancia', variables: ['fuerza', 'distancia'], equation: 'W = F * d' }
  ];

  getAll(): Formula[] {
    return this.formulas;
  }

  getById(id: string): Formula | undefined {
    return this.formulas.find(f => f.id === id);
  }
}
