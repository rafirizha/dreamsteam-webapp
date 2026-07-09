import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function Programs() {
  return (
    <>
      <Header />
      <main className="min-h-screen pb-20">
        {/* Hero Section */}
        <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-block px-3 py-1 bg-secondary-fixed text-on-secondary-container rounded-full font-label-sm text-label-sm uppercase tracking-wider mb-4">
              Paket Pembelajaran
            </div>
            <h1 className="font-display-xl text-[40px] md:text-[64px] font-extrabold leading-tight text-primary">
              Pilih Jalur Suksesmu
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Kami hadir sebagai partner terbaik untuk membantumu lolos berbagai seleksi penting seperti tes Polri, TNI, PNS, dan instansi lainnya. Dengan metode belajar yang efektif dan pendampingan mentor berpengalaman.
            </p>
          </div>
        </section>

        {/* Programs Bento Grid */}
        <section className="py-12 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Package: Polri (Featured/Large) */}
            <div className="md:col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col md:flex-row group transition-all duration-300 hover:shadow-[0_8px_30px_rgba(128,0,0,0.08)]">
              <div className="md:w-1/2 relative min-h-[300px]">
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10 group-hover:bg-transparent transition-colors"></div>
                <ImagePlaceholder label="Placeholder Program Polri" />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-outline-variant bg-white relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-headline-lg text-headline-lg font-bold text-2xl md:text-3xl text-primary">Tes Masuk Polri</h3>
                    <span className="bg-primary-fixed text-on-primary-fixed px-2 py-1 rounded font-label-sm text-label-sm uppercase">Terpopuler</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                    Bimbel intensif khusus untuk persiapan tes masuk Taruna Polri. Dilengkapi dengan simulasi tes CAT, latihan fisik terstruktur, dan pendampingan psikotes komprehensif.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start text-body-md text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary mr-2 text-[20px]">check_circle</span>
                      <span>Simulasi Ujian CAT Terupdate</span>
                    </li>
                    <li className="flex items-start text-body-md text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary mr-2 text-[20px]">check_circle</span>
                      <span>Pendampingan Psikotes Intensif</span>
                    </li>
                    <li className="flex items-start text-body-md text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary mr-2 text-[20px]">check_circle</span>
                      <span>Mentor Lulusan Akademi Kepolisian</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-surface-variant">
                  <div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">Mulai dari</span>
                    <span className="font-headline-md text-headline-md font-bold text-xl">Rp 3.500.000</span>
                  </div>
                  <Link href="/tryout" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-sm text-label-sm hover:bg-primary-container transition-colors shadow-sm flex items-center">
                    Daftar Sekarang <span className="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Package: TNI */}
            <div className="md:col-span-6 lg:col-span-4 bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-[0_8px_30px_rgba(128,0,0,0.08)] relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
              <div className="h-48 relative overflow-hidden bg-surface-dim">
                <ImagePlaceholder label="Placeholder Program TNI" />
              </div>
              <div className="p-6 flex flex-col flex-grow bg-white">
                <h3 className="font-headline-md text-headline-md font-bold text-xl text-on-surface mb-2">Tes Masuk TNI</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
                  Bimbel terpadu untuk persiapan tes masuk TNI (AD, AL, AU). Fokus pada akademik, kesamaptaan jasmani, dan mental ideologi.
                </p>
                <ul className="space-y-2 mb-6 border-y border-surface-variant py-4">
                  <li className="flex items-center text-body-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary mr-2 text-[18px]">check</span>
                    Pembinaan Kesamaptaan
                  </li>
                  <li className="flex items-center text-body-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary mr-2 text-[18px]">check</span>
                    Latihan Soal Akademik
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="font-headline-md text-headline-md font-bold text-xl text-on-surface">Rp 3.200.000</span>
                  <Link href="/tryout" className="border border-secondary text-secondary px-4 py-2 rounded-lg font-label-sm text-label-sm hover:bg-secondary-fixed transition-colors">
                    Detail
                  </Link>
                </div>
              </div>
            </div>

            {/* Package: Kedinasan */}
            <div className="md:col-span-6 lg:col-span-6 bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col sm:flex-row group transition-all duration-300 hover:shadow-[0_8px_30px_rgba(128,0,0,0.08)] relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-tertiary"></div>
              <div className="sm:w-2/5 relative min-h-[200px] bg-surface-dim">
                <ImagePlaceholder label="Placeholder Kedinasan" />
              </div>
              <div className="sm:w-3/5 p-6 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="font-headline-md text-headline-md font-bold text-xl text-on-surface mb-2">Tes Masuk Kedinasan</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                    Persiapan matang untuk STAN, IPDN, STIS, dan sekolah kedinasan lainnya dengan fokus TKD &amp; TKB.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-headline-md text-headline-md font-bold text-xl text-on-surface">Rp 2.800.000</span>
                  <Link href="/tryout" className="border border-tertiary text-tertiary px-4 py-2 rounded-lg font-label-sm text-label-sm hover:bg-tertiary-fixed transition-colors">
                    Detail
                  </Link>
                </div>
              </div>
            </div>

            {/* Package: CPNS */}
            <div className="md:col-span-6 lg:col-span-6 bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col sm:flex-row group transition-all duration-300 hover:shadow-[0_8px_30px_rgba(128,0,0,0.08)] relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-on-surface"></div>
              <div className="sm:w-2/5 relative min-h-[200px] bg-surface-dim">
                <ImagePlaceholder label="Placeholder CPNS" />
              </div>
              <div className="sm:w-3/5 p-6 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="font-headline-md text-headline-md font-bold text-xl text-on-surface mb-2">Tes Masuk CPNS</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                    Taklukkan SKD dan SKB CPNS dengan ribuan bank soal terupdate dan sistem simulasi CAT mirip aslinya.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-headline-md text-headline-md font-bold text-xl text-on-surface">Rp 1.500.000</span>
                  <Link href="/tryout" className="border border-on-surface text-on-surface px-4 py-2 rounded-lg font-label-sm text-label-sm hover:bg-surface-variant transition-colors">
                    Detail
                  </Link>
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
