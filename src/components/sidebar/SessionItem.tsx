
import React, { useState } from 'react';
import { ChatSession } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Github, 
  GitBranch, 
  MoreVertical, 
  Trash2, 
  ExternalLink, 
  Clock,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SessionItemProps {
  session: ChatSession;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

const SessionItem: React.FC<SessionItemProps> = ({
  session,
  isActive,
  onSelect,
  onDelete
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
      case 'ready':
        return 'bg-green-500/20 text-green-600 border-green-500/30';
      case 'error':
        return 'bg-red-500/20 text-red-600 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />;
      case 'ready':
        return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      case 'error':
        return <div className="w-2 h-2 bg-red-500 rounded-full" />;
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full" />;
    }
  };

  return (
    <div
      className={cn(
        "group relative p-3 rounded-lg border transition-all duration-200 cursor-pointer",
        "hover:bg-sidebar-accent/50 hover:border-sidebar-accent-foreground/20",
        isActive 
          ? "bg-sidebar-accent border-primary/30 sidebar-item-active" 
          : "bg-sidebar/50 border-sidebar-border"
      )}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {/* Repository Info */}
          <div className="flex items-center space-x-2 mb-2">
            <Github className="h-4 w-4 text-sidebar-foreground/60 flex-shrink-0" />
            <span className="font-medium text-sidebar-foreground truncate text-sm">
              {session.repoName}
            </span>
            {getStatusIcon(session.status)}
          </div>

          {/* Branch */}
          <div className="flex items-center space-x-1 mb-2">
            <GitBranch className="h-3 w-3 text-sidebar-foreground/40" />
            <span className="text-xs text-sidebar-foreground/60">
              {session.branchName || 'main'}
            </span>
          </div>

          {/* Message Count & Date */}
          <div className="flex items-center justify-between text-xs text-sidebar-foreground/40">
            <div className="flex items-center space-x-1">
              <MessageSquare className="h-3 w-3" />
              <span>{session._count?.messages || 0} messages</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{new Date(session.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Status Badge */}
          <Badge 
            className={cn(
              "mt-2 text-xs px-2 py-0.5",
              getStatusColor(session.status)
            )}
          >
            {session.status}
          </Badge>
        </div>

        {/* Actions */}
        <DropdownMenu open={showDropdown} onOpenChange={setShowDropdown}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-6 w-6 text-sidebar-foreground/40 hover:text-sidebar-foreground",
                "opacity-0 group-hover:opacity-100 transition-opacity"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown(!showDropdown);
              }}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                window.open(session.githubRepoUrl, '_blank');
              }}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in GitHub
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Session
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SessionItem;
