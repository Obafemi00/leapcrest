"use client";

export default function ProblemReframe() {
  return (
    <section className="h-screen flex items-center justify-center px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-4xl w-full">
        <div className="border-l-4 border-primary pl-8">
          <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-6 leading-tight">
            This is an institutional problem,
            <br />
            <span className="text-primary">not a student-level problem.</span>
          </h3>

          <div className="space-y-5 text-text-secondary leading-relaxed">
            <p>
              The challenge lies in systemic gaps between academic delivery and
              industry expectations. Individual student motivation, while
              important, cannot compensate for structural misalignments.
            </p>
            <p>
              Institutions need systematic interventions that bridge curriculum
              and placement outcomes—programs that are embedded, measured, and
              aligned with institutional goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
