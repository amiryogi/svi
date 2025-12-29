/**
 * Seed Navigation Script
 * Populates the navigation menu with default static links
 */

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Navigation = require('../models/Navigation');

dotenv.config();

const navItems = [
    { id: 'nav-home', label: 'Home', type: 'link', url: '/', children: [] },
    { id: 'nav-about', label: 'About Us', type: 'link', url: '/about', children: [] },
    { id: 'nav-academics', label: 'Academics', type: 'link', url: '/academics', children: [] },
    { id: 'nav-admissions', label: 'Admissions', type: 'link', url: '/admissions', children: [] },
    { id: 'nav-blog', label: 'Blog', type: 'link', url: '/blog', children: [] },
    { id: 'nav-gallery', label: 'Gallery', type: 'link', url: '/gallery', children: [] },
    { id: 'nav-faculty', label: 'Faculty', type: 'link', url: '/faculty', children: [] },
    { id: 'nav-contact', label: 'Contact', type: 'link', url: '/contact', children: [] },
];

const seedNavigation = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Delete existing main navigation
        await Navigation.deleteOne({ isMain: true });
        console.log('Cleared existing navigation');

        // Create new navigation with default items
        const navigation = await Navigation.create({
            items: navItems,
            isMain: true
        });

        console.log('Navigation seeded successfully!');
        console.log('Items added:', navigation.items.map(i => i.label).join(', '));

        await mongoose.disconnect();
        console.log('Done!');
        process.exit(0);
    } catch (error) {
        console.error('Seed failed:', error);
        process.exit(1);
    }
};

seedNavigation();
