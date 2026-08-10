import type { GuidePageContent } from "@/content/types";

import { createLongGuide } from "./guide-builders";
import { applyGuideConsistency } from "./guide-consistency";
import { conveyancingCostsGuide } from "./conveyancing-costs-uk";
import { costsBeforeCompletionGuide } from "./costs-before-completion";
import { landRegistryFeesGuide } from "./land-registry-fees-uk";
import { createConsistentPriceGuide } from "./price-guide-builder";

const rawGuides: GuidePageContent[] = [
  createLongGuide({
    slug: "hidden-costs-buying-house",
    title: "Hidden Costs of Buying a House in the UK",
    description:
      "A detailed guide to the hidden costs of buying a house in the UK, including solicitor fees, conveyancing disbursements, searches, surveys, transfer fees, indemnity policies and the practical extras buyers often miss.",
    keywords: [
      "hidden costs buying house UK",
      "hidden costs of buying a house UK",
      "extra costs buying property UK",
      "hidden fees when buying property UK",
      "unexpected costs buying a house UK",
      "buying house fees breakdown UK",
      "solicitor fees buying house UK",
      "average conveyancing disbursements UK",
      "telegraphic transfer fee house purchase UK",
      "structural survey cost UK house",
      "homebuyers report vs structural survey cost UK",
      "local authority search fees UK",
      "local authority search fees UK breakdown",
      "drainage and water search cost UK",
      "environmental search cost UK property",
      "snagging survey cost UK new build",
      "snagging list price UK",
      "indemnity insurance costs UK property",
      "building regulations indemnity insurance cost UK",
      "chancel repair liability insurance cost UK",
      "cost of moving house UK"
    ],
    h1: "Hidden costs of buying a house in the UK",
    intro:
      "Hidden costs of buying a house in the UK are the additional upfront expenses beyond the deposit. These typically include solicitor fees, conveyancing disbursements, surveys, mortgage fees, moving costs and setup costs. Most buyers spend £3,000 to £10,000+ on these depending on the property, location and transaction complexity.",
    directAnswer:
      "The hidden costs UK house buyers most often miss are legal work, searches, surveys, mortgage charges, removals and the first setup costs after completion. They are planning estimates rather than fixed quotes, so the safest budget keeps a separate fee pot alongside the deposit.",
    introSections: [
      {
        title: "Typical hidden costs when buying a house in the UK",
        bullets: [
          "Solicitor and conveyancing fees",
          "Searches and disbursements",
          "Survey costs",
          "Mortgage arrangement and valuation fees",
          "Moving costs",
          "Insurance and setup costs"
        ]
      },
      {
        title: "Example hidden costs for a £300,000 property",
        paragraphs: [
          "For a £300,000 purchase, a buyer might plan for the following non-deposit costs before quotes are confirmed."
        ],
        bullets: [
          "Legal fees: ~£1,200",
          "Searches: ~£300",
          "Survey: £400 to £800",
          "Mortgage fees: £0 to £1,000+",
          "Moving and setup: £500 to £2,000+"
        ],
        callout:
          "These figures are planning estimates based on typical UK buying costs and should not be treated as fixed quotes."
      }
    ],
    contextualLinks: [
      { href: "/#calculator", label: "true cost of buying a house calculator" },
      { href: "/how-much-money-needed-buy-house", label: "how much money you need to buy a house" },
      { href: "/hidden-costs-buying-new-build-home-uk", label: "hidden costs of buying a new build home" },
      { href: "/stamp-duty-explained", label: "stamp duty explained" },
      { href: "/mortgage-fees-costs", label: "mortgage fees and costs" },
      { href: "/moving-costs-uk", label: "moving costs in the UK" }
    ],
    sections: [
      {
        title: "How much are hidden costs when buying a house in the UK?",
        paragraphs: [
          "Hidden costs are typically several thousand pounds on top of the deposit. For many mainstream purchases, £3,000 to £10,000+ is a sensible planning range before quotes are confirmed.",
          "The lower end is more realistic for a simple freehold purchase with a lighter survey, modest moving needs and few legal complications. The upper end becomes more likely when the property is older, leasehold, further away, or needs fuller survey and legal checks.",
          "These extra costs buying property UK buyers often forget are not all paid on one day. Some appear after offer accepted, some during conveyancing, and some immediately after move-in."
        ]
      },
      {
        title: "What hidden costs do first-time buyers miss?",
        paragraphs: [
          "First-time buyers often miss costs that sit outside the deposit and mortgage approval. Searches, conveyancing disbursements, survey upgrades, mortgage valuation fees, a mortgage arrangement fee, removals, insurance and first-week setup costs can all arrive before the purchase feels fully complete.",
          "First-time buyer relief can reduce or remove some property tax in certain situations, but it does not remove the wider buying bill. Buyers still need to check stamp duty bands or regional property tax rules for their location and price point.",
          "MoneyHelper provides consumer guidance on common home buying and moving costs, which can be useful when you want to sense-check whether your own fee list is missing the practical extras.",
          "A simple way to avoid surprises is to hold a separate fee pot. That pot should sit alongside the deposit rather than being treated as spare money."
        ]
      },
      {
        title: "Why do hidden costs vary so much between purchases?",
        paragraphs: [
          "Hidden costs vary because no two purchases have the same legal, survey, lending and moving profile. A modern freehold home can be cheaper to investigate than an older house, a leasehold flat or a property with missing paperwork.",
          "Location also matters. Property tax rules differ across England and Northern Ireland, Scotland and Wales, and search costs or moving costs can change by area and distance.",
          "The buyer's choices matter too. Choosing a fuller survey, paying for packing, using storage, or selecting a mortgage product with an upfront fee can all change the final cash needed."
        ]
      },
      {
        title: "Why hidden buying costs catch people out",
        paragraphs: [
          "Hidden costs are rarely hidden in the legal sense. The problem is that they appear in different places, at different times, and under labels that do not mean much to a buyer seeing them for the first time. Listings focus on the asking price. Mortgage illustrations focus on the loan. Solicitor quotes split legal work from disbursements. By the time those pieces are added together, the true total can look very different from the first savings target.",
          "This is why buyers ask about unexpected costs buying a house UK after they have already found a property. They know there must be more to the story than deposit plus stamp duty, but they do not always know what sits between the offer being accepted and the keys landing in their hand.",
          "The practical answer is to treat the purchase as a sequence of real cash calls rather than one single event. If a cost can be triggered by the transaction, it belongs in the transaction budget."
        ],
        callout:
          "Most buyers underestimate hidden costs because they focus on the deposit. In reality, legal fees, surveys, mortgage costs and moving expenses can add several thousand pounds to the upfront budget."
      },
      {
        title: "Solicitor fees and average conveyancing disbursements in the UK",
        paragraphs: [
          "Solicitor fees buying house UK is one of the most common search themes because the quote structure can be confusing. Most conveyancing quotes separate the solicitor's own legal fee from the disbursements they pay to third parties on your behalf. That means the cheapest-looking headline is not always the cheapest real total.",
          "Average conveyancing disbursements UK can include local authority searches, drainage and water searches, environmental checks, Land Registry fees, ID checks and the telegraphic transfer fee used to send money on completion. The exact mix varies by property and nation, but buyers should assume that the disbursement total is meaningful, not incidental.",
          "A sensible way to read a legal quote is to ask three questions. What is the solicitor charging for their own time? What third-party items are likely to be unavoidable? And which lines are still marked as estimates because the property details are not fully known yet?"
        ],
        table: {
          caption: "Common legal and disbursement lines buyers see on a purchase",
          columns: ["Cost line", "Type", "Typical planning range", "What it usually covers"],
          rows: [
            ["Solicitor legal fee", "Solicitor / conveyancing estimate", "£950 to £1,950+", "The lawyer's work on the transaction"],
            ["Search pack", "Solicitor / conveyancing estimate", "£180 to £430", "Local authority, drainage and environmental searches"],
            ["Telegraphic transfer fee", "Solicitor / conveyancing estimate", "£25 to £55", "Secure transfer of completion funds"],
            ["Registration fee", "Official charge", "£20 to £500+", "Official registration or filing fee"],
            ["ID, AML or admin checks", "Situation-dependent cost", "Usually modest but variable", "Compliance checks carried out by the firm"]
          ]
        }
      },
      {
        title: "Search fees: local authority, drainage and environmental checks",
        paragraphs: [
          "Local authority search fees UK breakdown is worth understanding because this is one area where buyers often see separate line items but no plain-English explanation. The local authority search checks matters such as planning history, road adoption, conservation issues and notices that could affect the property. The drainage and water search looks at connections to mains services, while the environmental search flags issues such as landfill, contamination or flood-related concerns depending on the provider and dataset.",
          "In practice, buyers usually pay for a bundle rather than going out to purchase each search separately. That makes the pack easier to compare, but it can also hide the fact that these are distinct checks serving different purposes.",
          "Search prices vary because councils, turnaround times, search providers and property-specific requirements vary. The headline lesson is simple: search fees are not optional admin clutter. They are part of the due diligence that tells you whether the property has issues the listing never mentioned."
        ]
      },
      {
        title: "Survey costs: HomeBuyer report, structural survey and new-build snagging",
        paragraphs: [
          "Structural survey cost UK house and homebuyers report vs structural survey cost UK are common searches because buyers often know they should pay for a survey but do not know which level is proportionate. A basic lender valuation is not the same thing as an independent survey. The valuation mainly protects the lender. A buyer's survey is there to warn you about the building itself.",
          "A modern flat in good visible condition may only justify a lighter-touch report. An older house, a property with visible cracking, non-standard construction or signs of damp can justify a fuller building or structural survey because the repair risk is much greater than the survey fee itself.",
          "New-build buyers have a slightly different version of the same problem. They may commission a snagging survey to identify defects before or soon after completion. Snagging survey cost UK new build is often not huge relative to the purchase price, but it can be valuable if it helps you document faults early and push the developer to fix them."
        ],
        bullets: [
          "Basic survey or lighter report: often from the mid-hundreds",
          "HomeBuyer or Level 2 survey: often from the mid- to high-hundreds",
          "Full building or structural survey: often around £900 to £2,000+",
          "Snagging survey or snagging list support on a new build: extra but often worthwhile"
        ]
      },
      {
        title: "Indemnity insurance, title issues and overlooked extras",
        paragraphs: [
          "Indemnity insurance costs UK property can appear suddenly if a title or paperwork issue needs a quick solution. Building regulations indemnity insurance cost UK and chancel repair liability insurance cost UK are examples of the niche-looking policies buyers may meet when paperwork is incomplete or a specific historic risk needs to be insured rather than solved in a slower way.",
          "These policies are not universal. Some buyers never see them. Others are offered one because an extension lacks the right certificate, a title issue needs to be covered, or a lender wants extra comfort. The key point is not to assume that every indemnity policy is a scam or that every title issue means disaster. Often it is just another line item that should be understood and costed.",
          "The same principle applies to move-in practicalities. Cost of moving house UK, lock changes, cleaning, storage or broadband setup may not sit on the solicitor's statement, but they still affect the true budget needed to complete and settle into the property safely."
        ]
      }
    ],
    faqs: [
      {
        question: "What hidden costs do buyers forget most often in the UK?",
        answer:
          "Searches, solicitor disbursements, surveys, mortgage fees, telegraphic transfer fees and move-in practical costs are among the most commonly forgotten buying costs."
      },
      {
        question: "How much should I budget for solicitor fees when buying a house in the UK?",
        answer:
          "A straightforward purchase often lands around £950 to £1,950 or more for legal fees, with disbursements and VAT on top."
      },
      {
        question: "What is the difference between a HomeBuyer report and a structural survey?",
        answer:
          "A HomeBuyer-style report is lighter and suits many mainstream homes, while a structural or building survey is more detailed and often better for older or riskier properties."
      },
      {
        question: "Do new-build buyers need to budget for snagging costs?",
        answer:
          "They often should. A snagging survey or snagging list support can be a useful extra line in the budget if the buyer wants defects documented properly."
      }
    ],
    relatedGuides: [
      "hidden-costs-buying-new-build-home-uk",
      "first-year-cost-buying-house-uk",
      "how-much-money-needed-buy-house",
      "stamp-duty-explained",
      "mortgage-fees-costs",
      "leasehold-costs-uk",
      "moving-costs-uk"
    ],
    officialSourceKeys: [
      "moneyHelperBuyingMoving",
      "moneyHelperHomeBuying",
      "govUkSdltGuide"
    ],
    sourceKeys: ["sdlt", "lbtt", "ltt", "hmlr"],
    ctaTitle: "See the hidden costs in one total",
    ctaText:
      "Use the calculator to combine deposit, tax and the hidden extras buyers usually underestimate.",
    topicLabel: "hidden buying costs",
    buyerContext: "Buyer type, property age, tenure and location",
    costDrivers: [
      "legal complexity",
      "search pack pricing",
      "survey depth",
      "mortgage charges",
      "registration fees",
      "indemnity policies",
      "moving and setup costs"
    ],
    paymentRows: [
      ["After offer accepted", "Initial solicitor payment, survey, lender-related costs", "Early cash flow matters because some of these costs are spent before exchange"],
      ["During legal work", "Search packs, follow-up checks, extra reports", "Disbursements often appear gradually rather than all at once"],
      ["Just before completion", "Deposit balance, tax, final legal fees and transfer fee", "This is usually the largest concentrated payment stage"],
      ["Immediately after move-in", "Removals, locks, cleaning, setup", "Still part of the true cost of buying even if not on the legal statement"]
    ],
    comparisonCaption: "Why one buyer's hidden-cost total can look very different from another's",
    comparisonRows: [
      ["Modern freehold home", "Lower legal complexity and lighter survey needs are more common", "Hidden-cost total may stay nearer the lower end of the range"],
      ["Older property", "Survey depth and legal follow-up often increase", "Buyers should allow more contingency"],
      ["Leasehold flat", "Extra management and lease-related administration can appear", "The legal bill is often less simple than it first looked"],
      ["New build", "Snagging and utility or service setup may become more relevant", "Some costs shift rather than disappear"]
    ],
    workedExampleCaption: "Hidden-cost planning examples excluding the deposit itself",
    workedExampleRows: [
      ["£250,000 first-time buyer flat", "About £2,500 to £5,000", "Searches, survey, mortgage fees and a buffer still matter even if tax relief helps"],
      ["£300,000 home mover house", "About £3,000 to £5,800", "Survey, moving and legal variation often drive the spread"],
      ["£400,000 older family home", "About £3,800 to £7,500+", "A fuller survey and higher legal complexity can change the number quickly"]
    ],
    officialItems: ["property tax", "published registration fee scales where applicable"],
    estimateItems: ["legal quotes", "search packs", "survey costs", "mortgage costs", "indemnity policies", "moving expenses"],
    mistakes: [
      "Assuming the deposit and tax are the only meaningful buying costs",
      "Treating a lender valuation as a full survey",
      "Using a headline legal quote without checking disbursements",
      "Leaving move-in spending out of the buying budget"
    ],
    checklist: [
      "Read solicitor quotes with disbursements and VAT in mind",
      "Choose a survey level that matches the property's age and condition",
      "Ask whether any leasehold, new-build or title-specific extras are likely",
      "Keep a buffer for small but common end-of-process costs",
      "Cross-check official charges before exchange and completion"
    ]
  }),
  createLongGuide({
    slug: "hidden-costs-buying-new-build-home-uk",
    title: "Hidden Costs of Buying a New Build Home in the UK",
    description:
      "Explain the hidden costs of buying a new build home in the UK, including reservation fees, upgrades, snagging surveys, estate charges, service charges and first-year costs.",
    keywords: [
      "hidden costs of buying a new build home",
      "hidden costs of buying a new build",
      "new build hidden costs",
      "unexpected costs of a new build",
      "extra costs when buying a new build",
      "costs after buying a new build",
      "new build home buying costs",
      "new build fees and charges",
      "new build reservation fee",
      "new build snagging survey",
      "new build estate management fees"
    ],
    h1: "Hidden Costs of Buying a New Build Home in the UK",
    intro:
      "New build homes can look simple because there is no onward chain and the property is brand new. Buyers may still face extra costs that are not obvious at first, especially where developer marketing focuses on the headline price or show home finish.",
    directAnswer:
      "The hidden costs of buying a new build home can include a reservation fee, developer upgrades, flooring, appliances, a snagging survey, estate management fees, service charges, furnishing, landscaping, moving costs and first-year ownership costs. These are planning estimates rather than fixed quotes, so buyers should check exactly what is included before reserving.",
    introSections: [
      {
        title: "Common hidden costs of buying a new build home",
        intro:
          "The table below gives rough planning ranges only. Actual new build fees and charges depend on the developer, plot, specification, tenure, location and what is included in the sale price.",
        table: {
          caption: "Common hidden costs of buying a new build home",
          columns: ["Cost", "Typical estimate", "Why it matters"],
          rows: [
            ["Reservation fee", "£500 to £2,000", "Secures the plot but may have refund rules and deadlines"],
            ["Developer upgrades", "£1,000 to £10,000+", "Show home features are not always included in the base price"],
            ["Flooring", "£2,000 to £6,000+", "Some homes are sold without full flooring or with limited choices included"],
            ["Snagging survey", "£300 to £700", "Helps identify defects before or soon after completion"],
            ["Estate management fees", "£100 to £500+ per year", "Can cover private roads, green spaces, drainage or shared areas"],
            ["Service charges", "Varies widely", "More common for flats, apartments and some leasehold homes"],
            ["Landscaping / turfing", "£500 to £5,000+", "Gardens may be basic, unfinished or sold with upgrade choices"],
            ["Furnishing", "£3,000 to £15,000+", "A brand-new empty home may need blinds, curtains, furniture and appliances"],
            ["Moving costs", "£500 to £2,000+", "Removal, storage and setup costs still apply even with no onward chain"]
          ]
        }
      }
    ],
    contextualLinks: [
      { href: "/#calculator", label: "TrueHomeCosts calculator" },
      { href: "/hidden-costs-buying-house", label: "hidden costs of buying a house" },
      { href: "/first-year-cost-buying-house-uk", label: "first-year cost of buying a house" },
      { href: "/how-much-money-needed-buy-house", label: "how much money you need to buy a house" },
      { href: "/furnishing-costs-uk", label: "cost of furnishing a house" },
      { href: "/methodology", label: "how estimates work" }
    ],
    atGlance: [
      {
        label: "Main risk",
        value: "The headline price may not include the same finish, extras or ongoing estate costs buyers expect."
      },
      {
        label: "Typical extras",
        value: "Reservation fee, upgrades, flooring, snagging, estate charges, service charges, moving and setup."
      },
      {
        label: "Status",
        value: "Most figures are estimate-led planning ranges, not official charges or fixed quotes."
      },
      {
        label: "Buyers should check",
        value: "Reservation terms, included specification, management charges, lease terms and completion deadlines."
      }
    ],
    sections: [
      {
        title: "New build reservation fees",
        paragraphs: [
          "A new build reservation fee is a payment used to reserve a plot for a limited period while the buyer arranges the mortgage, solicitor and contract paperwork. A typical new build reservation fee is often around £500 to £2,000, although the amount and terms can vary.",
          "The fee may be deducted from the final purchase price if the purchase goes ahead. Buyers should still read the reservation agreement carefully because refund rules, exchange deadlines and cancellation terms can matter if the mortgage, survey or legal checks uncover a problem.",
          "Before paying, ask what happens if the developer changes the completion date, if your mortgage offer is delayed, or if legal documents reveal service charges or estate management fees that were not clear at the viewing stage."
        ]
      },
      {
        title: "Developer upgrades and optional extras",
        paragraphs: [
          "One of the biggest new build hidden costs is the gap between the base specification and the show home. Show homes often include upgraded kitchens, better flooring, fitted wardrobes, extra lighting, premium tiles, enhanced bathrooms and landscaped outdoor spaces that are not included in the standard price.",
          "Developer upgrades can include kitchen units, worktops, appliances, carpets, hard flooring, wall tiles, wardrobes, lighting, additional sockets, EV chargers, turfing, fencing and bathroom upgrades. Some buyers choose them for convenience, but they can quickly add thousands to the total.",
          "Ask for a written list of what is included in the base price and a separate price list for optional extras. That makes it easier to compare the advertised price with the home you are actually expecting to live in."
        ]
      },
      {
        title: "Flooring, appliances and finishing costs",
        paragraphs: [
          "Some buyers assume a new build will be move-in ready in every practical sense. In reality, some new homes may not include all flooring, blinds, curtains, upgraded appliances, fitted storage or garden finishes unless those are agreed separately.",
          "Flooring can be one of the most visible extra costs when buying a new build because the home may be shown with attractive finishes that are outside the base specification. Appliances can be similar: a brochure or show kitchen may not match the exact package included in the sale.",
          "The safest question is simple: what exactly is included in this plot at this price? Get the answer in writing before committing, especially if you are comparing a new build with an older home where flooring, curtains and appliances may already be present."
        ]
      },
      {
        title: "Snagging survey costs",
        paragraphs: [
          "A new build snagging survey checks a newly built property for defects, unfinished work, poor finishes or items that need attention. It is different from assuming everything must be perfect because the home is new.",
          "A typical new build snagging survey might cost around £300 to £700 depending on the size of the property, location and provider. It can help identify issues before completion or soon after moving in, giving the buyer a clearer written list to raise with the developer.",
          "Snagging does not mean the home is unsafe or badly built. It is a practical due-diligence step because even brand-new homes can have defects, missed finishes or workmanship issues that are easier to document early."
        ]
      },
      {
        title: "Estate management fees",
        paragraphs: [
          "New build estate management fees can be a major hidden cost because they may apply even to freehold houses. These charges can cover private roads, shared green spaces, drainage systems, play areas, communal landscaping, lighting or other estate features managed outside normal council maintenance.",
          "The annual amount can look modest at the start, but buyers should ask what it covers, who controls it, how it can increase and what happens if residents dispute the service level. A charge of £100 to £500+ per year can still matter when it sits on top of mortgage payments, council tax, insurance and utilities.",
          "Ask about the management company before reserving. Buyers should understand whether roads are adopted, what communal areas exist, how charges are collected and whether there are administration fees for late payment, resale packs or permissions."
        ]
      },
      {
        title: "Service charges and leasehold costs",
        paragraphs: [
          "Service charges are more relevant to flats, apartments and some leasehold houses, but they can also appear in wider managed developments. They may cover building insurance, communal cleaning, lifts, lighting, repairs, grounds maintenance, management fees and reserve funds.",
          "Service charges can vary significantly, so buyers should review the lease, management pack and budget carefully. A low initial charge is not a guarantee that future charges will stay low, especially if the building has lifts, shared heating, complex communal areas or future repair needs.",
          "Ground rent may apply in some cases depending on tenure and lease terms. Buyers should ask their solicitor to explain the lease, any ground rent position and how the service charge is calculated before exchange."
        ]
      },
      {
        title: "New build delays and temporary costs",
        paragraphs: [
          "New build completion dates can move. That does not mean every new build is delayed, but buyers should understand that construction timelines, inspections, utilities, legal paperwork and developer handover can shift.",
          "A delay can create temporary costs such as storage, rent overlap, extra moving costs or short-term accommodation. It can also become stressful if a mortgage offer is close to expiry and the lender needs updated information.",
          "Before reserving, ask how fixed the target completion date is, what notice you will receive and what happens if the date changes. A small contingency can make a moving delay less disruptive."
        ]
      },
      {
        title: "Furnishing and landscaping costs",
        paragraphs: [
          "A new build can be a blank canvas, but blank canvases cost money to make liveable. Buyers may need blinds, curtains, furniture, wardrobes, garden tools, appliances, storage, flooring upgrades, turf, patios, fencing or planting sooner than expected.",
          "Landscaping is easy to underestimate because the exterior can look complete from the front while the rear garden is basic, uneven or not yet practical for normal use. Turfing, patios, fencing and garden storage can quickly become part of the first-year budget.",
          "For a broader planning view, compare these lines with the cost of furnishing a house guide so the move-in budget is not swallowed by legal and completion costs alone."
        ]
      },
      {
        title: "Moving and first-year ownership costs",
        paragraphs: [
          "Moving costs still apply when buying a new build. Buyers may need removals, van hire, storage, cleaning, mail redirection, broadband setup, insurance and basic tools or small fixes.",
          "Costs after buying a new build can also include council tax, utilities, buildings insurance, contents insurance, maintenance items, furnishing, estate charges and service charges where relevant. Even if the property is new, the first year can still feel expensive because setup costs and ownership bills overlap.",
          "Use the first-year cost of buying a house guide and the how much money you need to buy a house guide to separate the legal completion total from the wider first-year cash requirement."
        ]
      },
      {
        title: "Example hidden costs on a £300,000 new build home",
        paragraphs: [
          "This is only an example. Actual costs depend on the developer, property type, location, specification and what is included in the sale price."
        ],
        table: {
          caption: "Example hidden costs on a £300,000 new build home",
          columns: ["Cost", "Example estimate"],
          rows: [
            ["Reservation fee", "£1,000"],
            ["Snagging survey", "£500"],
            ["Flooring upgrades", "£3,500"],
            ["Kitchen / appliance upgrades", "£2,500"],
            ["Landscaping / turfing", "£2,000"],
            ["Moving costs", "£1,000"],
            ["Furnishing / blinds / curtains", "£5,000"],
            ["Estimated extra costs", "£15,500"]
          ]
        },
        callout:
          "This example excludes the deposit, property tax, mortgage repayments and any site-specific service charge or estate management fee. It is a planning illustration, not a quote."
      },
      {
        title: "How to reduce the hidden costs of buying a new build",
        paragraphs: [
          "The best way to reduce unexpected costs of a new build is to turn vague assumptions into written details before you reserve. The earlier you know what is included, what is optional and what will be charged later, the easier it is to control the budget."
        ],
        bullets: [
          "Ask for a written list of what is included",
          "Compare the base price with the show home specification",
          "Check reservation fee terms, refund rules and deadlines",
          "Ask about estate charges before reserving",
          "Get a full list of optional extras and upgrade prices",
          "Budget for a snagging survey",
          "Check service charges and leasehold terms",
          "Keep a contingency fund for delays or setup costs",
          "Avoid spending the full deposit and savings pot on completion alone"
        ]
      },
      {
        title: "New build vs existing home hidden costs",
        paragraphs: [
          "New builds and existing homes can both have hidden costs, but the pattern is different. A new build may feel simpler because there is no chain and the home is newly built, while an existing home may have more obvious wear, repair and survey risks.",
          "For wider non-new-build examples, use the hidden costs of buying a house guide alongside this page."
        ],
        table: {
          caption: "New build hidden costs compared with existing home hidden costs",
          columns: ["New build hidden costs", "Existing home hidden costs"],
          rows: [
            ["Developer upgrades", "Repairs"],
            ["Snagging survey", "Maintenance"],
            ["Estate management fees", "Survey issues"],
            ["Flooring and optional extras", "Older boilers or electrics"],
            ["Landscaping", "Redecorating"],
            ["Possible completion delays", "Chain-related costs"]
          ]
        }
      }
    ],
    faqs: [
      {
        question: "What are the hidden costs of buying a new build home?",
        answer:
          "The hidden costs of buying a new build home can include reservation fees, optional upgrades, flooring, appliances, snagging surveys, estate management fees, service charges, landscaping, furnishing and moving costs. Some are one-off setup costs, while others can continue after completion."
      },
      {
        question: "How much extra should I budget for a new build home?",
        answer:
          "There is no single figure because the specification, developer, location and property type matter. A buyer might need several thousand pounds for upgrades, flooring, snagging, furnishing, moving and setup, with more needed if the home is larger or the base specification is limited."
      },
      {
        question: "Are new build homes more expensive than older homes?",
        answer:
          "Not always. New builds can reduce some repair risk, but they may come with upgrade costs, snagging costs, estate management fees and new setup costs. Older homes may have more maintenance, survey and repair risks instead."
      },
      {
        question: "Is a snagging survey worth it on a new build?",
        answer:
          "A snagging survey can be worthwhile because it gives the buyer a structured list of defects or unfinished items to raise with the developer. It is not mandatory, but many buyers use one to document issues before or soon after completion."
      },
      {
        question: "Do all new build homes have estate management fees?",
        answer:
          "No. Some new build homes have estate management fees and some do not. Buyers should ask before reserving because charges may apply to private roads, shared green spaces, drainage, play areas or communal landscaping."
      },
      {
        question: "Are developer upgrades worth paying for?",
        answer:
          "Developer upgrades can be convenient, especially for flooring, appliances or fitted items that are easier to install before move-in. They are not automatically good value, so buyers should compare the cost with independent quotes and decide which upgrades genuinely matter."
      },
      {
        question: "Can new build completion delays cost money?",
        answer:
          "Yes, delays can create costs such as storage, rent overlap, extra moving arrangements or mortgage offer extension issues. Not every new build is delayed, but buyers should keep a contingency fund because completion dates can move."
      }
    ],
    showFaqAnswersExpanded: true,
    relatedGuides: [
      "hidden-costs-buying-house",
      "first-year-cost-buying-house-uk",
      "how-much-money-needed-buy-house",
      "furnishing-costs-uk",
      "moving-costs-uk",
      "leasehold-costs-uk"
    ],
    officialSourceKeys: [
      "moneyHelperBuyingMoving",
      "moneyHelperHomeBuying"
    ],
    sourceKeys: ["hmlr"],
    includeGeneratedSections: false,
    includeGeneratedFaqs: false,
    ctaTitle: "Check new build costs against your full buying budget",
    ctaText:
      "Use the TrueHomeCosts calculator to combine the deposit, property tax, legal fees, moving costs and optional extras so the new build headline price does not hide the wider cash need.",
    topicLabel: "new build hidden costs",
    buyerContext: "Developer specification, plot type, tenure, estate charges and move-in needs",
    costDrivers: [
      "included specification",
      "developer upgrades",
      "snagging survey choice",
      "estate management charges",
      "service charge position",
      "furnishing and landscaping needs"
    ],
    paymentRows: [
      ["Reservation", "Reservation fee and early solicitor checks", "Buyers need to understand refund rules and deadlines"],
      ["Before exchange", "Mortgage work, legal checks, extras and snagging planning", "Some costs can be committed before the home is ready"],
      ["Completion", "Deposit balance, legal balance and any agreed extras", "The headline price may not show every setup cost"],
      ["After move-in", "Snagging follow-up, furnishing, landscaping and first-year bills", "New build costs can continue after completion"]
    ],
    comparisonCaption: "Why new build hidden costs vary by buyer and property",
    comparisonRows: [
      ["Basic specification house", "Fewer included finishes or appliances", "More budget may be needed for flooring, curtains and appliances"],
      ["Show-home style finish", "More upgrades selected", "The purchase can feel more expensive than the headline price"],
      ["Managed estate", "Shared areas and private infrastructure", "Annual estate management charges may apply"],
      ["Leasehold flat", "Service charge and lease terms matter", "Ongoing costs need careful review before exchange"]
    ],
    workedExampleCaption: "New build hidden-cost planning examples",
    workedExampleRows: [
      ["£300,000 new build home", "£15,500 example extras", "Shows how upgrades, snagging, landscaping and furnishing can add up"],
      ["Managed estate house", "Annual estate charge may apply", "Useful reminder to check ongoing charges before reserving"],
      ["Leasehold apartment", "Service charge varies widely", "Lease and management pack checks are essential"]
    ],
    officialItems: ["published registration-style fees where applicable"],
    estimateItems: [
      "reservation fees",
      "developer upgrades",
      "flooring",
      "snagging surveys",
      "estate management fees",
      "service charges",
      "landscaping",
      "furnishing and moving costs"
    ],
    mistakes: [
      "Assuming the show home specification is included in the base price",
      "Forgetting estate management fees or service charges",
      "Not budgeting for snagging, flooring, blinds or garden work",
      "Spending all available cash on the deposit and completion statement"
    ],
    checklist: [
      "Ask for the included specification in writing",
      "Check reservation terms before paying",
      "Request estate charge and service charge details before exchange",
      "Budget for snagging, furnishing, moving and first-year setup",
      "Keep a contingency fund for delays and practical move-in costs"
    ]
  }),
  createLongGuide({
    slug: "how-much-money-needed-buy-house",
    title: "How Much Money Do I Need to Buy a House in the UK?",
    description:
      "Work out how much money you need to buy a house in the UK, including the deposit, upfront fees, property tax, legal costs, surveys, mortgage charges, moving costs and a practical buffer.",
    keywords: [
      "how much money do I need to buy a house UK",
      "how much money needed to buy house UK",
      "how much savings needed to buy a house UK",
      "how much cash do you need to buy a house UK",
      "upfront costs buying a house UK",
      "what do you pay upfront when buying a house UK",
      "costs before exchange of contracts UK",
      "costs before buying a house UK",
      "when do you pay stamp duty UK",
      "when do you pay solicitor fees UK",
      "costs after offer accepted UK house",
      "deposit and fees to buy a house UK"
    ],
    h1: "How much money do I need to buy a house in the UK?",
    intro:
      "Use this guide to plan the deposit, fees and timing of the money needed from offer accepted through to completion and moving in.",
    directAnswer:
      "The money needed to buy a house in the UK is your deposit plus all upfront purchase costs. These can include stamp duty or regional property tax, solicitor fees, searches, surveys, mortgage fees, registration fees, moving costs and a sensible cash buffer. Many buyers need their deposit plus several thousand pounds more, with the final amount depending on property price, buyer type, location and transaction complexity.",
    introSections: [
      {
        title: "Typical money needed to buy a house in the UK",
        bullets: [
          "Deposit: often 5% to 20% of the property price",
          "Stamp duty or regional property tax where applicable",
          "Solicitor and conveyancing fees",
          "Searches and conveyancing disbursements",
          "Survey and valuation costs",
          "Mortgage arrangement or broker fees",
          "Registration and transfer fees",
          "Moving and setup buffer"
        ]
      },
      {
        title: "Example savings target for a £300,000 house",
        paragraphs: [
          "A buyer using a 10% deposit on a £300,000 house would need £30,000 for the deposit, then several thousand pounds more for the extra upfront costs around the purchase.",
          "Those extra costs may include property tax, solicitor fees, searches, a survey, mortgage charges, moving costs and a setup buffer. The realistic savings target is therefore higher than the deposit alone, and the final number should be checked against real quotes before you rely on it."
        ],
        bullets: [
          "10% deposit: £30,000",
          "Extra upfront costs: several thousand pounds more",
          "Typical extras: property tax, legal fees, searches, survey, mortgage charges, moving costs and setup buffer"
        ],
        callout:
          "These figures are planning estimates based on typical UK buying costs and should not be treated as fixed quotes."
      }
    ],
    contextualLinks: [
      { href: "/#calculator", label: "true cost of buying a house calculator" },
      { href: "/hidden-costs-buying-house", label: "hidden costs of buying a house" },
      { href: "/stamp-duty-explained", label: "stamp duty explained" },
      { href: "/first-time-buyer-costs", label: "first-time buyer costs" },
      { href: "/mortgage-fees-costs", label: "mortgage fees and costs" },
      { href: "/moving-costs-uk", label: "moving costs in the UK" }
    ],
    trustReviewedText:
      "Updated for 2026 where the relevant property tax rules, fee ranges and buying-cost assumptions have been reviewed for planning use.",
    sections: [
      {
        title: "How much deposit do you need to buy a house in the UK?",
        paragraphs: [
          "Many buyers need a deposit of 5% to 20% of the property price, depending on the mortgage, lender, buyer type and affordability position.",
          "A 5% deposit can be enough for some buyers, but it leaves less equity and may limit mortgage choice. A 10% deposit is a common planning benchmark, while 15% or 20% can give more breathing room if the buyer can reach it without draining the rest of their savings.",
          "The important point is that the deposit is not the full savings target. Buyers should keep a separate fee pot for legal work, survey costs, mortgage charges, moving costs and tax where applicable."
        ],
        table: {
          caption: "Deposit examples on common house prices",
          columns: ["Property price", "5% deposit", "10% deposit", "15% deposit"],
          rows: [
            ["£250,000", "£12,500", "£25,000", "£37,500"],
            ["£300,000", "£15,000", "£30,000", "£45,000"],
            ["£400,000", "£20,000", "£40,000", "£60,000"]
          ]
        }
      },
      {
        title: "How much extra money do you need beyond the deposit?",
        paragraphs: [
          "Beyond the deposit, many buyers need several thousand pounds more for upfront costs when buying a house in the UK.",
          "That extra money can cover solicitor and conveyancing fees, searches, conveyancing disbursements, survey costs, valuation fees, a mortgage arrangement fee or broker fee, registration fees and moving costs. If property tax applies, that can be one of the largest non-deposit lines.",
          "The exact amount depends on the property and location. Use the guide to hidden costs of buying a house to understand the smaller lines that can appear after an offer is accepted."
        ],
        bullets: [
          "Deposit",
          "Property tax where applicable",
          "Solicitor or conveyancing fees",
          "Search fees",
          "Survey costs",
          "Mortgage broker or lender charges",
          "Registration and transfer fees",
          "Moving and post-completion setup costs"
        ]
      },
      {
        title: "When do you need the money during the buying process?",
        paragraphs: [
          "You need some money shortly after offer accepted, more before exchange of contracts, and the largest amount around completion.",
          "Survey fees, mortgage valuation costs and initial solicitor money can be needed before the purchase is legally secure. Search fees and other legal outlays may follow while conveyancing is under way.",
          "The deposit balance, property tax, registration costs and final legal bill usually appear on the completion statement. If you are wondering when you pay stamp duty in the UK, the money is normally collected by the solicitor around completion where tax applies."
        ]
      },
      {
        title: "Costs after offer accepted on a UK house purchase",
        paragraphs: [
          "Once an offer is accepted, the purchase stops being a rough idea and starts becoming a sequence of decisions that trigger real spend. Survey choice, solicitor instruction, mortgage application costs and search fees all become concrete.",
          "Many buyers are surprised by how many costs after offer accepted on a UK house purchase arrive before the transaction feels secure. That is normal, but it means the fee pot needs to be ready before you feel close to completion.",
          "Tax should be checked early too. Stamp duty bands, regional property tax rules and first-time buyer relief can all change the completion budget, even though the payment is usually handled later through the solicitor."
        ],
        table: {
          caption: "Typical timing of buying costs",
          columns: ["Stage", "Likely costs", "Practical point"],
          rows: [
            ["Before or just after offer", "Broker work, valuation, initial legal money", "Good point to confirm what is refundable and what is not"],
            ["Before exchange", "Survey, searches, legal follow-up", "These are the costs buyers most often underestimate"],
            ["Completion stage", "Deposit balance, property tax, final legal and registration fees", "Usually the largest cash demand"],
            ["After completion", "Moving, locks, cleaning, utilities and furnishing", "Still matters if cash is tight after the move"]
          ]
        }
      },
      {
        title: "Worked examples for realistic savings targets",
        paragraphs: [
          "A realistic savings target is not about finding one number that works for everyone. It is about knowing which version of the purchase you are targeting. A £250,000 first-time buyer purchase with relief in England does not have the same profile as a £400,000 onward move in Wales or a Scottish purchase where LBTT applies differently.",
          "What stays constant is the principle: you need enough for the deposit plus the costs around it, and some of those surrounding costs will arrive before you feel safely over the line."
        ],
        table: {
          caption: "Simple planning examples",
          columns: ["Scenario", "Deposit example", "Likely extra upfront costs", "Main lesson"],
          rows: [
            ["£250,000 first-time buyer in England", "£25,000 at 10%", "A few thousand pounds more", "Relief can reduce tax but does not remove the wider buying bill"],
            ["£300,000 home mover in Scotland", "£30,000 at 10%", "Several thousand plus LBTT", "Tax and survey choice both matter"],
            ["£400,000 buyer in Wales", "£40,000 at 10%", "Higher legal, tax and move-in totals", "The real cash need is well above the deposit alone"]
          ]
        },
        callout:
          "Most buyers need more than the deposit. A safer savings target allows for legal fees, searches, surveys, mortgage charges, tax where applicable, moving costs and a buffer for early ownership expenses."
      }
    ],
    faqs: [
      {
        question: "How much cash do you need to buy a house in the UK?",
        answer:
          "You usually need more than the deposit. Buyers also need cash for property tax, legal fees, searches, surveys, mortgage costs and a practical buffer."
      },
      {
        question: "What do you pay before exchange of contracts in the UK?",
        answer:
          "Common pre-exchange costs include surveys, some mortgage-related fees, search fees and early solicitor payments."
      },
      {
        question: "When do you pay stamp duty in the UK?",
        answer:
          "It is usually dealt with by your solicitor around completion, with the money collected from you on the completion statement."
      },
      {
        question: "When do you pay solicitor fees in the UK?",
        answer:
          "Usually part at the start, part during the process for searches or other outlays, and the remainder before or on completion."
      }
    ],
    relatedGuides: [
      "first-year-cost-buying-house-uk",
      "hidden-costs-buying-house",
      "stamp-duty-explained",
      "first-time-buyer-costs",
      "mortgage-fees-costs",
      "moving-costs-uk"
    ],
    officialSourceKeys: [
      "moneyHelperBuyingMoving",
      "moneyHelperHomeBuying",
      "govUkSdltGuide"
    ],
    sourceKeys: ["sdlt", "lbtt", "ltt", "hmlr"],
    ctaTitle: "Turn a rough target into a real figure",
    ctaText:
      "Use the calculator to estimate the full cash needed for your purchase price, location and buyer type in one place.",
    topicLabel: "the total cash needed to buy a house",
    buyerContext: "Buyer type, property price and jurisdiction",
    costDrivers: [
      "deposit size",
      "property tax treatment",
      "survey needs",
      "legal and search costs",
      "mortgage fees",
      "move-in practical spending"
    ],
    paymentRows: [
      ["Before full commitment", "Survey, valuation, initial legal work", "Important because some spending starts before exchange"],
      ["During the transaction", "Searches and follow-up legal outlays", "This is where the budget starts to feel real"],
      ["On completion", "Deposit balance, tax, final legal and registry fees", "Usually the biggest one-day cash call"],
      ["Immediately after", "Moving and setup", "Often forgotten when savings targets are set too narrowly"]
    ],
    comparisonCaption: "Why the total cash target changes from one buyer to another",
    comparisonRows: [
      ["First-time buyer", "Potential reliefs may help, but furnishing and setup may be higher", "The purchase can still need several thousand pounds beyond the deposit"],
      ["Home mover", "No first-time relief and moving logistics may be heavier", "Tax and moving often dominate the difference"],
      ["Additional property buyer", "Higher-rate tax and larger deposit expectations are common", "Upfront cash can rise sharply"],
      ["Leasehold or older property", "Extra legal or survey complexity can appear", "The fee and buffer allowance should be stronger"]
    ],
    workedExampleCaption: "Worked examples buyers can compare with their own savings plan",
    workedExampleRows: [
      ["Starter-home budget", "Deposit plus a few thousand pounds more", "A realistic entry point for many mainstream first-time buyer plans"],
      ["Mid-market move", "Deposit plus several thousand and tax", "Common point where buyers realise the deposit is only part of the story"],
      ["Higher-value family move", "Significantly above the deposit alone", "Tax, legal complexity and move-in costs compound quickly"]
    ],
    officialItems: ["property tax", "published registration fees where relevant"],
    estimateItems: ["legal quotes", "survey costs", "search fees", "mortgage charges", "moving and furnishing budgets"],
    estimateMethodNote:
      "The estimate-based side includes legal quotes, survey costs, search fees, mortgage charges, moving costs and setup budgets. These numbers are useful for planning, but they should be treated as ranges until your solicitor, lender, surveyor and moving quotes confirm the exact figures.",
    mistakes: [
      "Setting a deposit goal without a separate fee pot",
      "Assuming all buying costs land only on completion day",
      "Ignoring post-offer spending that arrives before exchange",
      "Using the lowest online example as if it were your final number"
    ],
    checklist: [
      "Set separate savings targets for deposit, transaction costs and buffer",
      "Check what becomes payable before exchange",
      "Keep enough accessible cash for completion timing",
      "Review the solicitor's statement carefully before sending funds",
      "Stress-test the purchase at more than one cost assumption level"
    ]
  }),
  (() => {
    const guide = createLongGuide({
    slug: "stamp-duty-explained",
    title: "Stamp Duty Explained UK",
    description:
      "Stamp duty explained UK in plain English, including SDLT, LBTT, LTT, first-time buyer treatment, second-home costs and the main 2026 differences by nation.",
    keywords: [
      "stamp duty explained UK",
      "how much is stamp duty UK",
      "stamp duty UK calculator",
      "stamp duty England Scotland Wales difference",
      "SDLT explained UK",
      "LBTT and LTT explained"
    ],
    h1: "Stamp duty explained: UK property tax in plain English",
    intro:
      "Quick answer: stamp duty UK explained. Stamp duty is the property purchase tax buyers usually mean when they talk about buying in the UK, but the system changes by nation because England and Northern Ireland use SDLT, Scotland uses LBTT and Wales uses LTT. The final bill depends on the property price, buyer type and location, so a £300,000 purchase can produce no tax, a modest bill or a much heavier figure depending on the scenario.",
    directAnswer:
      "There is no single UK-wide stamp duty figure because England and Northern Ireland use SDLT, Scotland uses LBTT and Wales uses LTT. The tax is worked out in bands rather than one flat percentage, so the amount can change sharply when the property price, buyer type or location changes.",
    introSections: [
      {
        title: "What is stamp duty UK?",
        bullets: [
          "Stamp duty UK is the property purchase tax buyers usually mean when buying in England and Northern Ireland.",
          "SDLT is calculated in bands, not as a flat percentage on the whole property price.",
          "Scotland uses LBTT instead of SDLT, with its own thresholds and rates.",
          "Wales uses LTT, which means Welsh purchases should not be budgeted using SDLT examples.",
          "First-time buyer relief and additional-property rules can change the final bill materially."
        ]
      },
      {
        title: "UK property tax systems at a glance",
        intro:
          "The table below compares the three residential property-tax systems buyers usually need to understand before they rely on a stamp duty example.",
        table: {
          caption: "Stamp duty, LBTT and LTT compared simply",
          columns: ["System name", "Applies where", "Key difference", "First-time buyer treatment"],
          rows: [
            ["SDLT", "England and Northern Ireland", "Uses SDLT bands and separate higher-rate treatment for additional properties", "Relief may lower or remove SDLT for eligible first-time buyers"],
            ["LBTT", "Scotland", "Uses Scottish bands and the Additional Dwelling Supplement for relevant extra properties", "First-time buyers get a different nil-rate threshold within LBTT"],
            ["LTT", "Wales", "Uses Welsh rates and a separate higher residential structure", "No separate first-time buyer residential rate in the same way as SDLT"]
          ]
        }
      },
      {
        title: "How much is stamp duty in the UK?",
        paragraphs: [
          "Stamp duty is usually calculated by applying different tax rates to different slices of the purchase price, not by charging one percentage on the whole figure.",
          "A simple £300,000 example shows why buyers should use a proper tax calculation instead of assuming the top visible rate applies to everything."
        ],
        bullets: [
          "The first part of the price may fall into a nil-rate band",
          "The next slice may be taxed at a lower rate",
          "Only the portion above the next threshold moves into the higher band",
          "Buyer status and location can still change the total significantly"
        ]
      },
      {
        title: "Stamp duty examples by property price",
        intro:
          "These examples are planning summaries, not fixed quotes, but they show why a quick property-price comparison is so useful when you are budgeting.",
        bullets: [
          "£250,000: often £0 for an eligible first-time buyer in England, but buyer type and nation still matter",
          "£300,000: can be nil, modest or clearly noticeable depending on the tax system and buyer status",
          "£400,000: usually a point where the tax starts to feel more material in the full budget",
          "£500,000: often a significant tax line, especially for home movers or additional-property buyers"
        ],
        callout:
          "Use the true cost of buying a house calculator if you want the tax figure shown alongside deposit, legal fees, surveys and the rest of the buying budget rather than as a standalone tax estimate."
      }
    ],
    sections: [
      {
        title: "Stamp duty England (SDLT explained)",
        paragraphs: [
          "SDLT is the system used in England and Northern Ireland, and it is the reason many buyers search for stamp duty explained UK even though the wider UK has more than one tax system. In England and Northern Ireland, Stamp Duty Land Tax is handled through HMRC and GOV.UK guidance. SDLT works in bands, which means different slices of the purchase price are taxed at different rates.",
          "That matters because the answer to how much is stamp duty UK is never just one percentage. A buyer at £250,000, £300,000 or £400,000 can all face very different outcomes depending on whether they are a first-time buyer, home mover or additional-property buyer.",
          "This is also why a rough headline rate is not enough. Once a price crosses into the next SDLT band, only the slice above that threshold moves to the higher rate, not the whole purchase price. Buyers comparing the cost to buy a £250,000 house or the cost to buy a £300,000 house often see the difference most clearly once tax is set inside the full budget rather than treated as a side note."
        ],
        table: {
          caption: "England and Northern Ireland SDLT bands used by the site",
          columns: ["Band", "Rate", "How it works"],
          rows: [
            ["Up to £125,000", "0%", "No SDLT on this slice for standard residential purchases"],
            ["£125,001 to £250,000", "2%", "Applies only to this portion"],
            ["£250,001 to £925,000", "5%", "Main mid-range slice"],
            ["£925,001 to £1.5 million", "10%", "Higher-value band"],
            ["Above £1.5 million", "12%", "Top SDLT band"]
          ]
        }
      },
      {
        title: "Stamp duty Scotland (LBTT explained)",
        paragraphs: [
          "Scotland does not use SDLT. It uses Land and Buildings Transaction Tax, usually shortened to LBTT, and it has its own bands and first-time buyer treatment, so English stamp duty examples should not be copied onto a Scottish purchase.",
          "This is where buyers often get caught out when they search for stamp duty UK calculator and assume every result uses the same tax logic. A £300,000 or £400,000 purchase in Scotland may not behave like the same price in England and Northern Ireland because LBTT thresholds are different.",
          "LBTT also interacts with the Additional Dwelling Supplement for some additional-property purchases. That makes Scotland especially important to model separately if the buyer is not purchasing a main home in the standard way."
        ]
      },
      {
        title: "Stamp duty Wales (LTT explained)",
        paragraphs: [
          "Wales uses LTT rather than SDLT, which means the tax thresholds and rates are different again. Buyers looking for LBTT and LTT explained usually want to know whether Wales follows England closely; in practice, it should still be treated as its own calculation.",
          "LTT can change the full buying budget more than expected because Welsh thresholds are not just a minor variation on SDLT. A purchase price that feels moderate in one nation can produce a noticeably different tax line in Wales.",
          "This is one reason Welsh buyers should build the tax into their full moving budget early rather than assuming it can be checked at the last minute without affecting affordability. Buyers moving into higher price bands often find the difference especially clear when they compare the cost to buy a £450,000 house or the cost to buy a £500,000 house with the same price points elsewhere."
        ]
      },
      {
        title: "How first-time buyers and additional-property buyers change the tax",
        paragraphs: [
          "Buyer type is one of the biggest reasons stamp duty examples vary so much. An eligible first-time buyer may see relief or a lighter tax result, while a home mover usually pays the standard residential calculation and an additional-property buyer may face a noticeably heavier bill.",
          "That means the same property price can give very different answers to the question how much stamp duty on £300k UK. A first-time buyer in England might face no SDLT at that level, a home mover could pay a standard tax amount, and a second-home buyer could pay materially more.",
          "The same pattern applies across Scotland and Wales too, but through different rules. This is why SDLT explained UK, LBTT and LTT explained are best understood as separate systems that all respond to buyer status in different ways."
        ],
        table: {
          caption: "How buyer status changes the tax picture",
          columns: ["Buyer type", "What usually changes", "Why it matters"],
          rows: [
            ["First-time buyer", "Relief or different thresholds may apply in some nations", "The tax line can fall materially without changing the rest of the buying costs"],
            ["Home mover", "Standard residential treatment usually applies", "A good benchmark for mainstream stamp duty planning"],
            ["Additional-property buyer", "Higher-rate treatment may apply", "The tax can become one of the largest non-deposit lines in the budget"]
          ]
        }
      },
      {
        title: "Want an exact figure?",
        paragraphs: [
          "A cleaner way to budget is to calculate the tax alongside the deposit, solicitor fees, survey, mortgage costs and moving budget rather than treating tax as a separate afterthought.",
          "The true cost of buying a house calculator helps you test the property price, location and buyer type in one place so the tax figure sits inside the full upfront total, not beside it."
        ],
        callout:
          "If you are comparing common price points, the worked buying-cost pages for £250,000, £300,000, £350,000, £400,000, £450,000 and £500,000 can help you see how tax changes as the purchase price moves."
      },
      {
        title: "When do you pay stamp duty UK?",
        paragraphs: [
          "The buyer usually funds the tax through the solicitor around completion, rather than paying it casually at some later date. That is why stamp duty becomes a real cash-planning issue shortly before completion even if the estimate was discussed much earlier.",
          "In practice, the amount is usually shown on the completion statement alongside the other final buying costs. Buyers should not assume there will be lots of spare time after completion to find the money, because the legal timing is usually tight.",
          "This page is guidance only, so buyers should check the exact timing and amount with their solicitor or official sources before relying on any final figure."
        ]
      },
      {
        title: "Worked tax examples buyers can understand quickly",
        paragraphs: [
          "Examples work well on this topic because they show the practical gap between a headline search and a real transaction. Someone searching how much stamp duty do I pay on £250k or how much stamp duty on £300k UK usually wants a directionally correct answer before they move to a calculator.",
          "The examples below are deliberately simple. They show how the price point, buyer type and nation can change the tax without pretending that one example replaces a proper calculation."
        ],
        table: {
          caption: "Illustrative property tax examples",
          columns: ["Scenario", "Illustrative result", "Why it matters"],
          rows: [
            ["£250,000 first-time buyer in England", "Often £0 SDLT", "A common example of first-time buyer relief changing the answer materially"],
            ["£300,000 purchase", "May be nil, modest or higher depending on nation and buyer type", "Shows why a single UK-wide answer does not exist"],
            ["£400,000 family move", "Moderate tax is often expected", "This is where the tax line becomes harder to treat as a side note"],
            ["£500,000 purchase", "Often a significant tax bill", "Useful for buyers who need to stress-test the full upfront total"]
          ]
        }
      }
    ],
    faqs: [
      {
        question: "How much stamp duty do I pay on £250k?",
        answer:
          "It depends on the nation and buyer type. An eligible first-time buyer in England may pay £0 SDLT at £250,000, while a different buyer type or a different UK nation can produce another result."
      },
      {
        question: "How much stamp duty on £300k UK?",
        answer:
          "There is no single UK-wide answer. A £300,000 purchase may be nil, modest or more noticeable depending on whether the property is in England and Northern Ireland, Scotland or Wales and whether the buyer is a first-time buyer, mover or additional-property buyer."
      },
      {
        question: "Do first-time buyers pay stamp duty UK?",
        answer:
          "Sometimes, but not always. Relief can reduce or remove the tax in some systems, but the answer depends on the nation, the purchase price and whether the buyer meets the relevant first-time buyer rules."
      },
      {
        question: "When do you pay stamp duty UK?",
        answer:
          "It is usually handled through the solicitor around completion. Buyers normally need the money ready as part of the final completion funds rather than treating it as a later bill."
      },
      {
        question: "How is stamp duty calculated UK?",
        answer:
          "It is usually worked out in bands, with different slices of the purchase price taxed at different rates. The final answer also depends on the nation and the buyer type, so SDLT, LBTT and LTT should not be treated as interchangeable."
      }
    ],
    relatedGuides: [
      "regional-property-costs-uk",
      "how-much-money-needed-buy-house",
      "first-time-buyer-costs",
      "taxes-and-fees-uk"
    ],
    officialSourceKeys: [
      "govUkSdltGuide",
      "revenueScotlandLbttGuide",
      "govWalesLttGuide"
    ],
    sourceKeys: [],
    ctaTitle: "Check the tax within your full buying budget",
    ctaText:
      "Run the true cost of buying a house calculator to estimate SDLT, LBTT or LTT alongside deposit, legal fees, surveys and the other upfront costs buyers face.",
    topicLabel: "UK property purchase tax",
    buyerContext: "Jurisdiction, first-time buyer status and additional-property status",
    costDrivers: [
      "the nation where the property is located",
      "whether you are a first-time buyer",
      "whether the purchase counts as an additional property",
      "the purchase price itself"
    ],
    paymentRows: [
      ["Early budgeting", "Tax estimate only", "Useful for testing affordability before you offer"],
      ["After offer accepted", "Tax becomes a live completion-line item", "Your solicitor will usually incorporate it into the transaction budgeting"],
      ["Completion stage", "Buyer funds the solicitor for the tax payment", "This is when the number matters in hard cash terms"],
      ["Shortly after completion", "Filing and payment are normally handled promptly", "A reminder that timing is tight and should not be guessed at"]
    ],
    comparisonCaption: "How tax treatment changes by buyer and nation",
    comparisonRows: [
      ["England / NI first-time buyer", "Relief may lower or remove SDLT at some price points", "Useful where affordability is tight"],
      ["England / NI home mover", "Standard SDLT bands apply", "A straightforward benchmark for mainstream moves"],
      ["Scotland buyer", "LBTT thresholds and first-time buyer treatment differ", "English examples cannot simply be reused"],
      ["Wales buyer", "LTT thresholds differ and no separate first-time buyer residential rate applies in the same way", "Welsh buyers need Welsh calculations"]
    ],
    workedExampleCaption: "Practical property-tax examples buyers often compare",
    workedExampleRows: [
      ["£250,000 first-time buyer case", "May produce no SDLT in England", "Relief can materially change the all-in total"],
      ["£300,000 onward move case", "Property tax applies in each nation under different bands", "Cross-UK comparison matters"],
      ["£400,000 family home case", "Moderate tax is common", "This is often where buyers feel the difference more sharply"],
      ["£500,000 purchase case", "The tax can become a significant budget line", "A larger price point deserves a fuller budget check"]
    ],
    officialItems: ["SDLT rates", "LBTT rates", "LTT rates", "published higher-rate treatment rules"],
    estimateItems: ["the wider buying costs around the tax calculation, such as legal fees, surveys and moving costs"],
    trustReviewedText:
      "Updated for 2026 where the SDLT, LBTT and LTT rules used by the site are centrally maintained for planning purposes. Figures are guidance only, so buyers should check the final position with their solicitor or official sources before making decisions.",
    mistakes: [
      "Assuming one UK-wide stamp duty system exists",
      "Forgetting to check whether first-time buyer relief actually applies",
      "Using standard owner-occupier examples for second homes",
      "Treating tax as a minor extra instead of a core part of the upfront cash total"
    ],
    checklist: [
      "Confirm the property's nation before relying on a tax example",
      "Check whether first-time buyer or additional-property treatment applies",
      "Re-run the calculation if the purchase price changes",
      "Cross-check the final figure with the relevant official source before completion",
      "Include tax in the full buying budget, not as an afterthought"
    ]
    });

    return {
      ...guide,
      faqs: guide.faqs.slice(0, 5)
    };
  })(),
  createLongGuide({
    slug: "first-time-buyer-costs",
    title: "First-Time Buyer Costs in the UK",
    description:
      "A step-by-step guide to first-time buyer costs in the UK, covering deposits, forgotten fees, Lifetime ISA rules, common mistakes and the real cost of buying a first home.",
    keywords: [
      "first time buyer costs UK",
      "cost of buying first home UK step by step",
      "what costs do people forget when buying a house",
      "mistakes first time buyers make UK costs",
      "how much deposit do I need UK house",
      "LISA house purchase rules 2026"
    ],
    h1: "First-time buyer costs in the UK",
    intro:
      "First-time buyers usually know they need a deposit, but the real challenge is understanding the rest of the cash needed to get from offer accepted to move-in day without feeling stretched.",
    directAnswer:
      "Most first-time buyers need the deposit plus roughly £3,000 to £8,000 or more for the rest of the purchase, depending on price, location, survey choice and how much they need to spend after completion. Tax relief can help at some price points, but it does not remove the need for a separate savings pot for legal work, searches, mortgage setup and move-in basics.",
    sections: [
      {
        title: "The first-time buyer journey, step by step",
        paragraphs: [
          "Cost of buying first home UK step by step is best understood as a timeline rather than a list. The process begins with saving, a mortgage agreement in principle and a realistic price range. Once an offer is accepted, the spend becomes more immediate: legal instruction, survey choice, mortgage processing and then the final balance needed for exchange and completion.",
          "The trap for many first-time buyers is assuming that because they have never owned before, the process will be simple. In reality, lack of experience can make it harder to spot which costs are normal, which are negotiable and which are red flags.",
          "A calmer first purchase usually comes from over-explaining the budget to yourself early instead of discovering each cost one by one under time pressure."
        ],
        bullets: [
          "Save for deposit and fees separately",
          "Get an agreement in principle",
          "Make an offer and instruct a solicitor",
          "Pay for survey and lender-related charges",
          "Review the completion statement carefully",
          "Keep a move-in reserve for the first month after completion"
        ]
      },
      {
        title: "How much deposit do I need on a UK house?",
        paragraphs: [
          "How much deposit do I need UK house is a foundational question, but not the whole story. Many buyers aim for 5% to 10% depending on lender criteria, credit profile and affordability. A bigger deposit can help with rate options, but a first-time buyer should be wary of pouring every last pound into the deposit if that means having nothing left for surveys, fees or post-move shocks.",
          "A practical first-time buyer plan is not the biggest deposit you can technically scrape together. It is the biggest deposit you can put down while still keeping the rest of the transaction safe and affordable."
        ]
      },
      {
        title: "What costs do people forget when buying a house for the first time?",
        paragraphs: [
          "What costs do people forget when buying a house is one of the most common first-time buyer worries because there are so many lines that do not appear until later. Searches, surveys, mortgage product fees, bank transfer fees, moving costs and furnishing are the classic oversights.",
          "Buyers moving from a furnished rental often feel this particularly sharply. The purchase may be affordable on paper, but the first week in the property still requires curtains, cleaning equipment, some basic furniture and perhaps white goods if they are not included.",
          "That is why first-time buyer costs UK should always be treated as the total cost of getting into a liveable home, not just the legal cost of completing on paper."
        ],
        table: {
          caption: "First-time buyer costs that are commonly forgotten",
          columns: ["Cost area", "Why it is missed", "Why it matters"],
          rows: [
            ["Searches and legal disbursements", "Often hidden inside solicitor paperwork", "They are normal costs, not odd extras"],
            ["Survey", "Confused with the lender valuation", "A proper survey protects the buyer, not just the lender"],
            ["Mortgage fees", "Not every product advert highlights the full fee picture", "They can materially change the upfront total"],
            ["Move-in setup", "Seen as separate from buying", "It still affects how much cash you need around completion"],
            ["Furnishing", "Often delayed mentally until after the purchase", "The home still needs to function on day one"]
          ]
        }
      },
      {
        title: "LISA house purchase rules in 2026",
        paragraphs: [
          "LISA house purchase rules 2026 matter because a Lifetime ISA can be a powerful first-time buyer tool, but only when the purchase fits the rules and the money is withdrawn correctly through the conveyancing process. The bonus helps, but it should not create false confidence that the whole purchase budget is covered.",
          "A LISA is best thought of as deposit support. It does not replace the need for cash for surveys, legal fees, mortgage charges and the move-in period. Buyers who rely on it as if it solves every cash need can still find themselves under pressure later in the process.",
          "It is also worth speaking to your solicitor early about timing so the withdrawal works smoothly with the transaction."
        ]
      },
      {
        title: "Mistakes first-time buyers make with costs",
        paragraphs: [
          "Mistakes first time buyers make UK costs are usually simple rather than dramatic. They focus on the deposit, ignore the process costs, treat the lender valuation as if it were a full survey, and leave nothing in reserve for the first month after completion.",
          "Another common mistake is assuming that because you are buying a smaller or more modest property, the surrounding costs will also be tiny. Some will be lower, but many of the professional steps still need to happen regardless.",
          "The strongest first-time buyer plans are the ones that make room for normal friction instead of assuming a perfect transaction."
        ]
      }
    ],
    faqs: [
      {
        question: "What are the main first-time buyer costs in the UK?",
        answer:
          "The main costs are the deposit, property tax where applicable, legal fees, searches, survey costs, mortgage charges and a move-in buffer."
      },
      {
        question: "Do first-time buyers forget costs beyond the deposit?",
        answer:
          "Yes. Surveys, searches, transfer fees, mortgage costs and moving or furnishing budgets are often forgotten."
      },
      {
        question: "Does a Lifetime ISA cover all first-time buyer costs?",
        answer:
          "No. A Lifetime ISA can help with the deposit on an eligible purchase, but buyers still need cash for the wider transaction."
      },
      {
        question: "How much deposit do first-time buyers need in the UK?",
        answer:
          "It depends on the lender and the product, but many buyers benchmark 5% to 10% while also keeping a separate pot for fees."
      }
    ],
    relatedGuides: [
      "how-much-money-needed-buy-house",
      "hidden-costs-buying-house",
      "home-buying-schemes-uk",
      "furnishing-costs-uk"
    ],
    sourceKeys: ["sdlt", "lbtt", "ltt", "lisa"],
    ctaTitle: "Price your first-home budget properly",
    ctaText:
      "Use the calculator to compare first-time buyer totals across the UK with deposit and optional extras included.",
    topicLabel: "first-time buyer costs",
    buyerContext: "First-time buyer status, deposit size, property type and location",
    costDrivers: [
      "deposit percentage",
      "first-time buyer relief rules",
      "survey choice",
      "legal and mortgage fees",
      "furnishing and setup spend"
    ],
    paymentRows: [
      ["Early planning", "Deposit saving, agreement in principle work", "This is where unrealistic budgets should be corrected before an offer goes in"],
      ["After offer accepted", "Survey, valuation, initial legal payments", "New buyers often underestimate how soon real spending begins"],
      ["Before completion", "Deposit balance, tax and final legal total", "The largest single cash requirement usually sits here"],
      ["After moving in", "Furnishing and practical setup", "A major pressure point for buyers coming from furnished rentals"]
    ],
    comparisonCaption: "Why one first-time buyer's budget can look very different from another's",
    comparisonRows: [
      ["Buyer with strong deposit and family furniture support", "Needs less borrowed resilience and less furnishing spend", "The total may feel less pressured even at the same purchase price"],
      ["Buyer from furnished rental", "May need more setup spending after completion", "Move-in costs become much more important"],
      ["Buyer in England / NI with relief", "Property tax may be lower", "Total upfront cash may improve materially"],
      ["Buyer in Wales or at a price where relief is limited", "Tax may still be significant", "Assuming all first-time buyers pay no tax can be misleading"]
    ],
    workedExampleCaption: "Worked first-time buyer planning examples",
    workedExampleRows: [
      ["£250,000 first home", "Deposit plus several thousand pounds more", "A good example of how relief may help while fees still matter"],
      ["£300,000 first home", "Deposit plus tax or fee pressure depending on nation", "Useful for cross-UK comparisons"],
      ["£400,000 first home", "A much heavier total than the deposit alone suggests", "This is where first-time buyers often need to stress-test the budget carefully"]
    ],
    officialItems: ["property tax rules", "published registration fees where relevant", "official Lifetime ISA guidance"],
    estimateItems: ["survey costs", "legal fees", "mortgage charges", "furnishing and moving budgets"],
    mistakes: [
      "Treating the deposit as the whole goal",
      "Assuming the lender valuation replaces a full survey",
      "Ignoring furnishing and setup costs",
      "Relying on relief without checking the actual rule position"
    ],
    checklist: [
      "Keep the deposit and fee budget separate",
      "Check whether first-time buyer relief really applies",
      "Decide what level of survey suits the property",
      "Speak to your solicitor early if using a Lifetime ISA",
      "Protect a move-in buffer instead of draining every account for the deposit"
    ]
  }),
  createLongGuide({
    slug: "mortgage-fees-costs",
    title: "Mortgage Fees and Costs in the UK",
    description:
      "A practical guide to mortgage fees and costs in the UK, including broker fees, advice charges, booking fees, arrangement fees, valuation costs, ERCs and exit fees.",
    keywords: [
      "mortgage broker fees UK",
      "mortgage advice cost UK",
      "mortgage booking fee UK",
      "mortgage arrangement fees UK",
      "mortgage valuation fee UK",
      "valuation fee vs survey fee UK",
      "mortgage valuation fee vs home survey cost UK",
      "early repayment charge mortgage UK calculator",
      "mortgage exit fees UK"
    ],
    h1: "Mortgage fees and costs in the UK",
    intro:
      "The mortgage interest rate is only part of the story. Mortgage costs can also include broker fees, lender product fees, valuation charges and later charges such as early repayment fees or exit fees.",
    directAnswer:
      "Mortgage fees in the UK can range from nothing at all on a fee-light deal to around £2,500 or more if you use a paid broker, pick a product with a sizeable arrangement fee or pay lender valuation costs yourself. Some of those charges are paid upfront and some can be added to the loan, so the real question is not just how much they cost but how they affect both day-one cash and long-term borrowing.",
    sections: [
      {
        title: "Mortgage broker fees and mortgage advice cost in the UK",
        paragraphs: [
          "Mortgage broker fees UK and mortgage advice cost UK vary because brokers charge in different ways. Some charge the borrower directly. Others rely mainly on commission from the lender. Some do both. That means buyers should ask not only what the fee is, but what service they are receiving and whether the broker searches the wider market or a more limited panel.",
          "A broker fee is not automatically bad value. A paid adviser may still save a buyer money if they identify a product or structure that the buyer would otherwise have missed. The key is transparency rather than the assumption that fee-free automatically means better.",
          "MoneyHelper publishes consumer guidance on home buying costs, while the FCA regulates mortgage advice, mortgage broking and other financial firms in the UK. That gives buyers a useful split between budgeting guidance and regulatory context.",
          "The important budgeting point is that broker fees are often one of the first mortgage-related cash costs buyers meet, so they belong in early transaction planning."
        ]
      },
      {
        title: "Booking fees, arrangement fees and mortgage product charges",
        paragraphs: [
          "Mortgage booking fee UK and mortgage arrangement fees UK are sometimes treated as minor technicalities, but they can materially affect the true cost of the mortgage product. A product with a lower rate can still be more expensive overall if the fees are heavy and the buyer will not keep the loan long enough for the lower rate to compensate.",
          "Some buyers add the arrangement fee to the mortgage instead of paying it upfront. That can protect cash flow, but it also means borrowing more and usually paying interest on the fee over time.",
          "This is why comparing mortgage products by interest rate alone is incomplete. The fee structure matters too."
        ],
        table: {
          caption: "Common upfront mortgage fee types",
          columns: ["Fee type", "Type", "Can it be added to the loan?", "What to think about"],
          rows: [
            ["Broker fee", "Lender charge", "Usually no", "Check the service and whether the market search is broad enough"],
            ["Booking or application fee", "Lender charge", "Usually no", "Can reserve the product but may not be refundable"],
            ["Arrangement fee", "Lender charge", "Sometimes yes", "Compare it against the rate benefit and the likely loan term"],
            ["Valuation fee", "Lender charge", "Usually no", "Some lenders include a basic valuation, some do not"]
          ]
        }
      },
      {
        title: "Mortgage valuation fee vs home survey cost in the UK",
        paragraphs: [
          "Mortgage valuation fee UK and valuation fee vs survey fee UK are common search themes because buyers often hear both words and assume they mean the same thing. They do not. A mortgage valuation is mainly for the lender. It checks whether the property is suitable security at the agreed value. A home survey is for the buyer and focuses on the building's condition and likely repair issues.",
          "That is why mortgage valuation fee vs home survey cost UK should be treated as a comparison of purpose, not just price. Skipping an independent survey because the lender arranged a valuation can save money up front but create far larger repair costs later.",
          "In other words, the cheapest route through the mortgage process is not always the cheapest route through home ownership."
        ]
      },
      {
        title: "Early repayment charges and mortgage exit fees",
        paragraphs: [
          "Early repayment charge mortgage UK calculator and mortgage exit fees UK are usually later-stage questions, but they belong in product selection from day one. An early repayment charge can be much larger than the product fee if the buyer expects to move, remortgage or overpay heavily during the deal period.",
          "Exit fees tend to be smaller than ERCs, but they are still part of the wider product cost picture. Buyers who plan to stay for a very long time may care less. Buyers with likely life changes in the next few years should care more.",
          "The lesson is that mortgage fees are not only about what happens before completion. Some of the most important product costs are future-facing."
        ]
      }
    ],
    faqs: [
      {
        question: "What mortgage fees do buyers pay in the UK?",
        answer:
          "Common mortgage fees include broker fees, booking fees, arrangement fees and valuation charges, although not every product includes every fee."
      },
      {
        question: "Is a mortgage valuation the same as a survey?",
        answer:
          "No. The valuation is mainly for the lender, while the survey is for the buyer and focuses on condition."
      },
      {
        question: "Can I add an arrangement fee to the mortgage?",
        answer:
          "Sometimes yes, but it means borrowing more and usually paying interest on the fee over time."
      },
      {
        question: "Do early repayment charges matter when buying a home?",
        answer:
          "Yes. They are not usually part of the day-one completion bill, but they can make a mortgage product more expensive if you move or remortgage earlier than expected."
      }
    ],
    relatedGuides: [
      "hidden-costs-buying-house",
      "how-much-money-needed-buy-house",
      "first-time-buyer-costs",
      "insurance-costs-uk"
    ],
    officialSourceKeys: [
      "moneyHelperBuyingMoving",
      "moneyHelperHomeBuying",
      "fcaConsumers"
    ],
    sourceKeys: [],
    ctaTitle: "Add mortgage costs to the bigger buying budget",
    ctaText:
      "The homepage calculator includes a mortgage-fee allowance so you can see the effect on your upfront cash target.",
    topicLabel: "mortgage fees and product costs",
    buyerContext: "Broker choice, lender choice, product structure and expected time in the deal",
    costDrivers: [
      "broker charging model",
      "product fee structure",
      "valuation policy",
      "whether fees are paid upfront or added to the loan",
      "future early repayment risk"
    ],
    paymentRows: [
      ["Initial mortgage setup", "Broker fees and some application charges", "These can arrive before the purchase feels fully secure"],
      ["Lender processing stage", "Valuation or product-related charges", "Important to compare across products"],
      ["Completion stage", "Any unpaid lender-related fees due before drawdown", "Can affect how much cash is needed right at the end"],
      ["Later in the mortgage", "Early repayment charges or exit fees", "Not day-one cash, but still part of the product cost"]
    ],
    comparisonCaption: "Why one mortgage's fee structure can be better or worse for different buyers",
    comparisonRows: [
      ["Fee-free product", "Higher rate may compensate for lower upfront charges", "Better for buyers protecting day-one cash"],
      ["Low-rate, high-fee product", "Upfront or added-to-loan fee may be significant", "Can still work if the buyer keeps the deal long enough"],
      ["Buyer likely to move soon", "ERC risk matters more", "Future flexibility can be worth paying for"],
      ["Buyer with complex circumstances", "Broker advice may be more valuable", "The cheapest route is not always the safest route"]
    ],
    workedExampleCaption: "Worked ways mortgage costs can change the buying budget",
    workedExampleRows: [
      ["Fee-light product", "Lower upfront spend", "Helpful when cash for completion is tight"],
      ["Mid-fee product", "Balanced rate and fee profile", "Often the sensible comparison point"],
      ["High-fee but low-rate product", "Higher day-one or added-to-loan cost", "Needs a proper total-cost comparison over the expected deal period"]
    ],
    officialItems: ["lender-published product fees for the chosen mortgage"],
    estimateItems: ["broker charges", "some valuation costs", "future ERC impact if plans change"],
    mistakes: [
      "Comparing mortgage products on interest rate alone",
      "Treating the lender valuation as a buyer's survey",
      "Ignoring the effect of adding fees to the loan",
      "Overlooking early repayment charges when choosing a deal"
    ],
    checklist: [
      "Check whether the broker fee is borrower-paid, lender-paid or both",
      "Compare rate and fee together, not separately",
      "Decide whether the lender valuation is enough or a fuller survey is needed",
      "Read ERC conditions before committing to the product",
      "Add the mortgage-fee impact into the wider buying budget"
    ]
  }),
  createLongGuide({
    slug: "moving-costs-uk",
    title: "Moving Costs in the UK",
    description:
      "Budget for moving costs in the UK, including removal company prices, packing services, storage, mail redirection, locksmith work, cleaning, broadband and utility connection fees.",
    keywords: [
      "removal company costs UK 3 bed house",
      "packing services cost UK removals",
      "storage unit prices UK moving house",
      "redirecting mail cost UK Royal Mail",
      "locksmith prices UK new home",
      "cost of changing locks on new house UK",
      "cost of professional house cleaning UK move in",
      "broadband installation cost new home UK",
      "utility connection fees new build UK"
    ],
    h1: "Moving costs in the UK",
    intro:
      "Moving costs are often dismissed as a separate issue from buying costs, but for most households they land so close to completion that they should be budgeted together.",
    directAnswer:
      "Moving costs in the UK often start around a few hundred pounds for a small local move and can rise into the low thousands once you add a larger property, packing help, storage, cleaning or longer-distance removals. They do not sit on the solicitor's statement, but they still shape how much cash you need in completion week and the first few days after you move in.",
    sections: [
      {
        title: "Removal company costs for a typical UK move",
        paragraphs: [
          "Removal company costs UK 3 bed house vary because removals are driven by volume, distance, access, packing level and timing. A straightforward local move where the buyer is mostly packed can be relatively modest. A larger chain move with awkward access, heavy furniture, packing help and overnight storage can cost far more.",
          "This is why the cheapest quote is not always the best budget anchor. A removal price that excludes packing, dismantling, parking complications or waiting time can look attractive until the moving day becomes more complex than the quote assumed.",
          "MoneyHelper provides consumer guidance on buying and moving costs, which is helpful when you want to compare a removal quote with the wider move budget rather than judging the van price on its own.",
          "In practice, buyers should think about the move as a service package rather than a van price."
        ]
      },
      {
        title: "Packing services, storage and mail redirection",
        paragraphs: [
          "Packing services cost UK removals can be worth considering where time is tight, the household is large, or fragile items need professional packing. They add cost, but they can also reduce the stress and disruption of the move itself.",
          "Storage unit prices UK moving house become relevant when dates do not line up neatly or the new home is not ready for everything immediately. Even a short period of storage can add up once access charges, transport and insurance are considered.",
          "Redirecting mail cost UK Royal Mail is smaller by comparison, but it is a classic overlooked line that belongs in the move budget because it protects important post while addresses are still being updated."
        ]
      },
      {
        title: "Locksmith, cleaning and first-day practical costs",
        paragraphs: [
          "Locksmith prices UK new home and cost of changing locks on new house UK are practical costs rather than legal ones, but many buyers see them as essential. If you do not know who still has keys, a lock change is often one of the first security decisions made after completion.",
          "Cost of professional house cleaning UK move in is another line buyers underestimate. Some buyers can clean themselves, but where a home is empty, dusty, or simply not ready to move into comfortably, professional cleaning can be a sensible expense rather than a luxury.",
          "These are exactly the kind of costs that do not look huge on their own yet still matter to the total you need in the same week."
        ]
      },
      {
        title: "Broadband and utility connection fees on a new home",
        paragraphs: [
          "Broadband installation cost new home UK and utility connection fees new build UK matter because they sit in the awkward zone between moving costs and household setup. Existing homes may only need account changes or an engineer appointment. New-build homes or properties with unusual setups can require more active connection work and more waiting.",
          "The budget risk here is less about one giant bill and more about the cumulative effect of multiple small setup costs at the exact point when many buyers are least liquid.",
          "A realistic move-in budget therefore includes the first-week essentials, not just the removal van."
        ],
        table: {
          caption: "Moving cost categories buyers often underestimate",
          columns: ["Category", "Type", "Typical planning range", "What affects it"],
          rows: [
            ["Removal company", "Market estimate", "About £600 to £2,000+", "Property size, distance, access and timing"],
            ["Packing service", "Optional cost", "Often adds a few hundred pounds or more", "Volume of contents and how much help is needed"],
            ["Storage", "Situation-dependent cost", "Weekly or monthly charge plus transport", "Whether dates overlap or the new home is not ready"],
            ["Mail redirection", "Optional cost", "Smaller fixed cost", "Useful if post may still go to the old address"],
            ["Locks, cleaning, broadband and setup", "Optional cost", "Often from tens into the low hundreds per line", "How much needs doing immediately after completion"]
          ]
        }
      }
    ],
    faqs: [
      {
        question: "How much do removal companies cost for a three-bedroom house in the UK?",
        answer:
          "It depends on distance and service level, but many buyers budget from the high hundreds into the low thousands for a full family move."
      },
      {
        question: "Should I budget for changing locks on a new house?",
        answer:
          "Many buyers do. It is a common first-day security cost and is easy to forget during purchase budgeting."
      },
      {
        question: "Do broadband and utility setup costs count as moving costs?",
        answer:
          "Yes. They may not be legal buying fees, but they still affect the total cash needed to settle into the home."
      },
      {
        question: "When do storage costs become relevant during a move?",
        answer:
          "Usually when move dates do not line up neatly, the new property is not ready for all your belongings, or the chain creates timing problems."
      }
    ],
    relatedGuides: [
      "first-year-cost-buying-house-uk",
      "furnishing-costs-uk",
      "hidden-costs-buying-house",
      "insurance-costs-uk",
      "how-much-money-needed-buy-house"
    ],
    officialSourceKeys: [
      "moneyHelperBuyingMoving",
      "moneyHelperHomeBuying"
    ],
    sourceKeys: [],
    ctaTitle: "Add moving costs to the total, not just the to-do list",
    ctaText:
      "Switch moving costs on in the calculator to see the difference between a legal-only budget and a realistic move-in budget.",
    topicLabel: "moving costs",
    buyerContext: "Household size, distance, access, timing and property readiness",
    costDrivers: [
      "property size",
      "distance moved",
      "packing level",
      "need for storage",
      "lock and cleaning decisions",
      "broadband or utility setup work"
    ],
    paymentRows: [
      ["Pre-move planning", "Removal quotes, deposit for booking, optional packing support", "Useful to line up early in busy moving seasons"],
      ["Just before completion", "Final removal balance and service add-ons", "This often lands right when other buying costs peak"],
      ["Move-in week", "Locks, cleaning, mail redirect, broadband setup", "Small but common costs can add up quickly"],
      ["Shortly after move", "Storage continuation or extra setup spend", "Important where the move is phased rather than instant"]
    ],
    comparisonCaption: "Why moving costs vary so much from one household to another",
    comparisonRows: [
      ["Small local flat move", "Less volume and shorter distance", "Often the leanest removal budget"],
      ["Family move with children", "More volume, more coordination and more setup needs", "Packing and cleaning costs often matter more"],
      ["City move with access constraints", "Parking, stairs or time windows can complicate the quote", "Logistics can raise the total even on a short move"],
      ["New-build move", "Utility or service activation may be more relevant", "Move-in week can involve more setup steps than expected"]
    ],
    workedExampleCaption: "Worked moving-budget examples",
    workedExampleRows: [
      ["Small local move", "About £400 to £900", "Useful for a lean moving plan"],
      ["Typical family move", "About £900 to £1,800", "Shows how removals plus a few extras change the picture"],
      ["Complex or long-distance move", "£1,500 to £3,000+", "Storage, packing and access issues can compound quickly"]
    ],
    officialItems: ["published mail redirection prices or service provider prices where relevant"],
    estimateItems: ["removal quotes", "packing", "storage", "locksmith work", "cleaning", "broadband setup and similar practical costs"],
    mistakes: [
      "Treating moving costs as unrelated to the buying budget",
      "Using a bare-bones van quote as if it covered the whole move",
      "Ignoring lock changes, cleaning and setup work",
      "Assuming dates will align perfectly and storage will not be needed"
    ],
    checklist: [
      "Get removal quotes early if your dates are forming",
      "Decide whether you need packing support or storage",
      "Keep a first-week setup budget separate from the legal completion funds",
      "Check what broadband or utility work the property needs",
      "Include move-in practicals in the overall home-buying cash target"
    ]
  }),
  createLongGuide({
    slug: "insurance-costs-uk",
    title: "Insurance Costs for Home Buyers in the UK",
    description:
      "A guide to insurance costs for home buyers in the UK, including buildings insurance, life insurance, mortgage protection and landlord insurance for buy-to-let buyers.",
    keywords: [
      "buildings insurance cost UK first time buyer",
      "life insurance for mortgage cost UK",
      "mortgage protection insurance cost UK",
      "landlord insurance cost UK buy to let"
    ],
    h1: "Insurance costs for home buyers in the UK",
    intro:
      "Insurance is often treated as a separate household matter, but some policies need to be arranged around exchange or completion and can affect whether the purchase runs smoothly.",
    directAnswer:
      "Buildings insurance for a mainstream home often starts in the low hundreds per year and is commonly arranged before exchange or completion on a mortgaged purchase, while life insurance or mortgage protection is optional and can add a further monthly cost depending on age, health and cover level. The key distinction is that buildings cover is often part of getting the purchase safely over the line, whereas the other policies are risk-management choices for the household.",
    sections: [
      {
        title: "Buildings insurance cost for a UK first-time buyer",
        paragraphs: [
          "Buildings insurance cost UK first time buyer is often the first insurance question because mortgage lenders commonly expect buildings cover to be in place. On many freehold purchases, buyers are advised to have cover from exchange rather than waiting until they physically move in.",
          "The amount depends on the property, the rebuild cost, claims history, location, flood risk and the terms of the policy. That is why insurance is harder to summarise with one universal quote than tax or registry fees.",
          "MoneyHelper provides consumer guidance on the home-buying process, while the FCA regulates insurance firms and other financial services in the UK. Those two angles are useful when a buyer is weighing timing, cover type and affordability.",
          "Even so, it deserves a place in the budget because the timing can matter as much as the price."
        ]
      },
      {
        title: "Life insurance and mortgage protection costs",
        paragraphs: [
          "Life insurance for mortgage cost UK and mortgage protection insurance cost UK are usually optional rather than compulsory, but they matter to many households because the mortgage depends on one or two incomes continuing. For some buyers, especially families or single-income households, the question is not whether the cover is mandatory but whether the financial risk of having no cover is acceptable.",
          "Premiums vary with age, health, occupation, cover amount and policy design. That means these are not official costs in the same way as SDLT or HMLR fees, but they are still part of the real affordability conversation.",
          "If a buyer is stretching to purchase, even a modest monthly premium should be part of the wider cost plan rather than an afterthought."
        ]
      },
      {
        title: "Landlord insurance cost for UK buy-to-let buyers",
        paragraphs: [
          "Landlord insurance cost UK buy to let is a different question from owner-occupier buildings cover. The policy needs to reflect the fact that the property is rented out rather than occupied by the owner. That can change the risk profile and the level of cover needed.",
          "Buy-to-let buyers should therefore treat insurance as part of the investment case rather than a generic household bill. It affects cash flow, resilience and compliance with lender or tenancy expectations.",
          "This is one more reason why buy-to-let budgets should not be based on ordinary owner-occupier examples."
        ]
      },
      {
        title: "How buyers should budget for insurance during the purchase",
        paragraphs: [
          "Insurance rarely dominates the total upfront buying budget in the same way that deposit or tax can, but it matters because it appears at a time when cash is often already under strain. A modest allowance for the first premium or setup cost can prevent a small but awkward surprise.",
          "The safest approach is to ask what cover needs to exist before completion, what can wait until after move-in, and what optional cover the household is likely to want soon afterwards.",
          "That turns insurance from a vague future worry into a manageable line in the plan."
        ],
        table: {
          caption: "Common insurance types buyers compare around purchase time",
          columns: ["Policy type", "Type", "When buyers usually consider it", "Typical cost pattern"],
          rows: [
            ["Buildings insurance", "Market estimate", "Often before exchange or completion on a mortgaged purchase", "Annual premium often starts in the low hundreds"],
            ["Contents insurance", "Optional cost", "Usually around move-in or shortly after", "Varies with cover level and contents value"],
            ["Life insurance", "Optional cost", "Often reviewed once the mortgage offer is in place", "Monthly premium varies by age, health and cover amount"],
            ["Mortgage or income protection", "Optional cost", "Considered where the mortgage depends on one or two incomes", "Monthly premium varies widely with policy design"],
            ["Landlord insurance", "Market estimate", "Before tenancy use on a buy-to-let purchase", "Usually priced differently from owner-occupier cover"]
          ]
        }
      }
    ],
    faqs: [
      {
        question: "Do I need buildings insurance before completion?",
        answer:
          "Often buyers need it from exchange on freehold purchases, and lenders commonly expect cover to be in place before completion."
      },
      {
        question: "Is life insurance required for a mortgage in the UK?",
        answer:
          "Usually no, but many buyers still choose it as practical protection where the mortgage depends on their income."
      },
      {
        question: "Should insurance be included in the buying budget?",
        answer:
          "Yes, if you want a realistic total. It may not be a legal fee, but it still affects the cash needed around exchange and completion."
      },
      {
        question: "Do buy-to-let buyers need different insurance?",
        answer:
          "Yes. Landlord or buy-to-let insurance is usually more appropriate than ordinary owner-occupier cover."
      }
    ],
    relatedGuides: [
      "mortgage-fees-costs",
      "hidden-costs-buying-house",
      "moving-costs-uk"
    ],
    officialSourceKeys: [
      "moneyHelperHomeBuying",
      "fcaConsumers"
    ],
    sourceKeys: [],
    ctaTitle: "Add insurance only if you want a truer all-in figure",
    ctaText:
      "Toggle insurance on in the calculator when you want a broader planning number rather than the bare legal minimum.",
    topicLabel: "insurance costs around a home purchase",
    buyerContext: "Property type, lender expectations, household risk and whether the property is owner-occupied or rented",
    costDrivers: [
      "rebuild value",
      "location risk",
      "cover level",
      "household circumstances",
      "buy-to-let versus owner-occupier use"
    ],
    paymentRows: [
      ["Before exchange or completion", "Buildings insurance setup", "Often the key timing issue for mortgaged purchases"],
      ["Move-in period", "Optional life or protection cover decisions", "Many buyers review this once the mortgage is live"],
      ["Ongoing ownership", "Premiums continue as recurring costs", "Useful reminder that not every buying-related cost is one-off"],
      ["Buy-to-let setup", "Landlord cover arranged before tenancy use", "Important because the policy type differs from standard owner-occupier cover"]
    ],
    comparisonCaption: "How insurance needs vary by buyer and property type",
    comparisonRows: [
      ["Freehold owner-occupier", "Buildings insurance timing is the main issue", "Often needed before completion"],
      ["Buyer relying on one income", "Life or income protection may feel more important", "The affordability conversation becomes broader than the legal purchase"],
      ["Leasehold flat", "Some buildings cover may sit within service charge arrangements", "Buyers should still check exactly what is and is not covered"],
      ["Buy-to-let investor", "Landlord cover is more appropriate", "Ordinary owner-occupier assumptions can mislead"]
    ],
    workedExampleCaption: "Worked insurance-planning examples",
    workedExampleRows: [
      ["First-time buyer owner-occupier", "Modest building-cover allowance", "Useful for move-in budgeting"],
      ["Family household", "Buildings cover plus optional protection thinking", "Shows why insurance conversations often widen after offer accepted"],
      ["Buy-to-let purchase", "Landlord insurance planning", "The right policy type matters as much as the price"]
    ],
    officialItems: ["lender or lease paperwork requirements where applicable"],
    estimateItems: ["insurance premiums", "optional protection products", "policy pricing across providers"],
    mistakes: [
      "Leaving buildings insurance until too late in the process",
      "Assuming leasehold automatically means everything is insured already",
      "Ignoring insurance because it is smaller than tax or deposit",
      "Using owner-occupier assumptions for a buy-to-let purchase"
    ],
    checklist: [
      "Check when buildings insurance needs to start",
      "Confirm what cover is already included on leasehold properties, if relevant",
      "Decide whether optional life or mortgage protection cover matters to your household",
      "Use landlord cover for buy-to-let planning, not owner-occupier assumptions",
      "Keep the first insurance cost inside the wider move budget"
    ]
  }),
  createLongGuide({
    slug: "leasehold-costs-uk",
    title: "Leasehold Costs in the UK",
    description:
      "Understand leasehold costs in the UK, including service charge, ground rent, management pack fees, reserve funds and the upfront extras buyers need to budget for.",
    keywords: [
      "service charge and ground rent costs UK leasehold",
      "management pack cost leasehold UK",
      "sinking fund house purchase UK"
    ],
    h1: "Leasehold costs in the UK",
    intro:
      "Leasehold purchases can look straightforward on the listing price and then become more complicated once the building paperwork, management charges and future works are understood.",
    directAnswer:
      "Leasehold buyers often face several hundred pounds to a few thousand pounds of extra upfront administration on top of the normal buying costs, and they also need to understand the ongoing service charge, reserve fund and major-works risk before exchange. That is why a leasehold flat can look affordable on the asking price but still need more due diligence and a stronger cash buffer than a comparable freehold purchase.",
    sections: [
      {
        title: "Service charge and ground rent costs on a UK leasehold purchase",
        paragraphs: [
          "Service charge and ground rent costs UK leasehold are not just background ownership details. They shape the affordability of the property after completion and can influence whether the purchase still looks attractive once the full picture is known.",
          "Service charge pays for the maintenance and running of shared parts or services. Ground rent, where it still exists, is a separate lease payment. Some modern leases have more buyer-friendly terms than older ones, but the exact wording matters enormously.",
          "A buyer should never assume the current charge is all that matters. Trends, reserve funds and planned works often matter more than one year's headline figure."
        ]
      },
      {
        title: "Management pack cost and leasehold purchase administration",
        paragraphs: [
          "Management pack cost leasehold UK is a common buyer frustration because these charges can feel high relative to the admin involved. The seller often pays for the sale pack itself, but leasehold transactions still commonly generate buyer-facing administration later, such as notice fees, deed fees or certificates required by the lease.",
          "The practical lesson is that leasehold is not just another conveyancing transaction. It introduces another party with its own timetable and charging structure, and that can change both cost and speed.",
          "Buyers should therefore leave more breathing room in the legal budget for leasehold than for a simple freehold purchase."
        ],
        table: {
          caption: "Typical leasehold extras buyers should watch",
          columns: ["Leasehold cost", "Type", "Why it appears", "Budget effect"],
          rows: [
            ["Management information and pack fees", "Situation-dependent cost", "Building paperwork and solicitor checks", "Can add hundreds of pounds to the process"],
            ["Notice fees", "Situation-dependent cost", "Formal notice to landlord or agent", "Often modest individually but still real"],
            ["Deed or certificate fees", "Situation-dependent cost", "Lease-specific compliance", "Another example of buyer-facing admin that freehold buyers may not see"],
            ["Reserve or service-charge adjustments", "Situation-dependent cost", "Apportionments around completion", "Can affect immediate post-completion cash flow"]
          ]
        }
      },
      {
        title: "Sinking fund and future major works",
        paragraphs: [
          "Sinking fund house purchase UK is an important concept because leasehold affordability is not just about the current monthly or annual charge. A sinking or reserve fund exists to build up money for future major works. Where that fund is weak, a big works bill may still land later.",
          "That means a low current service charge is not always comforting. It can sometimes mean that maintenance has been deferred or the reserve fund is not where it should be.",
          "The buyer's job is not to become a building surveyor or managing agent. It is to make sure the solicitor highlights whether future building costs are likely to become their problem soon after completion."
        ]
      },
      {
        title: "How leasehold changes the real cost of buying",
        paragraphs: [
          "Leasehold does not always mean a bad purchase, but it often means a more layered one. There are more documents, more third parties, and more ongoing costs to understand alongside the upfront bill.",
          "That makes leasehold a good example of why buyers should separate listing-price thinking from whole-cost thinking. The purchase can still be right, but the true budget should reflect the extra administration and the ongoing building obligations.",
          "In short, leasehold cost analysis is part buying budget and part risk review."
        ]
      }
    ],
    faqs: [
      {
        question: "Do leasehold homes cost more to buy than freehold homes?",
        answer:
          "They can, because leasehold purchases often bring extra management, notice or deed fees as well as ongoing service charge obligations."
      },
      {
        question: "What is a sinking fund on a leasehold purchase?",
        answer:
          "It is a reserve fund built up to pay for future major works on the building or estate."
      },
      {
        question: "Why do management pack fees matter on leasehold transactions?",
        answer:
          "They reflect the extra building information and administration needed in a leasehold sale, and they are one reason leasehold legal work is often more involved."
      },
      {
        question: "Should buyers worry about future major works on leasehold buildings?",
        answer:
          "Yes. Planned works and reserve fund weakness can change the real cost of ownership far more than a small difference in purchase price."
      }
    ],
    relatedGuides: [
      "hidden-costs-buying-house",
      "taxes-and-fees-uk",
      "how-much-money-needed-buy-house"
    ],
    sourceKeys: [],
    ctaTitle: "Use the calculator, then layer leasehold specifics on top",
    ctaText:
      "The homepage calculator covers the core buying total. Leasehold paperwork then tells you what extra building-specific costs need to sit on top.",
    topicLabel: "leasehold buying costs",
    buyerContext: "Lease terms, management structure, reserve funding and planned works",
    costDrivers: [
      "service charge level",
      "ground rent terms",
      "management pack and notice fees",
      "reserve fund health",
      "future major works"
    ],
    paymentRows: [
      ["During conveyancing", "Management information and lease-related legal review", "This is where complexity often becomes visible"],
      ["Before completion", "Notice fees, deed fees or apportionments", "The final statement may include more lease-related lines than the buyer expected"],
      ["After completion", "Service charge and building obligations continue", "Leasehold affordability is about ownership as well as purchase"],
      ["When works arise", "Reserve fund contributions or major works exposure", "This is why current charges alone are not enough"]
    ],
    comparisonCaption: "Why one leasehold purchase can be straightforward and another can feel much heavier",
    comparisonRows: [
      ["Well-run block with clear reserves", "Ongoing costs may be easier to forecast", "The buyer gets more confidence from the paperwork"],
      ["Block with low reserves", "Major works risk may sit ahead", "The purchase can become more expensive after completion"],
      ["Older lease with more admin requirements", "Notice and certificate fees can multiply", "The legal process often feels more layered"],
      ["Simple freehold comparison", "Fewer third-party building charges", "Shows why leasehold deserves its own budget lens"]
    ],
    workedExampleCaption: "Worked leasehold budgeting examples",
    workedExampleRows: [
      ["Modern leasehold flat with clear accounts", "Extra admin but manageable", "Illustrates a more stable leasehold profile"],
      ["Older block with limited reserve fund", "More caution needed", "Demonstrates why future works matter"],
      ["Leasehold purchase with multiple notices and deed requirements", "Higher legal complexity and admin spend", "The paperwork itself can alter the total"]
    ],
    officialItems: ["lease documents and management paperwork rather than one universal public fee scale"],
    estimateItems: ["some leasehold admin charges until the exact property paperwork is reviewed"],
    mistakes: [
      "Looking only at the current service charge",
      "Ignoring reserve fund strength and future works",
      "Assuming leasehold admin is a minor legal detail",
      "Comparing a leasehold purchase budget directly with a freehold one"
    ],
    checklist: [
      "Ask the solicitor to summarise service charge, ground rent and reserve position clearly",
      "Check whether any major works are planned",
      "Allow extra room for leasehold admin and legal complexity",
      "Read the lease-related fees on the final statement carefully",
      "Treat ongoing building costs as part of affordability, not just the purchase price"
    ]
  }),
  createLongGuide({
    slug: "taxes-and-fees-uk",
    title: "Taxes and Official Fees for Buying a Home in the UK",
    description:
      "A guide to taxes and official fees when buying a home in the UK, including land registry fees, HMLR registration fees, council tax considerations and capital gains tax context for second homes.",
    keywords: [
      "land registry fees UK house purchase 2026",
      "HMLR registration fees 2026",
      "council tax bands UK check",
      "council tax during house renovation UK",
      "capital gains tax on second home UK 2026"
    ],
    h1: "Taxes and official fees for buying a home in the UK",
    intro:
      "Not every property cost is a soft estimate. Some buying charges come from published tax bands or fee scales, which makes them easier to verify and budget for with confidence.",
    directAnswer:
      "Property taxes and fees in the UK include official charges such as SDLT, LBTT or LTT plus registration fees that can range from tens to hundreds of pounds, while survey, legal and moving lines remain estimate-led. Buyers should therefore separate the published charges from the market-priced ones so the fixed side can be verified and the softer side can be budgeted with a sensible buffer.",
    sections: [
      {
        title: "Land Registry fees and HMLR registration fees in 2026",
        paragraphs: [
          "Land registry fees UK house purchase 2026 and HMLR registration fees 2026 matter because they are among the few purchase costs buyers can often estimate with reasonable confidence early on. In England and Wales, the official fee schedule for standard electronic applications gives a clear framework based on transaction value.",
          "That does not mean every registration question is simple, but it does mean buyers can separate this line from softer estimates such as legal quotes or survey pricing.",
          "This is a useful example of why official-vs-estimate thinking improves budgeting. Where a charge is published, it should be checked against the published source rather than guessed."
        ],
        table: {
          caption: "Selected HMLR electronic Scale 1 fees used by the site",
          columns: ["Transaction value", "Type", "Fee", "Why buyers care"],
          rows: [
            ["Up to £80,000", "Official charge", "£20", "Shows how low-value transfers are charged"],
            ["£80,001 to £100,000", "Official charge", "£40", "Early jump in the fee scale"],
            ["£100,001 to £200,000", "Official charge", "£100", "Relevant to many mainstream purchases"],
            ["£200,001 to £500,000", "Official charge", "£150", "Common owner-occupier band"],
            ["£500,001 to £1 million", "Official charge", "£295", "Higher-value band"],
            ["Over £1 million", "Official charge", "£500", "Top band in the calculator dataset"]
          ]
        }
      },
      {
        title: "Council tax bands and renovation periods",
        paragraphs: [
          "Council tax bands UK check is not the same as a buying-cost line on the solicitor's completion statement, but it matters quickly after purchase and should be part of the move-in affordability conversation. Buyers should understand which band the property falls into and check the local authority position rather than relying on a neighbour's guess or old marketing copy.",
          "Council tax during house renovation UK can be especially confusing because local rules, discounts and treatment of empty properties can vary. Buyers taking on a renovation project should check the relevant council's own guidance rather than assuming an empty home automatically means no council tax liability.",
          "The bigger lesson is that official charges do not stop at completion day. Some become part of early ownership almost immediately."
        ]
      },
      {
        title: "Capital gains tax on a second home in 2026",
        paragraphs: [
          "Capital gains tax on second home UK 2026 is not a buying tax on the purchase itself, but it sits close enough to second-home decision-making that buyers often research it alongside buying costs. The key distinction is timing. SDLT, LBTT or LTT affect the purchase itself. Capital gains tax usually becomes relevant later when the asset is sold, and the position depends on ownership and use.",
          "That means it belongs in strategic planning rather than in the day-one completion budget. Even so, buyers considering an additional property or investment should understand that tax exposure does not end with the purchase tax bill.",
          "In other words, buying costs answer the question 'How much cash do I need now?' while CGT helps answer 'What future tax consequences might this ownership decision create?'"
        ]
      },
      {
        title: "Why official charges should be handled differently from estimates",
        paragraphs: [
          "Official charges are easier to verify but still need checking at the right moment. Market estimates are harder to pin down but still need to be budgeted for. Strong planning uses both categories together rather than trusting only the fixed side because it feels more certain.",
          "This matters because buyers often over-focus on the official figures and underweight the market-based lines. The result is a budget that looks carefully researched while still missing the softer costs that determine real cash flow.",
          "The right approach is to lock down the published charges, then build a range-based plan for the rest."
        ]
      }
    ],
    faqs: [
      {
        question: "Are HM Land Registry fees official?",
        answer:
          "Yes. HM Land Registry publishes official fee scales for common registration applications in England and Wales."
      },
      {
        question: "Is council tax part of the upfront cost of buying a house?",
        answer:
          "Not in the same way as deposit or purchase tax, but it is an early ownership cost and should be included in move-in affordability planning."
      },
      {
        question: "Do all UK nations use HM Land Registry fees?",
        answer:
          "No. HM Land Registry fees are directly relevant to England and Wales. Scotland and Northern Ireland use different land registration systems."
      },
      {
        question: "Is capital gains tax a buying cost on a second home?",
        answer:
          "Not usually in the day-one sense. It is more relevant to the later sale of the property than to the completion statement when you buy."
      }
    ],
    relatedGuides: ["stamp-duty-explained", "regional-property-costs-uk", "leasehold-costs-uk"],
    sourceKeys: ["sdlt", "lbtt", "ltt", "hmlr", "councilTax"],
    ctaTitle: "See where official charges sit inside the wider budget",
    ctaText:
      "The calculator shows which lines are based on official published rates and which lines are planning estimates.",
    topicLabel: "official taxes and fees in a home purchase",
    buyerContext: "Jurisdiction, transaction value and local-authority context",
    costDrivers: [
      "the nation's tax system",
      "the purchase price",
      "the relevant registration fee scale",
      "local council treatment after purchase"
    ],
    paymentRows: [
      ["Before completion", "Official tax and registration figures can be checked against published sources", "This is the best stage to sense-check the fixed part of the budget"],
      ["Completion stage", "Tax and final registration-related legal handling", "These are core completion-line items"],
      ["After completion", "Council tax and related occupancy questions", "Early ownership costs become relevant almost immediately"],
      ["Later sale or restructuring", "CGT issues for additional properties", "Shows how tax planning extends beyond purchase day"]
    ],
    comparisonCaption: "Why official charges still need context",
    comparisonRows: [
      ["England / Wales registration case", "HMLR fee scale is useful and public", "The registration line is easier to estimate than many legal-market costs"],
      ["Scotland or NI case", "Different registration systems apply", "Buyers should not assume HMLR data covers every nation directly"],
      ["Ordinary move-in household", "Council tax starts to matter quickly", "Move-in affordability is not just about legal fees"],
      ["Second-home owner", "Future CGT awareness matters more", "Purchase-day tax is only part of the long-term picture"]
    ],
    workedExampleCaption: "Worked ways official fees interact with broader budgeting",
    workedExampleRows: [
      ["Typical owner-occupier purchase", "Official charges are only part of the total", "Fixed fees help, but market estimates still matter"],
      ["Higher-value purchase", "Official charges rise but so do market-based costs", "Both categories move together"],
      ["Second-home planning case", "Purchase tax and future CGT context both matter", "Short-term and long-term tax thinking differ"]
    ],
    officialItems: ["SDLT", "LBTT", "LTT", "HMLR registration fees", "local-authority council tax information"],
    estimateItems: ["legal quotes", "survey costs", "moving budgets and similar market-priced items"],
    mistakes: [
      "Treating official fees as the whole buying budget",
      "Assuming HM Land Registry data applies identically across the whole UK",
      "Ignoring council tax because it is not on the completion statement",
      "Confusing future CGT planning with the day-one purchase budget"
    ],
    checklist: [
      "Cross-check tax and registration figures against official sources",
      "Confirm whether the property is in England, Wales, Scotland or Northern Ireland before using a fee example",
      "Check the council tax band and local authority treatment",
      "Separate purchase-day taxes from future ownership taxes such as CGT",
      "Add market-based estimates on top of the official core, not instead of it"
    ]
  }),
  createLongGuide({
    slug: "home-buying-schemes-uk",
    title: "Home Buying Schemes in the UK",
    description:
      "Understand UK home-buying schemes including Right to Buy, shared ownership staircasing costs, Help to Buy equity loan considerations, buy-to-let upfront costs and Lifetime ISA rules.",
    keywords: [
      "right to buy costs UK upfront",
      "shared ownership staircasing costs UK",
      "help to buy equity loan interest rates 2026",
      "buy to let costs UK upfront"
    ],
    h1: "Home buying schemes in the UK",
    intro:
      "Schemes can change how buyers get onto the ladder, but they do not remove the need to understand the cash costs around the purchase. In many cases they simply change where the pressure sits.",
    directAnswer:
      "Home-buying schemes can lower the initial barrier, but they do not make the rest of the costs disappear. Buyers still need to budget for legal work, mortgage costs and, in some cases, valuation fees, staircasing costs, admin charges or later equity-loan charges that can run from the hundreds into the low thousands depending on the route used.",
    sections: [
      {
        title: "Right to Buy upfront costs in the UK",
        paragraphs: [
          "Right to buy costs UK upfront can feel confusing because the discount attracts most of the attention. The discount can transform affordability, but it does not eliminate legal work, mortgage setup, valuation questions or moving costs. Buyers still need a practical plan for the transaction itself.",
          "That makes Right to Buy a good example of a scheme that changes value more than it changes process. The route into ownership may be different, but the buyer still has to complete a real purchase with real costs around it.",
          "The safest budgeting approach is therefore to treat the discount as one input in the affordability picture rather than as a substitute for a full cost plan."
        ]
      },
      {
        title: "Shared ownership and staircasing costs",
        paragraphs: [
          "Shared ownership staircasing costs UK matter because the cost story does not end when the first share is bought. Buyers may face valuation fees, legal fees, mortgage changes and admin charges when increasing their ownership later.",
          "That means the scheme may reduce the initial deposit hurdle while still creating meaningful transaction costs down the line. Shared ownership should therefore be priced over the likely journey, not just the first purchase event.",
          "The same is true of service charges and rent elements, which can affect monthly affordability even if the initial purchase cash requirement feels more achievable."
        ],
        table: {
          caption: "Scheme-related costs buyers often overlook",
          columns: ["Scheme area", "Common extra costs", "What to remember"],
          rows: [
            ["Right to Buy", "Legal fees, mortgage setup, valuation", "Discount helps with value, not every transaction cost"],
            ["Shared ownership purchase", "Mortgage, legal work, service-charge awareness", "Initial affordability is only one side of the picture"],
            ["Staircasing", "Valuation, legal and mortgage costs", "Each increase can trigger a fresh cost event"],
            ["Lifetime ISA use", "Admin timing and rule checks", "Helpful for deposit support but not a full cost solution"]
          ]
        }
      },
      {
        title: "Help to Buy equity loan interest rates in 2026",
        paragraphs: [
          "Help to buy equity loan interest rates 2026 are mainly relevant now for existing users or buyers dealing with the consequences of past scheme participation rather than a fresh general route into the market. The important point is that equity-loan support may change the shape of ownership costs over time rather than making them disappear.",
          "Where an equity loan exists, the buyer or owner should think about interest, redemption mechanics and how those interact with future remortgaging or sale decisions.",
          "That makes the scheme a long-term cost question as well as a short-term buying question."
        ]
      },
      {
        title: "Buy-to-let upfront costs in the UK",
        paragraphs: [
          "Buy to let costs UK upfront differ from mainstream owner-occupier budgets because the tax treatment, deposit expectations and insurance profile are often different. Even where the legal steps look similar on paper, the financial structure of the purchase may be much heavier.",
          "This is one reason buy-to-let buyers should avoid relying on standard owner-occupier examples or first-time buyer content. The upfront cash need may be significantly larger before the property even starts generating rent.",
          "If a buyer is comparing buy-to-let with a home-buying scheme route, the right comparison is not just 'Which deposit is lower?' but 'Which full ownership path is genuinely more sustainable?'"
        ]
      }
    ],
    faqs: [
      {
        question: "Does Right to Buy remove the need for buying costs?",
        answer:
          "No. The discount can help with affordability, but legal fees, mortgage setup and moving costs still apply."
      },
      {
        question: "Do shared ownership staircasing costs matter?",
        answer:
          "Yes. Staircasing can create fresh valuation, legal and mortgage costs each time you buy a larger share."
      },
      {
        question: "Are Help to Buy equity loan costs still relevant in 2026?",
        answer:
          "Yes for existing users and legacy situations, especially where interest or repayment planning affects affordability."
      },
      {
        question: "Are buy-to-let upfront costs different from standard home-buying costs?",
        answer:
          "Yes. Deposit expectations, tax treatment and insurance profile can all differ."
      }
    ],
    relatedGuides: [
      "first-time-buyer-costs",
      "how-much-money-needed-buy-house",
      "mortgage-fees-costs"
    ],
    sourceKeys: ["lisa", "rightToBuy", "sharedOwnership", "helpToBuy"],
    ctaTitle: "Check scheme help against the full cost",
    ctaText:
      "The calculator helps you compare the full cash requirement even when a scheme changes one part of the transaction.",
    topicLabel: "scheme-related buying costs",
    buyerContext: "Scheme rules, deposit structure, legal complexity and long-term ownership obligations",
    costDrivers: [
      "scheme eligibility rules",
      "valuation and legal requirements",
      "mortgage structure",
      "later staircasing or repayment decisions",
      "buy-to-let tax and deposit treatment"
    ],
    paymentRows: [
      ["Before purchase progresses", "Eligibility checks and early advice", "Important because scheme assumptions can fail if the detail is wrong"],
      ["During the purchase", "Valuation, legal work and mortgage setup", "The transaction still creates normal buying costs"],
      ["After completion", "Rent, service charge, equity-loan or ownership obligations", "Some scheme costs are ongoing rather than purely upfront"],
      ["Later ownership stages", "Staircasing or repayment costs", "The scheme can create future transaction events as well"]
    ],
    comparisonCaption: "How schemes change the budget in different ways",
    comparisonRows: [
      ["Right to Buy", "Discount improves entry value", "Transaction costs still remain"],
      ["Shared ownership", "Lower initial ownership share may lower deposit barrier", "Future staircasing creates further costs"],
      ["Help to Buy legacy case", "Upfront support may create later equity-loan costs", "The ownership journey matters as much as the purchase day"],
      ["Buy-to-let", "Different deposit and tax treatment", "A much heavier upfront structure is common"]
    ],
    workedExampleCaption: "Worked ways scheme choices change the cost picture",
    workedExampleRows: [
      ["Right to Buy case", "Discount helps but costs remain", "Shows why buyers still need a proper cash budget"],
      ["Shared ownership case", "Lower entry hurdle but more moving parts", "Illustrates trade-off rather than simple savings"],
      ["Buy-to-let case", "Heavier upfront profile", "Useful contrast against owner-occupier routes"]
    ],
    officialItems: ["scheme rules and official scheme guidance"],
    estimateItems: ["legal fees", "valuations", "mortgage costs", "some later staircasing or ownership costs"],
    mistakes: [
      "Treating the scheme headline as the whole affordability answer",
      "Ignoring future staircasing or repayment costs",
      "Using owner-occupier examples for buy-to-let planning",
      "Assuming a Lifetime ISA solves every first-home cash need"
    ],
    checklist: [
      "Read the current scheme rules before relying on old articles",
      "Budget for legal, valuation and mortgage costs as well as the scheme benefit",
      "Check any future staircasing or repayment obligations",
      "Treat buy-to-let as a separate cost model from owner-occupier buying",
      "Use the calculator to see whether the overall cash target still works"
    ]
  }),
  createLongGuide({
    slug: "regional-property-costs-uk",
    title: "Regional Property Costs in the UK",
    description:
      "Compare regional property-buying costs across England, Northern Ireland, Scotland and Wales, including LBTT, LTT and why the same purchase price creates different totals.",
    keywords: ["LBTT calculator Scotland", "LTT rates Wales"],
    h1: "Regional property costs in the UK",
    intro:
      "The same house price can lead to a meaningfully different upfront total depending on where the property sits. Tax treatment is the biggest reason, but legal and market differences matter too.",
    directAnswer:
      "Regional property costs vary because England and Northern Ireland use SDLT, Scotland uses LBTT and Wales uses LTT, and those systems do not produce the same answer at the same price. A £300,000 purchase can therefore lead to a different tax bill, and a different upfront cash target, depending on which nation the property sits in and what type of buyer you are.",
    sections: [
      {
        title: "England and Northern Ireland overview",
        paragraphs: [
          "England and Northern Ireland use SDLT. That means mainstream buyer budgeting here starts with the SDLT thresholds and whether first-time buyer relief applies. Buyers moving within this system often assume it is the UK default, which can lead to confusion when they start comparing with Scotland or Wales.",
          "Within the SDLT system, buyer type still matters a great deal. A first-time buyer at a certain price point may face a very different tax bill from a home mover or additional-property buyer at the same price.",
          "That is why regional comparison should always include buyer status, not just the nation alone."
        ]
      },
      {
        title: "Scotland overview and LBTT calculations",
        paragraphs: [
          "LBTT calculator Scotland is a useful keyword because Scottish buyers need Scottish tax logic, not SDLT logic. The thresholds differ, the first-time buyer treatment differs, and additional-property treatment differs too.",
          "This matters in practical cash terms. A budget that looks comfortable under SDLT assumptions may feel tighter under LBTT, or vice versa, depending on the price point and buyer status.",
          "The clean way to budget in Scotland is to use Scottish-specific examples from the start rather than adapting England-based articles mentally."
        ]
      },
      {
        title: "Wales overview and LTT rates",
        paragraphs: [
          "LTT rates Wales are another reminder that UK property tax is not uniform. Wales uses its own thresholds and does not follow the same separate first-time buyer residential relief pattern that many English articles focus on.",
          "That means Welsh buyers should not treat England-focused stamp duty content as close enough. The result can be materially different, particularly at common mid-market price points.",
          "Cross-border buyers moving into Wales should make this check early rather than leaving it until the solicitor's statement appears."
        ]
      },
      {
        title: "Why regional differences matter beyond tax alone",
        paragraphs: [
          "Tax is the biggest regional differentiator, but it is not the only one. Legal markets, survey expectations and moving logistics can also shift by region and property type, even if the official tax rules are the most obvious difference.",
          "That is why a regional property cost comparison is most useful when it is treated as a full-budget exercise rather than as a tax-only exercise.",
          "For buyers flexible on location, those differences can genuinely influence where the budget stretches furthest."
        ],
        table: {
          caption: "Regional cost drivers buyers should compare",
          columns: ["Nation", "Main tax system", "Why the total changes"],
          rows: [
            ["England / Northern Ireland", "SDLT", "Different thresholds and relief structure from Scotland and Wales"],
            ["Scotland", "LBTT", "Scottish thresholds and ADS change the tax profile"],
            ["Wales", "LTT", "Welsh threshold and higher-rate structure differ again"]
          ]
        }
      }
    ],
    faqs: [
      {
        question: "Is LBTT the same as stamp duty?",
        answer:
          "No. LBTT is Scotland's own property transaction tax and uses different bands and rules from SDLT."
      },
      {
        question: "Does Wales use SDLT?",
        answer:
          "No. Wales uses Land Transaction Tax rather than SDLT."
      },
      {
        question: "Why can the same house price produce different totals across the UK?",
        answer:
          "Because SDLT, LBTT and LTT all use different thresholds, relief rules and higher-rate treatment."
      },
      {
        question: "Should I compare full buying costs, not just tax, across regions?",
        answer:
          "Yes. Tax is the biggest regional difference, but legal, survey and moving costs still matter everywhere."
      }
    ],
    relatedGuides: ["stamp-duty-explained", "how-much-money-needed-buy-house", "taxes-and-fees-uk"],
    sourceKeys: ["sdlt", "lbtt", "lbttAds", "ltt"],
    ctaTitle: "Compare regions on one calculator",
    ctaText:
      "Switch the jurisdiction on the calculator to see how the total changes across England and Northern Ireland, Scotland and Wales.",
    topicLabel: "regional buying costs",
    buyerContext: "Nation, buyer type, price point and higher-rate status",
    costDrivers: [
      "the national tax system",
      "first-time buyer rules",
      "higher-rate treatment",
      "transaction value"
    ],
    paymentRows: [
      ["Early comparison stage", "Regional tax modelling", "Useful when deciding where the budget stretches best"],
      ["Offer and conveyancing stage", "The region-specific tax position becomes concrete", "Cross-border assumptions should be corrected here if needed"],
      ["Completion stage", "The relevant tax system determines the hard cash total", "This is where regional differences become unavoidable"],
      ["Post-completion review", "Early ownership costs still vary locally", "Good reminder that tax is not the only location-sensitive cost"]
    ],
    comparisonCaption: "Why the same purchase price does not behave the same across the UK",
    comparisonRows: [
      ["England / NI first-time buyer", "Relief may reduce SDLT", "Useful benchmark for many mainstream examples"],
      ["Scotland buyer", "LBTT thresholds and relief differ", "English comparisons can be misleading"],
      ["Wales buyer", "LTT thresholds and higher rates differ", "Welsh budgeting needs Welsh figures"],
      ["Additional property buyer", "Higher-rate treatment changes sharply by nation", "Region matters even more for second-home planning"]
    ],
    workedExampleCaption: "Worked ways region changes the buying budget",
    workedExampleRows: [
      ["£250,000 purchase", "Region can change whether tax is light or more noticeable", "Useful first benchmark"],
      ["£300,000 purchase", "Differences usually become more obvious", "Good mid-market comparison point"],
      ["£400,000 purchase", "Tax differences become hard to ignore", "Strong example for buyers comparing relocation options"]
    ],
    officialItems: ["SDLT", "LBTT", "LTT"],
    estimateItems: ["surveys, legal quotes and moving costs which still vary around the official tax core"],
    mistakes: [
      "Using England-focused stamp duty content for Scottish or Welsh purchases",
      "Comparing regions on tax alone without looking at the full buying budget",
      "Ignoring the effect of buyer type on the regional comparison",
      "Assuming the same purchase price means the same cash target everywhere"
    ],
    checklist: [
      "Confirm the nation's tax system before modelling the purchase",
      "Check whether first-time buyer or higher-rate rules apply in that nation",
      "Compare the full buying cost, not just the tax line",
      "Recalculate if the purchase price changes",
      "Use the homepage calculator for side-by-side regional testing"
    ]
  }),
  createLongGuide({
    slug: "furnishing-costs-uk",
    title: "Furnishing Costs for a First Home in the UK",
    description:
      "Budget for the cost of furnishing a first home in the UK, including essentials, non-essentials, realistic ranges and how to phase spend after completion.",
    keywords: ["cost of furnishing a first home UK"],
    h1: "Furnishing costs for a first home in the UK",
    intro:
      "Furnishing is often treated as a lifestyle choice rather than a housing cost, but for many first homes it is one of the biggest reasons the first month after completion feels tighter than expected.",
    directAnswer:
      "Furnishing a first home in the UK can often be kept to roughly £800 to £2,000 for an essentials-first setup, but it can rise to £4,500 or more if you need several rooms, key appliances and window coverings quickly. The practical budgeting question is not what the home might look like one day, but what you need in place for the first week and first month after completion.",
    sections: [
      {
        title: "Essentials versus non-essentials",
        paragraphs: [
          "A first-home furnishing budget works best when it separates what makes the home liveable from what would simply be nice to have. Essentials include somewhere to sleep, basic seating, privacy where needed, enough kitchen equipment to live normally and any key appliances the property does not include.",
          "Non-essentials are the items that improve the home over time but do not need to be bought in week one. Buyers who collapse both categories into one shopping spree often burn through their move-in buffer very quickly.",
          "That is why the furnishing budget should be phased wherever possible."
        ],
        bullets: [
          "Bed and mattress",
          "Basic seating",
          "Curtains or blinds where needed",
          "Core white goods if not included",
          "Simple kitchen kit and cleaning supplies",
          "Storage and safety basics"
        ]
      },
      {
        title: "Realistic furnishing budget ranges",
        paragraphs: [
          "Cost of furnishing a first home UK depends heavily on what the buyer is bringing with them. Someone leaving a furnished rental may need far more on day one than someone already moving with furniture from an unfurnished property.",
          "The leanest furnishing route usually mixes second-hand furniture, staged upgrades and strict prioritisation. A fuller setup can move into the thousands quickly once beds, mattresses, sofa, dining furniture, appliances and soft furnishings are all needed at once.",
          "The important point is not that buyers should spend as little as possible. It is that they should decide deliberately rather than discovering the total through impulse purchases after moving in."
        ],
        table: {
          caption: "Simple furnishing budget ranges",
          columns: ["Approach", "Likely range", "What it usually means"],
          rows: [
            ["Essentials first", "About £800 to £2,000", "Used items, phased buying, function over finish"],
            ["Balanced setup", "About £2,000 to £4,500", "Mix of new and second-hand with more comfort early on"],
            ["Faster full-home setup", "£4,500+", "More rooms completed quickly and more new furniture bought upfront"]
          ]
        }
      },
      {
        title: "Worked furnishing examples",
        paragraphs: [
          "A buyer moving from a furnished rental into an unfurnished flat often feels the furnishing cost most sharply because they are starting from near zero. A buyer moving from an unfurnished home may have a far lighter first-month spend because major furniture pieces already exist.",
          "That is why furnishing sits well as an optional calculator toggle rather than a mandatory line for every purchase. Some buyers really need it in the budget. Others only need a modest allowance for gaps and upgrades."
        ]
      },
      {
        title: "How to phase furnishing after completion",
        paragraphs: [
          "The safest sequence is to prioritise sleep, food, privacy and safety first. Buy the bed, the curtains or blinds, the key appliances and the practical items you will use every day. Decorative upgrades, matching furniture sets and room-by-room perfection can wait.",
          "A phased plan is not just financially sensible. It also makes the home easier to understand. Many buyers only discover what they truly need once they have lived in the space for a few weeks.",
          "That reduces wasted spending and protects cash at the point where mortgage, bills and direct debits are all settling in for the first time."
        ]
      }
    ],
    faqs: [
      {
        question: "How much does it cost to furnish a first home in the UK?",
        answer:
          "It varies widely, but many buyers budget from under £1,000 for bare essentials into several thousand pounds for a fuller setup."
      },
      {
        question: "Should furnishing be included in buying costs?",
        answer:
          "If you want a realistic all-in figure, yes. It is optional, but for many first homes it is a real move-in cash need."
      },
      {
        question: "What should I buy first after moving in?",
        answer:
          "Prioritise a bed, seating, privacy coverings, key appliances and basic kitchen or cleaning items."
      },
      {
        question: "Can I phase furnishing over time?",
        answer:
          "Yes, and that is often the safest approach for buyers who want to protect cash after completion."
      }
    ],
    relatedGuides: [
      "first-year-cost-buying-house-uk",
      "moving-costs-uk",
      "first-time-buyer-costs",
      "how-much-money-needed-buy-house"
    ],
    sourceKeys: [],
    ctaTitle: "Add furnishing only if it reflects your real move",
    ctaText:
      "Use the furnishing toggle on the calculator if you want a more realistic move-in number instead of a legal-only total.",
    topicLabel: "furnishing costs",
    buyerContext: "What furniture the buyer already owns, the size of the home and how quickly the home needs to be fully usable",
    costDrivers: [
      "whether the buyer already owns furniture",
      "property size",
      "appliance needs",
      "speed of furnishing",
      "new versus second-hand buying"
    ],
    paymentRows: [
      ["Before completion planning", "Wishlist and essentials list", "Useful to stop furnishing becoming a vague, uncontrolled cost"],
      ["Move-in week", "Core essentials and appliances", "This is where the budget pressure is usually highest"],
      ["First month", "Gap-filling and comfort upgrades", "Good stage for staged spending"],
      ["Later ownership", "Decorative upgrades and non-essential improvements", "Helps avoid overspending too early"]
    ],
    comparisonCaption: "Why furnishing pressure differs so much between buyers",
    comparisonRows: [
      ["Buyer from furnished rental", "Needs more day-one items", "Higher move-in pressure"],
      ["Buyer moving with existing furniture", "Only gaps need filling", "Lower first-month spend"],
      ["Small flat", "Fewer rooms but still core essentials needed", "Can still be costly if starting from scratch"],
      ["Larger family home", "More rooms to equip over time", "Phasing becomes even more important"]
    ],
    workedExampleCaption: "Worked furnishing-budget examples",
    workedExampleRows: [
      ["Essentials-only first week", "Lean but functional", "Good fit where cash needs protecting"],
      ["Balanced first-month setup", "More comfortable all-in start", "Often a realistic middle ground"],
      ["Fuller immediate furnish", "Higher upfront spend", "Useful only where the wider budget is strong enough"]
    ],
    officialItems: ["none in the same way as tax or registry fees"],
    estimateItems: ["furniture, appliances, soft furnishings and move-in household purchases"],
    mistakes: [
      "Treating furnishing as an afterthought rather than a planned cost",
      "Trying to complete every room immediately",
      "Using the move-in buffer on non-essentials too soon",
      "Ignoring what the property actually includes"
    ],
    checklist: [
      "List what is included with the property before shopping",
      "Separate essentials from nice-to-haves",
      "Stage purchases over the first few months where possible",
      "Keep some cash for genuine move-in surprises",
      "Use the calculator toggle only if furnishing is a real part of your plan"
    ]
  }),
  createLongGuide({
    slug: "first-year-cost-buying-house-uk",
    title: "First Year Cost of Buying a House in the UK",
    description:
      "See the first year cost of buying a house in the UK, including upfront fees, completion-day costs, moving costs, furnishing, insurance and ongoing ownership costs.",
    keywords: [
      "first year cost of buying a house",
      "first year cost of buying a house in the UK",
      "cost of buying a house in the first year",
      "first year home ownership costs",
      "true cost of buying a house in the UK",
      "upfront costs of buying a house",
      "moving-in costs",
      "furnishing costs",
      "ongoing costs of owning a home"
    ],
    h1: "First Year Cost of Buying a House in the UK",
    intro:
      "The first year cost of buying a house in the UK is wider than the deposit and the legal completion bill. It includes the money needed before completion, the cash due at completion, moving-in costs, furnishing or setup costs and the first year of ownership bills.",
    directAnswer:
      "The first year cost of buying a house includes the deposit, property tax, legal fees, mortgage fees, survey costs, moving costs, furnishing and setup costs, insurance and first-year ongoing ownership costs. The deposit is not the full cost of buying a house; it is only one part of the cash needed to complete, move in and run the home through year one.",
    introSections: [
      {
        title: "First-year house buying costs at a glance",
        bullets: [
          "Costs start before completion, with surveys, searches, mortgage fees and early solicitor payments often due before the move.",
          "Completion day is not the end of spending because the final balance, property tax and registration-style costs may all come together.",
          "Moving costs and furnishing often arrive immediately after completion, just when cash can already feel stretched.",
          "First-year ownership bills continue after completion, including council tax, utilities, insurance, maintenance and any service charge.",
          "The deposit is only part of the total cash requirement, so the first year should be planned as a timeline rather than one payment."
        ]
      },
      {
        title: "Upfront costs before completion",
        paragraphs: [
          "Before completion, buyers may need cash for broker or advice fees where applicable, mortgage product, application or booking fees if paid upfront, valuation fees where charged, survey costs and the initial payment on account to the solicitor or conveyancer.",
          "Searches, conveyancing disbursements, ID checks and bank transfer fees can also appear before the final completion statement. These are part of the upfront costs of buying a house even though they do not always arrive on the same date.",
          "The mortgage fees guide and hidden costs guide are useful next checks because they explain the lender, legal and survey lines that often sit outside the deposit."
        ]
      },
      {
        title: "Completion-day costs",
        paragraphs: [
          "Completion is where several large lines usually come together. The buyer normally needs the deposit balance, Stamp Duty, LBTT or LTT where applicable, the solicitor or conveyancer final balance, Land Registry or registration-style fees and any lender fees not added to the mortgage.",
          "Property tax varies by nation, buyer status and whether the purchase is an additional property. England and Northern Ireland use SDLT, Scotland uses LBTT and Wales uses LTT, so one UK-wide number can be misleading.",
          "Leasehold purchases can also involve completion notices, administration charges or other building-specific fees. Those should be checked before exchange rather than treated as a move-in surprise."
        ]
      },
      {
        title: "Moving-in costs",
        paragraphs: [
          "Moving-in costs can include removals, van hire, packing, storage, mail redirection, cleaning, locksmiths, small repairs and immediate setup costs. These may not appear on the solicitor's statement, but they still affect the cash needed around completion.",
          "A buyer doing a short move with help from family may spend far less than a family paying for removals, packing and storage. The safest approach is to treat moving-in costs as a planning estimate rather than a fixed average."
        ]
      },
      {
        title: "Furnishing costs",
        paragraphs: [
          "Furnishing costs can start in the first week and continue through the first year. Essential furniture, appliances, curtains or blinds, flooring, garden tools and smaller household items can all overlap with the first mortgage payments and bills.",
          "Some buyers already own the basics. Others move from furnished rentals and need almost everything from scratch. That is why furnishing should be phased where possible and kept separate from the legal purchase total."
        ]
      },
      {
        title: "First-year ownership costs",
        paragraphs: [
          "First-year home ownership costs include mortgage payments, council tax, utilities, water, broadband, buildings insurance, contents insurance, a maintenance reserve and service charge or estate charge where relevant.",
          "Mortgage repayments vary too much by loan size, interest rate and term to be included as a universal figure in the examples below. Non-mortgage ownership costs still matter because they continue after the purchase has completed."
        ]
      }
    ],
    contextualLinks: [
      { href: "/#calculator", label: "home buying cost calculator" },
      { href: "/hidden-costs-buying-house", label: "hidden costs of buying a house" },
      { href: "/how-much-money-needed-buy-house", label: "how much money you need to buy a house" },
      { href: "/stamp-duty-explained", label: "stamp duty and property taxes" },
      { href: "/mortgage-fees-costs", label: "mortgage fees" },
      { href: "/moving-costs-uk", label: "moving costs" },
      { href: "/furnishing-costs-uk", label: "furnishing costs" },
      { href: "/cost-of-owning-home-uk", label: "ongoing costs of owning a home" },
      { href: "/insurance-costs-uk", label: "insurance costs" },
      { href: "/leasehold-costs-uk", label: "leasehold costs" },
      { href: "/methodology", label: "how estimates work" }
    ],
    atGlance: [
      {
        label: "What this page covers",
        value: "Purchase costs, completion costs, moving-in costs, furnishing/setup and first-year non-mortgage ownership costs."
      },
      {
        label: "What it excludes in examples",
        value: "Mortgage repayments, because they vary by loan size, rate, term and deposit."
      },
      {
        label: "Status",
        value: "Official charges include property tax and registration-style fees. Other lines are planning estimates."
      },
      {
        label: "Buyers should check",
        value: "Solicitor statements, lender fees, insurance quotes, tax treatment and first-year household bills."
      }
    ],
    sections: [
      {
        title: "First-year cost timeline",
        paragraphs: [
          "The first year is easier to plan when it is split into stages. Some costs arrive before the purchase completes, while others appear after the keys are handed over.",
          "The table below keeps the focus on timing, so buyers can see why the cost of buying a house in the first year is not just a completion-day calculation."
        ],
        table: {
          summary:
            "The table below shows a first-year house buying timeline, separating pre-completion, completion-day, move-in and ongoing ownership costs.",
          caption: "First-year cost timeline for a UK home buyer",
          columns: ["Stage", "Typical costs", "Why it matters"],
          rows: [
            ["Before completion", "Survey, mortgage fees, valuation fee where charged, solicitor account payment, searches and disbursements", "These costs can be paid before the purchase is legally complete, so buyers need cash ready early."],
            ["Completion day", "Deposit balance, property tax where applicable, final legal balance, registration-style fees and lender fees not added to the mortgage", "This is usually the largest single cash point in the buying process."],
            ["Moving-in period", "Removals, van hire, storage, cleaning, locksmiths, small repairs and immediate setup costs", "These costs may not appear on the solicitor statement but still affect the first-year budget."],
            ["First month", "Council tax setup, utilities, water, broadband, insurance and essential furnishing", "Household bills begin quickly and can overlap with move-in spending."],
            ["Months 2-12", "Ongoing bills, maintenance reserve, contents insurance, service charge or estate charge where relevant", "The first-year home ownership costs continue long after completion day."]
          ]
        }
      },
      {
        title: "Example: first year cost of buying a £250k house",
        paragraphs: [
          "This is an illustration, not advice or an average. It uses a 10% deposit and shows estimated first-year costs excluding mortgage repayments.",
          "Property tax can be £0 for some buyers but may apply depending on nation, buyer status and additional-property status. Mortgage repayments are excluded because they vary by loan size, rate and term."
        ],
        table: {
          summary:
            "The table below shows an illustrative first-year cost breakdown for a £250,000 purchase, excluding mortgage repayments.",
          caption: "Illustrative first-year costs for a £250,000 house",
          columns: ["Cost line", "Illustrative amount", "Type / note"],
          rows: [
            ["Deposit", "£25,000", "10% deposit illustration"],
            ["Property tax assumption", "£0", "May vary by nation and buyer status"],
            ["Legal / conveyancing", "£1,500", "Solicitor and conveyancing estimate"],
            ["Mortgage fees", "£1,000", "Lender or broker-related estimate if paid upfront"],
            ["Survey", "£600", "Market estimate"],
            ["Moving costs", "£1,200", "Moving-in estimate"],
            ["Furnishing / setup", "£2,500", "Estimate-led first-year setup line"],
            ["First-year non-mortgage ownership costs", "£7,200", "Council tax, utilities, insurance, maintenance and similar lines"],
            ["Estimated total excluding mortgage repayments", "£39,000", "Planning illustration, not a quote"]
          ]
        },
        tables: [
          {
            summary:
              "This subtotal table groups the same £250,000 illustration into upfront buying costs, moving and furnishing, and first-year ownership costs.",
            caption: "Summary subtotals for the £250,000 first-year example",
            columns: ["Subtotal group", "Illustrative amount", "What is included"],
            rows: [
              ["Upfront buying costs subtotal", "£28,100", "Deposit, property tax assumption, legal / conveyancing, mortgage fees and survey"],
              ["Moving and furnishing subtotal", "£3,700", "Moving costs plus furnishing / setup"],
              ["First-year non-mortgage ownership costs", "£7,200", "Council tax, utilities, insurance, maintenance and similar ownership bills"],
              ["Estimated first-year total excluding mortgage repayments", "£39,000", "Planning illustration only; mortgage repayments need to be added separately"]
            ]
          }
        ],
        afterParagraphs: [
          "This example shows how a lower-price purchase can still need much more than the deposit alone. Moving, furnishing and the first year of household bills add a second layer of spending after the legal purchase costs.",
          "Mortgage repayments are not included in the total, so buyers would still need to add their own expected monthly payment based on the loan, interest rate and term."
        ]
      },
      {
        title: "Example: first year cost of buying a £350k house",
        paragraphs: [
          "This illustration uses a 10% deposit and an England/Northern Ireland home mover style property tax assumption for a simple planning scenario. It does not claim to be an average.",
          "The tax line can change in Scotland, Wales, for first-time buyers and for additional-property buyers. Mortgage repayments are excluded because the loan, rate and term drive that number."
        ],
        table: {
          summary:
            "The table below shows an illustrative first-year cost breakdown for a £350,000 purchase, excluding mortgage repayments.",
          caption: "Illustrative first-year costs for a £350,000 house",
          columns: ["Cost line", "Illustrative amount", "Type / note"],
          rows: [
            ["Deposit", "£35,000", "10% deposit illustration"],
            ["Property tax assumption", "£7,500", "Illustrative SDLT-style planning assumption"],
            ["Legal / conveyancing", "£1,700", "Solicitor and conveyancing estimate"],
            ["Mortgage fees", "£1,000", "Lender or broker-related estimate if paid upfront"],
            ["Survey", "£800", "Market estimate"],
            ["Moving costs", "£1,600", "Moving-in estimate"],
            ["Furnishing / setup", "£3,500", "Estimate-led first-year setup line"],
            ["First-year non-mortgage ownership costs", "£8,400", "Council tax, utilities, insurance, maintenance and similar lines"],
            ["Estimated total excluding mortgage repayments", "£59,500", "Planning illustration, not a quote"]
          ]
        },
        tables: [
          {
            summary:
              "This subtotal table groups the £350,000 illustration into the main first-year spending stages.",
            caption: "Summary subtotals for the £350,000 first-year example",
            columns: ["Subtotal group", "Illustrative amount", "What is included"],
            rows: [
              ["Upfront buying costs subtotal", "£46,000", "Deposit, property tax assumption, legal / conveyancing, mortgage fees and survey"],
              ["Moving and furnishing subtotal", "£5,100", "Moving costs plus furnishing / setup"],
              ["First-year non-mortgage ownership costs", "£8,400", "Council tax, utilities, insurance, maintenance and similar ownership bills"],
              ["Estimated first-year total excluding mortgage repayments", "£59,500", "Planning illustration only; mortgage repayments need to be added separately"]
            ]
          }
        ],
        afterParagraphs: [
          "The £350,000 illustration shows why the first-year cost can rise quickly once property tax and a bigger deposit are included. It also separates one-off move-in spending from the bills that keep running after completion.",
          "A buyer with different tax treatment, a larger deposit or a more expensive move could land outside this illustration, so it should be treated as a planning example rather than an average."
        ]
      },
      {
        title: "Example: first year cost of buying a £500k house",
        paragraphs: [
          "This illustration uses a 10% deposit and a broad England/Northern Ireland home mover style tax assumption. It keeps mortgage repayments separate because they can change sharply with the size and structure of the mortgage.",
          "At this level, the true cost of buying a house in the UK can move quickly if the buyer is purchasing an additional property, buying in a different nation, choosing a fuller survey or needing more furnishing work."
        ],
        table: {
          summary:
            "The table below shows an illustrative first-year cost breakdown for a £500,000 purchase, excluding mortgage repayments.",
          caption: "Illustrative first-year costs for a £500,000 house",
          columns: ["Cost line", "Illustrative amount", "Type / note"],
          rows: [
            ["Deposit", "£50,000", "10% deposit illustration"],
            ["Property tax assumption", "£15,000", "Illustrative SDLT-style planning assumption"],
            ["Legal / conveyancing", "£2,000", "Solicitor and conveyancing estimate"],
            ["Mortgage fees", "£1,500", "Lender or broker-related estimate if paid upfront"],
            ["Survey", "£1,000", "Market estimate"],
            ["Moving costs", "£2,200", "Moving-in estimate"],
            ["Furnishing / setup", "£5,000", "Estimate-led first-year setup line"],
            ["First-year non-mortgage ownership costs", "£10,200", "Council tax, utilities, insurance, maintenance and similar lines"],
            ["Estimated total excluding mortgage repayments", "£86,900", "Planning illustration, not a quote"]
          ]
        },
        tables: [
          {
            summary:
              "This subtotal table shows how the £500,000 illustration is split between purchase, move-in and first-year ownership costs.",
            caption: "Summary subtotals for the £500,000 first-year example",
            columns: ["Subtotal group", "Illustrative amount", "What is included"],
            rows: [
              ["Upfront buying costs subtotal", "£69,500", "Deposit, property tax assumption, legal / conveyancing, mortgage fees and survey"],
              ["Moving and furnishing subtotal", "£7,200", "Moving costs plus furnishing / setup"],
              ["First-year non-mortgage ownership costs", "£10,200", "Council tax, utilities, insurance, maintenance and similar ownership bills"],
              ["Estimated first-year total excluding mortgage repayments", "£86,900", "Planning illustration only; mortgage repayments need to be added separately"]
            ]
          }
        ],
        afterParagraphs: [
          "At £500,000, the first-year picture is more sensitive to tax treatment, survey choice, furnishing needs and whether the property has leasehold or estate charges. The deposit is still only the starting point.",
          "Mortgage repayments could be a major additional cost in year one, so this example deliberately keeps them separate rather than pretending one repayment figure fits every buyer."
        ]
      },
      {
        title: "What buyers often underestimate in the first year",
        paragraphs: [
          "The deposit is only one part of the cash requirement. Some costs are paid before completion, the completion month itself can be expensive, and moving-in costs can overlap with the first council tax, utility and insurance bills.",
          "Furnishing can also run beyond move-in week. Appliances, curtains, tools, repairs and smaller household items often arrive in waves, just as the first-year home ownership costs begin.",
          "Leasehold service charges, estate charges, repairs and setup spending can surprise buyers who only model the legal purchase total. The cost of buying a house in the first year should therefore be planned as a timeline, not a single completion-day number."
        ]
      },
      {
        title: "Estimate your own first-year home buying cost",
        paragraphs: [
          "The examples above are planning illustrations. Your own result will depend on property price, nation, buyer type, deposit, tax treatment, mortgage fees, survey level, moving choices, furnishing needs and the first-year ownership costs for the home.",
          "Use the home buying cost calculator to model the purchase price, nation, buyer type and assumptions, then add your own first-year ownership estimates for council tax, utilities, insurance, maintenance and any service charge."
        ],
        callout:
          "Figures on this page are for guidance only. Buyers should check final numbers with their solicitor, lender, insurer and the relevant official authority before making decisions."
      }
    ],
    faqs: [
      {
        question: "What is the first year cost of buying a house?",
        answer:
          "The first year cost of buying a house is the total cash picture across the purchase and the first year of ownership. It includes the deposit, upfront costs of buying a house, completion-day costs, moving-in costs, furnishing or setup costs and first-year home ownership costs. Mortgage repayments should be modelled separately because they depend on the loan size, interest rate and term."
      },
      {
        question: "What costs do I pay before completion?",
        answer:
          "Before completion, buyers may pay for a survey, mortgage-related fees, valuation fees where charged, solicitor account payments, searches, ID checks and some conveyancing disbursements. These costs can be due before the purchase is legally complete, and some may be paid before exchange. That is why the first-year budget should start before completion day, not after it."
      },
      {
        question: "What do I pay on completion day?",
        answer:
          "Completion-day costs usually include the deposit balance, property tax where applicable, the final solicitor or conveyancer balance, registration-style fees and any lender fees not added to the mortgage. Leasehold purchases may also include completion notices, administration charges or other building-related fees. Your solicitor's completion statement should show the final amounts before funds are sent."
      },
      {
        question: "Do first-year costs include mortgage payments?",
        answer:
          "They can if you are building a complete household budget, but the examples on this page exclude mortgage repayments because they vary too much by loan size, rate, term and product choice. Buyers should add their own expected mortgage payments separately. The non-mortgage figures still matter because council tax, utilities, insurance, maintenance and service charges can continue every month after completion."
      },
      {
        question: "How much should I budget for furnishing after buying a house?",
        answer:
          "There is no single safe figure because furnishing costs depend on what you already own, what the property includes and how quickly each room needs to be usable. A practical approach is to split essentials from upgrades. Beds, appliances, curtains or blinds, basic seating and cooking items may be needed quickly, while decorative furniture, garden items and room improvements can often be phased."
      },
      {
        question: "What costs do buyers often forget in the first year?",
        answer:
          "Buyers often forget survey upgrades, bank transfer fees, locksmiths, cleaning, small repairs, immediate furnishings, insurance renewals, maintenance and service charges. The first year can feel tight because several of these costs overlap with the first council tax, utility, broadband and insurance bills. This is why the cost of buying a house in the first year should include both transaction costs and ownership costs."
      },
      {
        question: "How can I estimate my own first-year buying cost?",
        answer:
          "Start with the home buying cost calculator to estimate the purchase total using your property price, nation, buyer type and deposit assumptions. Then add moving costs, furnishing costs and first-year non-mortgage ownership costs such as council tax, utilities, insurance and maintenance. Before relying on the result, check official tax and registration figures and confirm final costs with your solicitor, lender and insurer."
      }
    ],
    showFaqAnswersExpanded: true,
    relatedGuides: [
      "hidden-costs-buying-house",
      "how-much-money-needed-buy-house",
      "stamp-duty-explained",
      "mortgage-fees-costs",
      "moving-costs-uk",
      "furnishing-costs-uk",
      "cost-of-owning-home-uk",
      "insurance-costs-uk",
      "leasehold-costs-uk",
      "methodology"
    ],
    officialSourceKeys: [
      "moneyHelperBuyingMoving",
      "moneyHelperHomeBuying",
      "govUkSdltGuide",
      "revenueScotlandLbttGuide",
      "govWalesLttGuide"
    ],
    sourceKeys: ["sdlt", "lbtt", "lbttAds", "ltt", "hmlr", "councilTax"],
    includeGeneratedSections: false,
    includeGeneratedFaqs: false,
    ctaTitle: "Estimate the full first-year picture",
    ctaText:
      "Use the home buying cost calculator for the buying total, then add first-year ownership, moving and setup costs so the deposit does not hide the wider cash requirement.",
    topicLabel: "first-year home buying costs",
    buyerContext: "Purchase price, nation, buyer type, deposit size, moving needs and the first year of ownership bills",
    costDrivers: [
      "deposit size",
      "property tax treatment",
      "legal and mortgage fees",
      "moving-in costs",
      "furnishing needs",
      "first-year ownership bills"
    ],
    paymentRows: [
      ["Before completion", "Surveys, mortgage fees, searches and solicitor account payments", "Some spending begins before the purchase is guaranteed"],
      ["Completion", "Deposit balance, property tax and final legal balance", "Usually the biggest concentrated cash point"],
      ["Move-in", "Removals, cleaning, locks, setup and furnishing", "Often overlaps with the first ownership bills"],
      ["First year", "Council tax, utilities, insurance, maintenance and service charge where relevant", "Shows why the first year needs more than a completion-day budget"]
    ],
    comparisonCaption: "How first-year buying costs change by purchase size",
    comparisonRows: [
      ["£250,000 purchase", "Lower deposit and lighter tax pressure may help", "Still needs a separate fee, move-in and ownership-cost buffer"],
      ["£350,000 purchase", "Tax, furnishing and first-year bills become more material", "Completion and first-year costs should be planned together"],
      ["£500,000 purchase", "Tax and larger setup costs can move the total sharply", "A wider first-year reserve becomes more important"]
    ],
    workedExampleCaption: "First-year home buying cost illustrations",
    workedExampleRows: [
      ["£250,000 purchase", "£39,000 excluding mortgage repayments", "Illustration includes deposit, buying costs, setup and first-year non-mortgage ownership costs"],
      ["£350,000 purchase", "£59,500 excluding mortgage repayments", "Illustration includes a property tax assumption and higher setup costs"],
      ["£500,000 purchase", "£86,900 excluding mortgage repayments", "Illustration shows how higher price points can change the first-year cash requirement"]
    ],
    officialItems: ["property tax bands", "published registration-style fees where applicable", "council tax bands"],
    estimateItems: ["legal fees", "mortgage fees", "survey costs", "moving costs", "furnishing", "insurance", "utilities and maintenance"],
    mistakes: [
      "Treating the deposit as the full cost of buying a house",
      "Forgetting costs paid before completion",
      "Ignoring move-in and furnishing costs",
      "Leaving first-year ownership costs out of the buying budget"
    ],
    checklist: [
      "Separate deposit, transaction costs, move-in costs and first-year running costs",
      "Check property tax rules for England and Northern Ireland, Scotland or Wales",
      "Ask the solicitor and lender which fees are paid before completion",
      "Keep furnishing and setup costs separate from legal costs",
      "Add your own mortgage repayment estimate separately"
    ]
  }),
  createLongGuide({
    slug: "cost-of-owning-home-uk",
    title: "Cost of Owning a Home UK: Monthly Bills & Budget 2026",
    description:
      "See the monthly cost of owning a home in the UK, including council tax, energy, water, insurance, maintenance and leasehold charges, with a worked 2026 budget.",
    keywords: [
      "ongoing costs of owning a home",
      "cost of owning a home",
      "monthly cost of owning a home",
      "costs of owning a house",
      "monthly costs of owning a house"
    ],
    h1: "Ongoing Costs of Owning a Home in the UK",
    intro:
      "The ongoing costs of owning a home in the UK are the regular bills, maintenance allowances and property-specific charges that continue after completion. Buyers who only plan for the purchase day can still feel caught short once mortgage payments, council tax, utilities, insurance and repairs start landing.",
    directAnswer:
      "A practical non-mortgage homeowner budget is about £625 a month, or £7,500 a year, using the worked example in this guide. A £200 monthly leasehold or estate charge would increase that to about £825 a month, or £9,900 a year. Mortgage repayments are additional, and these are illustrative planning figures rather than a UK average.",
    introSections: [
      {
        title: "Typical monthly costs of owning a home in the UK",
        intro:
          "Use this as a planning checklist rather than a promise of what you will pay. The ranges are cautious estimates, and the mortgage line depends heavily on borrowing, rate, term and deposit.",
        table: {
          caption: "Typical monthly ownership cost planning ranges",
          columns: ["Cost category", "Typical monthly planning range", "Notes"],
          rows: [
            ["Mortgage payment", "Varies too much for one range", "Usually the largest cost, driven by loan size, rate, term and deposit"],
            ["Council tax", "About £100 to £300+", "Depends on council tax band, local authority and discounts or exemptions"],
            ["Gas and electricity", "About £100 to £300+", "Usage, insulation, heating type and household size can change this quickly"],
            ["Water", "About £25 to £70+", "Metered use, region and household size affect the monthly amount"],
            ["Broadband / TV / phone", "About £30 to £100+", "Depends on package choices and whether TV services are included"],
            ["Buildings insurance", "About £10 to £40+", "Often required by mortgage lenders, but cost depends on property risk"],
            ["Contents insurance", "About £5 to £30+", "Optional but commonly used to protect belongings"],
            ["Maintenance reserve", "About £100 to £300+", "A planning pot for repairs, servicing and replacement items"],
            ["Service charge / estate charge where relevant", "£0 to £300+", "Applies mainly to leasehold flats and some managed estates"]
          ]
        }
      }
    ],
    contextualLinks: [
      { href: "/#calculator", label: "home buying cost calculator" },
      { href: "/hidden-costs-buying-house", label: "hidden costs of buying a house" },
      { href: "/mortgage-fees-costs", label: "mortgage fees" },
      { href: "/insurance-costs-uk", label: "home insurance costs" },
      { href: "/leasehold-costs-uk", label: "leasehold costs" },
      { href: "/furnishing-costs-uk", label: "cost to furnish a house" },
      { href: "/taxes-and-fees-uk", label: "property taxes and fees" }
    ],
    sections: [
      {
        title: "Mortgage, council tax and utilities",
        paragraphs: [
          "The monthly cost of owning a home in the UK usually starts with the mortgage because that is the largest regular line for many households. But the mortgage payment is only the headline. Council tax, gas, electricity, water, broadband and other household bills form the core cost of simply occupying the property.",
          "A buyer moving from a rental may find some of these familiar, but owner-occupation can still feel different because there is no landlord absorbing repair risk or arranging certain services in the background.",
          "A more useful ownership budget looks at the mortgage and the non-mortgage bills together. The cost of owning a home can feel very different once every direct debit, renewal and repair responsibility is included."
        ]
      },
      {
        title: "Maintenance, repairs and annual sinking costs",
        paragraphs: [
          "The ongoing costs of owning a house in the UK include expenses that do not arrive monthly but still belong in annual planning. Boilers fail, roofs age, gutters need work, appliances die and small maintenance jobs steadily add up.",
          "A practical owner budget therefore includes a maintenance reserve. The exact amount depends on property age and condition, but the principle is simple: if you own the home, repair responsibility usually sits with you.",
          "A cautious maintenance reserve might be a modest monthly amount for a newer, simpler property and more for an older or larger home. This is an estimate-led planning line, not a rule, but ignoring it is one of the easiest ways for ownership costs to surprise you."
        ]
      },
      {
        title: "Insurance, service charges and other ownership-specific costs",
        paragraphs: [
          "Buildings insurance, optional contents cover and, for leasehold owners, service charges and other building-related costs are part of the ownership picture too. They may not feel dramatic in isolation, but together they shape the real monthly and annual burden of the property.",
          "Leasehold owners need to be especially careful because service charge can move over time and reserve fund issues may lead to larger costs later. Managed estates can also carry estate charges, even where the property is freehold.",
          "Owner budgeting therefore needs both a monthly lens and a periodic-cost lens. It is worth checking home insurance costs, leasehold costs and relevant property taxes before treating the mortgage payment as the full housing budget."
        ]
      },
      {
        title: "Example monthly cost of owning a home",
        paragraphs: [
          "This illustration shows how non-mortgage monthly ownership costs can add up for a UK homeowner. It is not advice or an average; it is a simple worked example to show why the monthly cost of owning a home is more than the loan repayment.",
          "In this example, the mortgage is not included because mortgage payments vary too much by borrowing, rate and term. The point is that council tax, utilities, insurance, maintenance and any optional service charge can still create a meaningful monthly total."
        ],
        table: {
          caption: "Illustrative non-mortgage monthly ownership costs",
          columns: ["Cost category", "Illustrative monthly amount", "Notes"],
          rows: [
            ["Council tax", "£180", "Example instalment for local authority tax"],
            ["Utilities", "£180", "Gas and electricity combined for planning"],
            ["Water", "£40", "Metered or regional billing can change this"],
            ["Broadband", "£40", "Basic broadband and household connectivity"],
            ["Insurance", "£35", "Buildings and contents combined as an illustration"],
            ["Maintenance reserve", "£150", "Money set aside for repairs and servicing"],
            ["Optional service charge", "£0 to £200+", "Only applies to some leasehold homes and managed estates"]
          ]
        }
      },
      {
        title: "What homeowners often forget after completion",
        paragraphs: [
          "Many buyers focus hard on the purchase itself and then treat the first year of ownership as if it will run like renting. The costs of owning a house can feel different because repairs, maintenance choices, insurance renewals and service charge changes sit with the owner.",
          "Furniture and setup spending can also continue after move-in. If the home needs curtains, appliances, flooring, garden tools or basic furnishings, the cost to furnish a house can overlap with the first few months of ownership.",
          "The safest approach is to separate upfront buying costs from ongoing running costs. Use the home buying cost calculator for the purchase total, then use this page to sense-check the monthly costs of owning a house once the keys are yours."
        ],
        callout:
          "The mortgage is usually the largest monthly ownership cost, but non-mortgage costs can still add up quickly if council tax, utilities, insurance, maintenance and leasehold charges are not planned separately."
      }
    ],
    faqs: [
      {
        question: "What are the ongoing costs of owning a home?",
        answer:
          "The ongoing costs of owning a home usually include the mortgage, council tax, utilities, insurance, maintenance and repairs. Leasehold homes and some managed estates may also have service charges, ground rent or estate charges."
      },
      {
        question: "How much does it cost per month to own a house in the UK?",
        answer:
          "There is no single reliable monthly figure because mortgage payments, council tax bands, energy use and property type vary widely. A useful planning method is to list the mortgage separately, then add council tax, utilities, insurance, maintenance and any leasehold or estate charges."
      },
      {
        question: "What costs do homeowners often forget?",
        answer:
          "Homeowners often forget irregular costs such as boiler servicing, repairs, appliance replacement, gutter work, insurance renewals and maintenance materials. Leasehold owners may also underestimate service charge changes or reserve-fund contributions."
      },
      {
        question: "How much should I budget for home maintenance?",
        answer:
          "A maintenance budget is an estimate, not a fixed rule. Many owners set aside a monthly reserve, with older, larger or more complex homes usually needing a more cautious allowance than newer, simpler properties."
      },
      {
        question: "Are ongoing home ownership costs higher for leasehold properties?",
        answer:
          "They can be higher because service charges, reserve funds, management fees and ground rent where applicable can sit on top of normal household bills. Buyers should check the leasehold costs before exchange and allow for possible changes over time."
      }
    ],
    relatedGuides: [
      "first-year-cost-buying-house-uk",
      "how-much-money-needed-buy-house",
      "hidden-costs-buying-house",
      "mortgage-fees-costs",
      "insurance-costs-uk",
      "leasehold-costs-uk",
      "furnishing-costs-uk",
      "taxes-and-fees-uk"
    ],
    sourceKeys: ["councilTax"],
    includeGeneratedSections: false,
    includeGeneratedFaqs: false,
    ctaTitle: "Start with the upfront cost, then plan for ownership",
    ctaText:
      "Use the home buying cost calculator for the upfront purchase total, then pair it with this guide so the monthly reality of ownership is not ignored.",
    topicLabel: "ongoing ownership costs",
    buyerContext: "Mortgage size, property type, local tax band, utility use and maintenance demands",
    costDrivers: [
      "mortgage payment level",
      "council tax band",
      "utility usage",
      "insurance costs",
      "maintenance and repair needs",
      "service charge or estate costs where relevant"
    ],
    paymentRows: [
      ["Immediately after completion", "Council tax setup, utilities, insurance continuity", "Ownership costs begin almost at once"],
      ["Monthly running stage", "Mortgage, utilities and regular direct debits", "This is the core ownership rhythm"],
      ["Seasonal or annual stage", "Insurance renewals, maintenance jobs, servicing", "Important because not all ownership costs are evenly spread"],
      ["Unexpected repair stage", "Boiler, roof or appliance issues", "This is why a maintenance reserve matters"]
    ],
    comparisonCaption: "Why ownership cost profiles differ between homes",
    comparisonRows: [
      ["Modern efficient home", "Lower maintenance and energy pressure may be possible", "Ongoing costs can be steadier"],
      ["Older property", "Higher repair and upkeep risk", "Maintenance reserve matters much more"],
      ["Leasehold flat", "Service charge alters the ownership picture", "Monthly cost is not just mortgage plus utilities"],
      ["Large family house", "Higher utility and repair exposure", "More space usually means more ongoing spend"]
    ],
    workedExampleCaption: "Worked ownership-cost planning examples",
    workedExampleRows: [
      ["Starter home", "Lower running costs but still more than the mortgage alone", "Useful reminder for first-time buyers"],
      ["Family house", "Utilities, tax and maintenance become more material", "Ownership cost rises with both size and complexity"],
      ["Leasehold flat", "Service charge shapes the monthly figure", "Demonstrates why tenure affects ownership as well as purchase"]
    ],
    officialItems: ["council tax bands and local-authority information"],
    estimateItems: ["mortgage payment changes over time, utilities, insurance, maintenance costs and service charge planning"],
    mistakes: [
      "Assuming home ownership cost equals the mortgage payment",
      "Ignoring maintenance because it is irregular",
      "Forgetting service charge on flats or estates",
      "Budgeting for the purchase but not the first year of ownership",
      "Leaving furnishing and setup costs out of the early ownership budget"
    ],
    checklist: [
      "Model monthly running costs before committing to the purchase",
      "Check the council tax band and likely utility profile",
      "Set up a maintenance reserve from the start",
      "Include insurance and service charge where relevant",
      "Review ownership affordability separately from the upfront buying total",
      "Use the hidden costs of buying a house guide to separate purchase costs from ongoing owner costs"
    ]
  }),
  conveyancingCostsGuide,
  costsBeforeCompletionGuide,
  landRegistryFeesGuide,
  ...[250_000, 300_000, 350_000, 400_000, 450_000, 500_000].map((price) => createConsistentPriceGuide(price))
];

export const guides = rawGuides.map(applyGuideConsistency);

export const guideMap = Object.fromEntries(guides.map((guide) => [guide.slug, guide])) as Record<
  string,
  GuidePageContent
>;

export const guideSummaries = guides.map((guide) => ({
  slug: guide.slug,
  href: `/${guide.slug}`,
  title: guide.h1,
  description: guide.description
}));
