import { e2e } from "..";
import { selectors } from "../../src/lib/e2e-selector";

describe("메인 페이지 동작 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("사용자가 페이지 진입 시 메인 페이지가 렌더링 된다.", () => {
    cy.get("[data-testid='main title']")
      .should("be.visible")
      .should("have.text", "메인 페이지");
  });

  it("사용자가 페이지 진입 시 메인 페이지가 렌더링 된다.(e2e)", () => {
    e2e.pages.Main.title()
      .should("be.visible")
      .should("have.text", "메인 페이지");
  });

  it("사용자가 회원가입 버튼을 누르면 회원가입 페이지로 이동한다.", () => {
    cy.getBySel(selectors.pages.Main.registerBtn).click();
    cy.url().should("include", "/register");
  });

  it("사용자가 회원가입 버튼을 누르면 회원가입 페이지로 이동한다.(e2e)", () => {
    e2e.pages.Main.visit();
    e2e.pages.Main.registerBtn().click();
    e2e().url().should("include", "/register");
  });
});
