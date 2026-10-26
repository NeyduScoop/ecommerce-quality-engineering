# Scope and Assumptions — SauceDemo E-commerce Quality Engineering

**Project:** E-commerce Quality Engineering  
**Application under test:** https://www.saucedemo.com/  
**Document status:** Draft for portfolio project  
**Version:** 1.0  
**Date:** 24 October 2026

## 1. Purpose

This document defines the project boundaries, assumptions, dependencies, and exclusions used to design the test strategy and test cases.

## 2. Application and business workflow

The project evaluates the publicly accessible SauceDemo practice storefront. The planned primary workflow is:

1. Open the login page.
2. Authenticate using a supported demo account.
3. Browse the inventory.
4. Sort products and inspect product details where available.
5. Add and remove products from the cart.
6. Open the cart and review selected products.
7. Proceed to checkout and enter customer information.
8. Review the order summary.
9. Complete the supported order flow and verify confirmation.
10. Return or navigate between relevant pages and verify expected state behavior.

This workflow is a testing model. Each step must be confirmed against the live demo before being treated as a supported requirement.

## 3. In-scope features

| Area | Included validation |
|---|---|
| Login | Valid credentials, invalid credentials, missing values, supported user-specific behavior, error feedback |
| Inventory | Page load, product visibility, product information, navigation |
| Sorting | Available sort choices, ordering correctness, stable product association |
| Product details | Open details, product name/description/price consistency, return navigation, if supported |
| Cart | Add/remove, product list, quantity/badge behavior, empty cart, navigation |
| Checkout | Required fields, input validation, error handling, progression |
| Order overview | Product list, subtotal and displayed totals where available |
| Order completion | Completion action and confirmation state |
| Regression | Primary customer journey and cross-module behavior |
| Usability/accessibility | Keyboard flow, focus visibility, error clarity, basic semantic checks |
| Automation | Playwright smoke, regression, end-to-end tests and CI workflow |

## 4. Out of scope

Unless the application or a separately controlled test environment explicitly supports them, the following are excluded:
- Real card payments, refunds, settlement, or financial processing.
- Direct database assertions and backend service validation.
- Production authentication/security certification or penetration testing.
- Load, stress, endurance, or performance SLA testing.
- Real email, SMS, or third-party notification delivery.
- Concurrent inventory reservation guarantees.
- Mobile native application testing.
- Testing any system or endpoint that is not authorized for use.
- Testing with real customer or payment data.

## 5. Assumptions

1. The public demo is available for ordinary manual and automated browsing.
2. Demo credentials, if needed, are obtained from the site's own visible or documented guidance.
3. No credentials or personal data are committed to the repository.
4. Checkout data will be synthetic and non-sensitive.
5. Expected results are based on observed UI behavior and documented product rules, not guessed backend behavior.
6. UI-only evidence does not prove backend persistence or transaction integrity.
7. The demo may contain intentionally different behavior for different test personas.
8. Third-party demo changes may affect test stability; failures must be investigated before classifying them as product defects.
9. Browser, OS, date, account persona, and test run details will be recorded for execution evidence.
10. Any feature not observed or verified will be marked as an assumption, unknown, or not applicable.

## 6. Dependencies

- Public SauceDemo website availability.
- Stable internet connection.
- Node.js and npm for automation.
- Playwright browser binaries.
- Git and GitHub account for version control and CI.
- Spreadsheet-compatible software for the manual test workbook.
- GitHub Actions availability for CI execution.

## 7. Constraints

- No access to private application source code or internal requirements is assumed.
- No backend or database access is assumed.
- Test data and user personas are limited to those supported by the demo.
- A third-party service may change without notice.
- Accessibility checks are lightweight and do not replace a full audit.
- Security-related tests are limited to safe, authorized negative checks.

## 8. Open questions to resolve during execution

- Which demo user personas are documented and what behaviors differ?
- Which sorting options are available in the current application?
- Which checkout fields are mandatory and what validation messages are shown?
- Which order confirmation elements are displayed?
- What cart state persists across refresh or browser navigation?
- Which accessibility checks can be meaningfully verified in the public demo?
- Are any observed failures reproducible across fresh sessions?

## 9. Scope change process

If reconnaissance reveals additional supported functionality, update the feature inventory, requirements traceability matrix, risk register, and test cases before expanding automation. If a feature is unavailable, record it as out of scope or not applicable rather than creating a fictitious test result.
