import getCurrenUser from "@/app/actions/get-current-user";
import getListingsById from "@/app/actions/get-listing-by-id";
import ClientOnly from "@/app/components/client-only";
import EmptyState from "@/app/components/empy-state";

import ListingClient from "./listing-client";
import getReservations from "@/app/actions/get-reservations";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {

  const listing = await getListingsById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrenUser();


  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
