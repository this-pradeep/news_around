// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import NewsApi from 'newsapi'
const newsapi = new NewsApi(process.env.NEWS_API_KEY)

type Data = {
  name: string
}

// export default function getNews(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   let news:any;
  
// }
