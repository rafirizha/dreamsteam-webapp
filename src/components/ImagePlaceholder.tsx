type ImagePlaceholderProps = {
  label: string;
  className?: string;
};

export default function ImagePlaceholder({ label, className = "" }: ImagePlaceholderProps) {
  return (
    <div
      className={`flex h-full min-h-[180px] w-full items-center justify-center bg-surface-container text-on-surface-variant ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <span className="material-symbols-outlined text-[40px] text-outline">image</span>
        <span className="font-label-sm text-label-sm uppercase tracking-wide">{label}</span>
      </div>
    </div>
  );
}
