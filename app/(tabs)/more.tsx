import BlogCell from '@/components/BlogCell';
import { HeaderNavigation } from '@/components/HeaderNavigation';
import { ThemedView } from '@/components/ThemedView';
import { useBlogsStore } from '@/stores/useBlogsStore';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';

export default function MoreScreen() {
  const { blogs, loading, error, fetchBlogs } = useBlogsStore();
  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <HeaderNavigation title="More" showBack={true} />
      {loading ? (
        <ActivityIndicator style={{ margin: 24 }} size="large" color="#6C4DF6" />
      ) : error ? (
        <Text style={{ color: 'red', margin: 24 }}>Error: {error}</Text>
      ) : blogs.length === 0 ? (
        <Text>No blogs found.</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.listContainer}>
          {blogs.map((item) => (
            <BlogCell
              key={item.id}
              title={item.title}
              imageUrl={item.thumbnailUrl}
              date={item.publishedAt && new Date(item.publishedAt).toLocaleDateString()}
              onPress={() => router.push({ pathname: '/blog/blogDetail', params: { id: item.id } })}
            />
          ))}
        </ScrollView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 8,
  },
});
