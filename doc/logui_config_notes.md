## Search Form:
[x] Click: Search
[x] Click: Advanced Search
[x] Fill: rpp Field
[x] Click:radioboxes
[x] Click:checkboxes
[x] query inserted?

## Searchresult related:
[x] Which result clicked
    [x] n1 vs n2~20
    [XX] type: EXP or BASE with metadata sourcer
[X] Time until click
[X] Amount of NO CLICK
[X] No Search Results retrieved -> no_result.html 

## Metadata:
[] userid generated
[] base_name, exp_name
[] sid

## Browser Events:
[] Scroll
[] Exit
[] No_result.html?
[] invalid html?

## EXAMPLE
'left-rail-item-mousemovements': {  // Mapping name (between element(s) and event)
    selector: '#left-rail-results li',  // Selector
    event: 'mouseover',  // Event
    name: 'LEFT_RAIL_ITEM_MOUSEOVER',  // Log event name
    metadata: [  // Metadata (optional)
        {
            nameForLog: 'resultRank',
            sourcer: 'elementAttribute',
            lookFor: 'data-rank',
        }
    ]
},
____

- #elementID will select an element on the page with the id attribute elementID;
- .className will select element(s) on the page that have the class className assigned to them; or something more complex
- ol.resultsList li will find the ordered list (ol) element(s) with the class resultsList, and select all of their children of the li tag (list item).
