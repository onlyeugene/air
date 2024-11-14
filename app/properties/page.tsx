import getCurrenUser from "../actions/get-current-user";
import getListings from "../actions/get-listings";
import ClientOnly from "../components/client-only";
import EmptyState from "../components/empy-state";
import PropertiesClient from "./properties-client";

const PropeertiesPage = async () => {
  const currentUser = await getCurrenUser();

  if(!currentUser) {
    return(
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="PLease login"
        />
      </ClientOnly>
    )
  }

  const listings = await getListings({
    userId: currentUser.id
  })

  if(listings.length === 0){
    return <ClientOnly>
      < EmptyState title="No properties found" 
      subtitle="Looks like you have no properties"/>
    </ClientOnly>
  }

  return <ClientOnly>
    <PropertiesClient
     listings={listings}
      currentUser={currentUser}
    />
  </ClientOnly>
};

export default PropeertiesPage;
