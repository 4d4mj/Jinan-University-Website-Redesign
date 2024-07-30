import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptcardComponent } from './transcriptcard.component';

describe('TranscriptcardComponent', () => {
  let component: TranscriptcardComponent;
  let fixture: ComponentFixture<TranscriptcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranscriptcardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranscriptcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
