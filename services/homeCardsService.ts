
import { API_HOST, DEFAULT_PORT } from '@/constants/Platform';
import axios from 'axios';

const AUTH_HEADER = 'Bearer 3cc4fcdc4e832666d02e71cbb307a6f573e38b61b524945757171b5fca48e991cf133f562a550b5862c0aa516184d393b88f76886a2f31045a244af71c97a67841cc25866438be2bc452732b340f9fd1550595640f668efed4040075ac7a295f72d237b160ee88afc8942e93e19b277bb303593a2bf6ff9ccc8ef1fb51889325';

const BASE_URL = `http://${API_HOST}:${DEFAULT_PORT}`;
const LEFT_API_URL = `${BASE_URL}/api/home-left-cards?populate=categories`;
const RIGHT_API_URL = `${BASE_URL}/api/home-right-cards?populate[0]=poster&populate[1]=categories`;

export interface HomeCategory {
  id: number;
  name: string;
}

export interface HomeRightCard {
  id: number;
  title: string;
  description?: string;
  subtitle?: string;
  image?: string;
  link?: string;
  posterUrl?: string;
  [key: string]: any;
}

export async function fetchHomeLeftCards(categoryName?: string): Promise<HomeRightCard[]> {
  let url = LEFT_API_URL;
  if (categoryName) {
    url += `&filters[categories][name][$eq]=${encodeURIComponent(categoryName)}`;
  }
  const response = await axios.get(url, {
    headers: {
      Authorization: AUTH_HEADER,
    },
  });
  return response.data.data.map((item: any) => {
    let categories: HomeCategory[] = [];
    if (Array.isArray(item.categories)) {
      categories = item.categories.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
      }));
    }
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      subtitle: item.subtitle,
      image: item.image,
      link: item.link,
      documentId: item.documentId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      publishedAt: item.publishedAt,
      categories,
    };
  });
}

export async function fetchHomeRightCards(): Promise<HomeRightCard[]> {
  const response = await axios.get(RIGHT_API_URL, {
    headers: {
      Authorization: AUTH_HEADER,
    },
  });
  return response.data.data.map((item: any) => {
    let categories: HomeCategory[] = [];
    if (Array.isArray(item.categories)) {
      categories = item.categories.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
      }));
    }
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      subtitle: item.subtitle,
      image: item.image,
      link: item.link,
      posterUrl: item.poster?.url,
      documentId: item.documentId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      publishedAt: item.publishedAt,
      categories,
    };
  });
}
