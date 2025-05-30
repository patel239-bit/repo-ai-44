
import React from 'react';
import { ChatSession } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import ChatSessionList from './ChatSessionList';
import UserProfile from './UserProfile';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  sessions: ChatSession[];
  activeSesssionId?: string;
  onSessionSelect: (sessionId: string) => void;
  onNewChat: () => void;
  onDeleteSession: (sessionId: string) => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  activeSesssionId,
  onSessionSelect,
  onNewChat,
  onDeleteSession,
  className
}) => {
  const { user } = useAuth();

  return (
    <div className={cn(
      "w-80 bg-sidebar border-r border-sidebar-border flex flex-col h-full",
      "animate-slide-in-left",
      className
    )}>
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Github className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">
              GitHub Repo Chat
            </h1>
            <p className="text-sm text-sidebar-foreground/60">
              AI-powered repository analysis
            </p>
          </div>
        </div>
        
        <Button 
          onClick={onNewChat}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Chat Sessions */}
      <div className="flex-1 overflow-hidden">
        {sessions.length > 0 ? (
          <ChatSessionList
            sessions={sessions}
            activeSessionId={activeSesssionId}
            onSessionSelect={onSessionSelect}
            onDeleteSession={onDeleteSession}
          />
        ) : (
          <div className="p-6 text-center">
            <div className="p-4 bg-sidebar-accent rounded-lg mb-4">
              <Github className="h-8 w-8 text-sidebar-foreground/60 mx-auto mb-2" />
              <p className="text-sm text-sidebar-foreground/60">
                No chat sessions yet
              </p>
            </div>
            <p className="text-xs text-sidebar-foreground/40">
              Create your first chat session to start analyzing GitHub repositories with AI.
            </p>
          </div>
        )}
      </div>

      {/* User Profile */}
      <div className="border-t border-sidebar-border p-4">
        <UserProfile user={user} />
      </div>
    </div>
  );
};

export default Sidebar;
