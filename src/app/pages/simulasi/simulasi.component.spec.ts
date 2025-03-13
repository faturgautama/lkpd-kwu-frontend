import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulasiComponent } from './simulasi.component';

describe('SimulasiComponent', () => {
  let component: SimulasiComponent;
  let fixture: ComponentFixture<SimulasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulasiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
