//checks whether user is authenticated/verified or not
export { default } from "next-auth/middleware";

// if verified then only move to "/dashboard"
export const config = {
    matcher: ["/dashboard"]
}

// If we are not logged-in and trying to go to "/dashboard" url then we will be not allowed to do so. Therefore we will still remain on "/" page.