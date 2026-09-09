export interface Formula {
  id: string;
  name: string;
  description: string;
  variables: string[];
  equation: string;
}

export interface CalculationRequest {
  variables: { [key: string]: number };
}

export interface CalculationResult {
  result: number;
}
