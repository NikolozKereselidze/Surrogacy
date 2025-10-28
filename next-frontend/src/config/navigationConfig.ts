// /config/navigation.ts
import type { TFunction } from "i18next";

export const navigationConfig = (t: TFunction) => [
  {
    key: "aboutUs",
    label: t("navigation.aboutUs"),
    submenu: [
      { href: "/our-mission", label: t("submenu.aboutUs.ourMission") },
      { href: "/who-we-are", label: t("submenu.aboutUs.whoWeAre") },
      { href: "/our-team", label: t("submenu.aboutUs.ourTeam") },
      { href: "/why-choose-us", label: t("submenu.aboutUs.whyChooseUs") },
    ],
  },
  {
    key: "surrogates",
    label: t("navigation.surrogates"),
    submenu: [
      {
        href: "/surrogacy-process",
        label: t("submenu.surrogates.surrogacyProcess"),
      },
      {
        href: "/who-can-become-a-surrogate",
        label: t("submenu.surrogates.whoCanBecome"),
      },
      {
        href: "/surrogate-screening",
        label: t("submenu.surrogates.screeningProcess"),
      },
    ],
  },
  {
    key: "intendedParents",
    label: t("navigation.intendedParents"),
    submenu: [
      {
        href: "/who-can-become-a-parent",
        label: t("submenu.intendedParents.whoCanBecome"),
      },
      {
        href: "/parent-screening",
        label: t("submenu.intendedParents.screeningProcess"),
      },
      {
        href: "/support-and-counselling",
        label: t("submenu.intendedParents.compensationSupport"),
      },
    ],
  },
  {
    key: "eggDonors",
    label: t("navigation.eggDonors"),
    submenu: [
      { href: "/why-become-a-donor", label: t("submenu.eggDonors.whyBecome") },
      {
        href: "/who-can-become-a-donor",
        label: t("submenu.eggDonors.whoCanApply"),
      },
    ],
  },
  {
    key: "programs",
    label: t("navigation.programs"),
    submenu: [
      {
        href: "/surrogacy-with-own-gametes",
        label: t("submenu.programs.ownGametes"),
      },
      {
        href: "/surrogacy-with-egg-donor",
        label: t("submenu.programs.eggDonor"),
      },
      {
        href: "/egg-freezing-preservation",
        label: t("submenu.programs.eggFreezing"),
      },
      {
        href: "/vip-concierge-services",
        label: t("submenu.programs.vipServices"),
      },
    ],
  },
  {
    key: "faq",
    label: t("navigation.faq"),
    href: "/faq", // no submenu
  },
];
