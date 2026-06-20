import DonorsList from "@/components/DonorsList";
export default async function FindEggDonorPage() {
    return (<DonorsList donorType="egg-donors" title="Find Egg Donors" apiEndpoint="/api/egg-donors"/>);
}
