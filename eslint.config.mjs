import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', '.venv/**', 'api/**', 'tests/**']),
  {
    // Vendored React Bits components: kept close to upstream so they're easy to update.
    files: ['src/components/reactbits/**'],
    linterOptions: { reportUnusedDisableDirectives: 'off' },
    rules: {
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]);

export default eslintConfig;
