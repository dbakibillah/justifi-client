
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import {
    FaArrowRight,
    FaEnvelope,
    FaEye,
    FaEyeSlash,
    FaGoogle,
    FaLock,
    FaSpinner,
    FaUser
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProviders";

const Registration = () => {
    const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY;
    const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { createUser, setUser, updateUserProfile, googleSignIn } =
        useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleGoogleSignIn = () => {
        setIsSubmitting(true);
        googleSignIn()
            .then(async (result) => {
                const user = result.user;
                setUser(user);

                const newUser = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                };

                try {
                    const response = await axiosPublic.get(
                        `/user?email=${user.email}`
                    );
                    if (response.data.exists) {
                        await Swal.fire({
                            title: "Welcome back!",
                            text: "You are already registered.",
                            icon: "info",
                            background: "#f8fafc",
                            confirmButtonColor: "#10b981",
                        });
                        navigate("/");
                    } else {
                        await axiosPublic.post("/users", newUser);
                        await Swal.fire({
                            title: "Registration Complete!",
                            text: "You've successfully registered with Google!",
                            icon: "success",
                            background: "#f8fafc",
                            confirmButtonColor: "#10b981",
                        });
                    }
                    navigate(location.state?.from?.pathname || "/", {
                        replace: true,
                    });
                } catch (error) {
                    console.error("Error handling Google sign-in:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Something went wrong!",
                        text: error.message,
                        background: "#f8fafc",
                        confirmButtonColor: "#10b981",
                    });
                }
            })
            .catch((err) => {
                Swal.fire({
                    title: "Something went wrong!",
                    text: err.message,
                    icon: "error",
                    background: "#f8fafc",
                    confirmButtonColor: "#10b981",
                });
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const { name, email, password } = data;

        try {
            const response = await axiosPublic.get(`/user?email=${email}`);
            if (response.data.exists) {
                await Swal.fire({
                    title: "Already Registered!",
                    text: "Please log in instead.",
                    icon: "info",
                    background: "#f8fafc",
                    confirmButtonColor: "#10b981",
                });
                navigate("/login");
                return;
            }

            const result = await createUser(email, password);
            setUser(result.user);

            const formData = new FormData();
            formData.append("image", data.photo[0]);
            const imgResponse = await axiosPublic.post(
                img_hosting_api,
                formData
            );

            if (!imgResponse.data.success) {
                await Swal.fire({
                    icon: "error",
                    title: "Image Upload Failed",
                    text: "Please try again.",
                    background: "#f8fafc",
                    confirmButtonColor: "#10b981",
                });
                return;
            }

            const updateUser = {
                displayName: name,
                photoURL: imgResponse.data.data.display_url,
            };
            await updateUserProfile(updateUser);

            const newUser = { name, email, photo: updateUser.photoURL };
            await axiosPublic.post("/users", newUser);

            await Swal.fire({
                title: "Registration Successful!",
                text: "Your wellness journey begins now.",
                icon: "success",
                background: "#f8fafc",
                confirmButtonColor: "#10b981",
            });
            navigate("/");
        } catch (error) {
            console.error("Error during registration:", error);
            await Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: error.message,
                background: "#f8fafc",
                confirmButtonColor: "#10b981",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-4">
            <Helmet>
                <title>Registration | justiFi</title>
            </Helmet>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-green-100 relative overflow-hidden">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        {/* Name Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.5,
                                type: "spring",
                                stiffness: 100,
                            }}
                            className="space-y-2"
                        >
                            <label className="text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-400 focus:ring-1 focus:ring-green-200 transition outline-none pl-10"
                                    {...register("name", {
                                        required: "Name is required",
                                    })}
                                />
                                <div className="absolute left-3 top-3.5 text-gray-400">
                                    <FaUser className="h-5 w-5" />
                                </div>
                            </div>
                            {errors.name && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-xs mt-1 flex items-center"
                                >
                                    {errors.name.message}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Email Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.6,
                                type: "spring",
                                stiffness: 100,
                            }}
                            className="space-y-2"
                        >
                            <label className="text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-400 focus:ring-1 focus:ring-green-200 transition outline-none pl-10"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email format",
                                        },
                                    })}
                                />
                                <div className="absolute left-3 top-3.5 text-gray-400">
                                    <FaEnvelope className="h-5 w-5" />
                                </div>
                            </div>
                            {errors.email && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-xs mt-1 flex items-center"
                                >
                                    {errors.email.message}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Photo Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.7,
                                type: "spring",
                                stiffness: 100,
                            }}
                            className="space-y-2"
                        >
                            <label className="text-sm font-medium text-gray-700">
                                Profile Photo
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-400 focus:ring-1 focus:ring-green-200 transition outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 file:cursor-pointer"
                                    {...register("photo", {
                                        required: "Photo is required",
                                    })}
                                />
                            </div>
                            {errors.photo && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-xs mt-1 flex items-center"
                                >
                                    {errors.photo.message}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Password Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.8,
                                type: "spring",
                                stiffness: 100,
                            }}
                            className="space-y-2"
                        >
                            <label className="text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-400 focus:ring-1 focus:ring-green-200 transition outline-none pl-10 pr-10"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Minimum 6 characters required",
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                            message:
                                                "Must include uppercase, lowercase, number & special character",
                                        },
                                    })}
                                />
                                <div className="absolute left-3 top-3.5 text-gray-400">
                                    <FaLock className="h-5 w-5" />
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition"
                                >
                                    {showPassword ? (
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <FaEyeSlash />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <FaEye />
                                        </motion.div>
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-xs mt-1 flex items-center"
                                >
                                    {errors.password.message}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Register Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.9,
                                type: "spring",
                                stiffness: 200,
                            }}
                            type="submit"
                            whileHover={{
                                scale: 1.02,
                                boxShadow:
                                    "0px 5px 15px rgba(16, 185, 129, 0.3)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                        >
                            {isSubmitting ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="flex items-center"
                                >
                                    <FaSpinner className="h-5 w-5 mr-2" />
                                    Creating Account...
                                </motion.div>
                            ) : (
                                <>
                                    Begin Journey{" "}
                                    <FaArrowRight className="ml-2" />
                                </>
                            )}
                        </motion.button>

                        {/* Divider */}
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="relative my-6"
                        >
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-2 bg-white text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </motion.div>

                        {/* Google Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 1.1,
                                type: "spring",
                                stiffness: 200,
                            }}
                            type="button"
                            whileHover={{
                                y: -2,
                                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleGoogleSignIn}
                            disabled={isSubmitting}
                            className="w-full border border-gray-200 hover:border-gray-300 bg-white text-gray-700 py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
                        >
                            <FaGoogle className="text-red-500 h-5 w-5" />
                            Continue with Google
                        </motion.button>
                    </form>

                    {/* Footer */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        className="text-center text-sm text-gray-500"
                    >
                        Already part of our community?{" "}
                        <Link
                            to="/login"
                            className="text-green-600 font-medium hover:underline hover:text-green-700 transition"
                        >
                            Sign in
                        </Link>
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
};

export default Registration;
