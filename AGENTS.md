# Agent Guidelines

## Linting and Auto-fixing

When fixing lint errors, prefer using `bun run lint --write` to automatically fix trivial issues like import sorting and formatting, rather than manually editing files.

```bash
bun run lint --write
```

This command will automatically apply safe fixes for:
- Import organization (alphabetical sorting)
- Code formatting issues
- Other trivial lint errors

After running, verify the fixes with:

```bash
bun run lint
```
