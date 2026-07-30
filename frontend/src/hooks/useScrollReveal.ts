'use client';

/**
 * useScrollReveal — triggers a "visible" class on elements when they enter the viewport.
 * Uses IntersectionObserver and immediately reveals target sections when navigation links are clicked.
 */

import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Enable JS reveal styling on document
    document.documentElement.classList.add('js-reveal');

    const selector = '.reveal, .reveal-left, .reveal-right, .reveal-scale';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.02, rootMargin: '100px 0px 100px 0px' }
    );

    const els = document.querySelectorAll(selector);
    els.forEach((el) => observer.observe(el));

    // Handle hash links / nav link clicks to reveal target section immediately
    const revealTargetSection = (targetId: string) => {
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        target.querySelectorAll(selector).forEach((child) => {
          child.classList.add('visible');
        });
        if (target.matches(selector)) {
          target.classList.add('visible');
        }
      }
    };

    const handleHashChange = () => {
      revealTargetSection(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash) {
      revealTargetSection(window.location.hash);
    }

    // Global click listener for anchor links to immediately reveal sections on tap/click
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href) {
          revealTargetSection(href);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // MutationObserver to observe new elements
    const mutationObs = new MutationObserver(() => {
      const unobservedEls = document.querySelectorAll(
        '.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible), .reveal-scale:not(.visible)'
      );
      unobservedEls.forEach((el) => observer.observe(el));
    });

    mutationObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObs.disconnect();
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
}
