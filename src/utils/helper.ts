export const getBaseUrl = (): string => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:4000/api/v1/web"
    : "https://api.leiloesdobrasil.com.br/api/v1/web";
};
