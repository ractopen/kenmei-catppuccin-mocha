# Contributing to Kenmei Catppuccin Mocha

Contributions and improvements are welcome. Please follow these guidelines:

## Development Workflow

1. Fork the repository and clone your fork locally.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Source files are located under `src/`:
   - `src/styles/`: Modular CSS sheets (tokens, layout, controls, cards, overlays).
   - `src/injector.js`: Style element insertion logic.
   - `src/observer.js`: DOM observer keeping dark mode synchronized.
   - `src/index.js`: Runtime entry coordinator.
4. Run the build script to generate the combined root userscript:
   ```bash
   node build.js
   ```
5. Test the compiled `kenmei-catppuccin-mocha.user.js` in your userscript manager against [kenmei.co](https://www.kenmei.co).

## Pull Request Guidelines

- Ensure `node build.js` succeeds without errors before submitting.
- Avoid committing extraneous files, editor configs, or unnecessary dependencies.
- Keep commits focused and provide clear commit messages describing changes.
- Adhere to the zero generic emoji policy across commits and documentation.
