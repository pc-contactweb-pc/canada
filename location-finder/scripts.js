// START Fuse search config

document.addEventListener("DOMContentLoaded", () => {
    // Initialize default zoom level immediately to ensure availability
    window.zoomLevel = window.innerWidth < 768 ? 1.7 : 2.3;

    /**
     * Debounce utility to limit function execution rate
     */
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const results = Array.from(document.querySelectorAll(".location-result"));
    
    const regions = results.map(result => result.getAttribute("data-region-name"));
    const altNames = results.map(result => result.getAttribute("data-alt-names")); 

    const titles = results.map((result, idx) => {
        const titleEl = result.querySelector(".location-result summary");
        return {
            idx,
            text: titleEl ? titleEl.textContent.trim() : "",
            region: regions[idx] ? regions[idx].trim() : "",
            altNames: altNames[idx] ? altNames[idx].split(',').map(name => name.trim()) : []
        };
    });

    // Set up Fuse
    const fuse = new Fuse(titles, {
        keys: ["text", "region", "altNames"], 
        threshold: 0.2,
        ignoreLocation: true,
        ignoreDiacritics: true
    });

    const input = document.querySelector("#find-by-name");
    input.addEventListener("input", debounce(e => {
        const query = e.target.value.trim();

        showLocationDetails();
        collapseLocation();

        let visibleIndexes;
        if (query) {
            const cleanedQuery = query.replace(/,/g, '');
            const words = cleanedQuery.split(/\s+/).filter(Boolean);
            const fuseQuery = {
                $and: words.map(word => ({
                    $or: [
                        { text: word },
                        { region: word },
                        { altNames: word } 
                    ]
                }))
            };
            visibleIndexes = new Set(fuse.search(fuseQuery).map(r => r.item.idx));
            $("#find-by-name").addClass("clear-search");
            $(".result-text").removeClass("negative").addClass("positive");
        } else {
            visibleIndexes = new Set(titles.map((_, idx) => idx));
            $("#find-by-name").removeClass("clear-search");
            $("#visible-results").text("");
            $(".result-text").removeClass("positive negative");
            resetMap();
            deselectActiveFeature();
        }

        results.forEach((result, idx) => {
            result.style.display = visibleIndexes.has(idx) ? "" : "none";
        });

        fixTabFocus();

        // Optimization: Calculate count from data set instead of querying DOM (:visible)
        const visibleCount = visibleIndexes.size;
        $("#visible-results").text(visibleCount + " of ");

        if (visibleCount === 0) {
            $(".result-text").removeClass("positive").addClass("negative");
            resetMap();
            $("#no-results").show();
            $("#end-results").hide();
        }

        if (visibleCount === 1) {
            const idx = visibleIndexes.values().next().value;
            const onlyResultId = results[idx].id;
            expandLocation(onlyResultId, true);
        }

        if (visibleCount > 1) {
            resetMap();
            deselectActiveFeature();
        }

        if (visibleCount > 0) {
            $("#no-results").hide();
            $("#end-results").show();
        }
    }, 50)); // 50ms debounce delay
});

// END Fuse search config

// START location results helper functions

/**
 * Manages tabindex for location results to ensure keyboard accessibility.
 * Sets the first visible result to be focusable.
 */
function fixTabFocus() {
    // used when location results are hidden after search input
    // ensures the first visible location result has an accessible tabindex
    $(".location-result summary[tabindex='0']").attr("tabindex", "-1");
    $(".location-result summary:visible:first").attr("tabindex", "0");
}

/**
 * Scrolls a container to ensure a specific element is visible.
 * @param {HTMLElement} element - The target element.
 * @param {HTMLElement} container - The scrollable container.
 */
function scrollElementIntoParentView(element, container) {
    // Scrolls the location result list to bring a selected result into the visible area.
    // Get the position and dimensions of the element and its container.
    const elRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Calculate how far the element is outside the top or bottom of the container's visible area.
    const overScroll = elRect.top - containerRect.top;
    const underScroll = elRect.bottom - containerRect.bottom;

    if (overScroll < 0) {
        // If the element is above the visible area, scroll up to bring it into view.
        container.scrollTop += overScroll;
    } else if (underScroll > 0) {
        // If the element is below the visible area, scroll down to bring it into view.
        container.scrollTop += underScroll;
    }
}

