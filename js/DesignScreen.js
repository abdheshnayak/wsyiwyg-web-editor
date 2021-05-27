var zoomValue = 100;
const wheelScrollHandler = (e) => {
  var smooth = 1;

  if (e.ctrlKey) {
    if (e.deltaY < 0) {
      zoomValue += smooth;
    } else {
      zoomValue -= smooth;
    }
    if (zoomValue <= 10) {
      zoomValue = 10;
      e.preventDefault();
      return;
    }

    document.querySelector(".design-outer").style =
      "-moz-transform: scale(" +
      (zoomValue / 100).toFixed(2) +
      ");-o-transform: scale(" +
      (zoomValue / 100).toFixed(2) +
      ");-webkit-transform: scale(" +
      (zoomValue / 100).toFixed(2) +
      ");";

    document.getElementById("zoom-status").innerText = zoomValue + "%";
    e.preventDefault();
    return false;
  }
};

window.addEventListener("wheel", wheelScrollHandler, { passive: false });
document.addEventListener("wheel", wheelScrollHandler, { passive: false });

// generate css for document
const getCssStyles = (elementOuter, string = "", styleScreen) => {
  var stl = elementOuter.getStyles({ styleScreen: styleScreen });
  if (stl.trim()) {
    var tempString = "." + elementOuter.className + "{" + stl + "}";
  } else tempString = "";

  elementOuter.childrens.forEach((element) => {
    tempString += getCssStyles(element, string, styleScreen);
  });
  return tempString;
};

function updateDesign(para, designRoot) {
  para.childrens.forEach((element) => {
    var elementDom = document.createElement(element.element);
    if (element.className) {
      elementDom.classList.add(element.className);
    }

    elementDom.innerText = element.text || "";

    element.attributes.getAttributes().forEach((attr) => {
      elementDom.setAttribute(attr.attribute, attr.value);
    });

    designRoot.appendChild(elementDom);

    hashMap.setDesignDom(element, elementDom);

    updateDesign(element, elementDom);
  });
}

const refreshDesign = () => {
  body.className = body.className || "designRoot";
  var viewport = document.createElement("meta");
  viewport.setAttribute("name", "viewport");
  viewport.setAttribute("content", "width=device-width");

  var StylesDom = document.createElement("style");

  StylesDom.innerText = getCssStyles(body, "", "styles");

  StylesDom.innerText +=
    "@media screen and (max-width: 1025px) {" +
    getCssStyles(body, "", "tabletStyles") +
    "}";

  StylesDom.innerText +=
    "@media screen and (max-width: 415px) {" +
    getCssStyles(body, "", "mobileStyles") +
    "}";

  var x = document.getElementById("root");

  x.contentWindow.addEventListener("wheel", wheelScrollHandler, {
    passive: false,
  });
  x.contentDocument.addEventListener("wheel", wheelScrollHandler, {
    passive: false,
  });

  var iframe = x.contentWindow || x.contentDocument;
  if (iframe.document) iframe = iframe.document;

  iframe.body.innerText = null;
  iframe.head.innerText = null;
  iframe.head.appendChild(viewport);
  iframe.head.appendChild(StylesDom);
  updateDesign(body, iframe.body);
  iframe.body.classList.add(body.className);

  hashMap.setDesignDom(body, iframe.body);
};
