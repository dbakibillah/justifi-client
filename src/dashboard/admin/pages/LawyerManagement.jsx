import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState, useMemo } from "react";
import LawyerCard from "../components/LawyerCard";
import LawyerModal from "../components/LawyerModal";
import PageHeader from "../components/PageHeader";

const LawyerManagement = () => {
    const axiosSecure = useAxiosSecure();
    const { data: lawyers = [], refetch } = useQuery({
        queryKey: ["lawyers"],
        queryFn: async () => {
            const res = await axiosSecure.get("/all-lawyers");
            return res.data;
        },
    });

    const [showModal, setShowModal] = useState(false);
    const [editingLawyer, setEditingLawyer] = useState(null);
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
        bar_id: "",
        fee: "",
        description: "",
        court: "",
        experience: "",
        successRate: "",
        casesHandled: "",
        rating: "",
        qualification: "",
    });

    // Filter lawyers based on search term
    const filteredLawyers = useMemo(() => {
        if (!searchTerm) return lawyers;

        const lowercasedSearch = searchTerm.toLowerCase();
        return lawyers.filter(
            (lawyer) =>
                lawyer.name.toLowerCase().includes(lowercasedSearch) ||
                lawyer.email.toLowerCase().includes(lowercasedSearch) ||
                lawyer.bar_id.toLowerCase().includes(lowercasedSearch) ||
                lawyer.court.toLowerCase().includes(lowercasedSearch) ||
                lawyer.qualification.toLowerCase().includes(lowercasedSearch) ||
                lawyer.specialization.some((spec) =>
                    spec.toLowerCase().includes(lowercasedSearch)
                ) ||
                lawyer.languages.some((lang) =>
                    lang.toLowerCase().includes(lowercasedSearch)
                )
        );
    }, [lawyers, searchTerm]);

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
            if (editingLawyer) {
                await axiosSecure.put(
                    `/lawyers/${editingLawyer._id}`,
                    formData
                );
            } else {
                await axiosSecure.post("/lawyers", formData);
            }
            refetch();
            setShowModal(false);
            setEditingLawyer(null);
            resetForm();
        } catch (error) {
            console.error("Error saving lawyer:", error);
        }
    };

    const handleEdit = (lawyer) => {
        setEditingLawyer(lawyer);
        setFormData({
            name: lawyer.name,
            email: lawyer.email,
            phone: lawyer.phone,
            address: lawyer.address,
            image: lawyer.image,
            gender: lawyer.gender,
            languages: lawyer.languages,
            specialization: lawyer.specialization,
            bar_id: lawyer.bar_id,
            fee: lawyer.fee,
            description: lawyer.description,
            court: lawyer.court,
            experience: lawyer.experience,
            successRate: lawyer.successRate,
            casesHandled: lawyer.casesHandled,
            rating: lawyer.rating,
            qualification: lawyer.qualification,
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this lawyer?")) {
            try {
                await axiosSecure.delete(`/lawyers/${id}`);
                refetch();
            } catch (error) {
                console.error("Error deleting lawyer:", error);
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
            bar_id: "",
            fee: "",
            description: "",
            court: "",
            experience: "",
            successRate: "",
            casesHandled: "",
            rating: "",
            qualification: "",
        });
        setEditingLawyer(null);
    };

    const openAddModal = () => {
        resetForm();
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingLawyer(null);
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
                    onAddLawyer={openAddModal}
                    onSearch={handleSearch}
                    searchTerm={searchTerm}
                />

                {/* Statistics Bar */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 shadow-lg border border-blue-100">
                        <div className="text-2xl font-bold text-blue-600">
                            {filteredLawyers.length}
                        </div>
                        <div className="text-gray-600 text-sm">
                            {searchTerm ? "Filtered Lawyers" : "Total Lawyers"}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg border border-green-100">
                        <div className="text-2xl font-bold text-green-600">
                            {
                                filteredLawyers.filter((l) => l.experience >= 5)
                                    .length
                            }
                        </div>
                        <div className="text-gray-600 text-sm">
                            Experienced (5+ years)
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg border border-purple-100">
                        <div className="text-2xl font-bold text-purple-600">
                            {filteredLawyers.length > 0
                                ? Math.round(
                                      (filteredLawyers.reduce(
                                          (acc, lawyer) => acc + lawyer.rating,
                                          0
                                      ) /
                                          filteredLawyers.length) *
                                          10
                                  ) / 10
                                : 0}
                        </div>
                        <div className="text-gray-600 text-sm">
                            Average Rating
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg border border-orange-100">
                        <div className="text-2xl font-bold text-orange-600">
                            {filteredLawyers.reduce(
                                (acc, lawyer) => acc + lawyer.casesHandled,
                                0
                            )}
                        </div>
                        <div className="text-gray-600 text-sm">Total Cases</div>
                    </div>
                </div>

                {/* Search Results Info */}
                {searchTerm && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <p className="text-blue-700">
                            Showing {filteredLawyers.length} lawyer
                            {filteredLawyers.length !== 1 ? "s" : ""}
                            matching "
                            <span className="font-semibold">{searchTerm}</span>"
                            {filteredLawyers.length === 0 &&
                                " - No lawyers found"}
                        </p>
                    </div>
                )}

                {/* Lawyers Grid */}
                {filteredLawyers.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">⚖️</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            {searchTerm
                                ? "No Lawyers Found"
                                : "No Lawyers Found"}
                        </h3>
                        <p className="text-gray-500 mb-4">
                            {searchTerm
                                ? "Try adjusting your search terms or browse all lawyers."
                                : "Get started by adding your first lawyer to the system."}
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
                                Add Your First Lawyer
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredLawyers.map((lawyer) => (
                            <LawyerCard
                                key={lawyer._id}
                                lawyer={lawyer}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                searchTerm={searchTerm}
                            />
                        ))}
                    </div>
                )}

                {/* Add/Edit Modal */}
                <LawyerModal
                    show={showModal}
                    onClose={closeModal}
                    onSubmit={handleSubmit}
                    formData={formData}
                    onInputChange={handleInputChange}
                    onArrayInput={handleArrayInput}
                    isEditing={!!editingLawyer}
                />
            </div>
        </div>
    );
};

export default LawyerManagement;