/**
 * Expands a specific location result and updates the UI state.
 * @param {string} locationId - The ID of the location element.
 * @param {boolean} [scroll=false] - Whether to scroll the element into view.
 */
function expandLocation(locationId, scroll = false) {
    // Expand location result
    const $location = $(`#${locationId}`);
    if (!$location.length) return;

    // Hide all other results and their details, and remove 'active' class
    $(".location-result").not($location).addClass("hidden").removeClass("active");

    // Show and activate the target location and its details
    $location.addClass("active").attr("open", "open");

    if (scroll) {
        const resultsContainer = document.querySelector("#location-results");
        if (resultsContainer) {
            scrollElementIntoParentView($location[0], resultsContainer);
        }
    }

    // check input of matching checkbox in the locationTable
    const $checkbox = $(`.locationTable tr[locationtarget="${locationId}"] .geomap-cbx`);
    if ($checkbox.length && !$checkbox.is(':checked')) {
        $checkbox.trigger("click");
    }

    // hide end of results
    document.getElementById("end-results").style.display = 'none';

}

/**
 * Collapses the currently active location result.
 */
function collapseLocation() {
    // Collapse location result
    const $location = $(`.location-result.active`);
    if (!$location.length) return;

    const resultsContainer = document.querySelector("#location-results");

    // Show all location results
    $(".location-result").removeClass("hidden").attr("open", null);
    // Deactivate the current location
    $location.removeClass("active");
    // Scroll the (now collapsed) location to the top of the container
    if (resultsContainer) {
        const locationEl = $location[0];
        const containerRect = resultsContainer.getBoundingClientRect();
        const locationRect = locationEl.getBoundingClientRect();
        resultsContainer.scrollTop += locationRect.top - containerRect.top;
    }

    // show end of results
    document.getElementById("end-results").style.display = 'block';

}

function showLocationDetails() {
    // for mobile: show location list when expand button is tapped
    $("#location-results").slideDown();
    $("#expand-location-list").hide();
}

// START keyboard accessibility for location list

document.addEventListener('DOMContentLoaded', () => {   
    const tablist = document.getElementById('location-results');
    if (!tablist) {
        return;
    }

    const searchInput = document.getElementById('find-by-name'); // Replace with your ID

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents form submission (if inside a <form>)

            // Find the first visible summary in the results
            // Note: offsetParent checks if it's actually visible (handles display: none)
            const allSummaries = Array.from(tablist.querySelectorAll('summary'));
            const firstVisible = allSummaries.find(el => el.offsetParent !== null);

            if (firstVisible) {
                // Ensure it is focusable before moving focus
                firstVisible.setAttribute('tabindex', '0'); 
                firstVisible.focus();
            }
        }
    });

    // Helper: dynamic fetch of currently visible tabs
    // offsetParent is null if an element (or its parent) has display: none
    const getVisibleTabs = () => {
        return Array.from(tablist.querySelectorAll('summary')).filter(
            (tab) => tab.offsetParent !== null
        );
    };

    // Initialize: Ensure the first visible tab is focusable on load
    const initialVisibleTabs = getVisibleTabs();
    if (initialVisibleTabs.length > 0) {
        initialVisibleTabs[0].setAttribute('tabindex', '0');
    }

    // Function to change focus based on the current visible list
    const setFocus = (currentTab, newIndex, visibleTabs) => {
        // Constrain index to the list of visible tabs
        if (newIndex < 0) {
            newIndex = visibleTabs.length - 1;
        } else if (newIndex >= visibleTabs.length) {
            newIndex = 0;
        }

        const nextTab = visibleTabs[newIndex];

        // Update tabindex to manage focus (Roving Tabindex)
        currentTab.setAttribute('tabindex', '-1');
        nextTab.setAttribute('tabindex', '0');
        nextTab.focus();
    };

    tablist.addEventListener('keydown', (e) => {
        // 1. Get the fresh list of visible items
        const visibleTabs = getVisibleTabs();
        
        // 2. Find where we are in that specific list
        const currentIndex = visibleTabs.indexOf(document.activeElement);

        if (currentIndex === -1) {
            return; // Focus is not on a visible tab item
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setFocus(document.activeElement, currentIndex + 1, visibleTabs);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocus(document.activeElement, currentIndex - 1, visibleTabs);
                break;
            case 'Home':
                e.preventDefault();
                setFocus(document.activeElement, 0, visibleTabs);
                break;
            case 'End':
                e.preventDefault();
                setFocus(document.activeElement, visibleTabs.length - 1, visibleTabs);
                break;
        }
    });
});

