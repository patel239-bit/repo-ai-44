
import React, { useState } from 'react';
import { ChatSession } from '@/types';
import SessionItem from './SessionItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ChatSessionListProps {
  sessions: ChatSession[];
  activeSessionId?: string;
  onSessionSelect: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
}

const ChatSessionList: React.FC<ChatSessionListProps> = ({
  sessions,
  activeSessionId,
  onSessionSelect,
  onDeleteSession
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSessions = sessions.filter(session =>
    session.repoName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.githubRepoUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sidebar-foreground/40" />
          <Input
            placeholder="Search sessions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-sidebar-accent/50 border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/40"
          />
        </div>
      </div>

      {/* Sessions List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => (
              <SessionItem
                key={session.id}
                session={session}
                isActive={session.id === activeSessionId}
                onSelect={() => onSessionSelect(session.id)}
                onDelete={() => onDeleteSession(session.id)}
              />
            ))
          ) : (
            <div className="p-4 text-center">
              <p className="text-sm text-sidebar-foreground/60">
                {searchQuery ? 'No sessions found' : 'No sessions yet'}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSessionList;
