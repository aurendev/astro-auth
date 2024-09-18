import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";

const privateRoutes = ["/protected"];

const noAuthRoutes = ["/login", "/register"];

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {

  firebase.auth.currentUser?.reload();
	

  const isLoggingIn = !!firebase.auth.currentUser;

  const user = firebase.auth.currentUser;

  context.locals.isLoggedIn = isLoggingIn;

  if(user){
    context.locals.user = {
      avatar : user.photoURL ?? '',
      email : user.email! ,
      emailVerified : user.emailVerified,
      name : user.displayName ?? ''
    }
  }

  if(!isLoggingIn && privateRoutes.includes(context.url.pathname)) {
    return context.redirect("/");
  }

  if(isLoggingIn && noAuthRoutes.includes(context.url.pathname)) {
    return context.redirect("/");
  }

	return next();
});

