# Campaign naming convention

Consistent UTM values are what make channel and campaign reports in GA4 trustworthy.
`Facebook`, `facebook` and `fb` show up as three different sources; this guide prevents that.

## Global rules

| Rule | Example |
|---|---|
| Lowercase only | `instagram`, not `Instagram` |
| Hyphens inside a value, no spaces | `black-friday` |
| Underscores only to separate fields in `utm_campaign` | `2026-11_au_black-friday_prospecting` |
| No special characters (`& ? # % !`) | `spring-sale`, not `spring-sale!` |
| Never put personal data (emails, names) in a UTM | — |
| Never tag internal links on your own site | it overwrites the original session source |

## Field by field

| Parameter | What it answers | Allowed values / pattern |
|---|---|---|
| `utm_source` | *Who* sent the traffic? | `google`, `meta`, `instagram`, `linkedin`, `tiktok`, `newsletter`, `partner-name` |
| `utm_medium` | *What type* of channel? | `cpc`, `paid-social`, `social`, `email`, `display`, `affiliate`, `referral`, `sms`, `qr` |
| `utm_campaign` | *Which* campaign? | `yyyy-mm_market_theme_objective` |
| `utm_term` | Which paid keyword / audience? | `running-shoes`, `lookalike-1pct` |
| `utm_content` | Which creative or link variant? | `video-a`, `carousel-b`, `header-cta` |

### Campaign name pattern

```
yyyy-mm _ market _ theme _ objective
2026-11 _ au     _ black-friday _ prospecting
```

* **yyyy-mm**: launch month, so campaigns sort chronologically.
* **market**: ISO country code (`au`, `ae`, `in`, `de`) or `global`.
* **theme**: short, human-readable idea (`black-friday`, `new-range-launch`).
* **objective**: `awareness`, `prospecting`, `retargeting`, `retention`, `launch`.

## Why the `utm_medium` list matters

GA4's default channel grouping relies on `utm_medium` (and source) to put sessions into
channels like *Paid Social*, *Email* or *Paid Search*. Values outside the expected
patterns (e.g. `facebook-ads`) can end up as **Unassigned**. The builder warns you when
a medium is not on the standard list above.

## Examples (DTC brands and SaaS)

| Use case | Source | Medium | Campaign | Content |
|---|---|---|---|---|
| DTC skincare product drop, Instagram Reels ad | `instagram` | `paid-social` | `2026-11_au_serum-launch_prospecting` | `reel-ugc-a` |
| DTC abandoned-cart email, 10% code | `klaviyo` | `email` | `2026-11_global_abandoned-cart_retention` | `email-2-discount` |
| DTC Black Friday retargeting on Meta | `meta` | `paid-social` | `2026-11_au_black-friday_retargeting` | `carousel-b` |
| SaaS free-trial Google Search ad | `google` | `cpc` | `2027-01_in_free-trial_prospecting` | `rsa-1` |
| SaaS product-launch post on LinkedIn | `linkedin` | `social` | `2027-02_global_ai-feature-launch_launch` | `founder-post` |
| SaaS webinar invite to newsletter list | `newsletter` | `email` | `2027-03_ae_onboarding-webinar_retention` | `hero-cta` |
| QR code on DTC packaging insert | `packaging` | `qr` | `2027-01_global_review-request_retention` | `insert-card` |
