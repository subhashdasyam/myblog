import { faRocket, faLightbulb, faCode, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const features = [
  {
    name: 'Modern Design',
    description: 'Clean, responsive design that looks great on any device with a focus on readability and user experience.',
    icon: faRocket,
  },
  {
    name: 'Thoughtful Content',
    description: 'In-depth articles and tutorials written by experts in their field, covering the latest in technology.',
    icon: faLightbulb,
  },
  {
    name: 'Code Examples',
    description: 'Practical code samples and real-world examples to help you implement what you learn.',
    icon: faCode,
  },
  {
    name: 'Community Focused',
    description: 'Join a growing community of developers and tech enthusiasts sharing knowledge and ideas.',
    icon: faUsers,
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to stay ahead
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Our blog is packed with resources to help you learn, grow, and stay updated with the latest in technology.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-white dark:bg-gray-700 rounded-lg px-6 pb-8 h-full shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-md shadow-lg">
                      <FontAwesomeIcon 
                        icon={feature.icon} 
                        className="h-6 w-6 text-white" 
                        aria-hidden="true" 
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
