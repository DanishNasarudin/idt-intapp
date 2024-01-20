export async function GET() {
  // Return the current version of the application
  return new Response(JSON.stringify({ version: process.env.APP_VERSION }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
