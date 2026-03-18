'use client';

import { useEffect } from 'react';

export default function Loader() {
  useEffect(() => {
    const loader       = document.getElementById('loader');
    const barFill      = document.getElementById('loaderBarFill');
    const barTip       = document.querySelector('.loader-bar-tip') as HTMLElement;
    const percentEl    = document.getElementById('loaderPercent');
    const lines        = document.querySelectorAll('.loader-line');

    if (!loader || !barFill || !barTip || !percentEl || !lines.length) return;

    let progress   = 0;
    let lineIndex  = 0;

    // ── Cycle through loading copy lines every 1.4s ──
    function cycleLines() {
      lines[lineIndex].classList.remove('active');
      lineIndex = (lineIndex + 1) % lines.length;
      lines[lineIndex].classList.add('active');
    }
    const lineTimer = setInterval(cycleLines, 1400);

    // ── Animate progress bar ──
    const fakeInterval = setInterval(() => {
      // Fake progress climbs to 85% on its own — never reaches 100
      if (progress < 85) {
        progress += Math.random() * 4 + 1;
        progress  = Math.min(progress, 85);
        updateBar(progress);
      }
    }, 120);

    function updateBar(value: number) {
      const pct = Math.min(value, 100);
      if (barFill && barTip && percentEl) {
        barFill.style.width = pct + '%';

        // Move tip to ride the end of the bar
        const trackWidth = barFill.parentElement?.offsetWidth || 0;
        barTip.style.left = (pct / 100 * trackWidth - 3) + 'px';
        barTip.style.right = 'auto';

        percentEl.textContent = Math.floor(pct) + '%';
      }
    }

    // ── On real load complete — race to 100% and exit ──
    function finishLoading() {
      clearInterval(fakeInterval);
      clearInterval(lineTimer);

      // Show final line
      lines[lineIndex].classList.remove('active');
      lines[lines.length - 1].classList.add('active');
      // Override last line text to feel conclusive
      lines[lines.length - 1].textContent = 'Welcome.';

      // Animate to 100%
      const fillInterval = setInterval(() => {
        progress += 3;
        if (progress >= 100) {
          progress = 100;
          updateBar(100);
          clearInterval(fillInterval);

          // Short pause at 100% — then dissolve
          setTimeout(() => {
            loader?.classList.add('loader-exit');

            // After transition completes — remove from DOM entirely
            setTimeout(() => {
              loader?.remove();
            }, 1000);

          }, 480);
        } else {
          updateBar(progress);
        }
      }, 20);
    }

    // Trigger on window load — all assets ready
    if (document.readyState === 'complete') {
      setTimeout(finishLoading, 800);
    } else {
      window.addEventListener('load', () => {
        const elapsed = performance.now();
        const minDisplay = 1200;
        const remaining = Math.max(0, minDisplay - elapsed);
        setTimeout(finishLoading, remaining);
      });
    }
    
    // Cleanup if unmounted abruptly (though it's a global root loader)
    return () => {
      clearInterval(fakeInterval);
      clearInterval(lineTimer);
    };
  }, []);

  return (
    <div id="loader">
      <div className="loader-bg"></div>
      
      {/* Animated grid lines — architectural feel */}
      <div className="loader-grid">
        <span></span><span></span>
        <span></span><span></span>
      </div>

      {/* Center content */}
      <div className="loader-center">
        
        {/* Animated logo mark */}
        <div className="loader-mark">
          <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="mark-path" d="M10 10 L30 10 L50 30 L30 50 L10 50 L10 10Z" 
                  stroke="#C9A84C" strokeWidth="1.5" 
                  fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path className="mark-path-inner" d="M20 20 L30 20 L40 30 L30 40 L20 40 L20 20Z" 
                  stroke="#4ECDC4" strokeWidth="1" 
                  fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Creative loading copy — cycles through lines */}
        <div className="loader-copy flex items-center justify-center">
          <span className="loader-line active">Compiling the engineer...</span>
          <span className="loader-line">Rendering the vision...</span>
          <span className="loader-line">Deploying the experience...</span>
          <span className="loader-line">Almost in frame...</span>
        </div>

        {/* Progress bar */}
        <div className="loader-bar-track flex items-center justify-start">
          <div className="loader-bar-fill" id="loaderBarFill"></div>
          <div className="loader-bar-tip absolute transition-none"></div>
        </div>

        {/* Percentage counter */}
        <div className="loader-percent" id="loaderPercent">0%</div>

      </div>

      {/* Bottom name stamp */}
      <div className="loader-stamp">
        <span className="stamp-name whitespace-nowrap">JESHER JEBSON</span>
        <span className="stamp-dot">·</span>
        <span className="stamp-title whitespace-nowrap">CREATIVE DEVELOPER</span>
      </div>

    </div>
  );
}
