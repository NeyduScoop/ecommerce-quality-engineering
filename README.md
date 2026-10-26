# E-commerce Quality Engineering

**A portfolio project demonstrating risk-based testing, manual
test design, bug reporting, Playwright automation, TypeScript, and CI/CD.**

[![Playwright Tests](https://github.com/NeyduScoop/ecommerce-quality-engineering/actions/workflows/playwright.yml/badge.svg)](https://github.com/NeyduScoop/ecommerce-quality-engineering/actions/workflows/playwright.yml)

## Overview

This project applies quality engineering practices to SauceDemo,
a sample e-commerce web application.

It demonstrates a traceable testing workflow, from test strategy
and manual test design to browser automation, execution reporting,
and continuous integration.

## Application Under Test

- Application: SauceDemo
- URL: https://www.saucedemo.com/
- Automation framework: Playwright Test
- Language: TypeScript
- Initial browser target: Chromium
- CI/CD: GitHub Actions

## Engineering Approach

- Risk-based test planning
- Manual test case design and traceability
- Bug reporting
- Page Object Model
- Reusable Playwright fixtures
- Centralized test data
- Smoke, regression, and end-to-end suites
- TypeScript static validation
- Automated HTML reporting
- CI execution with diagnostic artifacts

## Test Coverage

| Feature | Coverage |
|---|---|
| Authentication | Positive and negative scenarios |
| Inventory | Page loading and product visibility |
| Sorting | Price ascending |
| Shopping cart | Add and remove products |
| Checkout | Required-field validation |
| Order completion | Order overview and confirmation |

Coverage describes the scenarios currently implemented. It does
not represent exhaustive testing of the application.

## Project Structure

- `tests/` — automated scenarios organized by suite
- `pages/` — reusable page objects
- `fixtures/` — shared test setup
- `test-data/` — demo test accounts
- `utils/` — shared helper functions
- `docs/` — strategy, risks, traceability, manaul testcases, scope, bug and execution reports
- `.github/workflows/` — CI/CD automation

## Getting Started

### Prerequisites

- Node.js LTS
- npm
- Git

### Installation

```bash
git clone https://github.com/NeyduScoop/ecommerce-quality-engineering
cd ecommerce-quality-engineering
npm ci
npx playwright install chromium
```

### Run tests

```bash
npx tsc --noEmit
npm run test:smoke
npm run test:regression
npm run test:e2e
npm test
npm run report
```

## CI/CD

GitHub Actions runs smoke tests first. Regression and E2E tests
run after the smoke job succeeds. Available test reports and
diagnostic artifacts are uploaded to the workflow run.

See the Actions tab for the actual workflow history and results.

## Quality Evidence

- [Test strategy](docs/test-strategy.md)
- [Risk register](docs/risk-register.md)
- [Requirements traceability matrix](docs/requirements-traceability-matrix.md)
- [Test execution report](docs/test-execution-report.md)
- [Scope and Assumptions](docs/scope-and-assumptions.md)
- [Manual Test cases](docs/manual-test-cases.xlsx)
- [Demo QA Bug sheet](docs/SauceDemo_QA_Bug_Sheet.xlsx)

Add links to confirmed defect reports, screenshots, traces, and
CI runs as they become available.

## Limitations

This is a demonstration project using a public sample application.
It is not evidence of production payment, security, performance,
or large-scale reliability testing.

## Author

Ojinmah Chinedu Christian

QA Engineer | Manual Testing | Test Automation | Quality Engineering
