// Environment configuration
export const config = {
  api: {
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://52.28.45.158:7100/api",
  },
} as const;
