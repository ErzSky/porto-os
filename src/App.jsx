import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TopBar from './components/TopBar'
import Dock from './components/Dock'
import WindowManager from './components/WindowManager'
import DesktopBackground from './components/DesktopBackground'
import LoginScreen from './components/LoginScreen'
import Desktop from './components/Desktop'
import { useApp } from './hooks/useApp'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState('')
    const { systemSettings } = useApp()

    // Calculate overlay opacity (0-100 to 0.0-1.0 inverted)
    const brightnessAlpha = (100 - systemSettings.brightness) / 100

    return (
        <div className="relative w-full h-screen overflow-hidden font-sans select-none text-text bg-black">
            <AnimatePresence mode="popLayout">
                {!isLoggedIn ? (
                    <motion.div
                        key="login"
                        initial={{ opacity: 1 }}
                        exit={{
                            y: '-100%',
                            transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
                        }}
                        className="absolute inset-0 z-50"
                    >
                        <LoginScreen onLogin={(name) => {
                            setUserName(name)
                            setIsLoggedIn(true)
                        }} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="desktop"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-full h-full"
                    >
                        <DesktopBackground />
                        <div className="relative z-10 flex flex-col h-full">
                            <TopBar userName={userName} />
                            <main className="flex-1 relative overflow-hidden">
                                <Desktop userName={userName} />
                                <WindowManager />
                            </main>
                            <Dock />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Global Brightness Overlay - Functional */}
            <div
                className="fixed inset-0 pointer-events-none z-[10000] bg-black"
                style={{ opacity: brightnessAlpha }}
            />
        </div>
    )
}

export default App
