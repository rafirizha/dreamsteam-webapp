import DashboardLayout from "@/components/DashboardLayout";
import ExamCatalog from "@/features/tryout/ExamCatalog";

export default function DashboardExamsPage() {
  return (
    <DashboardLayout activeTab="exams" title="My Exams">
      <div className="dashboard-page-shell">
        <div>
          <h1 className="font-display-xl text-[32px] md:text-[40px] font-bold text-on-surface mb-4">
            Available Tryouts
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Prepare for your future with our comprehensive simulation exams. Select a category and begin your practice.
          </p>
        </div>

        <ExamCatalog />
      </div>
    </DashboardLayout>
  );
}
