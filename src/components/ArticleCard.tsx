import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ArticleCardProps {
  title: string;
  description: string;
  date: string;
  readTime: string;
  url: string;
  index: number;
}

const ArticleCard = ({
  title,
  description,
  date,
  readTime,
  url,
  index,
}: ArticleCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl border bg-white p-6 transition-all hover:shadow-md"
    >
      <div className="mb-4 flex items-center gap-4 text-sm text-black/40">
        <time>{date}</time>
        <span>{readTime} dəqiqəlik oxunuş</span>
      </div>
      <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-black/80">
        {title}
      </h3>
      <p className="mb-4 text-sm text-black/60">{description}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-black transition-colors group-hover:text-black/80"
      >
        Davamını oxu
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </motion.article>
  );
};

export default ArticleCard;