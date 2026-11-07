# AI SaaS Project

Frontend + Backend AI SaaS system.

Deploy backend on Render.
Deploy frontend via GitHub Pages.

## Configuration and limitations
Set FRONTEND_ORIGINS on the backend to a comma-separated list of trusted frontend origins, such as your GitHub Pages origin. Without it, cross-origin browser requests are blocked. The prediction endpoint is a placeholder that echoes input, not a connected AI service. The JSON-file user store and API-key handling are not production-grade.
