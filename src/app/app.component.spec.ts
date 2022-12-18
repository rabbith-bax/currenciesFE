import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SortedNumbers } from './app.component';
import { HttpClient } from '@angular/common/http';

describe('SortedNumbers', () => {
  let http: HttpClient;
  let formBuilder: FormBuilder;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FormBuilder]
    });
    formBuilder = TestBed.inject(FormBuilder);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should initialize the form', () => {
    const component = new SortedNumbers(formBuilder, http);
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.form.controls['numbers']).toBeDefined();
    expect(component.form.controls['order']).toBeDefined();
  });

  it('should return the correct form controls', () => {
    const component = new SortedNumbers(formBuilder, http);
    component.form = new FormGroup({
      numbers: new FormControl(''),
      order: new FormControl('asc')
    });
    expect(component.f).toEqual(component.form.controls);
  });

  it('should send a POST request to the correct endpoint with the correct payload', () => {
    const component = new SortedNumbers(formBuilder, http);
    component.form = new FormGroup({
      numbers: new FormControl('1,2,3'),
      order: new FormControl('asc')
    });
    component.submitted = true;
    component.onSubmit();

    const req = httpTestingController.expectOne('http://localhost:8080/numbers/sort-command');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ numbers: [1, 2, 3], order: 'asc' });
  });

  it('should set the loading and error properties correctly', () => {
    const component = new SortedNumbers(formBuilder, http);
    component.form = new FormGroup({
      numbers: new FormControl('1,2,3'),
      order: new FormControl('asc')
    });
    component.submitted = true;
    component.onSubmit();
    expect(component.loading).toBeTrue();
    expect(component.error).toEqual('');
  });

  it('should set the sortedNumbers and success properties correctly on success', () => {
    const component = new SortedNumbers(formBuilder, http);
    component.form = new FormGroup({
      numbers: new FormControl('1,2,3'),
      order: new FormControl('asc')
    });
    component.submitted = true;
    component.onSubmit();
    httpTestingController.expectOne('http://localhost:8080/numbers/sort-command').flush({ numbers: [1, 2, 3] });
    expect(component.sortedNumbers).toEqual([1, 2, 3]);
    expect(component.success).toBeTrue();
  });

  it('should set the error property correctly on error', () => {
    const component = new SortedNumbers(formBuilder, http);
    component.form = new FormGroup({
      numbers: new FormControl('1,2,3'),
      order: new FormControl('asc')
    });
    component.submitted = true;
    component.onSubmit();
    httpTestingController.expectOne('http://localhost:8080/numbers/sort-command').error(new ErrorEvent('test error'));
    expect(component.error).toEqual('test error');
  });
});