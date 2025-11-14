import React, { useState, useEffect } from 'react';
import { 
    FaMoneyBillWave, 
    FaSearch,
    FaChevronLeft,
    FaChevronRight,
    FaPlus,
    FaCreditCard,
    FaUser,
    FaMobileAlt,
    FaTimes
} from 'react-icons/fa';

const Finance = () => {
    const [cards, setCards] = useState([
        {
            id: 'CARD-001',
            cardName: 'Main Card',
            cardNumber: '1234 5678 9012 3456',
            bankName: 'Bank XKDX',
            cardHolder: 'Bittu ✅',
            validThru: '04/26'
        },
        {
            id: 'CARD-002',
            cardName: 'Secondary Card',
            cardNumber: '9876 5432 1098 7654',
            bankName: 'Bank ABC',
            cardHolder: 'Bittu ✅',
            validThru: '12/25'
        },
        {
            id: 'CARD-003',
            cardName: 'Backup Card',
            cardNumber: '4567 8912 3456 7890',
            bankName: 'Bank XYZ',
            cardHolder: 'Bittu ✅',
            validThru: '08/27'
        }
    ]);

    const [mobileBankingAccounts, setMobileBankingAccounts] = useState([
        {
            id: 'MOBILE-001',
            phoneNumber: '01712345678',
            bankingType: 'bikash',
            providerName: 'bKash',
            accountName: 'Primary bKash'
        },
        {
            id: 'MOBILE-002',
            phoneNumber: '01898765432',
            bankingType: 'nagad',
            providerName: 'Nagad',
            accountName: 'Nagad Account'
        },
        {
            id: 'MOBILE-003',
            phoneNumber: '01911223344',
            bankingType: 'rocket',
            providerName: 'Rocket',
            accountName: 'DBBL Rocket'
        }
    ]);

    const [transactions] = useState([
        {
            id: 'TXN-001',
            customerName: 'John Smith',
            paymentGateway: 'Stripe',
            dateTime: '2024-12-10T14:30:00',
            value: 50000,
            caseId: 'ARB-001'
        },
        {
            id: 'TXN-002',
            customerName: 'Sarah Johnson',
            paymentGateway: 'PayPal',
            dateTime: '2024-12-10T11:15:00',
            value: 75000,
            caseId: 'ARB-002'
        },
        {
            id: 'TXN-003',
            customerName: 'Michael Chen',
            paymentGateway: 'Bank Transfer',
            dateTime: '2024-12-09T16:45:00',
            value: 60000,
            caseId: 'ARB-003'
        },
        {
            id: 'TXN-004',
            customerName: 'Tech Solutions Inc.',
            paymentGateway: 'Stripe',
            dateTime: '2024-12-09T10:20:00',
            value: 30000,
            caseId: 'ARB-004'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
    const [showMobileBanking, setShowMobileBanking] = useState(false);
    const [showAddCard, setShowAddCard] = useState(false);
    const [mobileBankingForm, setMobileBankingForm] = useState({
        phoneNumber: '',
        bankingType: '',
        accountName: ''
    });
    const [addCardForm, setAddCardForm] = useState({
        cardName: '',
        cardNumber: '',
        bankName: '',
        cardHolder: '',
        validThru: ''
    });

    useEffect(() => {
        filterTransactions();
    }, [searchTerm, transactions]);

    const filterTransactions = () => {
        let filtered = transactions.filter(transaction => {
            const matchesSearch = 
                transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.paymentGateway.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.value.toString().includes(searchTerm) ||
                new Date(transaction.dateTime).toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        });

        filtered.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
        setFilteredTransactions(filtered);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleMobileBankingChange = (e) => {
        const { name, value } = e.target;
        setMobileBankingForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddCardChange = (e) => {
        const { name, value } = e.target;
        setAddCardForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMobileBankingSubmit = (e) => {
        e.preventDefault();
        
        // Generate provider name based on banking type
        const providerNames = {
            bikash: 'bKash',
            nagad: 'Nagad',
            rocket: 'Rocket',
            upay: 'Upay',
            tap: 'Tap'
        };

        const newAccount = {
            id: `MOBILE-${String(mobileBankingAccounts.length + 1).padStart(3, '0')}`,
            phoneNumber: mobileBankingForm.phoneNumber,
            bankingType: mobileBankingForm.bankingType,
            providerName: providerNames[mobileBankingForm.bankingType] || mobileBankingForm.bankingType,
            accountName: mobileBankingForm.accountName || `${providerNames[mobileBankingForm.bankingType]} Account`
        };
        
        // Add new mobile banking account
        setMobileBankingAccounts(prev => [...prev, newAccount]);
        
        // Reset form and close modal
        setMobileBankingForm({ phoneNumber: '', bankingType: '', accountName: '' });
        setShowMobileBanking(false);
        
        // Set the new account as current
        setCurrentMobileIndex(mobileBankingAccounts.length);
    };

    const handleAddCardSubmit = (e) => {
        e.preventDefault();
        // Generate new card ID
        const newCard = {
            id: `CARD-${String(cards.length + 1).padStart(3, '0')}`,
            ...addCardForm
        };
        
        // Add new card to the cards array
        setCards(prev => [...prev, newCard]);
        
        // Reset form and close modal
        setAddCardForm({
            cardName: '',
            cardNumber: '',
            bankName: '',
            cardHolder: '',
            validThru: ''
        });
        setShowAddCard(false);
        
        // Set the new card as current
        setCurrentCardIndex(cards.length);
    };

    const nextCard = () => {
        setCurrentCardIndex((prevIndex) => 
            prevIndex === cards.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevCard = () => {
        setCurrentCardIndex((prevIndex) => 
            prevIndex === 0 ? cards.length - 1 : prevIndex - 1
        );
    };

    const nextMobile = () => {
        setCurrentMobileIndex((prevIndex) => 
            prevIndex === mobileBankingAccounts.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevMobile = () => {
        setCurrentMobileIndex((prevIndex) => 
            prevIndex === 0 ? mobileBankingAccounts.length - 1 : prevIndex - 1
        );
    };

    const formatCurrency = (amount) => {
        return `BDT ${amount.toLocaleString()}`;
    };

    const getMobileBankingIcon = (type) => {
        const icons = {
            bikash: '🟠',
            nagad: '🟢',
            rocket: '🔵',
            upay: '🟣',
            tap: '🟡'
        };
        return icons[type] || '📱';
    };

    const getMobileBankingColor = (type) => {
        const colors = {
            bikash: 'from-orange-500 to-red-600',
            nagad: 'from-green-500 to-emerald-600',
            rocket: 'from-blue-500 to-cyan-600',
            upay: 'from-purple-500 to-pink-600',
            tap: 'from-yellow-500 to-amber-600'
        };
        return colors[type] || 'from-gray-500 to-gray-600';
    };

    const BankCard = ({ card }) => (
        <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl p-3 text-white shadow-lg w-full max-w-[240px] mx-auto min-h-[140px]">
            {/* Bank Name and Logo */}
            <div className="flex justify-between items-start mb-2">
                <div>
                    <p className="text-[10px] opacity-80">Bank Name</p>
                    <p className="font-bold text-xs">{card.bankName}</p>
                </div>
                <FaCreditCard className="text-sm opacity-80" />
            </div>

            {/* Card Number */}
            <div className="mb-3">
                <p className="text-[10px] opacity-80 mb-1">Card Number</p>
                <p className="font-mono text-xs tracking-wider">{card.cardNumber}</p>
            </div>

            {/* Card Holder and Valid Thru */}
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-[10px] opacity-80">Card Holder</p>
                    <p className="font-semibold text-xs">{card.cardHolder}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] opacity-80">Valid Thru</p>
                    <p className="font-semibold text-xs">{card.validThru}</p>
                </div>
            </div>
        </div>
    );

    const MobileBankingCard = ({ account }) => (
        <div className={`relative bg-gradient-to-br ${getMobileBankingColor(account.bankingType)} rounded-xl p-3 text-white shadow-lg w-full max-w-[240px] mx-auto min-h-[140px]`}>
            {/* Provider Name and Logo */}
            <div className="flex justify-between items-start mb-2">
                <div>
                    <p className="text-[10px] opacity-80">Provider</p>
                    <p className="font-bold text-xs">{account.providerName}</p>
                </div>
                <div className="text-base">
                    {getMobileBankingIcon(account.bankingType)}
                </div>
            </div>

            {/* Account Name */}
            <div className="mb-2">
                <p className="text-[10px] opacity-80 mb-1">Account Name</p>
                <p className="font-semibold text-xs">{account.accountName}</p>
            </div>

            {/* Phone Number */}
            <div className="mb-3">
                <p className="text-[10px] opacity-80 mb-1">Phone Number</p>
                <p className="font-mono text-xs tracking-wider">{account.phoneNumber}</p>
            </div>

            {/* Status */}
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-[10px] opacity-80">Status</p>
                    <p className="font-semibold text-xs">Active ✅</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] opacity-80">Type</p>
                    <p className="font-semibold text-xs capitalize">{account.bankingType}</p>
                </div>
            </div>
        </div>
    );

    const AddCardButton = () => (
        <button 
            onClick={() => setShowAddCard(true)}
            className="w-full max-w-[240px] mx-auto bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 text-gray-500 hover:text-blue-600 rounded-lg py-2 px-3 text-xs font-medium"
        >
            <FaPlus className="text-xs" />
            <span>Add New Card</span>
        </button>
    );

    const AddMobileBankingButton = () => (
        <button 
            onClick={() => setShowMobileBanking(true)}
            className="w-full max-w-[240px] mx-auto bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 hover:border-green-400 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 text-gray-500 hover:text-green-600 rounded-lg py-2 px-3 text-xs font-medium"
        >
            <FaPlus className="text-xs" />
            <span>Add Mobile Banking</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-3">
            <div className="max-w-7xl mx-auto px-2">
                {/* Header */}
                <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm mb-2">
                        <FaMoneyBillWave className="w-3 h-3 text-blue-600" />
                        <span className="text-xs font-medium text-gray-600">
                            Financial Dashboard
                        </span>
                    </div>
                    <h1 className="text-lg md:text-xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        My Finance
                    </h1>
                    <p className="text-gray-600 text-xs">
                        Manage your payments and transactions
                    </p>
                </div>

                {/* Bank Cards & Mobile Banking Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    {/* Bank Cards Section */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/20 min-h-[220px]">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3 text-center">Bank Cards</h3>
                        
                        <div className="flex items-center justify-center gap-1 mb-3">
                            {/* Left Arrow */}
                            <button 
                                onClick={prevCard}
                                className="w-6 h-6 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                                <FaChevronLeft className="text-gray-600 text-xs" />
                            </button>

                            {/* Current Card */}
                            {cards.length > 0 ? (
                                <BankCard card={cards[currentCardIndex]} />
                            ) : (
                                <div className="w-full max-w-[240px] mx-auto min-h-[140px] flex items-center justify-center">
                                    <AddCardButton />
                                </div>
                            )}

                            {/* Right Arrow */}
                            <button 
                                onClick={nextCard}
                                className="w-6 h-6 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                                <FaChevronRight className="text-gray-600 text-xs" />
                            </button>
                        </div>

                        {/* Card Indicator Dots */}
                        {cards.length > 0 && (
                            <div className="flex justify-center gap-1 mb-3">
                                {cards.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                            index === currentCardIndex 
                                                ? 'bg-blue-600 w-3' 
                                                : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Add Card Button */}
                        <div className="flex justify-center">
                            <AddCardButton />
                        </div>
                    </div>

                    {/* Mobile Banking Section */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/20 min-h-[220px]">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3 text-center">Mobile Banking</h3>
                        
                        <div className="flex items-center justify-center gap-1 mb-3">
                            {/* Left Arrow */}
                            <button 
                                onClick={prevMobile}
                                className="w-6 h-6 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                                <FaChevronLeft className="text-gray-600 text-xs" />
                            </button>

                            {/* Current Mobile Banking */}
                            {mobileBankingAccounts.length > 0 ? (
                                <MobileBankingCard account={mobileBankingAccounts[currentMobileIndex]} />
                            ) : (
                                <div className="w-full max-w-[240px] mx-auto min-h-[140px] flex items-center justify-center">
                                    <AddMobileBankingButton />
                                </div>
                            )}

                            {/* Right Arrow */}
                            <button 
                                onClick={nextMobile}
                                className="w-6 h-6 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                                <FaChevronRight className="text-gray-600 text-xs" />
                            </button>
                        </div>

                        {/* Mobile Banking Indicator Dots */}
                        {mobileBankingAccounts.length > 0 && (
                            <div className="flex justify-center gap-1 mb-3">
                                {mobileBankingAccounts.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                            index === currentMobileIndex 
                                                ? 'bg-green-600 w-3' 
                                                : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Add Mobile Banking Button */}
                        <div className="flex justify-center">
                            <AddMobileBankingButton />
                        </div>
                    </div>
                </div>

                {/* Search Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-white/20 mb-3">
                    <div className="flex justify-center">
                        <div className="w-full max-w-md">
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                                <input
                                    type="text"
                                    placeholder="Search by date, amount, gateway..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full bg-white shadow text-xs"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Card Modal */}
                {showAddCard && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 z-50">
                        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-4">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                    <FaCreditCard className="text-blue-500" />
                                    Add New Card
                                </h3>
                                <button
                                    onClick={() => setShowAddCard(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <FaTimes className="text-base" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleAddCardSubmit} className="space-y-3">
                                {/* Card Name */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Card Name
                                    </label>
                                    <input
                                        type="text"
                                        name="cardName"
                                        value={addCardForm.cardName}
                                        onChange={handleAddCardChange}
                                        placeholder="e.g., Main Card, Secondary Card"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                                        required
                                    />
                                </div>

                                {/* Card Number */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Card Number
                                    </label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={addCardForm.cardNumber}
                                        onChange={handleAddCardChange}
                                        placeholder="1234 5678 9012 3456"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                                        required
                                    />
                                </div>

                                {/* Bank Name */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Bank Name
                                    </label>
                                    <input
                                        type="text"
                                        name="bankName"
                                        value={addCardForm.bankName}
                                        onChange={handleAddCardChange}
                                        placeholder="e.g., Bank XKDX, Bank ABC"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                                        required
                                    />
                                </div>

                                {/* Card Holder */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Card Holder Name
                                    </label>
                                    <input
                                        type="text"
                                        name="cardHolder"
                                        value={addCardForm.cardHolder}
                                        onChange={handleAddCardChange}
                                        placeholder="Enter card holder name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                                        required
                                    />
                                </div>

                                {/* Valid Thru */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Valid Thru (MM/YY)
                                    </label>
                                    <input
                                        type="text"
                                        name="validThru"
                                        value={addCardForm.validThru}
                                        onChange={handleAddCardChange}
                                        placeholder="MM/YY"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                                        required
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-2 pt-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddCard(false)}
                                        className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-xs font-medium"
                                    >
                                        ADD CARD
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Mobile Banking Modal */}
                {showMobileBanking && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 z-50">
                        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-4">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                    <FaMobileAlt className="text-green-500" />
                                    Add Mobile Banking
                                </h3>
                                <button
                                    onClick={() => setShowMobileBanking(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <FaTimes className="text-base" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleMobileBankingSubmit} className="space-y-3">
                                {/* Account Name */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Account Name
                                    </label>
                                    <input
                                        type="text"
                                        name="accountName"
                                        value={mobileBankingForm.accountName}
                                        onChange={handleMobileBankingChange}
                                        placeholder="e.g., Primary bKash, Nagad Account"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs"
                                        required
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={mobileBankingForm.phoneNumber}
                                        onChange={handleMobileBankingChange}
                                        placeholder="01XXXXXXXXX"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs"
                                        required
                                    />
                                </div>

                                {/* Banking Type */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Banking Type
                                    </label>
                                    <select
                                        name="bankingType"
                                        value={mobileBankingForm.bankingType}
                                        onChange={handleMobileBankingChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs"
                                        required
                                    >
                                        <option value="">Select Banking Type</option>
                                        <option value="bikash">bKash</option>
                                        <option value="nagad">Nagad</option>
                                        <option value="rocket">Rocket</option>
                                        <option value="upay">Upay</option>
                                        <option value="tap">Tap</option>
                                    </select>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-2 pt-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowMobileBanking(false)}
                                        className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 text-xs font-medium"
                                    >
                                        ADD
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Transactions Table */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                    <div className="px-3 py-2 border-b border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900">Recent Transactions</h3>
                    </div>
                    
                    {/* Desktop Table */}
                    <div className="hidden md:block">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Gateway
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date & Time
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Value
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredTransactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-3 py-2 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                                                    <FaUser className="text-blue-600 text-xs" />
                                                </div>
                                                <div>
                                                    <div className="text-xs font-medium text-gray-900">
                                                        {transaction.customerName}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {transaction.caseId}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap">
                                            <div className="text-xs text-gray-900">{transaction.paymentGateway}</div>
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap">
                                            <div className="text-xs text-gray-900">
                                                {new Date(transaction.dateTime).toLocaleDateString()}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {new Date(transaction.dateTime).toLocaleTimeString()}
                                            </div>
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap">
                                            <div className="text-xs font-semibold text-green-600">
                                                {formatCurrency(transaction.value)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden">
                        {filteredTransactions.map((transaction) => (
                            <div key={transaction.id} className="border-b border-gray-200 p-2 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center mb-1">
                                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                                        <FaUser className="text-blue-600 text-xs" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-medium text-gray-900">
                                            {transaction.customerName}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {transaction.caseId}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <div className="text-gray-500">Gateway</div>
                                        <div className="font-medium">{transaction.paymentGateway}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500">Date</div>
                                        <div className="font-medium">
                                            {new Date(transaction.dateTime).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500">Time</div>
                                        <div className="font-medium">
                                            {new Date(transaction.dateTime).toLocaleTimeString()}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500">Value</div>
                                        <div className="font-semibold text-green-600">
                                            {formatCurrency(transaction.value)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredTransactions.length === 0 && (
                        <div className="text-center py-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                                <FaMoneyBillWave className="text-base text-blue-500" />
                            </div>
                            <h3 className="text-sm font-bold text-gray-900 mb-1">
                                No Transactions
                            </h3>
                            <p className="text-gray-600 text-xs">
                                {searchTerm
                                    ? "No transactions match your search."
                                    : "No transactions found."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Finance;