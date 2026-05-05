import React, { useMemo, useState } from "react";
import {
  fieldData,
  qbStrong,
  qbWeak,
  phases,
  reports,
  governanceQuestions,
  openQuestions,
  nextSteps,
} from "./data.js";

const iconPaths = {
  Search: "M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z",
  Database: "M4 6c0-1.66 3.58-3 8-3s8 1.34 8 3-3.58 3-8 3-8-1.34-8-3Zm0 0v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6",
  ArrowRight: "M5 12h14M13 5l7 7-7 7",
  BookOpen: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 0 4 19.5v-15Z",
  GitBranch: "M6 3v12M18 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6 21a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-6c6 0 6-3 6-6",
  BarChart3: "M3 3v18h18M7 16v-5M12 16V7M17 16v-8",
  ClipboardList: "M9 5h6M9 3h6v4H9V3ZM7 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M8 12h.01M11 12h5M8 16h.01M11 16h5",
  ShieldCheck: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10ZM9 12l2 2 4-5",
  CircleHelp: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM9.1 9a3 3 0 1 1 5.8 1c-.8 1.2-2.1 1.5-2.5 2.7M12 17h.01",
  CheckCircle2: "M22 11.1V12a10 10 0 1 1-5.9-9.1M9 11l3 3L22 4",
  AlertTriangle: "M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0ZM12 9v4M12 17h.01",
  UserRound: "M18 20a6 6 0 0 0-12 0M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
  DollarSign: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6",
  Mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm18 4-10 6L2 8",
  SlidersHorizontal: "M21 4H14M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4",
};

function Icon({ name, className = "h-5 w-5" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={iconPaths[name]} />
    </svg>
  );
}

const categories = ["All", ...Array.from(new Set(fieldData.map((item) => item.category)))];
const priorities = ["All", "Phase 1", "Phase 2", "Phase 3"];
const qbOptions = ["All", "Yes", "Partial", "Maybe", "No", "N/A"];

const systemRoles = [
  {
    icon: "UserRound",
    title: "Salesforce owns the relationship",
    items: ["Donor identity", "Cultivation strategy", "Stewardship", "Campaign history", "Next actions"],
  },
  {
    icon: "DollarSign",
    title: "QuickBooks owns the accounting truth",
    items: ["Deposits", "Revenue classification", "Reconciliation", "Transaction records", "Financial reporting"],
  },
  {
    icon: "Mail",
    title: "Mailchimp supports communication",
    items: ["Subscription status", "Email engagement", "Audience segments", "Campaign tags", "Marketing activity"],
  },
  {
    icon: "GitBranch",
    title: "Donation platforms feed activity",
    items: ["Online gifts", "Recurring donations", "Payment processor IDs", "Donor-entered details", "Campaign forms"],
  },
];

function Badge({ children, tone = "default" }) {
  const tones = {
    default: "border-neutral-300 bg-white text-neutral-800",
    dark: "border-black bg-black text-white",
    phase: "border-neutral-900 bg-neutral-100 text-neutral-950",
    yes: "border-neutral-900 bg-neutral-950 text-white",
    maybe: "border-neutral-300 bg-neutral-100 text-neutral-800",
    no: "border-neutral-300 bg-white text-neutral-500",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="mb-8 max-w-3xl">
      <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">{eyebrow}</div>
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">{title}</h2>
      {children && <p className="mt-4 text-base leading-7 text-neutral-600">{children}</p>}
    </div>
  );
}

function MetricCard({ label, value, note }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="text-3xl font-semibold tracking-tight text-neutral-950">{value}</div>
      <div className="mt-1 text-sm font-medium text-neutral-800">{label}</div>
      <div className="mt-2 text-xs leading-5 text-neutral-500">{note}</div>
    </div>
  );
}

