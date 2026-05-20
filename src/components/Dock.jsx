import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useApp } from '../hooks/useApp'
import { Terminal, Settings, Folder, FileText, Image, Github, Linkedin, Mail, Briefcase, School, Globe, GraduationCap, Layout, FileCode, GalleryHorizontal, Gamepad2, GalleryThumbnailsIcon, GalleryVerticalEnd, Instagram } from 'lucide-react'

const APPS = [
    { id: 'terminal', icon: Terminal, color: 'text-mauve', label: 'About Me', lightBg: 'bg-[#FF90E8]' },
    { id: 'notepad', icon: GraduationCap, color: 'text-mauve', label: 'Education', lightBg: 'bg-[#00FFA3]' },
    { id: 'experience', icon: Briefcase, color: 'text-blue', label: 'Experience', lightBg: 'bg-[#00E5FF]' },
    { id: 'publications', icon: Globe, color: 'text-teal', label: 'Publications', lightBg: 'bg-[#D2B8FF]' },
    { id: 'projects', icon: FileCode, color: 'text-blue', label: 'Projects', lightBg: 'bg-[#FFDE59]' },
    { id: 'settings', icon: Gamepad2, color: 'text-blue', label: 'Skills', lightBg: 'bg-[#FF90E8]' },
    { id: 'gallery', icon: Image, color: 'text-peach', label: 'Certificates', lightBg: 'bg-[#00FFA3]' },
]

const SOCIALS = [
    { id: 'instagram', icon: Instagram, color: 'text-pink', label: 'Instagram', url: 'https://instagram.com/erza.frd', lightBg: 'bg-[#00E5FF]' },
    { id: 'linkedin', icon: Linkedin, color: 'text-blue', label: 'LinkedIn', url: 'https://www.linkedin.com/in/erza-farandi', lightBg: 'bg-[#D2B8FF]' },
    { id: 'mail', icon: Mail, color: 'text-peach', label: 'Contact', url: 'mailto:erza.naufal@gmail.com', lightBg: 'bg-[#FFDE59]' },
]

const DockIcon = ({ app, mouseX, isLight }) => {
    const { openApp, openWindows } = useApp()
    const ref = React.useRef(null)

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
        return val - bounds.x - bounds.width / 2
    })

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 70, 40])
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

    const isOpen = openWindows.some(win => win.id === app.id)

    const Component = app.url ? motion.a : motion.div
    const componentProps = app.url ? {
        href: app.url,
        target: "_blank",
        rel: "noopener noreferrer"
    } : {
        onClick: () => openApp(app.id)
    }

    return (
        <Component
            ref={ref}
            style={{ width }}
            {...componentProps}
            className={`group relative aspect-square flex items-center justify-center cursor-pointer transition-all ${isLight ? `${app.lightBg} border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-1` : 'rounded-2xl glass hover:bg-white/20'}`}
        >
            <app.icon className={`w-1/2 h-1/2 ${isLight ? 'text-black' : app.color}`} />

            {/* Tooltip */}
            <div className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none ${isLight ? 'bg-white border-2 border-black text-black font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)]' : 'rounded-lg glass-dark'}`}>
                {app.label}
            </div>

            {/* Indicator for open app */}
            {isOpen && (
                <div className={`absolute -bottom-1.5 w-1 h-1 rounded-full ${isLight ? 'bg-black' : 'bg-white'}`} />
            )}
        </Component>
    )
}

const Dock = () => {
    const mouseX = useMotionValue(Infinity)
    const { systemSettings } = useApp()
    const isLight = systemSettings?.theme === 'light'

    return (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50 pointer-events-none">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className={`flex items-end gap-3 px-4 py-3 pointer-events-auto transition-colors duration-500 ${isLight ? 'bg-white border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]' : 'rounded-[24px] glass-dark border-white/5'}`}
            >
                {APPS.map((app) => (
                    <DockIcon key={app.id} app={app} mouseX={mouseX} isLight={isLight} />
                ))}

                <div className={`w-px h-8 mx-1 self-center ${isLight ? 'bg-black' : 'bg-white/10'}`} />

                {SOCIALS.map((social) => (
                    <DockIcon key={social.id} app={social} mouseX={mouseX} isLight={isLight} />
                ))}
            </motion.div>
        </div>
    )
}

export default Dock
