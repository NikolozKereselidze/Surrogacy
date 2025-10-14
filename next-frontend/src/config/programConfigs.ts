export const PROGRAM_CONFIGS = {
  surrogacyWithOwnGametes: {
    titleKey: "surrogacyWithOwnGametes.title",
    descriptionKey: "surrogacyWithOwnGametes.description",
    sections: [
      {
        titleKey: "surrogacyWithOwnGametes.ivfProcess.title",
        steps: [
          "surrogacyWithOwnGametes.ivfProcess.step1",
          "surrogacyWithOwnGametes.ivfProcess.step2",
          "surrogacyWithOwnGametes.ivfProcess.step3",
        ],
      },
      {
        titleKey: "surrogacyWithOwnGametes.embryoTransfer.title",
        steps: [
          "surrogacyWithOwnGametes.embryoTransfer.step1",
          "surrogacyWithOwnGametes.embryoTransfer.step2",
          "surrogacyWithOwnGametes.embryoTransfer.step3",
        ],
      },
    ],
  },
  surrogacyWithEggDonor: {
    titleKey: "surrogacyWithEggDonor.title",
    descriptionKey: "surrogacyWithEggDonor.description",
    sections: [
      {
        titleKey: "surrogacyWithEggDonor.process.title",
        steps: [
          "surrogacyWithEggDonor.process.step1",
          "surrogacyWithEggDonor.process.step2",
          "surrogacyWithEggDonor.process.step3",
        ],
      },
      {
        titleKey: "surrogacyWithEggDonor.benefits.title",
        steps: [
          "surrogacyWithEggDonor.benefits.step1",
          "surrogacyWithEggDonor.benefits.step2",
          "surrogacyWithEggDonor.benefits.step3",
        ],
      },
    ],
  },
  eggFreezing: {
    titleKey: "eggFreezing.title",
    descriptionKey: "eggFreezing.description",
    sections: [
      {
        titleKey: "eggFreezing.process.title",
        steps: [
          "eggFreezing.process.step1",
          "eggFreezing.process.step2",
          "eggFreezing.process.step3",
        ],
      },
      {
        titleKey: "eggFreezing.benefits.title",
        steps: [
          "eggFreezing.benefits.step1",
          "eggFreezing.benefits.step2",
          "eggFreezing.benefits.step3",
        ],
      },
    ],
  },
  vipConciergeServices: {
    titleKey: "vipConciergeServices.title",
    descriptionKey: "vipConciergeServices.description",
    sections: [
      {
        titleKey: "vipConciergeServices.services.title",
        steps: [
          "vipConciergeServices.services.step1",
          "vipConciergeServices.services.step2",
          "vipConciergeServices.services.step3",
        ],
      },
      {
        titleKey: "vipConciergeServices.benefits.title",
        steps: [
          "vipConciergeServices.benefits.step1",
          "vipConciergeServices.benefits.step2",
          "vipConciergeServices.benefits.step3",
        ],
      },
    ],
  },
} as const;

export type ProgramType = keyof typeof PROGRAM_CONFIGS;

