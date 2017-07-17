import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    ":focus": {
        "outline": "none"
    },
    "body": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "fontFamily": "Roboto, sans-serif"
    },
    "material-icons": {
        "fontFamily": "'Material Icons'",
        "fontWeight": "normal",
        "fontStyle": "normal",
        "fontSize": 24,
        "display": "inline-block",
        "lineHeight": 1,
        "textTransform": "none",
        "letterSpacing": "normal",
        "wordWrap": "normal",
        "whiteSpace": "nowrap",
        "direction": "ltr",
        "WebkitFontSmoothing": "antialiased",
        "textRendering": "optimizeLegibility",
        "MozOsxFontSmoothing": "grayscale",
        "fontFeatureSettings": "'liga'"
    },
    "bodyicons-docs": {
        "fontFamily": "Roboto, monospace",
        "fontSize": 16,
        "lineHeight": 28,
        "color": "rgba(0, 0, 0, 0.7)"
    },
    "bodyicons-docs material-icons": {
        "width": 1,
        "height": 1
    },
    "bodyicons-docs material-iconsmd-18": {
        "fontSize": 18
    },
    "bodyicons-docs material-iconsmd-24": {
        "fontSize": 24
    },
    "bodyicons-docs material-iconsmd-36": {
        "fontSize": 36
    },
    "bodyicons-docs material-iconsmd-48": {
        "fontSize": 48
    },
    "bodyicons-docs material-iconsmd-dark": {
        "color": "rgba(0, 0, 0, 0.54)"
    },
    "bodyicons-docs material-iconsmd-darkmd-inactive": {
        "color": "rgba(0, 0, 0, 0.26)"
    },
    "bodyicons-docs material-iconsmd-light": {
        "color": "white"
    },
    "bodyicons-docs material-iconsmd-lightmd-inactive": {
        "color": "rgba(255, 255, 255, 0.3)"
    },
    "bodyicons-docs material-iconsorange600": {
        "color": "#FB8C00"
    },
    "iconDiv spanmaterial-icons": {
        "fontSize": "18px!important"
    },
    "react-slider": {
        "height": "100%"
    },
    "calendar-sidebar": {
        "display": "flex",
        "justifyContent": "space-around",
        "borderBottom": "1px solid #ccc"
    },
    "rc-calendar-panel": {},
    "rc-calendar-footer-btn": {
        "display": "none"
    },
    "rc-calendar-range-middle": {
        "display": "none"
    },
    "rc-calendar-input-wrap": {
        "display": "none"
    },
    "div[data-reactroot] > div > div > div > div": {},
    "menuItem": {
        "paddingTop": "0!important",
        "paddingRight": "0!important",
        "paddingBottom": "0!important",
        "paddingLeft": "0!important"
    },
    "custom-table th": {
        "color": "#D5DDE5",
        "background": "#0D47A1",
        "borderBottom": "4px solid #9ea7af",
        "borderRight": "1px solid #343a45",
        "fontSize": 15,
        "fontWeight": "100",
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5,
        "textAlign": "center"
    },
    "custom-table tr": {
        "borderBottom": "1px solid #C1C3D1",
        "color": "#666B85",
        "fontSize": 15,
        "fontWeight": "normal"
    },
    "custom-table tr:hover td": {
        "background": "#4E5066",
        "color": "#FFFFFF",
        "borderBottom": "1px solid #22262e"
    },
    "custom-table tr:first-child": {
        "borderTop": "none"
    },
    "custom-table tr:last-child": {
        "borderBottom": "none"
    },
    "custom-table tr:nth-child(odd) td": {
        "background": "#EBEBEB"
    },
    "custom-table tr:nth-child(odd):hover td": {
        "background": "#4E5066"
    },
    "custom-table tr:last-child td:first-child": {
        "borderBottomLeftRadius": 3
    },
    "custom-table tr:last-child td:last-child": {
        "borderBottomRightRadius": 3
    },
    "custom-table td": {
        "background": "#FFFFFF",
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5,
        "textAlign": "left",
        "fontSize": 15,
        "borderRight": "1px solid #C1C3D1"
    },
    "geosuggest": {
        "fontSize": 1,
        "position": "relative",
        "width": "50%",
        "marginTop": "auto",
        "marginRight": "auto",
        "marginBottom": "auto",
        "marginLeft": "auto",
        "textAlign": "left"
    },
    "geosuggest__input": {
        "width": "100%",
        "border": "2px solid transparent",
        "boxShadow": "0 0 1px #3d464d",
        "paddingTop": 0.5,
        "paddingRight": 1,
        "paddingBottom": 0.5,
        "paddingLeft": 1,
        "WebkitTransition": "border 0.2s, box-shadow 0.2s",
        "transition": "border 0.2s, box-shadow 0.2s"
    },
    "geosuggest__input:focus": {
        "borderColor": "#267dc0",
        "boxShadow": "0 0 0 transparent"
    },
    "geosuggest__suggests": {
        "position": "absolute",
        "top": "100%",
        "left": 0,
        "right": 0,
        "maxHeight": 25,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "marginTop": -1,
        "background": "#fff",
        "border": "2px solid #267dc0",
        "borderTopWidth": 0,
        "overflowX": "hidden",
        "overflowY": "auto",
        "listStyle": "none",
        "zIndex": 5,
        "WebkitTransition": "max-height 0.2s, border 0.2s",
        "transition": "max-height 0.2s, border 0.2s"
    },
    "geosuggest__suggests--hidden": {
        "maxHeight": 0,
        "overflow": "hidden",
        "borderWidth": 0
    },
    "geosuggest__item": {
        "fontSize": 1,
        "paddingTop": 0.5,
        "paddingRight": 0.65,
        "paddingBottom": 0.5,
        "paddingLeft": 0.65,
        "cursor": "pointer"
    },
    "geosuggest__item:hover": {
        "background": "#f5f5f5"
    },
    "geosuggest__item:focus": {
        "background": "#f5f5f5"
    },
    "geosuggest__item--active": {
        "background": "#267dc0",
        "color": "#fff"
    },
    "geosuggest__item--active:hover": {
        "background": "#ccc"
    },
    "geosuggest__item--active:focus": {
        "background": "#ccc"
    },
    "form-horizontal form-group": {
        "marginBottom": 10
    }
});