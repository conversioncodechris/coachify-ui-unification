
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Link, Calendar, FileText } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

interface ListingInputFormProps {
  onListingSubmit: (listingDetails: any) => void;
}

const ListingInputForm: React.FC<ListingInputFormProps> = ({ onListingSubmit }) => {
  const [isComingSoon, setIsComingSoon] = useState(false);
  const [listingUrl, setListingUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
        images: ['/placeholder.svg', '/placeholder.svg']
      };
      
      onListingSubmit(mockListingData);
    }, 1500);
  };

  const onSubmitManualListing = (data: z.infer<typeof manualListingSchema>) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      onListingSubmit({
        source: 'manual',
        ...data,
        images: [] // No images for coming soon properties
      });
    }, 1000);
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
                  disabled={isLoading}
                />
                <Button type="submit" disabled={!listingUrl.trim() || isLoading}>
                  {isLoading ? "Loading..." : "Next"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                We support links from Zillow, Realtor.com, Redfin and MLS systems
              </p>
            </div>
            
            <div className="mt-6 text-sm text-center text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <Link className="w-4 h-4" />
                <span>We'll extract all the details and images from your listing URL</span>
              </div>
            </div>
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
        </div>
      </Card>
    </div>
  );
};

export default ListingInputForm;
