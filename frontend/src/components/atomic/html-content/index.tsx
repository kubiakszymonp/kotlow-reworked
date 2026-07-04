interface HtmlContentProps {
  content?: string;
}

export default function HtmlContent({ content }: HtmlContentProps) {
  if (!content) {
    return null;
  }

  return (
    <div
      className="prose-parish mx-auto max-w-3xl"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
