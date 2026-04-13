# k6 Training

A simple k6 load testing project.

## Prerequisites

- [k6](https://grafana.com/docs/k6/latest/get-started/installation/) installed on your machine

### Install k6

**Windows (via Chocolatey):**
```bash
choco install k6
```

**Windows (via winget):**
```bash
winget install k6 --source winget
```

**macOS (via Homebrew):**
```bash
brew install k6
```

**Linux (Debian/Ubuntu):**
```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

## Project Structure

```
k6_training/
├── tests/
│   └── example.js   # Example load test script
├── package.json
└── README.md
```

## Running Tests

### Run the example test

```bash
k6 run tests/example.js
```

### Run with custom virtual users and duration

```bash
k6 run --vus 10 --duration 30s tests/example.js
```

- `--vus`: Number of virtual users (default: 1)
- `--duration`: Test duration (e.g. `30s`, `1m`, `5m`)

### Run with iterations

```bash
k6 run --vus 5 --iterations 50 tests/example.js
```

## What the Example Test Does

The `tests/example.js` script sends a POST request to `https://httpbin.test.k6.io/post` and logs the HTTP response status code. It is intended as a starting point for building more complex load test scenarios.

## Development

This project uses [`@types/k6`](https://www.npmjs.com/package/@types/k6) for TypeScript/IntelliSense support. Install dev dependencies with:

```bash
pnpm install
```
