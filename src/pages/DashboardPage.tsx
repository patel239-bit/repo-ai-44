
import React, { useState, useEffect } from 'react';
import { ChatSession, Message } from '@/types';
import Sidebar from '@/components/sidebar/Sidebar';
import ChatInterface from '@/components/chat/ChatInterface';
import RepoSetupForm from '@/components/github/RepoSetupForm';
import { toast } from '@/hooks/use-toast';

const DashboardPage: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSession, setActiveSession] = useState<ChatSession | null>(null);
  const [showNewChat, setShowNewChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demo
  useEffect(() => {
    const mockSessions: ChatSession[] = [
      {
        id: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        githubRepoUrl: 'https://github.com/facebook/react',
        repoName: 'facebook/react',
        branchName: 'main',
        status: 'ready',
        userId: '1',
        _count: { messages: 12 },
        messages: [
          {
            id: '1',
            createdAt: new Date(Date.now() - 3600000).toISOString(),
            updatedAt: new Date(Date.now() - 3600000).toISOString(),
            content: 'Can you explain how React hooks work?',
            role: 'user',
            chatSessionId: '1',
          },
          {
            id: '2',
            createdAt: new Date(Date.now() - 3500000).toISOString(),
            updatedAt: new Date(Date.now() - 3500000).toISOString(),
            content: 'React hooks are functions that let you use state and other React features in functional components. They were introduced in React 16.8 as a way to write stateful logic without using class components.\n\nThe most common hooks are:\n- `useState` for managing local state\n- `useEffect` for side effects and lifecycle events\n- `useContext` for consuming context values\n- `useReducer` for complex state management\n\nHooks follow two main rules:\n1. Only call hooks at the top level of your functions\n2. Only call hooks from React functions or custom hooks',
            role: 'assistant',
            chatSessionId: '1',
            filesReferences: [
              { fileName: 'ReactHooks.js', filePath: 'packages/react/src/ReactHooks.js' },
              { fileName: 'useState.js', filePath: 'packages/react/src/useState.js' }
            ]
          }
        ]
      },
      {
        id: '2',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 7200000).toISOString(),
        githubRepoUrl: 'https://github.com/microsoft/typescript',
        repoName: 'microsoft/typescript',
        branchName: 'main',
        status: 'processing',
        userId: '1',
        _count: { messages: 3 },
      }
    ];
    setSessions(mockSessions);
    setActiveSession(mockSessions[0]);
  }, []);

  const handleNewChat = () => {
    setShowNewChat(true);
    setActiveSession(null);
  };

  const handleSessionSelect = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setActiveSession(session);
      setShowNewChat(false);
    }
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (activeSession?.id === sessionId) {
      setActiveSession(null);
    }
    toast({
      title: "Session deleted",
      description: "The chat session has been removed.",
    });
  };

  const handleRepoSetup = async (data: {
    githubUrl: string;
    githubToken?: string;
    branchName?: string;
  }) => {
    setIsLoading(true);
    
    try {
      // Simulate repository setup
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newSession: ChatSession = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        githubRepoUrl: data.githubUrl,
        repoName: data.githubUrl.split('/').slice(-2).join('/'),
        branchName: data.branchName,
        status: 'processing',
        userId: '1',
        githubToken: data.githubToken,
        messages: [],
        _count: { messages: 0 }
      };

      setSessions(prev => [newSession, ...prev]);
      setActiveSession(newSession);
      setShowNewChat(false);

      toast({
        title: "Repository connected!",
        description: `Started processing ${newSession.repoName}. You can start chatting once processing is complete.`,
      });

      // Simulate processing completion
      setTimeout(() => {
        setSessions(prev => prev.map(s => 
          s.id === newSession.id 
            ? { ...s, status: 'ready' as const }
            : s
        ));
        setActiveSession(prev => prev ? { ...prev, status: 'ready' } : null);
        
        toast({
          title: "Repository ready!",
          description: `${newSession.repoName} has been processed and is ready for chat.`,
        });
      }, 5000);
      
    } catch (error) {
      toast({
        title: "Setup failed",
        description: "Failed to connect to the repository. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!activeSession) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      content,
      role: 'user',
      chatSessionId: activeSession.id,
    };

    // Add user message
    setActiveSession(prev => prev ? {
      ...prev,
      messages: [...(prev.messages || []), userMessage]
    } : null);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        content: `I understand you're asking about "${content}". Based on the repository analysis, I can help you with code structure, functionality, and best practices. This is a simulated response - in the full implementation, I would analyze the actual repository code to provide specific insights.`,
        role: 'assistant',
        chatSessionId: activeSession.id,
        filesReferences: [
          { fileName: 'example.js', filePath: 'src/example.js' }
        ]
      };

      setActiveSession(prev => prev ? {
        ...prev,
        messages: [...(prev.messages || []), aiMessage]
      } : null);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        sessions={sessions}
        activeSesssionId={activeSession?.id}
        onSessionSelect={handleSessionSelect}
        onNewChat={handleNewChat}
        onDeleteSession={handleDeleteSession}
      />
      
      <div className="flex-1 flex">
        {showNewChat ? (
          <div className="flex-1 overflow-auto">
            <RepoSetupForm 
              onSubmit={handleRepoSetup}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <ChatInterface
            session={activeSession}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
