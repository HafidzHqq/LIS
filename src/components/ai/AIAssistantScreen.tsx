import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  TestTube2, 
  Boxes, 
  Sliders, 
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  badge?: string;
}

export const AIAssistantScreen: React.FC = () => {
  const { samples, inventory, equipment, currentUser } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Halo ${currentUser.name}! Saya LIMY AI, asisten intelijen laboratorium Anda. Saya dapat membantu menganalisis hasil uji abnormal, memprediksi pemakaian reagensia, serta memberikan rekomendasi SOP ISO 17025. Ada yang bisa saya bantu?`,
      timestamp: 'Baru saja',
      badge: 'LIMY AI Core'
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    '🔍 Analisis Sampel Kritis Tn. Sugianto (Darah)',
    '📦 Prediksi Kebutuhan Reagen Sysmex 7 Hari ke Depan',
    '💧 Evaluasi Baku Mutu Sampel Air Baku Ciburial',
    '⚙️ Rekomendasi Kalibrasi Spektrofotometer UV-1900i'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Baru saja'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiReply = '';
      let badge = 'Analisis Klinis';

      const qLower = query.toLowerCase();

      if (qLower.includes('sugianto') || qLower.includes('darah') || qLower.includes('leukosit')) {
        aiReply = `📊 **Temuan Analisis Sampel Darah Tn. Sugianto (LIMY-2026-0817-002):**
1. **Leukosit (WBC) 18.6 10^3/uL (Kritis/Tinggi)**: Menunjukkan respon inflamasi akut atau infeksi sistemik berat.
2. **Hemoglobin 9.4 g/dL (Abnormal/Rendah)**: Menandakan anemia normositik/mikrositik derajat sedang.
3. **Rekomendasi Medis/Lab**:
   - Lakukan apusan darah tepi (blood smear slide) untuk konfirmasi shift to the left (neutrofil batang).
   - Segera laporkan hasil nilai kritis ini ke DPJP / Perawat ICU RS Medika Sehat.`;
        badge = 'Interpretasi Kritis';
      } else if (qLower.includes('reagen') || qLower.includes('sysmex') || qLower.includes('stok')) {
        aiReply = `📦 **Prediksi Penggunaan Reagensia Hematologi:**
- **Reagen Sysmex Cellpack DCL**: Stok saat ini **4 Galon** (Batas Minimum: 6 Galon).
- Rata-rata konsumsi harian cabang Jakarta adalah **0.8 Galon/hari**.
- **Estimasi Stok Habis**: Tersisa untuk **~5 hari operasional** (22 Agustus 2026).
- **Rekomendasi Tindakan**: Buat Purchase Order (PO) ke PT Sysmex Indonesia hari ini untuk pengadaan batch baru.`;
        badge = 'Prediksi Inventaris';
      } else if (qLower.includes('air') || qLower.includes('ciburial') || qLower.includes('tds')) {
        aiReply = `💧 **Evaluasi Kualitas Air Baku Mata Air Ciburial (LIMY-2026-0817-001):**
- **pH 7.35** (Baku mutu: 6.5 - 8.5) -> **Normal & Netral**
- **TDS 142 mg/L** (Baku mutu: < 500 mg/L) -> **Sangat Baik**
- **Turbidity 0.85 NTU** (Baku mutu: < 5 NTU) -> **Jernih**
- **E. coli 0 CFU/100mL** -> **Negatif / Higienis**
- **Kesimpulan**: Air baku memenuhi seluruh standar Permenkes No. 2 Tahun 2023 untuk air minum dan aman didistribusikan.`;
        badge = 'Evaluasi Baku Mutu';
      } else if (qLower.includes('kalibrasi') || qLower.includes('spektro') || qLower.includes('alat')) {
        aiReply = `⚙️ **SOP Kalibrasi UV-VIS Spectrophotometer UV-1900i:**
- Jatuh tempo kalibrasi: **20 Agustus 2026 (Tersisa 3 hari)**.
- Protokol yang harus disiapkan:
  1. Larutan standar Holmium Oxide 4% untuk verifikasi akurasi panjang gelombang.
  2. Larutan Potassium Dichromate (K2Cr2O7) untuk verifikasi fotometrik absorbansi.
  3. Hubungi teknisi terakreditasi BSN/KAN untuk sertifikasi tahunan resmi.`;
        badge = 'SOP Instrumen';
      } else {
        aiReply = `Saya telah memproses pertanyaan Anda mengenai "*${query}*". Berdasarkan basis data LIMS LIMY, seluruh operasional berjalan stabil dengan tingkat kepatuhan QC 99.8%. Apakah ada sampel spesifik atau prosedur standar yang ingin saya bantu jelaskan lebih lanjut?`;
        badge = 'LIMY Assistant';
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: aiReply,
        timestamp: 'Baru saja',
        badge
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="p-4 space-y-3.5 pb-24 flex flex-col h-full">
      {/* Top AI Badge Card */}
      <div className="bg-[#272729] text-white rounded-[4px] p-4 shadow-apple-product border border-[#3a3a3c] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[4px] bg-gradient-to-tr from-[#af52de] to-[#2997ff] flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">LIMY AI Intelligence</h3>
            <p className="text-[10px] text-[#cccccc]">Model Lab Klinis & Kimia Lingkungan</p>
          </div>
        </div>
        <span className="text-[10px] bg-[#34c759]/20 text-[#34c759] px-2.5 py-0.5 rounded-[4px] font-bold border border-[#34c759]/30">
          Online & Siap
        </span>
      </div>

      {/* Quick Prompts Carousel */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="bg-white hover:bg-[#f5f5f7] border border-black/[0.08] text-[#333333] text-[11px] font-medium px-3 py-1.5 rounded-[4px] whitespace-nowrap shadow-xs active:scale-95 transition-all"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Thread */}
      <div className="space-y-3 flex-1 min-h-[300px]">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-7 h-7 rounded-[4px] bg-[#0066cc] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-[4px] p-3.5 text-xs leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-[#0066cc] text-white'
                  : 'bg-white text-[#1d1d1f] border border-black/[0.06]'
              }`}
            >
              {msg.badge && (
                <span className="inline-block text-[9px] bg-[#0066cc]/10 text-[#0066cc] px-2 py-0.2 rounded-[4px] font-bold mb-1.5">
                  {msg.badge}
                </span>
              )}
              <div className="whitespace-pre-wrap">{msg.text}</div>
              <span className={`block text-[9px] mt-1.5 ${msg.sender === 'user' ? 'text-white/70 text-right' : 'text-[#7a7a7a]'}`}>
                {msg.timestamp}
              </span>
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-[4px] bg-[#1d1d1f] text-white flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#7a7a7a] bg-white p-3 rounded-[4px] w-fit border border-black/[0.06]">
            <Sparkles className="w-3.5 h-3.5 text-[#0066cc] animate-spin" />
            <span>LIMY AI sedang menganalisis data lab...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="relative flex items-center pt-2"
      >
        <input
          type="text"
          placeholder="Tanyakan analisis sampel, reagen, atau regulasi lab..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-white text-xs text-[#1d1d1f] rounded-[4px] pl-4 pr-12 py-3 border border-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#0066cc] shadow-md"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="absolute right-1.5 w-8 h-8 rounded-[4px] bg-[#0066cc] hover:bg-[#0071e3] text-white flex items-center justify-center disabled:opacity-40 transition-all active:scale-95 shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
