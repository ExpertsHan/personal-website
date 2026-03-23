import { client } from "./client";

// 取得網站設定
export async function getSiteSettings() {
  return client.fetch(
    `*[_type == "siteSettings"][0]{
      siteTitle,
      siteDescription,
      ogImage
    }`
  );
}

// 取得關於我
export async function getAbout() {
  return client.fetch(
    `*[_type == "about"][0]{
      heading,
      profileImage,
      bio,
      skills,
      email,
      socialLinks
    }`
  );
}

// 取得所有專案
export async function getProjects() {
  return client.fetch(
    `*[_type == "project"] | order(order asc){
      _id,
      title,
      description,
      mainImage,
      tags,
      projectUrl,
      githubUrl
    }`
  );
}

// 取得所有文章
export async function getPosts() {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc){
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage
    }`
  );
}

// 取得單篇文章
export async function getPost(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage,
      body
    }`,
    { slug }
  );
}

// 首頁用：取得最新 3 個專案和 3 篇文章
export async function getHomeData() {
  return client.fetch(
    `{
      "projects": *[_type == "project"] | order(order asc)[0...3]{
        _id,
        title,
        description,
        mainImage,
        tags,
        projectUrl,
        githubUrl
      },
      "posts": *[_type == "post"] | order(publishedAt desc)[0...3]{
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        mainImage
      }
    }`
  );
}
