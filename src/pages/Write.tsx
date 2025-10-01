import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Write = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Xəta",
        description: "Başlıq və məzmun sahələri tələb olunur.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Uğurlu",
      description: "Hekayəniz uğurla dərc edildi!",
    });

    // Navigate to home after successful submission
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Card className="shadow-inkora-lg">
          <CardHeader>
            <CardTitle className="text-3xl">Yeni Hekayə Yaz</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Cover Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="cover-image">Üz Qapağı</Label>
              {coverImage ? (
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="h-full w-full object-cover"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute right-2 top-2"
                    onClick={() => setCoverImage("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label
                  htmlFor="cover-image"
                  className="flex aspect-video cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20 transition-inkora hover:bg-muted/40"
                >
                  <div className="text-center">
                    <ImagePlus className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Şəkil yükləmək üçün klikləyin
                    </p>
                  </div>
                  <input
                    id="cover-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Başlıq</Label>
              <Input
                id="title"
                placeholder="Hekayənizin başlığını yazın..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg"
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tağlar</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  placeholder="Tağ əlavə edin (məs: fantastika)"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button type="button" onClick={addTag}>
                  Əlavə et
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="gap-1 pl-3 pr-1"
                    >
                      #{tag}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Məzmun</Label>
              <Textarea
                id="content"
                placeholder="Hekayənizi yazın..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/")}
              >
                Ləğv et
              </Button>
              <Button onClick={handleSubmit}>
                Dərc et
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Write;
