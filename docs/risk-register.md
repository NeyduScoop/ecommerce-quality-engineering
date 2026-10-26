# Risk Register — SauceDemo E-commerce Quality Engineering

**Status:** Initial risk assessment; validate and revise during test execution.  
**Date:** 24 October 2026

| Risk ID | Risk | Impact | Likelihood | Rating | Priority | Mitigation |
|---|---|---|---|---|---|---|
| RISK-01 | Authentication flow failure | Users cannot log in or receive misleading feedback for invalid credentials. | High | High | P1 | Cover valid, invalid and incomplete login scenarios; record persona used; assert meaningful destination/error state. |
| RISK-02 | Inventory/product information incorrect or unavailable | User cannot browse or identify the intended product. | High | High | P1 | Validate inventory visibility, key product details, navigation, and data consistency. |
| RISK-03 | Sorting behavior incorrect | Products are ordered incorrectly or labels do not match behavior. | Medium | Medium | P2 | Verify each exposed sort option with independently computed expected order and tie-aware assertions. |
| RISK-04 | Cart state inconsistency | Added/removed products, cart badge, and cart contents disagree. | High | High | P1 | Test add/remove, empty cart, multiple products, badge counts and navigation across cart views. |
| RISK-05 | Checkout validation or progression failure | User cannot proceed with valid data or can proceed with incomplete required data. | High | High | P1 | Test each required field independently and validate error feedback and successful progression. |
| RISK-06 | Order overview/completion inconsistency | Order summary differs from selected products or confirmation is not shown. | High | High | P1 | Compare selected products with overview and verify completion state; do not infer backend payment success. |
| RISK-07 | Navigation/state regression | Back, refresh or return actions cause stale state, broken navigation or duplicated UI. | Medium | Medium | P2 | Explore refresh/back behavior and re-run cross-module regression after relevant changes. |
| RISK-08 | Usability/accessibility barrier | Keyboard users or users relying on visible labels/focus feedback cannot complete core flows easily. | Medium | Medium | P2 | Run keyboard-only checks, focus checks, error-message checks and lightweight semantic inspection. |
| RISK-09 | Automation/CI false confidence | Tests are flaky, poorly isolated, or CI failures are not diagnosable. | High | High | P1 | Use resilient locators, isolated tests, web-first assertions, traces/screenshots, documented retries and CI artifacts. |
| RISK-10 | Third-party demo instability or behavior changes | External changes/network failures are misreported as application defects. | Medium | High | P2 | Record environment and timestamp, retry manually only for diagnosis, distinguish app failures from environment/test failures. |

## Rating guidance
- **High:** Could prevent the primary customer journey or undermine confidence in critical displayed order data.
- **Medium:** Could degrade an important feature, cause confusion, or affect a subset of workflows.
- Likelihood is an initial planning estimate, not measured defect probability.
- Reassess after reconnaissance and execution. Only promote a suspected issue to a defect after reproducing it.
