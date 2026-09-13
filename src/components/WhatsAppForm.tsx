import { useState } from 'react';

export default function WhatsAppForm() {
  const [message, setMessage] = useState('');
  const waNumber = "8801538288739"; 

  const handleSend = () => {
    if (!message) return;
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-8 max-w-lg">
      <input 
        type="text" 
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
        placeholder="Hi Aiman, I'd like to discuss a project..." 
        className="flex-1 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:border-neutral-400 dark:focus:border-neutral-600 focus:outline-none rounded-md px-4 py-3 text-sm text-neutral-900 dark:text-neutral-100 transition-colors placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
      />
      <button 
        onClick={handleSend}
        className="bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-white text-white dark:text-neutral-900 px-6 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
      >
        Message on WhatsApp
      </button>
    </div>
  );
}
