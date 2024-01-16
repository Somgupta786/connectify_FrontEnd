import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
const handler = NextAuth({
providers:[
GoogleProvider({
    clientId:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
})
],
callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.refreshToken=account.refresh_token
        token.accessToken = account.access_token
        token.id = profile.id
      }
      return token
    },
    async session({ session, token, user }) {
        // Send properties to the client, like an access_token and user id from a provider.
        session.refreshToken=token.refreshToken
        session.accessToken = token.accessToken
        session.user.id = token.id
        
        return session
      }
  },
 
})

export { handler as GET, handler as POST }