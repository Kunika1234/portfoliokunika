import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { io, Socket } from 'socket.io-client';
import 'xterm/css/xterm.css';
import { API_ENDPOINTS } from '../config/api';

interface LinuxTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LinuxTerminal: React.FC<LinuxTerminalProps> = ({ isOpen, onClose }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInstance = useRef<Terminal | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Initialize terminal
    if (!terminalInstance.current) {
      terminalInstance.current = new Terminal({
        cursorBlink: true,
        theme: {
          background: '#000000',
          foreground: '#00ff00',
          cursor: '#00ff00',
          black: '#000000',
          red: '#ff0000',
          green: '#00ff00',
          yellow: '#ffff00',
          blue: '#0000ff',
          magenta: '#ff00ff',
          cyan: '#00ffff',
          white: '#ffffff',
          brightBlack: '#666666',
          brightRed: '#ff6666',
          brightGreen: '#66ff66',
          brightYellow: '#ffff66',
          brightBlue: '#6666ff',
          brightMagenta: '#ff66ff',
          brightCyan: '#66ffff',
          brightWhite: '#ffffff',
        },
        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
        fontSize: 14,
        lineHeight: 1.2,
        cols: 80,
        rows: 24,
      });

      fitAddon.current = new FitAddon();
      terminalInstance.current.loadAddon(fitAddon.current);
      terminalInstance.current.loadAddon(new WebLinksAddon());

      if (terminalRef.current) {
        terminalInstance.current.open(terminalRef.current);
        fitAddon.current.fit();
      }
    }

    // Connect to Socket.IO
    if (!socketRef.current) {
      socketRef.current = io(API_ENDPOINTS.SOCKET);
      
      socketRef.current.on('connect', () => {
        setIsConnected(true);
        terminalInstance.current?.writeln('\r\n\x1b[32mConnected to Linux Terminal\x1b[0m');
        terminalInstance.current?.writeln('\x1b[33mType your commands below:\x1b[0m\r\n');
        terminalInstance.current?.write('\x1b[32muser@linux:~$\x1b[0m ');
      });

      socketRef.current.on('disconnect', () => {
        setIsConnected(false);
        terminalInstance.current?.writeln('\r\n\x1b[31mDisconnected from server\x1b[0m');
      });

      socketRef.current.on('command_output', (data: { output: string; error?: boolean }) => {
        if (data.error) {
          terminalInstance.current?.writeln(`\x1b[31m${data.output}\x1b[0m`);
        } else {
          terminalInstance.current?.writeln(data.output);
        }
        terminalInstance.current?.write('\x1b[32muser@linux:~$\x1b[0m ');
      });
    }

    // Handle terminal input
    if (terminalInstance.current) {
      let currentCommand = '';
      const commandHistory: string[] = [];
      let historyIndex = -1;

      terminalInstance.current.onData((data) => {
        const code = data.charCodeAt(0);
        
        if (code === 13) { // Enter key
          if (currentCommand.trim()) {
            commandHistory.push(currentCommand);
            historyIndex = commandHistory.length;
            socketRef.current?.emit('execute_command', { command: currentCommand });
            currentCommand = '';
          }
          terminalInstance.current?.writeln('');
        } else if (code === 8) { // Backspace
          if (currentCommand.length > 0) {
            currentCommand = currentCommand.slice(0, -1);
            terminalInstance.current?.write('\b \b');
          }
        } else if (code === 38) { // Up arrow
          if (historyIndex > 0) {
            historyIndex--;
            if (commandHistory[historyIndex]) {
              // Clear current line
              terminalInstance.current?.write('\r\x1b[K');
              terminalInstance.current?.write('\x1b[32muser@linux:~$\x1b[0m ');
              currentCommand = commandHistory[historyIndex];
              terminalInstance.current?.write(currentCommand);
            }
          }
        } else if (code === 40) { // Down arrow
          if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            if (commandHistory[historyIndex]) {
              terminalInstance.current?.write('\r\x1b[K');
              terminalInstance.current?.write('\x1b[32muser@linux:~$\x1b[0m ');
              currentCommand = commandHistory[historyIndex];
              terminalInstance.current?.write(currentCommand);
            }
          }
        } else if (data >= ' ') { // Printable characters
          currentCommand += data;
          terminalInstance.current?.write(data);
        }
      });
    }

    // Handle window resize
    const handleResize = () => {
      if (fitAddon.current) {
        fitAddon.current.fit();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative w-full max-w-4xl h-[80vh] bg-black rounded-lg shadow-2xl border border-green-500/30 overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between bg-gray-900 px-4 py-2 border-b border-green-500/30">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-400 font-mono text-sm ml-2">Linux Terminal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-green-400 text-xs">{isConnected ? 'Connected' : 'Disconnected'}</span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef} 
          className="w-full h-full p-2"
          style={{ backgroundColor: '#000000' }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LinuxTerminal; 