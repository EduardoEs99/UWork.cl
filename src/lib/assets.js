const images = import.meta.glob("@/assets/img/**/*.{png,svg,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
  query: "?url",
});

export function image(path) {
  const url = images[`/src/assets/img/${path}`];
  if (typeof url !== "string") {
    throw new Error(`Image not found in src/assets/img: ${path}`);
  }
  return url;
}
