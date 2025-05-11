import { Link } from 'react-router-dom'
import { ArrowRightIcon, ChatBubbleLeftRightIcon, ClockIcon, DocumentChartBarIcon } from '@heroicons/react/24/outline'

const features = [
    {
        name: 'Chat History',
        description: 'Store and access your complete conversation history with AI assistants.',
        icon: ChatBubbleLeftRightIcon,
    },
    {
        name: 'Real-time Logging',
        description: 'Log conversations as they happen with automatic synchronization.',
        icon: ClockIcon,
    },
    {
        name: 'Analytics',
        description: 'Gain insights from your chat data with powerful analytics tools.',
        icon: DocumentChartBarIcon,
    },
]

export default function Home() {
    return (
        <div className="relative isolate overflow-hidden bg-white dark:bg-gray-900">
            {/* Hero section */}
            <div className="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6 sm:pb-24 lg:flex lg:px-8 lg:py-32">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                    <div className="mt-6 sm:mt-20 lg:mt-16">
                        <div className="inline-flex space-x-4 sm:space-x-6">
                            <span className="rounded-full bg-primary-600/10 px-3 py-1 text-sm font-semibold leading-6 text-primary-600 dark:text-white ring-1 ring-inset ring-primary-600/10 dark:ring-white/20">
                                New Features
                            </span>
                            <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600 dark:text-gray-300">
                                <span>v1.0 release</span>
                            </span>
                        </div>
                    </div>
                    <h1 className="mt-6 sm:mt-10 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                        ChatLogger
                    </h1>
                    <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 dark:text-gray-300">
                        A powerful platform for storing and retrieving chat interactions between users and AI assistants. Log, analyze, and export your chat data with ease.
                    </p>
                    <div className="mt-6 sm:mt-10 flex items-center gap-x-4 sm:gap-x-6">
                        <Link
                            to="/register"
                            className="rounded-md bg-primary-600 px-3 py-2 sm:px-3.5 sm:py-2.5 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                        >
                            Get started
                        </Link>
                        <Link to="/chats" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white group flex items-center gap-x-1">
                            View chats
                            <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
                <div className="mx-auto mt-10 sm:mt-16 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                    <div className="max-w-3xl flex-none">
                        <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 dark:bg-gray-800/50 dark:ring-gray-700/30">
                            <div className="relative w-full overflow-hidden">
                                {/* Mobile-responsive image with adjusted width for different screen sizes */}
                                <div className="w-full overflow-hidden rounded-md shadow-2xl">
                                    <img 
                                        src="https://placehold.co/1200x800/2563eb/FFFFFF?text=ChatLogger+Dashboard" 
                                        alt="ChatLogger Dashboard" 
                                        className="w-full h-auto object-cover" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features section */}
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-white">Everything you need</h2>
                    <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Powerful chat logging features
                    </p>
                    <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 text-gray-600 dark:text-gray-300">
                        ChatLogger provides a comprehensive set of tools to help you manage, analyze, and leverage your chat data effectively.
                    </p>
                </div>
                <div className="mx-auto mt-10 sm:mt-16 max-w-2xl lg:mt-20 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 sm:gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                    <feature.icon className="h-5 w-5 flex-none text-primary-600 dark:text-white" aria-hidden="true" />
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 sm:mt-4 flex flex-auto flex-col text-sm sm:text-base leading-7 text-gray-600 dark:text-gray-300">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
} 
