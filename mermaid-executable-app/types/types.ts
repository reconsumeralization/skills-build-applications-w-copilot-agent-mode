/**
 * Types for mermaid-executable-app
 * These types bridge the gap between Mermaid diagrams and executable software components.
 */

// Represents metadata for a node in the Mermaid diagram
export interface DiagramNodeMeta {
    id: string; // Unique node identifier (e.g., nodeA)
    label: string; // Display label (e.g., "User Service")
    nodeType: string; // Type of node (e.g., "AuthService", "KafkaProducerNode")
    serviceId?: string; // Maps to a real service/module (e.g., "auth-service")
    operation?: string; // Optional: operation or method to invoke
    [key: string]: any; // Additional metadata for extensibility
}

// Represents an edge/connection between nodes
export interface DiagramEdge {
    from: string; // Source node id
    to: string;   // Target node id
    label?: string; // Optional: label for the connection (e.g., "calls", "publishes")
    [key: string]: any;
}

// Parsed representation of a Mermaid diagram
export interface ParsedDiagram {
    nodes: DiagramNodeMeta[];
    edges: DiagramEdge[];
}

// Node execution context (passed to node call functions)
export interface NodeExecutionContext {
    input: any; // Input data for the node
    config: Record<string, any>; // Node configuration (from UI or diagram metadata)
    services?: Record<string, any>; // Service registry or discovery map
    [key: string]: any;
}

// Standardized node call function signature
export type NodeCallFunction = (
    context: NodeExecutionContext
) => Promise<any>;

// Node template definition (for registration/discovery)
export interface NodeTemplate {
    nodeType: string;
    displayName: string;
    description?: string;
    call: NodeCallFunction;
    // Optionally, a React component for configuration UI
    // component?: React.ComponentType<any>;
}