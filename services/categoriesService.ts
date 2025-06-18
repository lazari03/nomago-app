import apiClient from "./apiClient";

export interface Welcome {
  data?: Datum[];
}

export interface Datum {
  id?: number;
  name?: string;

}

export async function getCategories() {
  const response = await apiClient.get('/api/categories');
  console.log('API Response:', response.data.data);

  return response.data.data.map((item: any) => ({
    id: item.id,
    name: item.name
  }));
}