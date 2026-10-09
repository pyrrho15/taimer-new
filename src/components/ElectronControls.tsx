import React, { useState, useEffect } from 'react';
import { Pin, PinOff } from 'lucide-react';

/**
 * Electron Controls Component
 * 
 * This component provides Electron-specific features like always-on-top toggle.
 * It only renders when running in Electron environment.
 * 
 * This is completely separate from timer logic - it only handles OS-level features.
 */

// Type definitions for Electron API
declare global {
  interface Window {
    electronAPI?: {
      toggleAlwaysOnTop: () => Promise<boolean>;
      getAlwaysOnTop: () => Promise<boolean>;
      isElectron: boolean;
    };
  }
}

export const ElectronControls: React.FC = () => {
  const [isAlwaysOnTop, setIsAlwaysOnTop] = useState(false);
  const [isElectron, setIsElectron] = useState(false);

  // Check if running in Electron and get initial state
  useEffect(() => {
    const checkElectron = async () => {
      if (window.electronAPI?.isElectron) {
        setIsElectron(true);
        try {
          const alwaysOnTop = await window.electronAPI.getAlwaysOnTop();
          setIsAlwaysOnTop(alwaysOnTop);
        } catch (error) {
          console.log('Electron API not available yet');
        }
      }
    };

    checkElectron();
  }, []);

  // Toggle always-on-top behavior
  const handleToggleAlwaysOnTop = async () => {
    if (window.electronAPI?.toggleAlwaysOnTop) {
      try {
        const newState = await window.electronAPI.toggleAlwaysOnTop();
        setIsAlwaysOnTop(newState);
      } catch (error) {
        console.error('Failed to toggle always-on-top:', error);
      }
    }
  };

  // Don't render if not in Electron
  if (!isElectron) {
    return null;
  }

  return (
    <div className="electron-controls">
      <button
        onClick={handleToggleAlwaysOnTop}
        className={`pin-button ${isAlwaysOnTop ? 'pin-active' : ''}`}
        title={isAlwaysOnTop ? 'Disable Always On Top' : 'Enable Always On Top'}
        aria-label={isAlwaysOnTop ? 'Disable always on top' : 'Enable always on top'}
      >
        {isAlwaysOnTop ? <Pin size={13} /> : <PinOff size={13} />}
      </button>
    </div>
  );
};