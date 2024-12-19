



const handelJoin = (arr, separator = ", ") => {
    return Array.isArray(arr) ? arr.join(separator) : "Not available";
};

// Helper function to safely handle object values
const handelCountryValues = (obj) => {
    return obj ? Object.values(obj) : [];
};

export const getCountryDetails = (country) => {

    
    return [
        { label: "Official Name", value: country.official_name || "Official name is missing" },
        { label: "Capital", value: country.capital || "Capital is missing" },
        { label: "Region", value: country.subregion ? `${country.region} (${country.subregion})` : country.region || "Region is missing" },
        { label: "Population", value: country.population ? 
                country.population.toLocaleString() : "Population is missing" },
        { label: "Area", value: country.area ? `${country.area.toLocaleString()} km²` : "Area is missing" },
        { label: "Languages", value: handelJoin(handelCountryValues(country.languages))},
        { label: "Currencies", value: handelCountryValues(country.currencies)
                .map(cur => cur?.name ? `${cur.name} (${cur.symbol || ''})` : 'Currencies are missing')
                .join(", ") || ""},
        { label: "Calling Code", value: country.callingCode || "Calling code is missing" },
        { label: "Timezones", value: handelJoin(country.timezones)},
        { label: "Borders", value: handelJoin(country.borders) || "No land borders"},
        { label: "Domain", value: handelJoin(country.topLevelDomain)},
        { label: "Regional Blocs", value: Array.isArray(country.regionalBlocs) ? 
                country.regionalBlocs.map(bloc => `${bloc.name} (${bloc.acronym})`).join(", ") : 
                "None"
        }
    ];
};


