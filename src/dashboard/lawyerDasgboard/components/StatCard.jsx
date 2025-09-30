const StatCard = ({ icon: Icon, label, value, color, gradient }) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                        {label}
                    </p>
                    <p className={`text-3xl font-bold ${color}`}>{value}</p>
                </div>
                <div
                    className={`w-14 h-14 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                >
                    <Icon className="text-2xl text-white" />
                </div>
            </div>
        </div>
    );
};

export default StatCard;
