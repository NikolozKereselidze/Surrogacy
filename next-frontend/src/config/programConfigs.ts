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
    questions: [
      {
        questionKey: "surrogacyWithOwnGametes.question1.q",
        answerKey: "surrogacyWithOwnGametes.question1.a",
      },
      {
        questionKey: "surrogacyWithOwnGametes.question2.q",
        answerKey: "surrogacyWithOwnGametes.question2.a",
      },
      {
        questionKey: "surrogacyWithOwnGametes.question3.q",
        answerKey: "surrogacyWithOwnGametes.question3.a",
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
    questions: [
      {
        questionKey: "surrogacyWithEggDonor.question1.q",
        answerKey: "surrogacyWithEggDonor.question1.a",
      },
      {
        questionKey: "surrogacyWithEggDonor.question2.q",
        answerKey: "surrogacyWithEggDonor.question2.a",
      },
      {
        questionKey: "surrogacyWithEggDonor.question3.q",
        answerKey: "surrogacyWithEggDonor.question3.a",
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
    questions: [
      {
        questionKey: "eggFreezing.question1.q",
        answerKey: "eggFreezing.question1.a",
      },
      {
        questionKey: "eggFreezing.question2.q",
        answerKey: "eggFreezing.question2.a",
      },
      {
        questionKey: "eggFreezing.question3.q",
        answerKey: "eggFreezing.question3.a",
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
    questions: [
      {
        questionKey: "vipConciergeServices.question1.q",
        answerKey: "vipConciergeServices.question1.a",
      },
      {
        questionKey: "vipConciergeServices.question2.q",
        answerKey: "vipConciergeServices.question2.a",
      },
      {
        questionKey: "vipConciergeServices.question3.q",
        answerKey: "vipConciergeServices.question3.a",
      },
    ],
  },
} as const;

export type ProgramType = keyof typeof PROGRAM_CONFIGS;
