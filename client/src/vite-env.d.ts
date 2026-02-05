/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Global React types
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}