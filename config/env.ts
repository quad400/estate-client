export const envConfig = {
  base_url: process.env.NEXT_PUBLIC_BASE_URL ?? "",
  mongodb: {
    uri: process.env.MONGODB_URI ?? "",
  },
};
