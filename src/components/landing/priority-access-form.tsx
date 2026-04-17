"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isValidName, isValidEmailShape, normalizeName } from "@/lib/waitlist-validation";
import { submitPriorityAccessForm } from "@/lib/forms";

const ROLES = [
  "CEO/Founder",
  "CTO/VP Engineering",
  "VP Product",
  "VP Sales",
  "VP Marketing",
  "Operations Manager",
  "Operations Director",
  "Product Manager",
  "Engineering Manager",
  "Engineering Lead",
  "Solutions Architect",
  "Business Development",
  "Business Development Manager",
  "Sales Manager",
  "Account Executive",
  "Finance Manager",
  "CFO",
  "Controller",
  "Marketing Manager",
  "Growth Manager",
  "Content Manager",
  "HR Manager",
  "Recruiter",
  "DevOps Engineer",
  "Systems Engineer",
  "Technical Lead",
  "Other",
];

const HOW_HEARD = [
  "Product Hunt",
  "Twitter/X",
  "LinkedIn",
  "Referral",
  "Google Search",
  "GitHub",
  "Hacker News",
  "Conference",
  "Newsletter",
  "Podcast",
  "Other",
];

const CURRENCIES = [
  { code: "USD", symbol: "$", label: "USD ($) - United States" },
  { code: "EUR", symbol: "€", label: "EUR (€) - Eurozone" },
  { code: "GBP", symbol: "£", label: "GBP (£) - United Kingdom" },
  { code: "JPY", symbol: "¥", label: "JPY (¥) - Japan" },
  { code: "CAD", symbol: "C$", label: "CAD (C$) - Canada" },
  { code: "AUD", symbol: "A$", label: "AUD (A$) - Australia" },
  { code: "CHF", symbol: "CHF", label: "CHF - Switzerland" },
  { code: "INR", symbol: "₹", label: "INR (₹) - India" },
  { code: "SGD", symbol: "S$", label: "SGD (S$) - Singapore" },
  { code: "HKD", symbol: "HK$", label: "HKD (HK$) - Hong Kong" },
  { code: "NZD", symbol: "NZ$", label: "NZD (NZ$) - New Zealand" },
  { code: "ZAR", symbol: "R", label: "ZAR (R) - South Africa" },
  { code: "BRL", symbol: "R$", label: "BRL (R$) - Brazil" },
  { code: "MXN", symbol: "$", label: "MXN ($) - Mexico" },
  { code: "KRW", symbol: "₩", label: "KRW (₩) - South Korea" },
  { code: "IDR", symbol: "Rp", label: "IDR (Rp) - Indonesia" },
  { code: "THB", symbol: "฿", label: "THB (฿) - Thailand" },
  { code: "MYR", symbol: "RM", label: "MYR (RM) - Malaysia" },
  { code: "PHP", symbol: "₱", label: "PHP (₱) - Philippines" },
  { code: "VND", symbol: "₫", label: "VND (₫) - Vietnam" },
  { code: "PKR", symbol: "₨", label: "PKR (₨) - Pakistan" },
  { code: "BDT", symbol: "৳", label: "BDT (৳) - Bangladesh" },
  { code: "LKR", symbol: "Rs", label: "LKR (Rs) - Sri Lanka" },
  { code: "AED", symbol: "د.إ", label: "AED (د.إ) - UAE" },
  { code: "SAR", symbol: "﷼", label: "SAR (﷼) - Saudi Arabia" },
  { code: "QAR", symbol: "ر.ق", label: "QAR (ر.ق) - Qatar" },
  { code: "KWD", symbol: "د.ك", label: "KWD (د.ك) - Kuwait" },
  { code: "BHD", symbol: "ب.د", label: "BHD (ب.د) - Bahrain" },
  { code: "OMR", symbol: "ر.ع", label: "OMR (ر.ع) - Oman" },
  { code: "JOD", symbol: "د.ا", label: "JOD (د.ا) - Jordan" },
  { code: "ILS", symbol: "₪", label: "ILS (₪) - Israel" },
  { code: "TRY", symbol: "₺", label: "TRY (₺) - Turkey" },
  { code: "RUB", symbol: "₽", label: "RUB (₽) - Russia" },
  { code: "PLN", symbol: "zł", label: "PLN (zł) - Poland" },
  { code: "CZK", symbol: "Kč", label: "CZK (Kč) - Czech Republic" },
  { code: "HUF", symbol: "Ft", label: "HUF (Ft) - Hungary" },
  { code: "RON", symbol: "lei", label: "RON (lei) - Romania" },
  { code: "BGN", symbol: "лв", label: "BGN (лв) - Bulgaria" },
  { code: "HRK", symbol: "kn", label: "HRK (kn) - Croatia" },
  { code: "SEK", symbol: "kr", label: "SEK (kr) - Sweden" },
  { code: "NOK", symbol: "kr", label: "NOK (kr) - Norway" },
  { code: "DKK", symbol: "kr", label: "DKK (kr) - Denmark" },
  { code: "ISK", symbol: "kr", label: "ISK (kr) - Iceland" },
  { code: "CLP", symbol: "$", label: "CLP ($) - Chile" },
  { code: "ARS", symbol: "$", label: "ARS ($) - Argentina" },
  { code: "UYU", symbol: "$U", label: "UYU ($U) - Uruguay" },
  { code: "COP", symbol: "$", label: "COP ($) - Colombia" },
  { code: "PEN", symbol: "S/", label: "PEN (S/) - Peru" },
  { code: "NGN", symbol: "₦", label: "NGN (₦) - Nigeria" },
  { code: "GHS", symbol: "₵", label: "GHS (₵) - Ghana" },
  { code: "EGP", symbol: "E£", label: "EGP (E£) - Egypt" },
  { code: "KES", symbol: "KSh", label: "KES (KSh) - Kenya" },
];

