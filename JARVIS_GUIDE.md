# Building Your Own Jarvis

A Jarvis-style assistant is four things layered together:

1. **A brain** — an LLM (Claude) with a persona and reasoning ability
2. **Tools** — actions it can take in the real world (check time, control devices, send email, run code)
3. **Memory** — context that survives across conversations
4. **An interface** — text to start, voice and always-on later

This repo contains **Level 1** working out of the box. The levels below show how to grow it.

---

## Level 1 — What's in this repo (start here)

`jarvis.py` is a complete text-based Jarvis:

- **Persona** via a system prompt (dry wit included)
- **Agentic tool use** via the Anthropic SDK's tool runner — Claude decides when to call
  `get_current_time`, `remember`, `recall`, or `read_workspace_file`, and the SDK runs
  the loop automatically
- **Persistent memory** — facts are stored in `jarvis_memory.json` and survive restarts.
  Tell it your name once; it greets you next session.
- **Multi-turn context** — full conversation history each turn

Run it:

```bash
export ANTHROPIC_API_KEY="sk-ant-..."   # get one at platform.claude.com
pip install -r requirements.txt
python jarvis.py
```

### How the core works

The heart of any Jarvis is the **agentic loop**: send the conversation + tool definitions
to Claude → Claude replies with either text or a tool call → run the tool, feed the result
back → repeat until Claude answers in plain text. The SDK's `tool_runner` does this loop
for you; each `@beta_tool`-decorated Python function becomes a tool Claude can call, with
the schema generated from its signature and docstring.

Adding a capability = writing one Python function:

```python
@beta_tool
def set_timer(minutes: int, label: str) -> str:
    """Set a countdown timer.

    Args:
        minutes: How long the timer should run.
        label: What the timer is for.
    """
    # your implementation
    return f"Timer '{label}' set for {minutes} minutes."
```

Append it to `TOOLS` and Jarvis can now do it. That's the whole extension model.

## Level 2 — Real-world powers (tools that matter)

Ideas, roughly in order of payoff:

- **Web search** — add the server-side tool `{"type": "web_search_20260209", "name": "web_search"}`
  to the `tools` list (no code to write; it runs on Anthropic's servers)
- **Calendar / email** — wrap the Google Calendar / Gmail APIs in `@beta_tool` functions
- **Smart home** — call the Home Assistant REST API from a tool ("Jarvis, lights off")
- **Run code / shell** — powerful but dangerous: gate destructive commands behind a
  confirmation prompt inside the tool function before executing
- **MCP servers** — instead of hand-writing every integration, connect to
  [Model Context Protocol](https://modelcontextprotocol.io/) servers (GitHub, Slack,
  Notion, Home Assistant and hundreds more exist already)

## Level 3 — Voice

Wire two extra pieces around the same loop:

- **Speech-to-text**: `faster-whisper` (local, free) or a cloud STT API, plus a wake-word
  detector like `openwakeword` or Picovoice Porcupine ("Hey Jarvis…")
- **Text-to-speech**: `piper` (local, fast) or ElevenLabs (best quality)

The flow becomes: wake word → record → transcribe → `run_turn()` → speak the reply.
Nothing about the brain changes.

## Level 4 — Always-on and proactive

A real Jarvis doesn't wait to be spoken to:

- **Scheduled runs** — morning briefing, calendar reminders (cron + a script that calls
  the same loop, or Anthropic's Managed Agents scheduled deployments for a fully hosted
  version)
- **Long-running autonomy** — for a Jarvis that can use a full computer (files, bash,
  browsing), look at the [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk),
  which is Claude Code's harness packaged as a library: built-in file/bash/search tools,
  permissions, and subagents, so you write a prompt instead of a loop.

## Practical notes

- **Model**: this starter uses `claude-opus-4-8` (the recommended default). Swap to
  `claude-haiku-4-5` for cheap/fast experiments.
- **Cost control**: prompt caching makes long system prompts nearly free on repeat turns;
  add `cache_control: {"type": "ephemeral"}` to the system block once your prompt grows.
- **Safety**: any tool with side effects (email, purchases, deletes) should confirm with
  you before executing — the tool function itself is the right place for that gate.
- **Secrets**: keep API keys in environment variables, never in code or in memory files.
