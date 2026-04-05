interface Manifest {
  manifest_version: number;
  name: string;
  version: string;
  description: string;
  author: string;
  permissions: string[];
  action: {
    default_popup: string;
    default_title: string;
    default_icon: Record<string, string>;
  };
  background: {
    scripts: string[];
    type: string;
  };
  content_scripts: Array<{
    matches: string[];
    js: string[];
    run_at: string;
  }>;
  commands: Record<string, { suggested_key: Record<string, string>; description: string }>;
  icons: Record<string, string>;
  browser_specific_settings?: {
    gecko: {
      id: string;
      strict_min_version: string;
      data_collection_permissions: { required: string[]; optional: string[] };
    };
  };
  minimum_chrome_version?: string;
}

const BROWSER_CONFIGS: Record<"firefox" | "chrome", Partial<Manifest>> = {
  firefox: {
    browser_specific_settings: {
      gecko: {
        id: "{c53e484f-cf8d-4da3-a33f-4f69674f6b1b}",
        strict_min_version: "112.0",
        data_collection_permissions: {
          required: ["websiteContent"],
          optional: [],
        },
      },
    },
  },
  chrome: {
    minimum_chrome_version: "88",
  },
};

export async function generateManifest(
  browser: "firefox" | "chrome",
  outputs: Bun.BuildArtifact[],
  version: string,
): Promise<void> {
  // Find script names from build outputs
  const findScript = (name: string): string => {
    const pattern = new RegExp(`/${name}\\.[a-f0-9]+\\.js$`);
    const match = outputs.find((o) => pattern.test(o.path));
    return match?.path.replace("./target/dist/", "") || `${name}.js`;
  };

  const backgroundScript = findScript("captureKeys");
  const jiraScript = findScript("jiraTasks");
  const textSelectionScript = findScript("textSelection");

  const manifest: Manifest = {
    manifest_version: 3,
    name: "Org Protocol Browser Extension",
    version,
    description: "Trigger org-capture from the browser via org-protocol.",
    author: "Olaf Merkert",
    icons: {
      "38": "icons/capture-org.png",
    },
    permissions: ["activeTab", "tabs", "clipboardWrite"],
    action: {
      default_icon: { "38": "icons/capture-org.png" },
      default_title: "Org Protocol",
      default_popup: "capturePopup.html",
    },
    background: {
      scripts: [backgroundScript],
      type: "module",
    },
    content_scripts: [
      {
        matches: ["https://*/*"],
        js: [jiraScript, textSelectionScript],
        run_at: "document_end",
      },
    ],
    commands: {
      "automatic-capture": {
        suggested_key: { default: "Alt+C" },
        description: "Automatic capture",
      },
      "store-link": {
        suggested_key: { default: "Alt+L" },
        description: "Store link",
      },
    },
  };

  // Add browser-specific settings
  Object.assign(manifest, BROWSER_CONFIGS[browser]);

  await Bun.write("./target/dist/manifest.json", JSON.stringify(manifest, null, 2));
  console.log(`Generated manifest.json for ${browser}`);
}
