# CMIP7 Dashboard

Vue 3 + TypeScript + Vite dashboard scaffold using the same frontend stack as `dwer-csi-streamer`.

## Data source

The dashboard resolves the default CMIP7 parquet source from `s3://gm-tas/gm_tas.pq` to the Pawsey Acacia HTTPS endpoint:

```text
https://projects.pawsey.org.au/gm-tas/gm_tas.pq
```

Override it with `VITE_CMIP7_PARQUET_SOURCE` if needed. `s3://` values are rewritten to the Pawsey endpoint; HTTPS values are used as-is.
Remote parquet files are registered with DuckDB over HTTP so the app can query schema metadata before reading rows.

## Commands

```sh
npm install
npm run dev
npm run build
npm run test
```
