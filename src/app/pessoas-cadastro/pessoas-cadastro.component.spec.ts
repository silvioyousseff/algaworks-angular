import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasCadastroComponent } from './pessoas-cadastro.component';

describe('PessoasCadastroComponent', () => {
  let component: PessoasCadastroComponent;
  let fixture: ComponentFixture<PessoasCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoasCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoasCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
