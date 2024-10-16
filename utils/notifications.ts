import { SubscriptionsState } from "@/redux/slices/authSlice";
import { Trip } from "@/types/trip";

interface CheckResult {
  exists: boolean;
  sourceId?: string; // companyId or location keyword
  trip?: Trip; // the associated trip
}

export const checkForNewTrips = (
  newTrips: Trip[],
  state: SubscriptionsState,
): CheckResult[] => {
  const results: CheckResult[] = [];

  newTrips.forEach((trip) => {
    const companySubscribed = state.companies.includes(
      trip.company_id as string,
    );
    // update location here instead of trip name
    const locationMatched = state.locations.find((location) =>
      matchLocationKeywords(location, trip.name.split(" ")),
    );

    if (companySubscribed) {
      results.push({
        exists: true,
        sourceId: trip.company_id,
        trip: trip,
      });
    } else if (locationMatched) {
      results.push({
        exists: true,
        sourceId: locationMatched,
        trip: trip,
      });
    }
  });

  return results;
};

// Example usage:
function normalizeString(str: string): string {
  return str.toLowerCase().trim();
}

function createRegexPattern(location: string): RegExp {
  // Escape special regex characters and allow for flexible matching
  const escapedLocation = location.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escapedLocation}\\b`, "i"); // Word boundary for exact matching
}

function matchLocationKeywords(
  userInput: string,
  locations: string[],
): string | null {
  const normalizedInput = normalizeString(userInput);

  for (const location of locations) {
    const normalizedLocation = normalizeString(location);
    const regexPattern = createRegexPattern(normalizedInput);

    if (regexPattern.test(normalizedLocation)) {
      return location; // Return the matched location
    }
  }
  return null; // No match found
}

// Example usage:
const userInput = "giza pyramids";
const companyLocations = ["Giza Pyramids", "Cairo", "Alexandria"];

const matchedLocation = matchLocationKeywords(userInput, companyLocations);
console.log(matchedLocation); // Output: "Giza Pyramids"
