import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../hooks/useApp'
import ControlCenter from './ControlCenter'
import {
    Cpu,
    Zap,
    Thermometer,
    Music2,
    Wifi,
    Bluetooth,
    Bell,
    Navigation,
    Battery,
    Orbit,
    Search,
    Terminal,
    Settings,
    Briefcase,
    GraduationCap,
    Award,
    Layout,
    Globe,
    FileCode,
    Binary
} from 'lucide-react'

const APP_TITLES = {
    terminal: 'Terminal — About Me',
    settings: 'System — Skills',
    projects: 'Source — Projects IDE',
    notepad: 'Notes — Education',
    gallery: 'Media — Certificates',
    experience: 'Work — Experience',
    publications: 'Zen — Research Publications',
}

const SEARCHABLE_APPS = [
    { id: 'terminal', title: 'Terminal', desc: 'About Me & Personal Story', shortcut: 'Identity', icon: Terminal },
    { id: 'experience', title: 'Experience', desc: 'Work History & Career Milestones', shortcut: 'Career', icon: Briefcase },
    { id: 'projects', title: 'Projects', desc: 'Technical Portfolios & Source Code', shortcut: 'Source', icon: FileCode },
    { id: 'settings', title: 'Skills', desc: 'Tech Stack & Competencies', shortcut: 'System', icon: Settings },
    { id: 'notepad', title: 'Education', desc: 'Degrees & Academic History', shortcut: 'Academic', icon: GraduationCap },
    { id: 'gallery', title: 'Certificates', desc: 'Credentials & Media Gallery', shortcut: 'Verify', icon: Layout },
    { id: 'publications', title: 'Research', desc: 'Scientific Publications', shortcut: 'Zen', icon: Globe },
]

