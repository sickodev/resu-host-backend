import {Hono} from "hono";
import {getUploadPing} from "../handlers/upload.js";

const upload = new Hono();

upload.get("/", getUploadPing)

export default upload;