import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WelcomeComponent } from './welcome.component';

  fdescribe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let el: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      imports: [BrowserAnimationsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // console.log(component);
    // console.log(el);
  });

  it('should identify the class', () => {
    const wrapperClass = el.queryAll(By.css('.welcome'));
    expect(wrapperClass.length).not.toBe(0);
    console.log(wrapperClass);
  });

  it('should identify card', () => {
    const card = el.queryAll(By.css('.ad-section:first-child'));
    expect(card).toBeTruthy();
    console.log(card);
    // console.log(el);
  });
});
