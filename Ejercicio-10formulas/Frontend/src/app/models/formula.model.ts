export interface Formula {
  id: string;
  name: string;
  description: string;
  variables: string[];
  equation: string;
}

export interface CalculationResult {
  result: number;
}
