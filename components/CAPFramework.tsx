"use client";

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
    <section className="py-20 px-6 lg:px-8 bg-background-light">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
          CAP<sup>©</sup> Framework
        </h2>

        <p className="text-lg text-text-secondary mb-16 leading-relaxed max-w-3xl">
          A three-phase, year-long journey designed to transform graduates into
          industry-ready professionals.
        </p>

        <div className="space-y-12">
          {modules.map((module, index) => (
            <div key={index} className="border-t border-border pt-8">
              <div className="flex items-start justify-between mb-4">
                <span className="text-sm font-medium text-primary uppercase tracking-wide">
                  Phase {index + 1}
                </span>
                <span className="text-sm text-text-secondary">{module.duration}</span>
              </div>

              <h3 className="text-2xl font-bold text-text-primary mb-4">
                {module.phase}
              </h3>

              <p className="text-text-secondary mb-4 leading-relaxed max-w-3xl">
                {module.description}
              </p>

              <p className="text-sm text-primary font-medium">
                {module.focus}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
