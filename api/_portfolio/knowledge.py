"""Facts the "Ask about Sultan" assistant may use. Keep this in sync with the site and CV.

Each chunk is one retrievable unit. Only write things that are true; the assistant is told
to answer from these chunks alone, so anything missing here becomes "I don't know".
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class Chunk:
    id: str
    title: str
    text: str
    keywords: str = ""  # extra search terms only; never shown to the model


# Always sent with every question, so basic who/where/contact answers never depend on retrieval.
CORE = Chunk(
    "core",
    "Profile",
    """Muhammad Sultan Khalid (goes by Sultan) is based in Lahore, Pakistan. He is a frontend developer
moving into AI engineering, positioning himself as an AI Application Engineer: someone who ships LLM
features end to end, from a Python/FastAPI backend to a React/Next.js interface people want to use.
He is early in his AI career (junior / aspiring AI engineer), not a senior or research ML engineer.
Contact: email Sultankhalid1007@gmail.com, phone 0348-0719674, GitHub github.com/Sk7440,
LinkedIn linkedin.com/in/sultan-khalid-ai.""",
)

CHUNKS: list[Chunk] = [
    Chunk(
        "looking-for",
        "Roles he is looking for",
        """Sultan is open to junior AI Engineer, Generative AI Engineer, AI Application Developer and Python
Developer roles, and to frontend roles with an AI focus. He is open to work in Lahore or remote, and has
listed the UK, UAE, US and Australia/New Zealand as locations of interest. Best way to reach him is email:
Sultankhalid1007@gmail.com.""",
        "available hire hiring open role job remote relocate",
    ),
    Chunk(
        "appverse",
        "Current role: Frontend Developer Intern at Appverse Technologies",
        """Since October 2026 Sultan has been a remote Frontend Developer intern at Appverse Technologies.
The first phase covers web foundations and JavaScript mastery: BEM, design tokens, CSS variables,
ES6+ array/data pipelines and accessible UI.""",
        "current job now work intern internship company",
    ),
    Chunk(
        "kamal",
        "Previous role: Industrial Engineer Officer at Kamal Limited",
        """From December 2023 to April 2026 Sultan worked as an Industrial Engineer Officer at Kamal Limited,
working on process optimization, quality control and logistics. That background is why he looks for slow,
repetitive workflows and automates them, which is how he thinks about AI applications.""",
        "previous past job work experience background industrial engineering",
    ),
    Chunk(
        "education",
        "Education and training",
        """Sultan is studying for an Associate Degree in Computer Science at Virtual University of Pakistan
(2026 to 2028, in progress). Since September 2026 he has been in the Applied AI Program at Corvit Systems
(NAVTTC). Certificates: Anthropic "Introduction to Agent Skills"; HackerRank React, Python (Basic) and
JavaScript; freeCodeCamp Responsive Web Design.""",
        "study degree university course certificate training corvit",
    ),
    Chunk(
        "meet-chat-bot",
        "Project: Meet_Chat_bot (full-stack AI chat app)",
        """Meet_Chat_bot (github.com/Sk7440/Meet_Chat_bot) is Sultan's main AI project, a full-stack chat app.
The backend is FastAPI on Python 3.13 (with uv, ruff and pytest) and has a provider registry that routes
each request to Anthropic, any OpenAI-compatible API, or a local Ollama model. It has Auto, Local and Cloud
modes, and falls back to cloud providers when no local model is running. The frontend is Next.js,
TypeScript, Tailwind and Radix UI with streaming replies rendered as Markdown and chat history kept in the
browser. Frontend and backend run together with Docker Compose, and Claude Agent Skills handle scaffolding
and checks.""",
        "main ai llm chatbot chat assistant project build python fastapi anthropic claude ollama docker",
    ),
    Chunk(
        "this-site",
        "Project: this portfolio and its AI assistant",
        """This portfolio is built with Next.js, React, TypeScript and Tailwind CSS, with GSAP, Lenis smooth
scrolling, a three.js neural-network scene and React Bits components. The "Ask about Sultan" assistant is
a FastAPI backend that retrieves the most relevant facts about Sultan (a small keyword/BM25 retrieval step,
i.e. lightweight RAG) and streams an answer from Claude by Anthropic. It is deployed on Vercel.""",
        "portfolio website site chatbot assistant rag how built",
    ),
    Chunk(
        "roadmap",
        "What he is building next",
        """Sultan's next AI projects: (1) a RAG app over a real document set, with an evaluation of answer
quality rather than a demo prompt; (2) a tool-using AI agent, deployed publicly. Each will get a README,
a short demo video and a write-up. These are planned/in progress, not finished.""",
        "next future plan rag agent eval project",
    ),
    Chunk(
        "taskspace",
        "Project: TaskSpace (role-based task manager)",
        """TaskSpace is a React app with separate Admin and Employee dashboards, role-based login and protected
views. Admins create and assign tasks with priority, due date and description and track team metrics;
employees mark tasks complete. Auth and task state are shared through a Context API provider and persisted
in localStorage. Built with React, Context API, Tailwind CSS and Vite; live on Vercel.""",
        "frontend react project dashboard",
    ),
    Chunk(
        "wander-lust",
        "Project: Wander-Lust (tour booking app)",
        """Wander-Lust is a single-page tour booking app built with React 19, React Router, Context API,
Tailwind CSS and Vite. It routes between tour listings and booking views, shares booking state across
components, and has a booking modal that recalculates the price live with form validation. Live on Vercel.""",
        "frontend react project booking",
    ),
    Chunk(
        "spendly",
        "Project: Spendly (personal finance dashboard)",
        """Spendly is a personal finance dashboard in JavaScript and Tailwind CSS: add, edit and delete income
and expense entries with instant totals, filter by type, and persist data in localStorage. It uses GSAP
(ScrollTrigger, SplitText) and Anime.js for scroll and text animation. Live on Vercel.""",
        "frontend javascript project finance",
    ),
    Chunk(
        "skills-ai",
        "Skills: AI and backend",
        """AI and LLM skills: LLM APIs (Anthropic and OpenAI-compatible), local models with Ollama, provider
routing and fallback, streaming responses, Claude Agent Skills, generative AI. Currently learning: RAG,
AI agents and evals. Backend: Python, FastAPI, REST APIs, uv, ruff, pytest. Shipping: Docker,
Docker Compose, Git and GitHub, Vercel.""",
        "skill stack ai llm python backend technologies tools",
    ),
    Chunk(
        "skills-frontend",
        "Skills: frontend",
        """Frontend skills: React (hooks, Context API, React Router), Next.js, TypeScript, JavaScript (ES6+),
HTML5, CSS3 (Flexbox, Grid), Tailwind CSS, shadcn/ui and Radix, responsive design, GSAP and Framer Motion,
Vite and ESLint. His frontend background is what lets him ship AI features with interfaces people enjoy.""",
        "skill stack frontend react nextjs typescript technologies tools",
    ),
]
