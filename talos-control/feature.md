# Feature Specification: Enhancing the Talos AI Engineering Engine

## 1. Stakeholder & User Intent

### Problem Statement
Software development is shifting from autocomplete extensions to fully agentic developer platforms. However, current offerings lock developers into proprietary cloud ecosystems or closed-source IDE forks, raising concerns about data privacy, rising cloud API costs, and context saturation. 

### Value Proposition
The **Talos AI Engineering Engine** will be an IDE-agnostic, local-first autonomous developer agent orchestrator. It maintains complete compatibility with Google’s agent-first **Antigravity** platform while providing first-class, seamless integration for mainstream editors (VS Code and Cursor). This enhancement focuses on core capabilities to optimize cost via caching, guarantee private execution, and secure platform-level resilience in Linux environments.

### Roadmap Alignment
This represents the core development plan for Talos v2.0, establishing data privacy, cost control, and crash resilience as primary competitive advantages.

---

## 2. Functional Requirements

### Universal Integration & Auto-Config
- **FR-01: Universal MCP Server & Auto-Config Installer**:
  - The Talos engine must run as a standard Model Context Protocol (MCP) server.
  - On startup or via a programmatic command line, the engine must auto-detect the host's active IDE configurations.
  - For **Antigravity**, it must automatically inject server definition blocks into `~/.gemini/config/mcp_config.json`, including custom `serverUrl`, OAuth scopes, and security header definitions.
  - For **VS Code / Cursor**, it must automatically inject matching stdio-based transport configurations in the respective global storage configuration directories.

### Cost Mitigation & Prompt Caching
- **FR-02: Strict Cache-Optimized Prompt Assembly**:
  - The prompting engine must enforce a strict prefix order:
    1. Static System Instructions & Identity
    2. Constant Tool/API Schema Definitions
    3. Static Project Architecture & Rules
    4. Explicit Cache Breakpoints (e.g., Anthropic `cache_control` markers)
    5. Dynamic User Intent / Queries
  - The prompting engine must isolate varying tool outputs by placing them after a strict dynamic separator (Exclude Tool Results Caching strategy) to avoid invalidating the static KV cache prefixes.

### Local-First & Privacy Governance
- **FR-03: Local-First Hybrid Execution & Offline Fallbacks**:
  - The engine must support quantized offline models (e.g., Gemma 2B-IT in 4-bit) running on local GPUs for lightweight tasks (routine code parsing, structural audits, syntax checks).
  - The engine must support a local vector-based semantic cache to resolve repeated or highly similar developer queries offline, bypassing external APIs completely.
  - Safe local sandbox: Enforce a strict "deny-by-default" local Supervisor-Hypervisor guardrail policy intercepting high-risk terminal execution and recursive file deletions.

### SDK-Driven Context Compaction
- **FR-04: SDK Hooks for Dynamic Context Compaction**:
  - Integrate with the lifecycle hooks of the Antigravity SDK to monitor active context size ($C_{active}$) in real-time.
  - Automatically trigger a compaction routine if $C_{active}$ exceeds the user's token budget ($B_{token}$).
  - Compaction must spawn a background sub-agent to summarize intermediate steps and past tool execution histories, keeping only active code diffs and primary system architecture guidelines.

### Platform Resiliency
- **FR-05: Multi-Model Resilient Recovery Pipeline**:
  - Before executing any turn or high-risk tool call, the engine must serialize and cache active workspace state (dirty file buffers and the task queue).
  - If the primary model (Gemini) encounters an unexpected crash or API termination error on Ubuntu/Linux, the engine must automatically restore the active workspace, Compact the context, and retry the turn utilizing a secondary model (Claude 3.5 Sonnet or local offline Gemma).

---

## 3. Non-Functional Requirements

- **NFR-01 (Performance)**: Automated IDE configuration detection and config injection must complete under 1.5 seconds.
- **NFR-02 (Cost/Resource Efficiency)**: Cache-optimized prompting must achieve an 80%+ KV cache hit rate in multi-turn sessions, reducing API costs by 75-90%.
- **NFR-03 (Resiliency)**: Workspace state serialization must complete under 200ms, and recovery failover must execute within 5 seconds with 0% data/work loss.
- **NFR-04 (Data Privacy)**: The local hybrid model must isolate sensitive codebase segments by executing them on local hardware without leaving the local machine when the privacy mode is active.
- **NFR-05 (Security)**: Sandboxed command execution must intercept all shell commands, halting and prompting for confirmation on any destructive actions.

