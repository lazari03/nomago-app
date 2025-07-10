import { router } from 'expo-router';


export const goToExplore = (category: string) => {
  router.push({
    pathname: '/explore',
    params: { category },
  });
};

export const goToProperty = (id: string) => {
  router.push(`/property/${id}`);
};
