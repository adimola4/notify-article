import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {}
  save(sourceId: string, articleId: string, expiration: number): boolean {
    if (!sourceId || !articleId) {
      return false;
    }
    const expirationMins = expiration || 0;
    const expMS = expirationMins !== 0 ? expirationMins * 60 * 1000 : 0;
    const articles = this.read(sourceId);
    if (articles.includes(articleId)) {
      return false;
    }
    articles.push(articleId);
    const record = {
      value: JSON.stringify(articles),
      expiration: expMS !== 0 ? new Date().getTime() + expMS : null,
      hasExpiration: expMS !== 0 ? true : false,
    };
    localStorage.setItem(sourceId, JSON.stringify(record));
    return true;
  }

  read(sourceId: string): string[] {
    const item = localStorage.getItem(sourceId);
    if (item !== null) {
      const record = JSON.parse(item);
      console.log(record);
      if (!record) {
        return [];
      } else {
        return JSON.parse(record.value);
      }
    }
    return [];
  }

  removeSource(sourceId: string): void {
    localStorage.removeItem(sourceId);
  }

  cleanAll(): void {
    localStorage.clear();
  }
}
