import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Contact = () => {
  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:your.email@example.com",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/yourusername",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/yourusername",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/yourusername",
    },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <span className="mb-2 inline-block rounded-full bg-black/5 px-3 py-1 text-sm font-medium">
          Əlaqə
        </span>
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
          Mənimlə Əlaqə Saxlayın
        </h1>
        <p className="text-black/60">
          Layihələr və əməkdaşlıq təklifləri üçün mənimlə əlaqə saxlaya
          bilərsiniz.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-4 sm:grid-cols-2"
      >
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl border bg-white p-6 transition-all hover:shadow-md"
          >
            <link.icon className="h-6 w-6" />
            <span className="font-medium">{link.name}</span>
          </a>
        ))}
      </motion.div>
    </div>
  );
};

export default Contact;