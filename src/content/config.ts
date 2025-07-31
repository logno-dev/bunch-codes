import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders"; // Not available with legacy API

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val))
      .optional(),
    pinned: z
      .boolean()
      .optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean(),
  }),
});

export const collections = { blog };
