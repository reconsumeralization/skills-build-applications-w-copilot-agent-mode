// parseNodeMetadata.ts
// Utility to extract node metadata (e.g., style, code, type) from Mermaid diagram comments or syntax

export function parseNodeMetadata(label: string): Record<string, any> {
    // Example: label = 'User Service %% nodeType:PythonNode, style:fill:#f8d7da, code:print(123)'
    const meta: Record<string, any> = {};
    const parts = label.split('%%');
    if (parts.length > 1) {
        const metaStr = parts[1];
        metaStr.split(',').forEach(pair => {
            const [k, v] = pair.split(':').map(s => s.trim());
            if (k && v) meta[k] = v;
        });
    }
    return meta;
}
