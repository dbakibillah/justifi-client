// hooks/useArbitrations.js

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";

export const useArbData = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    // All Arbitrations
    const { data: allArbitrations = [], refetch } = useQuery({
        queryKey: ["allArbitrations"],
        queryFn: async () => {
            const res = await axiosPublic.get("/all-arbitrations");
            return res.data;
        },
    });

    return {
        allArbitrations,
        refetchArbitrations: refetch,
    };
};

export default useArbData;
