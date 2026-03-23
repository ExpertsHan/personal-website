import { defineField, defineType } from "sanity";
import { ProjectsIcon } from "@sanity/icons";

export const project = defineType({
  name: "project",
  title: "專案作品",
  type: "document",
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: "title",
      title: "專案名稱",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "排序",
      type: "number",
    }),
    defineField({
      name: "description",
      title: "簡介",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "mainImage",
      title: "專案截圖",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "替代文字",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "技術標籤",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "projectUrl",
      title: "線上連結",
      type: "url",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub 連結",
      type: "url",
    }),
  ],
  orderings: [
    {
      title: "排序",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "mainImage" },
  },
});
