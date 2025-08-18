import { Blog, fetchBlogs } from '@/services/blogsService';
import { create } from 'zustand';

interface BlogsState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  fetchBlogs: () => Promise<void>;
}

export const useBlogsStore = create<BlogsState>((set) => ({
  blogs: [],
  loading: false,
  error: null,
  fetchBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const blogs = await fetchBlogs();
      set({ blogs, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch blogs', loading: false });
    }
  },
}));
