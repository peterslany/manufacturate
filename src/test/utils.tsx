/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

/**
 * Jest render override of render for testing with Next.js useRouter
 * code from https://github.com/vercel/next.js/issues/7479#issuecomment-659859682
 */

import { render as defaultRender, RenderResult } from "@testing-library/react";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import { NextRouter } from "next/router";
import React from "react";

export * from "@testing-library/react";

// --------------------------------------------------
// Override the default test render with our own
//
// You can override the router mock like this:
//
// const { baseElement } = render(<MyComponent />, {
//   router: { pathname: '/my-custom-pathname' },
// });
// --------------------------------------------------
type DefaultParams = Parameters<typeof defaultRender>;
type RenderUI = DefaultParams[0];
type RenderOptions = DefaultParams[1] & { router?: Partial<NextRouter> };

export function render(
  ui: RenderUI,
  { wrapper, router, ...options }: RenderOptions = {}
): RenderResult {
  if (!wrapper) {
    // eslint-disable-next-line no-param-reassign
    wrapper = ({ children }) => (
      <RouterContext.Provider value={{ ...mockRouter, ...router }}>
        {children}
      </RouterContext.Provider>
    );
  }

  return defaultRender(ui, { wrapper, ...options });
}

const mockRouter: NextRouter = {
  basePath: "",
  pathname: "/",
  route: "/",
  asPath: "/",
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  isLocaleDomain: false,
  isReady: true,
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
};
