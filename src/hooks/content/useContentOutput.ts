
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

If you're facing similar challenges in your real estate journey, I'd love to share how these strategies might help you too. Reach out today for a consultation!`
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
