"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

interface Transaction {
  id: string;
  date: string;
  packageName: string;
  amount: string;
  status: "Lunas" | "Tertunda" | "Gagal";
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  color: string;
}

function getProfileValue(key: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  return localStorage.getItem(key) || fallback;
}

export default function ProfileDashboard() {
  // Active sub-tab state: "biodata" | "keamanan" | "langganan" | "pencapaian"
  const [activeSubTab, setActiveSubTab] = useState<"biodata" | "keamanan" | "langganan" | "pencapaian">("biodata");

  // Profile fields state
  const [name, setName] = useState(() => getProfileValue("profile_name", "Calon Taruna"));
  const [email, setEmail] = useState(() => getProfileValue("profile_email", "calon.taruna@dreamsteam.id"));
  const [phone, setPhone] = useState(() => getProfileValue("profile_phone", "+62 812-3456-7890"));
  const [school, setSchool] = useState(() => getProfileValue("profile_school", "SMA Negeri 1 Jakarta"));
  const [target, setTarget] = useState(() => getProfileValue("profile_target", "POLRI"));
  const [targetYear, setTargetYear] = useState(() => getProfileValue("profile_target_year", "2026"));

  // Password fields state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Toast status state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // Display toast helper
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Save profile changes handler
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast("Nama lengkap tidak boleh kosong!", "error");
      return;
    }

    localStorage.setItem("profile_name", name);
    localStorage.setItem("profile_email", email);
    localStorage.setItem("profile_phone", phone);
    localStorage.setItem("profile_school", school);
    localStorage.setItem("profile_target", target);
    localStorage.setItem("profile_target_year", targetYear);

    // Dispatch event to update Layout Header dynamically
    window.dispatchEvent(new Event("profileUpdated"));

    showToast("Profil berhasil diperbarui!");
  };

  // Change password handler
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      showToast("Semua bidang password harus diisi!", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("Konfirmasi password baru tidak cocok!", "error");
      return;
    }
    if (newPassword.length < 6) {
      showToast("Password baru minimal terdiri dari 6 karakter!", "error");
      return;
    }

    // Success simulation
    showToast("Password berhasil diperbarui!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Mock billing history
  const transactions: Transaction[] = [
    {
      id: "INV/20260601/DS/8972",
      date: "01 Juni 2026",
      packageName: "Dreams Team Premium Max - 6 Bulan",
      amount: "Rp 750.000",
      status: "Lunas",
    },
    {
      id: "INV/20251201/DS/4311",
      date: "01 Desember 2025",
      packageName: "Dreams Team Starter Pack - 1 Bulan",
      amount: "Rp 149.000",
      status: "Lunas",
    },
  ];

  // Mock Achievements
  const achievements: Achievement[] = [
    {
      id: "1",
      title: "Taruna Mula",
      description: "Menyelesaikan tryout pertama Anda.",
      icon: "rocket_launch",
      unlocked: true,
      color: "bg-secondary text-on-secondary",
    },
    {
      id: "2",
      title: "Pejuang Konsisten",
      description: "Menyelesaikan tryout selama 3 minggu berturut-turut.",
      icon: "calendar_month",
      unlocked: true,
      color: "bg-success-emerald text-white",
    },
    {
      id: "3",
      title: "Nilai Sempurna",
      description: "Mendapatkan nilai di atas 90 pada salah satu materi SKD.",
      icon: "emoji_events",
      unlocked: true,
      color: "bg-warning-amber text-white",
    },
    {
      id: "4",
      title: "Kutu Buku",
      description: "Meluangkan lebih dari 100 jam untuk belajar di platform.",
      icon: "local_library",
      unlocked: false,
      color: "bg-surface-variant text-on-surface-variant",
    },
  ];

  // Calculate profile completion percentage
  const calculateCompletion = () => {
    let completedFields = 0;
    const totalFields = 6;
    if (name.trim()) completedFields++;
    if (email.trim()) completedFields++;
    if (phone.trim()) completedFields++;
    if (school.trim()) completedFields++;
    if (target) completedFields++;
    if (targetYear) completedFields++;
    return Math.round((completedFields / totalFields) * 100);
  };

  const completionPercent = calculateCompletion();

  return (
    <DashboardLayout activeTab="profile" title="Profil Saya">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 animate-fade-in">
          <div className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg border ${
            toastType === "success" 
              ? "bg-white border-success-emerald text-on-surface" 
              : "bg-white border-error text-on-surface"
          }`}>
            <span className={`material-symbols-outlined ${
              toastType === "success" ? "text-success-emerald" : "text-error"
            }`}>
              {toastType === "success" ? "check_circle" : "error"}
            </span>
            <span className="font-body-md font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="dashboard-page-shell">
        {/* Main profile banner card */}
        <section className="bg-white rounded-xl border border-outline-variant p-5 md:p-6 shadow-sm flex flex-col md:flex-row gap-5 md:gap-6 items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-primary"></div>
          <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
            {/* Initial Avatar */}
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-3xl border border-outline-variant shadow-inner relative group">
              {name.split(" ").map(n => n[0]).filter(Boolean).join("").substring(0, 2).toUpperCase() || "CT"}
              <div className="absolute inset-0 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <span className="material-symbols-outlined text-white text-xl">photo_camera</span>
              </div>
            </div>
            <div className="text-center md:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h1 className="font-headline-md text-2xl font-bold text-on-surface">{name}</h1>
                <span className="px-2.5 py-0.5 bg-primary-container text-on-primary-container font-label-sm text-[11px] rounded-full uppercase tracking-wider font-semibold">
                  Premium
                </span>
              </div>
              <p className="font-body-md text-on-surface-variant">{email}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-label-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-secondary">gps_fixed</span>
                <span>Target: {target} ({targetYear})</span>
              </div>
            </div>
          </div>

          {/* Profile Completion Bar */}
          <div className="w-full md:w-80 space-y-2 bg-surface-cream p-4 rounded-xl border border-outline-variant/50">
            <div className="flex justify-between items-center font-label-sm text-xs">
              <span className="text-on-surface-variant font-medium">Kelengkapan Profil</span>
              <span className="text-primary font-bold">{completionPercent}%</span>
            </div>
            <div className="w-full bg-surface-container-high rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${completionPercent}%` }}
              ></div>
            </div>
            <p className="font-body-sm text-[10px] text-on-surface-variant">
              Lengkapi profil Anda untuk rekomendasi bimbel yang lebih akurat.
            </p>
          </div>
        </section>

        {/* Tab Switching controls */}
        <section className="border-b border-outline-variant flex flex-nowrap overflow-x-auto gap-2 pb-px scrollbar-none">
          <button
            onClick={() => setActiveSubTab("biodata")}
            className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === "biodata"
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline-variant"
            }`}
          >
            <span className="material-symbols-outlined text-lg">badge</span>
            Biodata Diri
          </button>
          <button
            onClick={() => setActiveSubTab("keamanan")}
            className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === "keamanan"
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline-variant"
            }`}
          >
            <span className="material-symbols-outlined text-lg">lock_open</span>
            Keamanan
          </button>
          <button
            onClick={() => setActiveSubTab("langganan")}
            className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === "langganan"
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline-variant"
            }`}
          >
            <span className="material-symbols-outlined text-lg">workspace_premium</span>
            Langganan & Riwayat
          </button>
          <button
            onClick={() => setActiveSubTab("pencapaian")}
            className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === "pencapaian"
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline-variant"
            }`}
          >
            <span className="material-symbols-outlined text-lg">military_tech</span>
            Pencapaian
          </button>
        </section>

        {/* Tab Contents */}
        <section className="bg-white rounded-xl border border-outline-variant p-5 md:p-6 shadow-sm">
          {/* TAB 1: BIODATA */}
          {activeSubTab === "biodata" && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="border-b border-outline-variant/30 pb-4 mb-4">
                <h3 className="font-headline-md text-lg font-bold text-on-surface">Informasi Pribadi</h3>
                <p className="font-body-md text-sm text-on-surface-variant">Perbarui detail identitas diri Anda di sini.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm font-semibold text-on-surface">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-cream border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-on-surface">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-cream border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="nama@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-semibold text-on-surface">
                    Nomor Telepon / WhatsApp
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-cream border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="+62 8xx-xxxx-xxxx"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="school" className="block text-sm font-semibold text-on-surface">
                    Asal Sekolah / Institusi
                  </label>
                  <input
                    type="text"
                    id="school"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-cream border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="SMA/SMK/Universitas Asal"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="targetAcademy" className="block text-sm font-semibold text-on-surface">
                    Target Akademi / Institusi
                  </label>
                  <select
                    id="targetAcademy"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-cream border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <option value="POLRI">POLRI (Akpol / Bintara)</option>
                    <option value="TNI">TNI (Akmil / AAU / AAL)</option>
                    <option value="STAN">STAN (PKN STAN)</option>
                    <option value="IPDN">IPDN</option>
                    <option value="CPNS">CPNS / PPPK</option>
                    <option value="UTBK">UTBK SNBT</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="targetYear" className="block text-sm font-semibold text-on-surface">
                    Tahun Kelulusan Target
                  </label>
                  <select
                    id="targetYear"
                    value={targetYear}
                    onChange={(e) => setTargetYear(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-cream border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/30 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-on-primary font-semibold rounded-lg hover:bg-primary-container shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: KEAMANAN */}
          {activeSubTab === "keamanan" && (
            <form onSubmit={handleChangePassword} className="space-y-6">
              <div className="border-b border-outline-variant/30 pb-4 mb-4">
                <h3 className="font-headline-md text-lg font-bold text-on-surface">Keamanan Akun</h3>
                <p className="font-body-md text-sm text-on-surface-variant">Ganti password Anda secara berkala untuk menjaga keamanan akun.</p>
              </div>

              <div className="space-y-4 max-w-lg">
                <div className="space-y-2">
                  <label htmlFor="oldPass" className="block text-sm font-semibold text-on-surface">
                    Password Lama
                  </label>
                  <input
                    type="password"
                    id="oldPass"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-cream border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="newPass" className="block text-sm font-semibold text-on-surface">
                    Password Baru
                  </label>
                  <input
                    type="password"
                    id="newPass"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-cream border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Minimal 6 karakter"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPass" className="block text-sm font-semibold text-on-surface">
                    Konfirmasi Password Baru
                  </label>
                  <input
                    type="password"
                    id="confirmPass"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-cream border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Ulangi password baru"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/30 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-on-primary font-semibold rounded-lg hover:bg-primary-container shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  Perbarui Password
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: LANGGANAN & TRANSAKSI */}
          {activeSubTab === "langganan" && (
            <div className="space-y-8">
              <div className="border-b border-outline-variant/30 pb-4">
                <h3 className="font-headline-md text-lg font-bold text-on-surface">Paket Langganan</h3>
                <p className="font-body-md text-sm text-on-surface-variant">Kelola keanggotaan aktif dan lihat riwayat tagihan Anda.</p>
              </div>

              {/* Active Plan Premium Banner */}
              <div className="bg-gradient-to-r from-primary to-primary-container text-on-primary p-5 md:p-6 rounded-xl relative overflow-hidden border border-outline-variant/20">
                <div className="relative z-10 grid md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-4">
                    <span className="inline-block px-3 py-1 bg-warning-amber text-on-surface font-label-sm text-xs rounded-full uppercase tracking-wider font-bold shadow">
                      PAKET AKTIF
                    </span>
                    <h4 className="font-display-xl text-2xl md:text-3xl font-extrabold">Dreams Team Premium Max</h4>
                    <p className="font-body-md text-sm opacity-90">
                      Anda memiliki akses penuh ke seluruh simulasi CAT SKD/TPA, ratusan video pembahasan, dan sesi konsultasi prioritas.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary-fixed-dim pt-2">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      <span>Masa berlaku hingga 12 Oktober 2026 (Sisa 3 Bulan lagi)</span>
                    </div>
                  </div>
                  <div className="md:col-span-4 flex justify-start md:justify-end">
                    <button className="px-6 py-3 bg-white text-primary font-bold rounded-lg hover:bg-surface-cream transition-colors shadow hover:scale-[1.02] duration-300 cursor-pointer">
                      Perpanjang Paket
                    </button>
                  </div>
                </div>
                {/* Decorative absolute icon */}
                <span className="material-symbols-outlined absolute -bottom-10 -right-10 text-9xl text-white opacity-10 select-none">
                  workspace_premium
                </span>
              </div>

              {/* Transactions list */}
              <div className="space-y-4">
                <h4 className="font-headline-md text-md font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">receipt_long</span>
                  Riwayat Pembayaran
                </h4>

                <div className="border border-outline-variant rounded-xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse font-body-md text-sm">
                      <thead>
                        <tr className="bg-surface-cream border-b border-outline-variant text-on-surface-variant font-semibold">
                          <th className="p-4">No. Invoice</th>
                          <th className="p-4">Tanggal Pembayaran</th>
                          <th className="p-4">Paket Program</th>
                          <th className="p-4">Nominal</th>
                          <th className="p-4 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/35 text-on-surface">
                        {transactions.map((tx) => (
                          <tr key={tx.id} className="hover:bg-surface-cream/50 transition-colors">
                            <td className="p-4 font-mono font-medium text-xs text-secondary">{tx.id}</td>
                            <td className="p-4">{tx.date}</td>
                            <td className="p-4 font-medium">{tx.packageName}</td>
                            <td className="p-4 font-semibold">{tx.amount}</td>
                            <td className="p-4">
                              <div className="flex justify-center">
                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                                  tx.status === "Lunas" 
                                    ? "bg-success-emerald/10 text-success-emerald" 
                                    : tx.status === "Tertunda" 
                                    ? "bg-warning-amber/10 text-warning-amber" 
                                    : "bg-error/10 text-error"
                                }`}>
                                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                  {tx.status}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PENCAPAIAN */}
          {activeSubTab === "pencapaian" && (
            <div className="space-y-8">
              <div className="border-b border-outline-variant/30 pb-4">
                <h3 className="font-headline-md text-lg font-bold text-on-surface">Pencapaian & Statistik</h3>
                <p className="font-body-md text-sm text-on-surface-variant">Lacak perkembangan latihan dan lencana yang berhasil Anda kumpulkan.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
                <div className="bg-surface-cream rounded-xl p-5 border border-outline-variant/60 flex items-center gap-4 shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">schedule</span>
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-on-surface-variant font-label-sm font-semibold">Total Waktu Belajar</span>
                    <span className="text-xl font-bold text-on-surface">142 Jam</span>
                  </div>
                </div>

                <div className="bg-surface-cream rounded-xl p-5 border border-outline-variant/60 flex items-center gap-4 shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">task_alt</span>
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-on-surface-variant font-label-sm font-semibold">Tryout Diikuti</span>
                    <span className="text-xl font-bold text-on-surface">12 Sesi</span>
                  </div>
                </div>

                <div className="bg-surface-cream rounded-xl p-5 border border-outline-variant/60 flex items-center gap-4 shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-success-emerald/10 text-success-emerald flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">insights</span>
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-on-surface-variant font-label-sm font-semibold">Rata-rata Nilai</span>
                    <span className="text-xl font-bold text-on-surface">85 / 100</span>
                  </div>
                </div>
              </div>

              {/* Badges Section */}
              <div className="space-y-4">
                <h4 className="font-headline-md text-md font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-warning-amber" style={{ fontVariationSettings: "'FILL' 1" }}>
                    military_tech
                  </span>
                  Lencana Pencapaian
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {achievements.map((badge) => (
                    <div 
                      key={badge.id} 
                      className={`border rounded-xl p-5 flex flex-col justify-between h-48 shadow-sm transition-all duration-300 relative ${
                        badge.unlocked 
                          ? "bg-white border-outline-variant hover:shadow-md" 
                          : "bg-surface-cream/50 border-outline-variant/40 opacity-60"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${badge.color}`}>
                          <span className="material-symbols-outlined text-xl">{badge.icon}</span>
                        </div>
                        <div>
                          <h5 className="font-headline-md text-sm font-bold text-on-surface">{badge.title}</h5>
                          <p className="font-body-sm text-[11px] text-on-surface-variant mt-1 leading-relaxed">{badge.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 font-semibold text-[10px] mt-2">
                        {badge.unlocked ? (
                          <span className="text-success-emerald flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                            Tercapai
                          </span>
                        ) : (
                          <span className="text-on-surface-variant flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">lock</span>
                            Terkunci
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
