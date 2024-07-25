import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async session({ session }) {
			const sessionUser = await User.findOne({
				email: session.user.email,
			});

			session.user.id = sessionUser._id.toString();

			return session;
		},

		async signIn({ profile }) {
			try {
				await connectToDB();

				// Check user
				const UserExist = await User.findOne({ email: profile.email });
				// create and add user
				if (!UserExist) {
					await User.create({
						email: profile.email,
						username: profile.name.replace(' ', '').toLowerCase(),
						image: profile.picture,
					});
				}

				return true;
			} catch (error) {
				console.log('Error signing in', error);
				return false;
			}
		},
	},
	events: {
		error: async (message) => {
			console.error('NextAuth error:', message);
		},
	},

	debug: true,
});

export { handler as GET, handler as POST };
