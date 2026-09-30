export const categories = ['All', 'Programming', 'Analytics', 'Development', 'Design', 'AI/ML'];

const lesson = (title, minutes, summary) => ({ title, minutes, summary });

export const courses = [
  {
    id: 'product-design',
    title: 'Product Design Fundamentals',
    shortTitle: 'Product Design',
    category: 'Design',
    tag: 'UI / UX',
    level: 'Beginner',
    instructor: 'Priya S.',
    instructorRole: 'Product Design Lead',
    blurb: 'Learn design metrics, user flows, and the craft of shipping interfaces people trust.',
    rating: 4.8,
    students: 1459,
    price: 1459,
    lessonsTotal: 24,
    accent: '#7c5cff',
    art: 'design',
    lessons: [
      lesson('What design metrics actually measure', 16, 'Design metrics help measure whether a design improves the user experience and supports business goals.'),
      lesson('Mapping a user journey', 18, 'Turn interviews into a journey map with moments of friction called out.'),
      lesson('Information architecture', 20, 'Group content so people can find the next step without guessing.'),
      lesson('Wireframes that decide, not decorate', 22, 'Low-fidelity frames force the team to agree on structure first.'),
      lesson('Visual hierarchy', 14, 'Type, contrast, and spacing tell the eye where to start.'),
      lesson('Design systems in practice', 19, 'Tokens, components, and when to break the system on purpose.'),
      lesson('Usability testing', 21, 'Five users, one task, and a notes template that leads to a decision.'),
      lesson('Accessibility basics', 17, 'Contrast, focus order, and labels that screen readers can use.'),
      lesson('Handoff to engineering', 15, 'Specs, states, and the questions engineers will ask.'),
      lesson('Critique without ego', 12, 'How to run a critique that changes the work.'),
      lesson('Metrics for Designers', 20, 'Design metrics help measure whether a design improves the user experience and supports business goals. Instead of relying on opinions, designers use data to evaluate success.'),
      lesson('North-star metrics', 18, 'Pick one outcome metric and the leading indicators that move it.'),
      lesson('Funnel drop-off', 16, 'Read a funnel and decide which step is worth redesigning.'),
      lesson('Experiment design', 22, 'Write a hypothesis that can be proven wrong.'),
      lesson('Empty, loading, and error states', 14, 'The screens people remember are the ones that fail gracefully.'),
      lesson('Onboarding flows', 19, 'Get to the first success moment in under two minutes.'),
      lesson('Mobile patterns', 17, 'Thumb zones, sheets, and when a desktop pattern should not shrink.'),
      lesson('Content design', 13, 'Buttons, errors, and empty states written in the product voice.'),
      lesson('Research synthesis', 21, 'Cluster notes into themes a stakeholder can act on.'),
      lesson('Prioritising a backlog', 15, 'Impact, confidence, and the cost of waiting.'),
      lesson('Stakeholder reviews', 16, 'Show the decision, not every option you discarded.'),
      lesson('Portfolio case study', 24, 'Tell the story from problem to metric, not from screen to screen.'),
      lesson('Design ethics', 12, 'Dark patterns, consent, and the line you will not cross.'),
      lesson('Capstone review', 25, 'Present the redesigned flow and the metric you expect to move.'),
    ],
  },
  {
    id: 'react',
    title: 'Mastering React & Next.js',
    shortTitle: 'React & JavaScript',
    checkoutTitle: 'React JS Complete Guide',
    checkoutAuthor: 'John Sena',
    category: 'Development',
    tag: 'DEVELOPMENT',
    level: 'Intermediate',
    instructor: 'Karan M.',
    instructorRole: 'Frontend Engineer',
    blurb: 'Dive in and learn React.js from scratch! Learn React, Hooks, Redux, React Router, Next.js, Best Practices and way more!',
    rating: 4.9,
    students: 1248,
    price: 599,
    listPrice: 1459,
    lessonsTotal: 32,
    accent: '#38bdf8',
    art: 'react',
    lessons: [
      lesson('JavaScript you actually need', 18, 'Closures, array methods, and the event loop in the amount a React app uses.'),
      lesson('Components and JSX', 16, 'A component is a function that returns UI. JSX is the syntax for that UI.'),
      lesson('Props and composition', 17, 'Pass data down and compose small pieces instead of one giant file.'),
      lesson('State and events', 19, 'useState, controlled inputs, and why updates are asynchronous.'),
      lesson('Rendering lists', 14, 'Keys, derived data, and the bug that happens when the key is the index.'),
      lesson('React & JavaScript in practice', 22, 'Build a small course card with state, props, and a list of lessons.'),
      lesson('Effects and data fetching', 20, 'useEffect for syncing with something outside React, and how to cancel it.'),
      lesson('Forms', 16, 'Controlled fields, validation, and a submit handler that does not refresh the page.'),
      lesson('React Router', 21, 'Routes, params, nested layouts, and protected pages.'),
      lesson('Context', 18, 'Share session and cart state without threading props through every file.'),
      lesson('Custom hooks', 15, 'Extract a player, a form, or a fetch into a hook with a clear name.'),
      lesson('Performance', 17, 'memo, useMemo, and the cases where they make things worse.'),
      lesson('Redux essentials', 22, 'Store, actions, and when context is enough.'),
      lesson('Next.js pages', 20, 'File-based routes and the difference between server and client components.'),
      lesson('Data on the server', 19, 'Loading states, errors, and keeping secrets off the client.'),
      lesson('Styling', 14, 'Global CSS, modules, and a small set of tokens.'),
      lesson('Accessibility in React', 13, 'Labels, buttons, and focus after a route change.'),
      lesson('Testing components', 18, 'Render, click, and assert what the user sees.'),
      lesson('Best practices', 16, 'File structure, naming, and the habits that keep a codebase boring.'),
    ],
  },
  {
    id: 'sql-excel',
    title: 'Data Analysis with SQL and Excel',
    shortTitle: 'SQL and Excel',
    category: 'Analytics',
    tag: 'DATA ANALYTICS',
    level: 'Advanced',
    instructor: 'Aarohi R.',
    instructorRole: 'Analytics Lead',
    blurb: 'Relational databases, Advanced SQL, Queries, Joins, and Pivot Tables.',
    rating: 4.9,
    students: 1388,
    price: 1459,
    lessonsTotal: 20,
    accent: '#34d399',
    art: 'analytics',
    lessons: [
      lesson('Tables, rows, and keys', 15, 'A relational table is a set of facts with a key that identifies each row.'),
      lesson('SELECT and WHERE', 16, 'Filter to the rows a question actually needs.'),
      lesson('Aggregates', 18, 'COUNT, SUM, and AVG, and why you group before you filter aggregates.'),
      lesson('Joins', 22, 'Inner, left, and the duplicate-row surprise.'),
      lesson('Subqueries', 17, 'A query inside a query when a join would hide the logic.'),
      lesson('Window functions', 20, 'Rank, running totals, and comparing a row to its group.'),
      lesson('Excel for analysts', 14, 'Tables, structured references, and why you should stop merging cells.'),
      lesson('Pivot tables', 16, 'Slice a dataset the way a stakeholder asks the question.'),
      lesson('Cleaning data', 15, 'Types, blanks, and the checks you run before a chart.'),
      lesson('Charts that argue', 13, 'One claim per chart, with the comparison made obvious.'),
      lesson('Cohorts', 19, 'Group users by start date and watch what they do next.'),
      lesson('SQL and Excel together', 18, 'Query in SQL, explain in a workbook a manager will open.'),
      lesson('Data Analysis with SQL and Excel', 21, 'Build a weekly revenue view from raw orders and present the drop-off.'),
    ],
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    shortTitle: 'Machine Learning',
    category: 'AI/ML',
    tag: 'AI / ML',
    level: 'Intermediate',
    instructor: 'Anvi D.',
    instructorRole: 'ML Engineer',
    blurb: 'Models, features, and the evaluation habits that keep a model honest.',
    rating: 4.7,
    students: 980,
    price: 1459,
    lessonsTotal: 28,
    accent: '#f59e0b',
    art: 'ml',
    lessons: [
      lesson('What a model is', 14, 'A model is a function fit to examples, not a mind.'),
      lesson('Features and labels', 16, 'The columns you trust and the outcome you are trying to predict.'),
      lesson('Machine Learning in practice', 20, 'Train a first classifier and read the mistakes before the accuracy.'),
      lesson('Train and test', 18, 'Why a score on the training set is not a promise.'),
      lesson('Overfitting', 17, 'A model that memorises will fail on Tuesday’s data.'),
      lesson('Metrics', 19, 'Accuracy, precision, and the metric the business actually feels.'),
    ],
  },
  {
    id: 'python',
    title: 'Introduction to Python Programming',
    shortTitle: 'Python Programming',
    category: 'Programming',
    tag: 'BEGINNER',
    level: 'Beginner',
    instructor: 'Sara N.',
    instructorRole: 'Software Engineer',
    blurb: 'Core Modules, Syntax, Data Structures, Control Flow, and File Handling.',
    rating: 4.8,
    students: 1459,
    price: 1459,
    lessonsTotal: 18,
    accent: '#facc15',
    art: 'python',
    lessons: [
      lesson('Syntax and the first script', 12, 'Print, variables, and running a file from the terminal.'),
      lesson('Data structures', 18, 'Lists, dicts, and the structure that matches the problem.'),
      lesson('Control flow', 16, 'If, loops, and the early return that keeps a function readable.'),
      lesson('Functions', 15, 'Parameters, return values, and names that say what happens.'),
      lesson('Files', 14, 'Read a CSV, handle a missing file, and write a result.'),
      lesson('Modules', 13, 'Import the standard library instead of rewriting it.'),
    ],
  },
  {
    id: 'sql',
    title: 'Structured Query Language',
    shortTitle: 'SQL',
    category: 'Analytics',
    tag: 'SQL',
    level: 'Beginner',
    instructor: 'Aarohi R.',
    instructorRole: 'Analytics Lead',
    blurb: 'Relational database management systems. Useful for handling structured data.',
    rating: 4.9,
    students: 1299,
    price: 1459,
    lessonsTotal: 16,
    accent: '#60a5fa',
    art: 'sql',
    lessons: [
      lesson('Relational databases', 14, 'Tables, keys, and why duplication becomes a bug.'),
      lesson('Querying structured data', 18, 'SELECT the columns the question needs and nothing else.'),
      lesson('Filtering and sorting', 15, 'WHERE, ORDER BY, and LIMIT.'),
      lesson('Joining tables', 20, 'Combine customers and orders without losing the customers who never bought.'),
    ],
  },
];

