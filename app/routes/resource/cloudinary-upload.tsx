import type { ActionArgs, UploadHandler } from "@remix-run/server-runtime";
import {
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/server-runtime";
import { typedjson } from "remix-typedjson";
import { uploadImage } from "~/utils/cloudinary.server";

export const action = async ({ request }: ActionArgs) => {
  const uploadHandler: UploadHandler = unstable_composeUploadHandlers(async ({ name, data }) => {
    if (name !== "img") {
      return undefined;
    }

    const uploadedImage = await uploadImage(data);
    return uploadedImage?.secure_url;
  }, unstable_createMemoryUploadHandler());

  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const imgSrc = formData.get("img");
  const imgDesc = formData.get("desc");
  if (!imgSrc) {
    return typedjson({ error: "something wrong" });
  }

  return typedjson({ imgDesc, imgSrc });
};
