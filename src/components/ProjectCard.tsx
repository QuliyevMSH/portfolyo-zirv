import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  index: number;
}

const ProjectCard = ({
  title,
  description,
  image,
  tags,
  demoUrl,
  githubUrl,
  index,
}: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative mb-6 aspect-video overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="mb-4 text-sm text-black/60">{description}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-black/60 transition-colors hover:text-black"
            >
              <ExternalLink className="h-4 w-4" />
              Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-black/60 transition-colors hover:text-black"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;