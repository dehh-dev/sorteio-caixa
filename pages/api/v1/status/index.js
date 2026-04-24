export default async function handler(req, res) {
  const statusCode = res.statusCode;
  res.status(statusCode);
  res.set("Content-Type", "application/json");
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
}
