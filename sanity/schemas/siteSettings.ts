import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "網站設定",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "siteTitle",
      title: "網站標題",
      type: "string",
    }),
    defineField({
      name: "siteDescription",
      title: "網站描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ogImage",
      title: "預設社群分享圖片",
      type: "image",
    }),
  ],
  preview: {
    prepare() {
      return { title: "網站設定" };
    },
  },
});
