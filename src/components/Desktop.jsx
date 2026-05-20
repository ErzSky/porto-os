import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Cpu, Code2, GraduationCap, BarChart3, X, Terminal, Layout, Github, UserCheck, Globe, Activity, ChevronDown } from 'lucide-react'
import { useApp } from '../hooks/useApp'

const WelcomeWidget = ({ userName, isVisible, onClose }) => {
    const { openApp, systemSettings } = useApp()
    const isLight = systemSettings?.theme === 'light'

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="absolute top-10 right-10 z-[100] pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, x: 100, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className={`w-80 rounded-[2rem] p-6 space-y-5 pointer-events-auto relative overflow-hidden transition-colors duration-500 ${isLight ? 'bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]' : 'glass-card shadow-2xl'}`}
                    >
                        <div className={`absolute top-0 left-0 w-full h-1 ${isLight ? 'bg-black' : 'bg-gradient-to-r from-transparent via-mauve/50 to-transparent'}`} />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`p-2.5 rounded-xl ${isLight ? 'bg-[#ffde59] border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' : 'bg-mauve/10 border border-mauve/20'}`}>
                                    <ShieldCheck className={`${isLight ? 'text-black' : 'text-mauve'}`} size={20} />
                                </div>
                                <div>
                                    <h3 className={`font-bold text-[10px] uppercase tracking-[0.2em] ${isLight ? 'text-black' : 'text-white/40'}`}>System Status</h3>
                                    <p className={`text-[11px] font-black uppercase tracking-wider ${isLight ? 'text-black bg-[#00ffa3] px-2 py-0.5 border-2 border-black inline-block shadow-[2px_2px_0px_rgba(0,0,0,1)] mt-1' : 'text-teal'}`}>Operational</p>
                                </div>
                            </div>
                            <button onClick={onClose} className={`p-1.5 rounded-full transition-colors ${isLight ? 'text-black hover:bg-black/10' : 'hover:bg-white/5 text-white/20 hover:text-white'}`}>
                                <X size={16} />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <h2 className={`text-xl font-black tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>Welcome, Guest!</h2>
                            <p className={`text-[11px] leading-relaxed font-medium ${isLight ? 'text-black font-bold' : 'text-subtext'}`}>
                                This environment is specifically designed as a virtual <span className={`${isLight ? 'text-black bg-[#d2b8ff] px-1 py-0.5 border-2 border-black font-black' : 'text-mauve font-bold'}`}>Operating System</span> to showcase my portfolio.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => { openApp('terminal'); onClose(); }}
                                className={`py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${isLight ? 'bg-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-[#ff90e8] text-black' : 'bg-white/5 hover:bg-mauve/20 border border-white/10 hover:border-mauve/30'}`}
                            >
                                Terminal
                            </button>
                            <button
                                onClick={() => { openApp('explorer'); onClose(); }}
                                className={`py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${isLight ? 'bg-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-[#00e5ff] text-black' : 'bg-white/5 hover:bg-blue/20 border border-white/10 hover:border-blue/30'}`}
                            >
                                Projects
                            </button>
                        </div>

                        <div className={`pt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest font-mono ${isLight ? 'border-t-2 border-black text-black' : 'border-t border-white/5 text-white/20'}`}>
                            <div className="flex items-center gap-1.5">
                                <Cpu size={12} />
                                <span>2.4/16GB</span>
                            </div>
                            <span>UPTIME: 12M</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

const NotificationOverlay = ({ notification, isVisible, onClose }) => {
    const { systemSettings } = useApp()
    const isLight = systemSettings?.theme === 'light'
    if (!notification) return null;

    const Icon = notification.icon;

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="absolute top-10 right-10 z-[100] pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, x: 100, scale: 0.9, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, x: 100, scale: 0.9, filter: 'blur(10px)' }}
                        className={`w-[380px] rounded-[28px] p-4 pr-6 pointer-events-auto relative group overflow-hidden transition-colors duration-500 ${isLight ? 'bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]' : 'bg-[#2a2d3e]/60 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]'}`}
                    >
                        {/* Shimmer effect */}
                        {!isLight && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />}

                        <div className="flex items-start gap-4">
                            {/* App Icon (Rounded Square) */}
                            <div className={`mt-0.5 w-12 h-12 rounded-2xl flex items-center justify-center ${isLight ? 'bg-[#ff90e8] border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-black' : `bg-black border border-white/5 shadow-inner ${notification.color}`}`}>
                                <Icon size={24} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 pt-0.5">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <h3 className={`text-[14px] font-bold truncate leading-tight ${isLight ? 'text-black' : 'text-white/90'}`}>
                                        {notification.title}
                                    </h3>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <span className={`text-[11px] font-medium ${isLight ? 'text-black font-bold' : 'text-white/30'}`}>1m</span>
                                        <div className={`p-1 rounded-full ${isLight ? 'text-black' : 'bg-white/5 text-white/20'}`}>
                                            <ChevronDown size={12} />
                                        </div>
                                    </div>
                                </div>
                                <p className={`text-[13px] leading-snug line-clamp-2 pr-2 ${isLight ? 'text-black font-bold' : 'text-white/50'}`}>
                                    {notification.message}
                                </p>
                            </div>

                            {/* Close Action (Hidden by default, shows on hover) */}
                            <button
                                onClick={onClose}
                                className={`absolute -top-1 -right-1 p-2 transition-all z-10 ${isLight ? 'text-black hover:bg-black/10 rounded-xl' : 'text-white/0 group-hover:text-white/40 hover:text-white'}`}
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

const HeroContent = () => {
    const { systemSettings } = useApp()
    const isLight = systemSettings?.theme === 'light'

    const roles = [
        'Data Scientist',
        'ML Researcher',
        'NLP Engineer',
        'Computer Vision Dev',
        'Academic Writer',
        'Problem Solver',
    ]

    // Double the array for seamless looping
    const marqueeRoles = [...roles, ...roles]

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1] overflow-hidden"
        >
            <div className="w-full text-center relative">
                {/* Background Glow */}
                {!isLight && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-mauve/10 blur-[150px] rounded-full pointer-events-none" />}

                {/* Animated Marquee Background */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[200%] overflow-hidden h-fit flex items-center">
                    <motion.div
                        animate={{ x: [0, "-50%"] }}
                        transition={{
                            duration: 60,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="flex whitespace-nowrap gap-12 items-center opacity-[0.12]"
                    >
                        {marqueeRoles.map((role, i) => (
                            <React.Fragment key={i}>
                                <span
                                    className={`text-[12vw] font-black pointer-events-none select-none uppercase italic tracking-tighter ${isLight ? (i % 2 === 0 ? 'text-black' : 'text-transparent') : (i % 2 === 0 ? 'text-white' : 'text-transparent')}`}
                                    style={{ WebkitTextStroke: isLight ? (i % 2 === 0 ? 'none' : '2px black') : (i % 2 === 0 ? 'none' : '2px white') }}
                                >
                                    {role}
                                </span>
                                <span className={`text-[4vw] ${isLight ? 'text-black' : 'text-white/50'}`}>●</span>
                            </React.Fragment>
                        ))}
                    </motion.div>
                </div>

                <div className="relative z-[2] space-y-8 flex flex-col items-center">
                    {/* Availability Pill */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className={`flex items-center gap-3 px-6 py-2.5 rounded-full ${isLight ? 'bg-[#00ffa3] border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)]' : 'bg-mauve/10 border border-mauve/20 backdrop-blur-md shadow-xl'}`}
                    >
                        <div className="relative">
                            <div className={`w-2.5 h-2.5 rounded-full absolute inset-0 ${isLight ? 'bg-black animate-ping' : 'bg-teal animate-ping'}`} />
                            <div className={`w-2.5 h-2.5 rounded-full relative ${isLight ? 'bg-black' : 'bg-teal'}`} />
                        </div>
                        <span className={`text-[13px] font-bold tracking-wide uppercase ${isLight ? 'text-black' : 'text-mauve'}`}>Available for opportunities</span>
                    </motion.div>

                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className={`text-2xl font-medium opacity-80 italic flex items-center justify-center gap-2 ${isLight ? 'text-black font-black' : 'text-subtext'}`}
                        >
                            Hallo, I'm
                        </motion.div>

                        <motion.h1
                            className={`text-6xl md:text-8xl font-black tracking-tighter ${isLight ? 'text-black drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]' : 'text-white drop-shadow-[0_0_30px_rgba(203,166,247,0.3)]'}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                        >
                            Muhammad Naufal <br />
                            <span className={`${isLight ? 'text-black bg-[#ffde59] px-4 py-1 border-4 border-black inline-block shadow-[4px_4px_0px_rgba(0,0,0,1)] mt-2' : 'text-mauve'}`}>Erza Farandi</span>
                        </motion.h1>

                        <motion.p
                            className={`text-2xl md:text-3xl font-bold drop-shadow-md pt-4 ${isLight ? 'text-black font-black' : 'text-text'}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.1 }}
                        >
                            Data Science Master's Student @ Telkom University
                        </motion.p>
                    </div>

                    <motion.div
                        className="flex items-center justify-center gap-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.3 }}
                    >
                        <div className={`flex items-center gap-2 text-sm font-black tracking-[0.2em] uppercase ${isLight ? 'text-black bg-[#ff90e8] px-3 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' : 'text-mauve'}`}>
                            <Code2 size={18} /> NLP
                        </div>
                        <div className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-black' : 'bg-mauve/40'}`} />
                        <div className={`flex items-center gap-2 text-sm font-black tracking-[0.2em] uppercase ${isLight ? 'text-black bg-[#00e5ff] px-3 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' : 'text-blue'}`}>
                            <BarChart3 size={18} /> Computer Vision
                        </div>
                        <div className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-black' : 'bg-mauve/40'}`} />
                        <div className={`flex items-center gap-2 text-sm font-black tracking-[0.2em] uppercase ${isLight ? 'text-black bg-[#d2b8ff] px-3 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' : 'text-teal'}`}>
                            <GraduationCap size={18} /> Researcher
                        </div>
                    </motion.div>

                    <motion.div
                        className={`p-8 rounded-3xl max-w-2xl mx-auto relative overflow-hidden group pointer-events-auto ${isLight ? 'bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]' : 'glass-card border-white/10 shadow-2xl'}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                    >
                        {!isLight && <div className="absolute inset-0 bg-gradient-to-br from-mauve/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />}
                        <p className={`text-lg md:text-xl leading-relaxed text-center relative z-[3] transition-transform group-hover:scale-[1.01] duration-500 ${isLight ? 'text-black font-bold' : 'text-text font-medium'}`}>
                            "Building upon a strong foundation in computer science and research.
                            Focused on predictive modeling and data visualization to solve real-world challenges."
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

const Desktop = ({ userName }) => {
    const { systemSettings } = useApp()
    const isLight = systemSettings?.theme === 'light'
    const [showWelcome, setShowWelcome] = React.useState(true)
    const [currentNotif, setCurrentNotif] = React.useState(null)
    const [showNotif, setShowNotif] = React.useState(false)

    const notifications = [
        { id: 'git', title: 'GitHub', message: 'Someone starred your porto-OS repository.', icon: Github, color: 'text-mauve' },
        { id: 'train', title: 'ML Training', message: 'Training job #442 completed successfully. Final Accuracy: 99.2%.', icon: Cpu, color: 'text-teal' },
        { id: 'recruiter', title: 'System Status', message: 'Detected 4 new visitors from Google Cloud regions.', icon: UserCheck, color: 'text-blue' },
        { id: 'deploy', title: 'Deployment', message: 'Vercel build finished. Your portfolio is up to date.', icon: Globe, color: 'text-green' },
        { id: 'perf', title: 'Performance', message: 'Current system latency: 12ms. All nodes operational.', icon: Activity, color: 'text-orange-400' }
    ]

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false)
        }, 10000) // 10 seconds
        return () => clearTimeout(timer)
    }, [])

    // Notification Loop
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (!systemSettings.dndEnabled && !showWelcome) {
                const randomNotif = notifications[Math.floor(Math.random() * notifications.length)]
                setCurrentNotif(randomNotif)
                setShowNotif(true)

                // Auto hide after 8 seconds
                setTimeout(() => setShowNotif(false), 8000)
            }
        }, 180000) // 3 minutes

        return () => clearInterval(interval)
    }, [systemSettings.dndEnabled, showWelcome])

    return (
        <div className="relative w-full h-full p-6 lg:p-10 overflow-hidden z-[0]">
            {/* Hero Content (Background layer) - z-[1] inside */}
            <HeroContent />

            {/* Welcome Widget - z-[100] inside */}
            <WelcomeWidget
                userName={userName}
                isVisible={showWelcome}
                onClose={() => setShowWelcome(false)}
            />

            {/* Dynamic Notification - z-[100] inside */}
            <NotificationOverlay
                notification={currentNotif}
                isVisible={showNotif}
                onClose={() => setShowNotif(false)}
            />

            {/* Floating hints / Decorative elements */}
            <div className={`absolute bottom-10 right-10 text-right pointer-events-none z-[10] transition-colors duration-500 ${isLight ? 'text-black opacity-100' : 'opacity-30 text-white'}`}>
                <p className="text-[10px] uppercase tracking-widest font-bold">portoOS v1.0.4-beta</p>
                <p className={`text-[10px] ${isLight ? 'font-bold' : 'font-medium'}`}>Arch Linux x Hyprland Kernel</p>
            </div>
        </div>
    )
}

export default Desktop
