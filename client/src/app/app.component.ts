import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as ActionCable from 'actioncable';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { AppState } from './core/AppState.service';
import { CacheService } from './core/cache.service';
import { DataService } from './core/data.service';
import { Article } from './models/article';
import { Source } from './models/source';
import { NotificationHeaderComponent } from './notification-header/notification-header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Notify-Articles';
  @ViewChild(NotificationHeaderComponent)
  private notificationComponent!: NotificationHeaderComponent;
  WS_URL =  'wss://notify-articles.herokuapp.com/server/cable'
            

  private cable: any;
  private subscription: any;
  articles: Article[] = [];
  sources: Source[] = [];
  private sourcesOBS$: Observable<Source[]> | undefined;
  private sourcesSubscription!: Subscription;

  eventsSubject: Subject<any> = new Subject<any>();

  constructor(
    private dataService: DataService,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    this.cable = ActionCable.createConsumer(this.WS_URL);
    this.subscription = this.cable.subscriptions.create('ArticlesChannel', {
      connected: this.connected,
      disconnected: this.disconnected,
      received: (data: any) => this.received(data),
    });
    this.sourcesOBS$ = this.dataService.getSources();
    this.sourcesSubscription = this.sourcesOBS$.subscribe((data: any) => {
      data.filter((source: Source) => {
        this.sources.push(source);
        const readedArticles = this.cacheService.read(
          source.sourceId.toString()
        );
        for (const article of source.articles) {
          article.unread = readedArticles.includes(article.articleId.toString())
            ? false
            : true;
          this.articles.push(article);
        }
      });
    });
  }

  connected(): void {
    // console.log('connected!');
  }
  disconnected(): void {
    // console.log('disconnected!');
  }
  received(data: any): void {
    if (!data.body.articleId || data.body === {}) {
      return;
    }
    const newArticle: Article = data.body;
    if (
      this.articles.find(
        (article) => article.articleId === newArticle.articleId
      )
    ) {
      return;
    }
    newArticle.unread = true;
    this.articles.push(newArticle);
    this.eventsSubject.next(newArticle);
  }

  getunreadArticles(): number {
    let counter = 0;
    this.articles.filter((article) => {
      if (article) {
        counter = article.unread ? (counter += 1) : counter;
      }
    });
    return counter;
  }

  ngOnDestroy(): void {
    this.cacheService.cleanAll();
    this.sourcesSubscription.unsubscribe();
  }
}
