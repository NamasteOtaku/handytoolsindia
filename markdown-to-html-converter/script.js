document.addEventListener('DOMContentLoaded', () => {
    const markdownInput = document.getElementById('markdown-input');
    const htmlOutput = document.getElementById('html-output');
    const copyButton = document.getElementById('copy-btn');
    
    // Simple Markdown parser (lightweight alternative to libraries)
    function parseMarkdown(md) {
        return md
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/(#{1,6})\s(.*)/g, (_, hashes, text) => 
                `<h${hashes.length}>${text}</h${hashes.length}>`)
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/~~(.*?)~~/g, '<del>$1</del>')
            .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
            .replace(/^- (.*)/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
            .replace(/\n/g, '<br>');
    }

    function updateOutput() {
        htmlOutput.textContent = parseMarkdown(markdownInput.value);
    }

    markdownInput.addEventListener('input', () => {
        requestAnimationFrame(updateOutput);
    });

    copyButton.addEventListener('click', () => {
        const text = htmlOutput.textContent;
        navigator.clipboard.writeText(text)
            .then(() => {
                copyButton.textContent = 'Copied!';
                copyButton.classList.add('copied');
                setTimeout(() => {
                    copyButton.textContent = 'Copy HTML';
                    copyButton.classList.remove('copied');
                }, 2000);
            })
            .catch(err => {
                console.error('Copy failed:', err);
                copyButton.textContent = 'Error!';
                setTimeout(() => {
                    copyButton.textContent = 'Copy HTML';
                }, 2000);
            });
    });

    // Initialize with example
    markdownInput.value = `# Welcome to Markdown Converter
## Convert text to HTML instantly

**Features:**
- Client-side processing
- Real-time conversion
- Zero data tracking

\`\`\`html
<!-- Example code -->
<div class="container">Content</div>
\`\`\``;
    
    updateOutput();
});