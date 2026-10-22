import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EDUCATIONAL_LESSONS } from "@/lib/educationData";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Calculator,
} from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return EDUCATIONAL_LESSONS.map((lesson) => ({
    slug: lesson.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const lesson = EDUCATIONAL_LESSONS.find((l) => l.slug === params.slug);
  if (!lesson) return { title: "Lesson Not Found" };
  return {
    title: lesson.title,
    description: lesson.summary,
  };
}

export default function LessonDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const currentIndex = EDUCATIONAL_LESSONS.findIndex((l) => l.slug === params.slug);
  if (currentIndex === -1) notFound();

  const lesson = EDUCATIONAL_LESSONS[currentIndex];
  const prevLesson = currentIndex > 0 ? EDUCATIONAL_LESSONS[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < EDUCATIONAL_LESSONS.length - 1 ? EDUCATIONAL_LESSONS[currentIndex + 1] : null;

  return (
    <article className="py-12 sm:py-20 bg-[#0B0F12]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-brand-teal transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Academy Curriculum</span>
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-teal/20 text-brand-teal border border-brand-teal/30">
              {lesson.category}
            </span>
            <span className="text-xs text-gray-400 font-mono">
              Level: {lesson.difficulty}
            </span>
            <span className="text-xs text-gray-500 font-mono">• {lesson.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight mb-4">
            {lesson.title}
          </h1>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            {lesson.summary}
          </p>
        </div>

        {/* Key Takeaways Box */}
        <div className="bg-[#11161B] border border-brand-teal/20 rounded-3xl p-6 sm:p-8 mb-12 shadow-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-brand-teal mb-4 flex items-center gap-2 font-display">
            <GraduationCap className="w-4 h-4" />
            <span>Essential Key Takeaways</span>
          </h2>
          <ul className="space-y-3">
            {lesson.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Body */}
        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-sm sm:text-base space-y-6 mb-16">
          <div className="whitespace-pre-line">{lesson.content}</div>
        </div>

        {/* Calculators Banner if on Risk Management Lesson */}
        {lesson.slug.includes("risk") && (
          <div className="bg-brand-teal/10 border border-brand-teal/30 rounded-2xl p-6 mb-16 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">
                Calculate your lot sizes immediately
              </h3>
              <p className="text-xs text-gray-400">
                Use our automated Position Size Calculator to eliminate guesswork.
              </p>
            </div>
            <Link
              href="/tools"
              className="px-4 py-2.5 rounded-xl bg-brand-teal text-[#0B0F12] font-bold text-xs uppercase flex items-center gap-1.5 whitespace-nowrap"
            >
              <Calculator className="w-4 h-4" />
              <span>Open Calculator</span>
            </Link>
          </div>
        )}

        {/* Next / Previous Lesson Navigation */}
        <div className="pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevLesson ? (
            <Link
              href={`/learn/${prevLesson.slug}`}
              className="bg-[#11161B] hover:bg-[#161D24] p-5 rounded-2xl border border-white/[0.06] transition-all flex flex-col group"
            >
              <span className="text-[10px] text-gray-500 uppercase font-mono mb-1">
                ← Previous Module
              </span>
              <span className="text-xs font-bold text-white group-hover:text-brand-teal transition-colors">
                {prevLesson.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextLesson && (
            <Link
              href={`/learn/${nextLesson.slug}`}
              className="bg-[#11161B] hover:bg-[#161D24] p-5 rounded-2xl border border-white/[0.06] transition-all flex flex-col items-end text-right group"
            >
              <span className="text-[10px] text-brand-teal uppercase font-mono mb-1">
                Next Module →
              </span>
              <span className="text-xs font-bold text-white group-hover:text-brand-teal transition-colors">
                {nextLesson.title}
              </span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
