'use server'

import User from "@/models/User";
import db from "@/lib/db";


// Purpose: Fetch user details like name and image from database
export const getUserData = async (userId) => {
    console.log(userId);
    console.log("fetching user data");
    await db.connect()
    const user = await User.findOne({ _id: userId })
    .select("image name")
    .lean(true);
    return {name:user.name,image:user.image}
}