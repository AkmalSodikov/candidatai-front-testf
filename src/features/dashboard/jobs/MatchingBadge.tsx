import Match from '@/assets/dashboard/jobs/match.svg';

export default function MatchingBadge({ match }: { match: string }) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <img
        className="w-4 h-4"
        alt="Match percentage"
        src={Match}
        aria-hidden="true"
      />
      <span className="text-sm font-semibold text-secondary-foreground">
        {match}% match
      </span>
    </div>
  );
}