// END keyboard accessibility for location list

// END location results helper functions

// START Location results / geomap interactions

$(document).ready(function () {

    // hide no results
    $("#no-results").hide();

    // add region tags to location result descriptions
    $(".location-result").each(function () {
        let region = $(this).attr("data-region-name");
        if (region) {
            let destination = $(this).find(".location-description");
            $(`<p class="location-region"><span class="label label-default">${region}</span></p>`).insertAfter(destination)
        }
        // add zoom on map button to location details if it has a matching row in locationTable
        let locationId = $(this).attr("id");
        if (locationId) {
            let $matchingRow = $(`.locationTable tr[locationtarget="${locationId}"]`);
            if ($matchingRow.length) {
                $(this).find(".location-thumbnail a").after(`<button class="zoom-on-map btn btn-link full-width mrgn-bttm-md"><span class="glyphicon-zoom-in glyphicon"></span>&nbsp;&nbsp;Zoom on map</button>`);
            }
        }

    })

    // calculate number of location results and display in search input
    const allResults = $(".location-result").length;
    $("#all-results").text(allResults);

    // When location result moused over, highlight it on the map with a selected style
    $("#location-results").on("mouseenter focusin", ".location-result", function () {
        const $locationResult = $(this);
        if (!$locationResult.hasClass("active")) {
            const locationId = $locationResult.attr("id");
            if (locationId) {
                const $checkbox = $(`.locationTable tr[locationtarget="${locationId}"] .geomap-cbx`);
                if ($checkbox.length && !$checkbox.is(':checked')) {
                    $checkbox.trigger("click"); // This triggers the selectInteraction and applies newSelectStyle
                }
            }
        }
    });

    // When mouse leaves location result, remove the selected style on the map
    $("#location-results").on("mouseleave focusout", ".location-result:not(.active)", function () {
        const locationId = $(this).attr("id");
        if (locationId) {
            const $checkbox = $(`.locationTable tr[locationtarget="${locationId}"] .geomap-cbx`);
            if ($checkbox.length && $checkbox.is(':checked')) {
                $checkbox.trigger("click"); // This triggers the selectInteraction and removes newSelectStyle
            }
        }
    });

    // when location result clicked, expand description and highlight on map with selected style
    $("#location-results").on("click", ".location-result summary", function (e) {
        e.preventDefault();

        const $locationResult = $(this).closest(".location-result");
        const locationId = $locationResult.attr("id");

        if ($locationResult.hasClass("active")) {
            collapseLocation();
        } else {
            // Clear any selections from hover before expanding
            const $activeCheckbox = $(".locationTable .geomap-cbx:checked");
            if ($activeCheckbox.length) {
                $activeCheckbox.trigger("click");
            }
            expandLocation(locationId, true);
        }
    });

    // when zoom on map button clicked within a location result, zoom to that location on map
    $("#location-results").on("click", ".zoom-on-map", function () {
        const locationId = $(this).closest(".location-result").attr("id");
        zoomToLocation(locationId);
    });

    // when map marker clicked, expand corresponding location result
    $("#geomap-map-location_map").on("click", function () {
        setTimeout(() => {
            const selectedRowCheckbox = $(".locationTable tr.active input[type='checkbox']");
            const selectedRow = $(".locationTable tr.active").attr("locationTarget");
            if (selectedRow) {
                showLocationDetails();
                expandLocation(selectedRow, true);
                // Scroll to the location results if on a small screen
                if (window.innerWidth < 768) {
                    const locationSearch = document.querySelector("#location-name-search");
                    locationSearch.scrollIntoView();
                }
            }
        }, 300);
    });

    // trigger region zoom when select input changed
    $("#gm_province").on("change", function () {
        $(this).closest("form").submit();
    });

    // clear search functionality
    $("#clear-search").on("click", function () {
        $("#find-by-name").val("").removeClass("clear-search");
        $(".location-result").removeClass("hidden").show();
        $("#visible-results").text("");
        $(".result-text").removeClass("positive negative");
        deselectActiveFeature();
        fixTabFocus();
    });

    // mobile: show hidden location results list
    $("#expand-location-list").on("click", function () {
        showLocationDetails();
    });

});

