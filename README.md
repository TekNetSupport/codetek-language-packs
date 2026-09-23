# CodeTek Language Packs

Official, versioned language support for the [CodeTek desktop workspace](https://github.com/TekNetSupport/CodeTek-Beta-V3).

This repository is the public distribution point for optional CodeMirror language packs. CodeTek can use it to add syntax highlighting, folding, indentation, bracket matching, and language-aware editor behavior without forcing every language into the base desktop download.

## Why this repository exists

CodeTek is designed to start quickly and remain useful offline. Core editor support is bundled with the application, while less common languages can be installed only when a workspace needs them. Every pack is published as an immutable release asset and described by a signed, hash-pinned manifest.

The result is a clear user-controlled flow:

1. CodeTek detects an unsupported file type.
2. CodeTek identifies the requested language pack and its release size.
3. The user approves the download, or enables trusted-pack downloads in Settings.
4. The native desktop host downloads the release asset over HTTPS.
5. CodeTek verifies the manifest, signature, checksum, and version.
6. The verified pack is cached locally and loaded by CodeMirror.

If a pack is unavailable, declined, or fails verification, CodeTek keeps the file usable as plain text.

## Pack catalog

| Language | Extension examples | Status |
| --- | --- | --- |
| JavaScript / TypeScript | `.js`, `.jsx`, `.ts`, `.tsx` | Bundled with CodeTek |
| JSON | `.json` | Bundled with CodeTek |
| Markdown | `.md`, `.markdown` | Bundled with CodeTek |
| CSS | `.css` | Bundled with CodeTek |
| Rust | `.rs` | Bundled with CodeTek |
| Python | `.py`, `.pyw` | Bundled with CodeTek |
| SQL | `.sql` | Bundled with CodeTek |
| HTML | `.html`, `.htm` | Bundled with CodeTek |
| XML / SVG | `.xml`, `.svg` | Bundled with CodeTek |
| YAML | `.yaml`, `.yml` | Available in v1.0.0 |
| Go | `.go` | Available in v1.0.0 |
| Java | `.java` | Available in v1.0.0 |
| C / C++ | `.c`, `.h`, `.cpp` | Available in v1.0.0 |

The catalog is intentionally conservative. A language is not listed as downloadable until its pack, license, checksum, and release metadata have been reviewed.

## Release format

Each release will contain a manifest and immutable pack assets:

```text
manifest.json
packs/<language>/<language>-<version>.js
```

The manifest records the language identifier, supported extensions, CodeMirror compatibility, asset URL, SHA-256 checksum, license, and release signature. CodeTek will reject assets that do not match the approved manifest.

## Security model

- Downloads use HTTPS and an allowlisted CodeTek release origin.
- Release manifests are versioned and hash-pinned.
- Pack assets are verified before they are cached or executed.
- The application never installs arbitrary npm packages at runtime.
- Declining a download never prevents a file from opening as plain text.
- Security reports should be sent privately according to [SECURITY.md](SECURITY.md).

## Licensing

Each pack retains the license of its upstream CodeMirror language package. Pack-specific notices and attribution are included with the release. CodeTek does not claim ownership of upstream grammars or parser technology.

## Development

Pack generation and validation tooling will live under `tools/`. Contributions should include:

- the upstream package and exact version;
- license and attribution information;
- a deterministic build recipe;
- a checksum and manifest entry;
- representative files for editor verification.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the release checklist.

## Related projects

- [CodeTek Beta](https://github.com/TekNetSupport/CodeTek-Beta-V3) — the desktop application.
- [CodeTek CEF](https://github.com/TekNetSupport/CodeTek.CEF) — the native CEF shell and integration work.

Built for a fast, respectful, and transparent developer workspace.
