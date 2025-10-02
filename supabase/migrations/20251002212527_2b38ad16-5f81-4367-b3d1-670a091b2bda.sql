-- Create stories table for both stories and poems
CREATE TABLE IF NOT EXISTS public.stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  cover_image TEXT,
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  tags TEXT[] DEFAULT '{}',
  read_time INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  type TEXT NOT NULL CHECK (type IN ('story', 'poem')),
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Stories are viewable by everyone" 
ON public.stories 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_stories_updated_at
BEFORE UPDATE ON public.stories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance on type filtering
CREATE INDEX idx_stories_type ON public.stories(type);
CREATE INDEX idx_stories_views ON public.stories(views DESC);
CREATE INDEX idx_stories_created_at ON public.stories(created_at DESC);