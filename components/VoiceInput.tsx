import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { TRANSLATIONS } from '../constants';

interface VoiceInputProps {
  onText: (text: string) => void;
  className?: string;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onText, className }) => {
  const { language } = useAppContext();
  const t = TRANSLATIONS[language];
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Check browser support for Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      
      recog.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onText(transcript);
        setIsListening(false);
      };

      recog.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recog.onend = () => {
        setIsListening(false);
      };

      setRecognition(recog);
    } else {
      setIsSupported(false);
    }
  }, [onText]);

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
    } else {
      recognition.lang = language === 'ar' ? 'ar-EG' : 'en-US';
      recognition.start();
      setIsListening(true);
    }
  };

  if (!isSupported) return null;

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`p-2 rounded-full transition-colors flex items-center gap-2 ${
        isListening 
          ? 'bg-red-100 text-red-600 animate-pulse' 
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      } ${className}`}
      title={isListening ? t.stopSpeaking : t.startSpeaking}
    >
      {isListening ? <MicOff size={18} /> : <Mic size={18} />}
      <span className="text-xs font-bold hidden md:inline">
        {isListening ? t.stopSpeaking : t.startSpeaking}
      </span>
    </button>
  );
};

export default VoiceInput;