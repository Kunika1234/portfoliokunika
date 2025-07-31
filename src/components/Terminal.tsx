import React, { useState, useRef, useEffect } from 'react';

const COMMANDS = {
  about: `Hi, I'm Kunika Prajapat!\nMCA student specializing in Computer Science & Applications at Vivekananda Global University. Focused on DevOps, cloud, and web development.`,
  whoami: `Kunika Prajapat - DevOps & Cloud Enthusiast, MCA Student.`,
  skills: `DevOps: Docker, Jenkins, Github Actions, AWS, Kubernetes, Cloudwatch, EC2, Git, GitHub, Linux`,
  projects: `Check out my best projects in the Projects section above!`,
  resume: `You can download my resume from the Hero section or type 'resume link' for a direct link.`,
  'resume link': `Resume: /Resume_Kunika.pdf`,
  help: `Available commands: about, whoami, skills, projects, resume, resume link, clear, help, ls`,
  ls: `Available commands: about, whoami, skills, projects, resume, resume link, clear, help, ls`,
  clear: '',
};

const Terminal = () => {
  const [history, setHistory] = useState<string[]>([
    'Welcome to Kunika’s Portfolio Terminal! Type help to see available commands.',
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    if (command === 'clear') {
      setHistory([]);
      return;
    }
    const output = COMMANDS[command] ?? `Command not found: ${command}\nType 'help' for a list of commands.`;
    setHistory((h) => [...h, `> ${cmd}`, ...(output ? [output] : [])]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setCommandHistory((h) => [...h, input]);
    setHistoryIndex(null);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      if (commandHistory.length === 0) return;
      setHistoryIndex((idx) => {
        const newIdx = idx === null ? commandHistory.length - 1 : Math.max(0, idx - 1);
        setInput(commandHistory[newIdx]);
        return newIdx;
      });
    } else if (e.key === 'ArrowDown') {
      if (commandHistory.length === 0) return;
      setHistoryIndex((idx) => {
        if (idx === null) return null;
        const newIdx = Math.min(commandHistory.length - 1, idx + 1);
        setInput(commandHistory[newIdx] || '');
        return newIdx === commandHistory.length - 1 ? null : newIdx;
      });
    }
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 w-full max-w-lg bg-black/90 rounded-xl shadow-2xl border border-primary p-4 text-green-200 font-mono text-base sm:text-lg"
      style={{ boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)' }}
    >
      <div className="mb-2 text-blue-400 font-bold">Kunika@portfolio:~$</div>
      <div
        className="overflow-y-auto max-h-60 min-h-[120px] mb-2 pr-1"
        style={{ whiteSpace: 'pre-line', fontSize: '1em' }}
      >
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('>') ? 'text-cyan-300' : 'text-green-200'}>{line}</div>
        ))}
        <div ref={scrollRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-blue-400">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-green-100 placeholder:text-green-400"
          autoFocus
          autoComplete="off"
          spellCheck={false}
          placeholder="Type a command... (help)"
        />
      </form>
    </div>
  );
};

export default Terminal; 