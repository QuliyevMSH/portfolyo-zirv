import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <span className="mb-2 inline-block rounded-full bg-black/5 px-3 py-1 text-sm font-medium">
          Web Developer
        </span>
        <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
          Salam, Mən Web Developer-əm
        </h1>
        <p className="mb-8 text-lg text-black/60">
          Müasir web texnologiyaları ilə işləyirəm və istifadəçi təcrübəsinə
          xüsusi diqqət yetirirəm. Layihələrim və məqalələrimlə tanış olmaq üçün
          davam edin.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black/80"
          >
            Layihələrə bax
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-black/5 px-6 py-3 text-sm font-medium transition-colors hover:bg-black/10"
          >
            Əlaqə saxla
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;