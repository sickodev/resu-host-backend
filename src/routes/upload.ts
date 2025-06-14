import {Hono} from "hono";
import {getUploadPing, uploadFile} from "../handlers/upload.js";

const upload = new Hono();

upload.get("/", getUploadPing)
upload.post("/", uploadFile)

export default upload;