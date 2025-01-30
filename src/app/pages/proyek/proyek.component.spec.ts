import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyekComponent } from './proyek.component';

describe('ProyekComponent', () => {
  let component: ProyekComponent;
  let fixture: ComponentFixture<ProyekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProyekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
