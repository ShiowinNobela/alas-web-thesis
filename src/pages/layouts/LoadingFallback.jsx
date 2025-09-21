// src/pages/LoadingFallback.jsx
import Logo from '/alaslogo.jpg';

function LoadingFallback() {
  return (
    <div className="bg-background flex h-screen items-center justify-center">
      <div className="text-center">
        {/* Animated logo with pulse effect */}
        <div className="relative mx-auto mb-6 h-24 w-24">
          <img src={Logo} alt="Alas Delis & Spices" className="h-full w-full rounded-full object-cover shadow-lg" />
          {/* Pulsing ring animation */}
          <div className="border-primary/20 absolute inset-0 animate-ping rounded-full border-2"></div>
        </div>

        {/* Brand name with subtle fade-in */}
        <h1 className="text-primary mb-2 animate-pulse text-xl font-bold tracking-wide">Alas Delis & Spices</h1>

        {/* Tagline with staggered animation */}
        <div className="text-muted-foreground flex items-center justify-center space-x-2">
          <span className="text-sm">Bringing the heat</span>
          <span className="animate-bounce">🌶️</span>
        </div>

        {/* Minimal progress indicator */}
        <div className="mx-auto mt-6 h-1 w-24 overflow-hidden rounded-full bg-gray-200">
          <div className="bg-primary/60 h-full animate-[progressBar_1.5s_ease-in-out_infinite] rounded-full"></div>
        </div>
      </div>

      <style>{`
        @keyframes progressBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

export default LoadingFallback;
