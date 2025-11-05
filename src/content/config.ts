import { defineCollection } from "astro:content";
import { dispatchesSchema } from "../schemas/dispatches";

const dispatches = defineCollection({
  type: "content",
  schema: dispatchesSchema,
});

export const collections = { dispatches };
