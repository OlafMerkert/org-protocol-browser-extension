import { build, $ } from "bun";
import { generateManifest } from "./generate-manifest";

const isDev = process.env.NODE_ENV !== "production";
const browser = process.env.BROWSER || "firefox";

console.log(`Building for ${browser} (${isDev ? "development" : "production"})`);

const { version } = await Bun.file("./package.json").json();

// Clean dist directory
await Bun.write("./target/dist/.gitkeep", "");
const distDir = Bun.file("./target/dist");

try {
  await $`rm -rf ./target/dist/*`;
} catch (e) {
  console.log("target/dist already empty");
}

// Build all entry points
const entrypoints = [
  "./src/capturePopup.html", // React popup entry
  "./src/captureKeys.ts", // Background script (commands handler)
  "./src/jiraTasks.ts", // Content script (JIRA extraction)
  "./src/textSelection.ts", // Content script (text selection)
];

const results = await build({
  entrypoints,
  outdir: "./target/dist",
  splitting: false,
  minify: !isDev,
  sourcemap: isDev ? "linked" : "external",
  define: {
    "process.env.BROWSER": `"${browser}"`,
  },
  target: "browser",
  // CSS is handled natively by Bun
});

// Check for build errors
if (!results.success) {
  console.error("Build failed:");
  for (const error of results.logs) {
    console.error(error);
  }
  process.exit(1);
}

console.log(
  "Build outputs:",
  results.outputs.map((o) => o.path),
);

// Post-build steps
await generateManifest(browser as "firefox" | "chrome", results.outputs, version);
// copy icon
const icon = Bun.file("./icons/capture-org.png");
await Bun.write("./target/dist/icons/capture-org.png", icon);

console.log("Build complete!");