courses.forEach((course) => {
  const base = course.lessons;
  const needed = course.lessonsTotal - base.length;
  for (let i = 0; i < needed; i += 1) {
    const n = base.length + 1;
    base.push(
      lesson(
        `${course.shortTitle} · Lesson ${n}`,
        12 + (i % 5) * 2,
        `Practice the ideas from ${course.title} on a small, finished example you can explain out loud.`
      )
    );
  }
  course.lessons = base.slice(0, course.lessonsTotal);
});

export const mentors = [
  {
    name: 'Priya S.',
    role: 'Product Design',
    years: '12 yrs',
    tone: '#7c5cff',
  },
  {
    name: 'Karan M.',
    role: 'Frontend',
    years: '9 yrs',
    tone: '#38bdf8',
  },
  {
    name: 'Aarohi R.',
    role: 'Analytics',
    years: '11 yrs',
    tone: '#34d399',
  },
  {
    name: 'Anvi D.',
    role: 'Machine Learning',
    years: '8 yrs',
    tone: '#f59e0b',
  },
];

export const faqs = [
  {
    q: 'Can I learn at my own pace?',
    a: 'Yes. Lessons stay open after you enroll. Pause a classroom video and come back to the same minute.',
  },
  {
    q: 'Do I get a certificate?',
    a: 'Finish every lesson and mark the course complete to unlock a SkillStream certificate you can download.',
  },
  {
    q: 'What if I want to switch courses?',
    a: 'Your account keeps every course you enroll in. Open My Courses and continue any of them.',
  },
  {
    q: 'Is there a refund?',
    a: 'This demo checkout does not charge a card. In the product design, refunds are available for 7 days.',
  },
  {
    q: 'Can I download lessons?',
    a: 'Pro Plan includes downloaded lessons for offline study, listed on Profile & Settings.',
  },
];

