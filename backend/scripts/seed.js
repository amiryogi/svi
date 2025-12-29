/**
 * Database seeder script
 * Creates initial admin user and sample data
 * 
 * Run with: npm run seed
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config();

// Import models
const User = require('../models/User');
const Program = require('../models/Program');
const Notice = require('../models/Notice');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected for seeding...');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

const seedAdmin = async () => {
    try {
        // Check if admin exists
        const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });

        if (adminExists) {
            console.log('Admin user already exists');
            return adminExists;
        }

        // Create admin
        const admin = await User.create({
            name: 'Admin',
            email: process.env.ADMIN_EMAIL || 'admin@svischool.edu.np',
            password: process.env.ADMIN_PASSWORD || 'Admin@123',
            role: 'Admin',
        });

        console.log('Admin user created:', admin.email);
        return admin;
    } catch (error) {
        console.error('Error seeding admin:', error.message);
        throw error;
    }
};

const seedPrograms = async () => {
    try {
        const count = await Program.countDocuments();
        if (count > 0) {
            console.log('Programs already exist');
            return;
        }

        const programs = [
            {
                name: 'Kindergarten',
                subtitle: 'Pre-School to UKG',
                description: 'Play-based learning for early childhood development with focus on motor skills, socialization, and foundational literacy.',
                level: 'KG',
                subjects: ['English', 'Nepali', 'Mathematics', 'Art & Craft', 'Music', 'Physical Education'],
                features: ['Play-based learning', 'Small class sizes', 'Montessori approach', 'Safe environment'],
                order: 1,
                active: true,
            },
            {
                name: 'Primary Level',
                subtitle: 'Grade 1-5',
                description: 'Building strong academic foundations with emphasis on reading, writing, and mathematics.',
                level: 'Primary',
                subjects: ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Computer', 'Art'],
                features: ['Activity-based learning', 'Regular assessments', 'Parent-teacher meetings'],
                order: 2,
                active: true,
            },
            {
                name: 'Middle School',
                subtitle: 'Grade 6-8',
                description: 'Transitioning to advanced concepts with emphasis on critical thinking and practical skills.',
                level: 'Middle',
                subjects: ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Computer', 'Opt. Math', 'Health'],
                features: ['Lab sessions', 'Project-based learning', 'Career guidance'],
                order: 3,
                active: true,
            },
            {
                name: 'Secondary Level',
                subtitle: 'Grade 9-10',
                description: 'Comprehensive SEE preparation with focus on board exam excellence.',
                level: 'Secondary',
                subjects: ['English', 'Nepali', 'Compulsory Math', 'Science', 'Social Studies', 'Opt. Math', 'Computer', 'Account'],
                features: ['SEE preparation', 'Mock exams', 'Extra classes', 'Career counseling'],
                order: 4,
                active: true,
            },
            {
                name: 'NEB +2 Science',
                subtitle: 'Grade 11-12 Science',
                description: 'NEB Science stream with Physics, Chemistry, and Biology/Mathematics for aspiring engineers and doctors.',
                level: 'NEB',
                stream: 'Science',
                subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English', 'Nepali'],
                features: ['Modern labs', 'Entrance preparation', 'Research projects'],
                order: 5,
                active: true,
            },
            {
                name: 'NEB +2 Management',
                subtitle: 'Grade 11-12 Management',
                description: 'NEB Management stream with Business Studies, Accountancy, and Economics for future business leaders.',
                level: 'NEB',
                stream: 'Management',
                subjects: ['Accountancy', 'Business Studies', 'Economics', 'English', 'Nepali', 'Computer'],
                features: ['Industry visits', 'Business simulations', 'Internship opportunities'],
                order: 6,
                active: true,
            },
        ];

        await Program.insertMany(programs);
        console.log('Programs seeded successfully');
    } catch (error) {
        console.error('Error seeding programs:', error.message);
        throw error;
    }
};

const seedNotices = async () => {
    try {
        const count = await Notice.countDocuments();
        if (count > 0) {
            console.log('Notices already exist');
            return;
        }

        const notices = [
            {
                title: 'Admission Open for 2081 BS',
                content: 'Applications are now being accepted for the academic year 2081 BS. Apply online or visit our office for more information.',
                type: 'Admission',
                active: true,
            },
            {
                title: 'Winter Break Notice',
                content: 'School will remain closed from Poush 15 to Magh 1 for winter vacation. Classes resume on Magh 2.',
                type: 'Holiday',
                active: true,
            },
            {
                title: 'Parent-Teacher Meeting',
                content: 'PTM scheduled for next Saturday. All parents are requested to attend to discuss their child\'s progress.',
                type: 'Meeting',
                active: true,
            },
        ];

        await Notice.insertMany(notices);
        console.log('Notices seeded successfully');
    } catch (error) {
        console.error('Error seeding notices:', error.message);
        throw error;
    }
};

const runSeeder = async () => {
    await connectDB();

    console.log('Starting database seeding...\n');

    await seedAdmin();
    await seedPrograms();
    await seedNotices();

    console.log('\nSeeding completed!');
    console.log('Admin login: admin@svischool.edu.np / Admin@123');

    process.exit(0);
};

runSeeder().catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
});
