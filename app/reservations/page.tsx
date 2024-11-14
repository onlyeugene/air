import getCurrenUser from "../actions/get-current-user";
import getReservations from "../actions/get-reservations";
import ClientOnly from "../components/client-only";
import EmptyState from "../components/empy-state";
import ResservationsClient from "./reservations-client";

const ReservationsPage = async () => {
  const currentUser = await getCurrenUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorixed" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have  no reservations on your property."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ResservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;
