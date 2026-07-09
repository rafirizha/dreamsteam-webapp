import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-14 md:py-20 overflow-hidden bg-surface-cream">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(87,0,0,0.08),_rgba(0,97,164,0.06))]" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-cream via-surface-cream/80 to-transparent"></div>
          </div>
          <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop relative z-10 grid md:grid-cols-12 gap-8 md:gap-gutter items-center">
            <div className="md:col-span-7 space-y-5 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-sm font-label-sm">
                <span className="material-symbols-outlined text-[16px]">stars</span>
                No. 1 Indonesia
              </div>
              <h1 className="font-display-xl text-[40px] md:text-[64px] leading-tight font-extrabold text-primary">
                Achieve Your Potential with <br />
                <span className="text-secondary">Dreams Team</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                Lolos seleksi Polri, TNI, Kedinasan, CPNS, atau UTBK bukan soal keberuntungan—perlu strategi, latihan, dan bimbingan yang tepat sejak awal!
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
                <Link href="/tryout">
                  <button className="bg-primary text-on-primary px-8 py-4 rounded-lg font-headline-md font-bold hover-lift shadow-lg shadow-primary/20 flex items-center gap-2 cursor-pointer">
                    GABUNG SEKARANG
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </Link>
                <Link href="/programs">
                  <button className="border-2 border-secondary text-secondary px-8 py-4 rounded-lg font-headline-md font-bold hover:bg-secondary-fixed transition-colors flex items-center gap-2 cursor-pointer">
                    PAKET BIMBEL
                  </button>
                </Link>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 border-t border-outline-variant/30">
                <div>
                  <p className="font-headline-md text-headline-md text-primary font-bold text-2xl md:text-3xl">10k+</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">Alumni</p>
                </div>
                <div>
                  <p className="font-headline-md text-headline-md text-primary font-bold text-2xl md:text-3xl">500+</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">Video Materi</p>
                </div>
                <div>
                  <p className="font-headline-md text-headline-md text-primary font-bold text-2xl md:text-3xl">1M+</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">Soal Try Out</p>
                </div>
              </div>
            </div>
            <div className="hidden md:block md:col-span-5 relative">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden glass-card p-2">
                <ImagePlaceholder label="Placeholder Prestasi Siswa" className="rounded-xl" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-xl flex items-center gap-4 shadow-lg">
                <div className="bg-success-emerald/10 p-3 rounded-full">
                  <span className="material-symbols-outlined text-success-emerald" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Success Rate</p>
                  <p className="font-headline-md text-headline-md text-on-background font-bold text-xl">98.5%</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
