import { randomUUID } from "node:crypto";
import type { Request, Response, NextFunction } from "express";
import { logEvent } from "../lib/logger.js";

export function requestLogging(req: Request, res: Response, next: NextFunction) {
  const requestId = randomUUID();
  const started = performance.now();
  // Capture before nested Express routers temporarily strip their mount path.
  const pathname = req.path;
  res.setHeader("X-Request-ID", requestId);
  res.locals.requestId = requestId;
  res.once("finish", () => {
    const status = res.statusCode;
    const fields = { requestId, status, durationMs: Math.round(performance.now() - started) };
    const auth = pathname.match(/^\/api\/auth\/(admin|donor)\/(login|logout|check-token)\/?$/);
    const profile = pathname.match(/^\/api\/(egg-donors|sperm-donors|surrogate-donors)(?:\/([a-f0-9-]{36}))?\/?$/i);
    if (auth && req.method === "POST" && auth[2] !== "check-token") {
      logEvent(status >= 500 ? "error" : status >= 400 ? "warn" : "info", `auth.${auth[2]}`, {
        ...fields, role: auth[1] as "admin" | "donor",
        reason: status === 429 ? "rate_limited" : status === 401 ? "invalid_credentials" : status >= 500 ? "service_unavailable" : status >= 400 ? "rejected" : "success",
      });
    } else if (profile && ["POST", "PUT", "DELETE"].includes(req.method)) {
      logEvent(status >= 500 ? "error" : status >= 400 ? "warn" : "info", "profile.change", {
        ...fields, resource: profile[1], profileId: res.locals.profileId ?? profile[2], role: "admin",
        action: req.method === "POST" ? "create" : req.method === "PUT" ? "update" : "delete",
        reason: status >= 400 ? "rejected" : "success",
      });
    } else if (status >= 500) {
      logEvent("error", "request.failed", {
        ...fields, resource: auth ? "auth" : profile ? profile[1] : "api",
        action: req.method,
      });
    }
  });
  next();
}
