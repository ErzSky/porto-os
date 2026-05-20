import React, { useState, useEffect } from 'react'
import profileImg from '../assets/images/profile.png'
import { useApp } from '../hooks/useApp'

const commands = [
    "sudo pacman -Syu",
    "neofetch",
    "ls -la /home/erzsky/projects",
    "git status",
    "git push origin master",
    "whoami",
    "uptime",
    "curl -s https://api.github.com/users/erzsky"
];

const TerminalApp = () => {
    const { systemSettings } = useApp();
    const isLight = systemSettings?.theme === 'light';
    const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);

    useEffect(() => {
        const handleTyping = () => {
            const fullText = commands[currentCommandIndex];

            if (isDeleting) {
                setDisplayedText(prev => prev.slice(0, -1));
                setTypingSpeed(50);
            } else {
                setDisplayedText(prev => fullText.slice(0, prev.length + 1));
                setTypingSpeed(100);
            }

            if (!isDeleting && displayedText === fullText) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && displayedText === "") {
                setIsDeleting(false);
                setCurrentCommandIndex(prev => (prev + 1) % commands.length);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentCommandIndex, typingSpeed]);

    return (
        <div className={`p-6 font-mono text-sm h-full flex flex-col gap-2 overflow-y-auto transition-colors duration-500 ${isLight ? 'bg-[#ff90e8] text-black' : ''}`}>
            <div className={`flex items-center gap-2 ${isLight ? 'text-black font-black' : 'text-green'}`}>
                <span className={`${isLight ? '' : 'opacity-70'}`}>➜</span>
                <span className="font-bold">~</span>
                <span className={`${isLight ? '' : 'opacity-70'}`}>whoami</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 mt-4">
                <div className={`w-40 h-40 sm:w-44 sm:h-44 shrink-0 overflow-hidden ${isLight ? 'border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white' : 'rounded-xl border-2 border-mauve/30 shadow-2xl shadow-mauve/10'}`}>
                    <img
                        src={profileImg}
                        alt="Muhammad Naufal Erza Farandi"
                        className={`w-full h-full object-cover transition-all duration-500 transform hover:scale-110 ${isLight ? 'contrast-125' : 'grayscale hover:grayscale-0'}`}
                    />
                </div>
                <div className={`space-y-2 py-2 ${isLight ? 'font-bold' : ''}`}>
                    <p><span className={`${isLight ? 'bg-black text-[#ffde59] px-1' : 'text-mauve font-bold'}`}>NAME</span>: Muhammad Naufal Erza Farandi</p>
                    <p><span className={`${isLight ? 'bg-black text-[#ffde59] px-1' : 'text-mauve font-bold'}`}>ROLE</span>: Data Scientist & Researcher</p>
                    <p><span className={`${isLight ? 'bg-black text-[#ffde59] px-1' : 'text-mauve font-bold'}`}>EDU</span>: MS in Data Science @ Telkom University</p>
                    <p><span className={`${isLight ? 'bg-black text-[#ffde59] px-1' : 'text-mauve font-bold'}`}>OS</span>: portoOS x Arch Linux</p>
                    <p><span className={`${isLight ? 'bg-black text-[#ffde59] px-1' : 'text-mauve font-bold'}`}>WM</span>: Hyprland</p>
                </div>
            </div>
            <div className="mt-8 space-y-4">
                <p className={`${isLight ? 'text-black font-black bg-white border-2 border-black px-2 py-1 inline-block shadow-[4px_4px_0px_rgba(0,0,0,1)]' : 'text-blue font-bold'}`}># Professional Summary</p>
                <div className={`space-y-4 leading-relaxed text-justify ${isLight ? 'font-bold bg-white border-4 border-black p-4 shadow-[8px_8px_0px_rgba(0,0,0,1)]' : 'text-text opacity-90'}`}>
                    <p>
                        I am a Data Science Master's student at Telkom University.
                        I completed my Bachelor's from Dian Nuswantoro University in just 3.5 years through a journal publication route.
                    </p>
                    <p>
                        My background is heavily rooted in research, with experience in NLP and computer vision,
                        four published journals (two international, two national), and a research-focused student exchange
                        at Universiti Teknikal Malaysia (UTeM).
                    </p>
                </div>
                <div className={`flex gap-2 items-center p-2 mt-4 ${isLight ? 'bg-white border-4 border-black font-black shadow-[4px_4px_0px_rgba(0,0,0,1)]' : 'bg-black/20 rounded-lg border border-white/5'}`}>
                    <span className={`${isLight ? 'text-black' : 'text-green'}`}>➜</span>
                    <span className={`${isLight ? 'text-black font-bold' : 'text-text'}`}>{displayedText}</span>
                    <span className={`w-2 h-5 animate-pulse ${isLight ? 'bg-black' : 'bg-mauve'}`}></span>
                </div>
            </div>
        </div>
    )
}

export default TerminalApp
