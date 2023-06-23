import db from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";
export async function POST(req){
    try {
        const {name, email, password: pass} = await req.json()
        // console.log(name, email, pass)
        await db.connect()
        const isExisting = await User.findOne({email})
        
        if(isExisting){
            throw new Error("User already exists")
        }

        const hashedPassword = await bcrypt.hash(pass, 11)

        const newUser = await User.create({username:name, email, password: hashedPassword})

        const {password, ...user} = newUser._doc

        return new Response(JSON.stringify(user), {status: 201})
    } catch (error) {
        console.log(error.message);
        return new Response(JSON.stringify(error.message), {status: 500})
    }
}