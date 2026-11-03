import {readdir,readFile,writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
// Packaging is performed with Python's standard-library ZIP writer; no user data included.
const script=`from pathlib import Path\nimport zipfile\np=Path('public/extension')\nwith zipfile.ZipFile('public/orbit-extension.zip','w',zipfile.ZIP_DEFLATED) as z:\n for f in sorted(p.iterdir()):\n  if f.is_file(): z.write(f,f.name)\n`;
const python=process.env.ORBIT_PYTHON||'python3';execFileSync(python,['-c',script],{stdio:'inherit'});
