import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  imports: [CommonModule],
  standalone: true,
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
    </div>
    <div class="modal-body">
      <p *ngIf="data.length > 0">{{ data | json }}</p>
      <p *ngIf="data.length === 0">
        Satır/Satırlar üstünde değişiklik yapılmamıştır
      </p>
    </div>
    <div class="modal-footer"></div>
  `,
})
export class NgbdModalContent {
  activeModal = inject(NgbActiveModal);

  @Input() data: any[] = [];
}
