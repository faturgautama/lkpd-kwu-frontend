import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuisComponent } from './kuis.component';

describe('KuisComponent', () => {
  let component: KuisComponent;
  let fixture: ComponentFixture<KuisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KuisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
