import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import './VimTerminal.css';

interface VimTerminalProps {
  onExit?: () => void;
}

const VimTerminal: React.FC<VimTerminalProps> = ({ onExit }) => {
  const [mode, setMode] = useState<'normal' | 'command'>('normal');
  const [command, setCommand] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);

  // Your ASCII art
  const asciiArt = [
    '                 ⠀⠀⠀⢀⣴⣶⠀⢀⣴⣶⡄⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣞⣿⢠⡟⣿⣿⠇⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣨⣿⣿⣼⣿⣟⠏⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⢀⣀⣠⣤⣤⠶⠶⣿⣿⣿⢛⣿⣿⣿⣷⡟⠏⠿⡄⠀⠀⠀⠀',
    '⠀⣀⣠⣤⣤⣼⣿⣟⢛⠠⡀⢄⡸⠄⣿⢿⣿⣇⣼⢿⣿⣟⠣⡘⠸⢿⠀⠀⠀⠀',
    '⣸⣿⣿⣿⣿⣿⣿⣿⡌⠱⣈⠒⡄⢣⠘⠾⠟⡠⠘⠞⡿⢋⠔⢡⠃⣿⡆⠀⠀⠀',
    '⣿⣿⣿⣿⣿⣿⣿⣿⡇⠡⠄⢃⠌⠄⢣⠘⠤⡁⢍⠒⡐⠌⣂⠦⣉⣿⡇⠀⠀⠀',
    '⢿⣿⣿⣿⣿⣿⣿⣿⡇⢡⠊⠔⡨⠘⢄⠊⡔⢁⠊⡔⢁⠎⣐⠺⢅⣾⡇⠀⠀⠀',
    '⠘⣿⣿⣿⣿⣿⣿⣿⠃⡐⠌⡂⠥⢑⡈⢒⠨⠄⡃⢄⢃⢎⡱⢃⠎⣾⠇⠀⠀⠀',
    '⠀⠈⠛⢿⣿⣿⡿⠋⡐⢀⠢⢡⠘⡠⠘⡄⢃⣜⣠⣮⡿⠷⡂⢍⢂⣿⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠈⠙⠓⠶⠶⠤⢾⣄⠂⡱⣌⡜⣻⣋⣯⡕⡘⠤⡑⢪⡰⣿⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣶⣤⣔⣸⣨⣍⣍⣱⣬⣶⣽⣶⡿⠟⠢⡄⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⡼⡷⠈⠙⠛⠿⠯⠽⠿⠿⠟⠛⠋⠉⣄⣇⠀⠹⡄⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⢰⢃⡇⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠄⠀⣹⡄',
    '⠀⠀⠀⠀⠀⠀⠀⠀⢿⠻⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣶⣾⠃⠘⡇',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠘⣆⣿⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⣴⡏⠀⠀⠀⣼⠇',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡉⠻⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⣷⣤⣀⣼⠏⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡇⠀⠘⠿⢿⣿⣯⣽⣻⠟⠁⠐⢤⡯⢙⣿⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⠀⠀⠀⠀⠘⣿⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡆⠲⢶⣄⠀⢻⡆⠀⣤⣀⠀⠀⠀⢸⣿⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣽⡄⠀⠀⠀⠘⣿⠀⠈⠛⠃⠀⠀⢸⣿⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢣⠉⠛⠓⠒⠒⠻⡟⠒⠶⠦⠶⠶⠞⢿⡆⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡤⠬⣷⣶⢶⣦⣤⣄⣷⣄⣀⣄⣀⣀⣠⣾⠇⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡏⠀⡄⡀⠙⢾⣟⢯⣿⡿⠿⠿⢿⣿⣿⡿⣿⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⣤⣤⣤⣤⣼⣿⣿⡇⠈⠠⠄⠀⠙⣿⣿⡿⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠁⠀⠀⠀⠘⠿⣭⣉⣉⣩⡵⠋⠀',
    'Only one way to exit...',
  ];

  const asciiArtLines = asciiArt.length;
  const TOTAL_LINES = 30; // Adjust as needed
  const emptyLinesCount = Math.floor((TOTAL_LINES - asciiArtLines) / 2);
  const emptyLines = new Array(emptyLinesCount).fill('');

  const [terminalContent, setTerminalContent] = useState<string[]>([
    ...emptyLines,
    ...asciiArt,
    ...emptyLines,
    '',
  ]);

  useEffect(() => {
    terminalRef.current?.focus();
  }, []);

  useEffect(() => {
    // Scroll to the bottom whenever content changes
    if (terminalRef.current) {
      const contentDiv = terminalRef.current.querySelector('.terminal-content');
      if (contentDiv) {
        contentDiv.scrollTop = contentDiv.scrollHeight;
      }
    }
  }, [terminalContent]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (mode === 'normal') {
      if (e.key === ':') {
        setMode('command');
        setCommand('');
      }
    } else if (mode === 'command') {
      if (e.key === 'Backspace') {
        if (command.length > 0) {
          setCommand((prev) => prev.slice(0, -1));
        }
        e.preventDefault();
      } else if (e.key === 'Enter') {
        executeCommand(command.trim());
        setMode('normal');
        setCommand('');
        e.preventDefault();
      } else if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
        setCommand((prev) => prev + e.key);
      }
    }
  };

  const executeCommand = (cmd: string) => {
    // Append the command to the content
    setTerminalContent((prev) => [...prev, `:${cmd}`]);

    if (cmd === 'chill_guy') {
      setTerminalContent((prev) => [...prev, 'Exiting...']);
      if (onExit) onExit();
    } else {
      setTerminalContent((prev) => [...prev, `Unknown command: ${cmd}`]);
    }
  };

  return (
    <div className="vim-terminal" tabIndex={0} onKeyDown={handleKeyDown} ref={terminalRef}>
      <div className="terminal-content">
        {terminalContent.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <div className="command-line">
        {mode === 'command' ? (
          <>
            :{command}
            <span className="cursor"> </span>
          </>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
    </div>
  );
};

export default VimTerminal;
