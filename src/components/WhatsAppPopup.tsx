
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const WhatsAppPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('moviezone-whatsapp-popup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 3000); // Show after 3 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem('moviezone-whatsapp-popup', 'seen');
  };

  const handleJoinWhatsApp = () => {
    window.open('https://whatsapp.com/channel/0029VaAkETLLY6d8qhLmZt2v', '_blank');
    handleClose();
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-md mx-4 p-6 bg-card border border-border rounded-2xl shadow-2xl animate-fadeInUp">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-destructive/20"
        >
          <X className="h-4 w-4" />
        </Button>
        
        <div className="text-center space-y-4">
          <div className="text-4xl mb-2">🎬</div>
          <h3 className="text-xl font-bold gradient-text">
            Join MovieZone Updates!
          </h3>
          <p className="text-muted-foreground text-sm">
            Get notified about the latest movies, exclusive content, and streaming updates directly on WhatsApp.
          </p>
          
          <div className="flex flex-col gap-3 pt-2">
            <Button 
              onClick={handleJoinWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium"
            >
              Join WhatsApp Channel
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleClose}
              className="w-full text-muted-foreground hover:text-foreground"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
