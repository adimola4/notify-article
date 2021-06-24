import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { DataService } from './data.service';

describe('Service: Data', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  const dummySourcesResponse = [
    {
      sourceId: 1,
      description: 'NYT > Top Stories',
      image_url: 'https://static01.nyt.com/images/misc/nytlogo152x23.gif',
      title: 'The New York Times',
      website_url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
      articles: [
        {
          articleId: 1,
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
          unread: false,
        },
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
          unread: false,
        },
        {
          articleId: 3,
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
          published_date: '2021-06-19',
          sourceId: 1,
          source_title: 'The New York Times',
          title: 'Delta Variant: What to Know For Summer Travel',
          unread: false,
        },
      ],
    },
    {
      sourceId: 2,
      description:
        'עדכוני SMS ישירות מחדר החדשות של ynet. שילחו את המילים התחל חדשות למספר 5335 וקבלו 4 עדכוני SMS ביום. השירות בתשלום. ',
      image_url: 'https://www.ynet.co.il/images/CENTRAL_1024_ynet_logo.png',
      title: 'Ynet',
      website_url: 'http://www.ynet.co.il/Integration/StoryRss2.xml',
      articles: [
        {
          articleId: 1,
          description:
            'It’s the most contagious form of the coronavirus so far. Here’s what you need to know before traveling.',
          image_url:
            'https://static01.nyt.com/images/2021/06/18/travel/18variant1/merlin_189264417_72d6a67d-0df7-4d62-baf2-82da0a7fe4b3-videoSixteenByNine3000.jpg',
          original_url:
            'https://www.nytimes.com/2021/06/18/travel/delta-variant-summer-travel.html',
          published_date: '2021-06-19',
          sourceId: 2,
          source_title: 'The New York Times',
          title: 'Delta Variant: What to Know For Summer Travel',
          unread: false,
        },
        {
          articleId: 2,
          description:
            'It’s the most contagious form of the coronavirus so far. Here’s what you need to know before traveling.',
          image_url:
            'https://static01.nyt.com/images/2021/06/18/travel/18variant1/merlin_189264417_72d6a67d-0df7-4d62-baf2-82da0a7fe4b3-videoSixteenByNine3000.jpg',
          original_url:
            'https://www.nytimes.com/2021/06/18/travel/delta-variant-summer-travel.html',
          published_date: '2021-06-19',
          sourceId: 2,
          source_title: 'The New York Times',
          title: 'Delta Variant: What to Know For Summer Travel',
          unread: false,
        },
        {
          articleId: 3,
          description:
            'It’s the most contagious form of the coronavirus so far. Here’s what you need to know before traveling.',
          image_url:
            'https://static01.nyt.com/images/2021/06/18/travel/18variant1/merlin_189264417_72d6a67d-0df7-4d62-baf2-82da0a7fe4b3-videoSixteenByNine3000.jpg',
          original_url:
            'https://www.nytimes.com/2021/06/18/travel/delta-variant-summer-travel.html',
          published_date: '2021-06-19',
          sourceId: 2,
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
          published_date: '2021-06-19',
          sourceId: 2,
          source_title: 'The New York Times',
          title: 'Delta Variant: What to Know For Summer Travel',
          unread: false,
        },
      ],
    },
  ];

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get sources from getSources()', () => {
    service.getSources().subscribe((res) => {
      expect(res).toEqual(dummySourcesResponse);
    });

    const req = httpMock.expectOne('http://localhost:3001/api/v1/sources');
    expect(req.request.method).toBe('GET');
    req.flush(dummySourcesResponse);
  });
  afterEach(() => {
    httpMock.verify();
  });
});
