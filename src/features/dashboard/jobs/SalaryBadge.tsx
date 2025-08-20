import Dollar from '@/assets/dashboard/jobs/dollar.svg';

export default function SalaryBadge({ salary }: { salary: string }) {
  return (
    <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10">
      <img
        className="w-4 h-4 mr-1.5"
        alt="Salary"
        src={Dollar}
        aria-hidden="true"
      />
      <span className="text-sm font-medium">{salary}</span>
    </div>
  );
}
