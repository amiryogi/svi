// Format date to readable string
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// Format date for Nepali locale
export const formatDateNepali = (date) => {
    return new Date(date).toLocaleDateString('ne-NP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
};

// Generate slug from string
export const generateSlug = (text) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

// Extract YouTube video ID
export const getYouTubeId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url?.match(regex);
    return match ? match[1] : null;
};

// Get YouTube thumbnail
export const getYouTubeThumbnail = (url) => {
    const videoId = getYouTubeId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
};

// Check if URL is YouTube
export const isYouTubeUrl = (url) => {
    return url?.includes('youtube.com') || url?.includes('youtu.be');
};

// Generate social share URLs
export const getSocialShareUrl = (platform, url, title) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    };

    return shareUrls[platform] || '#';
};

// Validate email
export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Validate phone (Nepal)
export const isValidPhone = (phone) => {
    const regex = /^(\+977)?[0-9]{10}$/;
    return regex.test(phone.replace(/[-\s]/g, ''));
};

// Capitalize first letter
export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Get initials from name
export const getInitials = (name) => {
    if (!name) return '';
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

// Debounce function
export const debounce = (func, wait = 300) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};
