(function () {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['inventoryTableRow'] = template({
        "compiler": [8, ">= 4.3.0"], "main": function (container, depth0, helpers, partials, data) {
            var helper, alias1 = depth0 != null ? depth0 : (container.nullContext || {}), alias2 = container.hooks.helperMissing, alias3 = "function", alias4 = container.escapeExpression, lookupProperty = container.lookupProperty || function (parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "<tr class=\"table-entry\">\n    <th>"
                + alias4(((helper = (helper = lookupProperty(helpers, "itemID") || (depth0 != null ? lookupProperty(depth0, "itemID") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "itemID", "hash": {}, "data": data }) : helper)))
                + "</th>\n    <th>"
                + alias4(((helper = (helper = lookupProperty(helpers, "itemName") || (depth0 != null ? lookupProperty(depth0, "itemName") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "itemName", "hash": {}, "data": data }) : helper)))
                + "</th>\n    <th>"
                + alias4(((helper = (helper = lookupProperty(helpers, "category") || (depth0 != null ? lookupProperty(depth0, "category") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "category", "hash": {}, "data": data }) : helper)))
                + "</th>\n    <th>"
                + alias4(((helper = (helper = lookupProperty(helpers, "quantity") || (depth0 != null ? lookupProperty(depth0, "quantity") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "quantity", "hash": {}, "data": data }) : helper)))
                + "</th>\n    <th>"
                + alias4(((helper = (helper = lookupProperty(helpers, "unit") || (depth0 != null ? lookupProperty(depth0, "unit") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "unit", "hash": {}, "data": data }) : helper)))
                + "</th>\n</tr>";
        }, "useData": true
    });
})();