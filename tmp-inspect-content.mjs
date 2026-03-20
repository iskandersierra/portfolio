import { getCollection } from "astro:content";
const posts = await getCollection("blog");
console.log(posts.map((post) => ({ id: post.id, slug: post.slug, title: post.data.title })));
