import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Database, Cloud, FileText, Edit, Plus, MessageSquare } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { v4 as uuidv4 } from "uuid";
import { ContentAsset, AssetType, AssetSource } from "@/types/contentAssets";
import { useToast } from "@/hooks/use-toast";

interface AssetUploaderProps {
  assetType: AssetType;
  onAssetAdded: (assets: ContentAsset[]) => void;
}

const AssetUploader: React.FC<AssetUploaderProps> = ({ assetType, onAssetAdded }) => {
  const { toast } = useToast();
  const [uploadMethod, setUploadMethod] = useState<"upload" | "cloud" | "create" | "draft">("upload");
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [newAssets, setNewAssets] = useState<Partial<ContentAsset>[]>([]);
  const [emojiPicker, setEmojiPicker] = useState<string>("📄");
  const [typedContent, setTypedContent] = useState({
    title: "",
    subtitle: "",
    content: ""
  });
  
  const emojiOptions: Record<AssetType, string[]> = {
    prompt: ["💬", "📝", "🗣️", "💭", "📢", "🔤", "📋"],
    pdf: ["📄", "📑", "📰", "📚", "📂", "🗂️", "📕"],
    guidelines: ["📘", "🎨", "🖌️", "📐", "🔍", "📏", "🎭"],
    roleplay: ["👥", "🎭", "🎬", "👨‍💼", "👩‍💼", "🤝", "🗣️"],
    video: ["🎥", "📹", "🎬", "📽️", "🎞️", "📀", "🖥️"],
    other: ["📎", "🔗", "📦", "🗃️", "📮", "🔖", "📌"],
  };
  
  const handleSelectEmoji = (emoji: string) => {
    setEmojiPicker(emoji);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      
      const prelimAssets = newFiles.map(file => ({
        id: uuidv4(),
        type: assetType,
        title: file.name.split('.')[0],
        subtitle: "",
        icon: emojiPicker,
        source: "upload" as AssetSource,
        fileName: file.name,
        dateAdded: new Date(),
        size: file.size,
      }));
      
      setNewAssets(prelimAssets);
    }
  };

  const handleAssetTitleChange = (index: number, value: string) => {
    setNewAssets(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], title: value };
      return updated;
    });
  };

  const handleAssetSubtitleChange = (index: number, value: string) => {
    setNewAssets(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], subtitle: value };
      return updated;
    });
  };

  const handleAssetIconChange = (index: number, value: string) => {
    setNewAssets(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], icon: value };
      return updated;
    });
  };

  const handleSubmitAssets = () => {
    setIsUploading(true);
    
    setTimeout(() => {
      const completeAssets = newAssets.map(asset => ({
        ...asset,
        id: asset.id || uuidv4(),
        dateAdded: asset.dateAdded || new Date()
      })) as ContentAsset[];
      
      onAssetAdded(completeAssets);
      setFiles([]);
      setNewAssets([]);
      setIsUploading(false);
    }, 1000);
  };

  const handleCreateAsset = () => {
    const newAsset: ContentAsset = {
      id: uuidv4(),
      type: assetType,
      title: "New " + assetType.charAt(0).toUpperCase() + assetType.slice(1),
      subtitle: "Click to edit",
      icon: emojiPicker,
      source: "created",
      dateAdded: new Date()
    };
    
    onAssetAdded([newAsset]);
  };

  const handleAddPrompt = () => {
    if (!typedContent.title.trim()) {
      toast({
        title: "Missing title",
        description: "Please provide a title for your prompt.",
      });
      return;
    }

    const newPromptAsset: ContentAsset = {
      id: uuidv4(),
      type: 'prompt',
      title: typedContent.title.trim(),
      subtitle: typedContent.subtitle.trim() || "Prompt-based topic",
      icon: emojiPicker,
      source: "created",
      dateAdded: new Date(),
      content: typedContent.content || ""
    };
    
    console.log("Creating new prompt asset:", newPromptAsset);
    onAssetAdded([newPromptAsset]);
    
    setTypedContent({
      title: "",
      subtitle: "",
      content: ""
    });
    
    toast({
      title: "Prompt Created",
      description: "This prompt will appear as a topic card in Content AI.",
    });
  };

  const handleSubmitTypedContent = () => {
    if (assetType === 'prompt') {
      handleAddPrompt();
      return;
    }
    
    if (!typedContent.title.trim()) return;
    
    const newAsset: ContentAsset = {
      id: uuidv4(),
      type: assetType,
      title: typedContent.title,
      subtitle: typedContent.subtitle || "Manually created content",
      icon: emojiPicker,
      source: "created",
      dateAdded: new Date(),
      url: `data:text/plain;base64,${btoa(typedContent.content || " ")}` // Store content as data URL
    };
    
    onAssetAdded([newAsset]);
    
    setTypedContent({
      title: "",
      subtitle: "",
      content: ""
    });
  };

  const handleConnectCloud = (provider: "google-drive" | "dropbox") => {
    alert(`Connecting to ${provider}. This would open the authentication flow.`);
    
    const mockCloudAsset: ContentAsset = {
      id: uuidv4(),
      type: assetType,
      title: `${provider} ${assetType}`,
      subtitle: `Imported from ${provider}`,
      icon: emojiPicker,
      source: provider === "google-drive" ? "google-drive" : "dropbox",
      fileName: `cloud-file-${Date.now()}.pdf`,
      dateAdded: new Date(),
      url: `https://example.com/${provider}/file`,
      size: 1024 * 1024 * 2
    };
    
    onAssetAdded([mockCloudAsset]);
  };

  const renderPromptForm = () => {
    if (assetType !== 'prompt') return null;
    
    return (
      <div className="space-y-4 border rounded-md p-4">
        <h3 className="font-medium text-center">Create New Content Topic</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt-icon">Icon</Label>
            <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto p-2 border rounded-md">
              {emojiOptions.prompt.map((emoji, i) => (
                <button
                  key={i}
                  type="button"
                  className={`p-2 text-xl rounded hover:bg-gray-100 ${emojiPicker === emoji ? 'bg-gray-200' : ''}`}
                  onClick={() => handleSelectEmoji(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="prompt-title">Topic Title</Label>
            <Input
              id="prompt-title"
              value={typedContent.title}
              onChange={(e) => {
                const value = e.target.value.replace(/[\r\n]/g, '');
                setTypedContent(prev => ({ ...prev, title: value }));
              }}
              placeholder="Enter topic title"
              maxLength={40}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="prompt-description">Description</Label>
            <Input
              id="prompt-description"
              value={typedContent.subtitle}
              onChange={(e) => {
                const value = e.target.value.replace(/[\r\n]/g, '');
                setTypedContent(prev => ({ ...prev, subtitle: value }));
              }}
              placeholder="Brief description (one line)"
              maxLength={60}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="prompt-content">Prompt Content (Optional)</Label>
            <Textarea
              id="prompt-content"
              value={typedContent.content}
              onChange={(e) => setTypedContent(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Additional details for the AI (optional)"
              className="min-h-[100px]"
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setTypedContent({ title: "", subtitle: "", content: "" })}>
              Cancel
            </Button>
            <Button onClick={handleAddPrompt}>
              Add Topic
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardContent className="pt-6">
        {assetType === 'prompt' ? (
          <>
            <div className="mb-4 bg-blue-50 p-3 rounded-md border border-blue-100">
              <p className="text-sm text-blue-800 flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Prompts added here will appear as topic cards in Content AI.
              </p>
            </div>
            {renderPromptForm()}
          </>
        ) : (
          <Tabs defaultValue="upload" onValueChange={(value) => setUploadMethod(value as any)}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span>Upload</span>
              </TabsTrigger>
              <TabsTrigger value="cloud" className="flex items-center gap-2">
                <Cloud className="h-4 w-4" />
                <span>Cloud</span>
              </TabsTrigger>
              <TabsTrigger value="draft" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                <span>Draft</span>
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span>Create</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop files or click to browse
                </p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  Select Files
                </Button>
              </div>

              {newAssets.length > 0 && (
                <div className="space-y-4 mt-4">
                  <h3 className="font-medium">Files Ready for Upload</h3>
                  
                  <div className="space-y-4">
                    {newAssets.map((asset, index) => (
                      <div key={index} className="border rounded-md p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span className="text-sm font-medium">{files[index]?.name}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`icon-${index}`}>Icon</Label>
                            <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto p-2 border rounded-md">
                              {emojiOptions[assetType].map((emoji, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  className={`p-2 text-xl rounded hover:bg-gray-100 ${asset.icon === emoji ? 'bg-gray-200' : ''}`}
                                  onClick={() => handleAssetIconChange(index, emoji)}
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-2 md:col-span-3">
                            <div className="space-y-2">
                              <Label htmlFor={`title-${index}`}>Title</Label>
                              <Input
                                id={`title-${index}`}
                                value={asset.title || ""}
                                onChange={(e) => handleAssetTitleChange(index, e.target.value)}
                                maxLength={40}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`subtitle-${index}`}>Description</Label>
                              <Input
                                id={`subtitle-${index}`}
                                value={asset.subtitle || ""}
                                onChange={(e) => handleAssetSubtitleChange(index, e.target.value)}
                                maxLength={60}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSubmitAssets}
                      disabled={isUploading}
                    >
                      {isUploading ? "Uploading..." : "Upload All Files"}
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="cloud" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card 
                  className="p-6 cursor-pointer hover:border-blue-500 transition-colors flex flex-col items-center text-center"
                  onClick={() => handleConnectCloud("google-drive")}
                >
                  <div className="rounded-full bg-blue-100 p-4 mb-3">
                    <svg className="h-8 w-8 text-blue-500" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                      <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
                      <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
                      <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
                      <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
                      <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
                      <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
                    </svg>
                  </div>
                  <h3 className="font-medium mb-1">Connect to Google Drive</h3>
                  <p className="text-sm text-muted-foreground">Import files from your Google Drive</p>
                </Card>
                
                <Card 
                  className="p-6 cursor-pointer hover:border-blue-500 transition-colors flex flex-col items-center text-center"
                  onClick={() => handleConnectCloud("dropbox")}
                >
                  <div className="rounded-full bg-blue-100 p-4 mb-3">
                    <svg className="h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L6 7l6 5-6 5 6 5 6-5-6-5 6-5z"/>
                      <path d="M18 7l-6 5 6 5 6-5z"/>
                      <path d="M0 12l6 5 6-5-6-5z"/>
                    </svg>
                  </div>
                  <h3 className="font-medium mb-1">Connect to Dropbox</h3>
                  <p className="text-sm text-muted-foreground">Import files from your Dropbox</p>
                </Card>
              </div>
              
              <div className="mt-4 space-y-2">
                <Label htmlFor="cloud-icon">Select Icon for Cloud Assets</Label>
                <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto p-2 border rounded-md">
                  {emojiOptions[assetType].map((emoji, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`p-2 text-xl rounded hover:bg-gray-100 ${emojiPicker === emoji ? 'bg-gray-200' : ''}`}
                      onClick={() => handleSelectEmoji(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="draft" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type-icon">Icon</Label>
                  <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto p-2 border rounded-md">
                    {emojiOptions[assetType].map((emoji, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`p-2 text-xl rounded hover:bg-gray-100 ${emojiPicker === emoji ? 'bg-gray-200' : ''}`}
                        onClick={() => handleSelectEmoji(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type-title">Title</Label>
                    <Input
                      id="type-title"
                      value={typedContent.title}
                      onChange={(e) => setTypedContent(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter title"
                      maxLength={40}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type-subtitle">Description</Label>
                    <Input
                      id="type-subtitle"
                      value={typedContent.subtitle}
                      onChange={(e) => setTypedContent(prev => ({ ...prev, subtitle: e.target.value }))}
                      placeholder="Brief description"
                      maxLength={60}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type-content">Content</Label>
                    <Textarea
                      id="type-content"
                      value={typedContent.content}
                      onChange={(e) => setTypedContent(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Type your content here..."
                      className="min-h-[150px]"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleSubmitTypedContent}
                  disabled={!typedContent.title.trim()}
                >
                  Create Content
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="create" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="create-icon">Icon</Label>
                  <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto p-2 border rounded-md">
                    {emojiOptions[assetType].map((emoji, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`p-2 text-xl rounded hover:bg-gray-100 ${emojiPicker === emoji ? 'bg-gray-200' : ''}`}
                        onClick={() => handleSelectEmoji(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                
                <Button onClick={handleCreateAsset}>
                  Create New {assetType.charAt(0).toUpperCase() + assetType.slice(1)}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default AssetUploader;
