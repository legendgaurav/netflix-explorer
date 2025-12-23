import "../styles/skeleton.css"

export default function MovieSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-poster shimmer"></div>
      <div className="skeleton-text shimmer"></div>
      <div className="skeleton-text small shimmer"></div>
    </div>
  );
}
