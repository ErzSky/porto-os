import React from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../hooks/useApp'

const DesktopBackground = () => {
    const { systemSettings } = useApp()
    const isLight = systemSettings?.theme === 'light'

    return (
        <div className={`fixed inset-0 z-0 overflow-hidden transition-colors duration-500 ${isLight ? 'bg-[#fdfaf6]' : 'bg-[#1e1e2e]'}`}>
            {/* Animated Mesh Gradient - Only in Dark Mode */}
            {!isLight && (
                <motion.div
                    className="absolute inset-0 opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 2 }}
                >
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-mauve/20 blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue/10 blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-sapphire/15 blur-[100px] animate-pulse" style={{ animationDelay: '4s' }} />
                    <div className="absolute bottom-[20%] left-[10%] w-[45%] h-[45%] rounded-full bg-teal/10 blur-[130px] animate-pulse" style={{ animationDelay: '1s' }} />
                </motion.div>
            )}

            {/* Noise Texture Overlay */}
            {!isLight && <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />}

            {/* Grid */}
            <div className={`absolute inset-0 bg-[size:40px_40px] transition-colors duration-500 ${isLight ? 'bg-[linear-gradient(rgba(0,0,0,0.15)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.15)_2px,transparent_2px)]' : 'bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]'}`} />
        </div>
    )
}

export default DesktopBackground
