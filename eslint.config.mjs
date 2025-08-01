import js from '@eslint/js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintPluginPrettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Ignore folders
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      // Shadcn UI components
      'src/shared/components/ui/**',
    ],
  },

  // JavaScript base rules
  js.configs.recommended,

  // Next.js rules
  ...compat.extends('next/core-web-vitals'),

  // TypeScript rules
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {
      ...ts.configs.recommended.rules,
      ...ts.configs['recommended-type-checked'].rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // Prettier — disable conflicting rules
  {
    files: ['**/*.ts', '**/*.js', '**/*.tsx', '**/*.jsx'],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': ['error', {
        semi: false,
        singleQuote: true,
      }],
    },
  },

  ...compat.extends('prettier'),

  // Optional: common override
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    rules: {
      'no-console': 'warn',
      quotes: ['warn', 'single'],
    },
  },
];

export default eslintConfig;
