import DonorsList from "@/components/DonorsList";

function FindSurrogateDonorPage() {
  return (
    <DonorsList
      donorType="surrogate-donors"
      title="Find Surrogates"
      apiEndpoint={`${process.env.API_BASE_URL}/api/surrogate-donors`}
    />
  );
}

export default FindSurrogateDonorPage;
