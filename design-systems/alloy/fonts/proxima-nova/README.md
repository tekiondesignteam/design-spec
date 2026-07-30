# fonts / proxima-nova

Drop the **Proxima Nova** font files here. The build discovers whatever is present — no config change needed — and generates `@font-face` rules into `tokens/dist/fonts.css`.

## File naming → how weight/style is inferred

The build reads **weight** and **style** from each file name (case-insensitive), so name files with a weight keyword and, for italics, `italic` or `it`:

| Keyword in file name | `font-weight` |
| -------------------- | ------------- |
| `thin`               | 100 |
| `extralight` / `extra-light` | 200 |
| `light`              | 300 |
| `regular` / `normal` / `book` | 400 |
| `medium`             | 500 |
| `semibold` / `semi-bold` | 600 |
| `bold`               | 700 |
| `extrabold` / `ultrabold` | 800 |
| `black` / `heavy`    | 900 |

Add `italic` (or `-it`) to the name for the italic face (e.g. `…-Medium-It.otf`).

**Expected set** (matches the source library — `.otf`, or provide `.woff2`/`.woff`/`.ttf`):

```
Proxima-Nova-Light.otf          Proxima-Nova-Light-Italic.otf
Proxima-Nova-Regular.otf        Proxima-Nova-Regular-Italic.otf
Proxima-Nova-Medium.otf         Proxima-Nova-Medium-It.otf
Proxima-Nova-Semibold.otf       Proxima-Nova-Semibold-Italic.otf
```

After placing the files, run `npm run build` — `tokens/dist/fonts.css` will contain one `@font-face` per file.