function DataFlowCard({ step, title, text, showArrow }) {
  return (
    <div className="relative rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">{step}</div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-neutral-600">{text}</p>
      {showArrow && (
        <Icon name="ArrowRight" className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-white p-1 text-neutral-400 lg:block" />
      )}
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [priority, setPriority] = useState("All");
  const [quickbooks, setQuickbooks] = useState("All");

  const filteredFields = useMemo(() => {
    const q = query.trim().toLowerCase();
    return fieldData.filter((item) => {
      const matchesQuery = !q || Object.values(item).join(" ").toLowerCase().includes(q);
      const matchesCategory = category === "All" || item.category === category;
      const matchesPriority = priority === "All" || item.priority === priority;
      const matchesQuickBooks = quickbooks === "All" || item.quickbooks === quickbooks;
      return matchesQuery && matchesCategory && matchesPriority && matchesQuickBooks;
    });
  }, [query, category, priority, quickbooks]);

  const phaseOneCount = fieldData.filter((item) => item.priority === "Phase 1").length;
  const qbCount = fieldData.filter((item) => ["Yes", "Partial"].includes(item.quickbooks)).length;

  const resetFilters = () => {
    setQuery("");
    setCategory("All");
    setPriority("All");
    setQuickbooks("All");
  };

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-950">
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:px-8 lg:px-10 lg:py-16">
          <nav className="flex flex-wrap gap-3 text-sm text-neutral-600">
            {["Purpose", "Current State", "Field Database", "QuickBooks Mapping", "Reporting", "Open Questions"].map((item) => (
              <a key={item} href={"#" + item.toLowerCase().split(" ").join("-")} className="rounded-full border border-neutral-200 px-3 py-1.5 hover:border-neutral-950 hover:text-neutral-950">
                {item}
              </a>
            ))}
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <Badge tone="dark">Working system design resource</Badge>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-neutral-950 md:text-6xl">
                Individual Donor System Design Hub
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-700">
                A practical internal resource for designing a Salesforce-based individual donor system that connects relationship management, fundraising strategy, stewardship, accounting reconciliation, and marketing segmentation.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#field-database" className="inline-flex items-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800">
                  View field database <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
                </a>
                <a href="#quickbooks-mapping" className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-950 hover:border-black">
                  Review QuickBooks mapping
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <MetricCard label="Recommended fields" value={fieldData.length} note="Across donor identity, gifts, stewardship, integration, and strategy." />
              <MetricCard label="Phase 1 fields" value={phaseOneCount} note="Suggested starting point for the initial build and migration." />
              <MetricCard label="QB-related fields" value={qbCount} note="Fields with a strong or partial QuickBooks accounting parallel." />
              <MetricCard label="Core systems" value="4" note="Salesforce, QuickBooks, donation platform, and Mailchimp." />
            </div>
          </div>
        </div>
      </section>

      <section id="purpose" className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:px-10">
        <SectionHeading eyebrow="Purpose" title="Why this donor system matters">
          The goal is to create a more connected, strategic, and useful view of individual donors across fundraising, finance, marketing, and events. Salesforce should become the primary home for donor relationship management, while QuickBooks remains the source of truth for accounting and financial reconciliation.
        </SectionHeading>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["BookOpen", "Understand donors", "See who donors are, what motivates them, and how they are connected to the organization."],
            ["ClipboardList", "Manage next actions", "Turn donor records into a living system for follow-up, stewardship, and asks."],
            ["Database", "Create clean data", "Reduce scattered spreadsheets and design a structure that can support reporting over time."],
            ["ShieldCheck", "Support finance", "Align gifts, restrictions, batches, and transactions with QuickBooks without duplicating the accounting system."],
          ].map(([icon, title, text]) => (
            <div key={title} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <Icon name={icon} className="h-6 w-6 text-neutral-950" />
              <h3 className="mt-4 font-semibold text-neutral-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="current-state" className="border-y border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:px-10">
          <SectionHeading eyebrow="Current snapshot" title="Where the organization appears to be in developing the system">
            This section gives the data team a shared starting point. It should be refined as current exports, spreadsheets, and system owners are reviewed.
          </SectionHeading>
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <h3 className="font-semibold text-neutral-950">Current-state assumptions</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-neutral-700">
                <li>Individual donor information may currently live across spreadsheets, QuickBooks, donation tools, email lists, and staff knowledge.</li>
                <li>QuickBooks likely contains useful financial history but should not become the primary donor relationship system.</li>
                <li>Salesforce should be designed intentionally, not simply as a copy of old spreadsheets.</li>
                <li>Mailchimp and donation platforms should feed useful data into Salesforce without becoming competing databases.</li>
              </ul>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {systemRoles.map(({ icon, title, items }) => (
                <div key={title} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <Icon name={icon} className="h-5 w-5" />
                  <h3 className="mt-3 font-semibold">{title}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                    {items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <Icon name="CheckCircle2" className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="system-design-principles" className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:px-10">
        <SectionHeading eyebrow="Design principles" title="What each system should and should not do">
          The cleanest design keeps each system focused. Salesforce should answer fundraising and relationship questions. QuickBooks should answer accounting and reconciliation questions.
        </SectionHeading>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Salesforce should answer</h3>
            <p className="mt-4 rounded-xl bg-neutral-50 p-5 text-xl font-medium leading-8 text-neutral-950">
              “Who should we cultivate, why do they care, what should we ask for, and what should happen next?”
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">QuickBooks should answer</h3>
            <p className="mt-4 rounded-xl bg-neutral-50 p-5 text-xl font-medium leading-8 text-neutral-950">
              “Was the money received, classified correctly, deposited correctly, and reconciled?”
            </p>
          </div>
        </div>
      </section>

      <section id="data-flow" className="border-y border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:px-10">
          <SectionHeading eyebrow="Data flow" title="Recommended system architecture">
            The system should allow online and offline gifts to move through a consistent path while preserving clear ownership of donor relationship data and accounting data.
          </SectionHeading>
          <div className="grid gap-4 lg:grid-cols-4">
            <DataFlowCard step="1" title="Donor activity" text="Online gift, check, event attendance, referral, or staff interaction." showArrow />
            <DataFlowCard step="2" title="Salesforce record" text="Donor identity, campaign, gift, relationship owner, and stewardship workflow." showArrow />
            <DataFlowCard step="3" title="QuickBooks reconciliation" text="Transaction amount, fund, revenue category, deposit batch, and accounting record." showArrow />
            <DataFlowCard step="4" title="Communication loop" text="Mailchimp segments, impact updates, acknowledgments, and future engagement." />
          </div>
        </div>
      </section>

      <section id="field-database" className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:px-10">
        <SectionHeading eyebrow="Searchable field database" title="Recommended fields for donor system development">
          Use this database as a working inventory. The data team can review, accept, revise, or defer each field based on Salesforce architecture, integration constraints, reporting needs, and migration quality.
        </SectionHeading>

        <div className="sticky top-0 z-10 -mx-5 border-y border-neutral-200 bg-white/95 px-5 py-4 backdrop-blur md:-mx-8 md:px-8 lg:-mx-10 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-3 lg:grid-cols-[1fr_180px_160px_180px_auto]">
            <label className="relative block">
              <Icon name="Search" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by field, object, description, system, or mapping..."
                className="h-11 w-full rounded-xl border border-neutral-300 bg-white pl-10 pr-3 text-sm outline-none focus:border-black"
              />
            </label>
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-11 rounded-xl border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-black">
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <select value={priority} onChange={(event) => setPriority(event.target.value)} className="h-11 rounded-xl border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-black">
              {priorities.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <select value={quickbooks} onChange={(event) => setQuickbooks(event.target.value)} className="h-11 rounded-xl border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-black">
              {qbOptions.map((item) => <option key={item} value={item}>QB: {item}</option>)}
            </select>
            <button type="button" onClick={resetFilters} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 text-sm font-medium hover:border-black">
              <Icon name="SlidersHorizontal" className="h-4 w-4" /> Reset
            </button>
          </div>
          <div className="mx-auto mt-3 max-w-7xl text-sm text-neutral-600">
            Showing <span className="font-semibold text-neutral-950">{filteredFields.length}</span> of {fieldData.length} fields
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[1200px] w-full border-collapse text-left text-sm">
              <thead className="bg-neutral-100 text-xs uppercase tracking-wide text-neutral-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Field</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Object</th>
                  <th className="px-4 py-3 font-semibold">Field Type</th>
                  <th className="px-4 py-3 font-semibold">Purpose</th>
                  <th className="px-4 py-3 font-semibold">QB Parallel</th>
                  <th className="px-4 py-3 font-semibold">Priority</th>
                  <th className="px-4 py-3 font-semibold">Source of Truth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredFields.map((item) => (
                  <tr key={`${item.field}-${item.object}`} className="align-top hover:bg-neutral-50">
                    <td className="px-4 py-4 font-semibold text-neutral-950">{item.field}</td>
                    <td className="px-4 py-4"><Badge>{item.category}</Badge></td>
                    <td className="px-4 py-4 text-neutral-700">{item.object}</td>
                    <td className="px-4 py-4 text-neutral-700">{item.type}</td>
                    <td className="max-w-sm px-4 py-4 leading-6 text-neutral-700">{item.description}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-2">
                        <Badge tone={item.quickbooks === "Yes" ? "yes" : item.quickbooks === "No" ? "no" : "maybe"}>{item.quickbooks}</Badge>
                        <span className="max-w-xs text-xs leading-5 text-neutral-500">{item.quickbooksParallel}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4"><Badge tone="phase">{item.priority}</Badge></td>
                    <td className="px-4 py-4 text-neutral-700">{item.sourceOfTruth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredFields.length === 0 && (
            <div className="p-10 text-center text-neutral-600">No fields match the current filters.</div>
          )}
        </div>
      </section>

      <section id="quickbooks-mapping" className="border-y border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:px-10">
          <SectionHeading eyebrow="QuickBooks mapping" title="Fields that should and should not parallel QuickBooks">
            Not every Salesforce field needs a QuickBooks equivalent. Sync only what supports accounting, reconciliation, deposits, restrictions, and financial reporting.
          </SectionHeading>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <div className="flex items-center gap-3">
                <Icon name="CheckCircle2" className="h-5 w-5" />
                <h3 className="font-semibold">Strong QuickBooks parallels</h3>
              </div>
              <div className="mt-5 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
                {qbStrong.map(([sf, qb]) => (
                  <div key={sf} className="grid grid-cols-2 gap-4 p-4 text-sm">
                    <div className="font-medium text-neutral-950">{sf}</div>
                    <div className="text-neutral-600">{qb}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <div className="flex items-center gap-3">
                <Icon name="AlertTriangle" className="h-5 w-5" />
                <h3 className="font-semibold">Fields to keep in Salesforce</h3>
              </div>
              <div className="mt-5 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
                {qbWeak.map(([sf, reason]) => (
                  <div key={sf} className="grid grid-cols-2 gap-4 p-4 text-sm">
                    <div className="font-medium text-neutral-950">{sf}</div>
                    <div className="text-neutral-600">{reason}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="phase-1-vs-future-build" className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:px-10">
        <SectionHeading eyebrow="Implementation phases" title="Phase 1 versus future build">
          Prioritization prevents the project from becoming too large too quickly. Phase 1 should focus on clean records, gifts, acknowledgments, and reconciliation before moving into more advanced cultivation intelligence.
        </SectionHeading>
        <div className="grid gap-5 lg:grid-cols-3">
          {phases.map((item) => (
            <div key={item.phase} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <Badge tone="dark">{item.phase}</Badge>
              <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{item.focus}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.fields.map((field) => <Badge key={field}>{field}</Badge>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="reporting" className="border-y border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:px-10">
          <SectionHeading eyebrow="Reporting use cases" title="The fields should help the organization answer better questions">
            A field is only valuable if it supports a decision, process, workflow, or report. These reporting use cases can help the data team evaluate which fields are essential.
          </SectionHeading>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {reports.map((report) => (
              <div key={report.title} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <Icon name="BarChart3" className="h-5 w-5" />
                <h3 className="mt-3 font-semibold">{report.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                  {report.examples.map((example) => <li key={example}>• {example}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="data-governance" className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:px-10">
        <SectionHeading eyebrow="Data governance" title="Questions that should become system rules">
          These decisions should be made before the system is fully built. They will shape field requirements, permissions, imports, duplicate management, and integration design.
        </SectionHeading>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {governanceQuestions.map((question) => (
            <div key={question} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex gap-3">
                <Icon name="ShieldCheck" className="mt-0.5 h-5 w-5 shrink-0" />
                <p className="text-sm font-medium leading-6">{question}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="open-questions" className="border-y border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:px-10">
          <SectionHeading eyebrow="Open questions" title="Discussion prompts for the data team">
            This webpage should serve as a working design document. These questions can guide the next conversation with the data team and help identify what needs to be decided before implementation.
          </SectionHeading>
          <div className="grid gap-4 md:grid-cols-2">
            {openQuestions.map((question) => (
              <div key={question} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <div className="flex gap-3">
                  <Icon name="CircleHelp" className="mt-0.5 h-5 w-5 shrink-0" />
                  <p className="text-sm font-medium leading-6">{question}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="next-steps" className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:px-10">
        <SectionHeading eyebrow="Recommended next steps" title="How to move from design resource to implementation plan">
          The next step is to validate this field inventory against actual data sources, reporting requirements, Salesforce architecture, and finance workflows.
        </SectionHeading>
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {nextSteps.map((step, index) => (
              <li key={step} className="rounded-xl bg-neutral-50 p-4 text-sm leading-6 text-neutral-700">
                <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 text-sm text-neutral-500 md:px-8 lg:px-10">
          Individual Donor System Design Hub · Draft working resource for discussion with data, finance, development, and marketing teams.
        </div>
      </footer>
    </main>
  );
}

export default App;
