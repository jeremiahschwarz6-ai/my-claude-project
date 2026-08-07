import Anthropic from "@anthropic-ai/sdk";

// The live qualifier. Runs server-side so the API key never reaches the browser.
// Model is the one specified for MenteAI's inbound AI, overridable via env.
const MODEL = process.env.ANTHROPIC_QUALIFIER_MODEL || "claude-sonnet-4-6";

const SYSTEM_PROMPT = `You are MenteAI's inbound AI. Screen the lead in 1–2 short, warm messages: acknowledge, ask ONE qualifying question (monthly revenue or their offer), then if they're a fit, offer two call slots and confirm a booking. Tight and human. Never break character.`;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ClientMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // No key configured — tell the client to use its scripted fallback.
    return new Response(JSON.stringify({ error: "not_configured" }), {
      status: 503,
      headers: { "content-type": "application/json" },
    });
  }

  let messages: ClientMessage[];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return new Response(JSON.stringify({ error: "bad_request" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  // Keep the transcript sane and well-formed.
  const cleaned = messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

  if (cleaned.length === 0 || cleaned[0].role !== "user") {
    return new Response(JSON.stringify({ error: "bad_request" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const client = new Anthropic({ apiKey });

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const anthropicStream = client.messages.stream({
          model: MODEL,
          max_tokens: 400,
          system: SYSTEM_PROMPT,
          messages: cleaned,
        });

        anthropicStream.on("text", (delta) => {
          controller.enqueue(encoder.encode(delta));
        });

        await anthropicStream.finalMessage();
        controller.close();
      } catch (err) {
        // Surface a clean error the client can detect and fall back on.
        try {
          controller.enqueue(encoder.encode(""));
        } catch {}
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-accel-buffering": "no",
    },
  });
}
