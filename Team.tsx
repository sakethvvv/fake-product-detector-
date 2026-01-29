import React from 'react';
import { TeamMember } from '../types';

const Team: React.FC = () => {
  const team: TeamMember[] = [
    { name: "Saketh Vedullapalli", role: "AI Core Architect", image: "saketh.jpg" },
    { name: "Jagadeesh Goda", role: "Backend Protocol", image: "jagadeesh.jpg" },
    { name: "Madhuri Palla", role: "Interface Logic", image: "madhuri.jpg" },
    { name: "Akash kumar kosetti", role: "Data Scryer", image: "akash.jpg" },
    { name: "Sowmya Betha", role: "Sentiment Analyst", image: "sowmya.jpg" },
    { name: "Saranya D", role: "UX Infrastructure", image: "saranya.jpg" }
  ];

  return (
    <section id="team" className="py-16 md:py-24 bg-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-4xl font-extrabold mb-4">Our Elite Team</h2>
        <p className="text-[#4B5563] text-sm md:text-base font-medium mb-12 md:mb-16 max-w-2xl mx-auto">
          The brilliant minds working together to secure the future of online shopping.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="group bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center"
            >
              <div className="relative mb-4 md:mb-6 overflow-hidden rounded-2xl aspect-square w-full max-w-[180px] shadow-inner">
                <img
                  src={`./${member.image}`}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <h4 className="font-bold text-[#111827] text-sm md:text-base leading-tight mb-1">
                {member.name}
              </h4>
              <p className="text-[#2563EB] text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;