const COUNTRY_CODES = [
  { code: "+1", label: "+1 (US/CA)" },
  { code: "+44", label: "+44 (UK)" },
  { code: "+91", label: "+91 (IN)" },
  { code: "+61", label: "+61 (AU)" },
  { code: "+49", label: "+49 (DE)" },
  { code: "+33", label: "+33 (FR)" },
  { code: "+81", label: "+81 (JP)" },
  { code: "+86", label: "+86 (CN)" },
  { code: "+82", label: "+82 (KR)" },
  { code: "+55", label: "+55 (BR)" },
  { code: "+52", label: "+52 (MX)" },
  { code: "+34", label: "+34 (ES)" },
  { code: "+39", label: "+39 (IT)" },
  { code: "+31", label: "+31 (NL)" },
  { code: "+46", label: "+46 (SE)" },
  { code: "+47", label: "+47 (NO)" },
  { code: "+45", label: "+45 (DK)" },
  { code: "+41", label: "+41 (CH)" },
  { code: "+43", label: "+43 (AT)" },
  { code: "+32", label: "+32 (BE)" },
  { code: "+351", label: "+351 (PT)" },
  { code: "+48", label: "+48 (PL)" },
  { code: "+7", label: "+7 (RU)" },
  { code: "+380", label: "+380 (UA)" },
  { code: "+90", label: "+90 (TR)" },
  { code: "+20", label: "+20 (EG)" },
  { code: "+27", label: "+27 (ZA)" },
  { code: "+234", label: "+234 (NG)" },
  { code: "+254", label: "+254 (KE)" },
  { code: "+233", label: "+233 (GH)" },
  { code: "+966", label: "+966 (SA)" },
  { code: "+971", label: "+971 (AE)" },
  { code: "+974", label: "+974 (QA)" },
  { code: "+965", label: "+965 (KW)" },
  { code: "+973", label: "+973 (BH)" },
  { code: "+968", label: "+968 (OM)" },
  { code: "+972", label: "+972 (IL)" },
  { code: "+92", label: "+92 (PK)" },
  { code: "+880", label: "+880 (BD)" },
  { code: "+94", label: "+94 (LK)" },
  { code: "+62", label: "+62 (ID)" },
  { code: "+60", label: "+60 (MY)" },
  { code: "+65", label: "+65 (SG)" },
  { code: "+63", label: "+63 (PH)" },
  { code: "+84", label: "+84 (VN)" },
  { code: "+66", label: "+66 (TH)" },
  { code: "+852", label: "+852 (HK)" },
  { code: "+886", label: "+886 (TW)" },
  { code: "+64", label: "+64 (NZ)" },
  { code: "+54", label: "+54 (AR)" },
  { code: "+56", label: "+56 (CL)" },
  { code: "+57", label: "+57 (CO)" },
  { code: "+51", label: "+51 (PE)" },
  { code: "+58", label: "+58 (VE)" },
  { code: "+593", label: "+593 (EC)" },
  { code: "+502", label: "+502 (GT)" },
  { code: "+503", label: "+503 (SV)" },
  { code: "+504", label: "+504 (HN)" },
  { code: "+505", label: "+505 (NI)" },
  { code: "+506", label: "+506 (CR)" },
  { code: "+507", label: "+507 (PA)" },
  { code: "+53", label: "+53 (CU)" },
  { code: "+1-809", label: "+1-809 (DO)" },
  { code: "+213", label: "+213 (DZ)" },
  { code: "+212", label: "+212 (MA)" },
  { code: "+216", label: "+216 (TN)" },
  { code: "+218", label: "+218 (LY)" },
  { code: "+249", label: "+249 (SD)" },
  { code: "+251", label: "+251 (ET)" },
  { code: "+255", label: "+255 (TZ)" },
  { code: "+256", label: "+256 (UG)" },
  { code: "+260", label: "+260 (ZM)" },
  { code: "+263", label: "+263 (ZW)" },
  { code: "+353", label: "+353 (IE)" },
  { code: "+358", label: "+358 (FI)" },
  { code: "+420", label: "+420 (CZ)" },
  { code: "+36", label: "+36 (HU)" },
  { code: "+40", label: "+40 (RO)" },
  { code: "+359", label: "+359 (BG)" },
  { code: "+385", label: "+385 (HR)" },
  { code: "+381", label: "+381 (RS)" },
  { code: "+30", label: "+30 (GR)" },
  { code: "+370", label: "+370 (LT)" },
  { code: "+371", label: "+371 (LV)" },
  { code: "+372", label: "+372 (EE)" },
];

