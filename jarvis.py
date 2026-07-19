"""JARVIS — a personal AI assistant starter, powered by Claude.

Run it:
    export ANTHROPIC_API_KEY="sk-ant-..."
    pip install -r requirements.txt
    python jarvis.py

This is the smallest useful skeleton of a "Jarvis": a conversation loop with
a persona, tools it can call on its own (time, persistent memory, local file
reading), and multi-turn context. See JARVIS_GUIDE.md for how to grow it into
a voice-controlled, always-on assistant.
"""

import json
import os
from datetime import datetime
from pathlib import Path

import anthropic
from anthropic import beta_tool

MODEL = "claude-opus-4-8"
MEMORY_FILE = Path(__file__).parent / "jarvis_memory.json"
WORKSPACE = Path(__file__).parent.resolve()

SYSTEM_PROMPT = """\
You are JARVIS, a personal AI assistant. Be capable, concise, and a little dry.
Address the user as "sir" or by name if you know it from memory.

You have tools: check the current time, remember facts across sessions, recall
everything you've remembered, and read files in the project workspace. Use your
memory tool proactively — when the user tells you something worth keeping
(their name, preferences, ongoing projects), store it without being asked.
At the start of a conversation, recall your memory to re-establish context.
"""


def _load_memory() -> dict:
    if MEMORY_FILE.exists():
        return json.loads(MEMORY_FILE.read_text())
    return {}


@beta_tool
def get_current_time() -> str:
    """Get the current local date and time."""
    return datetime.now().strftime("%A, %B %d %Y, %H:%M:%S")


@beta_tool
def remember(key: str, value: str) -> str:
    """Store a fact in persistent memory so it survives across sessions.

    Args:
        key: Short label for the fact, e.g. "user_name" or "current_project".
        value: The fact to remember.
    """
    memory = _load_memory()
    memory[key] = value
    MEMORY_FILE.write_text(json.dumps(memory, indent=2))
    return f"Remembered {key!r}."


@beta_tool
def recall() -> str:
    """Recall everything stored in persistent memory."""
    memory = _load_memory()
    if not memory:
        return "Memory is empty."
    return json.dumps(memory, indent=2)


@beta_tool
def read_workspace_file(path: str) -> str:
    """Read a text file from the project workspace.

    Args:
        path: Path relative to the project directory, e.g. "README.md".
    """
    target = (WORKSPACE / path).resolve()
    if not target.is_relative_to(WORKSPACE):
        return "Error: path escapes the workspace."
    if not target.is_file():
        return f"Error: {path} not found."
    return target.read_text()[:20_000]


TOOLS = [get_current_time, remember, recall, read_workspace_file]


def run_turn(client: anthropic.Anthropic, messages: list) -> None:
    """Run one assistant turn, letting Claude call tools until it's done."""
    runner = client.beta.messages.tool_runner(
        model=MODEL,
        max_tokens=16000,
        system=SYSTEM_PROMPT,
        thinking={"type": "adaptive"},
        tools=TOOLS,
        messages=messages,
    )
    for message in runner:
        # Mirror history so the next turn has full context.
        messages.append({"role": "assistant", "content": message.content})
        tool_response = runner.generate_tool_call_response()
        if tool_response is not None:
            messages.append(tool_response)
        for block in message.content:
            if block.type == "text" and block.text.strip():
                print(f"\nJARVIS: {block.text}\n")


def main() -> None:
    client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY from the environment
    messages: list = []
    print("JARVIS online. Type 'exit' to quit.\n")
    while True:
        try:
            user_input = input("You: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nJARVIS: Powering down, sir.")
            break
        if not user_input:
            continue
        if user_input.lower() in {"exit", "quit"}:
            print("JARVIS: Powering down, sir.")
            break
        messages.append({"role": "user", "content": user_input})
        run_turn(client, messages)


if __name__ == "__main__":
    main()