---

## 4. MVP Scoping & Roadmap

### MVP Scope (P0 - Must Have)
- **Universal IDE config generation and auto-injection**:
  - Automatic detection of active Antigravity (`mcp_config.json`) and VS Code/Cursor installations.
  - Code generation to inject Talos MCP server definitions (JSON formatting).
- **Cache-Optimized Prompt Construction**:
  - Implementation of the structured cache-friendly compiler with explicit Claude `cache_control` markers and Gemini cache boundaries.
- **Multi-Model Recovery & Failover Pipeline**:
  - Serialization of dirty file states and active task queue.
  - Try-catch handler around the model execution, routing failovers to Claude/secondary provider in the event of primary model termination.

### Phase 2 (P1 - Should Have)
- **SDK Context Compaction**:
  - Dynamic monitoring of context limits and background summarization hooks using the Antigravity SDK.
- **Local-First quantized inference & semantic caching**:
  - Setting up the quantized offline local Gemma 2B execution flow for minor operations and vector-based semantic cache lookups.

### Phase 3 (P2 - Nice to Have)
- **Supervisor-Hypervisor Safety Guardrails**:
  - Declarative policy rules with shell interception and interactive terminal confirmation dialogs.
- **AppArmor Linux tarball installer**:
  - Fully automated launcher, URI registration, and AppArmor Electron sandbox helper script.

### MVP Effort Estimate
- Development: ~8 story points
- Testing: ~3 story points
- Integration / Deployment: ~2 story points

---

## 5. Story Backlog & Acceptance Criteria

### US-001: Automatic Cross-IDE MCP Configuration Injection
- **User Story**: As a developer, I want the Talos engine to automatically detect my active IDE environments (Antigravity and VS Code) and configure itself as an MCP server, so that I can use it instantly without manual config edits.
- **Acceptance Criteria**:
  - **Given** a system with VS Code installed, **when** the Talos installer runs, **then** the `cline_mcp_settings.json` is updated with the `talos-engineering-engine` server definition.
  - **Given** an Antigravity setup, **when** the Talos installer runs, **then** the `~/.gemini/config/mcp_config.json` is successfully updated with the correct HTTP/SSE serverUrl and OAuth configuration blocks.
- **Edge Cases**:
  - Config file does not exist or is malformed: Talos must create a new valid JSON file or gracefully merge with existing JSON without corruption.
- **Definition of Done**:
  - MCP server auto-detection code fully implemented and tested.
  - Successfully updates config files in mock IDE environments.
  - Documentation in README.md updated.

### US-002: Cache-Optimized Prompt Assembly
- **User Story**: As a budget-conscious developer, I want the Talos engine to structure prompts in a strict sequence that maximizes provider-side prefix caching, so that I can reduce API costs and latency.
- **Acceptance Criteria**:
  - **Given** a multi-turn engineering session, **when** prompts are compiled, **then** the system instructions, tool schemas, and static codebase documentation are placed first.
  - **Given** an Anthropic Claude connection, **when** prompts are compiled, **then** explicit `cache_control` markers are placed at eligible block boundaries.
  - **Given** a tool result output, **when** prepended to the dynamic session part, **then** a strict separator is used to isolate it from the heavy static prefix context.
- **Edge Cases**:
  - System guidelines changing mid-session: Dynamic guidelines must be handled outside the static cached block to prevent cache invalidation.
- **Definition of Done**:
  - Prompt compiler module implemented.
  - Unit tests validating the ordering and presence of `cache_control` markers.

### US-003: Multi-Model State Preservation and Recovery Pipeline
- **User Story**: As a developer on a Linux machine, I want the Talos engine to handle unexpected model/API crashes during a turn without losing my active changes, so that my workflow remains resilient and continuous.
- **Acceptance Criteria**:
  - **Given** an active development turn, **when** a tool is about to be executed, **then** the engine serializes and caches the workspace files and task queue state.
  - **Given** a primary model (Gemini) API failure, **when** an error is caught, **then** the engine deserializes the workspace back to its pre-turn state and immediately retries using a secondary model (Claude).
- **Edge Cases**:
  - Failover model also fails: Engine should gracefully fall back to a local quantized model or report a clear error to the user without leaving the codebase in a corrupted state.
- **Definition of Done**:
  - Workspace state serializer implemented.
  - Recovery pipeline with error-catching and fallback model routing implemented.
  - Automated tests simulating API crash and validating state recovery.
