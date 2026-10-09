import React from 'react';
import { Play, Pause, RotateCcw, Clock3, Sparkles } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';
import { formatTime } from '../utils/timeFormatter';
import { ElectronControls } from './ElectronControls';

export const Timer: React.FC = () => {
  const { isRunning, elapsedTime, start, pause, reset } = useTimer();

  return (
    <main className="taimer-shell">
      <div className="paper-grain" aria-hidden="true" />
      <ElectronControls />

      <section className="timer-card" aria-label="Taimer timer">
        <header className="timer-header">
          <div className="brand-mark"><Clock3 size={15} strokeWidth={2.1} /></div>
          <div className="brand-copy">
            <span className="brand-name">taimer<span className="brand-period">.</span></span>
            <span className="brand-tagline">A little more present.</span>
          </div>
          <div className={`status-pill ${isRunning ? 'status-running' : ''}`}>
            <span className="status-dot" />
            {isRunning ? 'FOCUSING' : 'READY'}
          </div>
        </header>

        <div className="timer-main">
          <div className="eyebrow"><Sparkles size={11} /> YOUR TIME, WELL SPENT</div>
          <div className="time-display" aria-live="off">{formatTime(elapsedTime)}</div>
        </div>

        <footer className="timer-footer">
          <div className="control-group">
            <button
              className={`primary-control ${isRunning ? 'is-paused' : ''}`}
              onClick={isRunning ? pause : start}
              aria-label={isRunning ? 'Pause timer' : 'Start timer'}
              title={isRunning ? 'Pause timer' : 'Start timer'}
            >
              {isRunning ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
            </button>
            <button
              className="reset-control"
              onClick={reset}
              disabled={elapsedTime === 0 && !isRunning}
              aria-label="Reset timer"
              title="Reset timer"
            >
              <RotateCcw size={14} />
            </button>
          </div>
          <span className="footer-note">One thing at a time.</span>
        </footer>
      </section>
    </main>
  );
};
