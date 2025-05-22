"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const MermaidRenderer_1 = __importDefault(require("./components/MermaidRenderer"));
const sampleDiagram = `graph TD\nA[Start] --> B[Do something]\nB --> C[End]`;
const App = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Mermaid Executable Application"),
        react_1.default.createElement(MermaidRenderer_1.default, { diagram: sampleDiagram })));
};
const root = client_1.default.createRoot(document.getElementById('root'));
root.render(react_1.default.createElement(App, null));
