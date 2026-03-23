import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const about = defineType({
  name: "about",
  title: "關於我",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "heading",
      title: "頁面標題",
      type: "string",
    }),
    defineField({
      name: "profileImage",
      title: "個人照片",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "自我介紹",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "skills",
      title: "技能列表",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "email",
      title: "聯絡信箱",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "社群連結",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "平台名稱",
              type: "string",
            }),
            defineField({
              name: "url",
              title: "連結",
              type: "url",
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "關於我" };
    },
  },
});
