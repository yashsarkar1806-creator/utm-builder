// UTM link builder logic. Works in the browser (window.UTM) and in Node (module.exports).
(function (root) {
  // Normalise a value to the naming convention: lowercase, trimmed, spaces -> hyphens,
  // only a-z 0-9 . - and _ kept (_ separates campaign-name fields), no repeated or trailing hyphens.
  function normalise(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9._\-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^[-_]+|[-_]+$/g, "");
  }

  // A single field inside a campaign name must not contain "_" (it is the separator).
  function part(value) {
    return normalise(String(value || "").replace(/_/g, " "));
  }

  // Build a campaign name like 2026-11_au_black-friday_prospecting
  function campaignName({ yearMonth, market, theme, objective }) {
    return [yearMonth, market, theme, objective].map(part).filter(Boolean).join("_");
  }

  function validate(params) {
    const errors = [];
    let url;
    try {
      url = new URL(params.url);
      if (!/^https?:$/.test(url.protocol)) errors.push("URL must start with http:// or https://");
    } catch (e) {
      errors.push("Enter a valid website URL, e.g. https://example.com/landing");
    }
    ["source", "medium", "campaign"].forEach((k) => {
      if (!normalise(params[k])) errors.push(`utm_${k} is required`);
    });
    return errors;
  }

  // Returns { url, errors, warnings }
  function buildUtmUrl(params) {
    const errors = validate(params);
    if (errors.length) return { url: "", errors, warnings: [] };
    const warnings = [];
    const url = new URL(params.url);
    const fields = { source: params.source, medium: params.medium, campaign: params.campaign,
                     term: params.term, content: params.content };
    Object.entries(fields).forEach(([k, raw]) => {
      if (!raw) return;
      const clean = normalise(raw);
      if (clean !== String(raw).trim()) warnings.push(`utm_${k} normalised: "${raw}" -> "${clean}"`);
      if (url.searchParams.has(`utm_${k}`)) warnings.push(`existing utm_${k} in URL was replaced`);
      url.searchParams.set(`utm_${k}`, clean);
    });
    const allowedMediums = ["cpc", "paid-social", "social", "email", "display", "affiliate", "referral", "organic", "sms", "qr"];
    if (!allowedMediums.includes(normalise(params.medium)))
      warnings.push(`utm_medium "${normalise(params.medium)}" is not in the standard list (${allowedMediums.join(", ")}), so GA4 may group it as "Unassigned"`);
    return { url: url.toString(), errors: [], warnings };
  }

  const api = { normalise, campaignName, buildUtmUrl, validate };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.UTM = api;
})(typeof window !== "undefined" ? window : this);
