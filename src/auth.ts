import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers:[Google({authorization:{params:{scope:"openid email profile https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/documents.readonly",access_type:"offline",prompt:"consent"}}})],
  callbacks:{
    jwt({token,account}){if(account?.access_token) token.accessToken=account.access_token;return token},
    session({session,token}){session.accessToken=typeof token.accessToken==="string"?token.accessToken:undefined;return session}
  }
});
