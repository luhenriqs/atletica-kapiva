import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelFuncionario } from './painel-funcionario';

describe('PainelFuncionario', () => {
  let component: PainelFuncionario;
  let fixture: ComponentFixture<PainelFuncionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelFuncionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelFuncionario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