// END Location results / geomap interactions

// START Geomap helper functions

/**
 * Zooms the map to the coordinates associated with a location ID.
 * @param {string} locationId - The ID of the location.
 */
function zoomToLocation(locationId) {
    // Zoom geomap to specific location helper function when 'zoom on map' is clicked
    const layerDataRow = document.querySelector(`.locationTable tr[locationTarget="${locationId}"] td:nth-last-child(2)`);
    if (layerDataRow) {
        const locationCoordinates = layerDataRow.textContent.trim().split(/\s+/).map(Number);
        if (locationCoordinates.length === 2 && !isNaN(locationCoordinates[0]) && !isNaN(locationCoordinates[1])) {
            const view = globalMap.getView();
            view.animate({
                center: ol.proj.transform(locationCoordinates, "EPSG:4326", "EPSG:3857"),
                zoom: 12,
                duration: 2000,
                easing: ol.easing.easeOut
            });
        }
    }
}

/**
 * Resets the map view to default center and zoom.
 */
function resetMap() {
    // reposition map to default view and remove zoom area selection
    const view = globalMap.getView();
    view.animate({
        center: ol.proj.transform([-100.48, 70.25], "EPSG:4326", "EPSG:3857"),
        zoom: window.zoomLevel,
        duration: 1000 // Animation duration in milliseconds
    });
    $("#gm_province option").removeAttr("selected");
}

function deselectActiveFeature() {
    // remove map icon select style when location result is collapsed
    const geomap = wb.getMap("location_map");
    if (geomap && geomap.map) {
        const selectInteraction = geomap.map.getInteractions().getArray().find(i => i instanceof ol.interaction.Select);
        if (selectInteraction) {
            selectInteraction.getFeatures().clear();
        }
    }
    collapseLocation();
}

// END Geomap helper functions

// START geomap setup modifications
// disable map rotation
// define custom select styles
// reset view

// get global geomap variable on page load
$(document).on("wb-ready.wb-geomap", "#location_map", function (event, map) {
    window.globalMap = map;

    // Find and disable the map rotation interaction.
    map.getInteractions().forEach(function (interaction) {
        if (interaction instanceof ol.interaction.DragRotate || interaction instanceof ol.interaction.PinchRotate) {
            interaction.setActive(false);
        }
    });

    // This ensures that any feature, when selected, will use the custom icon
    var newSelectStyle = new ol.style.Style({
        image: new ol.style.Icon({
            src: "https://parks.canada.ca/-/media/WET4/iconographie-icons/carte-map/geomatic/geomap_location-brass.png",
            size: [35, 35],
            anchor: [0.5, 0.5]
        })
    });

    map.getLayers().forEach(function (layer) {
        if (layer instanceof ol.layer.Vector) {
            var source = layer.getSource();
            source.getFeatures().forEach(function (feature) {
                feature.selectStyle = newSelectStyle;
            });
        }
    });

    // Get the current view.
    let oldView = map.getView();
    let currentCenter = oldView.getCenter();
    let currentZoom = oldView.getZoom();

    // Create a new view with the desired zoom constraints.
    let newView = new ol.View({
        center: currentCenter,
        zoom: window.zoomLevel,
        minZoom: window.zoomLevel,
        maxZoom: 18,
    });

    // Set the new view on the map.
    map.setView(newView);

    resetMap();

    $("#location_map_reset").on("click", resetMap);

});

// END geomap setup modifications