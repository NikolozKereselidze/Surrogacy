import DonorsList from "@/components/DonorsList";

function FindSurrogateDonorPage() {
  return (
    <DonorsList
      donorType="surrogate-donors"
      title="Find Surrogates"
      apiEndpoint="http://localhost:3000/api/surrogate-donors"
    />
  );
}

export default FindSurrogateDonorPage;
