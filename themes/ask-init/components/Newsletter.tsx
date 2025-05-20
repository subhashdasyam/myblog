import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would make an API call here
      // await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      
      setStatus('success');
      setMessage('Thank you for subscribing! Check your email to confirm.');
      setEmail('');
      
      // Reset message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Stay updated with our newsletter
          </h2>
          <p className="mt-4 text-lg text-primary-100">
            Get the latest articles, news and resources delivered straight to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="mt-8 sm:flex max-w-xl mx-auto">
            <div className="flex-1 min-w-0">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="block w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 rounded-md border-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white focus:outline-none"
                disabled={status === 'loading'}
              />
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md ${
                  status === 'loading' 
                    ? 'bg-primary-400 cursor-not-allowed' 
                    : 'bg-white text-primary-700 hover:bg-gray-50'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white`}
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </>
                ) : 'Subscribe'}
              </button>
            </div>
          </form>
          
          {message && (
            <div className={`mt-4 text-sm font-medium ${
              status === 'success' ? 'text-green-200' : 'text-red-200'
            }`}>
              {message}
            </div>
          )}
          
          <p className="mt-3 text-sm text-primary-200">
            We care about your data. Read our{' '}
            <a href="/privacy" className="font-medium text-white hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
