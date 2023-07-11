

// Purpose: Fetch user details like name and image from database
import User from "@/models/User";
import db from "@/lib/db";
export const getUserData = async (userId) => {
    db.connect()
    const user = await User.findOne({ _id: userId })
    .select("image name")
    .lean();
    return user
}