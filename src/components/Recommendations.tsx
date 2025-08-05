export default function Recommendations({ suggestions }: { suggestions: string }) {
  return (
    <div className="prose max-w-none mt-6" dangerouslySetInnerHTML={{ __html: suggestions }} />
  );
}
