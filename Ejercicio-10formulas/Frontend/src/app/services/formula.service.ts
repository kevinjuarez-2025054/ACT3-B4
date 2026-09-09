import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { catchError, switchMap, debounceTime} from 'rxjs/operators';
import { Formula, CalculationResult } from '../models/formula.model';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {
  private apiUrl = 'http://localhost:3000/api';

  // Estados reactivos con RxJS
  private selectedFormulaSubject = new BehaviorSubject<Formula | null>(null);
  selectedFormula$ = this.selectedFormulaSubject.asObservable();

  private inputChangesSubject = new Subject<{ [key: string]: number }>();
  
  // Pipeline en vivo: Escucha cambios en inputs, espera 150ms y dispara la petición al servidor de forma reactiva
  liveResult$: Observable<CalculationResult | null> = this.inputChangesSubject.pipe(
    debounceTime(150),
    switchMap(variables => {
      const currentFormula = this.selectedFormulaSubject.value;
      if (!currentFormula) return of(null);
      return this.http.post<CalculationResult>(`${this.apiUrl}/formulas/${currentFormula.id}/calculate`, { variables }).pipe(
        catchError(() => of({ result: 0 }))
      );
    })
  );

  constructor(private http: HttpClient) {}

  getFormulas(): Observable<Formula[]> {
    return this.http.get<Formula[]>(`${this.apiUrl}/formulas`);
  }

  selectFormula(formula: Formula): void {
    this.selectedFormulaSubject.next(formula);
  }

  updateInputs(variables: { [key: string]: number }): void {
    this.inputChangesSubject.next(variables);
  }
}
