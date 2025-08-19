import { useBlogsStore } from '@/stores/useBlogsStore';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

const BlogsList = () => {
  const { blogs, loading, error, fetchBlogs } = useBlogsStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  if (loading) {
    return <ActivityIndicator style={{ margin: 24 }} size="large" color="#6C4DF6" />;
  }
  if (error) {
    return <Text style={{ color: 'red', margin: 24 }}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={blogs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.blogCard}>
            {item.thumbnailUrl && (
              <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
            )}
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No blogs found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  blogCard: {
    backgroundColor: '#f3edff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  thumbnail: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 8,
    backgroundColor: '#e0e0e0',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#6C4DF6',
    marginBottom: 6,
  },
});

export default BlogsList;
