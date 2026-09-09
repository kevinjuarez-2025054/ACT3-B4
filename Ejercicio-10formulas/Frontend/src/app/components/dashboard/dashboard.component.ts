import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormulaService } from '../../services/formula.service';
import { Formula } from '../../models/formula.model';
import { CapitalizePipe } from '../../pipe/capitalize.pipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, CapitalizePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formulas$: Observable<Formula[]> | undefined;
  selectedFormula$: Observable<Formula | null>;
  calculationResult$: Observable<any>;
  
  inputValues: { [key: string]: number } = {};

  constructor(private formulaService: FormulaService) {
    this.selectedFormula$ = this.formulaService.selectedFormula$;
    this.calculationResult$ = this.formulaService.liveResult$;
  }

  ngOnInit(): void {
    this.formulas$ = this.formulaService.getFormulas();
    
    // Resetear inputs locales cuando cambie la fórmula activa
    this.selectedFormula$.subscribe(formula => {
      this.inputValues = {};
      if (formula) {
        formula.variables.forEach(v => this.inputValues[v] = 0);
        this.onInputChange();
      }
    });
  }

  onSelectFormula(formula: Formula): void {
    this.formulaService.selectFormula(formula);
  }

  onInputChange(): void {
    this.formulaService.updateInputs(this.inputValues);
  }

  getTrackByFormula(_index: number, item: Formula): string {
    return item.id;
  }

  getTrackByVar(_index: number, item: string): string {
    return item;
  }
}
