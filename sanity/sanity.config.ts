import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

const singletonTypes = new Set(["about", "siteSettings"]);

export default defineConfig({
  name: "default",
  title: "一笑落塵",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .id("root")
          .title("內容管理")
          .items([
            // Singleton: 網站設定
            S.listItem()
              .title("網站設定")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            // Singleton: 關於我
            S.listItem()
              .title("關於我")
              .id("about")
              .child(
                S.document().schemaType("about").documentId("about")
              ),
            S.divider(),
            // Collection: 部落格文章
            S.documentTypeListItem("post").title("部落格文章"),
            // Collection: 專案作品
            S.documentTypeListItem("project").title("專案作品"),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action &&
              ["publish", "discardChanges", "restore"].includes(action)
          )
        : input,
  },
});
