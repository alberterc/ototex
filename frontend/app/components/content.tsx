export function Content({
  title,
  description,
  body,
}: {
  title: string;
  description: string;
  body: React.ReactNode;
}) {
  return (
    <>
      <header className="p-5">
        <h2>{title}</h2>
        <h3 className="mt-1">{description}</h3>
      </header>
      <hr className="bg-dark h-0.5 border-0" />
      <main className="p-5">{body}</main>
    </>
  );
}
