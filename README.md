# ai-agents-architecture

A declarative architecture diagram generator that produces professional SVG
diagrams from YAML specifications.

## Architecture

The project follows a compiler-style pipeline:

```text
Specification
  → Architecture Model
  → Layout Model
  → Scene Graph
  → Renderer
  → SVG
```

Pipeline stages transform immutable data and remain independent of Node.js.
Only the CLI and filesystem adapters may use platform-specific APIs.

## Development

This project requires Node.js 22 or newer and pnpm.

```sh
pnpm install
pnpm check
pnpm build
```

## License

[MIT](LICENSE)
