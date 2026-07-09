import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { tryoutExams } from "@/data/tryouts";
import type { TryoutCategory } from "@/types/tryout";

const tryoutBenefits = [
  {
    icon: "fact_check",
    title: "Simulasi seperti ujian asli",
    description: "Latihan dengan alur CAT, batas waktu, navigasi soal, dan rekap hasil yang dekat dengan pengalaman seleksi.",
  },
  {
    icon: "analytics",
    title: "Evaluasi langsung setelah selesai",
    description: "Lihat skor, jumlah benar, salah, kosong, dan area yang perlu diperbaiki sebelum masuk latihan berikutnya.",
  },
  {
    icon: "target",
    title: "Materi sesuai target seleksi",
    description: "Pilih paket latihan untuk Akpol, TNI, sekolah kedinasan, CPNS, dan fokus kompetensi yang relevan.",
  },
];

const tryoutStats = [
  { value: "110+", label: "Soal per simulasi" },
  { value: "120", label: "Menit pengerjaan" },
  { value: "3", label: "Kompetensi utama" },
];

const categoryBadgeClasses: Record<TryoutCategory, string> = {
  akpol: "bg-primary/10 text-primary",
  tni: "bg-success-emerald/10 text-success-emerald",
  kedinasan: "bg-secondary/10 text-secondary",
  cpns: "bg-tertiary/10 text-tertiary",
};

export default function TryoutLandingPage() {
  return (
    <>
      <Header />
      <main className="bg-surface-cream text-on-surface">
        <section className="border-b border-outline-variant/60">
          <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-20 md:py-28 grid lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                Tryout CAT Online
              </div>
              <div className="space-y-5">
                <h1 className="font-display-xl text-[40px] md:text-[56px] leading-tight font-extrabold text-primary max-w-4xl">
                  Latihan tryout yang fokus pada kesiapan ujian, bukan sekadar kumpulan soal.
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                  Kerjakan simulasi terstruktur, ukur performa, lalu lanjutkan latihan dari data hasil pengerjaan Anda.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard/exams">
                  <button className="w-full sm:w-auto bg-primary text-on-primary px-8 py-4 rounded-lg font-body-md font-semibold hover:bg-primary-container transition-colors cursor-pointer flex items-center justify-center gap-2">
                    Lihat Tryout Tersedia
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </Link>
                <Link href="/programs">
                  <button className="w-full sm:w-auto border border-secondary text-secondary px-8 py-4 rounded-lg font-body-md font-semibold hover:bg-secondary/5 transition-colors cursor-pointer">
                    Bandingkan Program
                  </button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white border border-outline-variant rounded-xl p-6 md:p-8">
                <div className="flex items-center justify-between border-b border-outline-variant pb-5 mb-6">
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">
                      Preview Simulasi
                    </p>
                    <h2 className="font-headline-md text-xl font-bold text-on-surface">Grand Tryout Nasional</h2>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-3xl">quiz</span>
                </div>

                <div className="space-y-4">
                  {tryoutStats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between bg-surface-cream rounded-lg border border-outline-variant/60 px-4 py-3">
                      <span className="font-body-md text-on-surface-variant">{stat.label}</span>
                      <span className="font-headline-md text-xl font-bold text-primary">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-outline-variant">
                  <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant mb-2">
                    <span>Kesiapan simulasi</span>
                    <span>82%</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-variant overflow-hidden">
                    <div className="h-full w-[82%] rounded-full bg-secondary"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-20 border-t border-outline-variant/60">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface mb-3">
                Daftar tryout tersedia
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Lihat contoh simulasi yang bisa dikerjakan. Untuk mulai, lanjutkan ke dashboard agar progres dan hasil tersimpan di akun Anda.
              </p>
            </div>
            <Link href="/dashboard/exams">
              <button className="w-full md:w-auto border border-primary text-primary px-6 py-3 rounded-lg font-body-md font-semibold hover:bg-primary/5 transition-colors cursor-pointer">
                Buka My Exams
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {tryoutExams.map((exam) => (
              <article key={exam.id} className="bg-white border border-outline-variant rounded-xl p-6 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <span className={`font-label-sm text-label-sm uppercase px-2 py-1 rounded ${categoryBadgeClasses[exam.category]}`}>
                    {exam.categoryLabel}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    {exam.duration}
                  </span>
                </div>
                <h3 className="font-headline-md text-lg font-bold text-on-surface mb-2">{exam.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                  {exam.description}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/60">
                  <span className="flex items-center gap-1 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                    {exam.questions} soal
                  </span>
                  <Link href={`/tryout/${exam.id}/pengerjaan`} className="font-label-sm text-label-sm text-secondary font-semibold hover:underline">
                    Mulai simulasi
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-20">
          <div className="max-w-2xl mb-10">
            <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface mb-3">
              Dibuat untuk latihan yang terukur
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Halaman ini menjelaskan fitur tryout. Daftar tryout aktif tetap berada di dashboard agar konteks belajar dan progres user tidak tercampur dengan halaman publik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {tryoutBenefits.map((benefit) => (
              <article key={benefit.title} className="bg-white border border-outline-variant rounded-xl p-6">
                <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined">{benefit.icon}</span>
                </div>
                <h3 className="font-headline-md text-lg font-bold text-on-surface mb-2">{benefit.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{benefit.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
