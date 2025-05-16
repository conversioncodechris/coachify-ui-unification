
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Link, Calendar, FileText, Image, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const manualListingSchema = z.object({
  address: z.string().min(5, { message: "Address is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  bedrooms: z.string().min(1, { message: "Number of bedrooms is required" }),
  bathrooms: z.string().min(1, { message: "Number of bathrooms is required" }),
  squareFootage: z.string().min(1, { message: "Square footage is required" }),
  highlights: z.string().min(10, { message: "Please add at least a few property highlights" }),
  propertyType: z.string().min(1, { message: "Property type is required" }),
  yearBuilt: z.string().optional(),
  lotSize: z.string().optional(),
});

// Sample listing images to choose from
const mockListingImages = [
  { id: 'exterior1', src: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format', alt: 'House Exterior' },
  { id: 'kitchen1', src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format', alt: 'Modern Kitchen' },
  { id: 'living1', src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format', alt: 'Living Room' },
  { id: 'bathroom1', src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&auto=format', alt: 'Bathroom' },
  { id: 'bedroom1', src: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format', alt: 'Bedroom' },
  { id: 'backyard1', src: 'https://images.unsplash.com/photo-1564013434775-f71db0030976?w=800&auto=format', alt: 'Backyard' },
];

interface ListingInputFormProps {
  onListingSubmit: (listingDetails: any) => void;
}

const ListingInputForm: React.FC<ListingInputFormProps> = ({ onListingSubmit }) => {
  const { toast } = useToast();
  const [isComingSoon, setIsComingSoon] = useState(false);
  const [listingUrl, setListingUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [foundListing, setFoundListing] = useState<any>(null);
  const [showImageSelector, setShowImageSelector] = useState(false);

  const form = useForm<z.infer<typeof manualListingSchema>>({
    resolver: zodResolver(manualListingSchema),
    defaultValues: {
      address: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      squareFootage: "",
      highlights: "",
      propertyType: "single-family",
      yearBuilt: "",
      lotSize: "",
    },
  });

  const handleListingUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listingUrl.trim()) return;
    
    setIsLoading(true);
    
    // This would be replaced with actual listing data fetching
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock data for demo purposes
      const mockListingData = {
        source: 'url',
        url: listingUrl,
        address: '123 Main Street, Anytown, CA 12345',
        price: '$1,295,000',
        bedrooms: '4',
        bathrooms: '3',
        squareFootage: '2,500',
        propertyType: 'Single Family Home',
        highlights: 'Renovated kitchen, hardwood floors throughout, large backyard with pool',
      };
      
      setFoundListing(mockListingData);
      setShowImageSelector(true);
      
      toast({
        title: "Listing found",
        description: "We found the listing details. Is this the correct property?"
      });
    }, 1500);
  };

  const confirmListing = () => {
    const finalListing = {
      ...foundListing,
      images: selectedImages.length > 0 
        ? selectedImages.map(id => mockListingImages.find(img => img.id === id))
        : mockListingImages.slice(0, 3) // Default to first 3 images if none selected
    };
    
    onListingSubmit(finalListing);
    
    toast({
      title: "Listing data confirmed",
      description: "Successfully extracted details from the listing URL"
    });
  };

  const onSubmitManualListing = (data: z.infer<typeof manualListingSchema>) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      onListingSubmit({
        source: 'manual',
        ...data,
        images: selectedImages.length > 0 
          ? selectedImages.map(id => mockListingImages.find(img => img.id === id))
          : [] // No default images for manual listings unless selected
      });
      
      toast({
        title: "Listing details saved",
        description: "Your listing information has been recorded"
      });
    }, 1000);
  };

  const handleImageToggle = (imageId: string) => {
    setSelectedImages(prev => {
      if (prev.includes(imageId)) {
        return prev.filter(id => id !== imageId);
      } else {
        return [...prev, imageId];
      }
    });
  };

  return (
    <div className="mx-auto max-w-3xl w-full">
      <Card className="p-6 bg-white shadow-sm border border-border rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Step 1: Enter Your Listing Details</h2>
        
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={isComingSoon}
              onCheckedChange={setIsComingSoon}
              id="coming-soon-mode"
            />
            <label htmlFor="coming-soon-mode" className="text-sm font-medium cursor-pointer">
              Coming Soon Listing
            </label>
          </div>
          <div className="text-sm text-muted-foreground">
            {isComingSoon ? "Enter listing details manually" : "Paste listing URL"}
          </div>
        </div>
        
        {!isComingSoon ? (
          <form onSubmit={handleListingUrlSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="listing-url" className="text-sm font-medium">
                Listing URL
              </label>
              <div className="flex gap-2">
                <Input
                  id="listing-url"
                  type="url"
                  placeholder="https://www.realtor.com/your-listing-url"
                  value={listingUrl}
                  onChange={(e) => setListingUrl(e.target.value)}
                  className="flex-1"
                  required
                  disabled={isLoading || foundListing !== null}
                />
                {!foundListing ? (
                  <Button type="submit" disabled={!listingUrl.trim() || isLoading}>
                    {isLoading ? "Searching..." : "Find Listing"}
                  </Button>
                ) : (
                  <Button type="button" variant="outline" onClick={() => {
                    setFoundListing(null);
                    setShowImageSelector(false);
                    setSelectedImages([]);
                  }}>
                    Change URL
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                We support links from Zillow, Realtor.com, Redfin and MLS systems
              </p>
            </div>
            
            {foundListing && (
              <div className="mt-4 p-4 border rounded-md bg-muted/50">
                <h3 className="font-medium text-lg mb-2">Listing Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Address:</p>
                    <p className="text-sm">{foundListing.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Price:</p>
                    <p className="text-sm">{foundListing.price}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Bedrooms:</p>
                    <p className="text-sm">{foundListing.bedrooms}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Bathrooms:</p>
                    <p className="text-sm">{foundListing.bathrooms}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Square Footage:</p>
                    <p className="text-sm">{foundListing.squareFootage}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Property Type:</p>
                    <p className="text-sm">{foundListing.propertyType}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium">Highlights:</p>
                  <p className="text-sm">{foundListing.highlights}</p>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-primary">
                  <Check className="h-4 w-4" />
                  <span className="text-sm font-medium">Listing found successfully</span>
                </div>
              </div>
            )}
            
            {showImageSelector && (
              <div className="mt-4">
                <label className="text-sm font-medium mb-2 block">
                  Choose listing images
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {mockListingImages.map((image) => (
                    <div 
                      key={image.id}
                      onClick={() => handleImageToggle(image.id)}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                        selectedImages.includes(image.id) 
                          ? 'border-primary ring-2 ring-primary/30' 
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        className="h-24 w-full object-cover"
                      />
                      {selectedImages.includes(image.id) && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">
                            Selected
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {selectedImages.length === 0 
                    ? "Select at least one image for your listing" 
                    : `${selectedImages.length} image${selectedImages.length !== 1 ? 's' : ''} selected`
                  }
                </p>
                
                {foundListing && (
                  <div className="mt-4">
                    <Button 
                      type="button" 
                      onClick={confirmListing}
                      className="w-full"
                      disabled={selectedImages.length === 0}
                    >
                      Confirm Listing
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {!foundListing && (
              <div className="mt-6 text-sm text-center text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <Link className="w-4 h-4" />
                  <span>We'll extract all the details and images from your listing URL</span>
                </div>
              </div>
            )}
          </form>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitManualListing)} className="space-y-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St, Anytown, CA 12345" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="$850,000" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="single-family">Single Family</SelectItem>
                          <SelectItem value="condo">Condo/Townhouse</SelectItem>
                          <SelectItem value="multi-family">Multi-Family</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="bedrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bedrooms</FormLabel>
                      <FormControl>
                        <Input placeholder="4" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bathrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bathrooms</FormLabel>
                      <FormControl>
                        <Input placeholder="3" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="squareFootage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Square Footage</FormLabel>
                      <FormControl>
                        <Input placeholder="2,500" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="yearBuilt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year Built</FormLabel>
                      <FormControl>
                        <Input placeholder="1985" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lotSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lot Size</FormLabel>
                      <FormControl>
                        <Input placeholder="0.25 acres" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="highlights"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Highlights</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter 3-5 key features of the property" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Include key selling points like renovated kitchen, hardwood floors, large backyard, etc.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <div className="mt-4">
                <label className="text-sm font-medium mb-2 block">
                  Choose listing images
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {mockListingImages.map((image) => (
                    <div 
                      key={image.id}
                      onClick={() => handleImageToggle(image.id)}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                        selectedImages.includes(image.id) 
                          ? 'border-primary ring-2 ring-primary/30' 
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        className="h-24 w-full object-cover"
                      />
                      {selectedImages.includes(image.id) && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">
                            Selected
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {selectedImages.length === 0 
                    ? "Select at least one image for your listing" 
                    : `${selectedImages.length} image${selectedImages.length !== 1 ? 's' : ''} selected`
                  }
                </p>
              </div>
              
              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Next: Choose Content Types"}
                </Button>
              </div>
            </form>
          </Form>
        )}
        
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex items-center justify-center text-xs text-muted-foreground gap-2">
            <Calendar className="w-4 h-4" />
            <span>All content will be tailored to your listing's stage</span>
          </div>
          <div className="flex items-center justify-center text-xs text-muted-foreground gap-2">
            <FileText className="w-4 h-4" />
            <span>We'll create customized content for multiple platforms</span>
          </div>
          <div className="flex items-center justify-center text-xs text-muted-foreground gap-2">
            <Image className="w-4 h-4" />
            <span>Your listing images will be incorporated into the content</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ListingInputForm;
