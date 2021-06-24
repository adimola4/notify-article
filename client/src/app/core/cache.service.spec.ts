import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';

describe('Service: Cache', () => {
  let service: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheService],
    });
    service = TestBed.inject(CacheService);

    let store: any = {};
    const localStorageMock = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };

    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
    spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(localStorageMock.removeItem);
    spyOn(localStorage, 'clear').and.callFake(localStorageMock.clear);
  });
  const dummyLocalStorageObj = {
    source_id: 'sourceID',
    article_id: 'articleID',
    expiration: 1,
  };

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store object in localStorage', () => {
    const res = service.save(
      dummyLocalStorageObj.source_id,
      dummyLocalStorageObj.article_id,
      dummyLocalStorageObj.expiration
    );

    expect(localStorage.getItem(dummyLocalStorageObj.source_id)).toContain(
      dummyLocalStorageObj.article_id
    );
    expect(res).toBe(true);
  });

  it('should save faild ---> invalid source_id ', () => {
    const res = service.save(
      '',
      dummyLocalStorageObj.article_id,
      dummyLocalStorageObj.expiration
    );
    expect(localStorage.getItem('')).toBeNull();
    expect(res).toBe(false);
  });

  it('should save faild ---> invalid article_id ', () => {
    const res = service.save(
      dummyLocalStorageObj.source_id,
      '',
      dummyLocalStorageObj.expiration
    );
    expect(localStorage.getItem(dummyLocalStorageObj.source_id)).toBeNull();
    expect(res).toBe(false);
  });
  it('should read by source_id', () => {
    service.save(
      dummyLocalStorageObj.source_id,
      dummyLocalStorageObj.article_id,
      dummyLocalStorageObj.expiration
    );
    const res = service.read(dummyLocalStorageObj.source_id);
    expect(res).toContain(dummyLocalStorageObj.article_id);
  });
  it('should read faild ---> source_id not found', () => {
    const res = service.read(dummyLocalStorageObj.source_id);
    expect(res).toEqual([]);
  });
  it('should removeSource', () => {
    service.save(
      dummyLocalStorageObj.source_id,
      dummyLocalStorageObj.article_id,
      dummyLocalStorageObj.expiration
    );
    service.removeSource(dummyLocalStorageObj.source_id);
    const res = service.read(dummyLocalStorageObj.source_id);
    expect(res).toEqual([]);
  });
  it('should cleanAll', () => {
    service.save(
      dummyLocalStorageObj.source_id,
      dummyLocalStorageObj.article_id,
      dummyLocalStorageObj.expiration
    );
    service.save(
      '2',
      dummyLocalStorageObj.article_id,
      dummyLocalStorageObj.expiration
    );
    service.save(
      '3',
      dummyLocalStorageObj.article_id,
      dummyLocalStorageObj.expiration
    );
    service.cleanAll();
    const res = service.read(dummyLocalStorageObj.source_id);
    expect(res).toEqual([]);
    const res2 = service.read('2');
    expect(res2).toEqual([]);
    const res3 = service.read('3');
    expect(res3).toEqual([]);
  });
});
