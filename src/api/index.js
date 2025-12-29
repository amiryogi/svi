import api from './axios';

export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    logout: () => api.post('/auth/logout'),
    getProfile: () => api.get('/auth/me'),
};

export const heroAPI = {
    get: () => api.get('/hero'),
    update: (formData) => api.put('/hero', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export const noticesAPI = {
    getAll: (params) => api.get('/notices', { params }),
    getById: (id) => api.get(`/notices/${id}`),
    create: (data) => api.post('/notices', data),
    update: (id, data) => api.put(`/notices/${id}`, data),
    delete: (id) => api.delete(`/notices/${id}`),
};

export const academicsAPI = {
    getAll: () => api.get('/programs'),
    getById: (id) => api.get(`/programs/${id}`),
    create: (formData) => api.post('/programs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    update: (id, formData) => api.put(`/programs/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    delete: (id) => api.delete(`/programs/${id}`),
};

export const blogAPI = {
    getAll: (params) => api.get('/blogs', { params }),
    getBySlug: (slug) => api.get(`/blogs/${slug}`),
    getFeatured: () => api.get('/blogs/featured'),
    create: (formData) => api.post('/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    update: (id, formData) => api.put(`/blogs/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    delete: (id) => api.delete(`/blogs/${id}`),
};

export const galleryAPI = {
    getAll: (params) => api.get('/gallery', { params }),
    getCategories: () => api.get('/gallery/categories'),
    create: (formData) => api.post('/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    update: (id, data) => api.put(`/gallery/${id}`, data),
    delete: (id) => api.delete(`/gallery/${id}`),
};

export const teachersAPI = {
    getAll: (params) => api.get('/teachers', { params }),
    getById: (id) => api.get(`/teachers/${id}`),
    create: (formData) => api.post('/teachers', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    update: (id, formData) => api.put(`/teachers/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    delete: (id) => api.delete(`/teachers/${id}`),
};

export const inquiriesAPI = {
    getAll: (params) => api.get('/inquiries', { params }),
    getById: (id) => api.get(`/inquiries/${id}`),
    submit: (data) => api.post('/inquiries', data),
    updateStatus: (id, status) => api.patch(`/inquiries/${id}/status`, { status }),
    delete: (id) => api.delete(`/inquiries/${id}`),
};

export const messagesAPI = {
    getAll: (params) => api.get('/messages', { params }),
    getById: (id) => api.get(`/messages/${id}`),
    submit: (data) => api.post('/messages', data),
    markRead: (id) => api.patch(`/messages/${id}/read`),
    delete: (id) => api.delete(`/messages/${id}`),
};

export const statsAPI = {
    getDashboard: () => api.get('/stats/dashboard'),
};
