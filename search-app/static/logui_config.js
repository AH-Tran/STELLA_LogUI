var USER_ID = 123;

document.addEventListener('DOMContentLoaded', function() {

    // LogUI control code
    startLogUIClient();
});

function startLogUIClient() {
    if (window.LogUI) {
        // Here, LogUI is present, so we can attempt to instantiate it.
        let configurationObject = {
                logUIConfiguration: {
                endpoint: 'ws://localhost:8000/ws/endpoint/',
                authorisationToken: 'eyJ0eXBlIjoibG9nVUktYXV0aG9yaXNhdGlvbi1vYmplY3QiLCJhcHBsaWNhdGlvbklEIjoiZDRlMDg3ODEtZDg5MC00NzdkLTk2MDgtMjc5NGM2MDlhOTMxIiwiZmxpZ2h0SUQiOiI4OGY0MzRhZi05ZDExLTQ0MzQtODljZi05MTU0NzIxZjJlYzgifQ:1nrKsp:ARFySuFU7qZQIKuopbSZ89HX4cGFQutHHaYMAMtZqp8',
                verbose: true,
                browserEvents: {
                    eventsWhileScrolling: true,
                    URLChanges: true,
                    contextMenu: true,
                    pageFocus: false,
                    trackCursor: false,
                },
            },
            applicationSpecificData: {
                userID: USER_ID,
                condition: 'STELLA_Pyterrier',
            },
            trackingConfiguration: {
                'searchbar-click': { // Mapping name (between element(s) and event)
                    selector: '#search-bar',  // Selector: id(#), class(.)
                    event: 'mouseClick',// Event (clicks, forms, etc)
                    properties: {
                        primary: {
                            name: 'SEARCH_PRIMARY_MOUSE_CLICK',
                        },
                        secondary: {
                            name: 'SEARCH_SECONDARY_MOUSE_CLICK',
                        },
                        auxiliary: {
                            name: 'SEARCH_AUX_MOUSE_CLICK',
                        },
                    },
                },
                'advanced-search-click': { // Mapping name (between element(s) and event)
                    selector: '#search-bar-advanced',  // Selector: id(#), class(.)
                    event: 'mouseClick',// Event (clicks, forms, etc)
                    properties: {
                        primary: {
                            name: 'ADVSEARCH_PRIMARY_MOUSE_CLICK',
                        },
                        secondary: {
                            name: 'ADVSEARCH_SECONDARY_MOUSE_CLICK',
                        },
                        auxiliary: {
                            name: 'ADVSEARCH_AUX_MOUSE_CLICK',
                        },
                    },
                },
                'scroll-mousemovements': {
                    selector: '*',
                    event: 'scrollable',
                    properties: {
                        scrollStart: {
                            name: 'WIDGET_SCROLL_START',
                        },
                        scrollEnd: {
                            name: 'WIDGET_SCROLL_END',
                        },
                    },
                },
                'normal-query-submission': { // NORMAL SEARCH BAR
                    selector: '#search-bar',
                    event: 'formSubmission',
                    name: 'NORMAL_QUERY_SUBMITTED',
                    properties: {
                        includeValues: [
                            {
                                nameForLog: 'completeQuery', // QUERY INPUT
                                sourcer: 'elementProperty',
                                selector: '#search-box',
                                lookFor: 'value',
                            },
                            {
                                nameForLog: 'rppValue', // RPP INPUT
                                sourcer: 'elementProperty',
                                selector: '#rpp-box',
                                lookFor: 'value',
                            }
                        ]
                    }
                },
                'advanced-query-submission': { // ADVANCED SEARCH BAR
                    selector: '#search-bar-advanced',
                    event: 'formSubmission',
                    name: 'ADVANCED_QUERY_SUBMITTED',
                    properties: {
                        includeValues: [
                            {
                                nameForLog: 'completeQueryAdvanced', //QUERY INPUT
                                sourcer: 'elementProperty',
                                selector: '#search-box-advanced',
                                lookFor: 'value',
                            },
                            {
                                nameForLog: 'rppValueAdvanced', //RPP INPUT
                                sourcer: 'elementProperty',
                                selector: '#rpp-box-advanced',
                                lookFor: 'value',
                            },
                            {
                                nameForLog: 'radioNone', //RADIO INPUT
                                sourcer: 'elementProperty',
                                selector: '.searchbar-advanced-radio',
                                lookFor: 'name',
                            },
                        ]
                    }
                },
                'radio-click-primary': {  // RADIO CLICK
                    selector: '#radio-none',
                    event: 'mouseClick',
                    properties: {
                        primary: {
                            name: 'RADIO_MOUSE_CLICK',
                        },
                    },
                },
                'result1-click': { // Mapping name (between element(s) and event)
                    selector: '#result-1',  // Selector: id(#), class(.)
                    event: 'mouseClick',// Event (clicks, forms, etc)
                    properties: {
                        primary: {
                            name: 'RESULT1_MOUSE_CLICK',
                        },
                        secondary: {
                            name: 'RESULT1_MOUSE_CLICK',
                        },
                        auxiliary: {
                            name: 'RESULT1_MOUSE_CLICK',
                        },
                    },
                },
                'result2-click': { // Mapping name (between element(s) and event)
                    selector: '#result-2',  // Selector: id(#), class(.)
                    event: 'mouseClick',// Event (clicks, forms, etc)
                    properties: {
                        primary: {
                            name: 'RESULT2_MOUSE_CLICK',
                        },
                        secondary: {
                            name: 'RESULT2_MOUSE_CLICK',
                        },
                        auxiliary: {
                            name: 'RESULT2_MOUSE_CLICK',
                        },
                    },
                },
                'result3-click': { // Mapping name (between element(s) and event)
                    selector: '#result-3',  // Selector: id(#), class(.)
                    event: 'mouseClick',// Event (clicks, forms, etc)
                    properties: {
                        primary: {
                            name: 'RESULT3_MOUSE_CLICK',
                        },
                        secondary: {
                            name: 'RESULT3_MOUSE_CLICK',
                        },
                        auxiliary: {
                            name: 'RESULT3_MOUSE_CLICK',
                        },
                    },
                },
                'result4-click': { // Mapping name (between element(s) and event)
                    selector: '#result-4',  // Selector: id(#), class(.)
                    event: 'mouseClick',// Event (clicks, forms, etc)
                    properties: {
                        primary: {
                            name: 'RESULT4_MOUSE_CLICK',
                        },
                        secondary: {
                            name: 'RESULT4_MOUSE_CLICK',
                        },
                        auxiliary: {
                            name: 'RESULT4_MOUSE_CLICK',
                        },
                    },
                },
                'result5-click': { // Mapping name (between element(s) and event)
                    selector: '#result-5',  // Selector: id(#), class(.)
                    event: 'mouseClick',// Event (clicks, forms, etc)
                    properties: {
                        primary: {
                            name: 'RESULT5_MOUSE_CLICK',
                        },
                        secondary: {
                            name: 'RESULT5_MOUSE_CLICK',
                        },
                        auxiliary: {
                            name: 'RESULT5_MOUSE_CLICK',
                        },
                    },
                },
                'result6-click': { // Mapping name (between element(s) and event)
                    selector: '#result-6',  // Selector: id(#), class(.)
                    event: 'mouseClick',// Event (clicks, forms, etc)
                    properties: {
                        primary: {
                            name: 'RESULT6_MOUSE_CLICK',
                        },
                        secondary: {
                            name: 'RESULT6_MOUSE_CLICK',
                        },
                        auxiliary: {
                            name: 'RESULT6_MOUSE_CLICK',
                        },
                    },
                },
                'result7-click': { // Mapping name (between element(s) and event)
                    selector: '#result-7',  // Selector: id(#), class(.)
                    event: 'mouseClick',// Event (clicks, forms, etc)
                    properties: {
                        primary: {
                            name: 'RESULT7_MOUSE_CLICK',
                        },
                        secondary: {
                            name: 'RESULT7_MOUSE_CLICK',
                        },
                        auxiliary: {
                            name: 'RESULT7_MOUSE_CLICK',
                        },
                    },
                },
                'result8-click': { // Mapping name (between element(s) and event)
                    selector: '#result-8',  // Selector: id(#), class(.)
                    event: 'mouseClick',// Event (clicks, forms, etc)
                    properties: {
                        primary: {
                            name: 'RESULT8_MOUSE_CLICK',
                        },
                        secondary: {
                            name: 'RESULT8_MOUSE_CLICK',
                        },
                        auxiliary: {
                            name: 'RESULT8_MOUSE_CLICK',
                        },
                    },
                },
                'result9-click': { // Mapping name (between element(s) and event)
                    selector: '#result-9',  // Selector: id(#), class(.)
                    event: 'mouseClick',// Event (clicks, forms, etc)
                    properties: {
                        primary: {
                            name: 'RESULT9_MOUSE_CLICK',
                        },
                        secondary: {
                            name: 'RESULT9_MOUSE_CLICK',
                        },
                        auxiliary: {
                            name: 'RESULT9_MOUSE_CLICK',
                        },
                    },
                },
                'result10-click': { // Mapping name (between element(s) and event)
                    selector: '#result-10',  // Selector: id(#), class(.)
                    event: 'mouseClick',// Event (clicks, forms, etc)
                    properties: {
                        primary: {
                            name: 'RESULT10_MOUSE_CLICK',
                        },
                        secondary: {
                            name: 'RESULT10_MOUSE_CLICK',
                        },
                        auxiliary: {
                            name: 'RESULT10_MOUSE_CLICK',
                        },
                    },
                },
                'title-click': { // Mapping name (between element(s) and event)
                    selector: '#article-title',  // Selector: id(#), class(.)
                    event: 'mouseClick',// Event (clicks, forms, etc)
                    properties: {
                        primary: {
                            name: 'TITLE_MOUSE_CLICK',
                        },
                        secondary: {
                            name: 'TITLE_MOUSE_CLICK',
                        },
                        auxiliary: {
                            name: 'TITLE_MOUSE_CLICK',
                        },
                    },
                },
                'article-tag-click': { // Mapping name (between element(s) and event)
                    selector: '.article-tag',  // Selector: id(#), class(.)
                    event: 'mouseClick',// Event (clicks, forms, etc)
                    properties: {
                        primary: {
                            name: 'TAG_MOUSE_CLICK',
                        },
                        secondary: {
                            name: 'TAG_MOUSE_CLICK',
                        },
                        auxiliary: {
                            name: 'TAG_MOUSE_CLICK',
                        },
                    },
                },
                'inspect-click': { // Mapping name (between element(s) and event)
                    selector: '.media-inspect',  // Selector: id(#), class(.)
                    event: 'mouseClick',// Event (clicks, forms, etc)
                    properties: {
                        primary: {
                            name: 'INSPECT_MOUSE_CLICK',
                        },
                        secondary: {
                            name: 'INSPECT_MOUSE_CLICK',
                        },
                        auxiliary: {
                            name: 'INSPECT_MOUSE_CLICK',
                        },
                    },
                },
                'bookmark-click': { // Mapping name (between element(s) and event)
                    selector: '.media-bookmark',  // Selector: id(#), class(.)
                    event: 'mouseClick',// Event (clicks, forms, etc)
                    properties: {
                        primary: {
                            name: 'BOOKMARK_MOUSE_CLICK',
                        },
                        secondary: {
                            name: 'BOOKMARK_MOUSE_CLICK',
                        },
                        auxiliary: {
                            name: 'BOOKMARK_MOUSE_CLICK',
                        },
                    },
                },
                'metadata-click': { // Mapping name (between element(s) and event)
                    selector: '.article-metadata',  // Selector: id(#), class(.)
                    event: 'mouseClick',// Event (clicks, forms, etc)
                    properties: {
                        primary: {
                            name: 'METADATA_MOUSE_CLICK',
                        },
                        secondary: {
                            name: 'METADATA_MOUSE_CLICK',
                        },
                        auxiliary: {
                            name: 'METADATA_MOUSE_CLICK',
                        },
                    },
                },
            },
        };

        LogUI.init(configurationObject);
        return;
    }
    
    throw Error("We can't find the LogUI client library. Did you include the logui.bundle.js file in the static directory?");
}


document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'visible') {
        startLogUIClient();
    } else if (document.visibilityState === 'hidden') {
      LogUI.stop();
    }
  });
  