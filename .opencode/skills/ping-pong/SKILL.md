---
name: ping-pong
description: A simple ping-pong skill example that responds to "ping" with "pong". Use this skill to demonstrate how skills work with trigger keywords.
---

# Ping Pong Skill

This is a simple skill to demonstrate how skills work with trigger keywords.

## When to Use This Skill

This skill is triggered when the user says:
- "ping"
- "test ping-pong"
- "demo skill trigger"

## What It Does

When this skill is loaded, the agent will respond with "pong!" when the user says "ping".

## How Trigger Works

A skill can be triggered automatically based on keywords in the user's message, or loaded manually via the `skill` tool.

### Auto Trigger (via keywords)

Skills are automatically discovered when relevant keywords match the `description` or skill name. For example:

- User says: "I need to ping something" → `ping-pong` skill may be suggested
- User says: "show me a ping-pong example" → `ping-pong` skill loads automatically

### Manual Trigger

Load the skill explicitly using:

```
skill({ name: "ping-pong" })
```

## Example Interaction

```
User: ping
Agent: pong! 🏓
```

## Key Concepts

1. **Trigger** - Keywords that cause the skill to be loaded
2. **Manual Trigger** - Explicitly calling the skill tool
3. **Auto Discovery** - OpenCode matches user intent to available skills