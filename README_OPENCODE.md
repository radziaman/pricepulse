# OpenCode AI Assistant Setup

This workspace has been configured with **OpenCode AI**, a terminal-native pair programmer.

## Getting Started

1.  **Open the TUI**: Run the following command in your terminal:
    ```powershell
    opencode
    ```
2.  **Authenticate**: Once inside the TUI, connect to your AI model providers:
    ```text
    /connect
    ```
3.  **Active Plugins**: The following plugins are configured in `opencode.json`:
    - `opencode-mem`: Persistent memory across sessions.
    - `opencode-notify`: Native OS notifications for task completion.
    - `opencode-smart-title`: Automatic session naming.

## VS Code Integration

We recommend installing the following extensions (suggested in `.vscode/extensions.json`):
- **OpenCode Companion**: Integrates the CLI directly into your editor.
- **WakaTime**: For tracking your coding activity.
- **GitLens**: For better context and git history visualization.

## Prerequisites

- **Bun**: Installed and used for plugin management.
- **OpenCode CLI**: Installed globally via npm.

Happy coding!
