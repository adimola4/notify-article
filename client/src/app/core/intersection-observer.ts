import { Observable, Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

export enum IntersectionStatus {
  Visible = 'Visible',
  Pending = 'Pending',
  NotVisible = 'NotVisible',
}

export const fromIntersectionObserver = (
  element: HTMLElement,
  config: IntersectionObserverInit,
  debounce = 0
) =>
  new Observable<IntersectionStatus>((subscriber) => {
    const subject$ = new Subject<{
      entry: IntersectionObserverEntry;
      observer: IntersectionObserver;
    }>();

    const intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (isIntersecting(entry)) {
            subject$.next({ entry, observer });
          }
        });
      },
      config
    );

    subject$.subscribe(() => {
      subscriber.next(IntersectionStatus.Pending);
    });

    subject$
      .pipe(debounceTime(debounce), filter(Boolean))
      .subscribe(async (res: any) => {
        const isEntryVisible = await isVisible(res.entry.target as HTMLElement);

        if (isEntryVisible) {
          subscriber.next(IntersectionStatus.Visible);
          res.observer.unobserve(res.entry.target);
        } else {
          subscriber.next(IntersectionStatus.NotVisible);
        }
      });

    intersectionObserver.observe(element);

    return {
      unsubscribe(): void {
        intersectionObserver.disconnect();
        subject$.unsubscribe();
      },
    };
  });

async function isVisible(element: HTMLElement): Promise<any> {
  return new Promise((resolve) => {
    const observer = new IntersectionObserver(([entry]) => {
      resolve(entry.isIntersecting);
      observer.disconnect();
    });

    observer.observe(element);
  });
}

function isIntersecting(entry: IntersectionObserverEntry): boolean {
  return entry.isIntersecting || entry.intersectionRatio > 0;
}
