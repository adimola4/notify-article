import { Article } from './article';

export class Source {
  sourceId!: number;
  title!: string;
  website_url!: string;
  description!: string;
  image_url!: string;
  articles!: Article[];
}
