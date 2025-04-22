export function LoadingCircle({
  show,
  className,
}: {
  show: boolean;
  className: string;
}) {
  if (show) {
    return (
      <div className={className}>
        <div className="border-t-lavender-pinocchio border-dark h-5 w-5 animate-spin rounded-full border-3" />
      </div>
    );
  }
}
