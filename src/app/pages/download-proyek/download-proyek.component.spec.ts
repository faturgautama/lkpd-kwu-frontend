import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadProyekComponent } from './download-proyek.component';

describe('DownloadProyekComponent', () => {
  let component: DownloadProyekComponent;
  let fixture: ComponentFixture<DownloadProyekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadProyekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DownloadProyekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
