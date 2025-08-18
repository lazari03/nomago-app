import { useBlogsStore } from '@/stores/useBlogsStore';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

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
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
            {item.publishedAt && <Text style={styles.date}>{item.publishedAt}</Text>}
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
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
    color: '#6C4DF6',
  },
  content: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});

export default BlogsList;
