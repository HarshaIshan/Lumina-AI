import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { Toaster, toast } from 'sonner';
import { 
  Sparkles, 
  LayoutDashboard, 
  MessageSquare, 
  ArrowRight, 
  Zap, 
  Shield, 
  Globe, 
  Menu, 
  X,
  Plus,
  Search,
  Settings,
  User,
  Send,
  Mic,
  Image as ImageIcon,
  Paperclip,
  FileText,
  File
} from 'lucide-react';

// --- Types ---
type Screen = 'hero' | 'dashboard' | 'chat';

// --- Components ---

// --- Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  exit: { y: -20, opacity: 0 }
};

const Navigation = ({ current, setScreen }: { current: Screen, setScreen: (s: Screen) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 py-4 glass m-4 rounded-2xl">
        <motion.div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setScreen('hero')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">LUMINA</span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-ink/60">
          {(['hero', 'dashboard', 'chat'] as Screen[]).map((s) => (
            <button 
              key={s}
              onClick={() => setScreen(s)}
              className={`relative hover:text-accent transition-colors ${current === s ? 'text-accent' : ''}`}
            >
              {s === 'hero' ? 'Home' : s === 'dashboard' ? 'Dashboard' : 'AI Chat'}
              {current === s && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => toast.info("Authentication system coming soon.")}
            className="hidden sm:block text-sm font-medium hover:text-accent transition-colors"
          >
            Sign In
          </button>
          <motion.button 
            onClick={() => setScreen('dashboard')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:block bg-ink text-bg px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-black/20"
          >
            Get Started
          </motion.button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-ink/60 hover:text-accent transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-4 right-4 z-50 glass p-6 rounded-2xl md:hidden shadow-2xl border border-white/20"
          >
            <div className="flex flex-col gap-6 text-center">
              {(['hero', 'dashboard', 'chat'] as Screen[]).map((s) => (
                <button 
                  key={s}
                  onClick={() => {
                    setScreen(s);
                    setIsMenuOpen(false);
                  }}
                  className={`text-lg font-bold uppercase tracking-widest ${current === s ? 'text-accent' : 'text-ink/60'}`}
                >
                  {s === 'hero' ? 'Home' : s === 'dashboard' ? 'Dashboard' : 'AI Chat'}
                </button>
              ))}
              <div className="h-px bg-ink/10 my-2" />
              <button 
                onClick={() => {
                  setScreen('dashboard');
                  setIsMenuOpen(false);
                }}
                className="text-sm font-bold text-accent uppercase tracking-widest"
              >
                Get Started
              </button>
              <button 
                onClick={() => {
                  toast.info("Authentication system coming soon.");
                  setIsMenuOpen(false);
                }}
                className="text-sm font-medium text-ink/40 uppercase tracking-widest"
              >
                Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = ({ onNext, onChat }: { onNext: () => void, onChat: () => void }) => {
  return (
    <motion.div 
      key="hero"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen flex flex-col items-center justify-center pt-24 px-6 overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -45, 0],
            x: [0, -30, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full" 
        />
      </div>

      <div className="max-w-5xl w-full text-center space-y-8">
        <motion.div variants={itemVariants}>
          <span className="inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
            Next-Gen Intelligence
          </span>
          <h1 className="font-display text-4xl md:text-8xl lg:text-9xl font-bold leading-[1.1] md:leading-[0.9] tracking-tighter">
            BUILD THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400 [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">FUTURE</span> FASTER
          </h1>
        </motion.div>

        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-ink/60 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Lumina is the world's most advanced creative AI platform. 
          Designed for builders who refuse to wait for the future.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <motion.button 
            onClick={onNext}
            whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(255,78,0,0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto bg-accent text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all group"
          >
            Start Building <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button 
            onClick={() => toast.info("Showcase gallery is being curated.")}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto glass px-8 py-4 rounded-2xl font-bold text-lg transition-colors"
          >
            View Showcase
          </motion.button>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-4 flex justify-center">
          <motion.button 
            onClick={onChat}
            initial={{ scale: 1 }}
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(255,76,0,0.2)",
                "0 0 40px rgba(255,76,0,0.5)",
                "0 0 20px rgba(255,76,0,0.2)"
              ]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto relative group px-16 py-6 rounded-full font-bold text-2xl flex items-center justify-center gap-3 transition-all overflow-hidden"
          >
            {/* Base Gradient Layer: White to Orange to White for symmetry */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-accent to-white" />
            
            {/* Symmetrical Glossy Highlights */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
            
            {/* Soft Center Glow */}
            <div className="absolute inset-0 bg-accent/20 blur-xl pointer-events-none" />

            {/* Special Animation: Moving Light Streak */}
            <motion.div 
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
            />

            <MessageSquare className="w-7 h-7 text-orange-950 relative z-10 group-hover:rotate-12 transition-transform" /> 
            <span className="relative z-10 text-orange-950 tracking-tight">AI Chat</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Feature Grid */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mt-32"
      >
        {[
          { icon: Zap, title: "Instant Execution", desc: "Turn thoughts into production-ready code in seconds." },
          { icon: Shield, title: "Enterprise Grade", desc: "Built with security and scalability at its core." },
          { icon: Globe, title: "Global Scale", desc: "Deploy your vision to millions with a single click." }
        ].map((f, i) => (
          <motion.div 
            key={i}
            variants={itemVariants}
            whileHover={{ y: -10, borderColor: "rgba(255,78,0,0.5)" }}
            className="glass p-8 rounded-3xl space-y-4 transition-colors group cursor-pointer"
            onClick={() => toast.info(`${f.title} feature is coming soon.`)}
          >
            <div className="w-12 h-12 bg-ink/5 rounded-2xl flex items-center justify-center group-hover:bg-accent/10 transition-colors">
              <f.icon className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold font-display">{f.title}</h3>
            <p className="text-ink/50 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const Dashboard = () => {
  return (
    <motion.div 
      key="dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen pt-28 px-6 pb-12 max-w-7xl mx-auto w-full"
    >
      <motion.div 
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div>
          <h2 className="font-serif italic text-4xl md:text-5xl mb-2">Project Overview</h2>
          <p className="text-ink/50 font-mono text-sm uppercase tracking-widest">System Status: Operational // 27.03.2026</p>
        </div>
        <div className="flex gap-3">
          <motion.button 
            onClick={() => toast.info("Search functionality is being indexed.")}
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }} 
            className="glass p-3 rounded-xl hover:bg-white/10 transition-colors"
          >
            <Search className="w-5 h-5" />
          </motion.button>
          <motion.button 
            onClick={() => toast.info("Settings panel is under construction.")}
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }} 
            className="glass p-3 rounded-xl hover:bg-white/10 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </motion.button>
          <motion.button 
            onClick={() => toast.success("Starting a new neural workspace...")}
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="bg-accent text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-accent/20"
          >
            <Plus className="w-5 h-5" /> New Project
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Stats */}
        <motion.div 
          variants={containerVariants}
          className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            { label: "Active Nodes", value: "1,284", trend: "+12%", color: "text-accent" },
            { label: "Compute Power", value: "84.2 TF", trend: "+5.4%", color: "text-blue-400" },
            { label: "Data Ingested", value: "4.2 PB", trend: "+22%", color: "text-emerald-400" },
            { label: "Uptime", value: "99.99%", trend: "Stable", color: "text-ink" }
          ].map((s, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                onClick={() => toast.info(`${s.label} details are being calculated.`)}
                className="glass p-8 rounded-3xl relative overflow-hidden group cursor-pointer"
              >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="w-16 h-16" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-2">{s.label}</p>
              <div className="flex items-baseline gap-3">
                <h4 className={`text-4xl font-display font-bold ${s.color}`}>{s.value}</h4>
                <span className="text-xs font-mono text-emerald-400">{s.trend}</span>
              </div>
            </motion.div>
          ))}

          {/* Activity Chart Placeholder */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2 glass p-8 rounded-3xl h-80 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display font-bold text-xl">Network Activity</h3>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <div className="w-3 h-3 rounded-full bg-blue-500" />
              </div>
            </div>
            <div className="flex-1 flex items-end gap-2 px-2">
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.random() * 80 + 20}%` }}
                  whileHover={{ scaleY: 1.1, backgroundColor: "rgba(255,78,0,0.8)" }}
                  transition={{ 
                    height: { delay: 0.5 + (i * 0.03), duration: 1, ease: "easeOut" },
                    scaleY: { duration: 0.2 }
                  }}
                  className="flex-1 bg-gradient-to-t from-accent/20 to-accent/60 rounded-t-sm origin-bottom cursor-pointer"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Sidebar / Recent Activity */}
        <motion.div 
          variants={itemVariants}
          className="glass p-8 rounded-3xl flex flex-col"
        >
          <h3 className="font-display font-bold text-xl mb-6">Recent Deployments</h3>
          <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {[
              { name: "Neural Engine V2", time: "2m ago", status: "Success" },
              { name: "Edge Cache Alpha", time: "14m ago", status: "Success" },
              { name: "Global Auth Sync", time: "1h ago", status: "Warning" },
              { name: "Data Pipeline X", time: "3h ago", status: "Success" },
              { name: "Legacy Cleanup", time: "5h ago", status: "Success" },
              { name: "API Gateway 4", time: "12h ago", status: "Success" }
            ].map((d, i) => (
              <motion.div 
                key={i} 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                whileHover={{ x: 5 }}
                transition={{ 
                  delay: 0.6 + (i * 0.05),
                  x: { type: "spring", stiffness: 400, damping: 25 }
                }}
                className="flex items-center justify-between group cursor-pointer"
                onClick={() => toast.info(`Viewing details for ${d.name}...`)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${d.status === 'Success' ? 'bg-emerald-400' : 'bg-orange-400'}`} />
                  <div>
                    <p className="font-medium group-hover:text-accent transition-colors">{d.name}</p>
                    <p className="text-xs text-ink/40 font-mono">{d.time}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </motion.div>
            ))}
          </div>
          <motion.button 
            onClick={() => toast.info("Full deployment logs are being archived.")}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.05)", scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-8 py-4 border border-white/10 rounded-2xl font-bold transition-all"
          >
            View All Logs
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 'initial', role: 'ai', content: "Hello. I am Lumina. How can I assist your creative process today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ data: string, mimeType: string, name: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = (instant = false) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: instant ? "auto" : "smooth",
        block: "end"
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => scrollToBottom(), 100);
    return () => clearTimeout(timer);
  }, [messages]);

  // Handle window resize (keyboard opening/closing on mobile)
  useEffect(() => {
    window.addEventListener('resize', () => scrollToBottom(true));
    return () => window.removeEventListener('resize', () => scrollToBottom(true));
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = (event.target?.result as string).split(',')[1];
      setSelectedFile({
        data: base64,
        mimeType: file.type,
        name: file.name
      });
      toast.success(`File selected: ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedFile) || isLoading) return;
    
    const userMessageContent = input.trim() || (selectedFile ? `Uploaded ${selectedFile.name}` : "");
    const userMessage = { 
      id: Date.now().toString(),
      role: 'user', 
      content: userMessageContent,
      file: selectedFile ? { name: selectedFile.name, type: selectedFile.mimeType } : undefined
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    const currentFile = selectedFile;
    
    setInput("");
    setSelectedFile(null);
    setIsLoading(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
      
      const parts: any[] = [];
      if (currentInput) parts.push({ text: currentInput });
      if (currentFile) {
        parts.push({
          inlineData: {
            data: currentFile.data,
            mimeType: currentFile.mimeType
          }
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: { parts },
        config: {
          systemInstruction: "You are Lumina, a helpful and creative AI assistant trained by Hasha from HB Company. You are concise, professional, and inspiring. You help users with their creative process, coding, and design. You can analyze images, audio, PDF, and text documents if provided. If asked who created you or the site, credit Hasha from HB Company.",
        },
      });

      const aiContent = response.text || "I've processed your input. How else can I help?";
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', content: aiContent }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', content: "I encountered an error while processing your request. Please check your connection and try again." }]);
      toast.error("AI processing failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      key="chat"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`h-[100dvh] md:h-screen px-4 md:px-6 pb-4 md:pb-6 flex flex-col max-w-5xl mx-auto w-full transition-all duration-500 ${
        isFocused ? 'pt-4 md:pt-28' : 'pt-20 md:pt-28'
      }`}
    >
      {/* Chat Header */}
      <AnimatePresence>
        {!isFocused && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="flex items-center justify-between overflow-hidden md:flex"
          >
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center relative cursor-pointer"
              >
                <Sparkles className="text-white w-6 h-6" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-4 border-bg rounded-full" 
                />
              </motion.div>
              <div>
                <h3 className="font-display font-bold text-xl">Lumina Core</h3>
                <p className="text-xs text-emerald-400 font-mono uppercase tracking-widest">Active // Low Latency</p>
              </div>
            </div>
            <div className="flex gap-2">
              <motion.button 
                onClick={() => toast.info("Profile settings coming soon.")}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }} 
                whileTap={{ scale: 0.9 }} 
                className="glass p-3 rounded-xl transition-colors"
              >
                <User className="w-5 h-5" />
              </motion.button>
              <motion.button 
                onClick={() => toast.info("AI Core configuration panel coming soon.")}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }} 
                whileTap={{ scale: 0.9 }} 
                className="glass p-3 rounded-xl transition-colors"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Area */}
      <motion.div 
        variants={itemVariants}
        className={`flex-1 glass overflow-hidden flex flex-col relative transition-all duration-500 ${
          isFocused 
            ? 'rounded-2xl md:rounded-[2.5rem] p-4 md:p-8 mb-2 md:mb-6' 
            : 'rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-8 mb-4 md:mb-6'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
        
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto space-y-8 pr-4 mask-fade custom-scrollbar"
        >
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div 
                key={m.id}
                initial={{ y: 20, opacity: 0, scale: 0.95, x: m.role === 'user' ? 20 : -20 }}
                animate={{ y: 0, opacity: 1, scale: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-6 rounded-3xl shadow-xl relative group ${
                  m.role === 'user' 
                    ? 'bg-accent text-white rounded-tr-none shadow-accent/20' 
                    : 'bg-white/5 border border-white/10 rounded-tl-none shadow-black/20'
                }`}>
                  {m.role === 'user' && (
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(m.content);
                        toast.success("Copied to clipboard");
                      }}
                      className="absolute -left-8 top-2 p-1 hover:text-accent transition-colors opacity-0 group-hover:opacity-100"
                      title="Copy message"
                    >
                      <Paperclip className="w-3 h-3 rotate-45" />
                    </button>
                  )}
                  {m.role === 'ai' && (
                    <div className="flex justify-between items-start mb-2">
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent"
                      >
                        Lumina Response
                      </motion.p>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(m.content);
                          toast.success("Copied to clipboard");
                        }}
                        className="p-1 hover:text-accent transition-colors opacity-40 hover:opacity-100"
                        title="Copy to clipboard"
                      >
                        <Paperclip className="w-3 h-3 rotate-45" />
                      </button>
                    </div>
                  )}
                  {m.file && (
                    <div className="mb-2 p-2 bg-black/20 rounded-xl flex items-center gap-2 text-xs">
                      {m.file.type.startsWith('image') ? (
                        <ImageIcon className="w-4 h-4" />
                      ) : m.file.type.includes('pdf') ? (
                        <FileText className="w-4 h-4" />
                      ) : m.file.type.startsWith('audio') ? (
                        <Mic className="w-4 h-4" />
                      ) : (
                        <File className="w-4 h-4" />
                      )}
                      <span className="truncate">{m.file.name}</span>
                    </div>
                  )}
                  <p className={m.role === 'ai' ? 'font-serif text-lg leading-relaxed text-ink/90' : 'font-sans font-medium'}>
                    {m.content}
                  </p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl rounded-tl-none flex gap-2">
                  <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-accent rounded-full" />
                  <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-accent rounded-full" />
                  <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-accent rounded-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`relative transition-all duration-500 ${isFocused ? 'mt-2' : 'mt-8'}`}>
          <AnimatePresence>
            {selectedFile && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-16 left-0 right-0 p-3 glass rounded-xl flex items-center justify-between mx-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                    {selectedFile.mimeType.startsWith('image') ? (
                      <ImageIcon className="w-5 h-5 text-accent" />
                    ) : selectedFile.mimeType.includes('pdf') ? (
                      <FileText className="w-5 h-5 text-accent" />
                    ) : selectedFile.mimeType.startsWith('audio') ? (
                      <Mic className="w-5 h-5 text-accent" />
                    ) : (
                      <File className="w-5 h-5 text-accent" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold truncate max-w-[200px]">{selectedFile.name}</p>
                    <p className="text-[10px] text-ink/40 uppercase tracking-widest">Ready to upload</p>
                  </div>
                </div>
                <button onClick={() => setSelectedFile(null)} className="p-2 hover:text-accent transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            initial={false}
            animate={{ 
              boxShadow: (input || selectedFile || isFocused) ? "0 0 40px rgba(255,78,0,0.15)" : "none",
              borderColor: (input || selectedFile || isFocused) ? "rgba(255,78,0,0.4)" : "rgba(255,255,255,0.1)"
            }}
            className="glass rounded-[1.5rem] md:rounded-[2rem] p-1.5 md:p-2 flex items-center gap-1 md:gap-2 focus-within:ring-1 focus-within:ring-accent/30 transition-all outline-none"
          >
            <motion.button 
              onClick={() => fileInputRef.current?.click()}
              whileHover={{ scale: 1.1, color: "#ff4c00" }} 
              className="p-2 md:p-3 text-ink/40 transition-colors"
            >
              <Paperclip className="w-5 h-5" />
            </motion.button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              enterKeyHint="send"
              onPaste={(e) => {
                const item = e.clipboardData.items[0];
                if (item?.type.startsWith('image')) {
                  const file = item.getAsFile();
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const base64 = (event.target?.result as string).split(',')[1];
                      setSelectedFile({
                        data: base64,
                        mimeType: file.type,
                        name: 'pasted-image.png'
                      });
                      toast.success("Image pasted from clipboard");
                    };
                    reader.readAsDataURL(file);
                  }
                }
              }}
              placeholder={isLoading ? "Lumina is thinking..." : "Ask Lumina anything..."}
              disabled={isLoading}
              className="flex-1 bg-transparent border-none outline-none text-ink/90 placeholder:text-ink/20 py-3 px-1 md:px-2 font-medium disabled:opacity-50 text-sm md:text-base"
            />
            <div className="flex items-center gap-0.5 md:gap-1">
              <input 
                type="file" 
                ref={audioInputRef} 
                onChange={handleFileSelect} 
                accept="audio/*" 
                className="hidden" 
              />
              <motion.button 
                onClick={() => audioInputRef.current?.click()}
                whileHover={{ scale: 1.1, color: "#ff4c00" }} 
                className="p-2 md:p-3 text-ink/40 transition-colors hidden sm:flex"
              >
                <Mic className="w-5 h-5" />
              </motion.button>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                accept="image/*,application/pdf,text/*" 
                className="hidden" 
              />
              <motion.button 
                onClick={handleSend}
                disabled={isLoading}
                whileHover={isLoading ? {} : { scale: 1.05 }}
                whileTap={isLoading ? {} : { scale: 0.95 }}
                className={`bg-accent text-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-lg shadow-accent/20 transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-accent/40'}`}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
          <div className="flex justify-center gap-6 mt-4">
             {[
               { icon: Zap, label: "Ultra Fast" },
               { icon: Shield, label: "Encrypted" },
               { icon: Globe, label: "Web Access" }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1 + (i * 0.1) }}
                 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/30 font-bold"
               >
                 <item.icon className="w-3 h-3" /> {item.label}
               </motion.div>
             ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('hero');

  return (
    <div className="relative selection:bg-accent selection:text-white">
      <Toaster position="top-center" richColors theme="dark" />
      <Navigation current={screen} setScreen={setScreen} />
      
      <main>
        <AnimatePresence mode="wait">
          {screen === 'hero' && <Hero onNext={() => setScreen('dashboard')} onChat={() => setScreen('chat')} />}
          {screen === 'dashboard' && <Dashboard />}
          {screen === 'chat' && <Chat />}
        </AnimatePresence>
      </main>

      {/* Footer Micro-details */}
      <footer className="fixed bottom-6 left-6 text-[10px] font-mono text-ink/20 uppercase tracking-[0.3em] pointer-events-none">
        Lumina OS v4.2 // Created by Hasha (HB Company)
      </footer>
      <div className="fixed bottom-6 right-6 flex gap-4 pointer-events-none">
        <div className="w-1 h-1 rounded-full bg-accent animate-ping" />
        <div className="w-1 h-1 rounded-full bg-accent/40" />
        <div className="w-1 h-1 rounded-full bg-accent/20" />
      </div>
    </div>
  );
}
