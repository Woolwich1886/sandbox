import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpherePageComponent } from './sphere-page.component';

describe('SpherePageComponent', () => {
  let component: SpherePageComponent;
  let fixture: ComponentFixture<SpherePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpherePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpherePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
