import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import {
  waitForAsync,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { IconsModule } from '../icons-module';

import { NotificationHeaderComponent } from './notification-header.component';
import { AppComponent } from '../app.component';
import { NotificationButtonComponent } from './notification-button/notification-button.component';
import { IntersectionStatus } from '../core/intersection-observer';

import { Article } from '../models/article';
import { Source } from '../models/source';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('NotificationHeaderComponent', () => {
  let component: NotificationHeaderComponent;
  let fixture: ComponentFixture<NotificationHeaderComponent>;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  @Component({ selector: 'notification-button', template: '' })
  class NotificationButtonComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NotificationHeaderComponent,
        NotificationButtonComponent,
        TestHostComponent,
      ],
      imports: [IconsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  const dummyArticles: Article[] = [
    {
      articleId: 2,
      description:
        'It’s the most contagious form of the coronavirus so far. Here’s what you need to know before traveling.',
      image_url:
        'https://static01.nyt.com/images/2021/06/18/travel/18variant1/merlin_189264417_72d6a67d-0df7-4d62-baf2-82da0a7fe4b3-videoSixteenByNine3000.jpg',
      original_url:
        'https://www.nytimes.com/2021/06/18/travel/delta-variant-summer-travel.html',
      published_date: '2021-06-19',
      sourceId: 1,
      source_title: 'The New York Times',
      title: 'Delta Variant: What to Know For Summer Travel',
      unread: true,
    },
    {
      articleId: 1,
      description:
        'It’s the most contagious form of the coronavirus so far. Here’s what you need to know before traveling.',
      image_url:
        'https://static01.nyt.com/images/2021/06/18/travel/18variant1/merlin_189264417_72d6a67d-0df7-4d62-baf2-82da0a7fe4b3-videoSixteenByNine3000.jpg',
      original_url:
        'https://www.nytimes.com/2021/06/18/travel/delta-variant-summer-travel.html',
      published_date: '2021-06-20',
      sourceId: 1,
      source_title: 'The New York Times',
      title: 'Delta Variant: What to Know For Summer Travel',
      unread: true,
    },
    {
      articleId: 3,
      description:
        'It’s the most contagious form of the coronavirus so far. Here’s what you need to know before traveling.',
      image_url:
        'https://static01.nyt.com/images/2021/06/18/travel/18variant1/merlin_189264417_72d6a67d-0df7-4d62-baf2-82da0a7fe4b3-videoSixteenByNine3000.jpg',
      original_url:
        'https://www.nytimes.com/2021/06/18/travel/delta-variant-summer-travel.html',
      published_date: '2021-06-1',
      sourceId: 1,
      source_title: 'The New York Times',
      title: 'Delta Variant: What to Know For Summer Travel',
      unread: false,
    },
    {
      articleId: 4,
      description:
        'It’s the most contagious form of the coronavirus so far. Here’s what you need to know before traveling.',
      image_url:
        'https://static01.nyt.com/images/2021/06/18/travel/18variant1/merlin_189264417_72d6a67d-0df7-4d62-baf2-82da0a7fe4b3-videoSixteenByNine3000.jpg',
      original_url:
        'https://www.nytimes.com/2021/06/18/travel/delta-variant-summer-travel.html',
      published_date: '2000-06-19',
      sourceId: 1,
      source_title: 'The New York Times',
      title: 'Delta Variant: What to Know For Summer Travel',
      unread: false,
    },
  ];

  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it("should render the passed @Inputs 'events', 'unreadArticles', 'articles'.", () => {
    expect(testHostComponent.notificationHeaderComponent.events).not.toBeNull();
    expect(testHostComponent.notificationHeaderComponent.events).toBeInstanceOf(
      Observable
    );
    expect(
      testHostComponent.notificationHeaderComponent.articles
    ).not.toBeNull();
    expect(
      testHostComponent.notificationHeaderComponent.articles
    ).toBeInstanceOf(Array);
    expect(
      testHostComponent.notificationHeaderComponent.unreadArticles
    ).not.toBeNull();

    testHostComponent.eventsSubject.next(dummyArticles[0]);
    testHostComponent.articles.push(...dummyArticles);
    testHostComponent.getunreadArticles();

    testHostFixture.detectChanges();

    testHostComponent.notificationHeaderComponent.events.subscribe((article) =>
      expect(article).toEqual(dummyArticles[0])
    );
    expect(
      testHostComponent.notificationHeaderComponent.unreadArticles
    ).toEqual(dummyArticles.length);
    expect(testHostComponent.notificationHeaderComponent.articles).toEqual(
      dummyArticles
    );
  });

  it(
    'clicking the bell icon should open notification and show sorted articles',
    waitForAsync(() => {
      const button = testHostFixture.debugElement.query(
        By.css('.notification-btn')
      );
      expect(
        testHostFixture.debugElement.query(By.css('.notification-content'))
      ).toBeNull();
      testHostComponent.articles.push(...dummyArticles);
      button.triggerEventHandler('click', {} as Event);

      testHostFixture.detectChanges();

      expect(
        testHostFixture.debugElement.query(By.css('.notification-content'))
      ).not.toBeNull();
      const sortedDummy = dummyArticles.sort(
        (a, b) =>
          (new Date(b.published_date) as any) -
          (new Date(a.published_date) as any)
      );
      expect(testHostComponent.notificationHeaderComponent.articles).toEqual(
        sortedDummy
      );

      button.triggerEventHandler('click', {} as Event);
      testHostFixture.detectChanges();

      expect(
        testHostFixture.debugElement.query(By.css('.notification-content'))
      ).toBeNull();
    })
  );

  it('should run onVisibilityChanged()', fakeAsync(() => {
    const button = testHostFixture.debugElement.query(
      By.css('.notification-btn')
    );
    testHostComponent.articles.push(...dummyArticles);

    button.triggerEventHandler('click', {} as Event);
    testHostFixture.detectChanges();
    const article_list = testHostFixture.debugElement.query(
      By.css('#articles_list')
    );
    const style1 = getComputedStyle(article_list.children[0].nativeElement);
    expect(style1.backgroundColor).toEqual('rgb(119, 117, 117)');
    expect(style1.animation).toEqual(
      '3s ease 2s 1 normal none running to-light'
    );
    testHostComponent.notificationHeaderComponent.articles.filter((a) => {
      a.unread = false;
      testHostFixture.detectChanges();
      tick(2500);
      expect(style1.backgroundColor).toEqual('rgba(0, 0, 0, 0)');
    });

    testHostFixture.destroy();
  }));

  @Component({
    selector: `app-component`,
    template: `<app-notification-header
      [articles]="articles"
      [events]="eventsSubject.asObservable()"
      [unreadArticles]="getunreadArticles()"
    ></app-notification-header>`,
  })
  class TestHostComponent {
    @ViewChild(NotificationHeaderComponent)
    public notificationHeaderComponent!: NotificationHeaderComponent;

    articles: Article[] = [];
    sources: Source[] = [];

    eventsSubject: Subject<any> = new Subject<any>();

    getunreadArticles(): number {
      return dummyArticles.length;
    }
    received(data: any): void {
      const article = {
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
      };
      this.articles.push(article);
      this.eventsSubject.next(article);
    }
  }
});
