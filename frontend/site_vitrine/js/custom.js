'use strict';

function main() {
    var links = document.querySelectorAll('link[rel="import"]');

    for (var i=0; i<links.length; i++) {
        var link = links[i];

        var template = link.import.querySelector('template');
        if (template && template.id) {
            var nodes = document.querySelectorAll('#' + template.id);
            var clone = document.importNode(template.content, true);
            for (var n=0; n < nodes.length; n++) {
                var node = nodes[n];
                if (node) {
                    console.log(node);
                    node.appendChild(clone);
                }
            }
        }
    }
}

main();
