// components/ContactForm.tsx or pages/contact.tsx (depending on where your component lives)

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, JSX } from 'react';

// Ensure these environment variables are available client-side
// They should be set in your .env.local file and prefixed with NEXT_PUBLIC_
const phone = process.env.NEXT_PUBLIC_PHONE;
const displayEmail = process.env.NEXT_PUBLIC_EMAIL; // Use a different name to avoid confusion with form email state

interface FormData {
    name: string;
    email: string;
    message: string;
}

const ContactForm: () => JSX.Element = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [activeField, setActiveField] = useState<string | null>(null);
    const [isHoveringMap, setIsHoveringMap] = useState(false);

    // Effect to set initial theme
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, []);

    // Effect to apply theme class to html element
    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            root.classList.remove('light');
        } else {
            root.classList.add('light');
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFieldFocus = (fieldName: string) => {
        setActiveField(fieldName);
    };

    const handleFieldBlur = () => {
        setActiveField(null);
    };

    const handleMapClick = () => {
        // Ensure this URL is correct for opening Google Maps
        // A typical link would look like: https://www.google.com/maps/search/?api=1&query=21+Henry+Street+Sheffield+United+Kingdom
        // Let's construct a proper map link based on the address provided
        const address = encodeURIComponent('21 Henry Street, Sheffield, United Kingdom');
        window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
    };


    // *** MODIFIED: Handle actual form submission to the API ***
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission

        // Basic client-side validation (can add more comprehensive validation)
        if (!formData.name || !formData.email || !formData.message) {
            setSubmitStatus('error'); // Indicate error if fields are empty
            // Optionally, show a more specific client-side message
            console.error("Client-side validation failed: All fields are required.");
            return; // Stop the submission process
        }

        setIsSubmitting(true); // Start submitting state
        setSubmitStatus('idle'); // Reset status on new submission

        try {
            const response = await fetch('/api/contact', {
                method: 'POST', // Use the POST method as required by the API
                headers: {
                    'Content-Type': 'application/json', // Indicate that the body is JSON
                },
                body: JSON.stringify(formData), // Send the form data as a JSON string in the body
            });

            // Parse the JSON response from the API
            const result = await response.json();

            if (response.ok) { // Check if the response status is in the 2xx range
                console.log('API Response:', result); // Log success message from API
                setSubmitStatus('success'); // Set status to success
                // Clear the form after successful submission
                setFormData({ name: '', email: '', message: '' });
            } else {
                // Handle non-2xx responses (e.g., 400 from validation, 500 from server error)
                console.error('API Error:', response.status, result.message);
                setSubmitStatus('error'); // Set status to error
                // You could potentially display result.message to the user for specific errors (e.g., validation errors)
            }
        } catch (error) {
            // Handle network errors (e.g., server is down, no internet connection)
            console.error('Network Error:', error);
            setSubmitStatus('error'); // Set status to error
        } finally {
            // This block runs regardless of success or error
            setIsSubmitting(false); // End submitting state
        }
    };
    // *** END MODIFIED ***

    // Animation variants (rest of this is unchanged)
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
                when: 'beforeChildren',
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: 'easeOut',
            },
        },
        hover: {
            scale: 1.02,
            transition: { duration: 0.2 }
        }
    };

    const buttonVariants = {
        initial: { opacity: 1, backgroundColor: '#4f46e5' },
        hover: {
            opacity: 0.9,
            backgroundColor: '#4338ca',
            scale: 1.03,
            transition: { duration: 0.2 }
        },
        pressed: { scale: 0.95 },
        disabled: { opacity: 0.6, backgroundColor: '#6366f1', cursor: 'not-allowed' },
    };

    const fieldLabelVariants = {
        inactive: { y: 0, scale: 1, color: 'rgba(107, 114, 128, 1)' }, // Default color
        active: { y: -5, scale: 0.95, color: '#3b82f6' } // Active color
    };


    const mapVariants = {
        normal: { scale: 1 },
        hover: { scale: 1.02 }
    };

    const contactInfoItem = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut'
            }
        },
        hover: {
            x: 5,
            transition: { duration: 0.2 }
        }
    };

    const themeToggleVariants = {
        initial: { rotate: 0 },
        hover: { rotate: 15, scale: 1.1 },
        tap: { rotate: -15, scale: 0.9 }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 p-4 pt-16 md:pt-4">
            {/* Animated Theme Toggle Button */}
            <motion.button
                onClick={toggleTheme}
                className="fixed top-2 items-center p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 z-20"
                aria-label="Toggle Theme"
                variants={themeToggleVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
            >
                {theme === 'dark' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                )}
            </motion.button>

            <motion.div
                className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-8 mt-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ boxShadow: theme === 'dark' ? "0 10px 25px -5px rgba(0, 0, 0, 0.5)" : "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }} // Dark mode shadow adjustment
            >
                {/* Left Side (Contact Info & Map) */}
                <div className="flex-1 flex flex-col">
                    <motion.h2
                        className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6 text-center md:text-left mt-4 md:mt-0"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Contact Information
                    </motion.h2>

                    <div className="flex-grow flex flex-col">
                        {/* Animated Contact Details */}
                        <div className="text-gray-600 dark:text-gray-300 mb-6 space-y-4 sm:space-y-6">
                            <motion.p
                                className="mb-2 sm:mb-4"
                                variants={contactInfoItem}
                                whileHover="hover"
                            >
                                <strong className="text-gray-800 dark:text-white">Address:</strong><br />
                                <motion.span
                                    className="inline-block"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    21 Henry Street, Sheffield, United Kingdom
                                </motion.span>
                            </motion.p>

                            <motion.p
                                className="mb-2 sm:mb-4"
                                variants={contactInfoItem}
                                whileHover="hover"
                            >
                                <strong className="text-gray-800 dark:text-white">Phone:</strong><br />
                                <motion.a
                                    href={`tel:${phone}`}
                                    className="hover:text-blue-500 transition-colors duration-200"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {phone} {/* Use the env var */}
                                </motion.a>
                            </motion.p>

                            <motion.p
                                className="mb-2 sm:mb-4"
                                variants={contactInfoItem}
                                whileHover="hover"
                            >
                                <strong className="text-gray-800 dark:text-white">Email:</strong><br />
                                <motion.a
                                    href={`mailto:${displayEmail}`} // Use the client-side env var for display
                                    className="hover:text-blue-500 transition-colors duration-200"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {displayEmail} {/* Use the env var */}
                                </motion.a>
                            </motion.p>

                            <motion.p
                                className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6"
                                variants={contactInfoItem}
                            >
                                Looking for a great opportunity. Lets collab and build something revolutionary!
                            </motion.p>
                        </div>

                        {/* Interactive Map - Now actually clickable */}
                        <motion.div
                            className="flex-grow mt-2 min-h-32 sm:min-h-48 md:min-h-0 bg-gray-200 dark:bg-gray-800 rounded-md overflow-hidden border border-gray-300 dark:border-gray-700 relative cursor-pointer"
                            variants={mapVariants}
                            initial="normal"
                            whileHover="hover"
                            onHoverStart={() => setIsHoveringMap(true)}
                            onHoverEnd={() => setIsHoveringMap(false)}
                            onClick={handleMapClick}
                            role="button"
                            aria-label="Open location in Google Maps"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleMapClick();
                                }
                            }}
                        >
                            <AnimatePresence>
                                {isHoveringMap && (
                                    <motion.div
                                        className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <motion.span
                                            className="text-white font-bold text-sm sm:text-lg bg-blue-600 px-3 py-1 sm:px-4 sm:py-2 rounded-full"
                                            initial={{ scale: 0.8 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 500 }}
                                        >
                                            Click to view map
                                        </motion.span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Placeholder iframe - replace with actual map embed if needed, but the click handles opening maps */}
                            {/* Using a placeholder iframe that doesn't load a real map helps performance */}
                            {/* The iframe src should be replaced with a static image or just remove it if you only rely on the click */}
                            {/* For a functional embed, you'd use Google Maps Embed API or similar */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2382.3949946051265!2d-1.471508123471272!3d53.38211607226141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879785171421a6d%3A0x3600836171355c0!2sSheffield%2C%20UK!5e0!3m2!1sen!2sus!4v1714360279212!5m2!1sen!2sus" // Using about:blank to show nothing, as click handles navigation
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                // referrerPolicy="no-referrer-when-downgrade" // Not needed for about:blank
                                title="Location Map Placeholder"
                                aria-hidden="true" // Hide iframe from accessibility tree since the parent div is interactive
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Right Side (Contact Form) */}
                <div className="flex-1 flex flex-col mt-8 md:mt-0">
                    <motion.h2
                        className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-8 text-center md:text-left"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.span
                            variants={itemVariants}
                            // Pulsing effect on the "Initiate Contact" text
                            animate={{
                                color: theme === 'dark' ? ['#ffffff', '#3b82f6', '#ffffff'] : ['#1f2937', '#3b82f6', '#1f2937'],
                                textShadow: ['none', '0 0 8px rgba(59, 130, 246, 0.5)', 'none']
                            }}
                            transition={{
                                duration: 3, // Slower pulse
                                repeat: Infinity,
                                repeatType: 'reverse'
                            }}
                        >
                            Initiate Contact
                        </motion.span>
                    </motion.h2>

                    {/* Animated Status Messages */}
                    <AnimatePresence>
                        {submitStatus === 'success' && (
                            <motion.div
                                className="text-green-600 dark:text-green-400 text-center mb-4 p-2 sm:p-3 bg-green-100 dark:bg-green-900 bg-opacity-50 rounded-lg"
                                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: { type: 'spring', stiffness: 300 }
                                }}
                                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <motion.svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </motion.svg>
                                    Transmission successful!
                                </div>
                            </motion.div>
                        )}
                        {submitStatus === 'error' && (
                            <motion.div
                                className="text-red-600 dark:text-red-400 text-center mb-4 p-2 sm:p-3 bg-red-100 dark:bg-red-900 bg-opacity-50 rounded-lg"
                                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: { type: 'spring', stiffness: 300 }
                                }}
                                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <motion.svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        initial={{ rotate: 180, scale: 0 }}
                                        animate={{ rotate: 0, scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 500 }}
                                    >
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </motion.svg>
                                    Transmission failed. Please try again.
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
                        <motion.div className="mb-4 sm:mb-6" variants={itemVariants}>
                            <motion.label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 sm:mb-2 pl-1"
                                variants={fieldLabelVariants}
                                animate={activeField === 'name' ? 'active' : 'inactive'}
                            >
                                Name
                            </motion.label>
                            <motion.input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onFocus={() => handleFieldFocus('name')}
                                onBlur={handleFieldBlur}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                                whileFocus={{
                                    borderColor: '#3b82f6',
                                    boxShadow: theme === 'dark' ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : '0 0 0 2px rgba(59, 130, 246, 0.5)', // Keep shadow consistent
                                    scale: 1.01
                                }}
                                whileHover={{ borderColor: theme === 'dark' ? '#60a5fa' : '#93c5fd' }} // Hover border color adjusted for theme
                                required
                            />
                        </motion.div>

                        <motion.div className="mb-4 sm:mb-6" variants={itemVariants}>
                            <motion.label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 sm:mb-2 pl-1"
                                variants={fieldLabelVariants}
                                animate={activeField === 'email' ? 'active' : 'inactive'}
                            >
                                Email
                            </motion.label>
                            <motion.input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => handleFieldFocus('email')}
                                onBlur={handleFieldBlur}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                                whileFocus={{
                                    borderColor: '#3b82f6',
                                    boxShadow: theme === 'dark' ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : '0 0 0 2px rgba(59, 130, 246, 0.5)', // Keep shadow consistent
                                    scale: 1.01
                                }}
                                whileHover={{ borderColor: theme === 'dark' ? '#60a5fa' : '#93c5fd' }} // Hover border color adjusted for theme
                                required
                            />
                        </motion.div>

                        <motion.div className="mb-6 sm:mb-8 flex-grow" variants={itemVariants}>
                            <motion.label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 sm:mb-2 pl-1"
                                variants={fieldLabelVariants}
                                animate={activeField === 'message' ? 'active' : 'inactive'}
                            >
                                Message
                            </motion.label>
                            <motion.textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                onFocus={() => handleFieldFocus('message')}
                                onBlur={handleFieldBlur}
                                rows={5}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out h-full min-h-28 resize-none"
                                whileFocus={{
                                    borderColor: '#3b82f6',
                                    boxShadow: theme === 'dark' ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : '0 0 0 2px rgba(59, 130, 246, 0.5)', // Keep shadow consistent
                                    scale: 1.01
                                }}
                                whileHover={{ borderColor: theme === 'dark' ? '#60a5fa' : '#93c5fd' }} // Hover border color adjusted for theme
                                required
                            />
                        </motion.div>

                        <motion.button
                            type="submit"
                            className="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-md text-white font-semibold text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
                            variants={buttonVariants}
                            initial="initial"
                            whileHover={isSubmitting ? 'disabled' : 'hover'}
                            whileTap="pressed"
                            animate={isSubmitting ? 'disabled' : 'initial'}
                            disabled={isSubmitting} // Button is disabled while submitting
                        >
                            {isSubmitting ? (
                                <motion.span
                                    className="flex items-center justify-center gap-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="inline-block"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                    </motion.span>
                                    Sending Transmission...
                                </motion.span>
                            ) : (
                                <motion.span
                                    className="flex items-center justify-center gap-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                    </svg>
                                    Send Transmission
                                </motion.span>
                            )}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactForm;