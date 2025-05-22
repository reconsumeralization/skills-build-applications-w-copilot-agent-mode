"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDiagram = parseDiagram;
exports.validateDiagram = validateDiagram;
function parseDiagram(diagram) {
    const lines = diagram.split('\n');
    const nodesMap = {};
    const edges = [];
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
                nodesMap[from] = {
                    id: from,
                    label: from,
                    nodeType: 'GenericNode', // Default, can be extended with metadata parsing
                };
            }
            if (!nodesMap[to]) {
                nodesMap[to] = {
                    id: to,
                    label: to,
                    nodeType: 'GenericNode',
                };
            }
            edges.push({ from, to });
            continue;
        }
        // Optionally, parse node metadata from comments or special syntax here
        // Example: nodeA["User Service"] %% nodeType: AuthService, serviceId: auth-service
        // (Extend here as needed)
    }
    const nodes = Object.values(nodesMap);
    return { nodes, edges };
}
function validateDiagram(diagram) {
    const lines = diagram.split('\n');
    const validEdgePattern = /^\s*(\w+)\s*-->\s*(\w+)\s*$/;
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine &&
            !validEdgePattern.test(trimmedLine) &&
            !trimmedLine.startsWith('graph')) {
            return false;
        }
    }
    return true;
}
