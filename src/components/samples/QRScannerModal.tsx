import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  QrCode, 
  Zap, 
  Image, 
  Camera, 
  CheckCircle2, 
  Search,
  Sparkles
} from 'lucide-react';

export const QRScannerModal: React.FC = () => {
  const { showScanner, setShowScanner, samples, setSelectedSample, setActiveTab } = useApp();
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [scannedCode, setScannedCode] = useState('');
  const [isScanning, setIsScanning] = useState(true);

  if (!showScanner) return null;

  const handleScanSample = (sample: any) => {
    setIsScanning(false);
    setScannedCode(sample.sampleCode);
    setTimeout(() => {
      setShowScanner(false);
      setSelectedSample(sample);
      setActiveTab('samples');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-[#1d1d1f] text-white rounded-[4px] overflow-hidden border border-[#333333] shadow-2xl flex flex-col relative">
        {/* Top Header */}
        <div className="p-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#2997ff]" />
            <span className="text-sm font-semibold text-white">Scanner Barcode & QR</span>
          </div>
          <button
            onClick={() => setShowScanner(false)}
            className="w-8 h-8 rounded-[4px] bg-[#272729] text-[#cccccc] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Camera Viewport Simulation */}
        <div className="relative w-full h-80 bg-gradient-to-b from-[#111112] to-[#252527] flex items-center justify-center overflow-hidden">
          {/* Background Camera Noise/Sim */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* Targeting Box */}
          <div className="relative w-56 h-56 rounded-[4px] border-2 border-white/40 flex items-center justify-center shadow-[0_0_50px_rgba(0,102,204,0.3)]">
            {/* Corner Markers */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-[#2997ff] rounded-tl-[2px]"></div>
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-[#2997ff] rounded-tr-[2px]"></div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-[#2997ff] rounded-bl-[2px]"></div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-[#2997ff] rounded-br-[2px]"></div>

            {/* Laser Line Scanning Animation */}
            {isScanning && (
              <div className="w-full h-0.5 bg-[#2997ff] shadow-[0_0_12px_#2997ff] animate-[bounce_2s_infinite]"></div>
            )}

            {scannedCode && (
              <div className="bg-[#34c759] text-white text-xs font-bold px-3 py-1.5 rounded-[4px] flex items-center gap-1.5 animate-in zoom-in-95">
                <CheckCircle2 className="w-4 h-4" />
                <span>Terdeteksi: {scannedCode}</span>
              </div>
            )}
          </div>

          {/* Flashlight Indicator */}
          {flashlightOn && (
            <div className="absolute inset-0 bg-white/20 pointer-events-none transition-opacity"></div>
          )}
        </div>

        {/* Camera Controls */}
        <div className="p-4 bg-[#1d1d1f] space-y-3">
          <div className="flex items-center justify-around py-1 border-b border-[#272729]">
            <button
              onClick={() => setFlashlightOn(!flashlightOn)}
              className={`flex flex-col items-center gap-1 text-xs transition-all ${
                flashlightOn ? 'text-[#ff9f0a]' : 'text-[#7a7a7a] hover:text-white'
              }`}
            >
              <div className="w-10 h-10 rounded-[4px] bg-[#272729] flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-[10px]">Flashlight</span>
            </button>

            <button
              onClick={() => handleScanSample(samples[0])}
              className="flex flex-col items-center gap-1 text-xs text-[#2997ff] hover:text-white transition-all"
            >
              <div className="w-12 h-12 rounded-[4px] bg-[#0066cc] text-white flex items-center justify-center shadow-lg shadow-[#0066cc]/40">
                <Camera className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-semibold">Pindai</span>
            </button>

            <button
              onClick={() => handleScanSample(samples[1] || samples[0])}
              className="flex flex-col items-center gap-1 text-xs text-[#7a7a7a] hover:text-white transition-all"
            >
              <div className="w-10 h-10 rounded-[4px] bg-[#272729] flex items-center justify-center">
                <Image className="w-4 h-4" />
              </div>
              <span className="text-[10px]">Galeri</span>
            </button>
          </div>

          {/* Quick Mock Sample Scans */}
          <div>
            <span className="text-[11px] font-semibold text-[#7a7a7a] block mb-1.5 uppercase tracking-wider">
              Uji Cepat Label Barcode Sampel:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {samples.slice(0, 4).map(s => (
                <button
                  key={s.id}
                  onClick={() => handleScanSample(s)}
                  className="bg-[#272729] hover:bg-[#333333] border border-[#3a3a3c] text-left p-2 rounded-[4px] text-xs text-white transition-all active:scale-95 flex items-center justify-between"
                >
                  <div className="truncate">
                    <div className="font-mono text-[10px] text-[#2997ff] font-bold">{s.sampleCode}</div>
                    <div className="text-[10px] text-[#cccccc] truncate">{s.name}</div>
                  </div>
                  <Sparkles className="w-3 h-3 text-[#2997ff] shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
