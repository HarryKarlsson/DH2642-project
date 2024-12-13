// pageController.js
import countryModel from '/src/countryModel';
import { FetchCountryData, FetchCountryDataByName, FetchCountryDataByRegion, FetchCountryDataBycapital, FetchCountryDataBylaguage } from '/src/countrySource';

// Pagination helpers
export const getPaginatedCountries = (countryData, currentPage, itemsPerPage) => {
    if (!countryData) return [];
    const countries = Object.values(countryData);
    const start = currentPage * itemsPerPage;
    return countries.slice(start, start + itemsPerPage);
};

export const getTotalPages = (countryData, itemsPerPage) => {
    if (!countryData) return 0;
    return Math.ceil(Object.values(countryData).length / itemsPerPage);
};


export const handleNextPage = (viewState) => {
    const totalPages = getTotalPages(viewState.countryData, viewState.itemsPerPage);
    if (viewState.currentPage < totalPages - 1) {
        countryModel.setCurrentPage(viewState.currentPage + 1);
        viewState.currentPage = countryModel.data.currentPage;
    }
};

export const handlePrevPage = (viewState) => {
    if (viewState.currentPage > 0) {
        countryModel.setCurrentPage(viewState.currentPage - 1);
        viewState.currentPage = countryModel.data.currentPage;
    }
};

export const handleSearchQuery = (event, viewState) => {
    const query = event.target.value;
    countryModel.setSearchQuery(query);
    viewState.searchQuery = countryModel.data.searchQuery;
    countryModel.setCurrentPage(0);
};

export const handleSearch = async (viewState) => {

    if (!viewState.searchQuery) return;
    let data;
    try {

        switch (viewState.searchType) {
            case 'name':
                data = await FetchCountryDataByName(viewState.searchQuery);
                break;
            case 'capital':
                data = await FetchCountryDataBycapital(viewState.searchQuery);
                break;
            case 'language':
                data = await FetchCountryDataBylaguage(viewState.searchQuery);
                break;
            case 'region':
                data = await FetchCountryDataByRegion(viewState.searchQuery);
                break;
            default:
                data = await FetchCountryDataByName(viewState.searchQuery);
        }

        // Handle empty results
        if (!data || Object.keys(data).length === 0) {
            viewState.loading = false;
            // You might want to add an error state to your model/view to handle this
            console.log('No results found');
            return;
        }
    countryModel.setCountryData(data);
    Object.assign(viewState.$data, countryModel.data);
    } catch (error) {
        console.error('Error:', error);
        // You might want to add an error state to your model/view to handle this
    } finally {
        viewState.loading = false;
    }
};

// Data manipulation handlers
export const sortCountriesAZ = (viewState) => {
    const countries = Object.values(viewState.countryData)
        .sort((a, b) => a.name.localeCompare(b.name));
    const sortedCountries = {};
    countries.forEach(country => {
        sortedCountries[country.name] = country;
    });
    countryModel.setCountryData(sortedCountries);
    viewState.countryData = countryModel.data.countryData;
    countryModel.setCurrentPage(0);
};

export const resetData = async (viewState) => {
    try {
        const data = await FetchCountryData();
        countryModel.setCountryData(data);
        Object.assign(viewState.$data, countryModel.data);
    } catch (error) { console.error('Error:', error);}
};