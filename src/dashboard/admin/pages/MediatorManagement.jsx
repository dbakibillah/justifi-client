import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState, useMemo } from "react";
import MediatorCard from "../components/MediatorCard";
import MediatorModal from "../components/MediatorModal";
import PageHeader from "../components/PageHeader";

const MediatorManagement = () => {
    const axiosSecure = useAxiosSecure();
    const { data: mediators = [], refetch } = useQuery({
        queryKey: ["mediators"],
        queryFn: async () => {
            const res = await axiosSecure.get("/all-mediators");
            return res.data;
        },
    });

    const [showModal, setShowModal] = useState(false);
    const [editingMediator, setEditingMediator] = useState(null);
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
        experience: "",
        casesMediated: "",
        successRate: "",
        hourlyRate: "",
        availability: "Available",
    });

    // Filter mediators based on search term
    const filteredMediators = useMemo(() => {
        if (!searchTerm) return mediators;

        const lowercasedSearch = searchTerm.toLowerCase();
        return mediators.filter(
            (mediator) =>
                mediator.name.toLowerCase().includes(lowercasedSearch) ||
                mediator.email.toLowerCase().includes(lowercasedSearch) ||
                mediator.qualification
                    .toLowerCase()
                    .includes(lowercasedSearch) ||
                mediator.specialization.some((spec) =>
                    spec.toLowerCase().includes(lowercasedSearch)
                ) ||
                mediator.languages.some((lang) =>
                    lang.toLowerCase().includes(lowercasedSearch)
                )
        );
    }, [mediators, searchTerm]);

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
            if (editingMediator) {
                await axiosSecure.put(
                    `/mediators/${editingMediator._id}`,
                    formData
                );
            } else {
                await axiosSecure.post("/mediators", formData);
            }
            refetch();
            setShowModal(false);
            setEditingMediator(null);
            resetForm();
        } catch (error) {
            console.error("Error saving mediator:", error);
        }
    };

    const handleEdit = (mediator) => {
        setEditingMediator(mediator);
        setFormData({
            name: mediator.name,
            email: mediator.email,
            phone: mediator.phone,
            address: mediator.address,
            image: mediator.image,
            gender: mediator.gender,
            languages: mediator.languages,
            specialization: mediator.specialization,
            description: mediator.description,
            qualification: mediator.qualification,
            experience: mediator.experience || "",
            casesMediated: mediator.casesMediated || "",
            successRate: mediator.successRate || "",
            hourlyRate: mediator.hourlyRate || "",
            availability: mediator.availability || "Available",
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this mediator?")) {
            try {
                await axiosSecure.delete(`/mediators/${id}`);
                refetch();
            } catch (error) {
                console.error("Error deleting mediator:", error);
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
            experience: "",
            casesMediated: "",
            successRate: "",
            hourlyRate: "",
            availability: "Available",
        });
        setEditingMediator(null);
    };

    const openAddModal = () => {
        resetForm();
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingMediator(null);
        resetForm();
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    // Calculate statistics
    const totalMediators = filteredMediators.length;
    const experiencedMediators = filteredMediators.filter(
        (m) => m.experience >= 5
    ).length;
    const totalCasesMediated = filteredMediators.reduce(
        (acc, mediator) => acc + (parseInt(mediator.casesMediated) || 0),
        0
    );
    const averageSuccessRate =
        filteredMediators.length > 0
            ? Math.round(
                  filteredMediators.reduce(
                      (acc, mediator) =>
                          acc + (parseFloat(mediator.successRate) || 0),
                      0
                  ) / filteredMediators.length
              )
            : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <PageHeader
                    title="Mediator Management"
                    onAdd={openAddModal}
                    onSearch={handleSearch}
                    searchTerm={searchTerm}
                    addButtonText="Add Mediator"
                />

                {/* Statistics Bar */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 shadow-lg border border-green-100">
                        <div className="text-2xl font-bold text-green-600">
                            {totalMediators}
                        </div>
                        <div className="text-gray-600 text-sm">
                            {searchTerm
                                ? "Filtered Mediators"
                                : "Total Mediators"}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg border border-blue-100">
                        <div className="text-2xl font-bold text-blue-600">
                            {experiencedMediators}
                        </div>
                        <div className="text-gray-600 text-sm">
                            Experienced (5+ years)
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg border border-purple-100">
                        <div className="text-2xl font-bold text-purple-600">
                            {averageSuccessRate}%
                        </div>
                        <div className="text-gray-600 text-sm">
                            Avg. Success Rate
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg border border-orange-100">
                        <div className="text-2xl font-bold text-orange-600">
                            {totalCasesMediated}
                        </div>
                        <div className="text-gray-600 text-sm">
                            Total Cases Mediated
                        </div>
                    </div>
                </div>

                {/* Search Results Info */}
                {searchTerm && (
                    <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
                        <p className="text-green-700">
                            Showing {filteredMediators.length} mediator
                            {filteredMediators.length !== 1 ? "s" : ""}
                            matching "
                            <span className="font-semibold">{searchTerm}</span>"
                            {filteredMediators.length === 0 &&
                                " - No mediators found"}
                        </p>
                    </div>
                )}

                {/* Mediators Grid */}
                {filteredMediators.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🤝</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            {searchTerm
                                ? "No Mediators Found"
                                : "No Mediators Found"}
                        </h3>
                        <p className="text-gray-500 mb-4">
                            {searchTerm
                                ? "Try adjusting your search terms or browse all mediators."
                                : "Get started by adding your first mediator to the system."}
                        </p>
                        {searchTerm ? (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
                            >
                                Clear Search
                            </button>
                        ) : (
                            <button
                                onClick={openAddModal}
                                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
                            >
                                Add Your First Mediator
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredMediators.map((mediator) => (
                            <MediatorCard
                                key={mediator._id}
                                mediator={mediator}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                searchTerm={searchTerm}
                            />
                        ))}
                    </div>
                )}

                {/* Add/Edit Modal */}
                <MediatorModal
                    show={showModal}
                    onClose={closeModal}
                    onSubmit={handleSubmit}
                    formData={formData}
                    onInputChange={handleInputChange}
                    onArrayInput={handleArrayInput}
                    isEditing={!!editingMediator}
                />
            </div>
        </div>
    );
};

export default MediatorManagement;
