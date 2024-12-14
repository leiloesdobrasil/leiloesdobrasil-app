export const getBaseUrl = (): string => {
  return process.env.NODE_ENV === "development"
    ? "https://api.leiloesdobrasil.com.br/api/v1/web"
    : "https://api.leiloesdobrasil.com.br/api/v1/web";
};
