// App Constants
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'SVI School';
export const APP_TAGLINE = import.meta.env.VITE_APP_TAGLINE || 'Nurturing Excellence, Shaping Futures';

// Navigation Links
export const NAV_LINKS = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Blog', path: '/blog' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Faculty', path: '/faculty' },
    { name: 'Contact', path: '/contact' },
];

// Academic Levels
export const ACADEMIC_LEVELS = [
    { id: 'kindergarten', name: 'Kindergarten', grades: ['Pre-School', 'LKG', 'UKG'] },
    { id: 'primary', name: 'Primary', grades: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'] },
    { id: 'middle', name: 'Middle School', grades: ['Grade 6', 'Grade 7', 'Grade 8'] },
    { id: 'secondary', name: 'Secondary', grades: ['Grade 9', 'Grade 10'] },
    { id: 'plus-two-science', name: 'NEB +2 Science', grades: ['Grade 11', 'Grade 12'] },
    { id: 'plus-two-management', name: 'NEB +2 Management', grades: ['Grade 11', 'Grade 12'] },
];

// Social Media Links
export const SOCIAL_LINKS = {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/',
    tiktok: 'https://tiktok.com/',
    twitter: 'https://x.com/',
};

// Contact Information
export const CONTACT_INFO = {
    address: 'Kathmandu, Nepal',
    phone: '+977-1-1234567',
    email: 'info@svischool.edu.np',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0123456789!2d85.3240!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzAyLjAiTiA4NcKwMTknMjYuNCJF!5e0!3m2!1sen!2snp!4v1234567890',
};

// Gallery Categories
export const GALLERY_CATEGORIES = [
    'All',
    'Events',
    'Sports',
    'Academics',
    'Celebrations',
    'Field Trips',
    'Competitions',
];

// Blog Categories
export const BLOG_CATEGORIES = [
    'All',
    'News',
    'Events',
    'Achievements',
    'Announcements',
    'Academic',
];
