function LoadingFallback() {
  return (
    <div className="bg-neutral flex h-screen items-center justify-center">
      <div className="font-heading text-content flex items-center space-x-1 text-lg">
        <span>Loading</span>
        <span className="animate-bounce">.</span>
        <span className="animate-bounce [animation-delay:0.2s]">.</span>
        <span className="animate-bounce [animation-delay:0.4s]">.</span>
      </div>
    </div>
  );
}

export default LoadingFallback;
