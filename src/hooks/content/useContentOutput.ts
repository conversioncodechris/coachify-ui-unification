
import { useState } from 'react';
import { ContentOutput, Message } from '../../components/content/ContentTypes';

export const useContentOutput = () => {
  const [generatedContent, setGeneratedContent] = useState<ContentOutput | null>(null);
  const [showContentOutput, setShowContentOutput] = useState<boolean>(false);

  const generateContentFromConversation = (messages: Message[]): ContentOutput => {
    const userResponses = messages
      .filter(msg => msg.sender === 'user')
      .map(msg => msg.content);
    
    return {
      facebook: `🏠 SUCCESS STORY: Just closed an amazing deal on a unique property! ${userResponses[0]?.substring(0, 100)}... 

The journey wasn't without challenges: ${userResponses[1]?.substring(0, 100)}...

What made this special was adapting to my client's needs: ${userResponses[2]?.substring(0, 100)}...

#RealEstateSuccess #ClosedDeal #RealEstateTips`,
      
      instagram: `✨ DEAL CLOSED! ✨

One of my most significant transactions this month! 

${userResponses[0]?.substring(0, 150)}...

Swipe to see the property! 📱➡️

#RealEstate #DealClosed #PropertySales #RealEstateAgent`,
      
      linkedin: `I'm excited to share a recent success story from my real estate practice.

${userResponses[0]}

This transaction wasn't without its challenges. ${userResponses[1]}

What I learned: ${userResponses[3]}

I'm grateful for clients who trust me with their real estate journeys and looking forward to helping more people achieve their property goals.

#RealEstate #ProfessionalDevelopment #ClientSuccess`,
      
      twitter: `Just closed on an amazing property! 🏠 ${userResponses[0]?.substring(0, 80)}...

The best part? ${userResponses[3]?.substring(0, 80)}...

#RealEstate #Success #ClosedDeal`,
      
      x: `Just closed on an amazing property! 🏠 ${userResponses[0]?.substring(0, 80)}...

The best part? ${userResponses[3]?.substring(0, 80)}...

#RealEstate #Success #ClosedDeal`,

      tiktok: `POV: When you finally close on that perfect property after weeks of negotiation! 🏠✨

What made it special: ${userResponses[0]?.substring(0, 100)}... 

Biggest challenge we faced: ${userResponses[1]?.substring(0, 80)}...

Worth it for: ${userResponses[3]?.substring(0, 80)}...

#RealEstateTikTok #ClosingDay #RealEstateAgent #PropertySuccess`,
      
      email: `Subject: How We Overcame Challenges to Close on a Unique Property

Hi [Client Name],

I wanted to share a recent success story that reminds me of some of the challenges we've discussed in your own real estate journey.

Recently, I helped a client with a property that was ${userResponses[0]?.substring(0, 100)}...

We faced several obstacles along the way:
- ${userResponses[1]?.substring(0, 100)}...

What made this transaction special was our ability to adapt to the client's unique situation: ${userResponses[2]?.substring(0, 100)}...

The most rewarding part was ${userResponses[3]?.substring(0, 100)}...

I'd be happy to apply these successful strategies to your real estate goals as well. Are you available for a quick call next week to discuss?

Best regards,
[Your Name]`,

      videoScript: `[INTRO]
Hi everyone! Today I want to share an exciting success story from my recent real estate work.

[MAIN CONTENT]
I recently closed a deal on ${userResponses[0]?.substring(0, 100)}...

The journey had its challenges. ${userResponses[1]?.substring(0, 100)}...

What made this transaction special was ${userResponses[2]?.substring(0, 100)}...

The most rewarding aspect was ${userResponses[3]?.substring(0, 100)}...

[CALL TO ACTION]
If you're looking to buy or sell property, I'd love to help you navigate the process with the same care and attention. Reach out using the contact information in the description below!

[OUTRO]
Thanks for watching, and I'll see you in the next video!`,

      smsMessage: `Hi [Name], just wanted to share that I closed on a great property deal similar to what we discussed! The key to success was ${userResponses[3]?.substring(0, 60)}... Would love to chat about how this applies to your situation. Available next week?`,

      pressRelease: `FOR IMMEDIATE RELEASE
[YOUR COMPANY NAME] SUCCESSFULLY CLOSES CHALLENGING REAL ESTATE TRANSACTION

[CITY, STATE] - [DATE] - [Your Name], a real estate professional with [Your Company], recently closed a significant transaction involving ${userResponses[0]?.substring(0, 100)}...

The transaction presented several challenges, including ${userResponses[1]?.substring(0, 150)}...

"What made this deal special was our ability to adapt to the client's unique situation," said [Your Name]. "${userResponses[2]?.substring(0, 100)}..."

[Your Name] credits the successful outcome to ${userResponses[3]?.substring(0, 100)}...

For more information about [Your Company Name] and its real estate services, please visit [your website] or contact [phone/email].

###

Contact:
[Your Name]
[Your Title]
[Your Company]
[Phone]
[Email]`,

      blogPost: `# How I Navigated a Challenging Real Estate Transaction to Success

In the world of real estate, each transaction tells a unique story. Today, I'd like to share a recent success story that showcases the importance of perseverance, adaptability, and client-focused service.

## The Property

${userResponses[0]}

## The Challenges

No worthwhile achievement comes without obstacles. This transaction was no exception:

${userResponses[1]}

## Understanding the Client's Unique Situation

${userResponses[2]}

## The Rewarding Outcome

${userResponses[3]}

## Lessons Learned

Through this experience, I've refined my approach to handling complex real estate transactions. Every challenge presents an opportunity to grow professionally and provide better service to future clients.

If you're facing similar challenges in your real estate journey, I'd love to share how these strategies might help you too. Reach out today for a consultation!`,

      // New content types based on the marketing strategies
      comingSoon: `🏠 COMING SOON! 🏠

Excited to announce a beautiful property coming to the market next week! This is your exclusive sneak peek.

What makes this property special: ${userResponses[0]?.substring(0, 120)}...

Key features include:
- ${userResponses[1]?.substring(0, 80)}...
- ${userResponses[2]?.substring(0, 80)}...

Stay tuned for the official listing, or contact me directly for early access to this exceptional property before it hits the market!

#ComingSoon #RealEstate #ExclusiveAccess`,

      justListed: `🎉 JUST LISTED! 🎉

Proud to present this extraordinary property to the market!

Property highlights:
• ${userResponses[0]?.substring(0, 100)}...
• ${userResponses[1]?.substring(0, 80)}...

What makes this property stand out is ${userResponses[2]?.substring(0, 100)}...

Interested in a private showing? Contact me today before this gem is gone!

#JustListed #RealEstate #DreamHome #NewListing`,

      neighborhoodHighlight: `📍 NEIGHBORHOOD SPOTLIGHT: Why This Location Matters

Location is everything in real estate, and this property delivers!

Within walking distance:
• Local coffee shops and restaurants
• Parks and recreation areas
• Essential shopping and services

Community highlights:
${userResponses[0]?.substring(0, 150)}...

The neighborhood vibe is exactly what today's buyers are looking for - convenient, connected, and character-filled.

#NeighborhoodGuide #LocationLocationLocation #CommunityLiving`,

      marketUpdate: `📊 MARKET UPDATE: What Today's Real Estate Trends Mean For You

Using my recent listing as an example, here's what we're seeing in the current market:

• Showing statistics: This property received X showings in just the first weekend
• Buyer feedback trends: ${userResponses[1]?.substring(0, 100)}...
• Price point analysis: How this property compares to similar homes

What does this mean if you're thinking of buying or selling? ${userResponses[3]?.substring(0, 150)}...

Want a personalized market analysis for your property? Let's chat!

#RealEstateMarket #MarketTrends #RealEstateInsights`,

      openHouseAnnouncement: `🏡 OPEN HOUSE THIS WEEKEND! 🏡

Join me this Saturday and Sunday from 1-4PM to tour this stunning property at [ADDRESS].

What you'll love:
• ${userResponses[0]?.substring(0, 80)}...
• ${userResponses[1]?.substring(0, 80)}...
• ${userResponses[2]?.substring(0, 80)}...

Light refreshments will be served. Bring your questions - I'm here to help you explore this exceptional home and neighborhood!

#OpenHouse #RealEstate #HouseHunting #WeekendPlans`,

      testimonial: `💬 CLIENT SUCCESS STORY

"Working with [Agent Name] made all the difference in our real estate journey. The expertise and personalized approach helped us navigate ${userResponses[1]?.substring(0, 100)}... 

What impressed us most was ${userResponses[3]?.substring(0, 100)}..."

- Satisfied Clients, [Location]

Your real estate goals deserve this level of dedicated service. Let's talk about how I can help you achieve similar results!

#ClientTestimonial #RealEstateSuccess #TrustedAdvisor`,

      sellerStory: `📖 THE STORY BEHIND THE SALE

Every home has a story, and this one is special.

The sellers shared: "${userResponses[0]?.substring(0, 150)}..."

What they'll miss most about this home:
"${userResponses[2]?.substring(0, 100)}..."

I'm honored to help transition this beloved home to its next chapter. Interested in being part of this home's continuing story? Let's talk!

#HomeStories #RealEstateLegacy #MovingOn`,

      heroFeature: `✨ FEATURE SPOTLIGHT: The Heart of This Home

Some features truly define a property. For this listing, it's definitely ${userResponses[0]?.substring(0, 100)}...

What makes it special:
• ${userResponses[1]?.substring(0, 80)}...
• ${userResponses[2]?.substring(0, 80)}...

This is the kind of feature that turns a house into a dream home. Come see it in person!

#DreamHomeFeatures #RealEstateDetails #HomeDesign`,

      behindTheScenes: `🎬 BEHIND THE SCENES: Preparing This Listing

Ever wonder what goes into preparing a property for market? Here's a peek behind the curtain:

• ${userResponses[0]?.substring(0, 80)}: How we enhanced this aspect
• ${userResponses[1]?.substring(0, 80)}: The transformation process
• ${userResponses[2]?.substring(0, 80)}: Final touches that make a difference

The preparation process is where expertise truly shines. It's not just about selling a home—it's about presenting it in its absolute best light!

#BehindTheScenes #ListingPrep #RealEstateMarketing`,

      marketingBreakdown: `📋 MARKETING BREAKDOWN: How We're Promoting This Property

My marketing strategy for this exceptional property includes:

• Professional photography highlighting key features
• Virtual tours for remote buyers
• Targeted digital advertising to reach qualified buyers
• Network distribution to interested buyers in my database
• ${userResponses[3]?.substring(0, 100)}...

Marketing isn't just about exposure—it's about finding the right buyer who will truly value this home's unique qualities.

#RealEstateMarketing #ListingStrategy #SellerAdvantage`,

      justSold: `🎊 JUST SOLD! Celebrating Another Success Story

Thrilled to announce this property has found its new owner!

• Listed: [DATE]
• Days on market: [X]
• Final sale price: [PRICE]

${userResponses[3]?.substring(0, 150)}...

Thank you to everyone involved in making this transaction smooth and successful. Interested in similar results for your property? Let's connect!

#JustSold #RealEstateSuccess #SoldProperty`,

      walkScore: `🚶‍♂️ LOCATION ADVANTAGE: This Property's Impressive Walk Score

This property scores an excellent [X/100] on walkability!

Within easy walking distance:
• Grocery stores: [NAMES]
• Restaurants: [TYPES]
• Parks: [NAMES]
• Public transportation: [OPTIONS]

${userResponses[0]?.substring(0, 150)}...

Today's buyers value convenience and lifestyle. This location delivers both in abundance!

#WalkScore #LocationAdvantage #UrbanLiving #ConvenientLifestyle`,

      quizContent: `🤔 PROPERTY QUIZ: Can You Guess...?

1. Which room in this listing has the most natural light?
2. What unique feature makes the primary bedroom stand out?
3. How many total rooms does this property have?
4. What unexpected bonus space might surprise you?

Comment your guesses below! I'll reveal the answers tomorrow.

Hint: One of these features is completely unique to this property and rarely found in this neighborhood.

#RealEstateQuiz #PropertyFeatures #GuessTheRoom`,

      emailNewsletter: `Subject: Behind the Scenes: The Making of an Exceptional Listing

Dear [Name],

I wanted to give you an insider's look at my latest listing and share some insights that might be valuable for your own real estate journey.

PROPERTY SPOTLIGHT:
This [BEDROOMS]-bedroom, [BATHROOMS]-bathroom home in [NEIGHBORHOOD] has some truly special features, including ${userResponses[0]?.substring(0, 100)}...

BEHIND THE SCENES:
Preparing this home for market involved ${userResponses[1]?.substring(0, 150)}... This process reinforced something I always tell my clients: ${userResponses[3]?.substring(0, 100)}...

MARKET INSIGHTS:
Properties in this category are currently ${userResponses[2]?.substring(0, 100)}... This means for buyers and sellers alike, timing and strategy are crucial.

I'd be happy to discuss how these insights might apply to your specific situation. Would you like to schedule a quick call this week?

Best regards,
[Your Name]

P.S. If you know anyone who might be interested in this property, I'd greatly appreciate you forwarding this email to them.`
    };
  };

  return {
    generatedContent,
    setGeneratedContent,
    showContentOutput,
    setShowContentOutput,
    generateContentFromConversation
  };
};
