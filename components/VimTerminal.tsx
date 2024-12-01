import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import './VimTerminal.css';

interface VimTerminalProps {
  onExit?: () => void;
}

const VimTerminal: React.FC<VimTerminalProps> = ({ onExit }) => {
  const [mode, setMode] = useState<'normal' | 'command'>('normal');
  const [command, setCommand] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable background scrolling when VimTerminal is open
    document.body.style.overflow = 'hidden';
  
    return () => {
      // Re-enable background scrolling when VimTerminal is closed
      document.body.style.overflow = '';
    };
  }, []);
  

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

  const executeCommand = async (cmd: string) => {
    // Append the command to the content
    setTerminalContent((prev) => [...prev, `:${cmd}`]);

    if (cmd === 'clear') {
        // Clear the terminal content and reset to initial state
        setTerminalContent([
          ...emptyLines,
          ...asciiArt,
          ...emptyLines,
          '',
        ]);
    }
    else if (cmd === 'brainrot') {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/brainrot');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const terms = data.terms;

        // Format the terms for display
        const formattedTerms = ['Brainrot Terms:', ...terms.map((term: any, index: number) => `${index + 1}. ${term}`)];

        setTerminalContent((prev) => [...prev, ...formattedTerms]);
      } catch (error) {
        setTerminalContent((prev) => [...prev, `Error fetching brainrot terms: ${(error as Error).message}`]);
      }
    } 
    else if (cmd == 'random') {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/brainrot/random');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const termInfo = [
                `Term: ${data.term}`,
                `Definition: ${data.definition}`,
                `Example: ${data.example}`,
            ];
            setTerminalContent((prev) => [...prev, ...termInfo]);
        } catch (error) {
            setTerminalContent((prev) => [...prev, `Error fetching random brainrot term: ${(error as Error).message}`]);
        }
    }
    else if (cmd === 'don pollo') {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/don-pollo');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const donPolloInfo = [
            `Name: ${data.name}`,
            `Title: ${data.title}`,
            '',
            'Backstory:',
            data.backstory,
            '',
            'Achievements:',
            ...data.achievements.map((achievement: string) => `- ${achievement}`),
            '',
            `Vibe: ${data.vibe}`,
            '',
            'Quotes:',
            ...data.quotes.map((quote: string) => `- "${quote}"`),
            '',
            data.message,
          ];
          setTerminalContent((prev) => [...prev, ...donPolloInfo]);
        } catch (error) {
          setTerminalContent((prev) => [
            ...prev,
            `Error fetching Don Pollo info: ${(error as Error).message}`,
          ]);
        }
    }
    else if (cmd === 'rizzlord') {
        try {
          const response = await fetch('http://127.0.0.1:8000/rizzlord');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const rizzlordInfo = [
            `Definition: ${data.rizzlord.definition}`,
            '',
            'Example:',
            data.rizzlord.example,
            '',
            'Backstory:',
            data.rizzlord.backstory,
            '',
            'Criteria:',
            ...data.rizzlord.criteria.map((criterion: string) => `- ${criterion}`),
            '',
            `Message: ${data.rizzlord.message}`,
          ];
          setTerminalContent((prev) => [...prev, ...rizzlordInfo]);
        } catch (error) {
          setTerminalContent((prev) => [
            ...prev,
            `Error fetching Rizzlord info: ${(error as Error).message}`,
          ]);
        }
      }
    else if (cmd === 'chill_guy') {
      setTerminalContent((prev) => [...prev, 'Exiting...']);
      if (onExit) onExit();
    } 
    else {
        {
            // Assume the command is a brainrot term
            try {
              const response = await fetch(`http://127.0.0.1:8000/api/${cmd}`);
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              const termInfo = [
                `Term: ${data.term}`,
                `Definition: ${data.definition}`,
                `Example: ${data.example}`,
              ];
              setTerminalContent((prev) => [...prev, ...termInfo]);
            } catch (error) {
              setTerminalContent((prev) => [...prev, `Unknown command or term: ${cmd}`]);
            }
          }
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
