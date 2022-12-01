export interface Article {
    source:object;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }
  
  export interface Response {
    status: string;
    totalResults:number;
    articles: Article[];
  }
  