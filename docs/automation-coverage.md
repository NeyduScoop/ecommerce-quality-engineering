
# Automation Coverage Matrix

## Purpose

This document maps manual test scenarios to their corresponding
Playwright automation tests. It helps identify coverage gaps and
distinguish automated checks from manual-only testing.

## Coverage Matrix

| Manual Test ID | Feature | Automation Test | Suite | Status |
|---|---|---|---|---|
| TC-AUTH-001 | Valid login | login.smoke.spec.ts | Smoke | Implemented |
| TC-AUTH-002 | Invalid credentials | login.spec.ts | Regression | Implemented |
| TC-AUTH-003 | Locked-out user | login.spec.ts | Regression | Implemented |
| TC-AUTH-004 | Empty credentials | login.spec.ts | Regression | Implemented |
| TC-INV-001 | Inventory loads | inventory.smoke.spec.ts | Smoke | Implemented |
| TC-SORT-003 | Price ascending | sorting.spec.ts | Regression | Implemented |
| TC-CART-002 | Add product | cart.spec.ts | Regression | Implemented |
| TC-CART-003 | Remove product | cart.spec.ts | Regression | Implemented |
| TC-CHECK-002 | Required checkout fields | checkout.spec.ts | Regression | Implemented |
| TC-ORDER-006 | Complete order | complete-order.spec.ts | E2E | Implemented |

## Coverage Rules

- Implemented means an automation test exists.
- Executed means the test ran in a recorded execution.
- Passed means the test assertions passed in that execution.
- Failed means the test executed and one or more assertions failed.
- Blocked means execution could not proceed because of an
  external dependency or prerequisite.
- Not automated means the scenario remains manual-only.

## Coverage Gaps

Review the manual test suite for scenarios not yet automated,
including product details, checkout boundary cases, price
calculations, browser compatibility, and accessibility.

## Maintenance

Update this matrix whenever test IDs, test files, or coverage
change. Confirm the mappings against the approved manual test
case spreadsheet.
