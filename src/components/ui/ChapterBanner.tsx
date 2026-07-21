import "./ChapterBanner.css";

export default function ChapterBanner({
  coupleName,
  tagline,
  chapterTitle,
  chapterSubtitle,
}: {
  coupleName: string;
  tagline?: string;
  chapterTitle: string;
  chapterSubtitle?: string;
}) {
  return (
    <section className="chapter-banner">
      <div className="chapter-banner-glow" aria-hidden />
      <div className="chapter-banner-content">
        <span className="chapter-banner-eyebrow">Save atual</span>
        <h1 className="chapter-banner-name">{coupleName}</h1>
        {tagline && <p className="chapter-banner-tagline">{tagline}</p>}
        <div className="chapter-banner-chapter">
          <span aria-hidden>📖</span>
          <div>
            <strong>{chapterTitle}</strong>
            {chapterSubtitle && <span>{chapterSubtitle}</span>}
          </div>
        </div>
      </div>
      <div className="chapter-banner-decor" aria-hidden>
        <span className="cb-blob cb-blob-1" />
        <span className="cb-blob cb-blob-2" />
        <span className="cb-blob cb-blob-3" />
      </div>
    </section>
  );
}
