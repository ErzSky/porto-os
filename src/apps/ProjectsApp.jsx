import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ChevronRight,
    MoreHorizontal,
    Search,
    Files,
    Settings,
    Github,
    Monitor,
    Search as SearchIcon,
    Cpu,
    Smartphone,
    BrainCircuit,
    MessageSquare,
    Zap,
    Users,
    Activity,
    Signal,
    Battery,
    Lock,
    Network,
    RefreshCw,
    Terminal,
    Layout,
    Globe,
    Gamepad2,
    FileCode,
    FileType,
    FileJson,
    ExternalLink,
    Maximize2,
    Share2,
    TrendingUp,
    Briefcase,
    GraduationCap,
    Award,
    Shield,
    PieChart,
    Heart
} from 'lucide-react'

import callCenterImg from '../assets/images/projects/call-center-dashboard.png'
import stockLstmImg from '../assets/images/projects/stock-lstm.png'
import evieWebImg from '../assets/images/projects/evie-chatbot-web.png'
import robotSekarImg from '../assets/images/projects/robot-sekar.png'
import foodDeliveryImg from '../assets/images/projects/food-delivery.jpg'
import heartAttackImg from '../assets/images/projects/heart-attack.jpg'
import brainTumorImg from '../assets/images/projects/brain-tumor.jpg'
import esakuImg from '../assets/images/projects/esaku.jpg'
import evieMobileImg from '../assets/images/projects/evie-mobile.jpg'
import hyperchaoticImg from '../assets/images/projects/4d-hyperchaotic.png'

