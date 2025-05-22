import React from 'react';

interface NodeExecutionPanelProps {
    node: any;
    result: any;
}

const NodeExecutionPanel: React.FC<NodeExecutionPanelProps> = ({ node, result }) => (
    <div style={{ marginTop: 16, padding: 12, background: '#eef', borderRadius: 4, border: '1px solid #99f' }}>
        <strong>Node:</strong> {node.label || node.id}<br />
        <pre style={{ fontSize: 13 }}>{JSON.stringify(node, null, 2)}</pre>
        <strong>Execution Result:</strong>
        <pre style={{ fontSize: 13 }}>{result ? JSON.stringify(result, null, 2) : 'Running...'}</pre>
    </div>
);

export default NodeExecutionPanel;
