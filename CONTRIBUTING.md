# Contributing

Thank you for helping expand CodeTek's language coverage.

## Before opening a pull request

- Confirm that the upstream language package is compatible with CodeMirror 6.
- Record the exact upstream version and license.
- Add representative source files covering highlighting and common syntax.
- Keep generated assets deterministic and reviewable.
- Update `manifest.json` only when the corresponding asset is present.
- Do not commit credentials, private registry URLs, or unrelated application code.

## Release checklist

1. Build the pack from the documented upstream version.
2. Run the pack validation and checksum commands.
3. Review the generated manifest and attribution files.
4. Open a pull request with before/after editor examples.
5. Publish only from the protected release workflow.

The application must be able to reject an invalid or unavailable pack without losing the user's file contents.
