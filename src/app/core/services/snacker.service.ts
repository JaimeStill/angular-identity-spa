import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackerService {
    private config: MatSnackBarConfig = new MatSnackBarConfig();
    private action: string = 'Dismiss';

    constructor(
        private snackbar: MatSnackBar
    ) {
        this.config.duration = 5000;
        this.config.panelClass = [];
    }

    private sendMessage(message: string, action: string = this.action) {
        this.snackbar.open(message, action, this.config);
    }

    setAction(action: string) {
        this.action = action;
    }

    setDuration(duration: number) {
        this.config.duration = duration;
    }

    setClasses = (classes: string[]) => {
        classes.push('snacker');
        this.config.panelClass = classes;
    }

    sendColorMessage(message: string, colors: string[], action: string = this.action) {
        this.setClasses(colors);
        this.sendMessage(message, action);
    }

    sendErrorMessage(message: string, action: string = this.action) {
        this.setClasses(['snacker-red']);
        this.sendMessage(message, action);
    }

    sendWarningMessage(message: string, action: string = this.action) {
        this.setClasses(['snacker-orange']);
        this.sendMessage(message, action);
    }

    sendSuccessMessage(message: string, action: string = this.action) {
        this.setClasses(['snacker-green']);
        this.sendMessage(message, action);
    }
}
