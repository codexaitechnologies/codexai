import { useParams, Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  Calendar,
  Award,
  Target,
  Users,
  BookOpen,
  Zap,
  Star,
  PlayCircle,
  IndianRupee,
  ChevronDown,
  ChevronUp,
  Layers,
  BadgeCheck,
} from "lucide-react";
import { useCourses } from "../context/CoursesContext";
import { getIconComponent } from "../utils/iconMap";

function extractColorFromClass(iconClass: string): string {
  const match = iconClass.match(/text-(\w+)-\d+/);
  return match ? match[1] : "blue";
}

// Color maps — avoids Tailwind's dynamic class purging limitations
const colorMap: Record<string, { bg: string; border: string; text: string; badge: string; ring: string }> = {
  blue:   { bg: "rgba(37,99,235,0.12)",   border: "rgba(59,130,246,0.35)",  text: "#60a5fa", badge: "rgba(37,99,235,0.2)",  ring: "#3b82f6" },
  purple: { bg: "rgba(126,34,206,0.12)",  border: "rgba(168,85,247,0.35)", text: "#c084fc", badge: "rgba(126,34,206,0.2)", ring: "#a855f7" },
  orange: { bg: "rgba(194,65,12,0.12)",   border: "rgba(249,115,22,0.35)", text: "#fb923c", badge: "rgba(194,65,12,0.2)",  ring: "#f97316" },
  green:  { bg: "rgba(21,128,61,0.12)",   border: "rgba(34,197,94,0.35)",  text: "#4ade80", badge: "rgba(21,128,61,0.2)",  ring: "#22c55e" },
};

