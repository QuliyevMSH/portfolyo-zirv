import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";

const projects = [
  {
    title: "E-commerce Platforması",
    description:
      "React və Node.js istifadə edərək hazırlanmış tam funksional e-ticarət platforması",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    title: "Task Menecment Sistemi",
    description:
      "Komandalar üçün task menecment sistemi. Real-time yeniləmələr və kollaborasiya imkanları",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    tags: ["Vue.js", "Firebase", "Tailwind CSS"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
];

const Projects = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <span className="mb-2 inline-block rounded-full bg-black/5 px-3 py-1 text-sm font-medium">
          Layihələrim
        </span>
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
          Son Tamamladığım İşlər
        </h1>
        <p className="mx-auto max-w-2xl text-black/60">
          Müxtəlif texnologiyalar istifadə edərək hazırladığım layihələr. Hər bir
          layihə özündə yeni təcrübə və bilik əks etdirir.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} {...project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;