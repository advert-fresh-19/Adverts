import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';

import {
  DialogData,
  ModalButton,
  ModalWindowComponent
} from 'src/app/common/ui-components/modal-window/modal-window.component';


@Injectable()
export class ModalWindowService {

  constructor(public dialog: MatDialog) {}


   public openModalWindow(title: string, message: string, buttons) {
     const data =  this.createModalData(title, message, buttons);
     return this.dialog
       .open(ModalWindowComponent, { minWidth: '350px', maxWidth: '550px', data: data });
  }

  private createModalData(title: string, text: string, buttons: [ModalButton]): DialogData {
    return {
      title: title,
      text: text,
      buttons: buttons
    };
  }
}
