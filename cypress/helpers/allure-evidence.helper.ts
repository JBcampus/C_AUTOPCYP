import * as allure from "allure-js-commons";
export const attachScreenshotOnError = (testName: string): void => {
  const screenshotName = `Error - ${testName}}`;

  cy.screenshot(screenshotName, {
    onAfterScreenshot(_element, props) {
      allure.attachmentPath(screenshotName, props.path, {
        contentType: allure.ContentType.PNG,
        fileExtension: "png",
      });
    },
  });
};