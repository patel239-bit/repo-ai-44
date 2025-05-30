
import React from 'react';
import { Message } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Bot, File, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  return (
    <div className="chat-messages flex-1 overflow-y-auto p-4 space-y-6">
      {messages.length === 0 && !isLoading ? (
        <div className="text-center py-12">
          <div className="p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Start the conversation
          </h3>
          <p className="text-muted-foreground">
            Ask questions about your repository. I can help you understand the code, find specific functions, or explain how different parts work together.
          </p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </AvatarFallback>
              </Avatar>
              <Card className="flex-1 p-4 bg-muted/50">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Analyzing your repository...
                  </span>
                </div>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      "flex items-start space-x-3 animate-fade-in",
      isUser && "flex-row-reverse space-x-reverse"
    )}>
      <Avatar className="h-8 w-8">
        <AvatarFallback className={cn(
          isUser ? "bg-primary text-primary-foreground" : "bg-primary/10"
        )}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-primary" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn(
        "flex-1 max-w-[85%]",
        isUser && "flex flex-col items-end"
      )}>
        <Card className={cn(
          "p-4",
          isUser 
            ? "bg-primary text-primary-foreground ml-auto" 
            : "bg-muted/50"
        )}>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="m-0 whitespace-pre-wrap">{message.content}</p>
          </div>
          
          {message.filesReferences && message.filesReferences.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border/20">
              <div className="text-xs font-medium mb-2 opacity-70">
                Referenced files:
              </div>
              <div className="flex flex-wrap gap-1">
                {message.filesReferences.map((file, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs bg-background/50"
                  >
                    <File className="h-3 w-3 mr-1" />
                    {file.fileName}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Card>
        
        <div className={cn(
          "text-xs text-muted-foreground mt-1 px-1",
          isUser && "text-right"
        )}>
          {new Date(message.createdAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default MessageList;
