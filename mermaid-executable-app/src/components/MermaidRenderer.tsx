import React, { useEffect, useRef, useState } from 'react';
import { validateDiagram, parseDiagram } from '../utils/diagramParser';
import NodeExecutor from '../executors/NodeExecutor';

interface MermaidRendererProps {
    diagram: string;
    onNodeClick?: (nodeId: string, nodeMeta?: any) => void;
}

const MermaidRenderer: React.FC<MermaidRendererProps> = ({ diagram, onNodeClick }) => {
    const mermaidRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [parsed, setParsed] = useState<any>(null);
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const [executionResult, setExecutionResult] = useState<any>(null);

    useEffect(() => {
        // Validate diagram before rendering
        if (!validateDiagram(diagram)) {
            setError('Diagram syntax is invalid. Please check your Mermaid code.');
            setParsed(null);
            return;
        }
        setError(null);
        setParsed(parseDiagram(diagram));
        let isMounted = true;
        // Dynamically import mermaid to avoid ESM/CJS issues
        import('mermaid').then((mermaid) => {
            // Initialize mermaid with a theme and error handling
            mermaid.default.initialize({
                startOnLoad: false,
                theme: 'default',
                securityLevel: 'loose', // Allow inline SVG events for interactivity
            });
            if (mermaidRef.current && isMounted) {
                mermaid.default.render('mermaidDiagram', diagram)
                    .then(({ svg }) => {
                        if (mermaidRef.current && isMounted) {
                            mermaidRef.current.innerHTML = svg;
                            // Add custom styling and click listeners to nodes
                            if (parsed) {
                                const svgRoot = mermaidRef.current.querySelector('svg');
                                if (svgRoot) {
                                    parsed.nodes.forEach((node: any) => {
                                        const nodeElem = svgRoot.querySelector(`#${node.id}`);
                                        if (nodeElem) {
                                            // Custom styling from node metadata
                                            const style = (node.style || '');
                                            if (style) {
                                                (nodeElem as HTMLElement).setAttribute('style', style);
                                            }
                                            (nodeElem as HTMLElement).style.cursor = 'pointer';
                                            nodeElem.addEventListener('click', () => {
                                                setSelectedNode(node);
                                                setExecutionResult(null);
                                                if (onNodeClick) onNodeClick(node.id, node);
                                            });
                                        }
                                    });
                                }
                            }
                        }
                    })
                    .catch((err) => {
                        if (mermaidRef.current && isMounted) {
                            mermaidRef.current.innerHTML = `<pre style='color:red'>Mermaid render error:\n${err.message}</pre>`;
                        }
                    });
            }
        });
        return () => { isMounted = false; };
    }, [diagram, onNodeClick, parsed]);

    // Node execution logic (demo: async call to NodeExecutor if available)
    useEffect(() => {
        async function executeNode(node: any) {
            if (!node) return;
            try {
                // Use NodeExecutor instance for execution
                const executor = new NodeExecutor();
                const result = await executor.executeNode(node);
                setExecutionResult(result);
            } catch (err: any) {
                setExecutionResult('Execution error: ' + err.message);
            }
        }
        if (selectedNode) {
            executeNode(selectedNode);
        }
    }, [selectedNode]);

    if (error) {
        return <div style={{ color: 'red', background: '#fff0f0', border: '1px solid #fbb', padding: 12, borderRadius: 4 }}>{error}</div>;
    }
    return (
        <div>
            <div ref={mermaidRef} style={{ minHeight: 120, background: '#f9f9f9', border: '1px solid #ddd', borderRadius: 4, padding: 8 }} />
            {selectedNode && (
                <div style={{ marginTop: 16, padding: 12, background: '#eef', borderRadius: 4, border: '1px solid #99f' }}>
                    <strong>Node:</strong> {selectedNode.label || selectedNode.id}<br />
                    <pre style={{ fontSize: 13 }}>{JSON.stringify(selectedNode, null, 2)}</pre>
                    <strong>Execution Result:</strong>
                    <pre style={{ fontSize: 13 }}>{executionResult ? JSON.stringify(executionResult, null, 2) : 'Running...'}</pre>
                </div>
            )}
        </div>
    );
};

export default MermaidRenderer;