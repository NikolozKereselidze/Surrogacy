import { navigationStructure } from "@/data/navigationStructure";
import type { TFunction } from "i18next";

export const navigationConfig = (t: TFunction) =>
  navigationStructure.map((item) => ({
    ...item,
    label: t(`navigation.${item.key}`),
    submenu: item.submenu
      ? item.submenu.map((s) => ({
          ...s,
          label: t(s.labelKey),
        }))
      : undefined,
  }));
