import pino from "pino";

type LogLevel = "info" | "warn" | "error";
type LogFields = {
  requestId?: string;
  role?: "admin" | "donor";
  resource?: string;
  action?: string;
  profileId?: string;
  status?: number;
  durationMs?: number;
  reason?: string;
};

const configured = process.env.LOG_LEVEL;
const logger = pino({
  level: configured === "warn" || configured === "error" ? configured : "info",
  base: undefined,
  timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
  formatters: { level: (label) => ({ level: label }) },
  redact: { paths: ["password", "token", "cookie", "authorization", "body", "headers"], remove: true },
});

// Explicit allowlist: never serialize requests, bodies, headers or raw errors.
export function logEvent(level: LogLevel, event: string, fields: LogFields = {}) {
  if (!logger.isLevelEnabled(level)) return;
  const entry: Record<string, string | number> = { event };
  for (const key of ["requestId", "role", "resource", "action", "profileId", "status", "durationMs", "reason"] as const) {
    const value = fields[key];
    if (typeof value === "string") entry[key] = value.slice(0, 120);
    else if (typeof value === "number" && Number.isFinite(value)) entry[key] = value;
  }
  try {
    logger[level](entry);
  } catch {
    // Logging must never turn a committed operation into a failed request.
  }
}
