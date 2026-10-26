# SauceDemo E-commerce Quality Engineering

A portfolio QA project demonstrating risk-based test planning, manual test design, exploratory testing, defect reporting, Playwright automation, and CI/CD.

## Application under test
https://www.saucedemo.com/

## Current deliverables
- `test-strategy.md` — testing approach, objectives, scope, environment, entry/exit criteria.
- `scope-and-assumptions.md` — boundaries, assumptions, exclusions, dependencies, open questions.
- `risk-register.md` — initial risk assessment and mitigations.
- `requirements-traceability-matrix.md` — requirement-to-test mapping.
- `exploratory-testing-charters.md` — time-boxed exploratory missions.
- `manual-test-cases.xlsx` — workbook with manual cases, risk register, RTM, exploratory charters and execution summary.

## Manual test inventory
- Planned cases: 75
- Requirements: 17
- Initial risks: 10
- Exploratory charters: 7

## Important status note
All test cases are initially marked `Not Run`. This package contains planned tests, not execution results. Populate actual results, status, environment and evidence only after running the tests. Risk and requirement details should be validated against the current demo application.

## Suggested next steps
1. Complete reconnaissance and confirm available behaviors.
2. Review the scope, requirements, and risk register.
3. Execute manual cases and record evidence.
4. Refine the test case set based on actual findings.
5. Build the Playwright framework and automate high-priority flows.
6. Add GitHub Actions and publish real execution artifacts.
