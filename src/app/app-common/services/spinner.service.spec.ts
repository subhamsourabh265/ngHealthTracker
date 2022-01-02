import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SpinnerService } from './spinner.service';

fdescribe('SpinnerService', () => {
  let service: SpinnerService;
  let matSnackbarSpy = jasmine.createSpyObj('MatSnackBar',['open']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: MatSnackBar, useValue: matSnackbarSpy}
      ]
    });
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    console.log(service);
    console.log(matSnackbarSpy);
    expect(service).toBeTruthy();
  });

  it('snack bar should open only one time', () => {
    const result2 = service.showSnackBar('','',5);
    expect(matSnackbarSpy.open).toHaveBeenCalledTimes(1);
  });
});

fdescribe('Check Snack Bar', () => {
  let serviceInjected: SpinnerService, service: SpinnerService, serviceSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatSnackBar, Overlay]
    });
    serviceInjected = TestBed.inject(SpinnerService);
    serviceSpy = jasmine.createSpyObj('MatSnackBar',['open']);
    service = new SpinnerService(serviceSpy);

  });

  it('snack bar should open only one time', () => {
    console.log('service injected')
    console.log(serviceInjected);
    console.log('serviceSpy')
    console.log(serviceSpy);
    console.log('service')
    console.log(service);
    const result2 = service.showSnackBar('','',5);
    expect(serviceSpy.open).toHaveBeenCalledTimes(1);
  });
})
