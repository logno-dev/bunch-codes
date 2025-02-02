import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders"; // Not available with legacy API

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

export const collections = { blog };
