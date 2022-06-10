**LogUI**

**Logging-as-a-Service**
* Service
* Track interactions on webpages
* optimized for single webpage
* but can also be used for multiple pages
* -> define which pages and what interactions should be considered


**Configuration Object**
- authorisationToken
- verbose debugging
- browserEvents

- applicationSpecificData
    - (info on applicationn/user/experiment)
    - userID
    -    (which) experimentral condition
    - logindetails

- trackingConfiguration
    - (which elements + what events to track + metadata)
    - mapping name (unique identifier)
    - selector (#elementid, #id, .className)
        - ol.resultsList li
    - event (DOM event: mouseover, click, )
    - name (log event name)
    - metadata

**LogUI Client API**
- interact with client programmatically
- buildDate
- buildEnviroment
- buildVersion
- clearSessionID()
    - split interactions up between sessions
- deleteApplicationSpecificDataKey(key)
- init(configObject)
    - start LogUI client
- isActive()
- logCustomMessage(objectToLog)
    - IF you want to log an interaction when event is not fired
    - creates EventType: customEvent
- stop()
    - stops LogUI Client
- updateApplicationSpecificData(updatedObject)
    - update ApplicationData
    - example:consentprovided, hasUpdated, hasReturned

**Integration Steps**
- Create config object
- chech LogUI client is loaded
- start LogUI Client (when DOM has been loaded)
- give stop() condition too when browser is closed or moving away?

´´´
// Step 1
let configurationObject = {
    // ...
    // Settings go here.
    // ...
}

document.addEventListener('DOMContentLoaded', function() {
    // Step 2
    if (window.LogUI) {
        // Step 3
        LogUI.init(configurationObject);
    }
    else {
        // LogUI is not available!
    }
});
´´´
**Event Handlers**
- Any MDN DOM event can be tracked
- mouseover combines mouseover+mouseout
```
'entity-mousemovements': {
    selector: '#entity-card',
    event: 'mouseHover',
    properties: {
        mouseenter: {
            name: 'ENTITY_CARD_HOVER_IN',
        },
        mouseleave: {
            name: 'ENTITY_CARD_HOVER_OUT',
        }
    },
}
```
- formSubmission captures submit event
```
'query-submission': {
    selector: '#search-form',
    event: 'formSubmission',
    name: 'QUERY_SUBMITTED',
    properties: {
        includeValues: [
            {
                nameForLog: 'completeQuery',
                sourcer: 'elementProperty',
                selector: '#input-box',
                lookFor: 'value',
            }
        ]
    }
}
```


**Metadata**
- extract additional data from extra source
    - nameForLog: name of extra data
    - sourcer: source from which to extract extra data
    - lookfor: field/attribute/property
TO BE CONTINUED


**Browser Events**
- Associated with Browser as a whole
    - Example: resize event of viewport of browser
            - contextMenu(rightclick)
    - block events while scrolling: eventsWhileScrolling
        - suggest to turn off to avoid erronous logging data!!<------------------
    - urlChanges
        - Apps that change URL without reloading the webpage

**Logs**
* eventType
* eventDetails
* timestamps
* applicationSpecificData
* metadata
* ID (applicationID, flightID, sessionID)