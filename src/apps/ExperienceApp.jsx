import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
    MapPin,
    Navigation,
    Search,
    Info,
    Calendar,
    Briefcase,
    Globe,
    Layers,
    ZoomIn,
    ZoomOut,
    Activity,
    ChevronLeft,
    ChevronRight,
    Compass,
    Cpu,
    Target,
    X,
    Maximize2
} from 'lucide-react'

// --- Image Assets ---
import utem1 from '../assets/images/Experience/UTeM/utem-1.jpg'
import utem2 from '../assets/images/Experience/UTeM/utem-2.jpg'
import utem3 from '../assets/images/Experience/UTeM/utem-3.jpg'
import utem4 from '../assets/images/Experience/UTeM/utem-4.jpg'
import utemBanner from '../assets/images/Experience/UTeM/utem-banner.png'

// --- Bengkel Koding Assets ---
import bengkod1 from '../assets/images/Experience/BengkelKoding/bengkod-1.jpg'
import bengkod2 from '../assets/images/Experience/BengkelKoding/bengkod-2.jpg'
import bengkod3 from '../assets/images/Experience/BengkelKoding/bengkod-3.jpg'
import bengkod4 from '../assets/images/Experience/BengkelKoding/bengkod-4.jpg'
import bengkodBanner from '../assets/images/Experience/BengkelKoding/bengkod-banner.png'

// --- Sekar Nuswantoro Assets ---
import gamelan1 from '../assets/images/Experience/SekarNuswantoro/gamelan-1.jpg'
import gamelan2 from '../assets/images/Experience/SekarNuswantoro/gamelan-2.jpg'
import gamelan3 from '../assets/images/Experience/SekarNuswantoro/gamelan-3.jpg'
import gamelan4 from '../assets/images/Experience/SekarNuswantoro/gamelan-4.jpg'

// --- Telkomsel Assets ---
import telkom1 from '../assets/images/Experience/Telkomsel/telkom-1.jpg'
import telkom2 from '../assets/images/Experience/Telkomsel/telkom-2.jpg'
import telkom3 from '../assets/images/Experience/Telkomsel/telkom-3.jpg'
import telkom4 from '../assets/images/Experience/Telkomsel/telkom-4.jpg'
import telkomBanner from '../assets/images/Experience/Telkomsel/telkom-banner.png'

// --- Experience Data ---
const EXP_DATA = [
    {
        id: 'telkomsel',
        category: 'Project',
        company: 'Telkomsel',
        role: 'Service Quality Assurance',
        period: 'Jan 2026 – Feb 2026',
        location: 'Semarang, Indonesia',
        coords: [-6.9829, 110.4091],
        type: 'Corporate',
        photo: telkomBanner,
        gallery: [
            telkom1,
            telkom2,
            telkom3,
            telkom4
        ],
        achievements: [
            "Studied 4G and 5G network infrastructure and backend service scalability.",
            "Conduct analysis of customer satisfaction and complex complaint handling systems.",
            "Developed a Telegram chatbot using Qwen 2.5 for internal warehouse predictive monitoring."
        ]
    },
    {
        id: 'utem',
        category: 'Research',
        company: 'Universiti Teknikal Malaysia',
        role: 'Student Mobility & Research',
        period: 'Oct 2024 – Feb 2025',
        location: 'Malacca, Malaysia',
        coords: [2.3117, 102.3183],
        type: 'Research',
        photo: utemBanner,
        gallery: [
            utem1,
            utem2,
            utem3,
            utem4
        ],
        achievements: [
            "Selected for merit-based student mobility program at UTeM, Malaysia.",
            "Led research in AI-based brain tumor classification using medical imaging processing.",
            "Target output: High-impact International journal publication."
        ]
    },
    {
        id: 'bengkod',
        category: 'Research',
        company: 'Bengkel Koding',
        role: 'Teaching Assistant & Research',
        period: 'Mar 2024 – Feb 2025',
        location: 'Semarang, Indonesia',
        coords: [-6.9829, 110.4350],
        type: 'Education',
        photo: bengkodBanner,
        gallery: [
            bengkod1,
            bengkod2,
            bengkod3,
            bengkod4
        ],
        achievements: [
            "Guided 25+ undergraduate students in Data Science and Python courses.",
            "Research lead on Indonesian-language conversational AI using NLP Transformers.",
            "Developed new industry-standard course modules for computer networking."
        ]
    },
    {
        id: 'robotics',
        category: 'Robotics',
        company: 'Sekar Nuswantoro Robot',
        role: 'Developer Team',
        period: 'Nov 2022 – Dec 2023',
        location: 'Semarang, Indonesia',
        coords: [-6.9829, 110.4550],
        type: 'Innovation',
        photo: gamelan1,
        gallery: [
            gamelan1,
            gamelan2,
            gamelan3,
            gamelan4
        ],
        achievements: [
            "Architected integration of traditional gamelan instruments with robotic systems.",
            "Developed v2.0 software for precise automated robotic gamelan play sequences.",
            "Presented technological innovations at formal ceremonies and national receptions."
        ]
    }
]

