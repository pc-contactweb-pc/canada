// START Fuse fuzzy search setup

function fixTabFocus() {
    // fix tab focus
    $(".location-result summary[tabindex='0']").attr("tabindex", "-1");
    $(".location-result summary:visible:first").attr("tabindex", "0");
}

document.addEventListener("DOMContentLoaded", () => {
    const results = Array.from(document.querySelectorAll(".location-result"));
    
    const regions = results.map(result => result.getAttribute("data-region-name"));
    const altNames = results.map(result => result.getAttribute("data-alt-names")); 

    const titles = results.map((result, idx) => {
        const titleEl = result.querySelector(".location-result summary");
        return {
            idx,
            text: titleEl ? titleEl.textContent.trim() : "",
            region: regions[idx] ? regions[idx].trim() : "",
            altNames: altNames[idx] ? altNames[idx].trim() : "" 
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
    input.addEventListener("input", e => {
        const query = e.target.value.trim();

        showLocationDetails();
        collapseLocation();

        let visibleIndexes;
        if (query) {
            const words = query.split(/\s+/).filter(Boolean);
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

        const visibleResults = $(".location-result:visible").length;
        $("#visible-results").text(visibleResults + " of ");

        if (visibleResults === 0) {
            $(".result-text").removeClass("positive").addClass("negative");
            resetMap();
            $("#no-results").show();
            $("#end-results").hide();
        }

        if (visibleResults === 1) {
            const onlyResultId = $(".location-result:visible").attr("id");
            expandLocation(onlyResultId, true);
        }

        if (visibleResults > 1) {
            resetMap();
            deselectActiveFeature();
        }

        if (visibleResults > 0) {
            $("#no-results").hide();
            $("#end-results").show();
        }
    });
});

// END Fuse fuzzy search setup

// Scrolls the location result list to bring a selected result into the visible area.
function scrollElementIntoParentView(element, container) {
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

// Zoom geomap to specific location helper function

function zoomToLocation(locationId) {
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

// Expand location result

function expandLocation(locationId, scroll = false) {
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

// Collapse location result

function collapseLocation() {
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
            const allSummaries = Array.from(tabList.querySelectorAll('summary'));
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

    // Initialize: Ensure the first *visible* tab is focusable on load
    const initialVisibleTabs = getVisibleTabs();
    if (initialVisibleTabs.length > 0) {
        initialVisibleTabs[0].setAttribute('tabindex', '0');
    }

    // Function to change focus based on the *current* visible list
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
        
        // 2. Find where we are in *that* specific list
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

function resetMap() {
    const view = globalMap.getView();
    view.animate({
        center: ol.proj.transform([-100.48, 70.25], "EPSG:4326", "EPSG:3857"),
        zoom: window.zoomLevel,
        duration: 1000 // Animation duration in milliseconds
    });
    $("#gm_province option").removeAttr("selected");
}

function showLocationDetails() {
    $("#location-results").slideDown();
    $("#expand-location-list").hide();
}

function deselectActiveFeature() {
    const geomap = wb.getMap("location_map");
    if (geomap && geomap.map) {
        const selectInteraction = geomap.map.getInteractions().getArray().find(i => i instanceof ol.interaction.Select);
        if (selectInteraction) {
            selectInteraction.getFeatures().clear();
        }
    }
    collapseLocation();
}

$(document).ready(function () {

    // hide no results
    $("#no-results").hide();

    // set default map zoom level per screen size
    if (window.innerWidth < 768) {
        window.zoomLevel = 1.7;
    } else {
        window.zoomLevel = 2.3;
    }

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
                $(this).find("a.btn").after(`<button class="zoom-on-map btn btn-link full-width mrgn-bttm-md"><span class="glyphicon-zoom-in glyphicon"></span>&nbsp;&nbsp;Zoom on map</button>`);
            }
        }

    })

    const allResults = $(".location-result").length;
    $("#all-results").text(allResults);

    // When the user mouses over a .location-result, select it on the map
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

    // When the user's pointer is removed, deselect it
    $("#location-results").on("mouseleave focusout", ".location-result:not(.active)", function () {
        const locationId = $(this).attr("id");
        if (locationId) {
            const $checkbox = $(`.locationTable tr[locationtarget="${locationId}"] .geomap-cbx`);
            if ($checkbox.length && $checkbox.is(':checked')) {
                $checkbox.trigger("click"); // This triggers the selectInteraction and removes newSelectStyle
            }
        }
    });

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

    // when zoom on map button is clicked, zoom to location on map
    $("#location-results").on("click", ".zoom-on-map", function () {
        const locationId = $(this).closest(".location-result").attr("id");
        zoomToLocation(locationId);
    });

    // when a map marker is clicked, expand the corresponding location result
    $(".wb-geomap-map").on("click", function () {
        setTimeout(() => {
            const selectedRowCheckbox = $(".locationTable tr.active input[type='checkbox']");
            const selectedRow = $(".locationTable tr.active").attr("locationTarget");
            if (selectedRow) {
                showLocationDetails();
                expandLocation(selectedRow, true);
                //selectedRowCheckbox.trigger("click");
                // Scroll to the location results if on a small screen
                if (window.innerWidth < 768) {
                    const locationSearch = document.querySelector("#location-name-search");
                    locationSearch.scrollIntoView();
                }
            }

        }, 500);
    });

    $("#gm_province").on("change", function () {
        // auto-submit the form when a province is selected
        $(this).closest("form").submit();
    });

    $("#clear-search").on("click", function () {
        $("#find-by-name").val("").removeClass("clear-search");
        $(".location-result").removeClass("hidden").show();
        $("#visible-results").text("");
        $(".result-text").removeClass("positive negative");
        deselectActiveFeature();
        fixTabFocus();
    });

    $("#expand-location-list").on("click", function () {
        showLocationDetails();
    });

});

// get global geomap variable on page load
$(document).on("wb-ready.wb-geomap", "#location_map", function (event, map) {
    window.globalMap = map;

    // --- Disable map rotation ---
    // Find and disable the map rotation interaction.
    map.getInteractions().forEach(function (interaction) {
        if (interaction instanceof ol.interaction.DragRotate || interaction instanceof ol.interaction.PinchRotate) {
            interaction.setActive(false);
        }
    });

    // --- Apply custom select style to all features ---
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
        minZoom: window.zoomLevel, // Your desired minimum zoom level
        maxZoom: 18, // Your desired maximum zoom level
    });

    // Set the new view on the map.
    map.setView(newView);

    resetMap();
    $("#location_map_reset").on("click", resetMap);

});