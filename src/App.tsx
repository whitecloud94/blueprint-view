import React from 'react';
import {
    ArrowUpRight,
    Briefcase,
    CarFront,
    ChevronRight,
    Code2,
    Copy,
    Cpu,
    Globe,
    Home,
    Instagram,
    Linkedin,
    Moon,
    Plus,
    ShoppingBag,
    Terminal,
    Twitter,
    User
} from 'lucide-react';

const App: React.FC = () => {
    return (
        // py-8을 sm:py-12로 조절하여 모바일에서 상단 여백 확보
        <div className="min-h-screen bg-[#F3F3F3] text-[#1A1A1A] font-sans py-4 sm:py-8 px-4 flex justify-center items-start selection:bg-gray-200">

            <div className="w-full max-w-[640px] space-y-6">

                {/* --- Navigation --- */}
                <nav className="sticky top-4 sm:top-6 z-50 transition-all duration-300">
                    <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] p-2 pl-4 sm:pl-6 pr-2 flex justify-between items-center">
                        {/* 모바일에서 간격 축소 (gap-4 -> sm:gap-6) */}
                        <div className="flex gap-4 sm:gap-6 text-gray-400">
                            <button className="hover:text-black transition-colors hover:scale-110 duration-200"><Home size={18} className="sm:w-5 sm:h-5" /></button>
                            <button className="hover:text-black transition-colors hover:scale-110 duration-200"><User size={18} className="sm:w-5 sm:h-5" /></button>
                            <button className="hover:text-black transition-colors hover:scale-110 duration-200"><Briefcase size={18} className="sm:w-5 sm:h-5" /></button>
                            <button className="hover:text-black transition-colors hover:scale-110 duration-200"><ShoppingBag size={18} className="sm:w-5 sm:h-5" /></button>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <button className="text-gray-400 hover:text-black transition-colors p-2 hover:rotate-12 duration-300"><Moon size={18} className="sm:w-5 sm:h-5" /></button>
                            <button className="bg-[#1A1A1A] text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-[14px] sm:rounded-[16px] text-[11px] sm:text-[13px] font-bold flex items-center gap-1.5 sm:gap-2 hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/10">
                                <div className="bg-white/20 rounded-full p-0.5"><Plus size={10} strokeWidth={4} /></div>
                                <span className="hidden xs:inline">Hire Me</span>
                                <span className="xs:hidden">Hire</span>
                            </button>
                        </div>
                    </div>
                </nav>

                <main className="bg-white rounded-[32px] sm:rounded-[40px] px-5 sm:px-8 pt-10 sm:pt-12 pb-6 sm:pb-8 shadow-sm border border-white">
                    {/* --- Hero Section --- */}
                    <section className="mb-10 sm:mb-14 relative">
                        {/* 상단 Developer 텍스트는 좌측 정렬 유지 */}
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-2 text-[13px] sm:text-[14px] text-gray-400 font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                Developer
                            </div>
                        </div>

                        {/* 메인 컨텐츠 영역: 모바일에서는 위아래로, 데스크탑에서는 좌우로 배치 */}
                        <div className="flex flex-col-reverse sm:flex-row justify-between items-center sm:items-start gap-8 sm:gap-4 text-center sm:text-left">

                            {/* 좌측: 텍스트 및 버튼 섹션 */}
                            <div className="space-y-6 w-full">
                                <div className="space-y-3">
                                    <h1 className="text-[32px] sm:text-[42px] font-bold tracking-tight text-[#1A1A1A] leading-tight">
                                        I'm Daekyoung KIM
                                    </h1>
                                    <p className="text-gray-500 text-[15px] sm:text-[17px] leading-[1.6] max-w-[380px] mx-auto sm:mx-0">
                                        Software Engineer focused on turning complex problems into simple, functional code.
                                        Currently crafting experiences as a
                                        <span className="relative ml-1.5 inline-block">
                        <span className="relative z-10 text-indigo-600 font-bold italic">freelancer.</span>
                        <span className="absolute bottom-0.5 left-0 w-full h-[8px] bg-indigo-50 -rotate-1"></span>
                    </span>
                                    </p>
                                </div>
                                <div className="flex justify-center sm:justify-start gap-3 pt-2">
                                    <button className="bg-[#1A1A1A] text-white px-5 py-3 rounded-[16px] sm:rounded-[18px] text-[12px] sm:text-[13px] font-bold flex items-center gap-2 shadow-xl shadow-black/10 hover:bg-black transition-all hover:-translate-y-0.5">
                                        <div className="bg-white/20 rounded-full p-0.5"><Plus size={10} strokeWidth={4} /></div> Hire Me
                                    </button>
                                    <button className="bg-white border border-gray-200 text-[#1A1A1A] px-5 py-3 rounded-[16px] sm:rounded-[18px] text-[12px] sm:text-[13px] font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
                                        <Copy size={14} /> Copy Email
                                    </button>
                                </div>
                            </div>

                            {/* 우측: 아바타 + RUNTIME 뱃지 (수직 정렬) */}
                            <div className="flex flex-col items-center gap-4 flex-shrink-0">
                                {/* 아바타 이미지 */}
                                <div className="relative">
                                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#F2F2F2] border-[4px] sm:border-[6px] border-[#FAFAFA] overflow-hidden shadow-inner">
                                        <img src="/src/resource/img/MyPhoto.jpg" alt="Profile" className="w-full h-full object-cover object-center" />
                                    </div>
                                </div>

                                {/* RUNTIME 뱃지: 아바타 바로 밑으로 이동 */}
                                <div className="bg-[#F5F3FF] text-[#7C3AED] px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide flex items-center gap-1.5 border border-[#EDE9FE] shadow-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-bounce" />
                                    RUNTIME: WORKING🔥
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* --- Projects Section --- */}
                    <section className="bg-[#F9F9F9] rounded-[28px] sm:rounded-[32px] p-1.5 sm:p-2 space-y-1 mb-6 border border-gray-50">
                        <div className="flex justify-between items-center px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-400">
                                <div className="w-2 h-2 rounded-full bg-gray-300" />
                                Projects
                            </div>
                            <button className="bg-white border border-gray-200 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold text-gray-600 flex items-center gap-1 hover:border-gray-300 transition-colors shadow-sm">
                                View All <ArrowUpRight size={12} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            {[
                                { title: 'Toyota Financial Core', sub: "Now I'm here!", icon: <CarFront size={20} className="sm:w-[22px]" />, bg: 'bg-indigo-600', active: true },
                                { title: 'Project1', sub: 'Sub Context1', icon: <Code2 size={20} className="sm:w-[22px]" />, bg: 'bg-[#1A1A1A]' },
                                { title: 'Project2', sub: 'Sub Context2', icon: <Terminal size={20} className="sm:w-[22px]" />, bg: 'bg-[#1A1A1A]' },
                                { title: 'Project3', sub: 'Sub Context3', icon: <Cpu size={20} className="sm:w-[22px]" />, bg: 'bg-[#1A1A1A]' },
                            ].map((item, i) => (
                                <div key={i} className={`group rounded-[20px] sm:rounded-[24px] p-3 sm:p-4 pl-4 sm:pl-5 flex items-center justify-between transition-all duration-300 cursor-pointer border ${item.active ? 'bg-white border-indigo-100 shadow-md sm:scale-[1.02]' : 'bg-white border-transparent hover:border-gray-50 sm:hover:scale-[1.01]'}`}>
                                    <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                                        <div className={`w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 ${item.bg} rounded-full flex items-center justify-center text-white shadow-md group-hover:rotate-6 transition-transform`}>
                                            {item.icon}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-[14px] sm:text-[16px] font-bold text-gray-900 truncate">{item.title}</h3>
                                                {item.active && <span className="hidden xs:inline-block text-[8px] bg-indigo-600 text-white px-1.5 py-0.5 rounded-md font-black animate-pulse">ACTIVE</span>}
                                            </div>
                                            <p className="text-[12px] sm:text-[14px] text-gray-500 font-medium truncate">{item.sub}</p>
                                        </div>
                                    </div>
                                    <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center transition-colors ${item.active ? 'text-indigo-600' : 'text-gray-300 group-hover:text-black'}`}>
                                        <ChevronRight size={18} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* --- Products Section --- */}
                    <section className="bg-[#F9F9F9] rounded-[28px] sm:rounded-[32px] p-1.5 sm:p-2 space-y-1 mb-12 sm:mb-16 border border-gray-50">
                        <div className="flex items-center gap-2 px-4 sm:px-6 py-4 text-xs sm:text-sm font-medium text-gray-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            Products
                        </div>
                        {[
                            { name: 'Goven', tag: 'FRAMER' },
                            { name: 'Faktur Invoice', tag: 'FRAMER' },
                            { name: 'Subtle Folio', tag: 'FRAMER' }
                        ].map((prod, j) => (
                            <div key={j} className="group bg-white rounded-[20px] sm:rounded-[24px] p-3 sm:p-4 pl-4 sm:pl-5 flex items-center justify-between hover:scale-[1.01] hover:shadow-md transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-50">
                                <div className="flex items-center gap-3 sm:gap-5">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-lg sm:text-xl shadow-sm">⚡️</div>
                                    <span className="text-[14px] sm:text-[15px] font-bold text-gray-900">{prod.name}</span>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md tracking-wider border border-gray-200">{prod.tag}</span>
                                    <ArrowUpRight size={16} className="text-gray-300 group-hover:text-black transition-colors" />
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* --- Footer CTA --- */}
                    <div className="text-center space-y-6 mb-12 px-2">
                        <h2 className="text-[28px] sm:text-[36px] font-bold text-[#1A1A1A] tracking-tight px-4">Let’s work together.</h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-3 px-4">
                            <button className="bg-[#1A1A1A] text-white px-6 py-3 rounded-[16px] sm:rounded-[18px] text-[13px] font-bold flex items-center justify-center gap-2 shadow-xl shadow-black/10 hover:scale-105 transition-transform">
                                <div className="bg-white/20 rounded-full p-0.5"><Plus size={10} strokeWidth={4} /></div> Hire Me
                            </button>
                            <button className="bg-white border border-gray-200 text-[#1A1A1A] px-5 py-3 rounded-[16px] sm:rounded-[18px] text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                                <Copy size={14} /> Copy Email
                            </button>
                        </div>
                    </div>

                    <section className="bg-[#F9F9F9] rounded-[24px] sm:rounded-[28px] p-2 flex flex-col xs:flex-row items-center justify-between px-4 sm:pl-6 sm:pr-3 gap-4 py-4 sm:py-2">
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            Follow Me
                        </div>
                        <div className="flex gap-2">
                            {[Twitter, Instagram, Globe, Linkedin].map((Icon, idx) => (
                                <button key={idx} className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-100"><Icon size={18} /></button>
                            ))}
                        </div>
                    </section>

                    <div className="mt-10 sm:mt-12 text-center space-y-2 pb-4 px-4">
                        <p className="text-[11px] sm:text-[12px] text-gray-400 font-medium">© Made by DAEKYOUNG KIM</p>
                        <p className="text-[11px] sm:text-[12px] text-gray-300">by <span className="underline decoration-gray-300">Gemini Flash 2.0</span></p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;