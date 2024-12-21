import { motion } from "framer-motion";
import { Download } from "lucide-react";

const CV = () => {
  const education = [
    {
      school: "Azərbaycan Texniki Universiteti",
      degree: "Kompüter Mühəndisliyi",
      years: "2018-2022",
    },
  ];

  const experience = [
    {
      company: "Tech Solutions LLC",
      position: "Frontend Developer",
      years: "2022-Present",
      description:
        "React və TypeScript istifadə edərək müxtəlif web layihələrinin hazırlanması",
    },
    {
      company: "Digital Agency",
      position: "Junior Web Developer",
      years: "2021-2022",
      description:
        "Kiçik və orta ölçülü biznes layihələri üçün web həllərinin hazırlanması",
    },
  ];

  const skills = [
    "HTML/CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Git",
    "Tailwind CSS",
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <span className="mb-2 inline-block rounded-full bg-black/5 px-3 py-1 text-sm font-medium">
          CV
        </span>
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">İş Təcrübəm</h1>
        <div className="flex justify-center">
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black/80"
          >
            <Download className="h-4 w-4" />
            CV-ni yüklə
          </a>
        </div>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold">Təhsil</h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div
              key={edu.school}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <h3 className="font-medium">{edu.school}</h3>
              <p className="text-sm text-black/60">{edu.degree}</p>
              <p className="text-sm text-black/40">{edu.years}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold">İş Təcrübəsi</h2>
        <div className="space-y-4">
          {experience.map((exp) => (
            <div
              key={exp.company}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <h3 className="font-medium">{exp.company}</h3>
              <p className="text-sm text-black/60">{exp.position}</p>
              <p className="text-sm text-black/40">{exp.years}</p>
              <p className="mt-2 text-sm text-black/60">{exp.description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold">Bacarıqlar</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-black/5 px-3 py-1 text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default CV;