import {
  ComponentFixture,
  TestBed,
  async,
  discardPeriodicTasks,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IconsModule } from 'src/app/icons-module';

import { NotificationButtonComponent } from './notification-button.component';

describe('NotificationButtonComponent', () => {
  let component: NotificationButtonComponent;
  let fixture: ComponentFixture<NotificationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationButtonComponent],
      imports: [IconsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show number of unreadArtcile after increase', () => {
    const badge = fixture.debugElement.query(By.css('.badge span'));
    expect(badge).toBeNull(true);
    component.unreadArtcile++;
    fixture.detectChanges();
    const badge2 = fixture.debugElement.query(
      By.css('.badge span')
    ).nativeElement;
    // expect(board)
    expect(badge2.innerHTML).toEqual('1+');
  });
  it('should hide number of unreadArtcile after decrease', () => {
    const badge = fixture.debugElement.query(By.css('.badge span'));
    expect(badge).toBeNull(true);
    fixture.componentInstance.unreadArtcile++;
    fixture.detectChanges();
    fixture.componentInstance.unreadArtcile = 0;
    fixture.detectChanges();
    expect(badge).toBeNull(true);
  });
  it('should not have the DOM element unread counter div if unradArticle is set to 0', () => {
    component.unreadArtcile = 0;
    const badge = fixture.debugElement.query(By.css('.badge span'));
    expect(badge).toBeNull();
  });
  it('should shake animated', fakeAsync(() => {
    fixture.componentInstance.unreadArtcile++;
    fixture.detectChanges();
    fixture.componentInstance.ngOnChanges({});

    const icon = fixture.debugElement.query(By.css('.icon-bell')).nativeElement;
    expect(icon).toHaveClass('shake-now');
    tick(3000);
    expect(icon).not.toHaveClass('shake-now');
  }));

  afterEach(() => {
    // destroy the component to cancel the timer again
    fixture.destroy();
  });
});
