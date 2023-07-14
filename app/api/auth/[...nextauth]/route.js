import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
// import clientPromise from "../../../../lib/mongodb"
import { NextAuthOptions } from "next-auth"
import db from "../../../../lib/db"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/User"
import { compare } from "bcrypt"
export const authOptions =  {
  providers: [
    GithubProvider({
      clientId: process.env.GitHub_Client_Id,
      clientSecret: process.env.GitHub_Client_Secret,
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials,req){
        const {email,password} = credentials
        await db.connect()
        let foundUser = await User.findOne({email})
        if(foundUser)
        {
          const matched = await compare(password,foundUser.password)
          if(matched){
            
            return {id:foundUser._id,name:foundUser.name,email:foundUser.email}
          }
          else throw new Error("Invalid credentials")
        }
        else
          throw new Error("Invalid credentials")
      }
    }),
  ],
  pages:{
    signIn:"/login",
  },
  // adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
        session.user.name = token.name;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
        token.name = user.name;
      }
      return token;
    },
  },
  session:{
    strategy:"jwt",
  },
  jwt:{
    secret:process.env.JWT_SECRET
  },
}
const handler = NextAuth(authOptions)
export {handler as GET , handler as POST}