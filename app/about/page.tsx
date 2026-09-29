import React from 'react';
import type { Metadata } from 'next';
import {
  ShieldCheck,
  Target,
  Eye,
  Award,
  Sparkles,
  Users,
  Compass,
  Cpu,
  BookOpen,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About NIST University | History, Mission, Vision & Leadership',
  description:
    'Learn about NIST University’s legacy of academic rigor, research innovation, leadership, mission, vision, and campus culture.'
};

export default function AboutPage() {
  const coreValues = [
    {
      title: 'Excellence',
      description:
        'Pursuing unmatched standards in pedagogy, experimental research, and intellectual output across every academic discipline.'
    },
    {
      title: 'Innovation',
      description:
        'Fostering entrepreneurial curiosity, novel problem-solving, and technology transfer that impacts society positively.'
    },
    {
      title: 'Integrity',
      description:
        'Upholding the highest benchmarks of academic honesty, ethical conduct, transparency, and personal responsibility.'
    },
    {
      title: 'Leadership',
      description:
        'Empowering students to think critically, lead technical teams, and steer transformative global organizations.'
    },
    {
      title: 'Inclusivity',
      description:
        'Cultivating a diverse, respectful collegiate culture where talent from all backgrounds flourishes collaboratively.'
    }
  ];

  const leadership = [
    {
      name: '[OFFICIAL LEADERSHIP NAME REQUIRED]',
      title: 'Chancellor / Chairman',
      bio: 'Visionary leadership guiding NIST University toward global research standing and transformative academic standards.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80'
    },
    {
      name: '[OFFICIAL LEADERSHIP NAME REQUIRED]',
      title: 'Vice Chancellor',
      bio: 'Distinguished academician with decades of leadership in engineering education, curriculum governance, and research development.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80'
    },
    {
      name: '[OFFICIAL LEADERSHIP NAME REQUIRED]',
      title: 'Dean of Academic Affairs',
      bio: 'Championing dynamic CBCS curricula, international accreditation compliance, and industry partnerships.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80'
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="bg-[#0b132b] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="/images/about_campus.jpg"
            alt="NIST Campus"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-3">
            Legacy &amp; Future
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            About NIST University
          </h1>
          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            "Engineering Excellence. Inspiring Innovation. Shaping the Future."
          </p>
        </div>
      </section>

      {/* Overview & History */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 block mb-2">
                Our History &amp; Legacy
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                [EDITABLE CONTENT — approved institutional history]
              </h2>
              <div className="mt-6 space-y-4 text-slate-600 text-base leading-relaxed">
                <p>
                  [EDITABLE CONTENT — replace with a verified history and founding information.]
                </p>
                <p>
                  [EDITABLE CONTENT — add a verified campus description.]
                </p>
                <p>
                  [EDITABLE CONTENT — add verified alumni and institutional information.]
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-sm font-bold text-cyan-600">[OFFICIAL INFORMATION REQUIRED]</span>
                  <p className="text-xs text-slate-500 mt-1">Year Founded</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-sm font-bold text-blue-600">[OFFICIAL INFORMATION REQUIRED]</span>
                  <p className="text-xs text-slate-500 mt-1">Alumni Network</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="/images/about_campus.jpg"
                alt="NIST University Campus Architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                <p className="text-sm font-semibold">[EDITABLE CONTENT — verified image caption]</p>
                <p className="text-xs text-slate-300">[OFFICIAL LOCATION REQUIRED]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 block mb-1">
                  Our Mission
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Academic Rigor &amp; Ethical Values
                </h3>
                <blockquote className="mt-4 text-slate-700 text-lg italic border-l-4 border-cyan-500 pl-4 py-1 leading-relaxed">
                  "To provide quality education, encourage innovation and research, and develop
                  skilled professionals with strong ethical and social values."
                </blockquote>
              </div>
              <ul className="mt-8 space-y-2.5 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                  <span>[EDITABLE CONTENT — approved mission detail]</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                  <span>[EDITABLE CONTENT — approved mission detail]</span>
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
                  Our Vision
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Innovation for a Changing World
                </h3>
                <blockquote className="mt-4 text-slate-700 text-lg italic border-l-4 border-blue-500 pl-4 py-1 leading-relaxed">
                  "To create an academically excellent and innovation-driven institution that prepares
                  students for a rapidly changing world."
                </blockquote>
              </div>
              <ul className="mt-8 space-y-2.5 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>[EDITABLE CONTENT — approved vision detail]</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>[EDITABLE CONTENT — approved vision detail]</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 block mb-2">
              The Guiding Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Core Values
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              The ethical compass that defines how we teach, mentor, innovate, and govern.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreValues.map((v, i) => (
              <div
                key={v.title}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-cyan-500 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-cyan-600 font-mono">0{i + 1}</span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">{v.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research & Innovation + Industry Collaboration */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-2">
                Discovery &amp; Translation
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Research &amp; Industry Collaboration
              </h2>
              <div className="mt-6 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  [EDITABLE CONTENT — add verified research and innovation information.]
                </p>
                <p>
                  [EDITABLE CONTENT — add verified industry collaboration information.]
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/academics"
                  className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-500 transition shadow-md"
                >
                  Explore Academic Research
                </a>
                <a
                  href="/contact"
                  className="px-6 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 transition border border-white/10"
                >
                  Partner With Us
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/80 p-6 rounded-2xl border border-white/10">
                <Cpu className="w-8 h-8 text-cyan-400 mb-3" />
                <h4 className="font-bold text-white text-base">AI &amp; Robotics Cell</h4>
                <p className="text-xs text-slate-400 mt-1 leading-snug">
                  Autonomous agents, neural network acceleration &amp; drone engineering.
                </p>
              </div>
              <div className="bg-slate-800/80 p-6 rounded-2xl border border-white/10">
                <Sparkles className="w-8 h-8 text-sky-400 mb-3" />
                <h4 className="font-bold text-white text-base">Renewable Energy Hub</h4>
                <p className="text-xs text-slate-400 mt-1 leading-snug">
                  Solar power integration, smart micro-grids, and EV motor testing.
                </p>
              </div>
              <div className="bg-slate-800/80 p-6 rounded-2xl border border-white/10">
                <BookOpen className="w-8 h-8 text-indigo-400 mb-3" />
                <h4 className="font-bold text-white text-base">Indexed Publications</h4>
                <p className="text-xs text-slate-400 mt-1 leading-snug">
                  Regular research papers in SCI and Scopus peer-reviewed journals.
                </p>
              </div>
              <div className="bg-slate-800/80 p-6 rounded-2xl border border-white/10">
                <Award className="w-8 h-8 text-amber-400 mb-3" />
                <h4 className="font-bold text-white text-base">Patents &amp; IP Cell</h4>
                <p className="text-xs text-slate-400 mt-1 leading-snug">
                  Institutional legal assistance for student and faculty patent filings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 block mb-2">
              Governance &amp; Stewardship
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              University Leadership
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Distinguished educators and administrators steering NIST toward institutional excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((l) => (
              <div
                key={l.title}
                className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition p-6 text-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-cyan-500 shadow-inner">
                  <img
                    src={l.image}
                    alt={l.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{l.name}</h3>
                <span className="text-xs font-semibold text-cyan-600 block mt-1">{l.title}</span>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">{l.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
