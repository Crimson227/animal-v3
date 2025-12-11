(function () {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['donationTableRow'] = template({
        "compiler": [8, ">= 4.3.0"], "main": function (container, depth0, helpers, partials, data) {
            var helper, alias1 = depth0 != null ? depth0 : (container.nullContext || {}), alias2 = container.hooks.helperMissing, alias3 = "function", alias4 = container.escapeExpression, lookupProperty = container.lookupProperty || function (parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "<tr class=\"table-entry\">\n    <th>"
                + alias4(((helper = (helper = lookupProperty(helpers, "donationID") || (depth0 != null ? lookupProperty(depth0, "donationID") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "donationID", "hash": {}, "data": data }) : helper)))
                + "</th>\n    <th>"
                + alias4(((helper = (helper = lookupProperty(helpers, "firstName") || (depth0 != null ? lookupProperty(depth0, "firstName") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "firstName", "hash": {}, "data": data }) : helper)))
                + " "
                + alias4(((helper = (helper = lookupProperty(helpers, "lastName") || (depth0 != null ? lookupProperty(depth0, "lastName") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "lastName", "hash": {}, "data": data }) : helper)))
                + "</th>\n    <th>"
                + alias4(((helper = (helper = lookupProperty(helpers, "amount") || (depth0 != null ? lookupProperty(depth0, "amount") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "amount", "hash": {}, "data": data }) : helper)))
                + "</th>\n    <th>"
                + alias4(((helper = (helper = lookupProperty(helpers, "date") || (depth0 != null ? lookupProperty(depth0, "date") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "date", "hash": {}, "data": data }) : helper)))
                + "</th>\n    <th>"
                + alias4(((helper = (helper = lookupProperty(helpers, "note") || (depth0 != null ? lookupProperty(depth0, "note") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "note", "hash": {}, "data": data }) : helper)))
                + "</th>\n</tr>";
        }, "useData": true
    });
})();