import React, { useRef, useState } from 'react';
import { Camera, RefreshCw, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { TRANSLATIONS } from '../constants';

interface CameraCaptureProps {
  onCapture: (base64: string) => void;
  label?: string;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, label }) => {
  const { language } = useAppContext();
  const t = TRANSLATIONS[language];
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onCapture(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerCamera = () => {
    inputRef.current?.click();
  };

  return (
    <div className="mt-2">
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" 
        className="hidden" 
        ref={inputRef}
        onChange={handleFileChange}
      />
      
      {!preview ? (
        <button 
          onClick={triggerCamera}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors w-full justify-center md:w-auto border border-slate-300 border-dashed"
        >
          <Camera size={18} />
          <span>{label || t.takePhoto}</span>
        </button>
      ) : (
        <div className="relative inline-block mt-2">
          <img src={preview} alt="Captured" className="w-24 h-24 object-cover rounded-lg border border-slate-300" />
          <button 
            onClick={triggerCamera} 
            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md text-slate-600 hover:text-medical-600"
          >
            <RefreshCw size={14} />
          </button>
          <div className="absolute bottom-0 right-0 bg-green-500 rounded-tl-lg rounded-br-lg p-1 text-white">
            <Check size={12} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;