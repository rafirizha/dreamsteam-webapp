import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function About() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-14 md:py-20 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/10 via-surface to-surface"></div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-gutter items-center">
            <div className="md:col-span-7 space-y-5">
              <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary font-label-sm text-label-sm rounded-full uppercase tracking-wider">
                About Dreams Team
              </span>
              <h1 className="font-display-xl text-[40px] md:text-[64px] leading-tight font-extrabold text-on-surface">
                Shaping <span className="text-primary">Excellence</span>,
                <br />
                Building Futures.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                Dreams Team (Kelas Bimbel) is the premier online tutoring platform in Indonesia. We provide the strategic guidance, rigorous training, and professional mentorship necessary to conquer highly competitive selections like Polri, TNI, Kedinasan, CPNS, and UTBK.
              </p>
            </div>
            <div className="md:col-span-5 relative mt-4 md:mt-0">
              <div className="rounded-xl overflow-hidden shadow-lg border border-outline-variant relative">
                <ImagePlaceholder label="Placeholder Mentor" className="aspect-square md:aspect-[4/5]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="font-label-sm text-label-sm uppercase tracking-widest opacity-80 mb-1">Our Strength</p>
                  <p className="font-headline-md text-headline-md font-bold text-xl md:text-2xl">Professional Mentors</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Bento Grid */}
        <section className="py-14 md:py-16 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto bg-surface-cream rounded-xl border border-outline-variant/30">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mb-4">Our Core Purpose</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
              More than just a tutoring center, we are a strategic partner in your journey to securing a prestigious career.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-gutter">
            {/* Vision Card */}
            <div className="md:col-span-8 bg-white p-8 rounded-xl border border-outline-variant/50 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    visibility
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md font-bold text-xl md:text-2xl text-on-surface mb-3">Our Vision</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    To be the undisputed No. 1 online tutoring platform in Indonesia, recognized for transforming ambition into tangible success. We aim to empower Indonesia&apos;s youth with the knowledge, precision, and confidence required to excel in the most demanding national selection processes.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-outline-variant/20 flex gap-8">
                <div>
                  <p className="font-headline-lg text-headline-lg text-primary font-bold text-2xl md:text-3xl">No.1</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">In Indonesia</p>
                </div>
                <div>
                  <p className="font-headline-lg text-headline-lg text-secondary font-bold text-2xl md:text-3xl">CAT</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">Simulations</p>
                </div>
              </div>
            </div>
            {/* Mission Image Card */}
            <div className="md:col-span-4 rounded-xl overflow-hidden shadow-sm relative h-full min-h-[300px]">
              <ImagePlaceholder label="Placeholder Lingkungan Belajar" />
            </div>
            {/* Mission Points */}
            <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-gutter">
              <div className="bg-white p-6 rounded-xl border border-outline-variant/50 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                <span className="material-symbols-outlined text-secondary text-4xl mb-4">school</span>
                <h4 className="font-headline-md text-headline-md font-bold text-lg text-on-surface mb-2">Expert Guidance</h4>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                  Providing intensive, end-to-end mentorship from industry professionals tailored for specific institutional exams.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-outline-variant/50 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                <span className="material-symbols-outlined text-secondary text-4xl mb-4">update</span>
                <h4 className="font-headline-md text-headline-md font-bold text-lg text-on-surface mb-2">Current Curriculum</h4>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                  Continuously updating our Try Out questions and modules to reflect the latest official test standards and predictions.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-outline-variant/50 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                <span className="material-symbols-outlined text-secondary text-4xl mb-4">psychology</span>
                <h4 className="font-headline-md text-headline-md font-bold text-lg text-on-surface mb-2">Strategic Precision</h4>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                  Training knowledge, accuracy, and speed through advanced Computer Assisted Test (CAT) simulations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us & Track Record */}
        <section className="py-14 md:py-16 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mb-6">
                Why Choose <br />
                <span className="text-primary">Kelas Bimbel?</span>
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                Passing the selection for Polri, TNI, Kedinasan, or CPNS is not about luck—it requires strategy, practice, and the right guidance from the start. We address the common pitfalls of poor preparation and limited information.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-success-emerald mt-1">check_circle</span>
                  <div>
                    <h4 className="font-body-md font-semibold text-on-surface">Intensive Accompaniment</h4>
                    <p className="font-body-md text-on-surface-variant text-sm">Comprehensive guidance from the beginning to the end of the selection process.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-success-emerald mt-1">check_circle</span>
                  <div>
                    <h4 className="font-body-md font-semibold text-on-surface">Flexible Learning Time</h4>
                    <p className="font-body-md text-on-surface-variant text-sm">Study systems adaptable to daily schedules for maximum productivity.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-success-emerald mt-1">check_circle</span>
                  <div>
                    <h4 className="font-body-md font-semibold text-on-surface">Complete Problem Discussion</h4>
                    <p className="font-body-md text-on-surface-variant text-sm">Detailed explanations ensuring true understanding of concepts, not just memorization.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-success-emerald mt-1">check_circle</span>
                  <div>
                    <h4 className="font-body-md font-semibold text-on-surface">Tips &amp; Tricks for Passing</h4>
                    <p className="font-body-md text-on-surface-variant text-sm">Equipped with accurate strategies and secrets to increase your chances of success.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative mt-4 md:mt-0">
              <div className="absolute inset-0 bg-secondary/5 rounded-xl transform translate-x-3 translate-y-3"></div>
              <div className="bg-white p-6 md:p-8 rounded-xl border border-outline-variant/30 relative z-10">
                <h3 className="font-headline-md text-headline-md font-bold text-xl text-center mb-8 border-b border-outline-variant/20 pb-4">
                  Our Track Record
                </h3>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <p className="font-display-xl text-primary font-extrabold text-3xl md:text-4xl mb-2">98<span className="text-2xl">%</span></p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Success Rate</p>
                  </div>
                  <div>
                    <p className="font-display-xl text-secondary font-extrabold text-3xl md:text-4xl mb-2">50<span className="text-2xl">+</span></p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Expert Mentors</p>
                  </div>
                  <div>
                    <p className="font-display-xl text-on-surface font-extrabold text-3xl md:text-4xl mb-2">1k<span className="text-2xl">+</span></p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Active Students</p>
                  </div>
                  <div>
                    <p className="font-display-xl text-on-surface font-extrabold text-3xl md:text-4xl mb-2">24<span className="text-2xl">/7</span></p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Consultation</p>
                  </div>
                </div>
                <div className="mt-10 text-center">
                  <Link href="/tryout" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-on-primary font-label-sm text-label-sm rounded-lg hover:bg-primary/90 transition-colors w-full shadow-md">
                    Join Now
                    <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
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
