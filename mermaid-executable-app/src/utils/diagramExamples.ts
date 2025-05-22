// diagramExamples.ts
// Example Mermaid diagrams with metadata for testing advanced features

export const pythonNodeDiagram = `graph TD
A["Python Node %% nodeType:PythonNode, style:fill:#f8d7da, code:print('Hello from Python!')"]
A --> B["Cloud Node %% nodeType:CloudFunctionNode, style:fill:#d1ecf1, functionId:my-cloud-fn"]
B --> C["JS Node %% nodeType:GenericNode, style:fill:#cce5ff, code:console.log('JS!')"]
`;

export const styledDiagram = `graph TD
X["Success Node %% style:fill:#d4edda;stroke:#155724;stroke-width:2px;"]
Y["Warning Node %% style:fill:#fff3cd;stroke:#856404;stroke-width:2px;"]
Z["Error Node %% style:fill:#f8d7da;stroke:#721c24;stroke-width:2px;"]
`;
