import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class SortedNumbers implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    success = false;
    sortedNumbers!: number[];
    order!: string;
    error!: string;
  
    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient
    ) {}
    
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            numbers: ['',Validators.required],
            order: ['asc', Validators.required]
        });
    }

    get f() {
        return this.form.controls;
    }

    onSubmit() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        const numbers = this.f["numbers"].value.split(',').map(Number);
        const order = this.f["order"].value;
        this.http.post<any>('http://localhost:8080/numbers/sort-command', { numbers, order }).subscribe(
            res => {
                this.sortedNumbers = res.numbers;
                this.success = true;
                this.loading = false;
                this.error = '';
            },
            error => {
                console.error(error);
                this.error = error.message;
                this.loading = false;
            }
        );
    }
}