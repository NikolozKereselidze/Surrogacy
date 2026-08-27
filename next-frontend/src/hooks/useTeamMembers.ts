"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/hooks/useLocale";
import type { TeamMember } from "@/types/teamMember";
import { normalizeTeamLocale } from "@/lib/teamMembers";

export function useTeamMembers(featured = false) {
  const locale = normalizeTeamLocale(useLocale());
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const query = new URLSearchParams({ locale });
    if (featured) query.set("featured", "true");
    setLoading(true);
    fetch(`/api/team-members?${query}`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : []))
      .then((data) => setMembers(data))
      .catch((error) => {
        if (error.name !== "AbortError") setMembers([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [featured, locale]);

  return { members, loading };
}