export const whyChoose = [
  {
    title: 'Expert mentors',
    text: 'Learn from industry professionals with real world experience.',
  },
  {
    title: 'Certification',
    text: 'Earn recognised certificates to showcase your achievements.',
  },
  {
    title: 'Learn anytime',
    text: 'Access lessons anytime, for life.',
  },
];

export const stats = [
  { value: '12k+', label: 'Learners' },
  { value: '80+', label: 'Courses' },
  { value: '96%', label: 'Finish rate' },
  { value: '24/7', label: 'Classroom access' },
];

export const starterNotifications = [
  {
    id: 'n1',
    title: 'New Courses Launch',
    message: 'Artificial Intelligence',
    type: 'Announcement',
    date: '20th May 2026',
  },
  {
    id: 'n2',
    title: 'Discount Offer',
    message: 'Flat 50% off on all courses',
    type: 'Promotion',
    date: '18th May 2026',
  },
  {
    id: 'n3',
    title: 'Maintenance',
    message: 'Website maintenance on 22nd May',
    type: 'Alert',
    date: '17th May 2026',
  },
  {
    id: 'n4',
    title: 'Live Session',
    message: 'Join Power BI live session today?',
    type: 'Event',
    date: '16th May 2026',
  },
];

export const starterPayments = [
  {
    id: 'p1',
    date: 'June 21st, 2026',
    description: 'Pro Plan — Monthly',
    amount: 1459,
    status: 'Paid',
  },
  {
    id: 'p2',
    date: 'May 21st, 2026',
    description: 'Pro Plan — Monthly',
    amount: 1459,
    status: 'Paid',
  },
];

