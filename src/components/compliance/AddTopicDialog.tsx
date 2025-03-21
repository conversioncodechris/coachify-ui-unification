
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Link, Youtube } from 'lucide-react';
import { validateYouTubeUrl } from '@/lib/utils';

export interface NewTopicData {
  icon: string;
  title: string;
  description: string;
  content?: string;
  sources?: {
    type: 'pdf' | 'url' | 'youtube';
    url?: string;
    file?: File;
    title?: string;
  }[];
}

interface AddTopicDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newTopic: NewTopicData;
  setNewTopic: React.Dispatch<React.SetStateAction<NewTopicData>>;
  onSubmit: () => void;
  emojiOptions: string[];
}

const AddTopicDialog: React.FC<AddTopicDialogProps> = ({
  isOpen,
  onOpenChange,
  newTopic,
  setNewTopic,
  onSubmit,
  emojiOptions
}) => {
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [sourceType, setSourceType] = useState<'text' | 'pdf' | 'url' | 'youtube'>('text');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [sources, setSources] = useState<NewTopicData['sources']>([]);

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

  const addPdfSource = () => {
    if (!pdfFile) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to add",
        variant: "destructive"
      });
      return;
    }
    
    setSources(prev => [...prev, {
      type: 'pdf',
      file: pdfFile,
      title: pdfFile.name
    }]);
    
    setPdfFile(null);
    
    toast({
      title: "PDF Added",
      description: `${pdfFile.name} added as a reference source`,
    });
  };

  const addUrlSource = () => {
    if (!url.trim()) {
      toast({
        title: "Empty URL",
        description: "Please enter a valid URL",
        variant: "destructive"
      });
      return;
    }
    
    // Basic URL validation
    try {
      new URL(url);
    } catch (e) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL including http:// or https://",
        variant: "destructive"
      });
      return;
    }
    
    setSources(prev => [...prev, {
      type: 'url',
      url: url,
      title: url
    }]);
    
    setUrl("");
    
    toast({
      title: "Website Link Added",
      description: "URL added as a reference source",
    });
  };

  const addYoutubeSource = () => {
    if (!youtubeUrl.trim()) {
      toast({
        title: "Empty URL",
        description: "Please enter a YouTube URL",
        variant: "destructive"
      });
      return;
    }
    
    if (!validateYouTubeUrl(youtubeUrl)) {
      toast({
        title: "Invalid YouTube URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive"
      });
      return;
    }
    
    setSources(prev => [...prev, {
      type: 'youtube',
      url: youtubeUrl,
      title: "YouTube Video"
    }]);
    
    setYoutubeUrl("");
    
    toast({
      title: "YouTube Link Added",
      description: "YouTube video added as a reference source",
    });
  };

  const removeSource = (index: number) => {
    setSources(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitWithContent = () => {
    if (!newTopic.title.trim() || !newTopic.description.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and description.",
      });
      return;
    }
    
    // Update the newTopic with content and sources before submitting
    setNewTopic(prev => ({ 
      ...prev, 
      content,
      sources: sources.length > 0 ? sources : undefined
    }));
    
    setTimeout(onSubmit, 0); // Use setTimeout to ensure state is updated before submission
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Topic</DialogTitle>
          <DialogDescription>
            Create a new compliance topic with detailed information and reference materials
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-2">
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="icon">Select an Icon</Label>
              <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto p-2 border rounded-md">
                {emojiOptions.map((emoji, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`p-2 text-xl rounded hover:bg-gray-100 ${newTopic.icon === emoji ? 'bg-gray-200' : ''}`}
                    onClick={() => handleSelectEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Topic Title</Label>
              <Input 
                id="title"
                value={newTopic.title} 
                onChange={(e) => {
                  // Prevent newlines from being entered
                  const value = e.target.value.replace(/[\r\n]/g, '');
                  setNewTopic(prev => ({ ...prev, title: value }))
                }}
                placeholder="Enter a clear, specific title (e.g. 'Fair Housing Act Requirements')"
                maxLength={40}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Brief Description</Label>
              <Input
                id="description"
                value={newTopic.description}
                onChange={(e) => {
                  // Prevent newlines from being entered
                  const value = e.target.value.replace(/[\r\n]/g, '');
                  setNewTopic(prev => ({ ...prev, description: value }))
                }}
                placeholder="A concise summary (e.g. 'Key regulations for compliance with Fair Housing laws')"
                maxLength={60}
              />
            </div>
            
            <Tabs defaultValue="text" onValueChange={(value) => setSourceType(value as any)}>
              <Label>Content Source</Label>
              <TabsList className="grid grid-cols-4 w-full mt-1">
                <TabsTrigger value="text" className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4" />
                  <span>Text</span>
                </TabsTrigger>
                <TabsTrigger value="pdf" className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4" />
                  <span>PDF</span>
                </TabsTrigger>
                <TabsTrigger value="url" className="flex items-center gap-1.5">
                  <Link className="h-4 w-4" />
                  <span>URL</span>
                </TabsTrigger>
                <TabsTrigger value="youtube" className="flex items-center gap-1.5">
                  <Youtube className="h-4 w-4" />
                  <span>YouTube</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="text">
                <div className="grid gap-2 mt-4">
                  <Label htmlFor="content">Detailed Content</Label>
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
                <div className="grid gap-4 mt-4">
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload a PDF document containing compliance information
                    </p>
                    <input
                      type="file"
                      id="pdf-upload"
                      className="hidden"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById("pdf-upload")?.click()}
                    >
                      Select PDF File
                    </Button>
                  </div>
                  
                  {pdfFile && (
                    <div className="flex items-center justify-between bg-muted/30 p-2 rounded-md">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm font-medium truncate">{pdfFile.name}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={addPdfSource}
                      >
                        Add
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="url">
                <div className="grid gap-4 mt-4">
                  <div className="grid gap-2">
                    <Label htmlFor="url">Website URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com/compliance-resource"
                      />
                      <Button onClick={addUrlSource}>Add</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Add links to authoritative websites containing compliance information
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="youtube">
                <div className="grid gap-4 mt-4">
                  <div className="grid gap-2">
                    <Label htmlFor="youtube">YouTube Video URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="youtube"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                      <Button onClick={addYoutubeSource}>Add</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Add links to YouTube videos explaining compliance topics
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            {sources.length > 0 && (
              <div className="mt-2">
                <Label>Added Reference Sources</Label>
                <div className="mt-2 space-y-2 max-h-[200px] overflow-y-auto p-2 border rounded-md">
                  {sources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted/30 p-2 rounded-md">
                      <div className="flex items-center gap-2">
                        {source.type === 'pdf' && <FileText className="h-4 w-4" />}
                        {source.type === 'url' && <Link className="h-4 w-4" />}
                        {source.type === 'youtube' && <Youtube className="h-4 w-4" />}
                        <span className="text-sm font-medium truncate">
                          {source.type === 'pdf' ? source.file?.name : 
                           source.type === 'url' ? "Website Link" : 
                           "YouTube Video"}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeSource(index)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <span className="sr-only">Remove</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmitWithContent}>Create Topic</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTopicDialog;
