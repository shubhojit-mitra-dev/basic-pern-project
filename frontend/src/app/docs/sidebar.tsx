'use client';

type Heading = {
  level: number;
  text: string;
  id: string;
};

export default function Sidebar({ headings }: { headings: Heading[] }) {
  return (
    <div className="w-64 flex-none border-r border-purple-900/30 bg-purple-950/20 p-6 overflow-y-auto h-screen sticky top-0">
      <h2 className="font-bold text-xl mb-6 text-[hsl(280,100%,70%)]">Documentation</h2>
      <nav className="space-y-1">
        {headings.length > 0 ? (
          headings.map((heading, index) => (
            <a
              key={index}
              href={`#${heading.id}`}
              className={`
                block py-1 hover:text-[hsl(280,100%,70%)] transition-colors
                ${heading.level === 1 ? 'font-bold mt-4 text-[hsl(280,100%,70%)]' : ''}
                ${heading.level === 2 ? 'font-medium text-[hsl(280,100%,80%)]' : ''}
                ${heading.level === 3 ? 'text-sm pl-4 text-purple-200' : ''}
                ${heading.level === 4 ? 'text-sm pl-8 text-purple-300/80' : ''}
              `}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {heading.text}
            </a>
          ))
        ) : (
          <p className="text-purple-300">No headings found in the documentation</p>
        )}
      </nav>
    </div>
  );
}