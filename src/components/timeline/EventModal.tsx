"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang, TimelineEvent, TimelineYear } from "@/content/timeline";
import { t } from "@/lib/i18n";
import { AnimatePresence, m } from "@/lib/motion";

type Props = {
  year: TimelineYear | null;
  lang: Lang;
  onClose: () => void;
};

export function EventModal({ year, lang, onClose }: Props) {
  return (
    <AnimatePresence>
      {year ? (
        <ModalSheet key={year.year} year={year} lang={lang} onClose={onClose} />
      ) : null}
    </AnimatePresence>
  );
}

function ModalSheet({
  year,
  lang,
  onClose,
}: {
  year: TimelineYear;
  lang: Lang;
  onClose: () => void;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);

    const queueFocus = window.requestAnimationFrame(() => {
      sheetRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
      window.cancelAnimationFrame(queueFocus);
      restoreFocusRef.current?.focus?.();
    };
  }, [onClose]);

  return (
    <m.div
      key="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        type="button"
        aria-label={t(lang, "closeModal")}
        onClick={onClose}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
      />
      <m.div
        ref={sheetRef}
        tabIndex={-1}
        initial={{ opacity: 0, y: 8, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 4, scale: 0.99 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-sm border border-rule bg-background px-6 py-10 shadow-2xl outline-none md:px-12 md:py-14"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="font-serif text-base tracking-[0.2em] text-muted">
              {year.year}
            </div>
            <h3
              id="modal-title"
              className="mt-3 font-serif text-3xl tracking-tight md:text-4xl"
            >
              {year.headline[lang]}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t(lang, "closeModal")}
            className="-mt-1 text-3xl leading-none text-muted hover:text-foreground"
          >
            ×
          </button>
        </div>

        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          {year.description[lang]}
        </p>

        <div className="mt-10">
          {activeId ? (
            <EventDetail
              event={year.events.find((e) => e.id === activeId)!}
              lang={lang}
              onBack={() => setActiveId(null)}
            />
          ) : (
            <EventCardGrid
              events={year.events}
              lang={lang}
              onSelect={setActiveId}
            />
          )}
        </div>
      </m.div>
    </m.div>
  );
}

function EventCardGrid({
  events,
  lang,
  onSelect,
}: {
  events: TimelineEvent[];
  lang: Lang;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="grid gap-x-8 gap-y-6 md:grid-cols-2">
      {events.map((ev) => (
        <li key={ev.id}>
          <m.button
            layoutId={`card-${ev.id}`}
            type="button"
            onClick={() => onSelect(ev.id)}
            className="group block w-full border-t border-rule pt-5 text-left transition-colors hover:border-foreground"
            whileHover={{ x: 2 }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            <div className="font-serif text-sm tracking-[0.15em] text-muted">
              {ev.date}
            </div>
            <h4 className="mt-3 font-serif text-xl tracking-tight">
              {ev.title[lang]}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {ev.summary[lang]}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-foreground/70 group-hover:text-accent">
              <span className="border-b border-current pb-0.5">
                {ev.body || ev.media?.length ? "READ" : "—"}
              </span>
              {ev.body || ev.media?.length ? (
                <span aria-hidden>→</span>
              ) : null}
            </div>
          </m.button>
        </li>
      ))}
    </ul>
  );
}

function EventDetail({
  event,
  lang,
  onBack,
}: {
  event: TimelineEvent;
  lang: Lang;
  onBack: () => void;
}) {
  return (
    <m.article
      layoutId={`card-${event.id}`}
      className="border-t border-rule pt-6"
    >
      <button
        type="button"
        onClick={onBack}
        className="text-[10px] uppercase tracking-[0.3em] text-muted hover:text-foreground"
      >
        ← back
      </button>
      <div className="mt-6 font-serif text-sm tracking-[0.15em] text-muted">
        {event.date}
      </div>
      <h4 className="mt-3 font-serif text-2xl tracking-tight md:text-3xl">
        {event.title[lang]}
      </h4>
      <p className="mt-3 text-base leading-relaxed text-muted">
        {event.summary[lang]}
      </p>
      {event.body ? (
        <div className="mt-6 max-w-2xl whitespace-pre-line text-base leading-relaxed text-foreground/90">
          {event.body[lang]}
        </div>
      ) : null}
      {event.media?.length ? (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {event.media.map((m, i) => (
            <figure key={i}>
              {m.kind === "image" ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={m.src}
                  alt={m.alt[lang]}
                  loading="lazy"
                  className="h-auto w-full rounded-sm border border-rule"
                />
              ) : (
                <video
                  src={m.src}
                  poster={m.poster}
                  autoPlay
                  muted
                  playsInline
                  loop
                  className="h-auto w-full rounded-sm border border-rule"
                />
              )}
            </figure>
          ))}
        </div>
      ) : null}
      {event.links?.length ? (
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {event.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="border-b border-current pb-0.5 text-xs uppercase tracking-[0.25em] text-muted hover:text-foreground"
              >
                {link.label[lang]}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </m.article>
  );
}
