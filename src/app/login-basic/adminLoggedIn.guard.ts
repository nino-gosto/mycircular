import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationBasicService } from './authentication-basic.service';
import { ErrorMessageService } from '../error-handler/error-message.service';

@Injectable()
export class LoggedInAdminGuard implements CanActivate {

    constructor(private authentication: AuthenticationBasicService,
        private errorMessageService: ErrorMessageService) {
    }

    canActivate(): boolean {
        if (!this.authentication.isLoggedIn()) {
            this.errorMessageService.showErrorMessage('You should be logged in to perform this action');
        } else if (!this.authentication.isRole('admin')) {
            this.errorMessageService.showErrorMessage('You do not have enough permissions to perform this action');
        }
        return this.authentication.isLoggedIn() && this.authentication.isRole('admin');
    }
}
