export async function GET() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/logno-dev/barchy/refs/heads/main/boot.sh');

    if (!response.ok) {
      throw new Error(`GitHub responded with ${response.status}`);
    }

    const content = await response.text();

    return new Response(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      }
    });
  } catch (error) {
    return new Response('Error fetching script', { status: 500 });
  }
}
