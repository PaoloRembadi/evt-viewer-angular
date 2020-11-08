import { Injectable } from '@angular/core';

import { Page, XMLElement } from '../../models/evt-models';
import { getElementsAfterTreeNode, getElementsBetweenTreeNode, isNestedInElem } from '../../utils/dom-utils';
import { Map } from '../../utils/js-utils';
import { GenericParserService } from './generic-parser.service';

@Injectable({
  providedIn: 'root',
})
export class StructureXmlParserService {
  constructor(
    private genericParserService: GenericParserService,
  ) {
  }

  parsePages(document: XMLElement) {
    const pages: Map<Page> = {};
    const pagesIndexes: string[] = [];
    const pageTagName = 'pb';

    if (document) {
      const pageElements = document.querySelectorAll(pageTagName);
      const pagesNumber = pageElements.length;

      if (pagesNumber > 0) {
        this.parseDocumentPages(pageElements, pagesNumber, pages, pagesIndexes);
      } else {
        this.parseDocument(document, pages, pagesIndexes);
      }
    }

    return {
      pages,
      pagesIndexes,
    };
  }

  parseDocumentPages(pageElements: NodeListOf<Element>, pagesNumber: number, pages: Map<Page>, pagesIndexes: string[]) {
    pageElements.forEach((element, i) => {
      let pageContent: XMLElement[] = [];
      const isPbFront = isNestedInElem(element, 'front');

      if (pagesNumber === 1) {
        pageContent = getElementsAfterTreeNode(element);
      }

      if (pagesNumber !== 1 && !isPbFront) {
        const isFirstPage = i === 0;
        const isLastPage = i === pagesNumber - 1;

        if (isFirstPage) {
          pageContent = getElementsBetweenTreeNode(element.closest('body'), pageElements[i + 1]);
        }

        if (isLastPage) {
          pageContent = getElementsAfterTreeNode(element);
        }

        if (!isFirstPage && !isLastPage) {
          pageContent = getElementsBetweenTreeNode(element, pageElements[i + 1]);
        }
      }

      if (isPbFront) {
        pageContent = getElementsBetweenTreeNode(element, pageElements[i + 1])
          .filter((el: XMLElement) => el.nodeType !==8 && this.getFrontOriginalElements(el));
      }

      // Exclude nodes in <back>
      pageContent = pageContent.filter(el => {
        if (el.nodeType === 3) {
          return !el.parentElement.closest('back') && el.parentElement.tagName !== 'back';
        }
        if (el.nodeType === 1) {
          return !el.closest('back') && el.tagName !== 'back';
        }

        return false;
      });

      const page: Page = {
        id: element.getAttribute('xml:id') || 'page_' + (pagesIndexes.length + 1),
        label: element.getAttribute('n') || 'Page ' + (pagesIndexes.length + 1),
        originalContent: pageContent,
        parsedContent: this.parsePageContent(isPbFront, pageContent),
      };
      pages[page.id] = page;
      pagesIndexes.push(page.id);
    });
  }

  parseDocument(document: XMLElement, pages: Map<Page>, pagesIndexes: string[]) {
    // TODO: Decide how to handle text division when there are no <pb>s
    const mainText = document.querySelector('text');
    const content = Array.from(mainText.childNodes);
    const page: Page = {
      id: `page_${new Date().getTime()}`,
      label: 'Main Text',
      originalContent: content as XMLElement[],
      parsedContent: content.map(child => this.genericParserService.parse(child as XMLElement))
        // tslint:disable-next-line: no-string-literal
        .filter(c => !!c['content']), // TODO: FIXME: fix property access
    };
    pages[page.id] = page;
    pagesIndexes.push(page.id);
  }

  parsePageContent(isPbFront: boolean, pageContent) {
    if (isPbFront) {
      const frontOriginalContent = [];
      pageContent.map((child: XMLElement) => {
        if (child.nodeType === 3 || isNestedInElem(child, '', [{ key: 'type', value:'document_front' }])) {
          frontOriginalContent.push(this.genericParserService.parse(child));
        } else {
          const originalContentChild = child.querySelectorAll('[type="document_front"]');
          if (child.querySelectorAll('[type="document_front"]').length > 0) {
            Array.from(originalContentChild).forEach((c) => frontOriginalContent.push(this.genericParserService.parse(c as XMLElement)));
          }
          if (child.getAttribute('type') === 'document_front') {
            frontOriginalContent.push(this.genericParserService.parse(child));
          }
        }
      });

      return frontOriginalContent;
    }

    return pageContent.map((child: XMLElement) => this.genericParserService.parse(child));
  }

  getFrontOriginalElements(el: HTMLElement) {
    return el.nodeType !== 3 &&
      (el.getAttribute('type') === 'document_front' ||
      el.querySelectorAll('[type=document_front]').length > 0) ||
      isNestedInElem(el, '', [{ key: 'type', value:'document_front' }]);
  }
}
