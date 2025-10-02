-- Add missing columns to stories table
ALTER TABLE public.stories 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS content TEXT,
ADD COLUMN IF NOT EXISTS description TEXT;

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create chapters table
CREATE TABLE IF NOT EXISTS public.chapters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  chapter_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Chapters are viewable by everyone" 
ON public.chapters FOR SELECT USING (true);

CREATE POLICY "Users can manage their own chapters" 
ON public.chapters FOR ALL USING (auth.uid() = user_id);

-- Create single_stories table
CREATE TABLE IF NOT EXISTS public.single_stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.single_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Single stories are viewable by everyone" 
ON public.single_stories FOR SELECT USING (true);

-- Create chapter_views table
CREATE TABLE IF NOT EXISTS public.chapter_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.chapter_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Chapter views are viewable by everyone" 
ON public.chapter_views FOR SELECT USING (true);

CREATE POLICY "Anyone can insert chapter views" 
ON public.chapter_views FOR INSERT WITH CHECK (true);

-- Create chapter_likes table
CREATE TABLE IF NOT EXISTS public.chapter_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(chapter_id, user_id)
);

ALTER TABLE public.chapter_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Chapter likes are viewable by everyone" 
ON public.chapter_likes FOR SELECT USING (true);

CREATE POLICY "Users can manage their own likes" 
ON public.chapter_likes FOR ALL USING (auth.uid() = user_id);

-- Create chapter_comments table
CREATE TABLE IF NOT EXISTS public.chapter_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.chapter_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Chapter comments are viewable by everyone" 
ON public.chapter_comments FOR SELECT USING (true);

CREATE POLICY "Users can manage their own comments" 
ON public.chapter_comments FOR ALL USING (auth.uid() = user_id);

-- Create triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_chapters_updated_at
BEFORE UPDATE ON public.chapters
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_single_stories_updated_at
BEFORE UPDATE ON public.single_stories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_chapter_comments_updated_at
BEFORE UPDATE ON public.chapter_comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();