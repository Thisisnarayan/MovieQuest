import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullResultComponent } from './full-result.component';

describe('FullResultComponent', () => {
  let component: FullResultComponent;
  let fixture: ComponentFixture<FullResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
