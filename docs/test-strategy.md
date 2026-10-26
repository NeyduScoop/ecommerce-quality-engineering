# Test Strategy — SauceDemo E-commerce Quality Engineering

**Project:** E-commerce Quality Engineering  
**Application under test:** https://www.saucedemo.com/  
**Document status:** Draft for portfolio project  
**Prepared by:** QA Engineer  
**Version:** 1.0  
**Date:** 24 October 2026

## 1. Purpose

This document defines the testing approach for the SauceDemo practice e-commerce application. The objective is to demonstrate a risk-based, traceable QA process spanning manual testing, exploratory testing, defect reporting, and Playwright automation.

This is a portfolio exercise against a third-party demo application. Testing will be limited to behavior that is available and observable through the public demo. No production, payment-processing, security-certification, or backend-integrity claims will be made without supporting access and evidence.

## 2. Quality objectives

1. Validate that supported users can authenticate and reach the inventory page.
2. Validate inventory visibility, product details, sorting, and product selection.
3. Validate cart operations and consistency between selected products and cart contents.
4. Validate checkout input handling, order summary, and completion flow.
5. Identify reproducible functional, usability, accessibility, and workflow defects.
6. Establish a maintainable Playwright test suite with clear separation between smoke, regression, and end-to-end coverage.
7. Produce traceable test evidence, meaningful execution reporting, and a repeatable CI workflow.

## 3. Scope

### In scope
- Login page and supported demo account behaviors.
- Inventory/product listing.
- Product sorting options exposed by the application.
- Product detail navigation where available.
- Add-to-cart, remove-from-cart, cart contents, and cart badge behavior.
- Checkout information validation.
- Order overview and order completion/confirmation flow.
- Navigation, refresh, back-button behavior, and selected responsive/usability checks.
- Keyboard accessibility and basic semantic/accessibility checks where applicable.
- Cross-module regression of the primary customer journey.
- Playwright browser automation and CI execution for supported flows.

### Out of scope unless separately enabled or evidenced
- Real payments, refunds, settlement, or financial transactions.
- Production-grade security penetration testing.
- Backend database validation or direct service/API contract tests without an authorized API.
- Load, stress, and performance certification.
- Email/SMS delivery.
- Real inventory reservation or concurrency guarantees.
- Features not present in the public demo.
- Testing with real personal, payment, or customer data.

## 4. Test approach

### 4.1 Reconnaissance and requirements
Use the observed application behavior and available demo guidance to create a feature inventory. Distinguish confirmed behavior from assumptions and requirements proposed for evaluation. Record uncertainties rather than silently treating them as requirements.

### 4.2 Manual functional testing
Execute positive, negative, boundary, workflow, and regression scenarios. Each test case must have a unique ID, clear preconditions, numbered steps, test data, expected result, actual result, status, environment, and evidence field.

### 4.3 Exploratory testing
Use time-boxed charters focused on high-risk journeys: authentication, inventory and sorting, cart consistency, checkout validation, and navigation/state persistence. Record observations and reproducible steps.

### 4.4 Automation strategy
Use Playwright Test with TypeScript. Prioritize the most valuable user journeys:
- Smoke: application loads, valid login, inventory visible, cart interaction.
- Regression: login validation, sorting, cart operations, checkout validation, order summary and completion.
- End-to-end: complete supported purchase journey.

Use user-facing locators where practical, web-first assertions, isolated tests, reusable page objects/fixtures, and deterministic test data. Avoid fixed sleeps unless a documented technical reason exists.

### 4.5 Defect management
Report only defects that have been reproduced. Each report should include a concise title, environment, preconditions, steps, expected and actual results, severity, priority, evidence, and retest criteria. Distinguish application defects from test-code, environment, browser, and third-party dependency failures.

### 4.6 Accessibility and usability
Perform lightweight checks for keyboard navigation, visible focus, labels, error feedback, heading/landmark structure where relevant, and basic contrast/zoom observations. These checks do not constitute a formal accessibility conformance audit.

### 4.7 Regression
After any relevant change or fix, rerun impacted tests and the primary login-to-order journey. Maintain links between requirements, risks, manual cases, automated tests, and reported defects.

## 5. Test levels and types

| Test type | Purpose | Example |
|---|---|---|
| Functional | Validate expected feature behavior | Add product to cart |
| Negative | Validate invalid or incomplete input | Submit checkout with missing required data |
| Boundary | Check limits or edge conditions | Empty cart, one item, multiple items |
| Integration/workflow | Validate connected UI steps | Inventory → cart → checkout |
| End-to-end | Validate a full user journey | Login → select products → order confirmation |
| Regression | Detect unintended changes | Re-run critical flows after changes |
| Usability | Check clarity and recoverability | Error messages and navigation clarity |
| Accessibility | Check basic accessible interaction | Keyboard navigation and focus visibility |
| Exploratory | Learn behavior and find unanticipated issues | Cart state and browser navigation |

## 6. Risk-based prioritization

- **P0 / Critical:** Blocks or invalidates the primary purchase journey, or creates severe data/transaction integrity concerns.
- **P1 / High:** Major function fails with limited workaround or materially affects checkout.
- **P2 / Medium:** Partial feature degradation or a workaround exists.
- **P3 / Low:** Cosmetic, low-impact usability, or minor consistency issue.

Priority is a testing-planning value and should not be confused with final defect severity. Reassess priorities after reconnaissance and evidence collection.

## 7. Test environment

- Application: https://www.saucedemo.com/
- Initial browser: Chromium through Playwright.
- Additional browsers: Firefox and WebKit only if supported by the environment and stable enough for meaningful comparison.
- Operating system: record the actual OS used for each run.
- Test data: documented demo accounts and synthetic/non-sensitive checkout data only.
- Automation: Node.js, TypeScript, Playwright Test.
- CI: GitHub Actions, using no personal or sensitive credentials.

Record browser version, OS, date/time, test run identifier, and relevant application behavior in execution evidence.

## 8. Entry criteria

- Public demo is reachable.
- Test scope and assumptions are reviewed.
- Supported demo account information is available from the site or its documented guidance.
- Test cases have IDs and expected results.
- Test environment and browser are recorded.

## 9. Exit criteria

- All planned in-scope test cases have an execution status.
- Critical user journey results are recorded.
- Every failed test has supporting evidence or a documented reason it could not be reproduced.
- Defects are documented with reproducible steps.
- Test results, limitations, and known issues are summarized.
- Automated tests execute from a clean checkout using documented instructions.
- CI results and generated reports are available for review.

## 10. Metrics

Report measured values only:
- Planned, executed, passed, failed, blocked, and not-run test cases.
- Execution pass rate using executed cases as the denominator.
- Defect count by severity/priority and status.
- Automation coverage by requirement or scenario, not just raw test count.
- Automation duration and CI outcome.
- Flaky test count, with the definition used.
- Critical workflow coverage.

Do not claim code coverage, production readiness, security compliance, or performance guarantees unless those measurements were actually collected.

## 11. Deliverables

- Test strategy and scope/assumptions.
- Risk register.
- Requirements traceability matrix.
- Manual test case workbook.
- Exploratory testing charters.
- Defect reports and evidence index.
- Playwright automation framework and suites.
- CI workflow and reports.
- Final test execution report and portfolio README.

## 12. Known limitations

SauceDemo is a public practice application and may expose intentionally different behaviors for different demo users. The test strategy must record the account used and the observed behavior. Public demo availability and behavior may change. Scenarios requiring backend access, real payment processing, email delivery, or production-like concurrency are not considered verified by UI-only testing.
