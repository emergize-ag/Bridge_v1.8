export type Moment = {
  id: string;
  title: string;
  zone: "Pre-meeting" | "Saturation" | "Focus-fade" | "Boundary" | "Night";
  body: string;
  stat?: string;
  recommended?: boolean;
};

export const moments: Moment[] = [
  {
    id: "pre-meeting-pressure",
    title: "Pre-meeting pressure",
    zone: "Pre-meeting",
    recommended: true,
    body: "Your next meeting starts in four minutes. You're still in the last one, mentally. The calendar doesn't know this. Bridge does. Two minutes before the transition is when the pressure builds — and when a crossing matters most.",
  },
  {
    id: "unread-list",
    title: "The unread list",
    zone: "Pre-meeting",
    body: "47 unread messages. You've checked twice this morning. Each check costs more than you think — context switch, attention reset, the low-level hum of unfinished things. A crossing doesn't clear the inbox. It clears your head.",
    stat: "47 — average unread messages in a DACH professional inbox. McKinsey, 2023.",
  },
  {
    id: "first-call",
    title: "First call of the day",
    zone: "Pre-meeting",
    body: "Before the first call, you're already performing. You've read the brief, checked LinkedIn, reviewed the last meeting notes. Bridge names this moment: the pause before you become the version of you that shows up on screen.",
  },
  {
    id: "post-call-residue",
    title: "Post-call residue",
    zone: "Saturation",
    recommended: true,
    body: "The call ended twelve minutes ago. You're in something else now, but you're still half-there — replaying the part where you could have said something different. Residue. It carries. A crossing marks the end.",
  },
  {
    id: "context-switch-cost",
    title: "Context-switch cost",
    zone: "Saturation",
    recommended: true,
    body: "You've switched tasks eleven times since 9am. Each switch costs an average of 23 minutes of deep focus. Bridge doesn't prevent the switches — your job requires them. It reduces the cost of each one.",
    stat: "23 minutes — average recovery time after a task interruption. UC Irvine.",
  },
  {
    id: "meeting-before-meeting",
    title: "The meeting before the meeting",
    zone: "Saturation",
    body: "Fifteen minutes before a difficult conversation, you're already in it. You're rehearsing answers, anticipating objections, building the version of events that makes sense. That rehearsal takes energy. Bridge offers a different use of those fifteen minutes.",
  },
  {
    id: "afternoon-fog",
    title: "Afternoon fog",
    zone: "Focus-fade",
    recommended: true,
    body: "It's 14:20. You've been switched on since 7:30. The quality of your attention has been declining since midday — slowly, invisibly. This is not a flaw. It's physiology. A crossing acknowledges this and offers two minutes of reset.",
  },
  {
    id: "open-tabs",
    title: "The open tab problem",
    zone: "Focus-fade",
    body: "You currently have 23 tabs open. Each one is a commitment your brain is tracking at low level — a background process consuming working memory. Closing tabs helps. So does a structured two-minute transition between the work that matters.",
    stat: "48% of knowledge workers report 20+ tabs open simultaneously. Workfront, 2022.",
  },
  {
    id: "deep-work-interrupted",
    title: "Deep work interrupted",
    zone: "Focus-fade",
    body: "You were in it. Then a notification, a question from a colleague, a Slack ping. Now you're not. The return to deep focus takes longer than the interruption itself. Bridge doesn't prevent interruptions. It helps you re-enter.",
  },
  {
    id: "end-of-hours",
    title: "End of official hours",
    zone: "Boundary",
    recommended: true,
    body: "It's 17:30. Or 18:00. Or whenever your organisation says the day ends. You're still thinking about the 16:45 email. The boundary between work and not-work isn't automatic — it's made. Bridge gives you two minutes to make it.",
  },
  {
    id: "message-at-19",
    title: "The message at 19:00",
    zone: "Boundary",
    body: "You've already crossed the boundary for today — or tried to. Then the message arrives. Bridge doesn't tell you to ignore it. It names the moment: this is a choice. The crossing makes the choice visible.",
  },
  {
    id: "weekend-start",
    title: "Weekend start",
    zone: "Boundary",
    body: "Friday, late afternoon, or Saturday morning: the transition into not-work is often incomplete. The residue of the week carries forward. A crossing on Friday marks the end of work — a deliberate close, so the weekend can actually begin.",
  },
  {
    id: "before-sleep",
    title: "Before sleep",
    zone: "Night",
    body: "You've been in work-mind for most of the day. The brain doesn't switch modes automatically at bedtime. This crossing is different — it's the final one. Two minutes to acknowledge the day and release what doesn't need to travel into sleep.",
  },
];

export const aiPrompt = `I want to understand a work moment using the Bridge framework.

Bridge is a product by Emergize. Bridge is a two-minute composure utility — an awareness layer for the moments between meetings, tasks, decisions, and the end of the workday. It helps people recognise the work-state they are already in, move through a short crossing, and continue with greater composure.

The Bridge moment library names work-states such as: Pre-meeting pressure, First call of the day, Post-call residue, Context-switch cost, The meeting before the meeting, Afternoon fog, Deep work interrupted, The open-tab problem, End of official hours, Weekend start, Before sleep.

Please act as a calm Bridge reflection companion. Help me:
1. Identify which Bridge moment best matches my situation.
2. Explain why in a practical and reflective way.
3. Describe what I may be carrying from one work-state into the next.
4. Ask one thoughtful reflection question.
5. Suggest what kind of crossing may help me arrive more composed.

Keep your response concise, calm, and grounded. Stay within the Bridge frame: recognition, transition, composure. Do not offer life advice, productivity coaching, or diagnosis.

My situation is:
`;
