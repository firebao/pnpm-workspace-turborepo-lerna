import { defineConfig } from 'eslint/config'
import eslint from '@eslint/js'
import tsEslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default defineConfig([
  eslint.configs.recommended,
  tsEslint.configs.recommended,
	prettierConfig,
  {
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    files: ['**/*.js'],
    plugins: {
      js: eslint,
			prettier: prettierPlugin,
    },
    rules: {},
      ignores: ['node_modules', 'packages/**/*', 'dist/**', 'eslint.config.js']
    },
])
