import { firebase } from "@/firebase/config";
import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import { createUserWithEmailAndPassword, updateProfile, type AuthError } from "firebase/auth";

export const registerUser = defineAction({
	accept: "form",
	input: z.object({
		name: z.string().min(3),
		email: z.string().email(),
		password: z.string().min(6),
		remember_me: z.boolean().optional(),
	}),

	handler: async ({ email, password, remember_me, name }, { cookies }) => {
		if (remember_me) {
			cookies.set("email", email, {
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
				path: "/",
			});
		} else {
			cookies.delete("email", {
				path: "/",
			});
		}

		try {
			console.log("firebase ...");
			const user = await createUserWithEmailAndPassword(
				firebase.auth,
				email,
				password
			);

      updateProfile(firebase.auth.currentUser!, {displayName: name})

			console.log({ email, password, remember_me, name });

			return JSON.stringify(user);
		} catch (error) {
			console.log(error);

			const firebaseError = error as AuthError;

			if (firebaseError.code === "auth/email-already-in-use") {
				throw new Error("El correo ya existe");
			}

			throw new Error("Error al registrar el usuario");
		}

		// return { ok: true, message: "Usuario creado" };
	},
});
