export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="text-4xl animate-bounce">🐾</div>
        <p className="text-slate-500">Loading...</p>
      </div>
    </div>
  );
}
