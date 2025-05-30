
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Github, GitBranch, Key, Loader2, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface RepoSetupFormProps {
  onSubmit: (data: {
    githubUrl: string;
    githubToken?: string;
    branchName?: string;
  }) => void;
  isLoading?: boolean;
}

const RepoSetupForm: React.FC<RepoSetupFormProps> = ({ onSubmit, isLoading = false }) => {
  const [githubUrl, setGithubUrl] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [branchName, setBranchName] = useState('main');
  const [showTokenField, setShowTokenField] = useState(false);

  const validateGitHubUrl = (url: string) => {
    const githubPattern = /^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\/?$/;
    return githubPattern.test(url.replace(/\.git$/, ''));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!githubUrl.trim()) {
      toast({
        title: "Repository URL required",
        description: "Please enter a valid GitHub repository URL.",
        variant: "destructive",
      });
      return;
    }

    if (!validateGitHubUrl(githubUrl)) {
      toast({
        title: "Invalid GitHub URL",
        description: "Please enter a valid GitHub repository URL (e.g., https://github.com/owner/repo).",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      githubUrl: githubUrl.trim(),
      githubToken: githubToken.trim() || undefined,
      branchName: branchName.trim() || 'main',
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="animate-fade-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Github className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Connect GitHub Repository</CardTitle>
          <CardDescription>
            Add a GitHub repository to start chatting with your code using AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Repository URL */}
            <div className="space-y-2">
              <Label htmlFor="githubUrl" className="text-sm font-medium">
                Repository URL
              </Label>
              <div className="relative">
                <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="githubUrl"
                  type="url"
                  placeholder="https://github.com/owner/repository"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Enter the full GitHub repository URL
              </p>
            </div>

            {/* Branch Selection */}
            <div className="space-y-2">
              <Label htmlFor="branchName" className="text-sm font-medium">
                Branch
              </Label>
              <div className="relative">
                <GitBranch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                <Select value={branchName} onValueChange={setBranchName}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">main</SelectItem>
                    <SelectItem value="master">master</SelectItem>
                    <SelectItem value="develop">develop</SelectItem>
                    <SelectItem value="dev">dev</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-muted-foreground">
                Choose the branch to analyze (defaults to main)
              </p>
            </div>

            {/* GitHub Token (Optional) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="githubToken" className="text-sm font-medium">
                  GitHub Token (Optional)
                </Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTokenField(!showTokenField)}
                  className="text-xs h-auto p-1 text-primary hover:text-primary/80"
                >
                  {showTokenField ? 'Hide' : 'Add token for private repos'}
                </Button>
              </div>
              
              {showTokenField && (
                <>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="githubToken"
                      type="password"
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                      value={githubToken}
                      onChange={(e) => setGithubToken(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-start space-x-2 text-xs text-muted-foreground">
                    <div className="flex-1">
                      <p>Required for private repositories. Create a personal access token with repo permissions.</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-xs h-auto p-1 text-primary hover:text-primary/80"
                      onClick={() => window.open('https://github.com/settings/tokens/new', '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Create token
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Setting up repository...
                </>
              ) : (
                <>
                  <Github className="mr-2 h-4 w-4" />
                  Start Chat Session
                </>
              )}
            </Button>
          </form>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="text-sm font-medium mb-2">What happens next?</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• We'll clone and analyze your repository</li>
              <li>• AI will process the code structure and documentation</li>
              <li>• You can start asking questions about your codebase</li>
              <li>• Processing may take a few minutes for large repositories</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RepoSetupForm;
