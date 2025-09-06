import { API_HOST } from '@/constants/Platform';
import axios from 'axios';

const BLOGS_API_URL = `https://${API_HOST}/api/blogs?populate=thumbnail`;

export interface Blog {
  id: number;
  title: string;
  content: any[];
  publishedAt?: string;
  thumbnailUrl?: string;
  [key: string]: any;
}

export async function fetchBlogs(): Promise<Blog[]> {
  const response = await axios.get(BLOGS_API_URL, {
    headers: {
      Authorization: 'Bearer 3cc4fcdc4e832666d02e71cbb307a6f573e38b61b524945757171b5fca48e991cf133f562a550b5862c0aa516184d393b88f76886a2f31045a244af71c97a67841cc25866438be2bc452732b340f9fd1550595640f668efed4040075ac7a295f72d237b160ee88afc8942e93e19b277bb303593a2bf6ff9ccc8ef1fb51889325'
    }
  });
  return response.data.data.map((item: any) => {
    let thumbnailUrl;
    if (item.thumbnail && item.thumbnail.formats && item.thumbnail.formats.thumbnail && item.thumbnail.formats.thumbnail.url) {
      thumbnailUrl = item.thumbnail.formats.thumbnail.url;
    } else if (item.thumbnail && item.thumbnail.url) {
      thumbnailUrl = item.thumbnail.url;
    }
    if (thumbnailUrl && thumbnailUrl.startsWith('/')) {
      thumbnailUrl = `https://${API_HOST}}` + thumbnailUrl;
    }
    return {
      id: item.id,
      title: item.title,
      content: item.content,
      publishedAt: item.publishedAt,
      thumbnailUrl,
      // add other fields as needed
    };
  });
}
