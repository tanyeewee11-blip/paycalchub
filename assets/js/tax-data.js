/* ==========================================================================
   PayCalcHub — centralized tax & rate data
   ----------------------------------------------------------------------
   IMPORTANT: this is the single source of truth for tax brackets and
   rates used across the site's calculators. Update THIS file once a
   year (or whenever the IRS / state agencies publish new numbers) and
   bump LAST_VERIFIED below. Do not hardcode brackets inside individual
   page scripts — pull them from TAX_DATA instead, so every page that
   shares this file stays in sync automatically.
   ========================================================================== */

var TAX_DATA = {
  // Update this whenever the numbers below are checked/changed.
  LAST_VERIFIED: "2026-01-01",
  SOURCE_NOTES: "IRS Rev. Proc. (2026 federal brackets & standard deduction), SSA.gov (FICA rate)",

  // 2026 federal standard deduction
  STANDARD_DEDUCTION: {
    single: 15000,
    married: 30000
  },

  // 2026 federal income tax brackets: [width of this bracket in dollars, rate]
  // Each pair means "this many dollars of taxable income are taxed at this
  // rate", consumed in order against remaining taxable income (NOT a
  // cumulative upper-bound threshold). The last bracket uses a large width
  // to represent "and above". Example (single): the first $11,925 of
  // taxable income is taxed at 10%, the next $36,550 at 12%, and so on.
  FEDERAL_BRACKETS: {
    single: [
      [11925, 0.10],
      [36550, 0.12],
      [54875, 0.22],
      [93950, 0.24],
      [53225, 0.32],
      [375825, 0.35],
      [1000000000, 0.37]
    ],
    married: [
      [23850, 0.10],
      [73100, 0.12],
      [109750, 0.22],
      [187900, 0.24],
      [106450, 0.32],
      [250550, 0.35],
      [1000000000, 0.37]
    ]
  },

  // Combined employee FICA rate: Social Security (6.2%) + Medicare (1.45%)
  FICA_RATE: 0.0765,

  // Flat state income tax rate used for the homepage quick-estimate widget.
  // NOTE: this is a simplified flat-rate approximation for the homepage
  // preview only. Each /salary-calculator/<state>/ page should use its own
  // accurate progressive brackets — this list is not a substitute for that.
  STATE_FLAT_RATE_ESTIMATE: {
    "none": 0,            // AK / FL / TX / WA / NV / SD / WY / TN / NH (no wage income tax)
    "california": 9.3,
    "new-york": 6.85,
    "massachusetts": 5.0,
    "illinois": 4.95,
    "colorado": 4.4,
    "virginia": 5.75,
    "pennsylvania": 3.07,
    "michigan": 4.25
  }
};

/**
 * Calculate federal income tax owed using TAX_DATA brackets.
 * @param {number} taxableIncome
 * @param {"single"|"married"} filingStatus
 * @returns {number} federal tax owed
 */
function calcFederalTax(taxableIncome, filingStatus){
  var brackets = TAX_DATA.FEDERAL_BRACKETS[filingStatus] || TAX_DATA.FEDERAL_BRACKETS.single;
  var tax = 0, remaining = taxableIncome;
  for (var i = 0; i < brackets.length; i++){
    var chunk = Math.min(remaining, brackets[i][0]);
    tax += chunk * brackets[i][1];
    remaining -= chunk;
    if (remaining <= 0) break;
  }
  return tax;
}
