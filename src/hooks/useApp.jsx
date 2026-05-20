import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const useApp = () => useContext(AppContext)

// Start z-index high to stay above desktop background elements
const BASE_Z_INDEX = 100

export const AppProvider = ({ children }) => {
    const [openWindows, setOpenWindows] = useState([])
    const [activeWindow, setActiveWindow] = useState(null)
    const [systemSettings, setSystemSettings] = useState({
        brightness: 100,
        wifiEnabled: true,
        bluetoothEnabled: false,
        soundVolume: 65,
        dndEnabled: false,
        theme: 'dark'
    })

    const updateSetting = (key, value) => {
        setSystemSettings(prev => ({ ...prev, [key]: value }))
    }

    const openApp = (appId) => {
        if (!openWindows.find(win => win.id === appId)) {
            setOpenWindows([...openWindows, {
                id: appId,
                zIndex: BASE_Z_INDEX + openWindows.length + 1,
                isMinimized: false,
                isMaximized: ['experience', 'projects', 'settings'].includes(appId) // Open Map, IDE and Skills in full screen by default
            }])
        } else {
            // If already open but minimized, restore it
            setOpenWindows(openWindows.map(win =>
                win.id === appId ? { ...win, isMinimized: false } : win
            ))
        }
        focusWindow(appId)
    }

    const closeApp = (appId) => {
        setOpenWindows(openWindows.filter(win => win.id !== appId))
        if (activeWindow === appId) {
            const remaining = openWindows.filter(win => win.id !== appId)
            setActiveWindow(remaining.length > 0 ? remaining[remaining.length - 1].id : null)
        }
    }

    const focusWindow = (appId) => {
        setActiveWindow(appId)
        setOpenWindows(prev => {
            const maxZ = Math.max(BASE_Z_INDEX, ...prev.map(w => w.zIndex))
            return prev.map(win =>
                win.id === appId ? { ...win, zIndex: maxZ + 1 } : win
            )
        })
    }

    const minimizeWindow = (appId) => {
        setOpenWindows(prev => prev.map(win =>
            win.id === appId ? { ...win, isMinimized: true } : win
        ))
        setActiveWindow(null)
    }

    const toggleMaximize = (appId) => {
        setOpenWindows(prev => prev.map(win =>
            win.id === appId ? { ...win, isMaximized: !win.isMaximized } : win
        ))
    }

    return (
        <AppContext.Provider value={{
            openWindows,
            activeWindow,
            openApp,
            closeApp,
            focusWindow,
            minimizeWindow,
            toggleMaximize,
            systemSettings,
            updateSetting
        }}>
            {children}
        </AppContext.Provider>
    )
}
