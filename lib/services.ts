export type Service = {
  slug: string;
  title: string;
  short: string;
  benefit: string;
  headline: string;
  intro: string;
  audience: string;
  challenges: string[];
  includes: string[];
  ai: string;
  benefits: string[];
  process: string[];
  faq: [string, string][];
  related: string[];
};
export const services: Service[] = [
  {
    slug: "ai-marketing-strategy",
    title: "AI Marketing Strategy and Consulting",
    short: "Not sure where to focus your marketing?",
    benefit: "Get a clear direction before spending more time or money.",
    headline: "Stop guessing what to do next.",
    intro:
      "Posting, running ads, and trying tools without a clear plan can leave you busy but unsure of the results. I help you choose priorities that connect your marketing to your business goals.",
    audience:
      "Business owners who need a starting point or want to make sense of their current marketing.",
    challenges: [
      "Too many ideas, no clear priorities",
      "Money spent on tools you rarely use",
      "Marketing activity with little connection to sales",
    ],
    includes: [
      "Review your customers, offer, and current marketing",
      "Identify the channels and actions worth focusing on",
      "Recommend useful AI tasks and ways to track progress",
    ],
    ai: "AI helps organize research and compare ideas. I review the suggestions against your goals, budget, and business needs.",
    benefits: [
      "Know what to work on first",
      "Make more informed budget choices",
      "Give your content and campaigns a shared direction",
    ],
    process: [
      "Understand your goals and resources",
      "Review your current marketing",
      "Agree on priorities and next steps",
      "Review progress and adjust the plan",
    ],
    faq: [
      [
        "Do I need a plan before running ads?",
        "A clear audience, offer, and next step help you make better use of your ad budget.",
      ],
      [
        "Will I need lots of new tools?",
        "No. We start with the task, then choose a tool only if it is useful.",
      ],
    ],
    related: ["ai-tools-workflows", "paid-advertising"],
  },
  {
    slug: "seo",
    title: "Search Engine Optimization",
    short: "Hard to find when customers search online?",
    benefit: "Help people looking for your services discover your business.",
    headline: "Help customers find you when they need you.",
    intro:
      "If people cannot find your business in search, they may never see what you offer. I help make your website clearer, more useful, and better matched to the questions your customers ask.",
    audience:
      "Businesses with a website that needs better visibility for relevant services or local searches.",
    challenges: [
      "Customers struggle to find your business",
      "Service pages leave important questions unanswered",
      "Website structure makes information hard to find",
    ],
    includes: [
      "Review customer searches and existing pages",
      "Improve page content and links between relevant pages",
      "Identify technical and local search improvements",
    ],
    ai: "AI helps group search topics and outline content. I check the facts and make sure each page answers real customer questions.",
    benefits: [
      "Clearer service information",
      "Pages that better match customer searches",
      "A stronger base for online visibility",
    ],
    process: [
      "Review your website and customer searches",
      "Choose the most useful improvements",
      "Update agreed pages and site details",
      "Track search visibility and inquiry quality",
    ],
    faq: [
      [
        "How soon will search visibility improve?",
        "Timing depends on your website, competition, and the work involved. SEO takes ongoing effort; rankings are not guaranteed.",
      ],
      [
        "Can this help a local business?",
        "It can help when customers search for services in your area. Your location and business details must be accurate.",
      ],
    ],
    related: ["content-marketing", "conversion-optimization"],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    short: "Posting often, but getting few inquiries?",
    benefit: "Give your posts a clear purpose and an easy next step.",
    headline: "Make your social posts useful to your customers.",
    intro:
      "Likes alone do not tell you whether your business is growing. I help you plan relevant posts, explain your offer, and guide interested people toward a conversation.",
    audience:
      "Business owners who struggle to post consistently or connect social activity to customer inquiries.",
    challenges: [
      "You never know what to post",
      "Posts get attention but little customer interest",
      "Planning and replying take too much time",
    ],
    includes: [
      "Choose suitable platforms and content topics",
      "Plan a manageable posting and review routine",
      "Make inquiry steps clear and review customer responses",
    ],
    ai: "AI helps draft captions and adapt approved ideas. I review the wording so it sounds like your business and uses accurate details.",
    benefits: [
      "A more consistent online presence",
      "Content linked to customer needs",
      "A clearer path from a post to an inquiry",
    ],
    process: [
      "Understand your audience",
      "Choose platforms and useful topics",
      "Create and review content",
      "Use customer responses to improve",
    ],
    faq: [
      [
        "Do I need to be on every platform?",
        "No. Focus on where your customers are and what you can maintain.",
      ],
      [
        "Are likes a useful measure?",
        "They can show interest. Relevant inquiries and customer conversations tell us more about business value.",
      ],
    ],
    related: ["content-marketing", "paid-advertising"],
  },
  {
    slug: "content-marketing",
    title: "Content Marketing and AI-Assisted Content Creation",
    short: "Too busy to create clear, useful content?",
    benefit: "Answer customer questions without starting from scratch.",
    headline: "Give customers the answers they need to choose you.",
    intro:
      "When your content is unclear or out of date, customers may leave with unanswered questions. I help turn your business knowledge into useful website copy, articles, and social content.",
    audience:
      "Businesses that need clearer messages or a more manageable content routine.",
    challenges: [
      "You do not know what to write",
      "Your content sounds like every other business",
      "Customers keep asking questions your website should answer",
    ],
    includes: [
      "Find topics based on customer questions",
      "Plan, draft, and review useful content",
      "Recommend ways to reuse approved content",
    ],
    ai: "AI helps with outlines and first drafts. I check the details and refine the copy using your real offer and business knowledge.",
    benefits: [
      "Explain your services more clearly",
      "Create useful answers you can reuse",
      "Spend less time facing a blank page",
    ],
    process: [
      "Collect customer questions",
      "Choose useful topics",
      "Draft and review the content",
      "Publish and learn from customer interest",
    ],
    faq: [
      [
        "Will AI write everything?",
        "AI helps with drafting. People provide business knowledge, check the facts, and approve the final content.",
      ],
      [
        "How often should I publish?",
        "Choose a pace you can maintain. Helpful, accurate content matters more than posting for the sake of it.",
      ],
    ],
    related: ["seo", "social-media-marketing"],
  },
  {
    slug: "paid-advertising",
    title: "Paid Advertising and Lead Generation",
    short: "Paying for clicks, but getting few suitable leads?",
    benefit: "Connect your ads to a clear offer and inquiry process.",
    headline: "Give your ad budget a clearer purpose.",
    intro:
      "Clicks can cost money without bringing the right inquiries. I help connect your audience, ad message, landing page, and follow-up so you can make more informed campaign decisions.",
    audience:
      "Businesses with a clear offer and the capacity to respond to new inquiries.",
    challenges: [
      "Ads attract people who are not a good fit",
      "The offer or next step is unclear",
      "You cannot tell which inquiries are worth the spend",
    ],
    includes: [
      "Review your audience, offer, and campaign direction",
      "Check ad messages and the page visitors land on",
      "Plan how to track inquiries and follow up",
    ],
    ai: "AI helps suggest message variations and organize campaign findings. I review the ideas before making budget or campaign decisions.",
    benefits: [
      "Understand what your ads are leading to",
      "Test messages with a clear purpose",
      "Review lead quality alongside cost",
    ],
    process: [
      "Check your offer and inquiry journey",
      "Agree on budget and campaign goals",
      "Run agreed campaigns and review results",
      "Improve using inquiry and sales feedback",
    ],
    faq: [
      [
        "Is ad spend included?",
        "Ad spend, service fees, and scope are agreed separately before work begins.",
      ],
      [
        "Can you guarantee leads or sales?",
        "No. Results depend on your offer, budget, audience, competition, website, and follow-up.",
      ],
    ],
    related: ["conversion-optimization", "email-marketing-automation"],
  },
  {
    slug: "email-marketing-automation",
    title: "Email Marketing and Marketing Automation",
    short: "Interested customers go quiet after the first inquiry?",
    benefit: "Make follow-up useful, timely, and easier to manage.",
    headline: "Keep interested customers from getting forgotten.",
    intro:
      "A good inquiry can go nowhere if follow-up is missed. I help you plan useful emails and simple reminders so people who have agreed to hear from you get a clear next step.",
    audience:
      "Businesses with an opted-in contact list or an inquiry process that needs more consistent follow-up.",
    challenges: [
      "You forget to follow up",
      "The same emails take time to write",
      "Customers receive messages that do not fit their needs",
    ],
    includes: [
      "Review your contact sources and permission",
      "Plan relevant emails and follow-up steps",
      "Review setup options and test the agreed workflow",
    ],
    ai: "AI helps draft messages and useful variations. I check the facts, permission, and sending rules before a workflow goes live.",
    benefits: [
      "A more consistent follow-up routine",
      "Less repetitive email work",
      "Clearer communication with interested customers",
    ],
    process: [
      "Review contacts and permission",
      "Map the next steps after an inquiry",
      "Prepare messages and test the setup",
      "Review responses and improve",
    ],
    faq: [
      [
        "Do I need a new email tool?",
        "Not always. We first check whether your existing tool can do the job.",
      ],
      [
        "Can I use a purchased contact list?",
        "The focus is on people who have agreed to hear from your business. Contact sources must be reviewed before sending.",
      ],
    ],
    related: ["ai-tools-workflows", "paid-advertising"],
  },
  {
    slug: "conversion-optimization",
    title: "Website and Landing Page Conversion Optimization",
    short: "People visit your website, then leave without asking?",
    benefit: "Make your offer and the next step easier to understand.",
    headline: "Make it easier for website visitors to contact you.",
    intro:
      "If visitors cannot understand your offer or use your form, you can lose their interest. I help improve your page messages, buttons, and inquiry steps so the right people can take action.",
    audience:
      "Businesses whose website gets visitors but generates too few relevant inquiries.",
    challenges: [
      "Visitors cannot quickly understand your service",
      "Forms are difficult to use on a phone",
      "There is no clear next step after reading a page",
    ],
    includes: [
      "Review page messages and contact buttons",
      "Check mobile usability and inquiry forms",
      "Prioritize improvements and agree on useful measures",
    ],
    ai: "AI helps suggest clearer wording and summarize feedback. I review each idea against what visitors need to understand and do.",
    benefits: [
      "Explain your offer more clearly",
      "Reduce unnecessary steps before an inquiry",
      "Give mobile visitors a more usable experience",
    ],
    process: [
      "Review the visit-to-inquiry journey",
      "Find confusing messages and difficult steps",
      "Make agreed page improvements",
      "Review inquiry quality and refine",
    ],
    faq: [
      [
        "Do I need a new website?",
        "Not always. Clearer wording, better buttons, or a simpler form may be a useful starting point.",
      ],
      [
        "Will every change bring more inquiries?",
        "No. Changes need evaluation, and results also depend on your visitors and offer.",
      ],
    ],
    related: ["paid-advertising", "seo"],
  },
  {
    slug: "ai-tools-workflows",
    title: "AI Tools Setup and Business Marketing Workflows",
    short: "Interested in AI, but unsure what to use?",
    benefit: "Start with one useful task and a process you can maintain.",
    headline: "Use AI for the work that slows you down.",
    intro:
      "You do not need to learn every AI tool. I help identify a real task, choose suitable tools, and set up a simple process that supports your day-to-day marketing.",
    audience:
      "Business owners and small teams who want practical help choosing and using AI.",
    challenges: [
      "Too many tools to choose from",
      "Repetitive tasks take up your day",
      "You are unsure how to check AI output",
    ],
    includes: [
      "Review recurring tasks and suitable tools",
      "Plan setup and human review steps",
      "Prepare practical usage and maintenance guidance",
    ],
    ai: "AI helps organize information and prepare drafts. Customer-facing work is reviewed, and sensitive data needs suitable controls.",
    benefits: [
      "A clearer way to use AI",
      "Less time spent repeating basic tasks",
      "More confidence reviewing the output",
    ],
    process: [
      "Choose one recurring task",
      "Check tool costs and data needs",
      "Set up and test the process",
      "Document how to use and review it",
    ],
    faq: [
      [
        "Will AI replace my team?",
        "The aim is to help people with routine tasks so they can focus on decisions and customers.",
      ],
      [
        "Are tool subscriptions included?",
        "Third-party costs and access are discussed before setup. No subscriptions are included unless agreed.",
      ],
    ],
    related: ["ai-marketing-strategy", "email-marketing-automation"],
  },
];
