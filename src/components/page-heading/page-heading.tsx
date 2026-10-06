interface PageHeadingProps {
  title: string;
  description?: string;
}

// Shared page title block — every list page uses this
export function PageHeading({ title, description }: PageHeadingProps) {
  return (
    <div className="page-heading">
      <h1 className="page-heading-title">{title}</h1>
      {description && <p className="page-heading-description">{description}</p>}
    </div>
  );
}
