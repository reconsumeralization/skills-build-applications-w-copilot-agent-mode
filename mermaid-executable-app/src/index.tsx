import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import MermaidRenderer from './components/MermaidRenderer';
import NodeExecutionPanel from './components/NodeExecutionPanel';

const defaultDiagram = `graph TD
A[Start] --> B[Do something]
B --> C[End]`;

const App = () => {
    const [diagram, setDiagram] = useState(defaultDiagram);
    const [selectedNode, setSelectedNode] = useState(null);
    const [executionResult, setExecutionResult] = useState(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Export diagram as .mmd file
    const handleExport = () => {
        const blob = new Blob([diagram], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'diagram.mmd';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Import diagram from .mmd file
    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            if (typeof event.target?.result === 'string') {
                setDiagram(event.target.result);
            }
        };
        reader.readAsText(file);
    };

    return (
        <div>
            <h1>Mermaid Copilot: Executable Diagrams</h1>
            <div style={{ marginBottom: 8 }}>
                <button onClick={handleExport} style={{ marginRight: 8 }}>Export .mmd</button>
                <button onClick={() => fileInputRef.current?.click()}>Import .mmd</button>
                <input
                    type="file"
                    accept=".mmd,text/plain"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImport}
                />
            </div>
            <textarea
                value={diagram}
                onChange={e => setDiagram(e.target.value)}
                rows={8}
                cols={60}
                style={{ fontFamily: 'monospace', marginBottom: 16 }}
            />
            <MermaidRenderer diagram={diagram} onNodeClick={(id, node) => {
                setSelectedNode(node);
                // Optionally handle node click globally
            }} />
            {selectedNode && (
                <NodeExecutionPanel node={selectedNode} result={executionResult} />
            )}
        </div>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<App />);
}