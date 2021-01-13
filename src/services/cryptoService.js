import http from "./httpService";

const cryptosUrl = "/cryptos";

export async function getCryptos() {
  const { data } = await http.get(cryptosUrl);
  return data;
}
