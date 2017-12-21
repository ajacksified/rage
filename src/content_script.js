walk(document.body);

function walk(node) {
  // I stole this function from here:
  // http://is.gd/mwZp7E

  var child, next;

  if (node.tagName || node.classList) {
    if (['input', 'textarea'].includes(node.tagName.toLowerCase()) || node.classList.contains('ace_editor')) {
      return;
    }
  }

  // element, document, document fragment
  if ([1,9,11].includes(node.nodeType)) {
    child = node.firstChild;
    while (child) {
      next = child.nextSibling;
      walk(child);
      child = next;
    }
  // text node
  } else if (node.nodeType === 3) {
    handleText(node);
  }
}

function handleText(textNode) {
  var v = textNode.nodeValue;

  v = v.replace(/\b([rR])ate\b/g, "$1age");
  v = v.replace(/\b([rR])ates\b/g, "$1ages");
  v = v.replace(/\b([rR])ating\b/g, "$1aging");
  v = v.replace(/\b([rR])ated\b/g, "$1aged");

  textNode.nodeValue = v;
}
