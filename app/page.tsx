import getCurrenUser from "./actions/get-current-user";
import getListings, { IListingParams } from "./actions/get-listings";
import Container from "./components/container";
import EmptyState from "./components/empy-state";
import ListingCard from "./components/listings/listing-card";


interface HomeProps{
  searchParams: IListingParams
}
const Home = async ({searchParams}: HomeProps) => {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrenUser()

  if(listings?.length === 0) {
    return (
      <div className="pt-24">
        <EmptyState showReset />
      </div>
    )
  }

  return (
    <Container>
      <div className="pt-24 grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings?.map((listing) =>(
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
}

export default Home
