import ArticleCard from "@/components/ArticleCard";
import { motion } from "framer-motion";

const articles = [
  {
    title: "React-da State Management: Redux vs Context API",
    description:
      "React tətbiqlərində state idarəetməsi üçün ən populyar həllər və onların müqayisəsi",
    date: "15 Mart 2024",
    readTime: "5",
    url: "https://example.com/article1",
  },
  {
    title: "TypeScript ilə Daha Təhlükəsiz Kod Yazmaq",
    description:
      "TypeScript-in əsas xüsusiyyətləri və onların real layihələrdə tətbiqi",
    date: "10 Mart 2024",
    readTime: "7",
    url: "https://example.com/article2",
  },
];

const Articles = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <span className="mb-2 inline-block rounded-full bg-black/5 px-3 py-1 text-sm font-medium">
          Məqalələrim
        </span>
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
          Texniki Yazılarım
        </h1>
        <p className="mx-auto max-w-2xl text-black/60">
          Web development və proqramlaşdırma haqqında məqalələrim. Təcrübələrimi
          və öyrəndiklərimi bölüşürəm.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2">
        {articles.map((article, index) => (
          <ArticleCard key={article.title} {...article} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Articles;