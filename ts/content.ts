let codemirrorBlocks = document.getElementsByClassName("CodeMirror-code");

//Add save code button after code block
const addBtn = (element: HTMLPreElement, margin: string) => {
  const text = element.innerText;
  const textCode = text.replace(/'/g, "%27");
  const url = chrome.runtime.getURL("images/saveicon.png");

  const searchParamsList = [
    `code="${encodeURIComponent(textCode)}"`,
    `url="${window.location.href}"`,
    `pagetitle="${encodeURIComponent(document.title)}`
  ];

  const newHTMLList = [
    `<div style="text-align:right; margin-bottom:"${margin}";">`,
      `<span style='background: #455a64; padding: 5px; border-radius: 0 0 5px 5px;  display: inline-block;'>`,
        `<a href='http://www.thiscodeworks.com/new?${searchParamsList.join('&')}"' target='_blank' style='color: white; text-decoration: none;'>`,
          `<img src='"${url}"' style='margin:0; vertical-align: bottom; height: 19px; width: 19px;'>`,
          'Save',
        '</a>',
      '</span>',
    '</div>'
  ];
  element.insertAdjacentHTML("afterend", newHTMLList.join('\n'));
}


if (codemirrorBlocks.length === 0) {
  const codeBlocks: HTMLCollectionOf<HTMLPreElement> = document.getElementsByTagName("pre");
  //For simple <pre> blocks
  Array.from(codeBlocks).forEach((element: HTMLPreElement) => {
    const style = window.getComputedStyle(element);
    const originalMargin = style.marginBottom;
    element.style.marginBottom = '0';
    addBtn(element, originalMargin);
  });
} else {
  Array.from(codemirrorBlocks).forEach((element: HTMLPreElement) => {
    const textBlock = element.innerText;
    const lineNumbers: HTMLCollectionOf<Element> = element.getElementsByClassName("CodeMirror-linenumber");
    Array.from(lineNumbers).forEach((line) => {
      // TODO: Type hint spcific element
      //@ts-ignore
      element.innerText = textBlock.replace(line.innerText, "");
    });
    addBtn(element, window.getComputedStyle(element).marginBottom);
  });
}
