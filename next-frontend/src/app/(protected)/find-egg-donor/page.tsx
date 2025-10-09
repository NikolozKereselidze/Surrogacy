import DonorsList from "@/components/DonorsList";

export default async function FindEggDonorPage() {
  return (
    <DonorsList
      donorType="egg-donors"
      title="Find Egg Donors"
      apiEndpoint={`${process.env.API_BASE_URL}/api/egg-donors`}
    />
  );
}
