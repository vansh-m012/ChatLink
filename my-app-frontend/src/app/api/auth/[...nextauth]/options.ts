import { Account, AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios"
import { LOGIN_URL } from "@/lib/apiEndPoints";

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}

export interface CustomUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string | null;
  token?: string | null;
}


export const authOption: AuthOptions = {
  pages: {
    signIn: "/",
  },


  callbacks: {
    
    async signIn({ user, account}: {user: CustomUser, account: Account|null}) {

      try{
          console.log("the user data is:", user);
          console.log("the account data is:", account);

          // nextauth ke karan google se client pe humme ye {user,account} mila. We have to send this data now to our own backend(nodeJS).
          const payload= {
              email: user.email!,
              name: user.name!,
              oauth_id: account?.providerAccountId!,
              provider: account?.provider!,
              image: user?.image,
          }
          const { data } = await axios.post(LOGIN_URL, payload);  // data me wo authController.ts ka res.json aaega

          user.id = data?.user?.id?.toString();  //prisma schema me  id **Int** @id @default(autoincrement())
          user.token = data?.user?.token;
          user.provider= data?.user?.provider;

          return true;
      }

      catch(error){
          return false;  // nextauth ke error pages pe redirect kr dega.
      }
      

    },


    // session & jwt
    // session sends json from server to client.
     async session({session, token, user,}: {session: CustomSession; token: JWT; user: CustomUser;
    }) {

       session.user= token.user as CustomUser ;
       return session;
    },

    
    //client to server for verification; nextAuth sends jwt which has payload having name, email...... no need to handle access/refreshToken
    async jwt({ token, user}) {
        
        if(user){
            token.user= user;
        }
        return token;
    }
    
  },


   providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ]
}