import { Header } from "@/components/Header";
import { StoryCard } from "@/components/StoryCard";
import { Button } from "@/components/ui/button";
import { TrendingUp, BookOpen, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

type StoryType = 'story' | 'poem';

interface Story {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  readTime: number;
  views: number;
  publishedAt: string;
}

const Index = () => {
  const [trendingFilter, setTrendingFilter] = useState<StoryType>('story');
  const [recentFilter, setRecentFilter] = useState<StoryType>('story');
  const [trendingStories, setTrendingStories] = useState<Story[]>([]);
  const [recentStories, setRecentStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingStories();
  }, [trendingFilter]);

  useEffect(() => {
    fetchRecentStories();
  }, [recentFilter]);

  const fetchTrendingStories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('type', trendingFilter)
      .order('views', { ascending: false })
      .limit(3);

    if (error) {
      console.error('Error fetching trending stories:', error);
    } else if (data) {
      setTrendingStories(data.map(story => ({
        id: story.id,
        title: story.title,
        excerpt: story.excerpt,
        coverImage: story.cover_image || 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80',
        author: {
          name: story.author_name,
          avatar: story.author_avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${story.author_name}`,
        },
        tags: story.tags || [],
        readTime: story.read_time || 0,
        views: story.views || 0,
        publishedAt: story.published_at || '',
      })));
    }
    setLoading(false);
  };

  const fetchRecentStories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('type', recentFilter)
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) {
      console.error('Error fetching recent stories:', error);
    } else if (data) {
      setRecentStories(data.map(story => ({
        id: story.id,
        title: story.title,
        excerpt: story.excerpt,
        coverImage: story.cover_image || 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80',
        author: {
          name: story.author_name,
          avatar: story.author_avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${story.author_name}`,
        },
        tags: story.tags || [],
        readTime: story.read_time || 0,
        views: story.views || 0,
        publishedAt: story.published_at || '',
      })));
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-b from-muted/50 to-background py-16">
          <div className="container px-4 text-center">
            <h1 className="mb-4 text-5xl font-bold text-secondary md:text-6xl">
              Hekayələrinizi Paylaşın
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Yaradıcılığınızı kəşf edin, hekayələrinizi yazın və minlərlə oxucu ilə paylaşın
            </p>
            <Button size="lg" className="shadow-inkora transition-inkora hover:shadow-inkora-lg">
              <BookOpen className="mr-2 h-5 w-5" />
              Yazmağa Başla
            </Button>
          </div>
        </section>

        {/* Trending Stories */}
        <section className="py-16">
          <div className="container px-4">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-bold">Ən Çox Oxunanlar</h2>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={trendingFilter === 'story' ? 'default' : 'outline'}
                  onClick={() => setTrendingFilter('story')}
                >
                  Hekayələr
                </Button>
                <Button
                  variant={trendingFilter === 'poem' ? 'default' : 'outline'}
                  onClick={() => setTrendingFilter('poem')}
                >
                  Şeirlər
                </Button>
              </div>
            </div>
            {loading ? (
              <div className="text-center py-8">Yüklənir...</div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {trendingStories.map((story) => (
                  <StoryCard key={story.id} {...story} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Recent Stories */}
        <section className="border-t bg-muted/20 py-16">
          <div className="container px-4">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-secondary" />
                <h2 className="text-3xl font-bold">Son Əlavə Olunanlar</h2>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={recentFilter === 'story' ? 'default' : 'outline'}
                  onClick={() => setRecentFilter('story')}
                >
                  Hekayələr
                </Button>
                <Button
                  variant={recentFilter === 'poem' ? 'default' : 'outline'}
                  onClick={() => setRecentFilter('poem')}
                >
                  Şeirlər
                </Button>
              </div>
            </div>
            {loading ? (
              <div className="text-center py-8">Yüklənir...</div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recentStories.map((story) => (
                  <StoryCard key={story.id} {...story} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t py-16">
          <div className="container px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold">Sizin Hekayəniz Nədir?</h2>
            <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
              Yaradıcı yazıçılar icması ilə birləşin və öz hekayələrinizi dünya ilə paylaşın
            </p>
            <Button size="lg" variant="secondary">
              İndi Qoşul
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Inkora. Bütün hüquqlar qorunur.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
