import Link from 'next/link';

interface HeroProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export default function Hero({
  title = 'Welcome to Ask Init',
  subtitle = 'Discover insightful articles about technology, development, and innovation',
  primaryButtonText = 'Read Articles',
  primaryButtonLink = '/posts',
  secondaryButtonText = 'Learn More',
  secondaryButtonLink = '/about',
}: HeroProps) {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700/50 to-secondary-700/50" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {title}
          </h1>
          <p className="mt-6 text-xl text-primary-100 max-w-2xl">
            {subtitle}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link 
              href={primaryButtonLink}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-8 transition-all duration-200 hover:shadow-lg"
            >
              {primaryButtonText}
            </Link>
            <Link 
              href={secondaryButtonLink}
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 md:py-4 md:text-lg md:px-8 transition-colors duration-200"
            >
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
      
      <div className="relative
        before:absolute before:top-0 before:left-1/2 before:bg-[url('/wave.svg')] before:bg-no-repeat before:bg-center before:bg-cover before:w-full before:h-12 before:-translate-x-1/2 before:-translate-y-1/2
        after:absolute after:bottom-0 after:left-1/2 after:bg-[url('/wave.svg')] after:bg-no-repeat after:bg-center after:bg-cover after:w-full after:h-12 after:-translate-x-1/2 after:translate-y-1/2 after:rotate-180
      ">
        <div className="h-12"></div>
      </div>
    </section>
  );
}
