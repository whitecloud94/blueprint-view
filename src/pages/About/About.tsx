import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PageTransition } from "../../components/layout/PageTransition.tsx";
import { COMMON_STYLES } from "../../constants/styles.ts";
import { RESUME_CONTENT } from "../../data";

const STYLES = {
  main: "w-full max-w-[640px] bg-white rounded-[32px] sm:rounded-[40px] px-5 sm:px-10 pt-10 sm:pt-12 pb-6 sm:pb-8 shadow-sm border border-white mt-0",
  header: `${COMMON_STYLES.sectionHeader} mb-6`,
  dot: COMMON_STYLES.dot,
  contentWrapper: "prose prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-indigo-600 prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-hr:border-gray-100",
};

const SectionHeader: React.FC<{ label: string }> = ({ label }) => (
  <div className={STYLES.header}>
    <div className={STYLES.dot} />
    {label}
  </div>
);

const About: React.FC = () => {
  return (
    <PageTransition direction="left">
      <div className="w-full flex justify-center">
        <main className={STYLES.main}>
          <SectionHeader label="About Me" />
          
          <div className={STYLES.contentWrapper}>
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => (
                  <div className="flex flex-col-reverse sm:flex-row justify-between items-center sm:items-start gap-6 mb-12 pb-8 border-b border-gray-100">
                    <div className="flex-1 text-center sm:text-left">
                      <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-2" {...props} />
                      <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                         <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold border border-indigo-100">Full Stack Developer</span>
                         <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-bold border border-gray-100">FinTech Specialist</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#F2F2F2] border-[4px] sm:border-[6px] border-[#FAFAFA] overflow-hidden shadow-lg shadow-gray-200/50 ring-1 ring-black/5 transition-transform duration-500 hover:scale-105">
                        <img
                          src="/MyPhoto.jpg"
                          alt="Profile"
                          className="!block !w-full !h-full !max-w-none !m-0 object-cover object-top scale-150"
                        />
                      </div>
                    </div>
                  </div>
                ),
                h2: ({node, ...props}) => (
                  <h2 className="text-xl font-bold mt-12 mb-6 flex items-center gap-2 text-indigo-600" {...props}>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                    {props.children}
                  </h2>
                ),
                h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-8 mb-4 text-gray-800" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 mb-6" {...props} />,
                li: ({node, ...props}) => <li className="text-gray-600 leading-relaxed" {...props} />,
                hr: () => <hr className="my-10 border-gray-100" />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-indigo-500 bg-indigo-50/50 py-4 px-6 rounded-r-2xl my-8 italic text-gray-700" {...props} />
                ),
                code: ({node, ...props}) => (
                  <code className="bg-gray-100 text-indigo-600 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                ),
              }}
            >
              {RESUME_CONTENT}
            </ReactMarkdown>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default About;
