import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import Discord from "next-auth/providers/discord"
import Facebook from "next-auth/providers/facebook"

export default {
    providers: [Google, Github, Discord, Facebook],
    pages: {
      signIn: '/login',
    },
    callbacks: {
      authorized: async ({ auth }) => {
        // Logged in users are authenticated, otherwise redirect to login page
        return !!auth
      },

      async session({ token, session }) {
        if (token.sub && session.user){
          session.user.id = token.sub;
        }
        return session;
      },

      async jwt({ token }){
        return token;
      }
    },
}