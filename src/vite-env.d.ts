/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CMIP7_PARQUET_FILE_NAME?: string;
  readonly VITE_CMIP7_PARQUET_SOURCE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __GIT_COMMIT_SHA__: string;
declare const __BUILD_TIME__: string;
