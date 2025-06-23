import fs from 'fs/promises';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import Sidebar from './sidebar';
import Image from 'next/image';

// Function to extract headings from markdown content for sidebar
function extractHeadings(markdown: string) {
  const headings: { level: number; text: string; id: string }[] = [];
  const lines = markdown.split('\n');

  lines.forEach(line => {
    const h1Regex = /^# (.+)$/;
    const h2Regex = /^## (.+)$/;
    const h3Regex = /^### (.+)$/;
    const h4Regex = /^#### (.+)$/;
    
    let match: RegExpExecArray | null;
    
    if ((match = h1Regex.exec(line))) {
      const text = match[1]?.trim() ?? '';
      headings.push({ level: 1, text, id: text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') });
    } else if ((match = h2Regex.exec(line))) {
      const text = match[1]?.trim() ?? '';
      headings.push({ level: 2, text, id: text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') });
    } else if ((match = h3Regex.exec(line))) {
      const text = match[1]?.trim() ?? '';
      headings.push({ level: 3, text, id: text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') });
    } else if ((match = h4Regex.exec(line))) {
      const text = match[1]?.trim() ?? '';
      headings.push({ level: 4, text, id: text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') });
    }
  });

  return headings;
}

async function getReadmeContent() {
  try {
    // Try multiple possible locations for the README file
    const possiblePaths = [
      path.join(process.cwd(), './README.md'),      // Current directory
      path.join(process.cwd(), 'README.md'),        // Current directory (alternate)
    ];
    
    for (const readmePath of possiblePaths) {
      try {
        const content = await fs.readFile(readmePath, 'utf8');
        console.log('Found README at:', readmePath);
        return content;
      } catch (err) {
        // Continue to next path
      }
    }
    
    // If we get here, none of the paths worked
    throw new Error('README not found in any of the expected locations');
  } catch (error) {
    console.error('Error reading README file:', error);
    return `# Error loading documentation

Sorry, there was an error loading the documentation. The README.md file could not be found.

## Common Issues

- Ensure the README.md file exists in the project
- Check file permissions
- Make sure the path is correct`;
  }
}

export default async function DocsPage() {
  const readmeContent = await getReadmeContent();
  const headings = extractHeadings(readmeContent);

  return (
    <div className="relative min-h-screen">
      {/* Fixed gradient background div */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#2e026d] to-[#15162c] -z-10" />
      
      {/* Content that sits on top of the background */}
      <div className="relative z-10 flex min-h-screen text-white">
        {/* Client Component Sidebar */}
        <Sidebar headings={headings} />

        {/* Main content */}
        <div className="flex-1 p-8 overflow-y-auto max-w-4xl mx-auto">
          <article className="prose prose-invert max-w-none prose-headings:scroll-mt-20 prose-pre:bg-purple-950/30 prose-pre:border prose-pre:border-purple-800/30">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, [remarkToc, { tight: true }]]}
              rehypePlugins={[
                rehypeSlug, 
                [rehypeAutolinkHeadings, { 
                  behavior: 'wrap',
                  properties: {
                    className: ['anchor'],
                    ariaHidden: true,
                    tabIndex: -1
                  }
                }]
              ]}
              components={{
                h1: ({ node, children, ...props }) => {
                  const id = children ? String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') : '';
                  return <h1 id={id} className="text-4xl font-bold mb-8 mt-2 text-[hsl(280,100%,70%)]" {...props}>{children}</h1>;
                },
                h2: ({ node, children, ...props }) => {
                  const id = children ? String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') : '';
                  return <h2 id={id} className="text-3xl font-bold mt-12 mb-4 border-b pb-2 border-purple-800/50 text-[hsl(280,100%,70%)]" {...props}>{children}</h2>;
                },
                h3: ({ node, children, ...props }) => {
                  const id = children ? String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') : '';
                  return <h3 id={id} className="text-2xl font-semibold mt-8 mb-3 text-[hsl(280,100%,75%)]" {...props}>{children}</h3>;
                },
                h4: ({ node, children, ...props }) => {
                  const id = children ? String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') : '';
                  return <h4 id={id} className="text-xl font-medium mt-6 mb-2 text-[hsl(280,100%,80%)]" {...props}>{children}</h4>;
                },
                pre: ({ node, ...props }) => <pre className="p-4 rounded-lg overflow-x-auto text-sm my-4 bg-purple-950/30 border border-purple-800/30" {...props} />,
                code: ({ node, inline, className, children, ...props }: any) => 
                  inline 
                  ? <code className="bg-purple-950/40 px-1.5 py-0.5 rounded text-sm font-mono border border-purple-800/20" {...props}>{children}</code>
                  : <code className="block" {...props}>{children}</code>,
                a: ({ node, ...props }) => <a className="text-[hsl(280,100%,80%)] hover:text-[hsl(280,100%,90%)] underline-offset-2" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-4" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-4" {...props} />,
                li: ({ node, ...props }) => <li className="my-1" {...props} />,
                p: ({ node, ...props }) => <p className="my-4 leading-relaxed text-purple-100" {...props} />,
                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-purple-600/50 pl-4 italic my-4 text-purple-200" {...props} />,
                table: ({ node, ...props }) => <div className="overflow-x-auto my-6"><table className="min-w-full border-collapse border border-purple-800/30" {...props} /></div>,
                th: ({ node, ...props }) => <th className="px-4 py-2 bg-purple-950/40 font-medium border border-purple-800/30" {...props} />,
                td: ({ node, ...props }) => <td className="px-4 py-2 border border-purple-800/30" {...props} />,
                img: ({ node, ...props }) => <img loading='lazy' alt={props.alt || 'image'} className="rounded-lg max-w-full h-auto" {...props} />,
              }}
            >
              {readmeContent}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}