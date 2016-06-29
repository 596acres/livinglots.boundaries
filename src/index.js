//
// Add boundary-handling to a Leaflet map
//
// The boundary layer allows exactly one boundary at a time and fires events
// (boundarieschange) when this layer changes.
//

var mixin = {
    boundariesLayer: null,

    _initBoundaries: function () {
        this.boundariesLayer = L.geoJson(null, {
            color: '#FFA813',
            fill: false,
            opacity: 1
        }).addTo(this);
    },

    removeBoundaries: function (data, options) {
        this.boundariesLayer.clearLayers();
        this.fire('boundarieschange');
    },

    updateBoundaries: function (data, options) {
        this.boundariesLayer.clearLayers();
        this.boundariesLayer.addData(data);
        this.fire('boundarieschange');
        if (options.zoomToBounds) {
            this.fitBounds(this.boundariesLayer.getBounds());
        }
    }

};

module.exports = {
    initialize: function (mapClass) {
        mapClass = mapClass || L.Map;
        mapClass.include(mixin);
        mapClass.addInitHook('_initBoundaries');
    },

    mixin: mixin
};
