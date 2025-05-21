
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

      longFormBlog: `# How I Navigated a Challenging Real Estate Transaction to Success

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

      // Adding all content types
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

      blogPost: `# The Story Behind This Exceptional Property

Every home has a unique story, and today I'm excited to share one that's particularly special. As the listing agent for this property, I've had the privilege of learning what makes it not just a house, but a home.

## What Makes This Property Special

${userResponses[0]}

## The Neighborhood

${userResponses[1]}

## Why This Home Could Be Perfect For You

${userResponses[2]}

## Final Thoughts

${userResponses[3]}

If you're interested in learning more about this property or would like to schedule a viewing, please don't hesitate to contact me directly.

#RealEstateBlog #HomeStory #PropertyListing`,

      googleBusinessProfile: `NEW LISTING: ${userResponses[0]?.substring(0, 100)}...

I'm excited to present this exceptional property to the market! Located in a highly desirable area with ${userResponses[1]?.substring(0, 80)}...

Key features include:
• ${userResponses[2]?.substring(0, 80)}...

Contact me for more information or to schedule a showing!

#JustListed #RealEstate #NewProperty`,

      youtubeWalkthrough: `[INTRO]
Welcome to this exclusive property tour! Today, I'm excited to walk you through this exceptional home that just hit the market.

[PROPERTY OVERVIEW]
This property is special because ${userResponses[0]?.substring(0, 100)}...

[ROOM-BY-ROOM TOUR]
As we enter, notice ${userResponses[1]?.substring(0, 100)}...

The kitchen features ${userResponses[2]?.substring(0, 80)}...

Let's head upstairs to see the bedrooms...

[NEIGHBORHOOD HIGHLIGHTS]
This home is perfectly situated to enjoy ${userResponses[3]?.substring(0, 80)}...

[CALL TO ACTION]
If you're interested in seeing this property in person, contact me at the information below to schedule a showing. Don't forget to like and subscribe for more property tours!

Thanks for watching!`,

      buyerFeedback: `📊 BUYER FEEDBACK INSIGHTS

After multiple showings of this property, here's what potential buyers are saying:

"${userResponses[0]?.substring(0, 100)}..." - Buyer from [Location]

"${userResponses[1]?.substring(0, 100)}..." - Couple relocating from [Location]

"${userResponses[2]?.substring(0, 100)}..." - First-time homebuyer

This kind of feedback helps us understand what today's buyers are looking for in this market. Interested in what buyers might say about your home? Let's talk!

#BuyerInsights #RealEstateFeedback #MarketTrends`,

      offerStory: `🎯 YOU WON'T BELIEVE THIS OFFER!

Every property has a story, and this one just took an exciting turn! 

Without revealing confidential details, I can share that this listing just received an offer that demonstrates just how hot our market is right now!

What made this property attract such attention? ${userResponses[0]?.substring(0, 100)}...

If you're thinking of selling, now might be the perfect time to capitalize on this seller's market. Let's discuss your options!

#HotMarket #RealEstateOffer #SellerSuccess`,

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

      quizContent: `🤔 PROPERTY QUIZ: Can You Guess...?

1. Which room in this listing has the most natural light?
2. What unique feature makes the primary bedroom stand out?
3. How many total rooms does this property have?
4. What unexpected bonus space might surprise you?

Comment your guesses below! I'll reveal the answers tomorrow.

Hint: One of these features is completely unique to this property and rarely found in this neighborhood.

#RealEstateQuiz #PropertyFeatures #GuessTheRoom`,

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

P.S. If you know anyone who might be interested in this property, I'd greatly appreciate you forwarding this email to them.`,

      cmaMailing: `Subject: Property Value Update for [Neighborhood Name] - Exclusive Insights from Recent Listing

Dear [Neighbor's Name],

As a resident of [Neighborhood], I thought you'd be interested in some new market data I've compiled. My recent listing at [Address] offers valuable insights into our local real estate market.

NEIGHBORHOOD MARKET UPDATE:
• Average sale price in [Neighborhood]: [Price]
• Average days on market: [Number]
• Current inventory levels: [Low/Medium/High]

HOW YOUR HOME COMPARES:
Properties similar to yours in size and style are currently valued between [Price Range]. This is a [percentage]% increase from last year at this time.

I'd be happy to provide you with a personalized Comparative Market Analysis to give you a more precise valuation of your property, without any obligation.

Would you like to schedule a quick 15-minute consultation to discuss your specific property? I'm available [Days/Times].

Best regards,
[Your Name]
[Your Phone]
[Your Email]`,

      liveOpenHouse: `🔴 GOING LIVE for our Open House at [Address]!

Join me as I tour this beautiful property and answer your questions in real time.

Property highlights:
• ${userResponses[0]?.substring(0, 80)}...
• ${userResponses[1]?.substring(0, 80)}...

Can't make it in person? Drop your questions in the comments and I'll show you any part of the house you'd like to see more of!

Share this with friends who might be interested in this [Neighborhood] property!

#LiveOpenHouse #RealEstateTour #VirtualShowing`,

      storyPoll: `📊 QUICK QUESTION:

Would you move for a kitchen like this? 👇

[Image of kitchen]

[] YES! Dream kitchen alert!
[] No, not my style
[] Only if the rest of the house is just as nice
[] I'd need to see more

The kitchen in my newest listing has been getting a lot of attention from buyers. What features make a kitchen a "must-have" for you? Comment below!

#KitchenGoals #RealEstatePolls #HomeFeatures`,

      marketingCaseStudy: `📈 HOW WE MARKETED THIS PROPERTY: A Case Study

For real estate agents and sellers who want to understand effective marketing strategies, here's a detailed breakdown of how we promoted this recent listing:

STRATEGY OVERVIEW:
• Pre-listing: Teaser campaign with "coming soon" announcements
• Launch: Multi-platform announcement with professional photography
• Ongoing: Weekly content schedule across platforms

RESULTS:
• [X] showings in the first weekend
• [X] qualified buyer inquiries through social media
• Offer received within [X] days

KEY LEARNINGS:
${userResponses[3]?.substring(0, 200)}...

For sellers: This approach can help your property stand out in a competitive market.
For agents: I'm happy to share more detailed insights about this marketing approach.

#RealEstateMarketing #ListingStrategy #MarketingCaseStudy`
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
