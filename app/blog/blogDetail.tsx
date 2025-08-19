import { HeaderNavigation } from '@/components/HeaderNavigation';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Colors from '@/constants/Colors';
import { useBlogsStore } from '@/stores/useBlogsStore';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
    headerOverlaySafe: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,

    },
    container: {
        flex: 1,
        paddingTop: 0,
        position: 'relative',
    },
    headerNav: {
        // No absolute positioning, let it be in normal flow
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 100,
        zIndex: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 24,
        color: Colors.primary,
    },
    content: {
        fontSize: 16,
        color: Colors.text,
        marginBottom: 18,
    },
    childText: {
        fontSize: 16,
        color: Colors.text,
    },
    bold: {
        fontWeight: 'bold',
    },
    italic: {
        fontStyle: 'italic',
    },
    underline: {
        textDecorationLine: 'underline',
    },
    date: {
        fontSize: 14,
        color: Colors.darkGray,
        marginTop: 16,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 24,
        marginBottom: 12,
        color: Colors.text,
    },
});

function BlogDetail() {
    const { id } = useLocalSearchParams();
    const insets = useSafeAreaInsets();
    const { blogs, loading, error, fetchBlogs } = useBlogsStore();

    React.useEffect(() => {
        if (blogs.length === 0) fetchBlogs();
    }, [fetchBlogs]);

    const blog = blogs.find((b) => b.id === Number(id));

    if (loading) {
        return <ActivityIndicator style={{ margin: 24 }} size="large" color="#6C4DF6" />;
    }
    if (error) {
        return <Text style={{ color: 'red', margin: 24 }}>Error: {error}</Text>;
    }
    if (!blog) {
        return <Text style={{ margin: 24 }}>Blog not found.</Text>;
    }

    return (
        <>
            <View style={[styles.headerOverlaySafe, { paddingTop: insets.top }]}>
                <HeaderNavigation showBack />
            </View>
            <ParallaxScrollView
                headerImage={
                    blog.thumbnailUrl ? (
                        <>
                            <Image source={{ uri: blog.thumbnailUrl }} style={styles.image} />
                            <LinearGradient
                                colors={["rgba(0,0,0,0.45)", "rgba(0,0,0,0.15)", "transparent"]}
                                style={styles.gradientOverlay}
                                pointerEvents="none"
                            />
                        </>
                    ) : <Text />
                }
                headerBackgroundColor={{ light: Colors.card, dark: Colors.darkGray }}
                contentContainerStyle={{ paddingBottom: 0, padding: 0, gap: 0, top: 0 }}
                contentStyle={{ padding: 0, gap: 0 }}
            >
                <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
                    <Text style={styles.title}>{blog.title}</Text>
                    <Text style={styles.sectionTitle}>About</Text>
                    {Array.isArray(blog.content) && blog.content.map((block, idx) => (
                        <Text style={styles.content} key={idx}>
                            {block.children?.map((child: any, cidx: number) => (
                                <Text
                                    key={cidx}
                                    style={[
                                        styles.childText,
                                        child.bold && styles.bold,
                                        child.italic && styles.italic,
                                        child.underline && styles.underline,
                                    ]}
                                >
                                    {child.text}
                                </Text>
                            ))}
                        </Text>
                    ))}
                    {blog.publishedAt && <Text style={styles.date}>{blog.publishedAt}</Text>}
                </View>
            </ParallaxScrollView>
        </>
    );
}

export default BlogDetail;