import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EmojiSelector from '../settings/add-prompt/EmojiSelector';
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Link, Youtube } from 'lucide-react';
import { validateYouTubeUrl } from '@/lib/utils';
import RoleplayScenarioForm from '../coach/RoleplayScenarioForm';
import { RoleplayScenario } from '../coach/CoachTypes';

interface AddTopicDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newTopic: {
    icon: string;
    title: string;
    description: string;
    content?: string;
    roleplay?: Partial<RoleplayScenario>;
  };
  setNewTopic: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: () => void;
  emojiOptions: string[];
  dialogTitle?: string;
  showRoleplayForm?: boolean;
}

const AddTopicDialog: React.FC<AddTopicDialogProps> = ({
  isOpen,
  onOpenChange,
  newTopic,
  setNewTopic,
  onSubmit,
  emojiOptions,
  dialogTitle = "Add New Topic",
  showRoleplayForm = false
}) => {
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [sourceType, setSourceType] = useState<'text' | 'pdf' | 'url' | 'youtube'>('text');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleSelectEmoji = (emoji: string) => {
    setNewTopic(prev => ({ ...prev, icon: emoji }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setPdfFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive"
        });
      }
    }
  };

  const handleSubmit = () => {
    if (!newTopic.title.trim()) {
      toast({
        title: "Missing title",
        description: "Please provide a title for your topic",
        variant: "destructive"
      });
      return;
    }

    if (sourceType === 'text') {
      setNewTopic(prev => ({ ...prev, content }));
    } else if (sourceType === 'pdf' && pdfFile) {
      setIsUploading(true);
      
      setTimeout(() => {
        setIsUploading(false);
        setNewTopic(prev => ({ 
          ...prev,
          content: `PDF: ${pdfFile.name}`,
          pdfUrl: URL.createObjectURL(pdfFile)
        }));
        toast({
          title: "PDF Uploaded",
          description: "Your PDF has been uploaded successfully"
        });
        onSubmit();
      }, 1500);
      
      return;
    } else if (sourceType === 'url' && url) {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        toast({
          title: "Invalid URL",
          description: "Please enter a valid URL starting with http:// or https://",
          variant: "destructive"
        });
        return;
      }
      setNewTopic(prev => ({ ...prev, content: `URL: ${url}` }));
    } else if (sourceType === 'youtube' && youtubeUrl) {
      if (!validateYouTubeUrl(youtubeUrl)) {
        toast({
          title: "Invalid YouTube URL",
          description: "Please enter a valid YouTube video URL",
          variant: "destructive"
        });
        return;
      }
      setNewTopic(prev => ({ ...prev, content: `YouTube: ${youtubeUrl}` }));
    }

    onSubmit();
  };

  const handleRoleplayChange = (scenario: Partial<RoleplayScenario>) => {
    setNewTopic(prev => ({
      ...prev,
      roleplay: scenario
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] flex flex-col max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto">
          <div className="grid gap-4 py-4">
            <EmojiSelector
              selectedEmoji={newTopic.icon}
              emojiOptions={emojiOptions}
              onSelectEmoji={handleSelectEmoji}
            />

            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newTopic.title}
                onChange={(e) => setNewTopic(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter a descriptive title"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newTopic.description}
                onChange={(e) => setNewTopic(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description (one line)"
              />
            </div>

            {showRoleplayForm ? (
              <div className="grid gap-2">
                <Label className="font-semibold text-base">Roleplay Details</Label>
                <div className="border border-border rounded-md p-4 bg-muted/30">
                  <RoleplayScenarioForm 
                    scenario={newTopic.roleplay || {}}
                    onChange={handleRoleplayChange}
                  />
                </div>
              </div>
            ) : (
              <Tabs defaultValue="text" onValueChange={(value) => setSourceType(value as any)}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="text" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Text</span>
                  </TabsTrigger>
                  <TabsTrigger value="pdf" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    <span>PDF</span>
                  </TabsTrigger>
                  <TabsTrigger value="url" className="flex items-center gap-2">
                    <Link className="h-4 w-4" />
                    <span>Website</span>
                  </TabsTrigger>
                  <TabsTrigger value="youtube" className="flex items-center gap-2">
                    <Youtube className="h-4 w-4" />
                    <span>YouTube</span>
                  </TabsTrigger>
                </TabsList>
    
                <TabsContent value="text">
                  <div className="grid gap-2 mt-4">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Enter detailed compliance information, regulations, and guidelines..."
                      className="min-h-[150px]"
                    />
                  </div>
                </TabsContent>
    
                <TabsContent value="pdf">
                  <div className="grid gap-2 mt-4">
                    <Label htmlFor="pdf-upload">Upload PDF</Label>
                    <div className="border-2 border-dashed border-border rounded-md p-6 text-center">
                      <input
                        type="file"
                        id="pdf-upload"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label htmlFor="pdf-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {pdfFile ? pdfFile.name : "Drag & drop or click to upload PDF"}
                          </span>
                          <span className="text-xs text-muted-foreground mt-1">
                            {pdfFile ? `${(pdfFile.size / 1024 / 1024).toFixed(2)} MB` : "Maximum file size: 5MB"}
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </TabsContent>
    
                <TabsContent value="url">
                  <div className="grid gap-2 mt-4">
                    <Label htmlFor="website-url">Website URL</Label>
                    <Input
                      id="website-url"
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com/compliance-document"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter the URL of a website containing compliance information.
                    </p>
                  </div>
                </TabsContent>
    
                <TabsContent value="youtube">
                  <div className="grid gap-2 mt-4">
                    <Label htmlFor="youtube-url">YouTube URL</Label>
                    <Input
                      id="youtube-url"
                      type="url"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter the URL of a YouTube video containing compliance information.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
        
        <DialogFooter className="mt-2 pt-2 border-t">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={isUploading}>
            {isUploading ? "Uploading..." : "Add Topic"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTopicDialog;
