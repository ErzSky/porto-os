import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Cpu,
    Target,
    Zap,
    Shield,
    RotateCcw,
    TrendingUp,
    Info,
    X,
    Maximize2,
    Code2,
    BrainCircuit,
    Network,
    Binary,
    Layers,
    Terminal,
    Database,
    LineChart,
    Search as SearchIcon,
    Flame,
    Trash2,
    Smartphone,
    Globe,
    Gamepad2,
    MessageSquare,
    Activity,
    Layout,
    Lock,
    Table,
    Bot,
    Wand2,
    Eye,
    BarChart3,
    Workflow,
    HardDrive,
    Monitor,
    Braces,
    Sheet,
    Phone,
    Lightbulb
} from 'lucide-react'

const Emoji = (char) => ({ size, className }) => (
    <span className={className} style={{ fontSize: size, lineHeight: 1, display: 'inline-block' }}>{char}</span>
);

// --- Game Data Definition ---

const TRAITS = {
    ai: { name: 'Deep Learning', icon: BrainCircuit, colors: 'from-purple-400 to-purple-600', tiers: [2, 4], desc: ['+20% Model Accuracy', '+50% Reasoning'], longDesc: 'Specialization in artificial neural network architecture for high-level information processing.' },
    nlp: { name: 'Natural Language', icon: MessageSquare, colors: 'from-blue-400 to-blue-600', tiers: [2, 3], desc: ['+30% Intent Recognition', '+60% Voice Fluidity'], longDesc: 'Human language processing through advanced linguistic modeling.' },
    cv: { name: 'Comp Vision', icon: Eye, colors: 'from-emerald-400 to-emerald-600', tiers: [2, 4], desc: ['+25% Pixel Precision', '+45% Object Detection'], longDesc: 'System capabilities to see and interpret visual data with high precision.' },
    mobile: { name: 'Mobile Architect', icon: Smartphone, colors: 'from-cyan-400 to-cyan-600', tiers: [2, 3], desc: ['+40% UX Responsiveness', '+15ms Latency Reduction'], longDesc: 'Building responsive and efficient cross-platform mobile experiences.' },
    robotics: { name: 'Robotics', icon: Cpu, colors: 'from-orange-400 to-orange-600', tiers: [2], desc: ['+50% Actuator Precision'], longDesc: 'Integration of physical control systems with artificial intelligence for device automation.' },
    data: { name: 'Data Master', icon: BarChart3, colors: 'from-yellow-400 to-yellow-600', tiers: [2, 4], desc: ['+15% Processing Speed', '+40% Insight Depth'], longDesc: 'Extraction of valuable insights from large unstructured datasets.' },
    networking: { name: 'Networking', icon: Network, colors: 'from-blue-500 to-indigo-600', tiers: [2, 3], desc: ['+100Gbps Throughput', '-50% Packet Loss'], longDesc: 'Optimization of data communication paths and global network infrastructure.' },
    security: { name: 'Encryption', icon: Lock, colors: 'from-slate-600 to-slate-900', tiers: [2], desc: ['+100% Data Protection'], longDesc: 'Data and privacy protection through industry cryptographic standards.' },
    agent: { name: 'AI Agent', icon: Zap, colors: 'from-amber-400 to-orange-600', tiers: [2, 3], desc: ['+50% Task Autonomy', '+20% Edge Inference'], longDesc: 'Building autonomous entities capable of performing complex tasks independently.' },
    llm: { name: 'LLM Mastery', icon: Wand2, colors: 'from-fuchsia-500 to-purple-800', tiers: [2], desc: ['+80% Context Awareness'], longDesc: 'Mastery of large language models for reasoning and creative problem solving.' },
    web: { name: 'Web Dev', icon: Globe, colors: 'from-pink-400 to-rose-600', tiers: [2], desc: ['+30% SSR Speed'], longDesc: 'Development of modern web interfaces with high performance and scalability.' }
};

