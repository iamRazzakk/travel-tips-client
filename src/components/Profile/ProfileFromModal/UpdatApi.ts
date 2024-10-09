import axios from "axios";
import { toast } from "sonner";

const UpdatApi = async (formData, initialData) => {
    try {
        const response = await axios.patch(
            // http://localhost:5001/api/v1/auth/user/6700ec29bb2959ad0db306da
            `http://localhost:5001/api/v1/auth/user/${initialData._id}`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        console.log(response);
        if (response.status === 200) {
            toast.success("Profile updated successfully!");
        } else {
            toast.error("Failed to update profile.");
        }
    } catch (error) {
        console.error("Error updating profile", error);
        toast.error("Failed to update profile.");
    }
}

export default UpdatApi;
