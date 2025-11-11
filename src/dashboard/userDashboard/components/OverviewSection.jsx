import { HiOutlineDocumentText } from "react-icons/hi";

// Overview Section Component for Left Side
const OverviewSection = () => {
    const overviewItems = [
        { label: "Arbitration Cases", value: "0" },
        { label: "Mediation Cases", value: "0" },
        { label: "Lawyer Consultations", value: "0" },
    ];

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-50 border border-gray-200">
                        <HiOutlineDocumentText className="text-lg text-gray-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        Overview
                    </h3>
                </div>
            </div>
            <div className="p-6">
                <div className="space-y-4">
                    {overviewItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                        >
                            <span className="text-gray-600 text-sm">
                                {item.label}
                            </span>
                            <span className="font-semibold text-gray-900">
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OverviewSection;
