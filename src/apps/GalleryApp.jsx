import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search,
    MoreVertical,
    Maximize2,
    Download,
    Share2,
    Info,
    X,
    ChevronLeft,
    Heart,
    Trash2,
    CheckCircle2
} from 'lucide-react'

// Dynamic import for all certificates in the certif folder
const certImages = import.meta.glob('../assets/images/certif/*.{png,jpg,jpeg}', { eager: true });

const certificates = Object.entries(certImages).map(([path, module], index) => {
    const fileName = path.split('/').pop();
    const name = fileName.split('.')[0].replace(/_/g, ' ').replace(/-/g, ' ');
    return {
        id: index,
        src: module.default,
        name: name,
        date: 'Recent', // Fallback
        category: name.toLowerCase().includes('python') ? 'Data Science' : 'General'
    };
});

const GalleryApp = () => {
    const [selectedCert, setSelectedCert] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);

    const handleNext = (e) => {
        e.stopPropagation();
        const currentIndex = certificates.findIndex(c => c.id === selectedCert.id);
        const nextIndex = (currentIndex + 1) % certificates.length;
        setSelectedCert(certificates[nextIndex]);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        const currentIndex = certificates.findIndex(c => c.id === selectedCert.id);
        const prevIndex = (currentIndex - 1 + certificates.length) % certificates.length;
        setSelectedCert(certificates[prevIndex]);
    };

    return (
        <div className="h-full bg-black text-white flex flex-col font-sans overflow-hidden">
            {/* Top Navigation Bar */}
            <div className="h-16 flex items-center justify-between px-6 bg-black/80 backdrop-blur-md border-b border-white/5 z-20">
                <div className="flex items-center gap-4 flex-1">
                    <div className="relative w-full max-w-xl group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-blue-400 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search your certificates"
                            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:bg-white/10 focus:border-blue-500/50 transition-all"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 ml-6">
                    <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <MoreVertical size={20} className="text-white/60" />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold ring-2 ring-white/10">
                        NE
                    </div>
                </div>
            </div>

            {/* Photos Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Section Header */}
                    <div className="space-y-6">
                        <div className="flex items-baseline gap-3">
                            <h2 className="text-2xl font-semibold">Today</h2>
                            <span className="text-sm text-white/40">Tue, Apr 21, 2026</span>
                        </div>

                        {/* Responsive Masonry-like Grid */}
                        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
                            {certificates.map((cert) => (
                                <motion.div
                                    key={cert.id}
                                    layoutId={`cert-${cert.id}`}
                                    className="relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
                                    onMouseEnter={() => setHoveredId(cert.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    onClick={() => setSelectedCert(cert)}
                                    whileHover={{ y: -4 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <img
                                        src={cert.src}
                                        alt={cert.name}
                                        className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />

                                    {/* Overlay Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${hoveredId === cert.id ? 'opacity-100' : 'opacity-0'}`} />

                                    {/* Interactive Icons */}
                                    <div className={`absolute top-3 left-3 transition-opacity duration-300 ${hoveredId === cert.id ? 'opacity-100' : 'opacity-0'}`}>
                                        <CheckCircle2 size={24} className="text-white fill-blue-500/20" />
                                    </div>
                                    <div className={`absolute top-3 right-3 transition-opacity duration-300 ${hoveredId === cert.id ? 'opacity-100' : 'opacity-0'}`}>
                                        <Heart size={20} className="text-white hover:fill-red-500 hover:text-red-500 transition-colors" />
                                    </div>

                                    {/* Caption */}
                                    <div className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 ${hoveredId === cert.id ? 'translate-y-0' : 'translate-y-2 opacity-0'}`}>
                                        <p className="text-xs font-medium truncate drop-shadow-lg">{cert.name}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Action Buttons Area (Optional Google Photos Style) */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl z-30">
                <button className="flex items-center gap-2 text-sm font-medium hover:text-blue-400 transition-colors">
                    <Maximize2 size={16} />
                    <span>View all</span>
                </button>
            </div>

            {/* Modal Detail View */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-2xl"
                    >
                        {/* Modal Header */}
                        <div className="h-16 flex items-center justify-between px-6 z-10">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSelectedCert(null)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X size={24} />
                                </button>
                                <div>
                                    <h3 className="text-sm font-semibold">{selectedCert.name}</h3>
                                    <p className="text-[10px] text-white/40">{selectedCert.category}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2.5 hover:bg-white/10 rounded-full transition-colors">
                                    <Share2 size={20} />
                                </button>
                                <button className="p-2.5 hover:bg-white/10 rounded-full transition-colors">
                                    <Download size={20} />
                                </button>
                                <button className="p-2.5 hover:bg-white/10 rounded-full transition-colors">
                                    <Trash2 size={20} />
                                </button>
                                <button className="p-2.5 hover:bg-white/10 rounded-full transition-colors">
                                    <Info size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Modal Main Image */}
                        <div className="flex-1 relative flex items-center justify-center p-4 sm:p-12 overflow-hidden">
                            <motion.img
                                layoutId={`cert-${selectedCert.id}`}
                                src={selectedCert.src}
                                alt={selectedCert.name}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            />

                            {/* Navigation Arrows */}
                            <button
                                onClick={handlePrev}
                                className="absolute left-8 p-3 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md transition-all"
                            >
                                <ChevronLeft size={32} />
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute right-8 p-3 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md transition-all rotate-180"
                            >
                                <ChevronLeft size={32} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default GalleryApp
