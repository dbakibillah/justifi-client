import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState, useMemo } from "react";
import ArbitratorCard from "../components/ArbitratorCard";
import ArbitratorModal from "../components/ArbitratorModal";
import PageHeader from "../components/PageHeader";

const ArbitratorManagement = () => {
    const axiosSecure = useAxiosSecure();
    const { data: arbitrators = [], refetch } = useQuery({
        queryKey: ["arbitrators"],
        queryFn: async () => {
            const res = await axiosSecure.get("/all-arbitrators");
            return res.data;
        },
    });

    const [showModal, setShowModal] = useState(false);
    const [editingArbitrator, setEditingArbitrator] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        image: "",
        gender: "Male",
        languages: [],
        specialization: [],
        description: "",
        qualification: "",
    });

    // Filter arbitrators based on search term
    const filteredArbitrators = useMemo(() => {
        if (!searchTerm) return arbitrators;

        const lowercasedSearch = searchTerm.toLowerCase();
        return arbitrators.filter(
            (arbitrator) =>
                arbitrator.name.toLowerCase().includes(lowercasedSearch) ||
                arbitrator.email.toLowerCase().includes(lowercasedSearch) ||
                arbitrator.qualification
                    .toLowerCase()
                    .includes(lowercasedSearch) ||
                arbitrator.specialization.some((spec) =>
                    spec.toLowerCase().includes(lowercasedSearch)
                ) ||
                arbitrator.languages.some((lang) =>
                    lang.toLowerCase().includes(lowercasedSearch)
                )
        );
    }, [arbitrators, searchTerm]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleArrayInput = (e, field) => {
        const value = e.target.value;
        const array = value
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item);
        setFormData((prev) => ({
            ...prev,
            [field]: array,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingArbitrator) {
                await axiosSecure.put(
                    `/arbitrators/${editingArbitrator._id}`,
                    formData
                );
            } else {
                await axiosSecure.post("/arbitrators", formData);
            }
            refetch();
            setShowModal(false);
            setEditingArbitrator(null);
            resetForm();
        } catch (error) {
            console.error("Error saving arbitrator:", error);
        }
    };

    const handleEdit = (arbitrator) => {
        setEditingArbitrator(arbitrator);
        setFormData({
            name: arbitrator.name,
            email: arbitrator.email,
            phone: arbitrator.phone,
            address: arbitrator.address,
            image: arbitrator.image,
            gender: arbitrator.gender,
            languages: arbitrator.languages,
            specialization: arbitrator.specialization,
            description: arbitrator.description,
            qualification: arbitrator.qualification,
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (
            window.confirm("Are you sure you want to delete this arbitrator?")
        ) {
            try {
                await axiosSecure.delete(`/arbitrators/${id}`);
                refetch();
            } catch (error) {
                console.error("Error deleting arbitrator:", error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
            image: "",
            gender: "Male",
            languages: [],
            specialization: [],
            description: "",
            qualification: "",
        });
        setEditingArbitrator(null);
    };

    const openAddModal = () => {
        resetForm();
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingArbitrator(null);
        resetForm();
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <PageHeader
                    title="Arbitrator Management"
                    onAdd={openAddModal}
                    onSearch={handleSearch}
                    searchTerm={searchTerm}
                    addButtonText="Add Arbitrator"
                />

                {/* Statistics Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 shadow-lg border border-blue-100">
                        <div className="text-2xl font-bold text-blue-600">
                            {filteredArbitrators.length}
                        </div>
                        <div className="text-gray-600 text-sm">
                            {searchTerm
                                ? "Filtered Arbitrators"
                                : "Total Arbitrators"}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg border border-green-100">
                        <div className="text-2xl font-bold text-green-600">
                            {
                                filteredArbitrators.filter((a) =>
                                    a.specialization.includes(
                                        "arbitration trainer"
                                    )
                                ).length
                            }
                        </div>
                        <div className="text-gray-600 text-sm">
                            Arbitration Trainers
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg border border-purple-100">
                        <div className="text-2xl font-bold text-purple-600">
                            {
                                new Set(
                                    filteredArbitrators.flatMap(
                                        (a) => a.languages
                                    )
                                ).size
                            }
                        </div>
                        <div className="text-gray-600 text-sm">
                            Languages Supported
                        </div>
                    </div>
                </div>

                {/* Search Results Info */}
                {searchTerm && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <p className="text-blue-700">
                            Showing {filteredArbitrators.length} arbitrator
                            {filteredArbitrators.length !== 1 ? "s" : ""}
                            matching "
                            <span className="font-semibold">{searchTerm}</span>"
                            {filteredArbitrators.length === 0 &&
                                " - No arbitrators found"}
                        </p>
                    </div>
                )}

                {/* Arbitrators Grid */}
                {filteredArbitrators.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">⚖️</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            {searchTerm
                                ? "No Arbitrators Found"
                                : "No Arbitrators Found"}
                        </h3>
                        <p className="text-gray-500 mb-4">
                            {searchTerm
                                ? "Try adjusting your search terms or browse all arbitrators."
                                : "Get started by adding your first arbitrator to the system."}
                        </p>
                        {searchTerm ? (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
                            >
                                Clear Search
                            </button>
                        ) : (
                            <button
                                onClick={openAddModal}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
                            >
                                Add Your First Arbitrator
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredArbitrators.map((arbitrator) => (
                            <ArbitratorCard
                                key={arbitrator._id}
                                arbitrator={arbitrator}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                searchTerm={searchTerm}
                            />
                        ))}
                    </div>
                )}

                {/* Add/Edit Modal */}
                <ArbitratorModal
                    show={showModal}
                    onClose={closeModal}
                    onSubmit={handleSubmit}
                    formData={formData}
                    onInputChange={handleInputChange}
                    onArrayInput={handleArrayInput}
                    isEditing={!!editingArbitrator}
                />
            </div>
        </div>
    );
};

export default ArbitratorManagement;
