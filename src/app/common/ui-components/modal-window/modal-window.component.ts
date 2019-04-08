import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  title: string;
  text: string;
  buttons: [
    ModalButton
   ];
}

export interface ModalButton {
  label: string;
  action?: boolean;
}

@Component({
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
