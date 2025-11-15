import React, { useState } from 'react';
import { 
    FaArrowLeft, 
    FaCalendarAlt, 
    FaClock, 
    FaVideo, 
    FaUserTie, 
    FaUserShield,
    FaFileAlt,
    FaEdit,
    FaCheckCircle,
    FaTimes,
    FaUsers,
    FaDownload,
    FaPlay,
    FaPlus,
    FaComment,
    FaStickyNote,
    FaCalendarCheck,
    FaExclamationTriangle,
    FaEye,
    FaSave
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../common/loading/Loading';

const HearingDetails = () => {
    const navigate = useNavigate();
    const { arbitrationId, hearingId } = useParams();
    const axiosSecure = useAxiosSecure();
    const [activeTab, setActiveTab] = useState('overview');
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [commentForm, setCommentForm] = useState({
        arbitratorRole: '',
        comment: ''
    });
    const [noteForm, setNoteForm] = useState({
        note: ''
    });

    // Fetch hearing details
    const { data: hearing, isLoading, error, refetch } = useQuery({
        queryKey: ['hearingDetails', hearingId],
        queryFn: async () => {
            const response = await axiosSecure.get(`/hearings/${hearingId}`);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            return response.data.data;
        },
        enabled: !!hearingId,
    });

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'bg-green-500 text-white';
            case 'scheduled': return 'bg-blue-500 text-white';
            case 'cancelled': return 'bg-red-500 text-white';
            case 'postponed': return 'bg-yellow-500 text-white';
            case 'ongoing': return 'bg-purple-500 text-white';
            default: return 'bg-gray-500 text-white';
        }
    };

    const getStatusText = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'Completed';
            case 'scheduled': return 'Scheduled';
            case 'cancelled': return 'Cancelled';
            case 'postponed': return 'Postponed';
            case 'ongoing': return 'In Progress';
            default: return status || 'Unknown';
        }
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return 'Not specified';
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        // Add your API call here to save comment
        console.log('Submitting comment:', commentForm);
        setShowCommentModal(false);
        setCommentForm({ arbitratorRole: '', comment: '' });
        // refetch(); // Uncomment to refresh data after submission
    };

    const handleNoteSubmit = async (e) => {
        e.preventDefault();
        // Add your API call here to save note
        console.log('Submitting note:', noteForm);
        setShowNoteModal(false);
        setNoteForm({ note: '' });
        // refetch(); // Uncomment to refresh data after submission
    };

    if (isLoading) return <Loading />;

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FaExclamationTriangle className="text-3xl text-red-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Failed to Load Hearing
                    </h2>
                    <p className="text-gray-600 mb-4">
                        {error.message || 'Unable to load hearing details.'}
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!hearing) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading hearing details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-6">
                    <button 
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors mb-4"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Arbitration
                    </button>
                    
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                            <div className="flex-1">
                                <div className="flex items-center mb-4">
                                    <span 
                                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mr-4 ${getStatusColor(hearing.status)}`}
                                    >
                                        {getStatusText(hearing.status)}
                                    </span>
                                    <span className="font-mono bg-gray-100 px-3 py-1 rounded-lg text-gray-700">
                                        {hearing.hearingId}
                                    </span>
                                </div>
                                
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    Hearing #{hearing.hearingNumber}
                                </h1>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div className="flex items-center text-gray-600">
                                        <FaCalendarAlt className="mr-3 text-blue-500" />
                                        <div>
                                            <p className="text-sm font-medium">Date & Time</p>
                                            <p className="font-semibold text-gray-900">
                                                {formatDateTime(hearing.date)}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center text-gray-600">
                                        <FaClock className="mr-3 text-green-500" />
                                        <div>
                                            <p className="text-sm font-medium">Duration</p>
                                            <p className="font-semibold text-gray-900">
                                                {hearing.duration} minutes
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center text-gray-600">
                                        <FaVideo className="mr-3 text-purple-500" />
                                        <div>
                                            <p className="text-sm font-medium">Meeting Link</p>
                                            {hearing.meetLink ? (
                                                <a 
                                                    href={hearing.meetLink} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="font-semibold text-blue-600 hover:text-blue-800"
                                                >
                                                    Join Meeting
                                                </a>
                                            ) : (
                                                <span className="text-gray-500">Not provided</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">Hearing Agenda</h3>
                                    <p className="text-gray-700">{hearing.hearingAgenda}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Section with Tabs */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            {['overview', 'notes', 'attendance'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                                        activeTab === tab
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6">
                        {/* Overview Tab - Arbitrator Comments */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold text-gray-900">Arbitrator Comments</h3>
                                    <button 
                                        onClick={() => setShowCommentModal(true)}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                    >
                                        <FaComment className="mr-2" />
                                        Add Comment
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Presiding Arbitrator Comment */}
                                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                                        <div className="flex items-center mb-4">
                                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                                <FaUserTie className="text-purple-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-purple-800">Presiding Arbitrator</h4>
                                                <p className="text-sm text-purple-600">Lead Arbitrator</p>
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 border border-purple-100">
                                            {hearing.presidingArbitratorComment ? (
                                                <p className="text-gray-700">{hearing.presidingArbitratorComment}</p>
                                            ) : (
                                                <p className="text-gray-500 italic">No comment added yet</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Arbitrator 1 Comment */}
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                        <div className="flex items-center mb-4">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                <FaUserTie className="text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-blue-800">Arbitrator 1</h4>
                                                <p className="text-sm text-blue-600">Panel Member</p>
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 border border-blue-100">
                                            {hearing.arbitrator1Comment ? (
                                                <p className="text-gray-700">{hearing.arbitrator1Comment}</p>
                                            ) : (
                                                <p className="text-gray-500 italic">No comment added yet</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Arbitrator 2 Comment */}
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                        <div className="flex items-center mb-4">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                                <FaUserTie className="text-green-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-green-800">Arbitrator 2</h4>
                                                <p className="text-sm text-green-600">Panel Member</p>
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 border border-green-100">
                                            {hearing.arbitrator2Comment ? (
                                                <p className="text-gray-700">{hearing.arbitrator2Comment}</p>
                                            ) : (
                                                <p className="text-gray-500 italic">No comment added yet</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-blue-600 mb-1">
                                            #{hearing.hearingNumber}
                                        </div>
                                        <div className="text-sm text-gray-600">Hearing Number</div>
                                    </div>
                                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-green-600 mb-1">
                                            {hearing.duration}
                                        </div>
                                        <div className="text-sm text-gray-600">Duration (min)</div>
                                    </div>
                                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-purple-600 mb-1">
                                            {hearing.attendance?.plaintiffs?.length || 0}
                                        </div>
                                        <div className="text-sm text-gray-600">Plaintiffs Present</div>
                                    </div>
                                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-red-600 mb-1">
                                            {hearing.attendance?.defendants?.length || 0}
                                        </div>
                                        <div className="text-sm text-gray-600">Defendants Present</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notes Tab - Private Notes */}
                        {activeTab === 'notes' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold text-gray-900">Private Notes</h3>
                                    <button 
                                        onClick={() => setShowNoteModal(true)}
                                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                    >
                                        <FaStickyNote className="mr-2" />
                                        Add Note
                                    </button>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                                    <div className="flex items-center mb-4">
                                        <FaStickyNote className="text-yellow-600 mr-3 text-xl" />
                                        <h4 className="font-semibold text-yellow-800">Private Notes Section</h4>
                                    </div>
                                    
                                    {hearing.privateNotes ? (
                                        <div className="bg-white rounded-lg p-4 border border-yellow-100">
                                            <p className="text-gray-700 whitespace-pre-wrap">{hearing.privateNotes}</p>
                                            <div className="mt-3 pt-3 border-t border-gray-200 flex justify-end">
                                                <button className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                    <FaEdit className="mr-1" />
                                                    Edit Note
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <FaStickyNote className="text-4xl mx-auto mb-2 text-gray-300" />
                                            <p className="text-lg font-medium mb-2">No Private Notes</p>
                                            <p className="text-sm">Add private notes for internal reference and documentation.</p>
                                        </div>
                                    )}
                                </div>

                                {/* Notes Information */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-start">
                                        <FaEye className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-blue-800 mb-1">Private Notes Information</h4>
                                            <p className="text-blue-700 text-sm">
                                                Private notes are only visible to arbitrators and administrators. 
                                                Use this section for internal observations, reminders, or sensitive information 
                                                that should not be shared with the parties.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Attendance Tab */}
                        {activeTab === 'attendance' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold text-gray-900">Attendance Records</h3>
                                    <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                                        <FaCalendarCheck className="mr-2" />
                                        Update Attendance
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Arbitrator Attendance */}
                                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                            <FaUserTie className="mr-2 text-blue-500" />
                                            Arbitrator Attendance
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <span className="text-gray-700 font-medium">Presiding Arbitrator</span>
                                                <div className="flex items-center">
                                                    {hearing.attendance?.presidingArbitrator ? (
                                                        <>
                                                            <FaCheckCircle className="text-green-500 mr-2" />
                                                            <span className="text-green-600 font-medium">Present</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaTimes className="text-red-500 mr-2" />
                                                            <span className="text-red-600 font-medium">Absent</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <span className="text-gray-700 font-medium">Arbitrator 1</span>
                                                <div className="flex items-center">
                                                    {hearing.attendance?.arbitrator1 ? (
                                                        <>
                                                            <FaCheckCircle className="text-green-500 mr-2" />
                                                            <span className="text-green-600 font-medium">Present</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaTimes className="text-red-500 mr-2" />
                                                            <span className="text-red-600 font-medium">Absent</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <span className="text-gray-700 font-medium">Arbitrator 2</span>
                                                <div className="flex items-center">
                                                    {hearing.attendance?.arbitrator2 ? (
                                                        <>
                                                            <FaCheckCircle className="text-green-500 mr-2" />
                                                            <span className="text-green-600 font-medium">Present</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaTimes className="text-red-500 mr-2" />
                                                            <span className="text-red-600 font-medium">Absent</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Parties Attendance */}
                                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                            <FaUsers className="mr-2 text-green-500" />
                                            Parties Attendance
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                                                    <FaUserTie className="mr-2 text-blue-400" />
                                                    Plaintiffs Present ({hearing.attendance?.plaintiffs?.length || 0})
                                                </h4>
                                                {hearing.attendance?.plaintiffs && hearing.attendance.plaintiffs.length > 0 ? (
                                                    <div className="space-y-2">
                                                        {hearing.attendance.plaintiffs.map((plaintiff, index) => (
                                                            <div key={index} className="flex items-center p-2 bg-green-50 rounded border border-green-200">
                                                                <FaCheckCircle className="text-green-500 mr-2 text-sm" />
                                                                <span className="text-sm text-gray-700">{plaintiff}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded border border-gray-200">
                                                        No plaintiffs marked present
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                                                    <FaUserShield className="mr-2 text-red-400" />
                                                    Defendants Present ({hearing.attendance?.defendants?.length || 0})
                                                </h4>
                                                {hearing.attendance?.defendants && hearing.attendance.defendants.length > 0 ? (
                                                    <div className="space-y-2">
                                                        {hearing.attendance.defendants.map((defendant, index) => (
                                                            <div key={index} className="flex items-center p-2 bg-green-50 rounded border border-green-200">
                                                                <FaCheckCircle className="text-green-500 mr-2 text-sm" />
                                                                <span className="text-sm text-gray-700">{defendant}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded border border-gray-200">
                                                        No defendants marked present
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Attendance Summary */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <FaCalendarCheck className="text-blue-500 mr-3 text-xl" />
                                        <div>
                                            <h4 className="font-semibold text-blue-800">Attendance Summary</h4>
                                            <p className="text-blue-700 text-sm">
                                                Total participants present: {
                                                    (hearing.attendance?.presidingArbitrator ? 1 : 0) +
                                                    (hearing.attendance?.arbitrator1 ? 1 : 0) +
                                                    (hearing.attendance?.arbitrator2 ? 1 : 0) +
                                                    (hearing.attendance?.plaintiffs?.length || 0) +
                                                    (hearing.attendance?.defendants?.length || 0)
                                                } out of {
                                                    3 + (hearing.attendance?.plaintiffs?.length || 0) + (hearing.attendance?.defendants?.length || 0)
                                                } expected participants
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Comment Modal */}
                {showCommentModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl max-w-md w-full p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Add Arbitrator Comment</h3>
                            <form onSubmit={handleCommentSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Arbitrator Role
                                    </label>
                                    <select 
                                        value={commentForm.arbitratorRole}
                                        onChange={(e) => setCommentForm(prev => ({...prev, arbitratorRole: e.target.value}))}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Choose role...</option>
                                        <option value="presiding">Presiding Arbitrator</option>
                                        <option value="arbitrator1">Arbitrator 1</option>
                                        <option value="arbitrator2">Arbitrator 2</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Comment
                                    </label>
                                    <textarea 
                                        value={commentForm.comment}
                                        onChange={(e) => setCommentForm(prev => ({...prev, comment: e.target.value}))}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        rows="4"
                                        placeholder="Enter your comment here..."
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button 
                                        type="button"
                                        onClick={() => setShowCommentModal(false)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        <FaSave className="mr-2" />
                                        Save Comment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Note Modal */}
                {showNoteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl max-w-md w-full p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Add Private Note</h3>
                            <form onSubmit={handleNoteSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Private Note
                                    </label>
                                    <textarea 
                                        value={noteForm.note}
                                        onChange={(e) => setNoteForm(prev => ({...prev, note: e.target.value}))}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        rows="6"
                                        placeholder="Enter your private notes here. These notes are only visible to arbitrators and administrators."
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button 
                                        type="button"
                                        onClick={() => setShowNoteModal(false)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                    >
                                        <FaSave className="mr-2" />
                                        Save Note
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HearingDetails;