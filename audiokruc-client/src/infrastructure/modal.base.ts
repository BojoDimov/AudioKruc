import { AfterViewInit, ContentChild, ElementRef } from '@angular/core';

export class ModalBase implements AfterViewInit {
  @ContentChild('trigger', { static: true })
  trigger: ElementRef<HTMLButtonElement>;

  modalOpened: boolean = false;

  ngAfterViewInit() {
    this.trigger.nativeElement.onclick = () => this.modalOpened = true;
  }
}