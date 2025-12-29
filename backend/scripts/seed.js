/**
 * Database seeder script
 * 
 * Usage:
 * Import data:  node scripts/seed.js
 * Destroy data: node scripts/seed.js -d
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs'); // Needed if we manually hash, but User model handles it

// Load env vars
dotenv.config();

// Import models
const User = require('../models/User');
const Program = require('../models/Program');
const Notice = require('../models/Notice');
const Blog = require('../models/Blog');
const Teacher = require('../models/Teacher');
const Gallery = require('../models/Gallery');
const Hero = require('../models/Hero');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected for seeding...');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

// --- DATA ---

const users = [
    {
        name: 'Admin User',
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'Admin'
    }
];

const programs = [
    {
        name: 'Kindergarten',
        subtitle: 'Pre-School to UKG',
        description: 'Play-based learning for early childhood development.',
        level: 'KG',
        subjects: ['English', 'Nepali', 'Math', 'Arts'],
        order: 1
    },
    {
        name: 'Primary Level',
        subtitle: 'Grade 1-5',
        description: 'Foundational education with focus on holistic development.',
        level: 'Primary',
        subjects: ['English', 'Nepali', 'Math', 'Science', 'Social'],
        order: 2
    },
    {
        name: 'Secondary Level',
        subtitle: 'Grade 6-10',
        description: 'Preparing students for SEE and future challenges.',
        level: 'Secondary',
        subjects: ['English', 'Nepali', 'Math', 'Science', 'Social', 'EPH', 'Computer', 'Account'],
        order: 3
    },
    {
        name: 'NEB +2 Science',
        subtitle: 'Grade 11-12',
        description: 'Excellence in Science education.',
        level: 'NEB',
        stream: 'Science',
        subjects: ['Physics', 'Chemistry', 'Biology/Math', 'English', 'Nepali'],
        order: 4
    },
    {
        name: 'NEB +2 Management',
        subtitle: 'Grade 11-12',
        description: 'Developing future business leaders.',
        level: 'NEB',
        stream: 'Management',
        subjects: ['Account', 'Economics', 'Business Studies', 'English', 'Nepali'],
        order: 5
    }
];

const notices = [
    {
        title: 'Admission Open 2081',
        content: 'Admission is open for all grades. Visit administration for details.',
        type: 'Admission',
        active: true
    },
    {
        title: 'Winter Vacation',
        content: 'School will remain closed for winter vacation from Poush 15.',
        type: 'Holiday',
        active: true
    }
];

const teachers = [
    {
        name: 'Ram Sharma',
        position: 'Principal',
        department: 'Administration',
        email: 'principal@svi.edu.np',
        qualification: 'M.Ed, M.Phil',
        bio: 'Over 20 years of experience in educational leadership.',
        order: 1,
        featured: true
    },
    {
        name: 'Sita Gurung',
        position: 'Senior Science Teacher',
        department: 'Science',
        qualification: 'M.Sc Physics',
        bio: 'Dedicated to making physics understandable and fun.',
        order: 2,
        featured: true
    },
    {
        name: 'Hari Thapa',
        position: 'Math Coordinator',
        department: 'Mathematics',
        qualification: 'M.Sc Mathematics',
        bio: 'Expert in competitive mathematics coaching.',
        order: 3
    }
];

const blogs = [
    {
        title: 'Annual Sports Day 2080',
        content: '<p>The annual sports day was held with great enthusiasm. Students participated in various events including track and field, volleyball, and football. The Red House won the overall trophy.</p>',
        excerpt: 'Highlights from our Annual Sports Day execution.',
        category: 'Events',
        status: 'published',
        featured: true,
        image: {
            url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop',
            cloudinaryId: 'seed_sports_day'
        }
    },
    {
        title: 'Science Exhibition Success',
        content: '<p>Our students showcased brilliant projects at the district level Science Exhibition. Three projects were selected for the national level.</p>',
        category: 'Academic',
        status: 'published',
        featured: true,
        image: {
            url: 'https://images.unsplash.com/photo-1564325724739-bae0bd08762c?w=800&auto=format&fit=crop',
            cloudinaryId: 'seed_science_exhibition'
        }
    },
    {
        title: 'Holistic Education at SVI',
        content: '<p>At SVI, we believe in education that goes beyond textbooks. We focus on character building, life skills, and emotional intelligence.</p>',
        category: 'News',
        status: 'published',
        featured: false,
        image: {
            url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop',
            cloudinaryId: 'seed_holistic'
        }
    }
];

const gallery = [
    {
        title: 'Cultural Program',
        type: 'image',
        category: 'Events',
        media: {
            url: 'https://images.unsplash.com/photo-1514525253440-b393452de23e?w=800&auto=format&fit=crop',
            cloudinaryId: 'seed_cultural'
        }
    },
    {
        title: 'Classroom Activities',
        type: 'image',
        category: 'Academics',
        media: {
            url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop',
            cloudinaryId: 'seed_classroom'
        }
    }
];

const heroes = [
    {
        video: {
            url: 'https://res.cloudinary.com/demo/video/upload/v1687514917/samples/sea-turtle.mp4',
            cloudinaryId: 'seed_hero_video_1',
            thumbnail: 'https://res.cloudinary.com/demo/video/upload/v1687514917/samples/sea-turtle.jpg'
        },
        overlayTitle: 'Welcome to SVI School',
        overlaySubtitle: 'Excellence in Education',
        active: true,
        // Remove order if not in schema, but schema doesn't seem to have order?
        // Checked schema: No 'order' field.
    }
];

// --- LOGIC ---

const importData = async () => {
    try {
        console.log('Starting data import...');

        // Create Admin (Check if exists first to avoid duplicates if not destroying)
        const adminExists = await User.findOne({ email: users[0].email });
        if (!adminExists) {
            await User.create(users[0]);
            console.log('User created');
        } else {
            console.log('User already exists (skipped)');
        }

        // We can just insertMany for others, but let's clear them first implicitly if we want "fresh" or check.
        // For simplicity in this "recreate" request, I will strictly follow import vs destroy or just append?
        // Usually seeders might duplicate if run twice without destroy. 
        // I will check for existence or just rely on destroy being run first if user wants clean.
        // But to be safe, let's use check-or-create loop or just insertMany and catch dup errors?
        // safest is deleteMany inside import? No, that's what -d is for.
        // I'll just do insertMany. If run twice, it might error on uniques or create dupes.
        
        // Programs (check count)
        if (await Program.countDocuments() === 0) {
            await Program.insertMany(programs);
            console.log('Programs imported');
        }

        // Notices
         if (await Notice.countDocuments() === 0) {
            await Notice.insertMany(notices);
            console.log('Notices imported');
        }

        // Blogs
        // Need to attach author (admin) to blogs
        const admin = await User.findOne({ role: 'Admin' });
        if (admin) {
            const blogsWithAuthor = blogs.map(b => ({ ...b, author: admin._id }));
             if (await Blog.countDocuments() === 0) {
                console.log('Seeding blogs...');
                for (const blog of blogsWithAuthor) {
                    await Blog.create(blog);
                }
                console.log('Blogs imported');
             }
        }

        // Teachers
         if (await Teacher.countDocuments() === 0) {
            await Teacher.insertMany(teachers);
            console.log('Teachers imported');
        }

        // Gallery
         if (await Gallery.countDocuments() === 0) {
            await Gallery.insertMany(gallery);
            console.log('Gallery imported');
        }
        
        // Hero
         if (await Hero.countDocuments() === 0) {
            await Hero.insertMany(heroes);
            console.log('Hero content imported');
        }

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error('Seeding Error Details:', error);
        require('fs').writeFileSync('seed_error.txt', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Program.deleteMany();
        await Notice.deleteMany();
        await Blog.deleteMany();
        await Teacher.deleteMany();
        await Gallery.deleteMany();
        await Hero.deleteMany();
        // Also clear Inquiries/Messages if any?
        // await Inquiry.deleteMany(); 
        // await Message.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const run = async () => {
    await connectDB();
    if (process.argv[2] === '-d') {
        await destroyData();
    } else {
        await importData();
    }
};

run();