// --- Project Data System ---
const PROJECTS = [
    {
        id: 'esaku',
        name: 'eSaku_Finance.dart',
        title: 'eSaku: Personal Finance App',
        period: 'Mar 2026',
        tech: ['Flutter', 'Dart', 'Isar DB'],
        icon: Smartphone,
        color: 'text-blue-400',
        photo: esakuImg,
        previewName: 'eSaku_UI.png',
        achievements: [
            'Developed a financial ecosystem with multi-wallet integration (Bank, E-wallet, and Cash).',
            'Engineered "Safe Spending" logic for real-time daily limits.',
            'Built a Split Bill Engine with automated tax and service calculations.',
            'Implemented an Itemized Transaction system for detailed grocery auditing.',
            'Architected local data persistence using Isar Database.',
            'Designed a modern UI with data visualization (Donut & Bar Charts).'
        ],
        code: `// eSaku Financial Engine (Core System)
import 'package:flutter/material.dart';
import 'package:esaku_core/logic/finance_engine.dart';
import 'package:isar/isar.dart';

@override
void main() async {
  final isar = await Isar.open([TransactionSchema, WalletSchema]);
  final wallet = Wallet(id: 'main_savings', type: WalletType.bank);
  
  // Safe Spending Logic - Daily Limit Calculation
  wallet.setDailyLimit(Amount(500000)); 
  
  final engine = TransactionEngine(isar);
  engine.onTransactionAdded((tx) {
    if (tx.amount > wallet.remainingLimit) {
      PushNotification.send("Budget Alert!", "You have exceeded your safe spending limit.");
      tx.markAsWarning();
    }
    syncWithCloud(tx);
  });
  
  // Split Bill Engine initialization
  final splitter = SplitBillEngine(tax: 0.11, service: 0.05);
  splitter.addItem(Item("Soto Betawi", 35000));
  splitter.assignTo(Participant("Erzsky"), 1.0); // Full item assignment
}`
    },
    {
        id: 'evie-mobile',
        name: 'Evie_AI.py',
        title: 'Evie: Proactive AI Voice Assistant',
        period: 'Feb 2026',
        tech: ['Python', 'LLM', 'Flutter'],
        icon: BrainCircuit,
        color: 'text-yellow-500',
        photo: evieMobileImg,
        previewName: 'Evie_AI_UI.png',
        achievements: [
            'Implemented NLU & Intent Classification for casual vs task conversations.',
            'Integrated Google Colab & Ngrok for cloud-based LLM inference.',
            'Architected Isar DB persistence for conversation history.',
            'Designed dynamic UI using Flutter CustomPainter for state feedback.',
            'Optimized STT and TTS synchronization for low-latency interaction.'
        ],
        code: `import Qween
import speech_recognition as sr
import json

def process_intent(audio_clip):
    # Proactive AI intent extraction
    transcription = sr.recognize(audio_clip)
    
    # NLU Classification Layer
    prompt = f"Analyze user intent from: {transcription}. Respond in JSON."
    response = openai.ChatCompletion.create(
        model="gpt-4-proactive", 
        messages=[{"role": "system", "content": "You are Evie, a proactive AI assistant."},
                 {"role": "user", "content": prompt}]
    )
    
    intent_data = json.loads(response.choices[0].message.content)
    if intent_data['type'] == 'task':
        execute_system_command(intent_data['command'])
    
    return intent_data['speech_response']`
    },
    {
        id: 'call-center',
        name: 'Call_Center.pbix',
        title: 'Call Center Dashboard (Power BI)',
        period: 'Mar 2025',
        tech: ['Power BI', 'Excel'],
        icon: Activity,
        color: 'text-yellow-400',
        photo: callCenterImg,
        previewName: 'Call_Center_Mock.png',
        achievements: [
            'Developed an interactive dashboard to analyze KPI metrics.',
            'Visualized Answered vs. Resolved Calls and Monthly Trends.',
            'Conducted Agent Performance Analysis using CSAT ratings.',
            'Integrated dynamic filtering for in-depth agent/topic analysis.',
            'Provided actionable insights for operational decision-making.'
        ],
        code: `/* DAX Metrics for Call Center Optimization */

// Calculate Total Calls Answered
TotalAnswered = COUNTROWS(FILTER('Calls', 'Calls'[Status] = "Answered"))

// Average Speed of Answer (ASA)
ASA_Seconds = AVERAGE('Calls'[SpeedOfAnswer_Seconds])

// Resolved Rate Percentage
ResolutionRate = 
DIVIDE(
    CALCULATE(COUNT('Calls'[ID]), 'Calls'[Status] = "Resolved"),
    COUNT('Calls'[ID]),
    0
)

// Dynamic Agent CSAT Score
AgentAvgCSAT = 
CALCULATE(
    AVERAGE('Feedback'[Rating]),
    USERELATIONSHIP('Agents'[ID], 'Feedback'[AgentID])
)`
    },
    {
        id: 'lstm-stock',
        name: 'Stock_LSTM.py',
        title: 'Stock Prediction Using LSTM',
        period: 'Mar 2025',
        tech: ['Python', 'TensorFlow', 'Scikit-Learn'],
        icon: TrendingUp,
        color: 'text-green-400',
        photo: stockLstmImg,
        previewName: 'Stock_LSTM_UI.png',
        achievements: [
            'Deep learning model using LSTM to predict stock prices.',
            'Collected 4 years of historical Apple (AAPL) data via Yahoo Finance.',
            'Pre-processed data with normalization and time-series creation.',
            'Trained LSTM using 80-20 split for next-7-day forecasting.',
            'Visualized results with actual vs. predicted candlestick charts.'
        ],
        code: `import tensorflow as tf
from keras.layers import LSTM, Dense, Dropout
from sklearn.preprocessing import MinMaxScaler
import pandas as pd

# Load and Preprocess Dataset
df = pd.read_csv('AAPL_Stock_Data.csv')
scaler = MinMaxScaler(feature_range=(0,1))
scaled_data = scaler.fit_transform(df['Close'].values.reshape(-1,1))

# Building the LSTM Architecture
model = tf.keras.Sequential([
    LSTM(units=50, return_sequences=True, input_shape=(x_train.shape[1], 1)),
    Dropout(0.2),
    LSTM(units=50, return_sequences=False),
    Dropout(0.2),
    Dense(units=25),
    Dense(units=1)
])

# Training the Model
model.compile(optimizer='adam', loss='mean_squared_error')
model.fit(x_train, y_train, batch_size=32, epochs=20)

# Forecast Next 7 Days
last_60_days = scaled_data[-60:].reshape(1, -1, 1)
prediction = model.predict(last_60_days)
print(f"Predicted Price: {scaler.inverse_transform(prediction)}")`
    },
    {
        id: 'hyperchaotic-4d',
        name: 'Hyperchaotic_4D.py',
        title: '4D Hyperchaotic Image Security',
        period: 'Oct 2024',
        tech: ['Python', 'Encryption', 'Algorithms'],
        icon: Shield,
        color: 'text-purple-400',
        photo: hyperchaoticImg,
        previewName: 'Hyperchaotic_UI.png',
        achievements: [
            'Developed 4D hyperchaotic system with Hybrid Key techniques.',
            'Evaluated via Histogram analysis, NPCR, UACI, and Information Entropy.',
            'Achieved uniform pixel distribution and high randomness.',
            'Published in Sistemasi: Jurnal Sistem Informasi.'
        ],
        code: `import numpy as np

def hyperchaotic_4d_system(s, t, a=36, b=3, c=28, d=-16):
    x, y, z, w = s
    # 4D Lorenz-like Hyperchaotic Equations
    dx = a * (y - x) + w
    dy = c * x - y - x * z
    dz = x * y - b * z
    dw = -y * z + d * w
    return np.array([dx, dy, dz, dw])

# Hybrid Key Generation
def generate_hybrid_key(image):
    sha256_hash = calculate_hash(image)
    initial_x = convert_hash_to_param(sha256_hash[0:8])
    return initial_x`
    },
    {
        id: 'brain-tumor',
        name: 'Brain_Tumor_Study.ipynb',
        title: 'Brain Tumor Classification Study',
        period: 'Oct 2024 - Feb 2025',
        tech: ['Python', 'UTeM', 'Kaggle'],
        icon: Activity,
        color: 'text-red-400',
        photo: brainTumorImg,
        previewName: 'Brain_Study_UI.png',
        achievements: [
            'Comparative study of deep learning models (VGG, ResNet, U-Net).',
            'Evaluated based on Accuracy, Precision, Recall, and F1-score.',
            'Research conducted as part of student mobility program at UTeM.',
            'Published in Faith journal.'
        ],
        code: `import tensorflow as tf
from tensorflow.keras.applications import ResNet50, VGG16
from tensorflow.keras.layers import Flatten, Dense, Dropout

# U-Net Architecture for Segmentation
def build_unet():
    inputs = tf.keras.Input((256, 256, 3))
    # Downsampling
    c1 = Conv2D(16, (3, 3), activation='relu')(inputs)
    p1 = MaxPooling2D((2, 2))(c1)
    
    # Bottleneck
    c5 = Conv2D(256, (3, 3), activation='relu')(p4)
    
    # Upsampling
    u6 = Conv2DTranspose(128, (2, 2))(c5)
    return Model(inputs, outputs)

# Training Comparison
for model_name in ['VGG16', 'ResNet50']:
    history = train_medical_model(model_name, train_gen)`
    },
    {
        id: 'chatbot-evie-web',
        name: 'Chatbot_Evie_Web.py',
        title: 'Chatbot Evie: Evolutionary Intel',
        period: 'Oct 2023',
        tech: ['Python', 'Streamlit', 'OpenAI'],
        icon: MessageSquare,
        color: 'text-blue-400',
        photo: evieWebImg,
        previewName: 'Evie_Web_UI.png',
        achievements: [
            'Web Chatbot application using Python, Streamlit, and OpenAI API.',
            'Enhanced knowledge from user-uploaded PDF documents.',
            'Enabled interaction via summaries and context-aware Q&A.',
            'Developed user-friendly interface for dynamic knowledge base updates.'
        ],
        code: `import streamlit as st
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS

st.title("Evie: Evolutionary Intelligence")

def process_docs(pdf_list):
    text = extract_text_from_pdfs(pdf_list)
    chunks = split_text(text)
    
    # Embedding and Vector Storage
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_texts(chunks, embeddings)
    return vectorstore

uploaded_files = st.file_uploader("Upload Knowledge Base", accept_multiple_files=True)
if uploaded_files:
    db = process_docs(uploaded_files)
    query = st.text_input("Consult document archive:")
    if query:
        st.write(db.similarity_search(query)[0].content)`
    },
    {
        id: 'robot-sekar',
        name: 'Robot_Sekar.cs',
        title: 'Sekar Nuswantoro Robot App',
        period: 'Nov 2022 - Dec 2023',
        tech: ['C#', 'Unity', 'Hardware'],
        icon: Gamepad2,
        color: 'text-purple-500',
        photo: robotSekarImg,
        previewName: 'Robot_Gamelan_UI.png',
        achievements: [
            'Developed software v2.0 using Unity/C# to operate Robot Gamelan.',
            'Assisted in planning and assemly of robot wiring systems.',
            'Synchronized robotic actuators with traditional gending musicality.'
        ],
        code: `using UnityEngine;
using System.IO.Ports;

public class GamelanController : MonoBehaviour {
    SerialPort hardware = new SerialPort("COM3", 9600);

    void Start() {
        hardware.Open();
    }

    public void PlayNote(int instrumentID, float force) {
        // Construct hex command for Arduino actuator
        string cmd = $"#{instrumentID:X2}{Mathf.RoundToInt(force*255):X2};";
        hardware.Write(cmd);
    }

    IEnumerator PlaySequence(GendingScore score) {
        foreach(var note in score.notes) {
            PlayNote(note.id, note.velocity);
            yield return new WaitForSeconds(note.duration);
        }
    }
}`
    },
    {
        id: 'food-delivery',
        name: 'Delivery_Analysis.py',
        title: 'Food Delivery Profit Margins',
        period: 'May 2024',
        tech: ['Python', 'Data Science'],
        icon: PieChart,
        color: 'text-orange-400',
        photo: foodDeliveryImg,
        previewName: 'Delivery_Analysis_UI.png',
        achievements: [
            'Detailed cost analysis of fees, processing, and discounts.',
            'Analyzed revenue from commissions and net profit calculation.',
            'Identified significant losses due to high discount rates.',
            'Simulated the impact of recommended adjustments on profitability.'
        ],
        code: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Dataset Loading
df = pd.read_csv('delivery_orders_data.csv')

# Cost & Profit Engineering
df['Commission_Revenue'] = df['Order_Value'] * df['Commission_Pct']
df['Total_Cost'] = df['Delivery_Fee'] + df['Payment_Fee'] + df['Discount_Value']
df['Net_Profit'] = df['Commission_Revenue'] - df['Total_Cost']

# Profitability Simulation
def sim_new_strategy(df, new_comm=0.15, max_disc=0.10):
    df['Sim_Rev'] = df['Order_Value'] * new_comm
    df['Sim_Disc'] = df['Order_Value'].apply(lambda x: min(x * max_disc, 50))
    return df['Sim_Rev'] - (df['Delivery_Fee'] + df['Sim_Disc'])

print(f"Total Current Net Profit: {df['Net_Profit'].sum()}")`
    },
    {
        id: 'heart-attack',
        name: 'Heart_Attack_Class.py',
        title: 'Heart Attack Classification',
        period: 'Sep 2023',
        tech: ['Python', 'Deep Learning'],
        icon: Heart,
        color: 'text-rose-500',
        photo: heartAttackImg,
        previewName: 'Heart_Risk_UI.png',
        achievements: [
            'Risk classification using Decision Tree algorithm.',
            'Data cleaning, outlier handling, and visualization.',
            'Achieved 98.55% accuracy via 5-fold cross-validation.',
            'Visualized decision tree model to understand risk factors.'
        ],
        code: `from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split, cross_val_score
import pandas as pd

# Data Pipeline
data = pd.read_csv('heart_risk_data.csv')
X = data.drop('target', axis=1)
y = data['target']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Decision Tree Model
clf = DecisionTreeClassifier(criterion='entropy', max_depth=5)
scores = cross_val_score(clf, X, y, cv=5)

clf.fit(X_train, y_train)
print(f"Mean CV Accuracy: {scores.mean():.4f}")
print(f"Feature Importance: {clf.feature_importances_}")`
    }
]

// --- Sub-components ---

const ProjectProfile = ({ data, setActiveFile }) => {
    return (
        <div className="flex flex-col h-full bg-[#1e1e2e] text-[#cdd6f4]">
            {/* Header / Photo */}
            <div
                className="h-72 relative overflow-hidden flex-shrink-0 bg-black/20 cursor-pointer group/image"
                onClick={() => setActiveFile(data.previewName)}
            >
                <img src={data.photo} className="w-full h-full object-contain transition-transform duration-500 group-hover/image:scale-105" alt={data.title} />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest text-white shadow-2xl">
                        View Image Preview
                    </div>
                </div>
            </div>

            {/* Details Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar-hide space-y-6">
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight leading-tight mb-2">{data.title}</h2>
                    <p className="text-[12px] text-blue-400 font-black uppercase tracking-[0.2em]">{data.period}</p>
                </div>

                <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 text-white/40">
                        <Activity size={16} className="text-purple-500" />
                        <span className="text-[12px] font-black uppercase tracking-[0.2em]">Project Highlights</span>
                    </div>
                    <ul className="space-y-3">
                        {data.achievements.map((ach, idx) => (
                            <motion.li
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                key={idx}
                                className="flex gap-2 text-[13px] leading-relaxed text-white/70"
                            >
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                <span>{ach}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-3">
                    <div className="flex items-center gap-2 text-white/40">
                        <Cpu size={16} className="text-blue-400" />
                        <span className="text-[12px] font-black uppercase tracking-[0.2em]">Technology Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {data.tech.map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[11px] font-bold text-white/50">{t}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const ImagePreview = ({ src, name }) => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-[#0c0c0c] p-12 overflow-hidden relative group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,transparent_70%)]" />
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 max-w-full max-h-full shadow-2xl rounded-lg overflow-hidden border border-white/10"
            >
                <img src={src} alt={name} className="max-w-full max-h-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)]" />
            </motion.div>
            <div className="mt-8 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/40 font-mono tracking-widest uppercase">
                {name} • High Resolution Preview
            </div>
        </div>
    )
}

const CodeEditor = ({ code }) => {
    const lines = code.split('\n')

    const highlight = (line) => {
        return line
            .replace(/('.*?'|".*?")/g, '<span style="color:#ce9178">$1</span>')
            .replace(/\/\/.*$/g, '<span style="color:#6a9955; font-style:italic">$&</span>')
            .replace(/(class|import|void|final|String|int|if|for|return|def|main|include|#include|from|as|extends|@override|@override|const|fun|val|var|await|async|package|from|as|in|for|if|else|return|case|break|try|catch|finally|throw|new|this|super|export|default|static|public|private|protected|internal|list|Note|Actuator|Strike|Gending|Note)\b/g, '<span style="color:#c586c0">$1</span>')
            .replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g, '<span style="color:#4ec9b0">$1</span>')
            .replace(/\b(print|load_model|predict|hit|optimize|syncWithHardware|init|playSequence|analyzeSatisfaction|update|reportToTelegram|setDailyLimit|onOverspend|Push|process_intent|create|evaluate_medical_data|file_uploader|process_pdf|answer|compile|fit|groupby|sum)\b/g, '<span style="color:#dcdcaa">$1</span>')
    }

    return (
        <div className="flex-1 font-mono text-[13px] leading-relaxed overflow-y-auto p-4 custom-scrollbar bg-[#1e1e1e] text-[#d4d4d4]">
            {lines.map((line, i) => (
                <div key={i} className="flex gap-4 group hover:bg-white/5 transition-colors">
                    <span className="w-8 text-right text-white/20 select-none font-sans">{i + 1}</span>
                    <span className="whitespace-pre" dangerouslySetInnerHTML={{ __html: highlight(line) || '&nbsp;' }} />
                </div>
            ))}
        </div>
    )
}

// --- Main Application ---

const ProjectsApp = () => {
    const [activeId, setActiveId] = useState(PROJECTS[0].id)
    const [activeFile, setActiveFile] = useState(PROJECTS[0].name)
    const activeProject = PROJECTS.find(p => p.id === activeId)

    return (
        <div className="h-full bg-[#181818] flex flex-col text-white/80 select-none overflow-hidden font-sans">
            {/* IDE Header */}
            <div className="h-10 bg-[#2d2d2d] flex items-center justify-between px-4 border-b border-white/5">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Terminal size={14} className="text-blue-500" />
                        <span className="text-[11px] font-bold text-white/60">Portfolio IDE</span>
                    </div>
                </div>
                <div className="text-[11px] font-medium text-white/30 truncate max-w-sm hidden md:block">
                    src / user / projects / {activeProject.name}
                </div>
                <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-2 px-3 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-black uppercase tracking-widest text-blue-500">
                        Live Sync
                    </div>
                    <MoreHorizontal size={14} className="opacity-20" />
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Activity Bar */}
                <div className="w-12 bg-[#333333] flex flex-col items-center py-4 gap-6 border-r border-white/5">
                    <Files className="text-white" size={20} />
                    <SearchIcon className="text-white/40 hover:text-white transition-colors cursor-pointer" size={20} />
                    <Github className="text-white/40 hover:text-white transition-colors cursor-pointer" size={20} />
                    <Monitor className="text-white/40 hover:text-white transition-colors cursor-pointer mt-auto" size={20} />
                    <Settings className="text-white/40 hover:text-white transition-colors cursor-pointer mb-2" size={20} />
                </div>

                {/* Sidebar (Explorer) */}
                <div className="w-64 bg-[#252526] flex flex-col border-r border-white/5">
                    <div className="p-3 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] flex justify-between items-center">
                        <span>Explorer</span>
                        <ChevronRight size={14} className="rotate-90 opacity-20" />
                    </div>
                    <div className="flex flex-col py-2">
                        <div className="px-4 py-1.5 flex items-center gap-2 text-[11px] font-bold text-white/40 uppercase tracking-widest">
                            <ChevronRight size={14} className="rotate-90" />
                            <span>EVIE 2.0</span>
                        </div>
                        <div className="overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar-hide">
                            {PROJECTS.map(pj => (
                                <div key={pj.id} className="flex flex-col">
                                    <button
                                        onClick={() => {
                                            setActiveId(pj.id)
                                            if (activeId !== pj.id) setActiveFile(pj.name)
                                        }}
                                        className={`flex items-center gap-2 px-4 py-1.5 text-[13px] transition-colors whitespace-nowrap ${activeId === pj.id ? 'text-white' : 'text-white/40 hover:bg-[#2a2d2e] hover:text-white'}`}
                                    >
                                        <ChevronRight size={14} className={`transition-transform ${activeId === pj.id ? 'rotate-90' : ''}`} />
                                        <pj.icon size={14} className={activeId === pj.id ? pj.color : 'opacity-40'} />
                                        <span className="truncate">{pj.title}</span>
                                    </button>

                                    {activeId === pj.id && (
                                        <div className="flex flex-col ml-4 border-l border-white/5">
                                            <button
                                                onClick={() => setActiveFile(pj.name)}
                                                className={`flex items-center gap-2 px-6 py-1 text-[12px] transition-colors ${activeFile === pj.name ? 'bg-[#37373d] text-white' : 'text-white/40 hover:bg-[#2a2d2e] hover:text-white'}`}
                                            >
                                                <FileCode size={12} className="text-blue-400" />
                                                <span>{pj.name}</span>
                                            </button>
                                            <button
                                                onClick={() => setActiveFile(pj.previewName)}
                                                className={`flex items-center gap-2 px-6 py-1 text-[12px] transition-colors ${activeFile === pj.previewName ? 'bg-[#37373d] text-white' : 'text-white/40 hover:bg-[#2a2d2e] hover:text-white'}`}
                                            >
                                                <FileType size={12} className="text-purple-400" />
                                                <span>{pj.previewName}</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Editor Section */}
                <div className="flex-1 flex flex-col bg-[#1e1e1e] min-w-[300px]">
                    {/* Tabs */}
                    <div className="h-9 bg-[#252526] flex overflow-x-auto custom-scrollbar-hide">
                        <div className="flex items-center gap-2 px-4 h-full bg-[#1e1e1e] text-white text-xs border-r border-white/5 min-w-[120px]">
                            {activeFile.endsWith('.png') ? <FileType size={12} className="text-purple-400" /> : <FileCode size={12} className="text-blue-400" />}
                            <span>{activeFile}</span>
                            <div className="ml-2 w-2 h-2 rounded-full bg-white/20" />
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col relative overflow-hidden">
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase text-white/20 border-b border-white/5 bg-[#1a1a1a]">
                            <span>Porto-OS</span>
                            <span>{">"}</span>
                            <span>evie 2.0</span>
                            <span>{">"}</span>
                            <span className="text-white/60">{activeFile}</span>
                        </div>

                        {activeFile.endsWith('.png') ? (
                            <ImagePreview src={activeProject.photo} name={activeFile} />
                        ) : (
                            <CodeEditor code={activeProject.code} />
                        )}

                        {/* Bottom Panel (Terminal) */}
                        <div className="h-40 bg-[#1e1e1e] border-t border-white/10 overflow-hidden">
                            <div className="h-9 border-b border-white/5 flex items-center px-4 gap-6 text-[10px] font-black tracking-widest text-white/30 uppercase">
                                <span className="text-white border-b-2 border-blue-600 h-full flex items-center">TERMINAL</span>
                                <span>DEBUG</span>
                                <span>OUTPUT</span>
                            </div>
                            <div className="p-4 font-mono text-[11px] text-green-400">
                                <div className="flex gap-2">
                                    <span className="text-blue-400">➜</span>
                                    <span className="text-white/60">porto-os</span>
                                    <span className="text-purple-400 font-bold">git:(main)</span>
                                    <span className="text-white">npm run deploy:preview</span>
                                </div>
                                <div className="mt-2 text-white/40 italic">Syncing {activeProject.name} metadata with device emulator...</div>
                                <div className="text-green-500 font-bold mt-1">✓ Preview Sync Successful. Waiting for hardware...</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: MOBILE EMULATOR */}
                <div className="w-[500px] bg-[#0c0c0c] border-l border-white/10 flex flex-col items-center justify-center relative p-6 flex-shrink-0 group">
                    {/* Device Frame */}
                    <div className="relative w-[420px] h-[880px] bg-black rounded-[50px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border-[10px] border-[#252525] overflow-hidden flex flex-col">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-7 bg-black z-50 rounded-b-[18px] flex items-center justify-center gap-2">
                            <div className="w-10 h-1 bg-white/10 rounded-full" />
                        </div>

                        {/* Status Bar */}
                        <div className="h-10 flex items-center justify-between px-6 text-white relative z-40">
                            <span className="text-[10px] font-black">9:41</span>
                            <div className="flex items-center gap-1.5">
                                <Signal size={10} />
                                <span className="text-[8px] font-bold">WiFi</span>
                                <Battery size={12} />
                            </div>
                        </div>

                        {/* Mock App UI */}
                        <div className="flex-1 relative overflow-hidden bg-[#1e1e2e]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeId}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-full w-full"
                                >
                                    <ProjectProfile data={activeProject} setActiveFile={setActiveFile} />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Home Button Bar */}
                        <div className="h-8 bg-[#1e1e2e] flex items-center justify-center relative z-40">
                            <div className="w-16 h-0.5 bg-white/20 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>

            {/* VS Code Style Footer */}
            <div className="h-6 bg-[#007acc] flex items-center justify-between px-3 text-[10px] text-white font-medium">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 hover:bg-white/10 px-1 rounded transition-colors cursor-pointer">
                        <Network size={10} />
                        <span>main*</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Activity size={10} />
                        <span>0 Problems</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span>UTF-8</span>
                    <div className="flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-pointer">
                        <Lock size={10} />
                        <span>Build Success</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectsApp
