import http from "http";

export async function getServerSideProps(context:any) {
  const { req } = context;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const url = `http://ip-api.com/json/${ip}?fields=city,countryCode,lat,lon`;

  const response = await new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(JSON.parse(data)));
    }).on("error", (err) => reject(err));
  });

  return {
    props: {
      location: response,
    },
  };
}
