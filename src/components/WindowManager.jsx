import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../hooks/useApp'
import Window from './Window'

// Sub-app components
import { TerminalApp, SettingsApp, ProjectsApp, EducationApp, GalleryApp, ExperienceApp, PublicationsApp } from '../apps'

const APP_COMPONENTS = {
    terminal: TerminalApp,
    settings: SettingsApp,
    projects: ProjectsApp,
    notepad: EducationApp,
    gallery: GalleryApp,
    experience: ExperienceApp,
    publications: PublicationsApp,
}

const APP_METADATA = {
    terminal: { title: 'Terminal - About Me' },
    settings: { title: 'System Preferences - Skills' },
    projects: { title: 'Arena - Project TCG' },
    notepad: { title: 'Education - Academic Journey' },
    gallery: { title: 'Media Gallery - Certificates' },
    experience: { title: 'Experience - Professional Journey' },
    publications: { title: 'Zen Browser - Research Publications' },
}

const WindowManager = () => {
    const { openWindows, activeWindow } = useApp()

    return (
        <div className="absolute inset-0 pointer-events-none p-4 overflow-hidden">
            <AnimatePresence>
                {openWindows.map((win) => {
                    const Content = APP_COMPONENTS[win.id]
                    const metadata = APP_METADATA[win.id]

                    if (!Content) return null

                    return (
                        <Window
                            key={win.id}
                            id={win.id}
                            title={metadata?.title || win.id}
                            zIndex={win.zIndex}
                            isActive={activeWindow === win.id}
                            isMaximized={win.isMaximized}
                            isMinimized={win.isMinimized}
                        >
                            <Content />
                        </Window>
                    )
                })}
            </AnimatePresence>
        </div>
    )
}

export default WindowManager
