import React, { useEffect } from "react";
import { DocsContainer as BaseContainer } from "@storybook/addon-docs";
import { useDarkMode } from "storybook-dark-mode";
import { themes } from "@storybook/theming";

const root = document.documentElement;

export const DocsContainer = ({ children, context, ...rest }) => {
  const isDarkMode = useDarkMode();

  useEffect(() => {
    root.classList.add(isDarkMode ? 'dark' : 'light');
    root.classList.remove(isDarkMode ? 'light' : 'dark');

    return () => {
      root.classList.remove('light', 'dark');
    }
  }, [isDarkMode])

  return (
    <BaseContainer
      {...rest}
      context={context}
      theme={isDarkMode ? themes.dark : themes.light}
    >
      {children}
    </BaseContainer>
  );
};

