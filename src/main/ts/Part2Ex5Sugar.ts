import { SugarElement, SugarDocument, Traverse, Insert } from "@ephox/sugar";

/*
Sugar

Sugar is our library for DOM manipulation. It's kinda our version of jquery, but with less $.
Sugar smooths over browser differences and gives us useful functions for manipulating the DOM.

When using Sugar, we don't use native DOM elements, we wrap them in the SugarElement data type.
This encourages us to only use Sugar functions to manipulate these elements, rather than the native DOM directly.

Wrapping

The first thing we need to know is how to wrap and unwrap a sugar element.
 */

const e1: HTMLSpanElement = document.createElement("span");

// wrapping
const se1: SugarElement<HTMLSpanElement> = SugarElement.fromDom(e1);

// unwrapping
const e2: Element = se1.dom;

/*
Pretty simple so far.

Now, above, we used `document.createElement`. We want to use Sugar functions everywhere, so we should do this instead:
 */

const se2: SugarElement<HTMLSpanElement> = SugarElement.fromTag("span");

// or

const se3: SugarElement<HTMLSpanElement> = SugarElement.fromTag(
  "span",
  document
);

/*
It's useful to be able to pass in a document parameter to this function, since we're often dealing with iframes as well
as the main document.

DONE: Use SugarElement's fromHtml and fromText functions to create a few elements.
 */
const se4: SugarElement<HTMLDivElement> = SugarElement.fromTag("div");

const se5: SugarElement<Text> = SugarElement.fromText("Hello world!");

/*
We often have to traverse from an element to its relatives. The Traverse module has useful functions for this.
 */
() => {
  const parent: SugarElement<HTMLDivElement> = SugarElement.fromTag("div");
  const kid: SugarElement<HTMLSpanElement> = SugarElement.fromTag("span");
  Insert.append(parent, kid);

  const parent2 = Traverse.parent(kid);

  // DONE: inspect the type of Traverse.parent and explain why that type was used.
  // Answer: It's type is `Optional<SugarElement<Node & ParentNode>>`,
  //         because the element can be absent if one's trying to get the document's root element parent.
  //         And it's an intersection of Node & ParentNode, because the parent element's type can differ.
};

() => {
  const parent: SugarElement<HTMLDivElement> = SugarElement.fromTag("div");
  const kid1: SugarElement<HTMLSpanElement> = SugarElement.fromTag("span");
  const kid2: SugarElement<HTMLDivElement> = SugarElement.fromTag("div");
  Insert.append(parent, kid1);
  Insert.append(parent, kid2);

  // DONE: starting at kid1, find kid2
  Traverse.nextSibling(kid1);

  // DONE: starting at kid2, find kid1
  Traverse.prevSibling(kid2);

  // DONE: starting at parent, find both kids
  Traverse.children(parent);

  // DONE: kid2 grew up - give it its own child node
  const grandkid1: SugarElement<HTMLSpanElement> = SugarElement.fromTag("span");
  Insert.append(kid2, grandkid1);
};