const TopBar = () => {
    const [time, setTime] = useState(new Date())
    const [showControls, setShowControls] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const { activeWindow, systemSettings, openApp } = useApp()
    const isLight = systemSettings?.theme === 'light'

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const filteredApps = searchQuery.trim() === ''
        ? []
        : SEARCHABLE_APPS.filter(app =>
            app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.desc.toLowerCase().includes(searchQuery.toLowerCase())
        )

    const handleOpenApp = (appId) => {
        openApp(appId)
        setSearchQuery('')
        setIsSearching(false)
    }

    const activeAppTitle = activeWindow ? (APP_TITLES[activeWindow] || activeWindow) : 'portoOS — Hybrid Desktop'

    return (
        <>
            <div className={`w-full h-11 px-3 flex items-center justify-between text-[11px] font-bold z-[1000] select-none transition-colors duration-500 ${isLight ? 'bg-white border-b-4 border-black' : 'bg-base/10 backdrop-blur-sm border-b border-white/5'}`}>
                {/* Left Section: Active App / Logo */}
                <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full transition-all cursor-pointer group ${isLight ? 'bg-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' : 'bg-base/40 border border-white/5 backdrop-blur-md shadow-lg hover:border-blue/30'}`}>
                        <Orbit size={13} className={`group-hover:rotate-180 transition-transform duration-500 ${isLight ? 'text-black' : 'text-blue'}`} />
                        <span className={`tracking-tight ${isLight ? 'text-black font-black' : 'text-text/90'}`}>
                            {activeAppTitle}
                        </span>
                    </div>

                    {/* Functional Search Bar */}
                    <div className="relative group">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${isLight ? `bg-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] ${isSearching ? 'w-64' : 'w-40'}` : `bg-base/40 border ${isSearching ? 'w-64 border-blue/50 bg-base/60' : 'w-40 border-white/5 hover:bg-base/60'}`}`}>
                            <Search size={11} className={isSearching ? (isLight ? 'text-black' : 'text-blue') : (isLight ? 'text-black/50' : 'text-subtext')} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearching(true)}
                                onBlur={() => setTimeout(() => setIsSearching(false), 200)}
                                placeholder={isSearching ? "Type to search..." : "Search modules..."}
                                className={`bg-transparent border-none outline-none w-full text-[10px] font-bold ${isLight ? 'text-black placeholder:text-black/40' : 'text-text placeholder:text-subtext/40'}`}
                            />
                        </div>

                        {/* Search Results Dropdown */}
                        <AnimatePresence>
                            {(isSearching && filteredApps.length > 0) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className={`absolute top-12 left-0 w-80 rounded-2xl p-2 z-[2001] ${isLight ? 'bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]' : 'bg-[#1a1c2c]/90 backdrop-blur-xl border border-white/10 shadow-2xl'}`}
                                >
                                    <div className={`px-3 py-2 text-[9px] uppercase tracking-widest mb-1 ${isLight ? 'text-black/50 border-b-2 border-black font-bold' : 'text-white/30 border-b border-white/5'}`}>
                                        Found {filteredApps.length} Results
                                    </div>
                                    <div className="space-y-1">
                                        {filteredApps.map(app => (
                                            <div
                                                key={app.id}
                                                onClick={() => handleOpenApp(app.id)}
                                                className={`flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer group/item ${isLight ? 'hover:bg-[#ff90e8] hover:border-2 hover:border-black text-black' : 'hover:bg-blue/20 hover:text-white'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${isLight ? 'bg-white border-2 border-black text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] group-hover/item:bg-black group-hover/item:text-[#ff90e8]' : 'bg-white/5 border border-white/5 text-blue group-hover/item:text-white group-hover/item:bg-blue/30'}`}>
                                                        <app.icon size={18} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[12px] font-black leading-tight">{app.title}</span>
                                                        <span className="text-[10px] font-medium opacity-50 group-hover/item:opacity-80 leading-tight mt-0.5">{app.desc}</span>
                                                    </div>
                                                </div>
                                                <div className={`px-2 py-1 rounded-md flex items-center gap-1.5 ${isLight ? 'bg-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' : 'bg-white/5 border border-white/5'}`}>
                                                    <div className={`w-1 h-1 rounded-full ${isLight ? 'bg-black' : 'bg-blue'}`} />
                                                    <span className={`text-[8px] uppercase tracking-tighter ${isLight ? 'text-black font-bold opacity-100' : 'opacity-40'}`}>{app.shortcut}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Center Section: System Stats */}
                <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
                    <div className={`flex items-center gap-4 px-4 py-1.5 rounded-full ${isLight ? 'bg-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-black font-black' : 'bg-black/20 border border-white/5 backdrop-blur-md shadow-inner'}`}>
                        <div className={`flex items-center gap-1.5 ${isLight ? 'text-black' : 'text-orange'}`}>
                            <Thermometer size={12} />
                            <span>42°C</span>
                        </div>
                        <div className={`flex items-center gap-1.5 ${isLight ? 'text-black' : 'text-blue'}`}>
                            <Cpu size={12} />
                            <span>24%</span>
                        </div>
                        <div className={`flex items-center gap-1.5 ${isLight ? 'text-black' : 'text-teal'}`}>
                            <Zap size={12} />
                            <span>1.2G</span>
                        </div>
                    </div>
                </div>

                {/* Right Section: Clusters */}
                <div className="flex items-center gap-2">
                    {/* Workspaces */}
                    <div className={`flex items-center gap-3 px-3 py-1.5 rounded-full ${isLight ? 'bg-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' : 'bg-base/40 border border-white/5 backdrop-blur-md'}`}>
                        {[1, 2, 3, 4, 5].map(i => (
                            <div
                                key={i}
                                className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${isLight ? (i === 1 ? 'bg-[#ff90e8] text-black border-2 border-black font-black' : 'text-black/40 hover:text-black') : (i === 1 ? 'bg-blue text-base scale-110 shadow-lg' : 'text-subtext/40 hover:text-subtext')}`}
                            >
                                {i}
                            </div>
                        ))}
                    </div>

                    {/* Clock & Status */}
                    <div
                        onClick={() => setShowControls(!showControls)}
                        className={`flex items-center gap-3 px-3 py-1.5 rounded-full transition-all cursor-pointer ${isLight ? `border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] ${showControls ? 'bg-black text-[#00ffa3]' : 'bg-white text-black hover:bg-[#00ffa3]'}` : `border backdrop-blur-md ${showControls ? 'bg-blue text-white border-blue/50 shadow-lg shadow-blue/20' : 'bg-base/40 border-white/5 hover:border-mauve/30'}`}`}
                    >
                        <div className={`flex items-center gap-3 pr-2 border-r ${isLight ? (showControls ? 'border-white/20 text-[#00ffa3]' : 'border-black') : (showControls ? 'border-white/20 text-white' : 'border-white/10 text-text/80')}`}>
                            {systemSettings.wifiEnabled && <Wifi size={12} className={isLight ? '' : (showControls ? 'text-white' : 'text-blue')} />}
                            {systemSettings.bluetoothEnabled && <Bluetooth size={12} className={isLight ? '' : (showControls ? 'text-white' : 'text-blue')} />}
                            <Bell size={12} />
                            <Battery size={14} className={isLight ? '' : (showControls ? 'text-white' : 'text-teal')} />
                        </div>
                        <div className={`flex items-center gap-2 ${isLight ? '' : (showControls ? 'text-white' : 'text-mauve')}`}>
                            <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                            <div className={`w-[1px] h-3 ${isLight ? (showControls ? 'bg-white/20' : 'bg-black/20') : (showControls ? 'bg-white/20' : 'bg-mauve/20')}`} />
                            <span>{time.toLocaleDateString([], { weekday: 'short', day: '2-digit', month: '2-digit' })}</span>
                        </div>
                    </div>

                    {/* Power Control */}
                    <button
                        onClick={() => setShowControls(true)}
                        className={`p-2 rounded-full transition-all shadow-lg active:scale-90 ${isLight ? 'bg-white border-2 border-black text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-[#00e5ff]' : 'bg-red/10 border border-red/20 text-red hover:bg-red hover:text-white'}`}
                    >
                        <Navigation size={12} className="rotate-45" />
                    </button>
                </div>
            </div>

            <ControlCenter isOpen={showControls} onClose={() => setShowControls(false)} />
        </>
    )
}

export default TopBar
