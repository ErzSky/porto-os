import React from 'react'

const AppPlaceholder = ({ name }) => (
    <div className="w-full h-full flex items-center justify-center flex-col gap-4 text-subtext p-10">
        <h2 className="text-2xl font-bold text-text">{name}</h2>
        <p>This application is currently under development.</p>
        <div className="w-64 h-2 bg-overlay rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-mauve animate-pulse" />
        </div>
    </div>
)

export const SettingsApp = () => <AppPlaceholder name="System Preferences (Skills)" />
export const ExplorerApp = () => <AppPlaceholder name="File Explorer (Projects)" />
export const NotepadApp = () => <AppPlaceholder name="Notepad (Education)" />
export const GalleryApp = () => <AppPlaceholder name="Media Gallery (Certificates)" />
