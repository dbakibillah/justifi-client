import React, { useState, useEffect } from 'react';
import { 
    FaCalendarAlt, 
    FaCheckCircle, 
    FaClock, 
    FaFilter, 
    FaSearch, 
    FaArrowRight,
    FaVideo,
    FaMapMarkerAlt
} from 'react-icons/fa';

const UpcomingHearings = () => {
    const [hearings] = useState([
        {
            id: 'HRG-001',
            caseId: 'ARB-001',
            caseTitle: 'Commercial Contract Dispute',
            date: '2024-12-15',
            time: '10:00 AM',
            duration: '2 hours',
            type: 'virtual',
            location: 'Zoom Meeting',
            status: 'scheduled',
            participants: ['plaintiff1@email.com', 'defendant1@email.com', 'arbitrator2@email.com'],
            agenda: 'Preliminary hearing and document review'
        },
        {
            id: 'HRG-002',
            caseId: 'ARB-002',
            caseTitle: 'Property Ownership Conflict',
            date: '2024-12-20',
            time: '2:30 PM',
            duration: '3 hours',
            type: 'physical',
            location: 'ADR Center, Room 301',
            status: 'scheduled',
            participants: ['plaintiff2@email.com', 'defendant2@email.com', 'arbitrator4@email.com'],
            agenda: 'Witness testimony and evidence presentation'
        },
        {
            id: 'HRG-003',
            caseId: 'ARB-004',
            caseTitle: 'Employment Termination Dispute',
            date: '2024-12-18',
            time: '11:00 AM',
            duration: '1.5 hours',
            type: 'virtual',
            location: 'Microsoft Teams',
            status: 'scheduled',
            participants: ['plaintiff4@email.com', 'defendant4@email.com', 'arbitrator7@email.com'],
            agenda: 'Settlement discussion and mediation'
        },
        {
            id: 'HRG-004',
            caseId: 'ARB-005',
            caseTitle: 'Intellectual Property Rights',
            date: '2024-12-25',
            time: '9:00 AM',
            duration: '4 hours',
            type: 'hybrid',
            location: 'Court Room B + Video Conference',
            status: 'scheduled',
            participants: ['plaintiff5@email.com', 'defendant5@email.com', 'arbitrator9@email.com'],
            agenda: 'Expert witness cross-examination'
        },
        {
            id: 'HRG-005',
            caseId: 'ARB-003',
            caseTitle: 'Business Partnership Dissolution',
            date: '2024-12-22',
            time: '3:00 PM',
            duration: '2 hours',
            type: 'physical',
            location: 'Arbitration Chamber, Floor 5',
            status: 'rescheduled',
            participants: ['plaintiff3@email.com', 'defendant3@email.com', 'arbitrator6@email.com'],
            agenda: 'Final arguments and closing statements'
        },
        {
            id: 'HRG-006',
            caseId: 'ARB-006',
            caseTitle: 'Construction Contract Breach',
            date: '2024-12-28',
            time: '1:00 PM',
            duration: '2.5 hours',
            type: 'virtual',
            location: 'Google Meet',
            status: 'tentative',
            participants: ['plaintiff6@email.com', 'defendant6@email.com', 'arbitrator11@email.com'],
            agenda: 'Site inspection report discussion'
        }
    ]);

    const [currentFilter, setCurrentFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredHearings, setFilteredHearings] = useState([]);

    useEffect(() => {
        filterHearings();
    }, [currentFilter, searchTerm, hearings]);

    const filterHearings = () => {
        let filtered = hearings.filter(hearing => {
            const matchesFilter = currentFilter === 'all' || 
                (currentFilter === 'thisWeek' && isThisWeek(hearing.date)) ||
                (currentFilter === 'upcoming' && isUpcoming(hearing.date));
            
            const matchesSearch = 
                hearing.caseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hearing.agenda.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hearing.caseId.toLowerCase().includes(searchTerm.toLowerCase());
            
            return matchesFilter && matchesSearch;
        });

        // Sort by date (soonest first)
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        setFilteredHearings(filtered);
    };

    const isThisWeek = (date) => {
        const hearingDate = new Date(date);
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        return hearingDate >= today && hearingDate <= nextWeek;
    };

    const isUpcoming = (date) => {
        const hearingDate = new Date(date);
        const today = new Date();
        const threeDaysFromNow = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
        return hearingDate >= today && hearingDate <= threeDaysFromNow;
    };

    const handleFilterChange = (filter) => {
        setCurrentFilter(filter);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const getLocationIcon = (type) => {
        return type === 'virtual' || type === 'hybrid' ? <FaVideo className="text-blue-500" /> : <FaMapMarkerAlt className="text-green-500" />;
    };

    const getLocationText = (hearing) => {
        if (hearing.type === 'virtual') return 'Zoom Meeting';
        if (hearing.type === 'hybrid') return 'Hybrid Meeting';
        return hearing.location.split(',')[0]; // Just show the first part of physical location
    };

    const FilterButton = ({ filter, label, isActive, onClick }) => {
        const baseClasses = "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer";
        const activeClasses = "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg";
        const inactiveClasses = "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-md";

        return (
            <button
                className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                onClick={() => onClick(filter)}
            >
                {isActive && <FaCheckCircle className="text-sm" />}
                {label}
            </button>
        );
    };

    const HearingCard = ({ hearing }) => {
        const locationIcon = getLocationIcon(hearing.type);
        const locationText = getLocationText(hearing);

        return (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group">
                <div className="p-4">
                    {/* Case Title */}
                    <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {hearing.caseTitle}
                    </h3>

                    {/* Date and Time */}
                    <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaCalendarAlt className="text-blue-500" />
                            <span className="font-medium">{new Date(hearing.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaClock className="text-green-500" />
                            <span className="font-medium">{hearing.time}</span>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        {locationIcon}
                        <span>{locationText}</span>
                    </div>

                    {/* View Details Button */}
                    <div className="flex justify-end pt-3 border-t border-gray-100">
                        <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors group-hover:translate-x-1 duration-300">
                            View Details
                            <FaArrowRight className="ml-1 text-xs" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-6">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-4">
                        <FaCalendarAlt className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-medium text-gray-600">
                            Hearings Schedule
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Upcoming Hearings
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                        Manage your arbitration hearing schedule
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                            {/* Status Filter */}
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FaFilter className="text-blue-600 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Filter Hearings
                                    </label>
                                    <div className="flex flex-wrap gap-1">
                                        <FilterButton
                                            filter="all"
                                            label="All"
                                            isActive={currentFilter === 'all'}
                                            onClick={handleFilterChange}
                                        />
                                        <FilterButton
                                            filter="thisWeek"
                                            label="This Week"
                                            isActive={currentFilter === 'thisWeek'}
                                            onClick={handleFilterChange}
                                        />
                                        <FilterButton
                                            filter="upcoming"
                                            label="Upcoming"
                                            isActive={currentFilter === 'upcoming'}
                                            onClick={handleFilterChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <FaSearch className="text-green-600 text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Search
                                </label>
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                                    <input
                                        type="text"
                                        placeholder="Search hearings..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full lg:w-64 bg-white shadow-sm text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hearings Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredHearings.map(hearing => (
                        <HearingCard key={hearing.id} hearing={hearing} />
                    ))}
                </div>

                {/* Empty State */}
                {filteredHearings.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FaCalendarAlt className="text-2xl text-blue-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            No Hearings Found
                        </h3>
                        <p className="text-gray-600 text-sm max-w-md mx-auto">
                            {currentFilter !== 'all' || searchTerm
                                ? "No hearings match your search. Try adjusting filters."
                                : "No upcoming hearings scheduled."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpcomingHearings;