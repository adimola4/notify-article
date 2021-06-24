import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, Subject } from 'rxjs';

import { AppComponent } from './app.component';
import * as ActionCable from 'actioncable';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const dummyActionCableMessage = {
  title: 'New article!',
  body: {
    articleId: 10000,
    description:
      'It’s the most contagious form of the coronavirus so far. Here’s what you need to know before traveling.',
    image_url:
      'https://static01.nyt.com/images/2021/06/18/travel/18variant1/merlin_189264417_72d6a67d-0df7-4d62-baf2-82da0a7fe4b3-videoSixteenByNine3000.jpg',
    original_url:
      'https://www.nytimes.com/2021/06/18/travel/delta-variant-summer-travel.html',
    published_date: '2021-06-22',
    sourceId: 1,
    source_title: 'The New York Times',
    title: 'Delta Variant: What to Know For Summer Travel',
    unread: true,
  },
};
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Notify-Articles'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Notify-Articles');
  });

  it('should get messages from action cable', () => {
    component.ngOnInit();
    let errorDummyActionCableMessage = { title: 'error', body: {} };
    component.received(errorDummyActionCableMessage);
    let errorDummyActionCableMessage2 = {
      title: 'error',
      body: {
        description:
          'It’s the most contagious form of the coronavirus so far. Here’s what you need to know before traveling.',
        image_url:
          'https://static01.nyt.com/images/2021/06/18/travel/18variant1/merlin_189264417_72d6a67d-0df7-4d62-baf2-82da0a7fe4b3-videoSixteenByNine3000.jpg',
        original_url:
          'https://www.nytimes.com/2021/06/18/travel/delta-variant-summer-travel.html',
        published_date: '2021-06-22',
        sourceId: 1,
        source_title: 'The New York Times',
        title: 'Delta Variant: What to Know For Summer Travel',
        unread: true,
      },
    };
    component.received(errorDummyActionCableMessage2);
    fixture.detectChanges();
    expect(component.articles.length).toEqual(0);

    component.received(dummyActionCableMessage);
    fixture.detectChanges();
    expect(component.articles.length).toEqual(1);
    expect(component.articles[0].unread).toBeTrue();
  });
  it('should getunreadArticles()', () => {
    component.ngOnInit();
    component.received(dummyActionCableMessage);
    component.received(dummyActionCableMessage);
    component.received(dummyActionCableMessage);
  });
});
