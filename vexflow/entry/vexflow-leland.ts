// [VexFlow](https://vexflow.com) - Copyright (c) Mohit Muthanna 2010.
// MIT License
//
// vexflow-gonville.ts is the entry point for vexflow-gonville.js.
// This version bundles the Gonville music engraving font.

import { Flow } from '../src/flow';
import { loadCustom } from '../src/fonts/load_custom';
import { loadLeland } from '../src/fonts/load_leland';
import { loadTextFonts } from '../src/fonts/textfonts';

loadLeland();
loadCustom();
Flow.setMusicFont('Leland', 'Custom');
loadTextFonts();

// Re-export all exports from index.ts.
export * from '../src/index';
// Also collect all exports into a default export for CJS projects.
export * as default from '../src/index';
