
import React, { useState, useRef, useEffect } from 'react';
import { ChatSession, Message } from '@/types';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitBranch, Github, Clock } from 'lucide-react';

interface ChatInterfaceProps {
  session: ChatSession | null;
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  session, 
  onSendMessage, 
  isLoading = false 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [session?.messages]);

  if (!session) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/20">
        <div className="text-center space-y-4 max-w-md">
          <div className="p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
            <Github className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            No chat session selected
          </h2>
          <p className="text-muted-foreground">
            Create a new chat session or select an existing one to start chatting with your GitHub repository.
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'ready':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'error':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing':
        return 'Processing Repository...';
      case 'ready':
        return 'Ready';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Github className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{session.repoName}</h2>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <GitBranch className="h-3 w-3" />
                  <span>{session.branchName || 'main'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(session.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          <Badge className={getStatusColor(session.status)}>
            {getStatusText(session.status)}
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <MessageList 
          messages={session.messages || []} 
          isLoading={isLoading}
        />
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-card/50 backdrop-blur-sm p-4">
        <MessageInput 
          onSendMessage={onSendMessage}
          disabled={session.status !== 'ready' || isLoading}
          placeholder={
            session.status === 'processing' 
              ? "Repository is being processed..." 
              : session.status === 'error'
              ? "Repository processing failed"
              : "Ask anything about this repository..."
          }
        />
      </div>
    </div>
  );
};

export default ChatInterface;
