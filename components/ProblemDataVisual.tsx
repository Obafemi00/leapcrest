"use client";

import AnimatedStat from "./AnimatedStat";
import CompactSpeedometer from "./CompactSpeedometer";

export default function ProblemDataVisual() {
  return (
    <div className="w-full bg-white rounded-lg py-12 md:py-16 px-6 md:px-12 lg:px-16">
      <div className="max-w-[95%] lg:max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN - Hero Stat */}
          <div className="flex items-center justify-center lg:justify-start">
            <AnimatedStat
              targetValue={15}
              suffix=" Million"
              supportingText="graduates enter the Indian workforce every year"
            />
          </div>

          {/* RIGHT COLUMN - Speedometer Metrics (2x2 Grid) */}
          <div className="grid grid-cols-2 gap-8 md:gap-12">
            {/* Speedometer 1: 45-50% */}
            <CompactSpeedometer
              value={47.5}
              caption="Only 45–50% are considered employable for any role beyond basic clerical work."
            />

            {/* Speedometer 2: 30-35% */}
            <CompactSpeedometer
              value={32.5}
              caption="For white-collar / corporate roles, employability drops further to 30–35%."
            />

            {/* Speedometer 3: 85% */}
            <CompactSpeedometer
              value={85}
              caption="85% of graduates lack industry-ready skills."
            />

            {/* Speedometer 4: Time-based (2.5 years) */}
            <CompactSpeedometer
              value={90}
              isTimeBased={true}
              timeValue="2.5 years"
              caption="Average time for a fresh graduate to become productive in the workplace."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
