# CYVE

## Figma Design Export

This project includes scripts to pull design specs and assets from the CYVE Figma wireframe using the Figma REST API.

### Setup

1. **Create `.env`** (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. **Add your Figma token** to `.env`:
   - Generate a Personal Access Token at [Figma Settings → Personal Access Tokens](https://www.figma.com/settings)
   - Ensure the token has the `file_content:read` scope
   - Set `FIGMA_ACCESS_TOKEN=your_token_here` in `.env`

3. **Install dependencies**:
   ```bash
   npm install
   ```

### Commands

| Command | Description |
|---------|-------------|
| `npm run figma:export` | Fetches the design and exports structure, colors, typography, and layout specs to `design-specs/` |
| `npm run figma:images` | Exports rendered PNG images of design nodes to `design-specs/images/` |

### Output

- **`design-specs/cyve-design-spec.json`** – Full design spec including:
  - Node structure (IDs, names, types)
  - Color palette (hex values + where they’re used)
  - Typography (font family, size, weight, line height, etc.)
  - Layout data (positions, dimensions, padding)

- **`design-specs/design-tokens.css`** – CSS variables derived from the design

- **`design-specs/images/`** – Rendered images of design nodes (from `figma:images`)

### Figma File

- **File**: [CYVE Wireframe](https://www.figma.com/design/8ky6MAbD5F8TpcRhhxN6ul/CYVE-Wireframe)
- **Default node**: `23-2` (from the original link). Edit `FIGMA_FILE_KEY` and `FIGMA_NODE_ID` in the scripts to target different frames.

---

## Website

The site is built in plain HTML/CSS and follows the Figma design specs.

**To view:** Open `index.html` in your browser.
