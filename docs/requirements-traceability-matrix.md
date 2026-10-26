# Requirements Traceability Matrix — SauceDemo E-commerce Quality Engineering

**Status:** Draft; requirement wording must be checked against observed demo behavior.  
**Date:** 24 October 2026

| Requirement ID | Module | Test objective / requirement | Priority | Test type | Status | Risk ID | Mapped test case IDs |
|---|---|---|---|---|---|---|---|
| REQ-AUTH-001 | Login | A supported demo user can authenticate with valid credentials. | High | Functional | Observed behavior to confirm | RISK-01 | TC-AUTH-001, TC-REG-006 |
| REQ-AUTH-002 | Login | Invalid or incomplete login attempts are handled with clear feedback. | High | Negative/Usability | Expected behavior to validate | RISK-01 | TC-AUTH-002, TC-AUTH-003, TC-AUTH-004, TC-AUTH-005, TC-AUTH-006, TC-AUTH-007, TC-AUTH-008, TC-AUTH-009, TC-EXP-003 |
| REQ-INV-001 | Inventory | Authenticated user can view the inventory page and product cards. | High | Functional | Observed behavior to confirm | RISK-02 | TC-INV-001, TC-INV-002, TC-INV-007, TC-INV-008, TC-REG-007 |
| REQ-INV-002 | Inventory | Product information is displayed consistently across inventory and details views where available. | Medium | Functional/Integration | Validate against displayed data | RISK-02 | TC-DETAIL-001 |
| REQ-SORT-001 | Sorting | Each exposed sort option orders the products according to its label. | Medium | Functional/Boundary | Options to be confirmed in live UI | RISK-03 | TC-SORT-001, TC-SORT-002, TC-SORT-003, TC-SORT-004, TC-SORT-005, TC-SORT-006, TC-SORT-007, TC-REG-003 |
| REQ-DETAIL-001 | Product details | User can open a product detail view and return to inventory where supported. | Medium | Functional/Navigation | Availability to confirm | RISK-02 | TC-INV-003, TC-INV-004 |
| REQ-CART-001 | Cart | User can add a product and see it represented in cart state. | High | Functional/Integration | Observed behavior to confirm | RISK-04 | TC-INV-005, TC-DETAIL-002, TC-CART-002, TC-CART-005 |
| REQ-CART-002 | Cart | User can remove a selected product and cart state updates correctly. | High | Functional/Boundary | Observed behavior to confirm | RISK-04 | TC-CART-001, TC-CART-003, TC-CART-006 |
| REQ-CART-003 | Cart | Cart contents and badge reflect the selected products consistently. | High | Data consistency | Expected UI consistency | RISK-04 | TC-INV-006, TC-CART-004, TC-REG-002, TC-EXP-001 |
| REQ-CHECK-001 | Checkout | User can proceed to checkout from a non-empty cart. | High | End-to-end | Observed behavior to confirm | RISK-05 | TC-CART-008, TC-CHECK-001 |
| REQ-CHECK-002 | Checkout | Required customer fields are validated before progression. | High | Negative/Validation | Field rules to confirm | RISK-05 | TC-CHECK-002, TC-CHECK-003, TC-CHECK-004, TC-CHECK-005, TC-CHECK-006, TC-CHECK-007, TC-CHECK-010 |
| REQ-ORDER-001 | Order overview | Order overview reflects the products selected for checkout. | Critical | Data consistency | Displayed data to validate | RISK-06 | TC-ORDER-001, TC-ORDER-002, TC-ORDER-003, TC-ORDER-005 |
| REQ-ORDER-002 | Order completion | User can complete the supported order flow and sees a confirmation state. | Critical | End-to-end | Observed behavior to confirm | RISK-06 | TC-ORDER-006, TC-ORDER-007, TC-ORDER-009, TC-REG-001 |
| REQ-NAV-001 | Navigation | Back, return, and refresh actions do not produce unexpected navigation or stale UI state. | Medium | Regression/Usability | Behavior to explore | RISK-07 | TC-INV-010, TC-DETAIL-003, TC-CART-007, TC-CART-009, TC-CHECK-008, TC-ORDER-004, TC-ORDER-008, TC-REG-004, TC-REG-005, TC-EXP-002 |
| REQ-A11Y-001 | Accessibility | Core flows can be navigated with keyboard and show meaningful focus/validation feedback. | Medium | Accessibility/Usability | Lightweight checks only | RISK-08 | TC-AUTH-010, TC-INV-009, TC-DETAIL-004, TC-CART-010, TC-CHECK-009, TC-A11Y-001, TC-A11Y-002 |
| REQ-AUTO-001 | Automation | Critical scenarios run through Playwright with deterministic assertions and useful failure evidence. | High | Automation | Project requirement | RISK-09 | TC-REG-008, TC-REG-009 |
| REQ-CI-001 | CI/CD | Automated checks run in GitHub Actions and preserve test results. | Medium | CI/Regression | Project requirement | RISK-09 | TC-REG-010 |

## Traceability usage
1. Confirm each requirement against the current application and update its status.
2. Execute linked test cases and record actual results/status in `manual-test-cases.xlsx`.
3. Link any defect ID and evidence in the test case workbook and defect report.
4. Update automation status only after the corresponding automated test exists and has been run.
5. Mark unsupported features as Not Applicable rather than inventing behavior.
