import React from 'react'
import { motion, useDragControls } from 'framer-motion'
import { useApp } from '../hooks/useApp'
import { X, Minus, Square } from 'lucide-react'

const Window = ({ id, title, children, zIndex, isActive, isMaximized, isMinimized }) => {
    const { closeApp, minimizeWindow, toggleMaximize, focusWindow, systemSettings } = useApp()
    const isLight = systemSettings?.theme === 'light'
    const controls = useDragControls()

    return (
        <motion.div
            drag={!isMaximized && !isMinimized}
            dragControls={controls}
            dragListener={false}
            dragMomentum={false}
            // Use initial x/y instead of top/left for the "default" small state
            initial={{ opacity: 0, scale: 0.9, y: 100, x: 100 }}
            animate={{
                opacity: isMinimized ? 0 : 1,
                scale: isMinimized ? 0.3 : 1,
                // If maximized, force everything to 0. 
                // If not maximized, let the drag transforms (x, y) handle the position.
                x: isMaximized ? 0 : undefined,
                y: isMinimized ? 600 : (isMaximized ? 0 : undefined),
                zIndex: isMinimized ? 0 : zIndex,
                width: isMaximized ? '100%' : '800px',
                height: isMaximized ? '100%' : '550px',
                // Keep top/left at 0 when maximized, but use a fixed starting point for windowed mode
                top: isMaximized ? 0 : '10vh',
                left: isMaximized ? 0 : '15vw',
                borderRadius: isLight ? 0 : (isMaximized ? 0 : '12px'),
                pointerEvents: isMinimized ? 'none' : 'auto',
            }}
            exit={{ opacity: 0, scale: 0.2, y: 400 }}
            transition={{
                type: 'spring',
                damping: 30,
                stiffness: 300,
                mass: 0.8
            }}
            onPointerDown={() => !isMinimized && focusWindow(id)}
            className={`absolute flex flex-col overflow-hidden transition-colors duration-500 ${isLight ? 'bg-white border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)]' : 'glass-card shadow-2xl'} ${isActive && !isMinimized ? (isLight ? '' : 'ring-1 ring-mauve/30 shadow-mauve/20') : 'opacity-90'}`}
            style={{
                zIndex
            }}
        >
            {/* Window Header / Traffic Lights */}
            <div
                className={`h-11 flex items-center justify-between px-4 transition-colors duration-500 ${isLight ? 'bg-white border-b-4 border-black' : 'bg-white/5 border-b border-white/5'} select-none ${isMaximized || isMinimized ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
                onPointerDown={(e) => !isMaximized && !isMinimized && controls.start(e)}
                onDoubleClick={() => !isMinimized && toggleMaximize(id)}
            >
                <div className="flex items-center gap-3">
                    <button
                        onClick={(e) => { e.stopPropagation(); closeApp(id); }}
                        className={`traffic-light flex items-center justify-center group transition-all ${isLight ? 'w-4 h-4 bg-[#ff90e8] border-2 border-black rounded-none shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none' : 'bg-red hover:brightness-110'}`}
                    >
                        {isLight ? <X size={10} className="text-black font-black" /> : <X size={8} className="text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                        className={`traffic-light flex items-center justify-center group transition-all ${isLight ? 'w-4 h-4 bg-[#ffde59] border-2 border-black rounded-none shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none' : 'bg-yellow hover:brightness-110'}`}
                    >
                        {isLight ? <Minus size={10} className="text-black font-black" /> : <Minus size={8} className="text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); toggleMaximize(id); }}
                        className={`traffic-light flex items-center justify-center group transition-all ${isLight ? 'w-4 h-4 bg-[#00ffa3] border-2 border-black rounded-none shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none' : 'bg-green hover:brightness-110'}`}
                    >
                        {isLight ? <Square size={8} className="text-black font-black" /> : <Square size={6} className="text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </button>
                </div>

                <div className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isLight ? 'text-black' : 'opacity-60 text-white'}`}>
                    {title}
                </div>

                <div className="w-16" /> {/* Spacer to center title */}
            </div>

            {/* Window Content */}
            <div className={`flex-1 overflow-auto custom-scrollbar ${isLight ? 'bg-transparent' : 'bg-base/40'}`}>
                {children}
            </div>
        </motion.div>
    )
}

export default Window