const AI_USE_CASES = [
  "Customer Support & Chatbots",
  "Content Generation",
  "Data Analysis & Insights",
  "Sales & Lead Generation",
  "Code Generation & Development",
  "Document Processing",
  "Email Automation",
  "Research & Information Gathering",
  "Image & Video Processing",
  "Voice & Speech Recognition",
  "Workflow Automation",
  "Other",
];

async function verifyEmailDomain(email: string): Promise<boolean> {
  try {
    const res = await fetch("/api/waitlist/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    });
    const data = (await res.json()) as { ok?: boolean };
    return data.ok === true;
  } catch {
    return false;
  }
}

function isValidTextContent(text: string): boolean {
  const trimmed = text.trim();
  if (trimmed.length < 10) return false;

  // Check for vowel content (at least 20% vowels to detect gibberish)
  const vowels = trimmed.match(/[aeiouAEIOU]/g) || [];
  const vowelRatio = vowels.length / trimmed.length;
  if (vowelRatio < 0.15) return false;

  // Check for word-like patterns (spaces or common punctuation)
  const hasSpaces = trimmed.includes(" ");
  const hasCommas = trimmed.includes(",");
  const hasPeriods = trimmed.includes(".");
  const hasParentheses = trimmed.includes("(") || trimmed.includes(")");

  // At least has proper spacing or punctuation
  if (!hasSpaces && !hasCommas && !hasPeriods && !hasParentheses) return false;

  // If has spaces, ensure average word length is reasonable (3-20 chars)
  if (hasSpaces) {
    const words = trimmed.split(/\s+/);
    const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length;
    if (avgWordLength < 2.5 || avgWordLength > 25) return false;
  }

  return true;
}

async function sendEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  roleOther: string;
  howHeardAboutUs: string;
  howHeardAboutUsOther: string;
  monthlySpending: string;
  aiTasksPrimary: string;
  aiTasks: string;
  aiTasksOther: string;
  phone?: string;
}) {
  try {
    const res = await fetch("/api/priority-access/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}

type Skin = "dark" | "light";

export function PriorityAccessForm({ skin = "dark", className }: { skin?: Skin; className?: string }) {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    roleOther: "",
    howHeardAboutUs: "",
    howHeardAboutUsOther: "",
    phoneCode: "+1",
    phone: "",
    currency: "USD",
    monthlySpending: "",
    aiTasksPrimary: "",
    aiTasks: "",
    aiTasksOther: "",
  });

  const [error, setError] = React.useState<string | null>(null);
  const [state, setState] = React.useState<"idle" | "loading" | "done">("idle");

  const isDark = skin === "dark";
  const field =
    isDark
      ? "w-full border-0 border-b border-white/15 bg-transparent py-3.5 text-[16px] text-white outline-none placeholder:text-[#E8D5F5]/35 focus:border-[#A78BFA]/70 focus:ring-0"
      : "w-full border-0 border-b border-slate-300 bg-transparent py-3.5 text-[16px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#1A3A5C] focus:ring-0 dark:border-slate-600 dark:text-slate-100 dark:placeholder:text-slate-500";

  const selectField =
    isDark
      ? "w-full border-0 border-b border-white/15 bg-transparent py-3.5 text-[16px] text-white outline-none focus:border-[#A78BFA]/70 focus:ring-0 [&>option]:bg-[#1C1658] [&>option]:text-white"
      : "w-full border-0 border-b border-slate-300 bg-transparent py-3.5 text-[16px] text-slate-900 outline-none focus:border-[#1A3A5C] focus:ring-0";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (state !== "idle") return;

    const n = normalizeName(formData.firstName);
    const em = formData.email.trim().toLowerCase();

    // Validation
    if (!n) {
      setError("First name is required.");
      return;
    }
    if (!normalizeName(formData.lastName)) {
      setError("Last name is required.");
      return;
    }
    if (!isValidEmailShape(em)) {
      setError("Enter a valid work email.");
      return;
    }
    if (!formData.company.trim()) {
      setError("Company name is required.");
      return;
    }
    if (!formData.role) {
      setError("Please select your role.");
      return;
    }
    if (formData.role === "Other" && !formData.roleOther.trim()) {
      setError("Please specify your role.");
      return;
    }
    if (formData.role === "Other" && formData.roleOther.trim().length < 3) {
      setError("Role must be at least 3 characters.");
      return;
    }
    if (!formData.howHeardAboutUs) {
      setError("How did you hear about us is required.");
      return;
    }
    if (formData.howHeardAboutUs === "Other" && !formData.howHeardAboutUsOther.trim()) {
      setError("Please specify how you heard about us.");
      return;
    }
    if (formData.howHeardAboutUs === "Other" && formData.howHeardAboutUsOther.trim().length < 3) {
      setError("Please provide more details (at least 3 characters).");
      return;
    }
    if (!formData.monthlySpending.trim()) {
      setError("Monthly spending is required.");
      return;
    }
    if (!formData.aiTasksPrimary) {
      setError("Please select your primary AI use case.");
      return;
    }
    if (formData.aiTasksPrimary === "Other" && !formData.aiTasksOther.trim()) {
      setError("Please specify your AI use case.");
      return;
    }
    if (formData.aiTasksPrimary === "Other" && formData.aiTasksOther.trim().length < 10) {
      setError("Please provide more details about your AI use case (at least 10 characters).");
      return;
    }
    const aiTasksText = formData.aiTasks.trim();
    if (!aiTasksText) {
      setError("Please describe your AI setup and goals.");
      return;
    }
    if (!isValidTextContent(aiTasksText)) {
      setError("Please provide meaningful details about your AI setup (avoid random text, use real words, proper spacing).");
      return;
    }

    setState("loading");

    // Verify email domain
    const isValidEmail = await verifyEmailDomain(em);
    if (!isValidEmail) {
      setState("idle");
      setError("Please use a real work email (no temporary inboxes).");
      return;
    }

    // Save to Supabase via API endpoint
    try {
      const saveRes = await fetch("/api/priority-access/save-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: n,
          last_name: normalizeName(formData.lastName),
          email: em,
          company: formData.company,
          role: formData.role === "Other" ? formData.roleOther : formData.role,
          how_heard_about_us: formData.howHeardAboutUs === "Other" ? formData.howHeardAboutUsOther : formData.howHeardAboutUs,
          monthly_spending: `${formData.currency} ${formData.monthlySpending}`,
          ai_tasks: `Primary: ${formData.aiTasksPrimary === "Other" ? formData.aiTasksOther : formData.aiTasksPrimary}\n\nDetails: ${formData.aiTasks}`,
          phone: formData.phone.trim() ? `${formData.phoneCode} ${formData.phone.trim()}` : "",
        }),
      });

      const saveData = (await saveRes.json()) as { ok?: boolean; error?: string };

      if (!saveRes.ok || !saveData.ok) {
        setState("idle");
        console.error("Save error:", saveData.error);
        setError(`Failed to save: ${saveData.error || "Please try again."}`);
        return;
      }

      // Send internal notification email
      await sendEmail({
        firstName: n,
        lastName: normalizeName(formData.lastName),
        email: em,
        company: formData.company,
        role: formData.role,
        roleOther: formData.roleOther,
        howHeardAboutUs: formData.howHeardAboutUs,
        howHeardAboutUsOther: formData.howHeardAboutUsOther,
        monthlySpending: `${formData.currency} ${formData.monthlySpending}`,
        aiTasksPrimary: formData.aiTasksPrimary,
        aiTasks: formData.aiTasks,
        aiTasksOther: formData.aiTasksOther,
        phone: formData.phone.trim() ? `${formData.phoneCode} ${formData.phone.trim()}` : "",
      });

      // Create CRM lead with risk scoring + send user confirmation email
      await submitPriorityAccessForm({
        firstName: n,
        lastName: normalizeName(formData.lastName),
        email: em,
        company: formData.company,
        role: formData.role === "Other" ? formData.roleOther : formData.role,
        aiUseCase: formData.aiTasksPrimary === "Other" ? formData.aiTasksOther : formData.aiTasksPrimary,
        hearAboutUs: formData.howHeardAboutUs === "Other" ? formData.howHeardAboutUsOther : formData.howHeardAboutUs,
        currency: formData.currency,
        additionalDetails: formData.aiTasks,
        phone: formData.phone.trim() ? `${formData.phoneCode} ${formData.phone.trim()}` : "",
      });

      setState("done");
    } catch (err) {
      setState("idle");
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {state !== "done" ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-white/[0.08] bg-[#1C1658]/25 px-6 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm"
              noValidate
            >
              <div className="space-y-6">
                {/* Name Row */}
                <div className="grid grid-cols-2 gap-4">
                  <label>
                    <span className="sr-only">First name</span>
                    <input
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) => {
                        setFormData({ ...formData, firstName: e.target.value });
                        setError(null);
                      }}
                      disabled={state === "loading"}
                      className={field}
                    />
                  </label>
                  <label>
                    <span className="sr-only">Last name</span>
                    <input
                      type="text"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={(e) => {
                        setFormData({ ...formData, lastName: e.target.value });
                        setError(null);
                      }}
                      disabled={state === "loading"}
                      className={field}
                    />
                  </label>
                </div>

                {/* Email */}
                <label>
                  <span className="sr-only">Email</span>
                  <input
                    type="email"
                    placeholder="Work email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setError(null);
                    }}
                    disabled={state === "loading"}
                    className={field}
                  />
                </label>

                {/* Company */}
                <label>
                  <span className="sr-only">Company</span>
                  <input
                    type="text"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={(e) => {
                      setFormData({ ...formData, company: e.target.value });
                      setError(null);
                    }}
                    disabled={state === "loading"}
                    className={field}
                  />
                </label>

                {/* Phone */}
                <div className="flex gap-3">
                  <label className="w-[140px] shrink-0">
                    <span className="sr-only">Country code</span>
                    <select
                      value={formData.phoneCode}
                      onChange={(e) => {
                        setFormData({ ...formData, phoneCode: e.target.value });
                        setError(null);
                      }}
                      disabled={state === "loading"}
                      className={selectField}
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>{c.label}</option>
                      ))}
                    </select>
                  </label>
                  <label className="flex-1">
                    <span className="sr-only">Phone number</span>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        setError(null);
                      }}
                      disabled={state === "loading"}
                      className={field}
                    />
                  </label>
                </div>

                {/* Role */}
                <label>
                  <span className="sr-only">Role</span>
                  <select
                    value={formData.role}
                    onChange={(e) => {
                      setFormData({ ...formData, role: e.target.value, roleOther: "" });
                      setError(null);
                    }}
                    disabled={state === "loading"}
                    className={selectField}
                  >
                    <option value="">Select your role</option>
                    {ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </label>

                {/* Role - Other */}
                {formData.role === "Other" && (
                  <label>
                    <span className="sr-only">Specify your role</span>
                    <input
                      type="text"
                      placeholder="Please specify your role"
                      value={formData.roleOther}
                      onChange={(e) => {
                        setFormData({ ...formData, roleOther: e.target.value });
                        setError(null);
                      }}
                      disabled={state === "loading"}
                      className={field}
                    />
                  </label>
                )}

                {/* How heard about us */}
                <label>
                  <span className="sr-only">How did you hear about us?</span>
                  <select
                    value={formData.howHeardAboutUs}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        howHeardAboutUs: e.target.value,
                        howHeardAboutUsOther: "",
                      });
                      setError(null);
                    }}
                    disabled={state === "loading"}
                    className={selectField}
                  >
                    <option value="">How did you hear about us?</option>
                    {HOW_HEARD.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </label>

                {/* How heard about us - Other */}
                {formData.howHeardAboutUs === "Other" && (
                  <label>
                    <span className="sr-only">Specify how you heard about us</span>
                    <input
                      type="text"
                      placeholder="Please tell us how you found us"
                      value={formData.howHeardAboutUsOther}
                      onChange={(e) => {
                        setFormData({ ...formData, howHeardAboutUsOther: e.target.value });
                        setError(null);
                      }}
                      disabled={state === "loading"}
                      className={field}
                    />
                  </label>
                )}

                {/* Monthly Spending with Currency */}
                <div className="flex gap-3">
                  <label className="w-[100px]">
                    <span className="sr-only">Currency</span>
                    <select
                      value={formData.currency}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          currency: e.target.value,
                        });
                        setError(null);
                      }}
                      disabled={state === "loading"}
                      className={selectField}
                    >
                      {CURRENCIES.map((cur) => (
                        <option key={cur.code} value={cur.code}>
                          {cur.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex-1">
                    <span className="sr-only">Monthly spending amount</span>
                    <input
                      type="text"
                      placeholder="e.g., 500 / 1000 / 5000"
                      value={formData.monthlySpending}
                      onChange={(e) => {
                        // Only allow digits
                        const numericValue = e.target.value.replace(/[^0-9]/g, "");
                        setFormData({
                          ...formData,
                          monthlySpending: numericValue,
                        });
                        setError(null);
                      }}
                      disabled={state === "loading"}
                      className={field}
                    />
                  </label>
                </div>

                {/* AI Use Cases */}
                <label>
                  <span className="sr-only">AI use cases</span>
                  <select
                    value={formData.aiTasksPrimary}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        aiTasksPrimary: e.target.value,
                        aiTasksOther: "",
                      });
                      setError(null);
                    }}
                    disabled={state === "loading"}
                    className={selectField}
                  >
                    <option value="">Select primary AI use case</option>
                    {AI_USE_CASES.map((useCase) => (
                      <option key={useCase} value={useCase}>
                        {useCase}
                      </option>
                    ))}
                  </select>
                </label>

                {/* AI Use Case - Other */}
                {formData.aiTasksPrimary === "Other" && (
                  <label>
                    <span className="sr-only">Specify your AI use case</span>
                    <input
                      type="text"
                      placeholder="Please specify your primary AI use case"
                      value={formData.aiTasksOther}
                      onChange={(e) => {
                        setFormData({ ...formData, aiTasksOther: e.target.value });
                        setError(null);
                      }}
                      disabled={state === "loading"}
                      className={field}
                    />
                  </label>
                )}

                {/* Additional details textarea */}
                <label>
                  <span className="sr-only">Additional details</span>
                  <textarea
                    placeholder="Tell us more about your AI setup and goals (e.g., we're using Claude for customer support, processing 1000+ inquiries daily)..."
                    value={formData.aiTasks}
                    onChange={(e) => {
                      setFormData({ ...formData, aiTasks: e.target.value });
                      setError(null);
                    }}
                    disabled={state === "loading"}
                    rows={4}
                    className="w-full border-0 border-b border-white/15 bg-transparent py-3.5 text-[16px] text-white outline-none placeholder:text-[#E8D5F5]/35 focus:border-[#A78BFA]/70 focus:ring-0 resize-none"
                  />
                </label>
              </div>

              {error && (
                <p
                  className="mt-4 text-left text-[13px] leading-snug text-amber-200/90"
                  role="alert"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={state === "loading"}
                className="mt-8 flex h-12 w-full items-center justify-center rounded-xl text-[15px] font-bold text-white transition-transform hover:scale-[1.01] disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg, #2D1B69, #818CF8)",
                  boxShadow: "0 4px 24px rgba(129,140,248,0.2)",
                }}
              >
                {state === "loading" ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  "Request Priority Access"
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#1C1658]/25 px-6 py-12 text-center backdrop-blur-sm"
          >
            <svg width="56" height="56" viewBox="0 0 64 64" aria-hidden>
              <circle
                cx="32"
                cy="32"
                r="30"
                fill="none"
                stroke="#818CF8"
                strokeWidth="2"
                strokeOpacity="0.3"
              />
              <motion.path
                d="M20 32 L28 40 L44 24"
                fill="none"
                stroke="#818CF8"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </svg>
            <p className="text-lg font-bold text-white">
              Request received!
            </p>
            <p className="text-sm text-[#E8D5F5]/50">
              We&apos;ll review your request and reach out within 24 hours.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