const SKILL_UNITS = [
    { id: 'python', name: 'Python', traits: ['ai', 'nlp', 'cv', 'data', 'agent', 'security', 'llm'], icon: Emoji('🐍'), cost: 1, level: 'Core Language' },
    { id: 'dart', name: 'Dart', traits: ['mobile'], icon: Phone, cost: 1, level: 'Core Language' },
    { id: 'csharp', name: 'C#', traits: ['robotics'], icon: Braces, cost: 1, level: 'Core Language' },
    { id: 'sql', name: 'SQL', traits: ['data'], icon: Database, cost: 1, level: 'Core Database' },
    { id: 'react', name: 'React', traits: ['web'], icon: Braces, cost: 2, level: 'UI Library' },
    { id: 'numpy', name: 'Numpy', traits: ['data', 'cv'], icon: Binary, cost: 2, level: 'Scientific Library' },
    { id: 'pandas', name: 'Pandas', traits: ['data'], icon: Sheet, cost: 2, level: 'Data Manipulation' },
    { id: 'sklearn', name: 'Scikit-Learn', traits: ['ai', 'data'], icon: TrendingUp, cost: 2, level: 'Machine Learning' },
    { id: 'isar', name: 'Isar DB', traits: ['data', 'mobile'], icon: HardDrive, cost: 2, level: 'Mobile Database' },
    { id: 'oauth', name: 'OAuth', traits: ['security'], icon: Lock, cost: 2, level: 'Auth Protocol' },
    { id: 'flutter', name: 'Flutter', traits: ['mobile'], icon: Smartphone, cost: 3, level: 'Framework' },
    { id: 'unity', name: 'Unity', traits: ['robotics'], icon: Gamepad2, cost: 3, level: 'Game Engine' },
    { id: 'nextjs', name: 'Next.js', traits: ['web', 'networking'], icon: Layout, cost: 3, level: 'Web Framework' },
    { id: 'supabase', name: 'Supabase', traits: ['security', 'data', 'web'], icon: Zap, cost: 3, level: 'Backend Service' },
    { id: 'streamlit', name: 'Streamlit', traits: ['web', 'data'], icon: Monitor, cost: 3, level: 'Web Dashboard' },
    { id: 'powerbi', name: 'Power BI', traits: ['data'], icon: Activity, cost: 3, level: 'Business Intelligence' },
    { id: 'tensorflow', name: 'Tensorflow', traits: ['ai', 'cv', 'nlp'], icon: Flame, cost: 4, level: 'Deep Learning' },
    { id: 'langchain', name: 'LangChain', traits: ['agent', 'llm'], icon: Workflow, cost: 4, level: 'Orchestration' },
    { id: 'openai', name: 'LLM', traits: ['ai', 'nlp', 'agent', 'llm'], icon: Bot, cost: 5, level: 'Expert Intelligence' }
];

// --- Sub-components ---

const UnitIcon = ({ unit, size = "md", onSelect, isSelected, onDrop, onDragStart, onDragEnd }) => {
    const isSmall = size === "sm";
    const stars = unit.stars || 1;

    return (
        <motion.div
            id={unit.id}
            layoutId={unit.id}
            drag
            dragSnapToOrigin
            whileDrag={{ zIndex: 1000, scale: 1.1, cursor: 'grabbing' }}
            onDragStart={onDragStart}
            onDragEnd={(e, info) => {
                const point = e.clientX !== undefined ? { x: e.clientX, y: e.clientY } : info.point;
                onDragEnd?.();
                onDrop?.(point);
            }}
            onClick={() => onSelect?.(unit)}
            className={`relative ${isSmall ? 'w-10 h-10' : 'w-16 h-16'} rounded-xl bg-surface0/90 border-2 transition-all cursor-grab active:cursor-grabbing shadow-2xl overflow-visible flex items-center justify-center
                ${isSelected ? 'border-yellow-400 ring-4 ring-yellow-400/20 scale-105' : 'border-white/10 group-hover:border-white/30'}
                ${stars === 2 ? 'shadow-[0_0_15px_rgba(255,255,255,0.2)]' : stars === 3 ? 'shadow-[0_0_25px_rgba(234,179,8,0.4)]' : ''}`}
        >
            <div className={`absolute inset-0 bg-gradient-to-br opacity-40 ${TRAITS[unit.traits[0]]?.colors}`} />

            {/* Star Display */}
            <div className="absolute -top-3 inset-x-0 flex justify-center gap-0.5 z-30">
                {Array(stars).fill(0).map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-full ${stars === 3 ? 'bg-yellow-400 shadow-[0_0_5px_#fbbf24]' : stars === 2 ? 'bg-slate-300' : 'bg-orange-600'} border border-black/40 flex items-center justify-center`}>
                        <Zap size={6} className="text-black" />
                    </div>
                ))}
            </div>

            <unit.icon size={isSmall ? 16 : 24} className={`text-white relative z-10 ${stars === 3 ? 'drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'}`} />

            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-yellow-500 border border-black/20 flex items-center justify-center text-[9px] font-black text-black shadow-lg z-20`}>
                {unit.cost}
            </div>

            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        </motion.div>
    );
};

