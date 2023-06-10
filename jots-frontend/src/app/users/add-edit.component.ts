import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        // Form with validation rules
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.minLength(6), ...(this.id ? [] : [Validators.required])]],
            student: [false],
            tutor: [false],
            manager: [false]
        });

        this.title = this.id ? 'Edit User' : 'Add User';

        if (this.id) {
            // Edit mode
            this.loading = true;
            this.accountService.getById(this.id)
                .pipe(first())
                .subscribe(user => {
                    this.form.patchValue({
                        name: user.name,
                        email: user.email,
                        student: user.roles?.includes('student') || false,
                        tutor: user.roles?.includes('tutor') || false,
                        manager: user.roles?.includes('manager') || false
                    });
                    this.loading = false;
                });

        }
    }

    // Convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // Reset alerts on submit
        this.alertService.clear();

        // Stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.submitting = true;
        this.saveUser()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('User saved', { keepAfterRouteChange: true });
                    this.router.navigateByUrl('/users');
                },
                error: error => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            });
    }

    private saveUser() {
        // Create or update user based on id param
        const userData = {
            name: this.f.name.value,
            email: this.f.email.value,
            password: this.f.password.value,
            roles: this.getSelectedRoles()
        };

        return this.id
            ? this.accountService.update(this.id, userData)
            : this.accountService.register(userData);
    }

    private getSelectedRoles(): string[] {
        const roles: string[] = [];
        if (this.f.student.value) {
            roles.push('student');
        }
        if (this.f.tutor.value) {
            roles.push('tutor');
        }
        if (this.f.manager.value) {
            roles.push('manager');
        }
        return roles;
    }
}