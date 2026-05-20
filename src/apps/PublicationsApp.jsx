import React from 'react'
import { Globe, ArrowLeft, ArrowRight, RotateCw, Shield, Layout, ExternalLink, Bookmark, Search, Share2, MoreVertical } from 'lucide-react'

const PublicationsApp = () => {
    const publications = [
        {
            title: "Enhancing image encryption security through integration multi-chaotic systems and mixed pixel-bit level",
            doi: "https://doi.org/10.1080/13682199.2024.2398954",
            publisher: "The Imaging Science Journal - Taylor & Francis",
            authors: "Muhammad Naufal Erza Farandi, Aris Marjuni, Nova Rijati & De Rosal Ignatius Moses Setiadi",
            abstract: "This research proposes a new Image encryption method to improve the security of image encryption by integrating a multi-chaotic system and mixed pixel-bit level encryption. In the face of the growing use of communications and computer technology, as well as the need to protect sensitive information, this method utilizes chaotic algorithms to increase encryption security. Experimental results show increased security and resistance to various attacks, validating the method's effectiveness in protecting digital images. The measurement tools used include histograms, information entropy, adjacent pixel correlation coefficient, key sensitivity analysis, and robustness testing. In conclusion, this method offers an effective and robust approach to image encryption, providing an important contribution to the field of information security.",
            keywords: ["Image encryption", "information security", "multi-chaotic systems", "robust encryption", "mixed chaotic map"],
            date: "Published online: 04 Sep 2024"
        },
        {
            title: "Comparative Study of Deep Learning Models for MRI-based Brain Tumor Classification",
            doi: "https://doi.org/10.62411/faith.3048-3719-257",
            publisher: "Faith - Science Journal",
            authors: "Muhammad Naufal Erza Farandi, Azah Kamilah Muda, Sri Winarno & Halizah Basiron",
            abstract: "Brain tumor detection using deep learning has become a focus of research due to its potential to improve patient diagnosis and management. This study presents a comparative analysis to evaluate how the fundamental design philosophies of convolutional neural network (CNN) architectures, namely sequential (VGG16), residual (ResNet50), and encoder-decoder (U-Net), influence performance on brain tumor classification tasks using a public MRI dataset. The data undergoes preprocessing, including normalization, data augmentation, and division into training and testing subsets. Evaluation is conducted using accuracy, precision, recall, and F1-Score metrics. The results show that ResNet50 consistently outperforms other architectures with an average accuracy of 95.35%, followed by VGG16 (93.93%). Conversely, U-Net, designed for segmentation, demonstrates the lowest performance (79%). The superiority of ResNet50 highlights the benefits of residual connections in addressing the vanishing gradient problem for classification tasks. The poor performance of U-Net confirms the hypothesis that architectural suitability for a specific task is more critical than complexity alone. This study highlights the strength of ResNet50 as a reliable approach for brain tumor classification. It underscores the importance of selecting an architecture specifically designed for the intended medical image analysis task. In addition, an analysis of model complexity and computational efficiency was conducted, showing that while ResNet50 achieved the highest accuracy, VGG16 provided a more favorable trade-off between performance and training time.",
            keywords: ["MRI", "Brain Tumor", "Deep Learning", "CNN", "ResNet50", "VGG16"],
            date: "Published online: 15 Sep 2025"
        },
        {
            title: "Enhanced Image Security through 4D Hyperchaotic System and Hybrid Key",
            doi: "https://doi.org/10.32520/stmsi.v13i6.4675",
            publisher: "Sistemasi: Jurnal Sistem Informasi",
            authors: "Muhammad Naufal Erza Farandi, Sri Winarno & Zahrah Asri Nur Fauzyah",
            abstract: "This study develops a digital image encryption method using a 4D hyperchaotic system combined with a hybrid key to maximize data security. By generating a random and uniform pixel distribution, the method makes decryption significantly harder for unauthorized access. Evaluations are conducted through histogram analysis, robustness tests, NPCR, UACI, and information entropy. The findings reveal that the method effectively breaks pixel correlation, rendering the encrypted image unrecognizable. Histogram analysis confirms a uniform pixel distribution, while robustness tests show the system can maintain image quality despite manipulations or attacks. NPCR and UACI tests highlight the method’s high sensitivity to even minor changes in the original image, further enhancing security. Information entropy demonstrates a higher level of randomness compared to other encryption techniques. This 4D hyperchaotic and hybrid key-based approach holds considerable promise for applications requiring highly secure image transmission and storage, ensuring reliable data protection in sensitive environments.",
            keywords: ["4D Hyperchaotic", "Hybrid Key", "Image Security", "Cryptography"],
            date: "Published online: 27 Nov 2024"
        },
        {
            title: "AN ENHANCED MULTI-LAYERED IMAGE ENCRYPTION SCHEME USING 2D HYPERCHAOTIC CROSS-SYSTEM AND LOGISTIC MAP WITH ROUTE TRANSPOSITION",
            doi: "https://doi.org/10.52436/1.jutif.2025.6.1.4007",
            publisher: "Jurnal Teknik Informatika (JUTIF)",
            authors: "Zahrah Asri Nur Fauzyah, Adhitya Nugraha, Ardytha Luthfiarta, Muhammad Naufal Erza Farandi",
            abstract: "In the rapidly evolving digital era, image encryption has become a crucial technique to protect visual data from the threat of information leakage. However, the main challenge in image encryption is improving security against cryptanalysis attacks, such as brute-force and differential attacks, which can compromise the integrity of the encrypted image. Additionally, the creation of efficient and fast encryption schemes that do not degrade image quality remains a significant challenge. This research proposes a multi-layer image encryption scheme that integrates the Logistic Map algorithm, Cross 2D Hyperchaotic (C2HM) system, and Route Transposition techniques. The method aims to enhance the security of digital image encryption by combining chaotic and hyperchaotic systems. The Logistic Map is used to generate a sequence of random values with high chaotic properties, while C2HM contributes to increasing complexity and variability. The Route Transposition technique is applied to scramble pixel positions, further strengthening the encryption’s randomness. The encryption key is derived from a combination of the image hash and user key, which are then used to calculate the initial seed in the chaotic algorithm. Experiments were conducted using standard images with a resolution of 512× 512 pixels. The security analysis includes evaluations of NPCR, UACI, histogram analysis, and information entropy.",
            keywords: ["Multi-layered Encryption", "Hyperchaotic Cross-system", "Logistic Map", "Route Transposition"],
            date: "Published online: 10 Feb 2025"
        }
    ]

    const [activeTab, setActiveTab] = React.useState(0)

    return (
        <div className="h-full flex flex-col bg-[#F9F9FB] text-[#333]">
            {/* Browser Header / Chrome Style */}
            <div className="bg-[#E7E9ED] px-2 pt-2 flex flex-col gap-1 shadow-sm shrink-0">
                {/* Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar px-2">
                    {publications.map((pub, idx) => (
                        <div
                            key={idx}
                            onClick={() => setActiveTab(idx)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-[11px] min-w-[160px] max-w-[220px] transition-all cursor-pointer group ${activeTab === idx ? 'bg-[#F9F9FB] shadow-[0_-2px_4px_rgba(0,0,0,0.05)]' : 'hover:bg-white/40'}`}
                        >
                            <Globe size={12} className={activeTab === idx ? 'text-blue' : 'text-subtext'} />
                            <span className="truncate font-medium flex-1">{pub.title}</span>
                            {activeTab === idx && <button className="hover:bg-black/10 rounded p-0.5"><RotateCw size={10} /></button>}
                        </div>
                    ))}
                    <div className="p-1 px-2 hover:bg-black/10 rounded cursor-pointer self-center">
                        <span className="text-xl leading-none">+</span>
                    </div>
                </div>

                {/* Toolbar / Address Bar */}
                <div className="bg-[#F9F9FB] px-4 py-2 flex items-center gap-4 text-subtext/60">
                    <div className="flex items-center gap-3">
                        <ArrowLeft size={16} className="cursor-pointer hover:text-text hover:bg-black/5 rounded p-1 h-7 w-7" />
                        <ArrowRight size={16} className="opacity-30 p-1 h-7 w-7" />
                        <RotateCw size={14} className="cursor-pointer hover:text-text hover:bg-black/5 rounded p-1 h-7 w-7" />
                    </div>

                    <div className="flex-1 max-w-4xl mx-auto flex items-center gap-2 px-4 py-1 rounded-full bg-[#E7E9ED]/60 border border-black/5 text-[12px] group focus-within:bg-white focus-within:shadow-md transition-all">
                        <Shield size={12} className="text-green/60" />
                        <span className="text-green font-medium">Safe</span>
                        <div className="w-[1px] h-3 bg-black/10 mx-1" />
                        <span className="text-text/70 truncate flex-1">{publications[activeTab].doi}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Bookmark size={16} className="cursor-pointer hover:text-blue" />
                        <MoreVertical size={16} className="cursor-pointer hover:text-text" />
                    </div>
                </div>
            </div>

            {/* Browser Content / Journal Page */}
            <div className="flex-1 overflow-y-auto bg-white custom-scrollbar-light">
                {/* Journal Navbar Mockup */}
                <div className="border-b border-gray-100 flex items-center justify-between px-10 py-4 shadow-sm sticky top-0 bg-white/90 backdrop-blur-md z-10">
                    <div className="flex items-center gap-6">
                        <div className="font-bold text-blue flex items-center gap-2">
                            <Globe size={24} />
                            <span className="tracking-tight text-xl">JournalHub</span>
                        </div>
                        <nav className="flex items-center gap-6 text-sm font-medium text-gray-500">
                            <span className="hover:text-blue cursor-pointer transition-colors">Journals</span>
                            <span className="hover:text-blue cursor-pointer transition-colors">Search</span>
                            <span className="hover:text-blue cursor-pointer transition-colors">Publish</span>
                            <span className="hover:text-blue cursor-pointer transition-colors">About</span>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue transition-colors" size={14} />
                            <input
                                type="text"
                                placeholder="Search publications..."
                                className="bg-gray-100 border-transparent focus:bg-white focus:border-blue/30 focus:ring-4 focus:ring-blue/5 rounded-full py-1.5 pl-9 pr-4 text-xs w-64 transition-all outline-none"
                            />
                        </div>
                        <button className="bg-blue text-white px-5 py-2 rounded-full text-xs font-bold shadow-lg shadow-blue/20 hover:bg-blue/90 transition-all">Submit Article</button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-5xl mx-auto px-10 py-12 space-y-10">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                        <span>Research</span>
                        <span>/</span>
                        <span>{publications[activeTab].publisher.split('-')[0]}</span>
                        <span>/</span>
                        <span className="text-blue">{publications[activeTab].doi.split('/').pop()}</span>
                    </div>

                    {/* Article Header */}
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-black text-[#222] leading-tight">
                            {publications[activeTab].title}
                        </h1>

                        <div className="flex flex-col gap-4 text-lg">
                            <p className="font-medium text-blue hover:underline cursor-pointer transition-all">
                                {publications[activeTab].authors}
                            </p>
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-gray-500">
                                <span>{publications[activeTab].date}</span>
                                <div className="flex items-center gap-1 text-gray-400">
                                    <Share2 size={14} />
                                    <span>2.4k Views</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-400">
                                    <Layout size={14} />
                                    <span>12 Citations</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <a
                                href={publications[activeTab].doi}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 bg-blue text-white px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue/20 hover:scale-[1.02] active:scale-95 transition-all group"
                            >
                                <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
                                See Journal (Official DOI)
                            </a>
                            <button className="flex items-center gap-2 border-2 border-gray-100 px-6 py-3.5 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition-all">
                                <Bookmark size={18} />
                                Save to Library
                            </button>
                        </div>
                    </div>

                    {/* Abstract Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pt-8 border-t border-gray-100">
                        <div className="lg:col-span-3 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-black text-[#222] uppercase tracking-tight flex items-center gap-3">
                                    <div className="w-8 h-1 bg-blue rounded-full" />
                                    Abstract
                                </h2>
                                <p className="text-lg leading-relaxed text-gray-600 font-medium whitespace-pre-wrap">
                                    {publications[activeTab].abstract}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-black text-[#222] uppercase tracking-wide">Keywords</h3>
                                <div className="flex flex-wrap gap-2">
                                    {publications[activeTab].keywords.map((kw, i) => (
                                        <span key={i} className="px-4 py-2 bg-gray-100 rounded-full text-xs font-bold text-gray-500 hover:bg-blue/10 hover:text-blue transition-all cursor-pointer">
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Metrics */}
                        <div className="space-y-8">
                            <div className="bg-[#F9F9FB] rounded-2xl p-6 border border-gray-100 space-y-6">
                                <h4 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400">Journal Metrics</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-600">Impact Factor</span>
                                        <span className="font-bold text-blue">4.2</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-600">Citations</span>
                                        <span className="font-bold text-[#E63946]">1,204</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-600">SJR</span>
                                        <span className="font-bold text-[#2A9D8F]">0.85</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-orange/5 rounded-2xl p-6 border border-orange/10 space-y-4">
                                <div className="flex items-center gap-2 text-orange font-bold">
                                    <Layout size={16} />
                                    <span className="text-xs uppercase tracking-widest">Publisher Note</span>
                                </div>
                                <p className="text-[11px] leading-relaxed text-orange/80 font-medium">
                                    Open access provided by Taylor & Francis. Published under Creative Commons license.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Placeholder */}
                <div className="bg-[#F9F9FB] px-10 py-12 border-t border-gray-100 text-center">
                    <p className="text-gray-400 text-sm font-medium">© 2026 JournalHub. Part of Muhammad Naufal Erza Farandi Research Portfolio.</p>
                </div>
            </div>
        </div>
    )
}

export default PublicationsApp