const TraitTooltip = ({ synergy, units, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            style={{ top: `${synergy.yPos}px` }}
            className="absolute left-[240px] -translate-y-12 w-72 bg-[#1a1c2c]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] z-[5000]"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${synergy.colors} shadow-lg`}>
                        <synergy.icon size={18} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-white leading-tight">{synergy.name}</h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Synergy Data</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-colors">
                    <X size={18} />
                </button>
            </div>

            <div className="space-y-5">
                {synergy.longDesc && (
                    <p className="text-xs text-white/60 leading-relaxed italic border-l-2 border-white/10 pl-3">
                        {synergy.longDesc}
                    </p>
                )}

                <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-white/30">
                        <Info size={12} />
                        <span className="text-[8px] font-black uppercase tracking-widest">Active Bonuses</span>
                    </div>
                    <div className="space-y-1.5">
                        {synergy.tiers.map((t, i) => {
                            const isActive = synergy.count >= t;
                            return (
                                <div key={i} className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all ${isActive ? 'bg-blue/10 border-blue/40 text-white' : 'bg-white/5 border-white/5 text-white/30'}`}>
                                    <div className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-black ${isActive ? 'bg-blue text-white' : 'bg-white/10'}`}>
                                        {t}
                                    </div>
                                    <p className="text-[11px] font-medium leading-tight">{synergy.desc[i] || synergy.desc[0]}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-white/30">
                        <Layers size={12} />
                        <span className="text-[8px] font-black uppercase tracking-widest">Synergy Members</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                        {units.map((unit) => (
                            <div key={unit.id} className="group relative">
                                <div className="aspect-square rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden transition-all group-hover:border-white/30 group-hover:bg-white/10">
                                    <unit.icon size={16} className="text-white opacity-40 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const SettingsApp = () => {
    const [board, setBoard] = useState(Array(14).fill(null));
    const [bench, setBench] = useState(Array(9).fill(null));
    const [shop, setShop] = useState(SKILL_UNITS.sort(() => 0.5 - Math.random()).slice(0, 5));
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [selectedTrait, setSelectedTrait] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [showInfo, setShowInfo] = useState(true);
    const [showSkillDex, setShowSkillDex] = useState(false);

    const arenaRef = React.useRef(null);
    const benchRef = React.useRef(null);
    const sellRef = React.useRef(null);

    const activeSynergies = useMemo(() => {
        const counts = {};
        board.forEach(slot => {
            if (slot) {
                slot.traits.forEach(t => counts[t] = (counts[t] || 0) + 1);
            }
        });
        return Object.entries(counts).map(([id, count]) => {
            const trait = TRAITS[id];
            const activeTier = trait.tiers.filter(t => count >= t).length;
            const members = SKILL_UNITS.filter(u => u.traits.includes(id));
            return { id, count, ...trait, activeTier, members };
        }).sort((a, b) => b.activeTier - a.activeTier || b.count - a.count);
    }, [board]);

    const getAvailableUnits = (count = 5) => {
        const ownedIds = new Set([
            ...board.filter(Boolean).map(u => u.id),
            ...bench.filter(Boolean).map(u => u.id)
        ]);
        return SKILL_UNITS
            .filter(u => !ownedIds.has(u.id))
            .sort(() => 0.5 - Math.random())
            .slice(0, count);
    };

    const checkStarUp = (currentBoard, currentBench) => {
        let updatedBoard = [...currentBoard];
        let updatedBench = [...currentBench];
        let changed = false;

        const allSlots = [
            ...updatedBoard.map((u, i) => ({ unit: u, source: 'board', index: i })),
            ...updatedBench.map((u, i) => ({ unit: u, source: 'bench', index: i }))
        ].filter(s => s.unit !== null);

        // Group by unit ID and Star level
        const groups = {};
        allSlots.forEach(s => {
            const key = `${s.unit.id}_${s.unit.stars || 1}`;
            if (!groups[key]) groups[key] = [];
            groups[key].push(s);
        });

        Object.keys(groups).forEach(key => {
            const group = groups[key];
            if (group.length >= 3 && (group[0].unit.stars || 1) < 3) {
                // Take the first 3
                const toCombine = group.slice(0, 3);
                // Keep the first one as the "evolved" one
                const evolved = toCombine[0];
                const others = toCombine.slice(1);

                // Update evolved unit
                const newUnit = { ...evolved.unit, stars: (evolved.unit.stars || 1) + 1 };
                if (evolved.source === 'board') updatedBoard[evolved.index] = newUnit;
                else updatedBench[evolved.index] = newUnit;

                // Remove others
                others.forEach(o => {
                    if (o.source === 'board') updatedBoard[o.index] = null;
                    else updatedBench[o.index] = null;
                });

                changed = true;
            }
        });

        if (changed) {
            // Recursive check for next star tier
            return checkStarUp(updatedBoard, updatedBench);
        }

        return { board: updatedBoard, bench: updatedBench };
    };

    const handleBuy = (unit, shopIndex) => {
        const freeBenchIndex = bench.findIndex(s => s === null);
        if (freeBenchIndex !== -1) {
            const newUnit = { ...unit, source: 'bench', index: freeBenchIndex, stars: 1 };

            // Temporary new bench to check star-up
            const tempBench = [...bench];
            tempBench[freeBenchIndex] = newUnit;

            const { board: nextBoard, bench: nextBench } = checkStarUp(board, tempBench);

            setBoard(nextBoard);
            setBench(nextBench);
            setShop(prev => {
                const newShop = [...prev];
                newShop[shopIndex] = null;
                return newShop;
            });
        }
    };

    const handleSellSelected = () => {
        if (!selectedUnit) return;
        if (selectedUnit.source === 'board') {
            setBoard(prev => { const b = [...prev]; b[selectedUnit.index] = null; return b; });
        } else {
            setBench(prev => { const b = [...prev]; b[selectedUnit.index] = null; return b; });
        }
        setSelectedUnit(null);
    };

    const detectDropZone = (point, unit, sourceIndex) => {
        // Use elementsFromPoint (plural) to find the slot BEHIND the dragging unit
        const elements = document.elementsFromPoint(point.x, point.y);

        // Find the first element that is a valid slot and is NOT the unit's source slot
        const slotEl = elements.map(el => el.closest('[data-slot-type]')).find(el => {
            if (!el) return false;
            const type = el.getAttribute('data-slot-type');
            const idx = parseInt(el.getAttribute('data-slot-index'));
            // Ignore the source slot to find what's "behind" it
            if (type === unit.source && idx === sourceIndex) return false;
            return true;
        });

        if (!slotEl) return;

        const slotType = slotEl.getAttribute('data-slot-type');
        const targetIndex = parseInt(slotEl.getAttribute('data-slot-index'));

        // 1. Sell Zone
        if (slotType === 'sell') {
            if (unit.source === 'board') {
                setBoard(prev => { const b = [...prev]; b[sourceIndex] = null; return b; });
            } else {
                setBench(prev => { const b = [...prev]; b[sourceIndex] = null; return b; });
            }
            setSelectedUnit(null);
            return;
        }

        // 2. Arena Board / 3. Bench
        let nextBoard = [...board];
        let nextBench = [...bench];
        let moved = false;

        if (slotType === 'board') {
            if (unit.source === 'board') {
                const tmp = nextBoard[targetIndex];
                nextBoard[targetIndex] = { ...unit, index: targetIndex };
                nextBoard[sourceIndex] = tmp ? { ...tmp, index: sourceIndex } : null;
            } else {
                const tmp = nextBoard[targetIndex];
                nextBoard[targetIndex] = { ...unit, source: 'board', index: targetIndex };
                nextBench[sourceIndex] = tmp ? { ...tmp, source: 'bench', index: sourceIndex } : null;
            }
            moved = true;
        } else if (slotType === 'bench') {
            if (unit.source === 'bench') {
                const tmp = nextBench[targetIndex];
                nextBench[targetIndex] = { ...unit, index: targetIndex };
                nextBench[sourceIndex] = tmp ? { ...tmp, index: sourceIndex } : null;
            } else {
                const tmp = nextBench[targetIndex];
                nextBench[targetIndex] = { ...unit, source: 'bench', index: targetIndex };
                nextBoard[sourceIndex] = tmp ? { ...tmp, source: 'board', index: sourceIndex } : null;
            }
            moved = true;
        }

        if (moved) {
            const { board: finalBoard, bench: finalBench } = checkStarUp(nextBoard, nextBench);
            setBoard(finalBoard);
            setBench(finalBench);
        }
    };

    const reroll = () => {
        setShop(getAvailableUnits(5));
    };

    return (
        <div className="h-full bg-[#0a0a0c] text-[#cdd6f4] flex font-sans overflow-hidden select-none">
            {/* Sidebar: Active Synergies */}
            <div className="w-56 bg-gradient-to-b from-black/60 to-black/20 border-r border-white/5 flex flex-col p-4 gap-3 z-10">
                <div className="flex items-center justify-between mb-4 px-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Synergies</span>
                    <TrendingUp size={14} className="text-blue-500" />
                </div>

                <div className="space-y-1.5 flex-1 overflow-y-auto custom-scrollbar-hide relative">
                    {activeSynergies.map((synergy) => (
                        <div
                            key={synergy.id}
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const containerRect = e.currentTarget.closest('.relative').getBoundingClientRect();
                                const relativeY = rect.top - containerRect.top;
                                setSelectedTrait(selectedTrait?.id === synergy.id ? null : { ...synergy, yPos: relativeY });
                            }}
                            className={`p-2 rounded-lg border transition-all cursor-pointer group ${synergy.activeTier > 0 ? 'bg-white/10 border-white/20 hover:bg-white/20' : 'bg-transparent border-transparent opacity-20 hover:opacity-100 hover:bg-white/5'}`}
                        >
                            <div className="flex items-center gap-2">
                                <div className={`p-1.5 rounded bg-surface2/40 transition-colors ${synergy.activeTier > 0 ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
                                    <synergy.icon size={14} />
                                </div>
                                <span className="text-[10px] font-bold truncate transition-colors">{synergy.name}</span>
                                <span className={`text-[10px] font-black ml-auto transition-colors ${synergy.activeTier > 0 ? 'text-yellow-400' : 'group-hover:text-white/60'}`}>{synergy.count}</span>
                            </div>
                        </div>
                    ))}
                    {activeSynergies.length === 0 && (
                        <div className="text-center py-12 opacity-20 italic text-xs">Place units...</div>
                    )}
                </div>

                <AnimatePresence>
                    {selectedTrait && (
                        <TraitTooltip
                            synergy={selectedTrait}
                            units={selectedTrait.members}
                            onClose={() => setSelectedTrait(null)}
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Main Arena */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
                <div className="h-14 flex items-center justify-between px-6 bg-black/20 border-b border-white/5">
                    <div className="flex gap-4">
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-white/30 uppercase tracking-widest leading-none mb-1">Arena Level</span>
                            <span className="text-lg font-black text-blue-400 leading-none">9</span>
                        </div>
                        <div className="w-px h-6 bg-white/5 self-center" />
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-white/30 uppercase tracking-widest leading-none mb-1">Synergies</span>
                            <span className="text-lg font-black text-purple-400 leading-none">{activeSynergies.filter(s => s.activeTier > 0).length}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setShowSkillDex(true)} className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-lg border border-white/5 bg-white/5 transition-colors group">
                            <Layers size={14} className="text-purple-400 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">See All</span>
                        </button>
                        <button onClick={() => setShowInfo(true)} className="p-2 hover:bg-white/5 rounded-lg border border-white/5"><Info size={16} /></button>
                    </div>
                </div>

                <div ref={arenaRef} className="flex-1 p-8 flex flex-col items-center justify-center gap-6 perspective-1000 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1)_0%,_transparent_70%)] overflow-visible relative z-20">
                    <div className="grid grid-cols-7 gap-3 transform -rotate-x-12 translate-y-4 overflow-visible">
                        {board.map((slot, i) => (
                            <div key={i} data-slot-type="board" data-slot-index={i} className={`w-24 h-24 rounded-3xl border-2 flex items-center justify-center transition-all duration-500
                                ${slot ? 'bg-surface0/60 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'bg-white/5 border-white/10 hover:border-white/20 shadow-inner'}
                                ${isDragging && !slot ? 'border-blue-500/50 bg-blue-500/5 ring-1 ring-blue-400/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : ''}`}>
                                {slot ? (
                                    <UnitIcon
                                        unit={slot}
                                        onSelect={setSelectedUnit}
                                        isSelected={selectedUnit?.id === slot.id}
                                        onDrop={(p) => detectDropZone(p, slot, i)}
                                        onDragStart={() => setIsDragging(true)}
                                        onDragEnd={() => setIsDragging(false)}
                                    />
                                ) : (
                                    <div className="text-[7px] font-black text-white/10 uppercase tracking-widest pointer-events-none">Hex_{i + 1}</div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div ref={benchRef} className="mt-12 bg-black/40 p-6 rounded-[3rem] border border-white/10 flex gap-4 shadow-2xl relative overflow-visible">
                        <div className="absolute -top-3 left-10 px-4 py-1.5 bg-surface1 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-white/40 pointer-events-none">Tactical Bench Area</div>
                        {bench.map((slot, i) => (
                            <div key={i} data-slot-type="bench" data-slot-index={i} className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center transition-all duration-300
                                ${slot ? 'bg-surface1/60 border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'bg-black/20 border-white/5 border-dashed'}
                                ${isDragging && !slot ? 'border-blue-500/50 bg-blue-500/5 ring-1 ring-blue-400/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : ''}`}>
                                {slot && (
                                    <UnitIcon
                                        unit={slot}
                                        onSelect={setSelectedUnit}
                                        isSelected={selectedUnit?.id === slot.id}
                                        onDrop={(p) => detectDropZone(p, slot, i)}
                                        onDragStart={() => setIsDragging(true)}
                                        onDragEnd={() => setIsDragging(false)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar: Shop & Sell */}
                <div className="h-40 bg-gradient-to-t from-black to-black/80 backdrop-blur-2xl border-t border-white/10 p-4 flex gap-4 relative z-10">
                    <div className="flex-1 flex flex-col gap-3">
                        <div className="flex justify-between items-center px-1">
                            <div className="flex items-center gap-3">
                                <SearchIcon size={14} className="text-blue-400" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Technical Logistics Store</span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={reroll} className="px-6 py-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-500 text-[10px] font-black uppercase tracking-widest transition-all hover:bg-orange-500/20 hover:scale-105 active:scale-95">Reroll Market</button>
                                <button className="px-6 py-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-500 text-[10px] font-black uppercase tracking-widest cursor-not-allowed opacity-50">Level Up (MAX)</button>
                            </div>
                        </div>
                        <div className="flex gap-3 h-full relative">
                            {isDragging ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    data-slot-type="sell"
                                    className="absolute inset-0 flex items-center justify-center bg-red-500/20 border-4 border-dashed border-red-500 rounded-3xl z-20 group"
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.5)] group-hover:scale-110 transition-transform">
                                            <Trash2 className="text-white" size={32} />
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                shop.map((unit, i) => (
                                    unit ? (
                                        <motion.div
                                            key={i}
                                            onClick={() => handleBuy(unit, i)}
                                            whileHover={{ y: -6, scale: 1.02 }}
                                            className="flex-1 bg-surface1/60 rounded-2xl border border-white/10 p-4 flex flex-col justify-between cursor-pointer group hover:border-blue-500/50 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] transition-all relative overflow-hidden"
                                        >
                                            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${TRAITS[unit.traits[0]]?.colors}`} />
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:bg-white/10 transition-colors"><unit.icon size={20} /></div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-[12px] font-black truncate text-white">{unit.name}</div>
                                                    <div className="text-[9px] font-bold text-blue-400/60 uppercase tracking-tighter">{unit.traits[0]}</div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div className="flex gap-1">
                                                    {Array(unit.cost).fill(0).map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-yellow-400/40" />)}
                                                </div>
                                                <div className="text-yellow-500 font-black text-base drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]">${unit.cost}</div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div key={i} className="flex-1 rounded-2xl border border-white/5 bg-black/40 flex items-center justify-center text-white/5 font-black text-[10px] uppercase tracking-widest">Acquired</div>
                                    )
                                ))
                            )}
                        </div>
                    </div>

                    {!isDragging && (
                        <div
                            ref={sellRef}
                            data-slot-type="sell"
                            className="w-32 bg-[#ef4444]/10 border-2 border-[#ef4444] rounded-2xl flex items-center justify-center group hover:bg-[#ef4444]/20 transition-all cursor-pointer relative z-0"
                        >
                            <Trash2 size={24} className="text-[#ef4444] group-hover:scale-110 transition-all pointer-events-none" />
                        </div>
                    )}
                </div>
            </div>

            {/* Right Sidebar: Details */}
            <AnimatePresence mode="wait">
                {selectedUnit ? (
                    <motion.div
                        key={selectedUnit.id}
                        initial={{ x: 300 }}
                        animate={{ x: 0 }}
                        exit={{ x: 300 }}
                        className="w-72 bg-gradient-to-b from-surface0 to-black border-l border-white/10 p-6 flex flex-col gap-6 z-20 shadow-2xl"
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-black tracking-tighter text-white">{selectedUnit.name}</h2>
                                <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">{selectedUnit.level}</p>
                            </div>
                            <button onClick={() => setSelectedUnit(null)} className="p-2 hover:bg-white/5 rounded-full"><X size={20} /></button>
                        </div>

                        <div className="aspect-square rounded-3xl bg-surface1/30 border border-white/10 flex items-center justify-center relative overflow-hidden group">
                            <div className={`absolute inset-0 bg-gradient-to-br opacity-20 ${TRAITS[selectedUnit.traits[0]]?.colors}`} />
                            <selectedUnit.icon size={80} className="text-white drop-shadow-2xl group-hover:scale-110 transition-transform duration-700" />

                            <div className="absolute bottom-4 inset-x-4 flex justify-between">
                                <div className="px-3 py-1 bg-black/60 rounded-full border border-white/10 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                                    <span className="text-[10px] font-black text-white">$ {selectedUnit.cost}</span>
                                </div>
                                <div className="flex gap-1 text-yellow-400">
                                    <TrendingUp size={14} />
                                    <span className="text-[10px] font-black uppercase">Tier {selectedUnit.stars || 1}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-white/30">
                                <Layers size={14} />
                                <span className="text-[9px] font-black uppercase tracking-widest">Active Traits</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {selectedUnit.traits.map(t => (
                                    <div key={t} className={`px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-[9px] font-black uppercase tracking-wider`}>
                                        {TRAITS[t].name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 space-y-4 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2 text-white/30">
                                <Info size={14} />
                                <span className="text-[9px] font-black uppercase tracking-widest">Synergy Effect</span>
                            </div>
                            <p className="text-xs text-white/60 leading-relaxed italic">
                                "{TRAITS[selectedUnit.traits[0]].desc[0]} - High performance computing enabled through {selectedUnit.name} optimization."
                            </p>
                        </div>

                        <button
                            onClick={handleSellSelected}
                            className="w-full py-4 rounded-2xl bg-[#ef4444]/20 border border-[#ef4444] shadow-[0_0_20px_rgba(239,68,68,0.1)] text-[#ef4444] text-xs font-black uppercase tracking-widest hover:bg-[#ef4444] hover:text-white hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] transition-all active:scale-95"
                        >
                            Sell selected Unit
                        </button>
                    </motion.div>
                ) : (
                    <div className="w-72 border-l border-white/5 flex flex-col items-center justify-center p-8 text-center gap-4 opacity-20">
                        <Target size={48} />
                        <p className="text-[10px] font-black uppercase tracking-widest">Select a unit to view technical data</p>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showInfo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[100] bg-[#050507]/95 backdrop-blur-2xl flex items-center justify-center p-6"
                    >
                        <div className="bg-[#121216] border border-white/10 rounded-[2.5rem] p-10 max-w-2xl w-full relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                            <div className="absolute top-8 right-8 p-3 hover:bg-white/5 rounded-full cursor-pointer text-white/40 hover:text-white transition-all" onClick={() => setShowInfo(false)}>
                                <X size={24} />
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/20 rounded-lg">
                                            <Shield size={24} className="text-blue-400" />
                                        </div>
                                        <h2 className="text-3xl font-black tracking-tighter text-white">Skills Arena Tutorial</h2>
                                    </div>
                                    <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em]">Master the Technical Logistics Ecosystem</p>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    <div className="grid grid-cols-[40px_1fr] gap-4 items-start">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 font-black">1</div>
                                        <div className="space-y-1">
                                            <h4 className="text-[12px] font-black text-white/90">Build Your Deck</h4>
                                            <p className="text-[11px] text-white/50 leading-relaxed">Buy skill units from the **Logistics Store** at the bottom using credits. Each unit represents a specific technology or programming language.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-[40px_1fr] gap-4 items-start">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 font-black">2</div>
                                        <div className="space-y-1">
                                            <h4 className="text-[12px] font-black text-white/90">Activate Synergies</h4>
                                            <p className="text-[11px] text-white/50 leading-relaxed">Drag units from the **Bench** to the **Arena** board. Combine units with the same Trait to activate Synergy bonuses (see left sidebar).</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-[40px_1fr] gap-4 items-start">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-yellow-400 font-black">3</div>
                                        <div className="space-y-1">
                                            <h4 className="text-[12px] font-black text-white/90">Optimize Composition</h4>
                                            <p className="text-[11px] text-white/50 leading-relaxed">Each unit has a Cost (1-5) based on its technical complexity. Sell unused units by dragging them to the **Sell** area (trash can icon).</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-purple-500/5 border border-purple-500/20 rounded-3xl space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Layers size={14} className="text-purple-400" />
                                        <h4 className="text-[11px] font-black text-purple-400 uppercase tracking-widest">Just want to see the skills?</h4>
                                    </div>
                                    <p className="text-[10px] text-white/60 leading-relaxed">
                                        Click the <span className="text-white font-bold inline-flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded italic whitespace-nowrap"><Layers size={10} /> See All</span> button in the top right corner to instantly view the entire list of skills, frameworks, and technologies I possess without having to play.
                                    </p>
                                </div>

                                <button
                                    onClick={() => setShowInfo(false)}
                                    className="w-full py-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-blue-400 hover:text-white transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] active:scale-[0.98]"
                                >
                                    Start Exploring
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {showSkillDex && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-[#050507]/95 backdrop-blur-2xl flex items-center justify-center p-6"
                    >
                        <div className="bg-[#121216] border border-white/10 rounded-[2.5rem] w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] relative">
                            <div className="flex items-center justify-between p-8 border-b border-white/5">
                                <div className="space-y-1">
                                    <h2 className="text-3xl font-black tracking-tighter text-white">Skill Encyclopedia</h2>
                                    <p className="text-[10px] text-purple-400 font-black uppercase tracking-[0.2em]">Full Technical Logistics Database</p>
                                </div>
                                <button onClick={() => setShowSkillDex(false)} className="p-3 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 flex overflow-hidden">
                                {/* Left Column: Units by Cost */}
                                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar border-r border-white/5 space-y-8">
                                    {[1, 2, 3, 4, 5].map(cost => {
                                        const units = SKILL_UNITS.filter(u => u.cost === cost);
                                        if (units.length === 0) return null;
                                        return (
                                            <div key={cost} className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-lg text-yellow-500 text-[10px] font-black tracking-widest">${cost} Units</div>
                                                    <div className="h-px flex-1 bg-white/5" />
                                                </div>
                                                <div className="grid grid-cols-4 gap-3">
                                                    {units.map(unit => (
                                                        <div key={unit.id} className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all group">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white/10 transition-colors">
                                                                    <unit.icon size={18} className="text-white opacity-60 group-hover:opacity-100 transition-opacity" />
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <div className="text-[11px] font-black text-white group-hover:text-purple-400 transition-colors truncate">{unit.name}</div>
                                                                    <div className="text-[8px] font-bold text-white/30 uppercase tracking-tighter">{unit.traits[0]}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Right Column: All Traits */}
                                <div className="w-[340px] overflow-y-auto p-8 custom-scrollbar bg-black/20 space-y-6">
                                    <div className="flex items-center gap-3 text-white/30 mb-8">
                                        <Layers size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Available Traits</span>
                                    </div>
                                    <div className="space-y-3">
                                        {Object.entries(TRAITS).map(([id, trait]) => (
                                            <div key={id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className={`p-2 rounded-lg bg-gradient-to-br ${trait.colors} shadow-lg`}>
                                                        <trait.icon size={14} className="text-white" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[12px] font-black text-white">{trait.name}</div>
                                                        <div className="text-[8px] font-bold text-white/20 uppercase tracking-widest">{id}</div>
                                                    </div>
                                                </div>
                                                <p className="text-[10px] text-white/40 leading-relaxed italic mb-4 line-clamp-2">
                                                    {trait.longDesc}
                                                </p>
                                                <div className="flex gap-1.5 flex-wrap">
                                                    {trait.tiers.map((t, i) => (
                                                        <div key={i} className="px-2 py-1 bg-white/5 rounded-md border border-white/10 text-[8px] font-black text-white/60">
                                                            {t} • {trait.desc[i] || trait.desc[0]}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SettingsApp
