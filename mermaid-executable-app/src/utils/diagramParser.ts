import { DiagramNodeMeta, DiagramEdge, ParsedDiagram } from '../../types/types';
import { parseNodeMetadata } from './parseNodeMetadata';

export function parseDiagram(diagram: string): ParsedDiagram {
    const lines = diagram.split('\n');
    const nodesMap: Record<string, DiagramNodeMeta> = {};
    const edges: DiagramEdge[] = [];

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('graph') || trimmedLine === '') {
            continue;
        }

        // Match edges: nodeA --> nodeB
        const edgeMatch = trimmedLine.match(/^(\w+)\s*-->\s*(\w+)/);
        if (edgeMatch) {
            const from = edgeMatch[1];
            const to = edgeMatch[2];

            // Ensure both nodes exist in the map
            if (!nodesMap[from]) {
                // Try to extract label and metadata from a previous node definition
                nodesMap[from] = {
                    id: from,
                    label: from,
                    nodeType: 'GenericNode',
                    ...parseNodeMetadata(from)
                };
            }
            if (!nodesMap[to]) {
                nodesMap[to] = {
                    id: to,
                    label: to,
                    nodeType: 'GenericNode',
                    ...parseNodeMetadata(to)
                };
            }

            edges.push({ from, to });
            continue;
        }

        // Match node with label and metadata: nodeA["User Service" %% nodeType:PythonNode, style:fill:#f8d7da, code:print(123)]
        const nodeMatch = trimmedLine.match(/^(\w+)\s*\["?([^\]]+)"?\]/);
        if (nodeMatch) {
            const id = nodeMatch[1];
            const label = nodeMatch[2];
            const meta = parseNodeMetadata(label);
            nodesMap[id] = {
                id,
                label: label.split('%%')[0].trim(),
                nodeType: meta.nodeType || 'GenericNode',
                ...meta
            };
            continue;
        }
    }

    const nodes = Object.values(nodesMap);
    return { nodes, edges };
}

export function validateDiagram(diagram: string): boolean {
    const lines = diagram.split('\n');
    const validEdgePattern = /^\s*(\w+)\s*-->\s*(\w+)\s*$/;
    const validNodePattern = /^\s*(\w+)\s*\["?([^\]]+)"?\]/;

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (
            trimmedLine &&
            !validEdgePattern.test(trimmedLine) &&
            !validNodePattern.test(trimmedLine) &&
            !trimmedLine.startsWith('graph')
        ) {
            return false;
        }
    }
    return true;
}