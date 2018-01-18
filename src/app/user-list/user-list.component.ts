import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {

    users;
    addFormVisible = true;

    form: FormGroup;

    constructor(private _userService: ApiService, private fb: FormBuilder) {
        this.form = fb.group({
            'firstname': ['', Validators.required],
            'lastname': ['', Validators.required],
            'email': ['', Validators.required]
        });
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this._userService.getUsers().subscribe((response: any) => {
            if (response.success) {
                this.users = response.users;
            }

        });
    }

    deleteUser(id) {
        this._userService.deleteUser(id).subscribe(data => {
            console.log(data);
            this.getUsers();
        });
    }

    updateUser(id, user) {
        this._userService.updateUser(id, user).subscribe(data => {
            console.log(data);
            this.getUsers();
        });
    }

    createUser(user) {
        console.log(user);
        this._userService.createUser(user).subscribe(data => {
            console.log(data);
            this.getUsers();
        });
    }

    onRowClick($event: any, id) {
        console.log($event.target.outerText, id);
    }

}
