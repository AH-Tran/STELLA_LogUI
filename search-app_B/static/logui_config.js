let configurationObject = {
        logUIConfiguration: {
        endpoint: 'ws://localhost:8000/ws/endpoint/',
        authorisationToken: 'eyJ0eXBlIjoibG9nVUktYXV0aG9yaXNhdGlvbi1vYmplY3QiLCJhcHBsaWNhdGlvbklEIjoiZDRlMDg3ODEtZDg5MC00NzdkLTk2MDgtMjc5NGM2MDlhOTMxIiwiZmxpZ2h0SUQiOiI4OGY0MzRhZi05ZDExLTQ0MzQtODljZi05MTU0NzIxZjJlYzgifQ:1nrKsp:ARFySuFU7qZQIKuopbSZ89HX4cGFQutHHaYMAMtZqp8',
        verbose: true,
    },
    applicationSpecificData: {
        userID: 123,
    },
    trackingConfiguration: {
        'querybox-focus': {
            selector: '#submit-box',
            event: 'focus',
            name: 'QUERYBOX_FOCUS',
        },
        'querybox-focus': {
            selector: '#submit-box',
            event: 'hover',
            name: 'QUERYBOX_HOVER',
        },
        'querybox-losefocus': {
            selector: '#submit-box',
            event: 'blur',
            name: 'QUERYBOX_BLUR',
        },
        'querybox-focus': {
            selector: '#search-box',
            event: 'focus',
            name: 'SEARCHBOX_FOCUS',
        },
        'querybox-focus': {
            selector: '#search-box',
            event: 'hover',
            name: 'SEARCHBOX_HOVER',
        },
        'querybox-losefocus': {
            selector: '#search-box',
            event: 'blur',
            name: 'SEARCHBOX_HOVER',
        },
    },
    };

    document.addEventListener('DOMContentLoaded', function() {
        LogUI.init(configurationObject);
    });