export function getCourse(id) {
  return courses.find((course) => course.id === id);
}

export function inr(amount) {
  return `₹${Number(amount).toLocaleString('en-IN', {
    minimumFractionDigits: amount % 1 ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}

export function checkoutBreakdown(course) {
  if (course.id === 'react') {
    return {
      subtotal: 599,
      discount: 120,
      discountLabel: 'Discount (20%)',
      tax: 86.22,
      taxLabel: 'Tax (18%)',
      total: 754.82,
    };
  }
  const subtotal = course.price;
  const discount = Math.round(subtotal * 0.2);
  const taxed = (subtotal - discount) * 0.18;
  const tax = Math.round(taxed * 100) / 100;
  const total = Math.round((subtotal - discount + tax) * 100) / 100;
  return {
    subtotal,
    discount,
    discountLabel: 'Discount (20%)',
    tax,
    taxLabel: 'Tax (18%)',
    total,
  };
}

export const demoEnrollments = [
  {
    courseId: 'product-design',
    lessonIndex: 10,
    seconds: 8 * 60 + 45,
    completed: Array.from({ length: 10 }, (_, i) => i),
  },
  {
    courseId: 'react',
    lessonIndex: 5,
    seconds: 4 * 60 + 12,
    completed: Array.from({ length: 6 }, (_, i) => i),
  },
  {
    courseId: 'sql-excel',
    lessonIndex: 17,
    seconds: 90,
    completed: Array.from({ length: 18 }, (_, i) => i),
  },
  {
    courseId: 'machine-learning',
    lessonIndex: 1,
    seconds: 35,
    completed: [0, 1],
  },
];
