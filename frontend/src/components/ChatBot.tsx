'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatBotProps {
  onClose: () => void;
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hi! I\'m your AI career guidance assistant. I can help you with questions about your skill development, career planning, resume improvement, and more. What would you like to know?',
    timestamp: new Date()
  }
];

export default function ChatBot({ onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading || trimmedInput.length > 1000) return;

    const userInput = trimmedInput;
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate AI response (in a real app, this would be an API call)
      await new Promise(resolve => setTimeout(resolve, 1500));

      const aiResponse = generateMockResponse(userInput);

      const assistantMessage: Message = {
        id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      const errorMessage: Message = {
        id: `msg-error-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble responding right now. Please try again or contact support.',
        timestamp: new Date()
      };

      setMessages(prev => {
        // Prevent duplicate error messages
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.role === 'assistant' && lastMessage.content.includes('apologize')) {
          return prev;
        }
        return [...prev, errorMessage];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockResponse = (userInput: string): string => {
    const input = userInput.toLowerCase().trim();

    // Check for skill gap related queries first (most specific)
    if ((input.includes('skill') && input.includes('gap')) ||
        (input.includes('missing') && input.includes('skill'))) {
      return 'Based on your profile analysis, you have gaps in advanced React concepts, Node.js development, and cloud architecture. I recommend starting with React hooks and context API, then moving to server-side development. Would you like specific resource recommendations?';
    }

    // Resume/CV related queries
    if (input.includes('resume') || input.includes('cv') ||
        input.includes('application') || input.includes('ats')) {
      return 'Your resume readiness score is 75%. Key improvements needed: Add specific metrics to experience sections, include more industry keywords, and highlight technical skills prominently. Focus on quantifiable achievements rather than just job descriptions.';
    }

    // Job/career related queries
    if (input.includes('job') || input.includes('career') ||
        input.includes('position') || input.includes('role') ||
        input.includes('salary') || input.includes('pay')) {
      return 'Based on your current skills, you\'re well-suited for Full Stack Developer, Frontend Developer, or Software Engineer roles. Average salaries range from $70,000-$130,000 depending on experience and location. Consider targeting tech companies, startups, or mid-size firms in your area.';
    }

    // Learning/roadmap related queries
    if (input.includes('learning') || input.includes('roadmap') ||
        input.includes('plan') || input.includes('study') ||
        input.includes('course') || input.includes('training')) {
      return 'Your personalized 3-month learning roadmap focuses on: Month 1 - Advanced React (hooks, context, performance), Month 2 - Node.js & APIs, Month 3 - Cloud technologies & deployment. You\'re currently in Week 1. Would you like me to break down specific weekly goals?';
    }

    // Interview related queries
    if (input.includes('interview') || input.includes('prepare') ||
        input.includes('technical') || input.includes('coding')) {
      return 'For technical interviews, prioritize: Data structures & algorithms (LeetCode practice), system design questions, and behavioral interviews. Practice explaining your projects clearly. Common topics include React concepts, JavaScript fundamentals, and problem-solving approaches. Start with easy problems and gradually increase difficulty.';
    }

    // SDG/impact related queries
    if (input.includes('sdg') || input.includes('impact') ||
        input.includes('sustainable') || input.includes('goal')) {
      return 'Your career development contributes to SDG-8 (Decent Work & Economic Growth) by improving workforce preparedness, reducing skills gaps, and supporting lifelong learning. Your current employability score is 75%, and completing your learning roadmap will increase this significantly.';
    }

    // Help/greeting queries
    if (input.includes('help') || input.includes('what') ||
        input.includes('how') || input.includes('can you')) {
      return 'I can help you with: 📊 Skill gap analysis, 📚 Learning roadmaps, 💼 Career recommendations, 📄 Resume improvement, 🎯 Interview preparation, and 🌱 SDG impact tracking. What specific aspect of your career development would you like assistance with?';
    }

    // Default response for unrecognized queries
    return 'That\'s an interesting question! I specialize in career development topics like skills assessment, job recommendations, resume optimization, interview preparation, and learning strategies. Could you rephrase your question or let me know what specific career topic you\'d like help with?';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      setInput(value);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">AI Career Assistant</h3>
              <p className="text-sm opacity-90">Here to help with your career journey</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="flex items-center mb-1">
                  {message.role === 'user' ? (
                    <User className="w-3 h-3 mr-1" />
                  ) : (
                    <Bot className="w-3 h-3 mr-1" />
                  )}
                  <span className="text-xs opacity-70">
                    {message.role === 'user' ? 'You' : 'Assistant'}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-50 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-2xl">
                <div className="flex items-center">
                  <Bot className="w-3 h-3 mr-1" />
                  <span className="text-xs opacity-70 mr-2">Assistant</span>
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
                <p className="text-sm mt-1">Thinking...</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your career..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
              maxLength={1000}
              aria-label="Chat message input"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading || input.trim().length > 1000}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">
              Press Enter to send
            </p>
            {input.length > 800 && (
              <p className={`text-xs ${input.length > 1000 ? 'text-red-500' : 'text-yellow-600'}`}>
                {input.length}/1000
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}