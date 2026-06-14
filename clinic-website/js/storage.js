/**
 * Modern Clinic Website - Storage Utility
 * Handles Local Storage CRUD and Initial Seed Data
 */

const STORAGE_KEYS = {
    APPOINTMENTS: 'clinic_appointments',
    DOCTORS: 'clinic_doctors',
    SERVICES: 'clinic_services',
    NEWS: 'clinic_news'
};

const INITIAL_DATA = {
    doctors: [
        { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Pediatrics', experience: '12 Years', image: 'images/doctors/doc1.jpg', schedule: 'Mon-Fri: 9am-5pm' },
        { id: 2, name: 'Dr. Michael Chen', specialty: 'Internal Medicine', experience: '15 Years', image: 'images/doctors/doc2.jpg', schedule: 'Tue-Sat: 10am-6pm' },
        { id: 3, name: 'Dr. Emily Williams', specialty: 'Dental Care', experience: '8 Years', image: 'images/doctors/doc3.jpg', schedule: 'Mon-Thu: 8am-4pm' }
    ],
    services: [
        { id: 1, name: 'General Consultation', description: 'Comprehensive health checkups for all ages.', fee: '$50', image: 'images/services/general.jpg' },
        { id: 2, name: 'Pediatrics', description: 'Specialized care for infants, children, and adolescents.', fee: '$60', image: 'images/services/pediatrics.jpg' },
        { id: 3, name: 'Dental Care', description: 'Expert dental treatments and oral hygiene services.', fee: '$80', image: 'images/services/dental.jpg' },
        { id: 4, name: 'Laboratory', description: 'Fast and accurate diagnostic testing services.', fee: 'Varies', image: 'images/services/lab.jpg' }
    ],
    news: [
        { id: 1, title: 'New Vaccination Drive', category: 'Health', date: '2026-06-10', content: 'We are starting a new vaccination drive for the flu season next week.' },
        { id: 2, title: 'Holiday Hours Update', category: 'Announcement', date: '2026-06-12', content: 'Please note our adjusted hours for the upcoming public holiday.' }
    ]
};

// Initialize Data if not exists
function initStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.DOCTORS)) {
        localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(INITIAL_DATA.doctors));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
        localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(INITIAL_DATA.services));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NEWS)) {
        localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(INITIAL_DATA.news));
    }
    if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify([]));
    }
}

// CRUD Utilities
const Storage = {
    get: (key) => JSON.parse(localStorage.getItem(key)) || [],
    
    save: (key, data) => {
        const current = Storage.get(key);
        const newData = [...current, { ...data, id: Date.now() }];
        localStorage.setItem(key, JSON.stringify(newData));
        return newData;
    },
    
    update: (key, id, updatedData) => {
        const current = Storage.get(key);
        const index = current.findIndex(item => item.id === id);
        if (index !== -1) {
            current[index] = { ...current[index], ...updatedData };
            localStorage.setItem(key, JSON.stringify(current));
        }
        return current;
    },
    
    delete: (key, id) => {
        const current = Storage.get(key);
        const filtered = current.filter(item => item.id !== id);
        localStorage.setItem(key, JSON.stringify(filtered));
        return filtered;
    }
};

initStorage();
