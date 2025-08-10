export async function POST(req: Request) {
  try {
    const { name, email, country, trek, dates, message } = await req.json();

    const lines = [
      `Name: ${name || "-"}`,
      `Email: ${email || "-"}`,
      `Country: ${country || "-"}`,
      `Preferred: ${trek || "-"}`,
      `Dates: ${dates || "-"}`,
      "---",
      message || ""
    ];

    const payload = lines.join("\n").trim();

    const res = await fetch("https://ntfy.so/airplusnepal", {
      method: "POST",
      headers: {
        Priority: "5",
        Title: "AirPlus Nepal — New Trip Inquiry",
        Tags: "airplane,nepal,mailbox",
      },
      body: payload,
      // Do not cache to ensure instant delivery
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      return new Response(JSON.stringify({ ok: false, error: text }), { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: String(error) }), { status: 500 });
  }
}


