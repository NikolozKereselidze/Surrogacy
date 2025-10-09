import DonorsList from "@/components/DonorsList";

export default async function FindSpermDonorPage() {
  return (
    <DonorsList
      donorType="sperm-donors"
      title="Find Sperm Donors"
      apiEndpoint={`${process.env.API_BASE_URL}/api/sperm-donors`}
    />
  );
}
