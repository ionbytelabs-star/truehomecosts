import type { GuidePageContent } from "@/content/types";

import { createLongGuide, createPriceGuide } from "./guide-builders";

export const guides: GuidePageContent[] = [
  createLongGuide({
    slug: "hidden-costs-buying-house",
    title: "Hidden Costs of Buying a House in the UK",
    description:
      "A detailed guide to the hidden costs of buying a house in the UK, including solicitor fees, conveyancing disbursements, searches, surveys, transfer fees, indemnity policies and the practical extras buyers often miss.",
    keywords: [
      "hidden costs of buying a house UK",
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
      "Many buyers can quote their deposit target but cannot tell you what the solicitor, surveyor, lender and moving day will add to the final bill. This guide brings those hidden costs together so you can budget for the full purchase rather than the marketing version of it.",
    directAnswer:
      "For a mainstream UK purchase, hidden buying costs often add roughly £2,500 to £7,500 on top of the deposit, and more complex purchases can push comfortably beyond that. Older homes, leasehold flats, fuller surveys, extra legal checks and moving-day costs are the usual reasons the non-deposit total drifts from a few thousand pounds into five figures.",
    sections: [
      {
        title: "Why hidden buying costs catch people out",
        paragraphs: [
          "Hidden costs are rarely hidden in the legal sense. The problem is that they appear in different places, at different times, and under labels that do not mean much to a buyer seeing them for the first time. Estate agent listings focus on the asking price. Mortgage illustrations focus on the loan. Solicitor quotes split legal work from disbursements. By the time all of those pieces are added together, the true total can look very different from the number the buyer had in mind when they booked the first viewing.",
          "This is one reason the phrase hidden costs of buying a house UK is searched so often. Buyers know there must be more to the story than deposit plus stamp duty, but they do not always know what sits between the offer being accepted and the keys landing in their hand.",
          "The practical answer is to treat the purchase as a sequence of real cash calls rather than one single event. If a cost can be triggered by the transaction, it belongs in the transaction budget."
        ]
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
          columns: ["Cost line", "Typical planning range", "What it usually covers"],
          rows: [
            ["Solicitor legal fee", "£950 to £1,950+", "The lawyer's work on the transaction"],
            ["Search pack", "£180 to £430", "Local authority, drainage and environmental searches"],
            ["Telegraphic transfer fee", "£25 to £55", "Secure transfer of completion funds"],
            ["Registration fee", "£20 to £500+", "Official registration or filing fee"],
            ["ID, AML or admin checks", "Usually modest but variable", "Compliance checks carried out by the firm"]
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
      "how-much-money-needed-buy-house",
      "mortgage-fees-costs",
      "leasehold-costs-uk",
      "moving-costs-uk"
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
    slug: "how-much-money-needed-buy-house",
    title: "How Much Money Do I Need to Buy a House in the UK?",
    description:
      "Work out how much money you need to buy a house in the UK, including deposit, upfront costs, pre-exchange costs, solicitor fees, property tax and the cash needed after an offer is accepted.",
    keywords: [
      "how much money do I need to buy a house UK",
      "how much savings needed to buy a house UK",
      "how much cash do you need to buy a house UK",
      "what do you pay upfront when buying a house UK",
      "costs before exchange of contracts UK",
      "costs before buying a house UK",
      "when do you pay stamp duty UK",
      "when do you pay solicitor fees UK",
      "costs after offer accepted UK house"
    ],
    h1: "How much money do I need to buy a house in the UK?",
    intro:
      "Most buyers start with the deposit, but the better question is how much cash you need overall to get from accepted offer to completed move. That total is often much higher than people first expect.",
    directAnswer:
      "In practice, the money needed to buy a house in the UK is the deposit plus roughly £3,000 to £10,000 or more of extra costs, depending on property price, location, buyer type and how involved the transaction becomes. A buyer putting 10% down on a £300,000 home might therefore need £30,000 for the deposit and several thousand pounds more for tax, legal work, survey costs, mortgage fees, moving and a buffer.",
    sections: [
      {
        title: "Start with the deposit, but do not stop there",
        paragraphs: [
          "How much savings needed to buy a house UK is not the same question as how big a deposit you can save. The deposit is usually the biggest single line, but it is only part of the cash picture. Buyers who hit a deposit target and stop there often discover that the surrounding buying costs still need several thousand pounds of their own money.",
          "At modest purchase prices, the gap between deposit-only thinking and full-budget thinking can already be painful. At higher prices, that gap becomes even more obvious because both tax and other professional costs can start to rise.",
          "The practical answer is to think in pots: deposit pot, transaction-cost pot and move-in buffer. If your savings plan does not separate those, it is easy to feel on track until the legal process starts and the extra bills appear."
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
        title: "What do you pay upfront when buying a house in the UK?",
        paragraphs: [
          "The upfront costs buying a house UK are the payments tied to getting the transaction over the line. Some are paid before you are legally committed, such as survey costs or certain lender charges. Others are paid on or around completion, such as the deposit balance, tax, registration fees and the final legal bill.",
          "That timing matters because costs before exchange of contracts UK are riskier in one sense: they are usually sunk if the deal collapses. Buyers should still expect them, but they should not confuse them with the money that only becomes due once the transaction is certain.",
          "In other words, the total buying budget is not a single payment date. It is a chain of payments that builds toward completion."
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
        title: "When do you pay stamp duty and solicitor fees in the UK?",
        paragraphs: [
          "When do you pay stamp duty UK is a common concern because buyers often know it is due around completion but not exactly how it appears in the process. In most normal transactions, the solicitor handles the filing and payment shortly after completion, with the money collected from you on the completion statement just beforehand.",
          "When do you pay solicitor fees UK is more flexible. Some firms ask for money on account at the start, some charge for searches as they are ordered, and all will expect final settlement before or on completion. The legal bill therefore tends to be spread across the process rather than appearing only at the end.",
          "This is one more reason to keep accessible cash rather than tying every available pound into the deposit plan."
        ]
      },
      {
        title: "Costs after offer accepted on a UK house purchase",
        paragraphs: [
          "Once an offer is accepted, the tone changes. The purchase stops being a hypothetical budget and starts becoming a sequence of decisions that trigger real spend. Survey choice, solicitor instruction, mortgage application costs and search fees all become concrete rather than theoretical.",
          "Many buyers are surprised that so many costs after offer accepted UK house arrive before the transaction feels secure. That is normal. It is also why a buyer can lose money even when they walk away for good reasons.",
          "The right response is not to avoid those costs altogether, but to plan them from the start and keep a buffer for the possibility that the first property you progress does not become the property you complete on."
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
        }
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
      "hidden-costs-buying-house",
      "stamp-duty-explained",
      "first-time-buyer-costs",
      "mortgage-fees-costs"
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
  createLongGuide({
    slug: "stamp-duty-explained",
    title: "Stamp Duty Explained for UK Buyers",
    description:
      "Understand stamp duty and UK property purchase tax in plain English, including SDLT, LBTT, LTT, first-time buyer treatment, second-home costs and the main 2026 differences by nation.",
    keywords: [
      "stamp duty calculator UK",
      "how much stamp duty will I pay UK",
      "stamp duty first time buyer UK",
      "stamp duty first time buyer UK 2026",
      "stamp duty second home UK calculator",
      "buying second home costs UK",
      "LBTT calculator Scotland 2026",
      "LTT rates Wales 2026"
    ],
    h1: "Stamp duty explained: UK property tax in plain English",
    intro:
      "Most buyers still say stamp duty as a catch-all phrase, but the UK does not have one single system. The rules depend on where the property is, whether you are a first-time buyer, and whether the purchase counts as an additional property.",
    directAnswer:
      "There is no single UK-wide stamp duty figure: England and Northern Ireland use SDLT, Scotland uses LBTT and Wales uses LTT. On a £300,000 purchase, the tax can be nil, modest or materially higher depending on the nation, whether the buyer is a first-time buyer or mover, and whether the purchase counts as an additional property.",
    sections: [
      {
        title: "England and Northern Ireland: how SDLT works",
        paragraphs: [
          "SDLT is charged in slices rather than one flat percentage on the whole price. That means buyers asking how much stamp duty will I pay UK need to know where their price sits in the band structure, not just the top rate they have seen quoted in a headline.",
          "For mainstream residential buyers, the nil-rate threshold and the bands above it determine how much of the purchase price is taxed at each level. That structure is central to why a calculator is more useful than a rough guess.",
          "The same slice-based logic also explains why crossing a threshold does not suddenly mean the higher rate applies to the whole purchase price."
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
        title: "Stamp duty first-time buyer rules in 2026",
        paragraphs: [
          "Stamp duty first time buyer UK 2026 searches are common because relief rules matter hugely to affordability. In England and Northern Ireland, eligible first-time buyers can receive relief on purchases up to the relevant price limit, which lowers or removes SDLT compared with a standard home mover calculation.",
          "That can make a major difference to the total upfront cash needed, but it should not be confused with a full exemption from buying costs. Relief changes the tax line, not the solicitor fee, survey, mortgage or moving budget.",
          "Scotland also gives first-time buyers special treatment, but it does so differently through the LBTT threshold. Wales does not have a separate first-time buyer residential LTT rate in the same way."
        ]
      },
      {
        title: "Second-home and additional-property costs",
        paragraphs: [
          "Stamp duty second home UK calculator and buying second home costs UK are usually searches driven by surprise. Buyers often know there is an extra tax hit but underestimate how much it can change the all-in figure. In England and Northern Ireland, an additional-property surcharge is usually added on top of the standard SDLT calculation. Scotland applies the Additional Dwelling Supplement. Wales uses a separate higher residential LTT structure.",
          "These differences are one reason second-home budgets should never be copied from standard owner-occupier examples. The deposit expectation may also be different, which means both the deposit and the tax can move against you at the same time.",
          "If the purchase is meant to replace a main home, refund rules or exceptions may matter, but those are technical and timing-sensitive. Buyers should check the exact position rather than assuming higher rates definitely apply forever."
        ],
        table: {
          caption: "How higher-rate treatment differs across the UK",
          columns: ["Nation", "Higher-rate approach", "What buyers should notice"],
          rows: [
            ["England / Northern Ireland", "Additional-property surcharge on top of SDLT", "Second-home tax can rise sharply even at common price points"],
            ["Scotland", "ADS added on top of LBTT", "Scottish additional-property budgets should not be based on SDLT examples"],
            ["Wales", "Higher residential LTT bands", "The whole calculation uses a different higher-rate structure"]
          ]
        }
      },
      {
        title: "Scotland LBTT and Wales LTT in 2026",
        paragraphs: [
          "LBTT calculator Scotland 2026 and LTT rates Wales 2026 are useful searches because many buyers assume all UK property tax works the same way. It does not. Scotland uses its own thresholds, and Wales uses its own thresholds and rates too.",
          "That means a purchase price that looks manageable in one nation can produce a noticeably different tax bill in another. Buyers moving across borders inside the UK often discover this late if they have only read England-focused stamp duty articles.",
          "The cleanest approach is to calculate the tax using the nation where the property sits, then treat any cross-UK comparison as a separate exercise rather than relying on memory."
        ]
      },
      {
        title: "Worked tax examples buyers can understand quickly",
        paragraphs: [
          "Worked examples are useful because tax explanations can feel abstract until buyers see a real price point. The examples below are not designed to replace official checks, but they do show why the same property price does not generate the same tax everywhere in the UK.",
          "They also show why first-time buyer status and additional-property status matter so much to the result."
        ],
        table: {
          caption: "Illustrative property tax examples",
          columns: ["Scenario", "Illustrative result", "Why it matters"],
          rows: [
            ["£250,000 first-time buyer in England", "£0 SDLT", "Relief can remove SDLT at this price point"],
            ["£300,000 home mover in Scotland", "LBTT applies under Scottish bands", "A Scottish buyer should use LBTT logic, not SDLT assumptions"],
            ["£400,000 home mover in Wales", "LTT applies under Welsh bands", "Wales uses a different main threshold and rate pattern"],
            ["Additional property purchase", "Higher-rate treatment applies in each nation differently", "Second-home buyers need a dedicated calculation"]
          ]
        }
      }
    ],
    faqs: [
      {
        question: "Is stamp duty the same across the whole UK?",
        answer:
          "No. England and Northern Ireland use SDLT, Scotland uses LBTT, and Wales uses LTT."
      },
      {
        question: "Do first-time buyers pay stamp duty in 2026?",
        answer:
          "Sometimes. Relief exists in England, Northern Ireland and Scotland, but the rules differ. Wales does not have the same separate first-time buyer residential treatment."
      },
      {
        question: "How do second-home costs change the tax bill?",
        answer:
          "Additional-property buyers usually face higher-rate treatment, but the exact method differs between SDLT, LBTT and LTT."
      },
      {
        question: "When is stamp duty or equivalent property tax paid?",
        answer:
          "It is usually handled by the solicitor around completion, with the money collected from the buyer shortly before completion."
      }
    ],
    relatedGuides: [
      "regional-property-costs-uk",
      "how-much-money-needed-buy-house",
      "first-time-buyer-costs",
      "taxes-and-fees-uk"
    ],
    sourceKeys: ["sdlt", "lbtt", "lbttAds", "ltt"],
    ctaTitle: "Check the tax within your full buying budget",
    ctaText:
      "Run the calculator to estimate SDLT, LBTT or LTT alongside deposit and the other upfront costs buyers face.",
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
      ["Scotland buyer", "LBTT thresholds and relief rules differ", "English examples cannot simply be reused"],
      ["Wales buyer", "LTT thresholds differ and no separate first-time buyer residential rate applies in the same way", "Welsh buyers need Welsh calculations"]
    ],
    workedExampleCaption: "Practical property-tax examples buyers often compare",
    workedExampleRows: [
      ["£250,000 first-time buyer case", "May produce no SDLT in England", "Relief can materially change the all-in total"],
      ["£300,000 onward move case", "Property tax applies in each nation under different bands", "Cross-UK comparison matters"],
      ["£400,000 family home case", "Tax becomes too large to ignore as a side note", "This is often where buyers feel the difference most sharply"],
      ["Second-home case", "Higher-rate treatment dominates the tax line", "A dedicated second-home calculation is essential"]
    ],
    officialItems: ["SDLT rates", "LBTT rates", "LTT rates", "published higher-rate treatment rules"],
    estimateItems: ["none of the tax bands themselves, but related legal and practical costs around the purchase are still estimates"],
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
  }),
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
          columns: ["Fee type", "Is it always charged?", "What to think about"],
          rows: [
            ["Broker fee", "No", "Check the service and whether the market search is broad enough"],
            ["Booking or application fee", "No", "Can reserve the product but may not be refundable"],
            ["Arrangement fee", "No", "Compare it against the rate benefit and the likely loan term"],
            ["Valuation fee", "No", "Some lenders include a basic valuation, some do not"]
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
          columns: ["Category", "Typical range pattern", "Why it matters"],
          rows: [
            ["Removal company", "Hundreds to low thousands", "Usually the biggest moving-day cost"],
            ["Packing service", "Adds to the removal quote", "Useful when time or complexity is high"],
            ["Storage", "Weekly or monthly cost plus logistics", "Important if dates do not line up neatly"],
            ["Mail redirection", "Smaller fixed cost", "Easy to forget but practical"],
            ["Locks, cleaning, broadband and setup", "Often smaller individual costs", "Together they materially change the move-in week total"]
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
      "furnishing-costs-uk",
      "hidden-costs-buying-house",
      "insurance-costs-uk",
      "how-much-money-needed-buy-house"
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
        ]
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
          columns: ["Leasehold cost", "Why it appears", "Budget effect"],
          rows: [
            ["Management information and pack fees", "Building paperwork and solicitor checks", "Can add hundreds of pounds to the process"],
            ["Notice fees", "Formal notice to landlord or agent", "Often modest individually but still real"],
            ["Deed or certificate fees", "Lease-specific compliance", "Another example of buyer-facing admin that freehold buyers may not see"],
            ["Reserve or service-charge adjustments", "Apportionments around completion", "Can affect immediate post-completion cash flow"]
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
          columns: ["Transaction value", "Fee", "Why buyers care"],
          rows: [
            ["Up to £80,000", "£20", "Shows how low-value transfers are charged"],
            ["£80,001 to £100,000", "£40", "Early jump in the fee scale"],
            ["£100,001 to £200,000", "£100", "Relevant to many mainstream purchases"],
            ["£200,001 to £500,000", "£150", "Common owner-occupier band"],
            ["£500,001 to £1 million", "£295", "Higher-value band"],
            ["Over £1 million", "£500", "Top band in the calculator dataset"]
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
    relatedGuides: ["moving-costs-uk", "first-time-buyer-costs", "how-much-money-needed-buy-house"],
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
    slug: "cost-of-owning-home-uk",
    title: "Cost of Owning a Home in the UK",
    description:
      "A guide to the ongoing cost of owning a home in the UK, including mortgage payments, council tax, insurance, utilities, maintenance and the monthly cost of running a home after buying it.",
    keywords: ["ongoing costs owning a house UK", "monthly cost owning a home UK"],
    h1: "Cost of owning a home in the UK",
    intro:
      "Buying a home is the first financial hurdle, but ownership has its own rhythm of regular bills, maintenance and periodic larger costs. Buyers who only plan for completion day can still feel caught short once the first few months of ownership begin.",
    directAnswer:
      "The ongoing cost of owning a home usually means the mortgage plus council tax, utilities, insurance and a maintenance allowance, with leasehold or estate charges added where relevant. For many households, the non-mortgage running costs alone still run to several hundred pounds a month before any major repair bill arrives, which is why ownership budgeting needs to go beyond the mortgage payment.",
    sections: [
      {
        title: "Mortgage, council tax and utilities",
        paragraphs: [
          "Monthly cost owning a home UK usually starts with the mortgage because that is the largest regular line for many households. But the mortgage payment is only the headline. Council tax, gas, electricity, water, broadband and other standing household bills form the core cost of simply occupying the property.",
          "A buyer moving from a rental may find some of these familiar, but owner-occupation can still feel different because there is no landlord absorbing repair risk or arranging certain services in the background.",
          "That is why affordability after completion should be modelled as a full running-cost picture rather than a mortgage-payment-only picture."
        ]
      },
      {
        title: "Maintenance, repairs and annual sinking costs",
        paragraphs: [
          "Ongoing costs owning a house UK include the expenses that do not arrive monthly but still belong in annual planning. Boilers fail, roofs age, gutters need work, appliances die and small maintenance jobs steadily add up.",
          "A practical owner budget therefore includes a maintenance reserve. The exact amount depends on property age and condition, but the principle is simple: if you own the home, repair responsibility usually sits with you.",
          "This is one reason older homes can feel more affordable to buy than to keep."
        ]
      },
      {
        title: "Insurance, service charges and other ownership-specific costs",
        paragraphs: [
          "Buildings insurance, optional contents cover and, for leasehold owners, service charges and other building-related costs are part of the ownership picture too. They may not feel dramatic in isolation, but together they shape the real monthly and annual burden of the property.",
          "Leasehold owners need to be especially careful because service charge can move over time and reserve fund issues may lead to larger costs later.",
          "Owner-occupier budgeting therefore needs both a monthly lens and a periodic-cost lens."
        ]
      },
      {
        title: "Worked monthly ownership examples",
        paragraphs: [
          "A good ownership plan looks at the home as a system rather than a series of disconnected bills. Mortgage, council tax, utilities, insurance and maintenance reserve all belong on the same planning sheet.",
          "The exact monthly figure varies too much by mortgage rate, household usage and property type for one universal number to be honest, but the structure is stable enough that buyers can still prepare intelligently."
        ],
        table: {
          caption: "Ongoing ownership cost categories",
          columns: ["Category", "How it tends to appear", "Why it matters"],
          rows: [
            ["Mortgage", "Monthly", "Usually the biggest fixed line"],
            ["Council tax", "Monthly or by instalment plan", "Official local charge that starts quickly after move-in"],
            ["Utilities and broadband", "Monthly", "Essential running cost rather than optional extra"],
            ["Insurance", "Monthly or annual", "Protects the asset and household budget"],
            ["Maintenance reserve", "Monthly saving for periodic costs", "The part many owners forget until something breaks"],
            ["Service charge or similar", "Monthly, quarterly or annually", "Critical for flats and some estates"]
          ]
        }
      }
    ],
    faqs: [
      {
        question: "What are the ongoing costs of owning a house in the UK?",
        answer:
          "They usually include the mortgage, council tax, utilities, insurance, maintenance and repair costs, plus any leasehold or estate-related charges where relevant."
      },
      {
        question: "Is the monthly cost of owning a home just the mortgage payment?",
        answer:
          "No. Council tax, utilities, insurance and maintenance can materially change the real monthly figure."
      },
      {
        question: "Should homeowners budget for maintenance every month?",
        answer:
          "Yes. Even if maintenance is not spent monthly, setting aside money each month is one of the safest ways to avoid repair shocks."
      },
      {
        question: "Do leasehold owners have higher ongoing housing costs?",
        answer:
          "Often they can, because service charges and reserve-fund issues add another layer on top of ordinary owner costs."
      }
    ],
    relatedGuides: [
      "how-much-money-needed-buy-house",
      "leasehold-costs-uk",
      "insurance-costs-uk",
      "taxes-and-fees-uk"
    ],
    sourceKeys: ["councilTax"],
    ctaTitle: "Start with the upfront cost, then plan for ownership",
    ctaText:
      "Use the homepage calculator for the buying total, then pair it with this guide so the monthly reality of ownership is not ignored.",
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
    estimateItems: ["mortgage payment changes over time, utilities, insurance and maintenance costs"],
    mistakes: [
      "Assuming home ownership cost equals the mortgage payment",
      "Ignoring maintenance because it is irregular",
      "Forgetting service charge on flats or estates",
      "Budgeting for the purchase but not the first year of ownership"
    ],
    checklist: [
      "Model monthly running costs before committing to the purchase",
      "Check the council tax band and likely utility profile",
      "Set up a maintenance reserve from the start",
      "Include insurance and service charge where relevant",
      "Review ownership affordability separately from the upfront buying total"
    ]
  }),
  ...[250_000, 300_000, 350_000, 400_000, 450_000, 500_000].map((price) => createPriceGuide(price))
];

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
