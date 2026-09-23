import { build } from 'esbuild';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/(\w):/, '$1:');
const entries = {
  yaml: { packageName: '@codemirror/lang-yaml', exportName: 'yaml', extensions: ['.yaml', '.yml'] },
  go: { packageName: '@codemirror/lang-go', exportName: 'go', extensions: ['.go'] },
  java: { packageName: '@codemirror/lang-java', exportName: 'java', extensions: ['.java'] },
  cpp: { packageName: '@codemirror/lang-cpp', exportName: 'cpp', extensions: ['.c', '.h', '.cpp', '.cc', '.cxx'] },
  php: { packageName: '@codemirror/lang-php', exportName: 'php', extensions: ['.php'] }
};

await mkdir(path.join(root, 'packs'), { recursive: true });
const packs = [];
for (const [language, entry] of Object.entries(entries)) {
  const source = `import { ${entry.exportName} } from '${entry.packageName}';\nexport { ${entry.exportName} };\n`;
  const result = await build({
    stdin: { contents: source, resolveDir: root, sourcefile: `${language}.ts`, loader: 'js' },
    bundle: true,
    format: 'esm',
    platform: 'browser',
    target: 'es2022',
    minify: true,
    write: false,
    legalComments: 'none'
  });
  const asset = Buffer.from(result.outputFiles[0].contents);
  const version = '1.0.0';
  const fileName = `${language}-${version}.js`;
  await writeFile(path.join(root, 'packs', fileName), asset);
  packs.push({
    id: language,
    version,
    extensions: entry.extensions,
    asset: `https://github.com/TekNetSupport/codetek-language-packs/releases/download/v1.0.0/${fileName}`,
    sha256: createHash('sha256').update(asset).digest('hex'),
    license: 'MIT',
    upstream: entry.packageName
  });
}

await writeFile(path.join(root, 'manifest.json'), `${JSON.stringify({ schemaVersion: 1, registry: 'CodeTek Language Packs', registryVersion: '1.0.0', packs }, null, 2)}\n`);
