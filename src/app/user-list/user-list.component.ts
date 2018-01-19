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
    edit = false;
    userId: string;
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

    updateUser($event) {
        $event.preventDefault();
        if (this.form.valid) {
            this._userService.updateUser(this.userId, this.form.value).subscribe(data => {
                console.log(data);
                this.edit = false;
                this.addFormVisible = true;
                this.form.reset();
                this.getUsers();
            });
        }
    }



    createUser(user) {
        if (this.form.valid) {
            this._userService.createUser(user).subscribe(data => {
                console.log(data);
                this.form.reset();
                this.getUsers();
            });
        }

    }

    editUser(user) {
        this.form.controls['firstname'].setValue(user.firstname);
        this.form.controls['lastname'].setValue(user.lastname);
        this.form.controls['email'].setValue(user.email);
        this.addFormVisible = false;
        this.edit = true;
    }

}
