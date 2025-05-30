
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { File, ExternalLink } from 'lucide-react';
import { Message } from '@/types';

interface FileReferencesDialogProps {
  message: Message;
  children: React.ReactNode;
}

const FileReferencesDialog: React.FC<FileReferencesDialogProps> = ({ 
  message, 
  children 
}) => {
  if (!message.filesReferences || message.filesReferences.length === 0) {
    return <>{children}</>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <File className="h-5 w-5" />
            <span>Referenced Files</span>
            <Badge variant="secondary" className="ml-2">
              {message.filesReferences.length} file{message.filesReferences.length !== 1 ? 's' : ''}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">File Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-3">
              {message.filesReferences.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded">
                      <File className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{file.fileName}</p>
                      {file.filePath && (
                        <p className="text-sm text-muted-foreground">{file.filePath}</p>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <ScrollArea className="h-[400px] w-full rounded-md border border-border p-4">
              <div className="space-y-6">
                {message.filesReferences.map((file, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <File className="h-4 w-4 text-primary" />
                      <h4 className="font-semibold text-foreground">{file.fileName}</h4>
                    </div>
                    {file.filePath && (
                      <p className="text-sm text-muted-foreground font-mono bg-muted/50 p-2 rounded">
                        {file.filePath}
                      </p>
                    )}
                    <div className="pl-6 border-l-2 border-primary/20">
                      <p className="text-sm text-muted-foreground">
                        This file was referenced in the AI response to provide context about the codebase structure and functionality.
                      </p>
                    </div>
                    {index < message.filesReferences.length - 1 && (
                      <hr className="border-border" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default FileReferencesDialog;
