import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Image as ImageIcon, X } from 'lucide-react'
import { useApp } from '../hooks/useApp'

// --- Academic Assets ---
import academic1 from '../assets/images/Academic/academic-1.jpg'
import academic2 from '../assets/images/Academic/academic-2.jpg'
import academic3 from '../assets/images/Academic/academic-3.jpg'

const EducationApp = () => {
    const { systemSettings } = useApp()
    const isLight = systemSettings?.theme === 'light'
    
    const education = [
        {
            university: "Telkom University",
            location: "Bandung, Indonesia",
            period: "Sep 2025 – Now",
            degree: "Master's Degree, Data Science Program",
            gpa: "3.5",
            courses: [
                "Advanced Algorithm Design", "Advanced Modeling & Optimization",
                "Principles Data Science", "Advanced Artificial Intelligence",
                "Advanced Big Data Analytics", "Digital Business",
                "Statistical Modeling for Data Science"
            ],
            type: "current",
            color: "bg-[#00ffa3]"
        },
        {
            university: "University of Dian Nuswantoro Semarang",
            location: "Semarang, Indonesia",
            period: "Jul 2021 – Feb 2025",
            degree: "Bachelor, Computer Science Program",
            gpa: "3.61",
            content: "Fresh Graduate",
            achievements: [
                "Relevant Courses: Data Mining, Probability and Statistics, Database, Automata and Languages, Matrix and vector, Information Retrieval System, Algorithm Strategy.",
                "Recognition: Invited to participation in excellence classes and research groups."
            ],
            type: "completed",
            color: "bg-[#d2b8ff]"
        }
    ]

    const [previewImage, setPreviewImage] = React.useState(null)

    const campusPhotos = [academic1, academic2, academic3]

    return (
        <div className={`flex h-full overflow-hidden relative transition-colors duration-500 ${isLight ? 'bg-[#f4f4f0]' : 'bg-base/50 backdrop-blur-md'}`}>
            {/* Sidebar - Photos */}
            <div className={`w-64 flex flex-col p-6 ${isLight ? 'border-r-4 border-black bg-white' : 'border-r border-white/5 bg-mantle/30'}`}>
                <div className={`flex items-center gap-2 mb-6 ${isLight ? 'text-black' : 'text-mauve'}`}>
                    <ImageIcon size={20} />
                    <span className="font-bold text-sm uppercase tracking-wider">Campus Life</span>
                </div>

                <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar-hide">
                    {campusPhotos.map((img, i) => (
                        <div
                            key={i}
                            onClick={() => setPreviewImage(img)}
                            className={`aspect-[4/3] flex items-center justify-center relative overflow-hidden group cursor-pointer transition-colors ${isLight ? 'border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-[#ff90e8]' : 'rounded-2xl bg-surface0 border border-white/5 hover:border-mauve/50'}`}
                        >
                            <img src={img} className={`w-full h-full object-cover transition-all duration-500 ${isLight ? 'contrast-125 hover:scale-105' : 'opacity-80 group-hover:opacity-100 group-hover:scale-110'}`} alt={`Campus life ${i + 1}`} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                <span className={`${isLight ? 'text-black bg-[#ffde59] px-2 py-1 border-2 border-black font-black text-xs shadow-[2px_2px_0px_rgba(0,0,0,1)]' : 'text-[10px] font-bold text-white'}`}>View Full Image</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                {/* ... (existing main content) */}
                <div className="max-w-3xl mx-auto space-y-12">
                    <header className="space-y-2">
                        <h1 className={`text-4xl font-black tracking-tight flex items-center gap-4 ${isLight ? 'text-black' : 'text-text'}`}>
                            <GraduationCap size={40} className={`${isLight ? 'text-black' : 'text-mauve'}`} />
                            Academic Journey
                        </h1>
                        <p className={`${isLight ? 'text-black font-bold' : 'text-subtext'}`}>A timeline of my formal education and academic achievements.</p>
                    </header>

                    <div className="space-y-16">
                        {education.map((edu, idx) => (
                            <div key={idx} className={`relative pl-8 ${isLight ? 'border-l-4 border-black' : 'border-l-2 border-mauve/20'}`}>
                                {/* Timeline Dot */}
                                <div className={`absolute top-0 rounded-full ${isLight ? '-left-[12px] w-5 h-5 border-4 border-black bg-[#ffde59]' : '-left-[9px] w-4 h-4 border-2 border-base'} ${edu.type === 'current' ? 'animate-pulse' : ''} ${!isLight && edu.type === 'current' ? 'bg-green' : ''} ${!isLight && edu.type !== 'current' ? 'bg-mauve' : ''}`} />

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between flex-wrap gap-2">
                                            <h2 className={`text-2xl font-black ${isLight ? 'text-black' : 'text-text'}`}>{edu.university}</h2>
                                            <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${isLight ? 'border-2 border-black bg-white text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' : (edu.type === 'current' ? 'rounded-full bg-green/10 text-green border border-green/20' : 'rounded-full bg-mauve/10 text-mauve border border-mauve/20')}`}>
                                                {edu.type === 'current' ? 'In Progress' : 'Completed'}
                                            </span>
                                        </div>

                                        <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium ${isLight ? 'text-black font-bold' : 'text-subtext'}`}>
                                            <div className="flex items-center gap-1.5">
                                                <MapPin size={14} className={`${isLight ? 'text-black' : 'text-mauve'}`} />
                                                {edu.location}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={14} className={`${isLight ? 'text-black' : 'text-mauve'}`} />
                                                {edu.period}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Award size={14} className={`${isLight ? 'text-black' : 'text-mauve'}`} />
                                                GPA: {edu.gpa}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`p-6 ${isLight ? `${edu.color || 'bg-[#ffde59]'} border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] space-y-6` : 'bg-surface0/30 rounded-2xl border border-white/5 space-y-4'}`}>
                                        <h3 className={`font-bold text-lg ${isLight ? 'text-black bg-white inline-block px-3 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' : 'text-mauve'}`}>{edu.degree}</h3>
                                        {edu.content && <p className={`${isLight ? 'text-black font-bold' : 'text-text/80'}`}>{edu.content}</p>}

                                        {edu.courses && (
                                            <div className="space-y-3">
                                                <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${isLight ? 'text-black' : 'text-subtext'}`}>
                                                    <BookOpen size={14} />
                                                    Relevant Courses
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {edu.courses.map((course, cIdx) => (
                                                        <span key={cIdx} className={`px-3 py-1.5 text-[11px] font-medium ${isLight ? 'bg-white border-2 border-black text-black font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)]' : 'rounded-lg bg-base/50 border border-white/5 text-text/90'}`}>
                                                            {course}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {edu.achievements && (
                                            <div className="space-y-3">
                                                {edu.achievements.map((achieve, aIdx) => (
                                                    <div key={aIdx} className={`flex gap-3 text-sm leading-relaxed ${isLight ? 'text-black font-bold' : 'text-text/80'}`}>
                                                        <div className={`w-1.5 h-1.5 mt-2 flex-shrink-0 ${isLight ? 'bg-black rounded-none border-2 border-black' : 'rounded-full bg-mauve'}`} />
                                                        {achieve}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Image Preview Modal */}
            <AnimatePresence>
                {previewImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[5000] flex items-center justify-center p-6 backdrop-blur-xl bg-black/70"
                        onClick={() => setPreviewImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="relative max-w-4xl w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                        >
                            <img src={previewImage} className="w-full h-full object-cover" alt="Preview" />
                            <button
                                className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-black/60 backdrop-blur-lg border border-white/10 flex items-center justify-center text-white"
                                onClick={() => setPreviewImage(null)}
                            >
                                <X size={20} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default EducationApp
