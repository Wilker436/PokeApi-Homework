import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadpagePage } from './loadpage.page';

describe('LoadpagePage', () => {
  let component: LoadpagePage;
  let fixture: ComponentFixture<LoadpagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
