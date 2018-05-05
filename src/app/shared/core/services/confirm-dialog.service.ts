import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ConfirmDialogOptions } from '../models/confirm-dialog-options.model';

@Injectable()
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {

  }

  confirm(title?: string, content?: string, options?: ConfirmDialogOptions) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      closeOnNavigation: true,
      maxWidth: 700
    });

    options = options || {};

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.content = content;
    dialogRef.componentInstance.confirmButtonText = options.confirmButtonText;
    dialogRef.componentInstance.cancelButtonText = options.cancelButtonText;

    return dialogRef.afterClosed().toPromise();
  }

}
