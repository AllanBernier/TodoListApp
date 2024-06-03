import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTabModalComponent } from './new-tab-modal.component';

describe('NewTabModalComponent', () => {
  let component: NewTabModalComponent;
  let fixture: ComponentFixture<NewTabModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTabModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewTabModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
