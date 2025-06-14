import {Hono} from "hono";
import {redirectToPage} from "../handlers/redirect.js";

const redirect = new Hono()

redirect.get("/:slug", redirectToPage)

export {redirect}