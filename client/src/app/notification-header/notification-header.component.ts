import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { Article } from '../models/article';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { IntersectionStatus } from '../core/intersection-observer';
import { CacheService } from '../core/cache.service';

@Component({
  selector: 'app-notification-header',
  templateUrl: './notification-header.component.html',
  styleUrls: ['./notification-header.component.scss'],
})
export class NotificationHeaderComponent implements OnInit, OnDestroy {
  faLink = faLink;
  private articleSubject = new BehaviorSubject<Article[]>([]);
  private eventsSubscription!: Subscription;
  throttle = 0;
  distance = 1;
  visibilityStatus: { [key: number]: IntersectionStatus } = {};
  intersectionStatus!: IntersectionStatus;
  showNotification = false;

  @Input()
  events!: Observable<Article>;
  @Input()
  unreadArticles!: number;
  @Input()
  set articles(value) {
    // set the latest value for _data BehaviorSubject
    this.articleSubject.next(value);
  }
  get articles(): Article[] {
    // get the latest value from _data BehaviorSubject

    return this.articleSubject.getValue();
  }
  get sortedArticles(): Article[] {
    //  if(this.showNotification )
    return this.articles.sort((a, b) => {
      return (
        (new Date(b.published_date) as any) -
        (new Date(a.published_date) as any)
      );
    });
    // else
    // return
  }

  constructor(
    private cacheService: CacheService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    let articles: Article[] = [];
    this.articleSubject.subscribe((d) => {
      articles = d;
    });
    this.articles = articles;
    this.eventsSubscription = this.events.subscribe((article: Article) =>
      this.addArticle(article)
    );
    this.articles.filter((article: Article) => {
      if (article.unread) {
        this.unreadArticles += 1;
      }
    });
  }

  onVisibilityChanged(
    changedArticle: Article,
    status: IntersectionStatus
  ): void {
    this.visibilityStatus[changedArticle.articleId] = status;
    if (this.visibilityStatus[changedArticle.articleId] === 'Visible') {
      this.articles.filter((article: Article) => {
        if (article.articleId === changedArticle.articleId) {
          const saved: boolean = this.cacheService.save(
            changedArticle.sourceId.toString(),
            changedArticle.articleId.toString(),
            1
          );
          setTimeout(() => (article.unread = false), 2500);

          if (saved) {
            this.unreadArticles -= 1;
          }
        }
      });
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  openNotification(state: boolean): void {
    this.showNotification = state;
  }
  addArticle(article: Article): void {}
  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
    this.articleSubject.unsubscribe();
  }
}
