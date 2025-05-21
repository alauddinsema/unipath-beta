
/**
 * Formats a bullet point list from an array of items
 */
const formatBulletPoints = (items: string[]): string => {
  return items.map(item => `• ${item}`).join('\n');
};

/**
 * Formats the chatbot response to be more readable
 */
export const formatChatResponse = (response: string): string => {
  if (!response) return "I couldn't generate a response. Please try again.";
  
  // Check if response already contains markdown/formatting
  if (response.includes('\n\n') || response.includes('•') || response.includes('*')) {
    return response;
  }

  // Extract bullet points if they exist (text between ** marks)
  const bulletPoints = response.match(/\*\*(.*?)\*\*/g)?.map(item => 
    item.replace(/\*\*/g, '').trim()
  ) || [];

  // Split the response into sections
  const sentences = response.split(/(?<=[.!?])\s+/g);
  let greeting = '';
  let mainContent = '';
  
  if (sentences.length > 0) {
    greeting = sentences[0];
    mainContent = sentences.slice(1).join(' ');
  } else {
    greeting = response;
  }
  
  // Format the response
  let formattedResponse = greeting.trim() + '\n\n';
  
  if (bulletPoints.length > 0) {
    formattedResponse += 'Here are some topics I can help you with:\n\n';
    formattedResponse += formatBulletPoints(bulletPoints) + '\n\n';
  }
  
  if (mainContent) {
    formattedResponse += mainContent.trim() + '\n\n';
  }
  
  if (!response.toLowerCase().includes('help you')) {
    formattedResponse += 'The more specific you are, the better I can help you!';
  }
  
  return formattedResponse;
};
