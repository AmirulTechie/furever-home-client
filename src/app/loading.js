const Loading = () => {
  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-center gap-6 px-4">

      {/* animated paw spinner */}
      <div className="relative w-20 h-20">

        {/* spinning ring */}
        <svg
          className="absolute inset-0 w-full h-full animate-spin"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ animationDuration: "1.2s" }}
        >
          <circle
            cx="40" cy="40" r="34"
            stroke="#EF9F27"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="60 150"
          />
        </svg>

        {/* paw icon in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 60 60" className="w-9 h-9 fill-amber-400" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="14" r="7"/>
            <circle cx="42" cy="14" r="7"/>
            <circle cx="9"  cy="28" r="5.5"/>
            <circle cx="51" cy="28" r="5.5"/>
            <path d="M30 52 C16 52 10 40 13 30 C16 22 22 20 30 20 C38 20 44 22 47 30 C50 40 44 52 30 52Z"/>
          </svg>
        </div>
      </div>

      {/* text */}
      <div className="text-center">
        <p className="text-neutral-700 font-semibold text-base">Finding your companions...</p>
        <p className="text-neutral-400 text-sm mt-1">This will only take a moment</p>
      </div>

      {/* skeleton card row — gives context that content is loading */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden border border-neutral-100 animate-pulse">
            <div className="h-36 bg-neutral-100" />
            <div className="p-4 space-y-2.5">
              <div className="h-3.5 bg-neutral-100 rounded w-2/3" />
              <div className="h-3 bg-neutral-100 rounded w-1/2" />
              <div className="h-8 bg-neutral-100 rounded-xl mt-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;