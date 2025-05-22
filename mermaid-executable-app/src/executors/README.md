# Executors

This directory contains code execution engines for different node types in the Mermaid Copilot platform.

- `NodeExecutor.ts`: Executes JavaScript code blocks from diagram nodes.
- `PythonExecutor.ts`: (Stub) Executes Python code, e.g., via backend or Pyodide.
- `CloudFunctionExecutor.ts`: (Stub) Executes cloud functions (AWS Lambda, GCF, etc.).

Extend these classes to support more languages and environments.
