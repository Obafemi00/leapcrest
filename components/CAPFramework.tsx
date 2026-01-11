"use client";

import { motion } from "framer-motion";

const modules = [
  {
    phase: "Foundation Phase",
    description:
      "Building core employability skills, self-awareness, and professional identity. Establishing baseline competencies and career clarity.",
    duration: "Months 1-4",
    focus: "Skill Assessment & Foundation Building",
  },
  {
    phase: "Accelerator / Placement Readiness Phase",
    description:
      "Intensive preparation for placement season. Interview skills, technical readiness, industry-specific training, and portfolio development.",
    duration: "Months 5-8",
    focus: "Placement Preparation & Industry Alignment",
  },
  {
    phase: "Advanced Placement & Higher Education Phase",
    description:
      "Supporting advanced placements, higher education applications, and career acceleration. Long-term career planning and mentorship.",
    duration: "Months 9-12",
    focus: "Advanced Opportunities & Career Growth",
  },
];

export default function CAPFramework() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-dark/50">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center"
        >
          CAP<sup>©</sup> Framework
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-gray-300 mb-12 text-center max-w-3xl mx-auto"
        >
          A three-phase, year-long journey designed to transform graduates into
          industry-ready professionals.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-background/60 backdrop-blur-sm border border-primary/20 rounded-lg p-8 hover:border-primary/40 transition-all flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Phase {index + 1}
                </span>
                <span className="text-sm text-gray-400">{module.duration}</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                {module.phase}
              </h3>

              <p className="text-gray-300 mb-4 flex-grow leading-relaxed">
                {module.description}
              </p>

              <div className="pt-4 border-t border-primary/20">
                <p className="text-sm text-primary font-medium">
                  {module.focus}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
