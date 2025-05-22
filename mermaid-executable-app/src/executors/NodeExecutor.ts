import PythonExecutor from './PythonExecutor';
import CloudFunctionExecutor from './CloudFunctionExecutor';

class NodeExecutor {
    executeNode(node: any): any {
        // Validate the node before execution
        if (!this.validateNode(node)) {
            throw new Error("Invalid node for execution");
        }

        // Determine node type for execution
        if (node.nodeType === 'PythonNode') {
            const pythonExecutor = new PythonExecutor();
            return pythonExecutor.execute(node.code, node.input);
        }
        if (node.nodeType === 'CloudFunctionNode') {
            const cloudExecutor = new CloudFunctionExecutor();
            return cloudExecutor.execute(node.functionId, node.input);
        }

        // Default: JS code execution
        const code = node.code;
        return this.runCode(code);
    }

    runCode(code: string): any {
        try {
            // Use a safe execution environment to run the code
            // This is a placeholder for actual code execution logic
            const result = eval(code); // Caution: eval can be dangerous if not handled properly
            return result;
        } catch (error) {
            console.error("Error executing code:", error);
            throw new Error("Code execution failed");
        }
    }

    validateNode(node: any): boolean {
        // Implement validation logic for the node
        // For example, check if the node has the required properties
        return node && typeof node.code === 'string';
    }
}

export default NodeExecutor;