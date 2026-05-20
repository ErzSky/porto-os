import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../hooks/useApp'
import {
    Wifi,
    Bluetooth,
    Moon,
    Bell,
    BellOff,
    Volume2,
    Sun,
    Power,
    RotateCcw,
    Monitor,
    Shield,
    Coffee
} from 'lucide-react'

const ControlToggle = ({ icon: Icon, isActive, onClick, isLight, toggleColor = 'bg-[#ffde59]' }) => (
    <div
        onClick={onClick}
        className={`flex items-center justify-center h-14 cursor-pointer transition-all ${isLight ? `border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] ${isActive ? `${toggleColor} text-black hover:-translate-y-1` : 'bg-white text-black/50 hover:text-black hover:bg-white'}` : `rounded-2xl ${isActive ? 'bg-blue text-white shadow-lg shadow-blue/20' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}`}
    >
        <Icon size={20} />
    </div>
)

const ControlSlider = ({ icon: Icon, value, onChange, label, isLight }) => (
    <div className="space-y-2">
        <div className="flex items-center justify-between px-2">
            <span className={`text-[10px] font-black uppercase tracking-widest ${isLight ? 'text-black' : 'text-white/30'}`}>{label}</span>
            <span className={`text-[10px] font-bold ${isLight ? 'text-black' : 'text-white/60'}`}>{value}%</span>
        </div>
        <div className={`flex items-center gap-4 p-3 ${isLight ? 'bg-white border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]' : 'bg-white/5 rounded-2xl border border-white/5'}`}>
            <Icon size={16} className={`${isLight ? 'text-black' : 'text-white/40'}`} />
            <input
                type="range"
                min="10"
                max="100"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className={`flex-1 h-1 cursor-pointer outline-none ${isLight ? 'accent-black bg-black/10' : 'accent-blue rounded-full bg-white/10'}`}
            />
        </div>
    </div>
)

const Calendar = ({ isLight }) => {
    const date = new Date()
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    const currentDay = date.getDate()

    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    const emptyDays = Array(firstDay).fill(null)
    const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)

    return (
        <div className={`p-5 space-y-4 ${isLight ? 'bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]' : 'bg-white/5 border border-white/5 rounded-3xl shadow-inner'}`}>
            <div className={`flex items-center justify-between ${isLight ? 'text-black' : 'text-white'}`}>
                <span className="text-sm font-black tracking-tight">
                    {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </span>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red/40" />
                    <div className="w-2 h-2 rounded-full bg-orange/40" />
                    <div className="w-2 h-2 rounded-full bg-green/40" />
                </div>
            </div>
            <div className={`grid grid-cols-7 gap-y-2 text-center text-[10px] font-black uppercase tracking-widest ${isLight ? 'text-black/50' : 'text-white/20'}`}>
                {days.map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-y-1 text-center">
                {emptyDays.map((_, i) => <div key={`empty-${i}`} />)}
                {monthDays.map(d => (
                    <div
                        key={d}
                        className={`text-[12px] font-bold py-1.5 transition-all ${isLight ? (d === currentDay ? 'bg-[#00ffa3] text-black border-2 border-black scale-110 shadow-[2px_2px_0px_rgba(0,0,0,1)]' : 'text-black hover:bg-[#ffde59] hover:border-2 hover:border-black cursor-pointer') : (d === currentDay ? 'bg-blue text-white rounded-lg shadow-lg shadow-blue/30 scale-110' : 'rounded-lg text-white/60 hover:text-white hover:bg-white/10 cursor-pointer')}`}
                    >
                        {d}
                    </div>
                ))}
            </div>
        </div>
    )
}

const ControlCenter = ({ isOpen, onClose }) => {
    const { systemSettings, updateSetting } = useApp()
    const isLight = systemSettings?.theme === 'light'

    const handleRestart = () => {
        window.location.reload()
    }

    const handleShutdown = () => {
        window.location.href = '/'
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop for click outside */}
                    <div className="fixed inset-0 z-[1999]" onClick={onClose} />

                    <motion.div
                        initial={{ opacity: 0, y: -20, x: 20, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -20, x: 20, scale: 0.95, filter: 'blur(10px)' }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className={`fixed top-14 right-4 w-[380px] p-6 z-[2000] overflow-hidden transition-colors duration-500 ${isLight ? 'bg-white border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)]' : 'bg-[#1a1c2c]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)]'}`}
                    >
                        {/* Status Bar */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 flex items-center justify-center ${isLight ? 'bg-[#00ffa3] border-4 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' : 'rounded-2xl bg-white/5 border border-white/5'}`}>
                                    <Shield size={20} className={`${isLight ? 'text-black' : 'text-blue'}`} />
                                </div>
                                <div className="flex flex-col">
                                    <span className={`text-[12px] font-black leading-tight ${isLight ? 'text-black' : 'text-white'}`}>System Secure</span>
                                    <span className={`text-[10px] font-bold tracking-tight uppercase ${isLight ? 'text-black/60' : 'text-white/30'}`}>v1.0.4 Catalina - ARM64</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleRestart}
                                    className={`p-2.5 transition-colors ${isLight ? 'bg-white border-2 border-black text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-[#ff90e8]' : 'rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white'}`}
                                >
                                    <RotateCcw size={16} />
                                </button>
                                <button
                                    onClick={handleShutdown}
                                    className={`p-2.5 transition-all ${isLight ? 'bg-white border-2 border-black text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-red hover:text-white' : 'rounded-xl bg-red/10 border border-red/20 text-red hover:bg-red hover:text-white'}`}
                                >
                                    <Power size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Toggles Grid */}
                        <div className="grid grid-cols-4 gap-4 mb-8">
                            <ControlToggle
                                icon={Wifi}
                                isActive={systemSettings.wifiEnabled}
                                onClick={() => updateSetting('wifiEnabled', !systemSettings.wifiEnabled)}
                                isLight={isLight}
                                toggleColor="bg-[#00e5ff]"
                            />
                            <ControlToggle
                                icon={Bluetooth}
                                isActive={systemSettings.bluetoothEnabled}
                                onClick={() => updateSetting('bluetoothEnabled', !systemSettings.bluetoothEnabled)}
                                isLight={isLight}
                                toggleColor="bg-[#d2b8ff]"
                            />
                            <ControlToggle
                                icon={systemSettings.theme === 'dark' ? Moon : Sun}
                                isActive={systemSettings.theme === 'dark'}
                                onClick={() => updateSetting('theme', systemSettings.theme === 'dark' ? 'light' : 'dark')}
                                isLight={isLight}
                                toggleColor="bg-[#ffde59]"
                            />
                            <ControlToggle
                                icon={systemSettings.dndEnabled ? BellOff : Bell}
                                isActive={systemSettings.dndEnabled}
                                onClick={() => updateSetting('dndEnabled', !systemSettings.dndEnabled)}
                                isLight={isLight}
                                toggleColor="bg-[#ff90e8]"
                            />
                        </div>

                        {/* Sliders */}
                        <div className="space-y-6 mb-8">
                            <ControlSlider
                                icon={Sun}
                                label="Display"
                                value={systemSettings.brightness}
                                onChange={(val) => updateSetting('brightness', val)}
                                isLight={isLight}
                            />
                        </div>

                        {/* Calendar Section */}
                        <Calendar isLight={isLight} />

                        {/* Bottom Bar Stats */}
                        <div className={`mt-8 pt-6 flex items-center justify-between ${isLight ? 'border-t-4 border-black' : 'border-t border-white/5'}`}>
                            <div className="flex items-center gap-4">
                                <div className={`flex items-center gap-1.5 ${isLight ? 'text-black' : 'text-white/40'}`}>
                                    <Monitor size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Uptime: 2h 43m</span>
                                </div>
                            </div>
                            <button className={`flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-colors group ${isLight ? 'bg-white border-4 border-black text-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-[#ffde59]' : 'rounded-xl bg-white/5 border border-white/5 text-white/60 hover:bg-white/10'}`}>
                                <Coffee size={14} className="group-hover:rotate-12 transition-transform" />
                                <span>Focus Mode</span>
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default ControlCenter
