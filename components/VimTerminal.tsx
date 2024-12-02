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
    document.body.style.overflow = 'hidden';
  
    return () => {
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
    '                                      ',
    'Uh-oh, there’s an obstacle blocking your way! Type in the secret code to escape the terminal.',
    '                                      ',
    'How to escape: You gotta type a specific brainrot word. If you nail it, boom! Instant exit. If you don’t… well, keep guessing or live in eternal cringe.',
    '                                      ',
    'While you’re stuck in the terminal, you can flex with some commands:',
    '                                      ',
    '   1. Type ":random":',
    '      This command will pull up info about a random brainrot term.',
    '      It’s like rolling the dice but with extra sigma energy.',
    '                                      ',
    '   2. Type a brainrot word directly:',
    '      If you drop a brainrot word the terminal will spit out what',
    '      it means and why it’s skibidi.',
    '                                                                 ',
    '   Other fun commands: brainrot, don pollo, rizzlord, clear      ',
    '                                                                 ',
    'Yo, just make sure to slap a ":" at the beginning of what you type to make the magic happen. No colon, no rizz—don’t be cringe, get it right!',
    '                                      '
  ];

  const asciiArtLines = asciiArt.length;
  const TOTAL_LINES = 100; 
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
    setTerminalContent((prev) => [...prev, `:${cmd}`]);

    if (cmd === 'clear') {
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
        const formattedTerms = ['Brainrot Terms:', ...terms.map((term: string, index: number) => `${index + 1}. ${term}`)];

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
            `Name: ${data.donpollo.name}`,
            `Title: ${data.donpollo.title}`,
            '',
            'Backstory:',
            data.donpollo.backstory,
            '',
            'Achievements:',
            ...data.donpollo.achievements.map((achievement: string) => `- ${achievement}`),
            '',
            `Vibe: ${data.donpollo.vibe}`,
            '',
            'Quotes:',
            ...data.donpollo.quotes.map((quote: string) => `- "${quote}"`),
            '',
            data.donpollo.message,
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
    else if (cmd === 'chillguy') {
      setTerminalContent((prev) => [...prev, 'Exiting...']);
      if (onExit) onExit();
    } 
    else {
        {
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
              console.log(error);
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
      <span className="cursor">&nbsp;</span> {/* Use &nbsp; here */}
    </>
  ) : (
    <span>&nbsp;</span>
  )}
</div>

    </div>
  );
};

export default VimTerminal;