const ExperienceApp = () => {
    const mapRef = useRef(null)
    const mapInstance = useRef(null)
    const markersRef = useRef({})
    const [activeId, setActiveId] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [previewImage, setPreviewImage] = useState(null)

    const activeExperience = EXP_DATA.find(e => e.id === activeId)

    useEffect(() => {
        if (!mapInstance.current && mapRef.current) {
            // Optimization: preferCanvas: true for smoother rendering
            mapInstance.current = L.map(mapRef.current, {
                center: [-2.5489, 118.0149],
                zoom: 5,
                zoomControl: false,
                attributionControl: false,
                preferCanvas: true // Use Canvas for better performance
            })

            // Optimization: updateWhenIdle and keepBuffer for smoother panning
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                maxZoom: 19,
                updateWhenIdle: true,
                keepBuffer: 2
            }).addTo(mapInstance.current)

            EXP_DATA.forEach(ex => {
                const icon = L.divIcon({
                    className: 'custom-hi-tech-marker',
                    html: `<div id="marker-${ex.id}" class="marker-container">
                        <div class="marker-pulse"></div>
                        <div class="marker-core"></div>
                    </div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                })

                const marker = L.marker(ex.coords, { icon }).addTo(mapInstance.current)

                marker.on('click', () => {
                    setActiveId(ex.id)
                    mapInstance.current.flyTo(ex.coords, 12, { duration: 1.5 })
                })

                markersRef.current[ex.id] = marker
            })

            const observer = new ResizeObserver(() => {
                mapInstance.current?.invalidateSize()
            })
            observer.observe(mapRef.current)

            setTimeout(() => {
                mapInstance.current?.invalidateSize()
            }, 500)
        }

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove()
                mapInstance.current = null
            }
        }
    }, [])

    useEffect(() => {
        Object.keys(markersRef.current).forEach(id => {
            const element = document.getElementById(`marker-${id}`)
            if (element) {
                if (id === activeId) {
                    element.classList.add('active')
                } else {
                    element.classList.remove('active')
                }
            }
        })
    }, [activeId])

    const handleQuickSelect = (ex) => {
        setActiveId(ex.id)
        if (mapInstance.current) {
            mapInstance.current.flyTo(ex.coords, 12, { duration: 1.5 })
        }
    }

    return (
        <div className="h-full bg-[#0a0a0c] flex flex-col relative overflow-hidden font-sans text-white">
            <style>{`
                .marker-container {
                    position: relative;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    will-change: transform;
                }
                .marker-core {
                    width: 12px;
                    height: 12px;
                    background: #3b82f6;
                    border: 2px solid white;
                    border-radius: 50%;
                    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
                    transition: all 0.3s ease;
                    z-index: 2;
                }
                .marker-pulse {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: rgba(59, 130, 246, 0.3);
                    border-radius: 50%;
                    animation: marker-ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
                    z-index: 1;
                }
                .marker-container.active .marker-core {
                    background: #ef4444;
                    box-shadow: 0 0 15px rgba(239, 68, 68, 0.6);
                    transform: scale(1.3);
                }
                .marker-container.active .marker-pulse {
                    background: rgba(239, 68, 68, 0.3);
                }
                @keyframes marker-ping {
                    75%, 100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                .custom-scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .leaflet-container {
                    background: #0a0a0c !important;
                }
                /* Hardware acceleration for map */
                .leaflet-map-pane {
                    transform: translate3d(0, 0, 0);
                }
            `}</style>

            {/* Map Container */}
            <div ref={mapRef} className="flex-1 relative z-0 w-full h-full" />

            {/* Optimized Visual Overlays */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.6)_100%)]" />

                {/* Simplified Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

                {/* Optimized Scanline (Single pattern, lighter) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] z-20 bg-[length:100%_4px] pointer-events-none opacity-10" />
            </div>

            {/* Floating UI Elements */}
            <div className="absolute top-8 right-8 flex flex-col items-end gap-3 z-[1000]">
                <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 shadow-2xl w-[300px] transition-all focus-within:w-[360px] focus-within:border-blue-500/40">
                    <Search size={16} className="text-white/30" />
                    <input
                        placeholder="Intercepting geo-data..."
                        className="bg-transparent border-none outline-none text-white text-xs w-full font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex gap-2">
                    <button className="p-2.5 rounded-xl bg-black/50 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-all" onClick={() => mapInstance.current?.zoomIn()}>
                        <ZoomIn size={16} />
                    </button>
                    <button className="p-2.5 rounded-xl bg-black/50 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-all" onClick={() => mapInstance.current?.zoomOut()}>
                        <ZoomOut size={16} />
                    </button>
                </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-[1000] pointer-events-none">
                <div className="flex flex-col gap-2 pointer-events-auto">
                    <div className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-lg border border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Geo-Sync: Stable</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 pointer-events-auto overflow-x-auto pb-4 max-w-full lg:max-w-2xl custom-scrollbar-hide">
                    {EXP_DATA.map((ex) => (
                        <button
                            key={ex.id}
                            onClick={() => handleQuickSelect(ex)}
                            className={`flex flex-col gap-1 p-2.5 rounded-xl border min-w-[130px] transition-all duration-300 ${activeId === ex.id ? 'bg-blue-600/10 border-blue-500/50' : 'bg-black/50 border-white/10 hover:bg-white/5 backdrop-blur-lg'}`}
                        >
                            <span className="text-[8px] font-black text-blue-400/80 uppercase tracking-widest">{ex.category}</span>
                            <span className="text-[11px] font-bold text-white/90 truncate w-full">{ex.company}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Details Panel Overlay - Optimized Blur */}
            <AnimatePresence>
                {activeId && (
                    <motion.div
                        initial={{ x: '-100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '-100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        style={{ willChange: 'transform' }}
                        className="absolute top-0 left-0 w-full sm:w-[400px] h-full bg-[#0d0d0f]/90 backdrop-blur-xl border-r border-white/10 shadow-2xl z-[2000] flex flex-col"
                    >
                        {/* Panel Header */}
                        <div className="h-56 relative overflow-hidden group flex-shrink-0">
                            <img
                                src={activeExperience.photo}
                                className="w-full h-full object-cover"
                                style={{ objectPosition: 'center 70%' }}
                                alt={activeExperience.company}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-transparent to-transparent" />

                            <button
                                onClick={() => setActiveId(null)}
                                className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-black/60 backdrop-blur-lg border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                            >
                                <X size={16} />
                            </button>

                            <div className="absolute bottom-6 left-8">
                                <span className="px-1.5 py-0.5 bg-blue-600/80 text-white text-[8px] font-black uppercase tracking-widest rounded-sm mb-2 inline-block">Node Active</span>
                                <h2 className="text-2xl font-black text-white tracking-tighter leading-none mb-1">{activeExperience.company}</h2>
                                <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold">
                                    <MapPin size={10} className="text-blue-500" />
                                    {activeExperience.location}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar-hide">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                                    <span className="text-[8px] font-black text-white/20 uppercase tracking-widest block">Role</span>
                                    <span className="text-[10px] font-bold text-white/70">{activeExperience.role}</span>
                                </div>
                                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                                    <span className="text-[8px] font-black text-white/20 uppercase tracking-widest block">Period</span>
                                    <span className="text-[10px] font-bold text-white/70">{activeExperience.period}</span>
                                </div>
                            </div>

                            {/* Mini Gallery */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Layers size={14} className="text-blue-500" />
                                        <h3 className="text-[10px] font-black text-white/20 uppercase tracking-widest">Documentation</h3>
                                    </div>
                                </div>
                                <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar-hide">
                                    {activeExperience.gallery.map((img, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => setPreviewImage(img)}
                                            className="relative min-w-[110px] h-16 rounded-lg overflow-hidden border border-white/5 cursor-pointer hover:border-blue-500/30 transition-colors"
                                        >
                                            <img src={img} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" alt="Work item" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Target size={14} className="text-blue-500" />
                                    <h3 className="text-[10px] font-black text-white/20 uppercase tracking-widest">Objectives</h3>
                                </div>
                                <ul className="space-y-4">
                                    {activeExperience.achievements.map((ach, idx) => (
                                        <li key={idx} className="flex gap-3">
                                            <div className="mt-1.5 w-1 h-1 rounded-full bg-blue-500/50 flex-shrink-0" />
                                            <span className="text-[13px] leading-relaxed text-white/50">{ach}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="p-6 border-t border-white/5 bg-black/10 flex-shrink-0">
                            <button className="w-full py-3 rounded-xl bg-blue-600/90 text-white font-black text-[9px] uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                                <Navigation size={12} />
                                Synchronize
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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

export default ExperienceApp
