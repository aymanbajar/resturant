import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { BsSendFill } from "react-icons/bs";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // محاكاة إرسال البيانات
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });

            setTimeout(() => {
                setSubmitSuccess(false);
            }, 5000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 font-serif">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                        Get In Touch
                    </h1>
                    <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
                        We'd love to hear from you! Whether you have a question about our recipes, feedback, or anything else, our team is ready to answer all your questions.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                            <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Information</h2>
                            
                            <div className="space-y-6">
                                {/* Phone */}
                                <div className="flex items-start gap-4 group">
                                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <FaPhone className="text-white text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800 mb-1">Phone</h3>
                                        <p className="text-gray-600">+966 50 123 4567</p>
                                        <p className="text-gray-600">+966 50 765 4321</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4 group">
                                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <FaEnvelope className="text-white text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800 mb-1">Email</h3>
                                        <p className="text-gray-600">info@restaurant.com</p>
                                        <p className="text-gray-600">support@restaurant.com</p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-4 group">
                                    <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <FaMapMarkerAlt className="text-white text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800 mb-1">Address</h3>
                                        <p className="text-gray-600">123 Recipe Street</p>
                                        <p className="text-gray-600">Riyadh, Saudi Arabia</p>
                                    </div>
                                </div>

                                {/* Working Hours */}
                                <div className="flex items-start gap-4 group">
                                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <FaClock className="text-white text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800 mb-1">Working Hours</h3>
                                        <p className="text-gray-600">Monday - Friday: 9AM - 8PM</p>
                                        <p className="text-gray-600">Saturday - Sunday: 10AM - 6PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map or Image */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                            <div className="h-64 bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center">
                                <div className="text-center">
                                    <FaMapMarkerAlt className="text-orange-600 text-6xl mx-auto mb-4" />
                                    <p className="text-gray-700 font-semibold text-lg">Location Map</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Send Us a Message</h2>
                        <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

                        {submitSuccess && (
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg animate-fade-in">
                                <p className="font-semibold">✓ Message sent successfully!</p>
                                <p className="text-sm">We'll get back to you soon.</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition-all duration-300 text-gray-800"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your.email@example.com"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition-all duration-300 text-gray-800"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+966 50 123 4567"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition-all duration-300 text-gray-800"
                                />
                            </div>

                            {/* Subject */}
                            <div>
                                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="What is this about?"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition-all duration-300 text-gray-800"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    placeholder="Write your message here..."
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition-all duration-300 text-gray-800 resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <BsSendFill className="text-xl" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            
        </div>
    );
}
