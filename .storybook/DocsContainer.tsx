import React from "react";
import { DocsContainer as BaseContainer } from "@storybook/addon-docs";
import { useDarkMode } from "storybook-dark-mode";
import { themes } from "@storybook/theming";

export const DocsContainer = ({ children, context, ...rest }) => {
  const dark = useDarkMode();

  return (
    <BaseContainer
      {...rest}
      context={context}
      theme={dark ? themes.dark : themes.light}
    >
      {children}
    </BaseContainer>
  );
};

