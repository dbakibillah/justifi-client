// hooks/useArbitrations.js
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useUserData } from "./useUserData";

export const useArbitrations = () => {
    const axiosPublic = useAxiosPublic();
    const { currentUser } = useUserData();

    const {
        data: myArbitrations = [],
        isLoading,
        error,
        refetch: refetchArbitrations,
    } = useQuery({
        queryKey: ["myArbitrations", currentUser?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/currentArbitrations`, {
                params: { email: currentUser?.email },
            });
            return res.data;
        },
        enabled: !!currentUser?.email,
    });

    return {
        myArbitrations,
        isLoading,
        error,
        refetchArbitrations,
    };
};

export default useArbitrations;