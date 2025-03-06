import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TugasComponent } from './tugas.component';

describe('TugasComponent', () => {
  let component: TugasComponent;
  let fixture: ComponentFixture<TugasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TugasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TugasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