function getColor(color: string) {
  return colorMap[color] ?? colorMap.blue;
}

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { courses } = useCourses();
  const [openModule, setOpenModule] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, [courseId]);

  const handleEnrollment = () => navigate(`/enrollment/${courseId}`);

  const courseData = courses.find((c) => c.courseId === courseId);
  const course = courseData as any;

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white">Course Not Found</h1>
          <p className="text-slate-500 mb-6">The course you're looking for doesn't exist.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const Icon = getIconComponent(course.icon || course.iconName || "BookOpen");
  const color = course.colorClass ? extractColorFromClass(course.colorClass.icon) : "blue";
  const c = getColor(color);
  const courseHours = course?.hours ?? course?.totalHours ?? course?.durationHours;
  const heroImage = course?.image ||
    "https://png.pngtree.com/thumb_back/fw800/background/20250329/pngtree-robot-head-facing-the-right-side-in-black-and-white-against-image_17151288.jpg";

  const perks = [
    { icon: PlayCircle,  label: "Live Sessions + Recordings" },
    { icon: Layers,      label: "Hands-on Projects" },
    { icon: Users,       label: "1:1 Mentorship" },
    { icon: BadgeCheck,  label: "Certificate of Completion" },
    { icon: Target,      label: "Interview Preparation" },
    { icon: BookOpen,    label: "Lifetime Resource Access" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[72vh] flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={heroImage} alt={course.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full container mx-auto px-4 pb-14 pt-28">
          {/* Back */}
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
                style={{ background: c.badge, borderColor: c.border, color: c.text }}
              >
                <Icon className="w-3.5 h-3.5" /> {course.duration}
              </span>
              {course.isFlagship && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/20 border border-yellow-400/40 text-yellow-300">
                  <Star className="w-3 h-3 fill-yellow-300" /> Flagship Course
                </span>
              )}
              {courseHours && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/20 text-white/80">
                  <Clock className="w-3 h-3" /> {courseHours} hrs
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 max-w-4xl leading-tight">
              {course.title}
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mb-8 leading-relaxed">{course.description}</p>

            {/* Hero quick stats */}
            <div className="flex flex-wrap gap-6">
              {course.projectCount && (
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Zap className="w-4 h-4" style={{ color: c.text }} />
                  <span>{course.projectCount}+ Projects</span>
                </div>
              )}
              {course.curriculum?.length > 0 && (
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <BookOpen className="w-4 h-4" style={{ color: c.text }} />
                  <span>{course.curriculum.length} Modules</span>
                </div>
              )}
              {course.highlights?.length > 0 && (
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <CheckCircle className="w-4 h-4" style={{ color: c.text }} />
                  <span>{course.highlights.length} Key Highlights</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT + STICKY CARD ───────────────────────────────── */}
      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">

            {/* ── LEFT CONTENT ─────────────────────────── */}
            <div className="flex-1 min-w-0 space-y-16">

              {/* What's Included */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-7 rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">What's Included</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {perks.map(({ icon: PerkIcon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 p-4 rounded-xl border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                        <PerkIcon className="w-4 h-4" style={{ color: c.text }} />
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Highlights */}
              {course.highlights?.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-7 rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Course Highlights</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {course.highlights.map((highlight: string, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-3 p-4 rounded-xl border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                      >
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: c.text }} />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Curriculum — accordion */}
              {course.curriculum?.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-7 rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Curriculum</h2>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 mb-6 ml-5">Week-by-week structured learning path</p>

                  <div className="space-y-3">
                    {course.curriculum.map((module: any, idx: number) => {
                      const isOpen = openModule === idx;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.04 }}
                          className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                        >
                          <button
                            onClick={() => setOpenModule(isOpen ? null : idx)}
                            className="w-full flex items-center gap-4 px-5 py-4 text-left bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                          >
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                              style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
                            >
                              {String(idx + 1).padStart(2, "0")}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-slate-400 dark:text-slate-500">{module.week}</p>
                              <p className="font-semibold text-slate-900 dark:text-white truncate">{module.title}</p>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <span className="hidden sm:block text-xs text-slate-400">{module.topics?.length} topics</span>
                              {isOpen
                                ? <ChevronUp className="w-4 h-4 text-slate-400" />
                                : <ChevronDown className="w-4 h-4 text-slate-400" />}
                            </div>
                          </button>

                          {isOpen && (
                            <div className="px-5 pb-5 pt-1 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
                              <ul className="space-y-2 mt-3">
                                {module.topics.map((topic: string, topicIdx: number) => (
                                  <li key={topicIdx} className="flex items-start gap-3">
                                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: c.text }} />
                                    <span className="text-sm text-slate-600 dark:text-slate-400">{topic}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Learning Outcomes */}
              {course.outcomes?.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-7 rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Learning Outcomes</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {course.outcomes.map((outcome: string, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.06 }}
                        className="flex items-start gap-3 p-5 rounded-xl border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: c.bg }}>
                          <Award className="w-4 h-4" style={{ color: c.text }} />
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{outcome}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Features grid */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-7 rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Why This Course?</h2>
                </div>
                <div className="grid sm:grid-cols-3 gap-5">
                  {[
                    { icon: Users,    title: "1:1 Mentorship",    desc: "Personalised guidance from industry practitioners every step of the way." },
                    { icon: BookOpen, title: "Lifetime Access",   desc: "All recordings, notes, and resources — available to you forever." },
                    { icon: Target,   title: "Interview Prep",    desc: "Mock interviews, resume reviews, and placement support included." },
                  ].map(({ icon: FIcon, title, desc }) => (
                    <div key={title} className="p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-center">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                        <FIcon className="w-5 h-5" style={{ color: c.text }} />
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT STICKY CARD ────────────────────── */}
            <aside className="w-full lg:w-[360px] lg:sticky lg:top-24 flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-black/40 overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video">
                  <img src={heroImage} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-white text-xs flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {courseHours ? `${courseHours} hrs` : course.duration}
                    </span>
                    {course.isFlagship && (
                      <span className="text-xs font-bold bg-yellow-400/90 text-black px-2 py-0.5 rounded-full">Flagship</span>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  {/* Price */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Course Fee</p>
                      <div className="flex items-center gap-1">
                        <IndianRupee className="w-5 h-5 text-slate-800 dark:text-white" />
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">
                          {course.price !== "" && course.price != null ? course.price : "—"}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full font-medium border" style={{ background: c.bg, borderColor: c.border, color: c.text }}>
                      {course.duration}
                    </span>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={handleEnrollment}
                    className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:shadow-blue-500/30 transition-all active:scale-[0.98] text-base"
                  >
                    Enroll Now →
                  </button>

                  <p className="text-center text-xs text-slate-400 dark:text-slate-500">No hidden charges · Secure payment</p>

                  {/* Perks checklist */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                    {perks.map(({ icon: PIcon, label }) => (
                      <div key={label} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                        <PIcon className="w-4 h-4 flex-shrink-0" style={{ color: c.text }} />
                        {label}
                      </div>
                    ))}
                  </div>

                  {/* Quick stats */}
                  {(course.projectCount || course.curriculum?.length) && (
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                      {course.projectCount && (
                        <div className="text-center p-3 rounded-xl" style={{ background: c.bg }}>
                          <p className="text-xl font-bold" style={{ color: c.text }}>{course.projectCount}+</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Projects</p>
                        </div>
                      )}
                      {course.curriculum?.length > 0 && (
                        <div className="text-center p-3 rounded-xl" style={{ background: c.bg }}>
                          <p className="text-xl font-bold" style={{ color: c.text }}>{course.curriculum.length}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Modules</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Contact nudge */}
              <div className="mt-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Have questions?</p>
                <Link to="/contact" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  Talk to our team →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA BANNER ────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-3xl p-10 md:p-14 text-center overflow-hidden"
          >
            {/* Decorative circles */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/5 rounded-full" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-white/5 rounded-full" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Ready to Transform Your Career?</h2>
              <p className="text-blue-100 mb-8 max-w-lg mx-auto">Join hundreds of students already learning with CodeXAI's industry-aligned programmes.</p>
              <button
                onClick={handleEnrollment}
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-3.5 rounded-xl hover:shadow-xl hover:shadow-black/20 transition-all active:scale-[0.98]"
              >
                Enroll Now → Get Started Today
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
