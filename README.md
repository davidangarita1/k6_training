# k6 Training

Performance tests for the [QuickPizza](https://quickpizza.grafana.com/) demo API by Grafana Labs.

## Requirements

Install k6: https://grafana.com/docs/k6/latest/get-started/installation/

## Project Structure

```
k6_training/
├── tests/
│   ├── example.js      # Basic single-VU script
│   ├── load-test.js    # Ramps up to 10 VUs with custom metrics
│   └── stress-test.js  # Spikes to 50 VUs to find limits
├── utils/
│   └── helpers.js      # Shared URL, headers, request helpers
└── .env.example        # Environment variable reference
```

## Environment Variables

| Variable    | Default                          | Description          |
| ----------- | -------------------------------- | -------------------- |
| `BASE_URL`  | `https://quickpizza.grafana.com` | Target API base URL  |
| `API_TOKEN` | `abcdef0123456789`               | QuickPizza API token |

```bash
k6 run --env BASE_URL=https://quickpizza.grafana.com tests/load-test.js
```

## Running Tests

```bash
# Example
k6 run tests/example.js

# Load test
k6 run tests/load-test.js

# Stress test
k6 run tests/stress-test.js
```

Or use the package.json scripts:

```bash
pnpm test:example
pnpm test:load
pnpm test:stress
```

## Common CLI Flags

| Flag           | Description                     | Example                   |
| -------------- | ------------------------------- | ------------------------- |
| `--vus`        | Number of virtual users         | `--vus 20`                |
| `--duration`   | How long to run                 | `--duration 2m`           |
| `--iterations` | Fixed total iterations          | `--iterations 100`        |
| `--env`        | Pass an environment variable    | `--env BASE_URL=https://…` |
| `--out`        | Export metrics (JSON, CSV, ...) | `--out json=results.json` |

> CLI flags override options defined inside the script.

### Examples

```bash
# 5 VUs for 30 seconds
k6 run --vus 5 --duration 30s tests/example.js

# 3 VUs, exactly 30 iterations total
k6 run --vus 3 --iterations 30 tests/example.js

# Save results to JSON
k6 run --out json=results.json tests/load-test.js
```

## Development

```bash
pnpm install   # installs @types/k6 for IntelliSense
```
