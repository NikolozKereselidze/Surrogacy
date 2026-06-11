import DonorsList from "@/components/DonorsList";

function FindSurrogateDonorPage() {
  return (
    <DonorsList
      donorType="surrogate-donors"
      title="Find Surrogates"
      apiEndpoint="/api/surrogate-donors"
    />
  );
}

export default FindSurrogateDonorPage;
