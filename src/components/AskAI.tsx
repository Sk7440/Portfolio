'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUp, RotateCcw, Sparkles } from 'lucide-react';
import GlowCard from './GlowCard';
import SectionHead from './SectionHead';
import LatticeLoader from './reactbits/LatticeLoader';

type Msg = { role: 'user' | 'assistant'; content: string; sources?: string[]; failed?: boolean };
type Status = 'idle' | 'waiting' | 'streaming';

const suggestions = [
  'What AI projects has he built?',
  'Is he open to remote roles?',
  'What’s his tech stack?',
  'How does this assistant work?',
];

const MAX_CHARS = 1200;
const MAX_TURNS = 12;

// Turns sent to the API: drop failed exchanges, keep the last few, and always start on a visitor turn.
function toHistory(msgs: Msg[]) {
  const ok = msgs.filter((m, i) => !m.failed && !(m.role === 'user' && msgs[i + 1]?.failed));
  let recent = ok.slice(-MAX_TURNS);
  while (recent.length && recent[0].role !== 'user') recent = recent.slice(1);
  return recent.map(({ role, content }) => ({ role, content }));
}

const steps = [
  { k: '01', t: 'You ask', d: 'Your question goes to a FastAPI endpoint on Vercel.' },
  { k: '02', t: 'Retrieve', d: 'A small BM25 search picks the most relevant facts about me.' },
  { k: '03', t: 'Generate', d: 'Gemma 4 on Ollama answers from those facts only, streamed token by token.' },
];

export default function AskAI() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const listRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  // Keep the newest text in view inside the message list (not the page).
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  // No-op if the chat was cleared mid-stream.
  const patchLast = (fn: (m: Msg) => Msg) =>
    setMessages(ms => (ms.length && ms[ms.length - 1].role === 'assistant' ? [...ms.slice(0, -1), fn(ms[ms.length - 1])] : ms));

  async function ask(question: string) {
    const q = question.trim().slice(0, MAX_CHARS);
    if (!q || status !== 'idle') return;
    const next: Msg[] = [...messages, { role: 'user', content: q }];
    setMessages([...next, { role: 'assistant', content: '' }]);
    setInput('');
    setStatus('waiting');

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch('/api/py/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: toHistory(next) }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? 'The assistant is unavailable right now.');
      }
      let sources: string[] = [];
      try {
        sources = JSON.parse(res.headers.get('X-Sources') ?? '[]');
      } catch {}

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        if (!text) continue;
        setStatus('streaming');
        patchLast(m => ({ ...m, content: m.content + text }));
      }
      patchLast(m => ({ ...m, sources }));
    } catch (err) {
      if (controller.signal.aborted) return;
      // fetch() rejects with a TypeError on network failure; our own errors carry the API's message.
      const message = err instanceof Error && !(err instanceof TypeError) ? err.message : 'Couldn’t reach the assistant.';
      patchLast(m => ({ ...m, content: `${message} You can always email Sultankhalid1007@gmail.com.`, failed: true }));
    } finally {
      setStatus('idle');
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <section id="ask" className="relative border-y border-line bg-surface py-[clamp(72px,10vw,115px)]">
      <div className="pointer-events-none absolute top-1/3 left-[-10%] size-[520px] rounded-full bg-glow/8 blur-[120px]" />
      <div className="wrap relative">
        <SectionHead num="05" title="Ask my AI" />

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <div data-reveal className="min-w-0">
            <p className="text-[clamp(19px,0.8vw+15px,23px)] leading-[1.45] font-bold tracking-[-0.02em]">
              Don’t want to read the whole page? Ask my assistant anything about my work, skills or availability.
            </p>
            <p className="mt-4 text-[15px] text-muted">
              It’s a small RAG app I built for this site, and it’s the kind of thing I want to build for a living.
            </p>
            <ol data-stagger="0.1" className="mt-8 grid gap-2.5">
              {steps.map(s => (
                <li key={s.k} className="flex gap-4 border border-line bg-bg/40 p-4">
                  <span className="font-mono text-[11px] text-accent">{s.k}</span>
                  <span>
                    <span className="block text-sm font-bold">{s.t}</span>
                    <span className="block text-[13px] text-muted">{s.d}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-4 font-mono text-[10.5px] text-[#7d8087]">Next.js · FastAPI · BM25 retrieval · Ollama (Gemma 4) · streaming</p>
          </div>

          <GlowCard data-reveal="0.1" accent surface="var(--color-bg)" className="flex min-h-[520px] min-w-0 flex-col">
            <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
              <p className="flex items-center gap-2 text-sm font-bold">
                <span className="grid size-6 place-items-center rounded-md bg-accent text-bg">
                  <Sparkles size={13} />
                </span>
                Sultan’s assistant
              </p>
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    abortRef.current?.abort();
                    setMessages([]);
                    setStatus('idle');
                  }}
                  className="flex cursor-pointer items-center gap-1.5 font-mono text-[10.5px] text-[#8a8c93] transition-colors hover:text-white"
                >
                  <RotateCcw size={12} /> New chat
                </button>
              )}
            </div>

            {/* data-lenis-prevent lets this list scroll natively instead of moving the page. */}
            <div ref={listRef} data-lenis-prevent className="max-h-[440px] flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5" aria-live="polite" aria-busy={status !== 'idle'}>
              {messages.length === 0 && (
                <div className="flex h-full flex-col justify-end gap-3">
                  <p className="text-sm text-muted">Try one of these:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => ask(s)}
                        className="cursor-pointer border border-line bg-surface px-3 py-2 text-left text-[13px] text-[#d9dae0] transition-colors hover:border-accent/50 hover:text-white"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) =>
                m.role === 'user' ? (
                  <p key={i} className="ml-auto w-fit max-w-[85%] rounded-md bg-surface2 px-3.5 py-2.5 text-sm text-[#e4e5e9]">
                    {m.content}
                  </p>
                ) : (
                  <div key={i} className="max-w-[92%]">
                    {m.content ? (
                      <p className={`text-sm leading-[1.7] whitespace-pre-wrap ${m.failed ? 'text-[#f0a3a3]' : 'text-[#d9dae0]'}`}>
                        {m.content}
                      </p>
                    ) : (
                      <LatticeLoader label="Searching Sultan’s profile" pattern="orbit" color="#c7f36b" fontSize={13} glow />
                    )}
                    {m.sources && m.sources.length > 0 && (
                      <p className="mt-2 font-mono text-[10px] leading-relaxed text-[#7d8087]">
                        Sources: {m.sources.map(s => s.replace(/^Project: /, '')).join(' · ')}
                      </p>
                    )}
                  </div>
                ),
              )}
            </div>

            <form onSubmit={onSubmit} className="border-t border-line p-3 sm:p-4">
              <div className="flex items-center gap-2 border border-line bg-surface px-3 focus-within:border-accent/60">
                <label htmlFor="ask-input" className="sr-only">
                  Ask about Sultan
                </label>
                <input
                  id="ask-input"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  maxLength={MAX_CHARS}
                  placeholder="Ask about my projects, skills, availability…"
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm text-text placeholder:text-[#6f727a] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || status !== 'idle'}
                  aria-label="Send"
                  className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-[5px] bg-accent text-bg transition-opacity disabled:cursor-default disabled:opacity-40"
                >
                  <ArrowUp size={16} />
                </button>
              </div>
              <p className="mt-2 text-[11px] text-[#6f727a]">
                Answers are generated by Gemma 4 (via Ollama) from facts on this site and can be wrong. Email me to confirm anything important.
              </p>
            </form>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
