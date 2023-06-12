import { Component, OnInit } from '@angular/core';
import { first, map } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { User } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users?: any[];

    constructor(private accountService: AccountService) { }

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    deleteUser(id: string) {
        const user = this.users?.find(x => x.id === id);

        if (user) {
            user.isDeleting = true;

            this.accountService.delete(id)
                .pipe(first())
                .subscribe(() => {
                    this.users = this.users?.filter(x => x.id !== id);
                    delete user.isDeleting; // Remove the isDeleting property
                });
        }
    }

}