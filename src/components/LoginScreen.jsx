import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HELLOS = [
    { text: "Hello", lang: "English" },
    { text: "Hola", lang: "Spanish" },
    { text: "Bonjour", lang: "French" },
    { text: "Ciao", lang: "Italian" },
    { text: "こんにちは", lang: "Japanese" },
    { text: "Halo", lang: "Indonesian" },
    { text: "안녕하세요", lang: "Korean" },
    { text: "नमस्ते", lang: "Hindi" },
    { text: "你好", lang: "Chinese" },
    { text: "Olá", lang: "Portuguese" }
]

const LoginScreen = ({ onLogin }) => {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (index < HELLOS.length - 1) {
            const timer = setTimeout(() => {
                setIndex(prev => prev + 1)
            }, 900) // 0.9s per language for better readability
            return () => clearTimeout(timer)
        } else {
            // Stay on the last greeting for 1 second then login
            const finalTimer = setTimeout(() => {
                onLogin('Guest')
            }, 1000)
            return () => clearTimeout(finalTimer)
        }
    }, [index, onLogin])

    return (
        <div
            className="relative w-full h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden cursor-pointer"
            onClick={() => onLogin('Guest')}
        >
            {/* Background with mesh gradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-mauve/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue/10 blur-[150px]" />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="z-10 flex flex-col items-center"
                >
                    <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter">
                        {HELLOS[index].text}
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        className="text-xs uppercase tracking-[0.5em] mt-8 text-white font-medium"
                    >
                        {HELLOS[index].lang}
                    </motion.p>
                </motion.div>
            </AnimatePresence>

            {/* Subtle "Click to skip" hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 2 }}
                className="absolute bottom-12 text-[10px] uppercase tracking-[0.3em] text-white font-medium"
            >
                Tap anywhere to skip
            </motion.div>
        </div>
    )
}

export default LoginScreen
