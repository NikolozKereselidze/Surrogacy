import DonorsList from "@/components/DonorsList";
export default async function FindSpermDonorPage() {
    return (<DonorsList donorType="sperm-donors" title="Find Sperm Donors" apiEndpoint="/api/sperm-donors"/>);
}
