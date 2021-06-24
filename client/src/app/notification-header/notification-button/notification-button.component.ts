import {
  Component,
  Input,
  OnInit,
  ElementRef,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'notification-button',
  templateUrl: './notification-button.component.html',
  styleUrls: ['./notification-button.component.scss'],
})
export class NotificationButtonComponent implements OnInit, OnChanges {
  faBell = faBell;
  @Input()
  unreadArtcile = 0;
  @ViewChild('bellIcon', { read: ElementRef, static: false })
  iconView!: ElementRef;

  constructor(private elRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.iconView) {
      this.iconView.nativeElement.classList.add('shake-now');
      setTimeout(() => {
        this.iconView.nativeElement.classList.remove('shake-now');
      }, 3000);
    }
  }

  ngOnInit(): void {}
}
