import { DonorConfig } from "@/types/donor";

export const donorConfigs: Record<string, DonorConfig> = {
  "egg-donors": {
    title: "Egg Donors",
    apiEndpoint: "/api/egg-donors",
    iconComponent: "FaUser",
    color: "#6c3cff",
  },
  "surrogates": {
    title: "Surrogates",
    apiEndpoint: "/api/surrogate-donors",
    iconComponent: "MdFamilyRestroom",
    color: "#ff6b6b",
  },
  "sperm-donors": {
    title: "Sperm Donors",
    apiEndpoint: "/api/sperm-donors",
    iconComponent: "FaUserPlus",
    color: "#4ecdc4",
  },
};
