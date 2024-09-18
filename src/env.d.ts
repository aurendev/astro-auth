/// <reference path="../.astro/types.d.ts" />


interface User {
  email: string;
  name: string;
  avatar: string;
  emailVerified: boolean;
}

declare namespace App {
  interface Locals {
    user?: User;
    isLoggedIn: boolean;
  }
}