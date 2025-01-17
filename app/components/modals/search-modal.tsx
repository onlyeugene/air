"use client";

import useSearchModal from "@/app/hooks/use-search-modal";
import Modal from "./modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import CountrySelect, { CountrySelectValue } from "../inputs/country-select";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../heading";
import Calendar from "../inputs/calendar";
import Counter from "../inputs/counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(() => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updateQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updateQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updateQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updateQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    step,
    searchModal,
    location,
    roomCount,
    guestCount,
    router,
    bathroomCount,
    dateRange,
    onNext,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = <div className="flex flex-col gap-8">
    <Heading 
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
    />
    <CountrySelect 
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
    />
    <hr />
    {/* <Map center={location?.latlng} /> */}
  </div>

  if(step === STEPS.DATE){
    bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="When do you plan to go?"
                subtitle="Make sure everyone is free!"
            />
            <Calendar 
                value={dateRange}
                onChange={(value) => setDateRange(value.selection)}
            />
        </div>
    )
  }

  if(step === STEPS.INFO){
    bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="More information"
                subtitle="Find your perfect place"
            />
            <Counter 
                title="Guests"
                subtitle="How many guests are coming?"
                value={guestCount}
                onChange={(value) => setGuestCount(value)}
            />
            <Counter 
                title="Rooms"
                subtitle="How many rooms do you need?"
                value={roomCount}
                onChange={(value) => setRoomCount(value)}
            />
            <Counter 
                title="Bathrooms"
                subtitle="How many bathrooms do you need?"
                value={bathroomCount}
                onChange={(value) => setBathroomCount(value)}
            />
        </div>
    )
  }

  return (
    <div>
      <Modal
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSubmit={onSubmit}
        title="Filters"
        actionlabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
        body={bodyContent}
      />
    </div>
  );
};

export default SearchModal;
