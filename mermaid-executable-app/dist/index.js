"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const MermaidRenderer_1 = __importDefault(require("./components/MermaidRenderer"));
const App = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Mermaid Executable Application"),
        react_1.default.createElement(MermaidRenderer_1.default, null)));
};
react_dom_1.default.render(react_1.default.createElement(App, null), document.getElementById('root'));
