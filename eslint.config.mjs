import globals from 'globals'

import {
  configs as standard
} from '@sequencemedia/eslint-config-standard'

import {
  configs as typescript
} from '@sequencemedia/eslint-config-typescript'

export default [
  {
    ...standard.recommended,
    files: [
      '**/*.{mjs,cjs,mts,cts}'
    ],
    ignores: [
      'test'
    ],
    languageOptions: {
      ...standard.recommended.languageOptions,
      globals: {
        ...globals.node
      }
    }
  },
  {
    ...standard.recommended,
    files: [
      'test/**/*.{mjs,cjs}'
    ],
    languageOptions: {
      ...standard.recommended.languageOptions,
      globals: {
        ...globals.mocha
      }
    }
  },
  {
    ...typescript.recommended,
    files: [
      '**/*.{mts,cts}'
    ],
    languageOptions: {
      ...typescript.recommended.languageOptions,
      globals: {
        ...globals.node,
        DupeTypes: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off'
    }
  }
]
