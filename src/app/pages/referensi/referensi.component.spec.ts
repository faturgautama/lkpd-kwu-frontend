import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferensiComponent } from './referensi.component';

describe('ReferensiComponent', () => {
  let component: ReferensiComponent;
  let fixture: ComponentFixture<ReferensiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferensiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReferensiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
