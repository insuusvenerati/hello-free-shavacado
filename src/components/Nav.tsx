import { Switch, useTheme, Container, Col, Row } from "@nextui-org/react";
import { StyledNavContainer } from "./StyledNavContainer";
import { useTheme as useNextTheme } from "next-themes";
import { useCallback } from "react";
import React from "react";
import { MoonIcon } from "./Icons/MoonIcon";
import { SunIcon } from "./Icons/SunIcon";

export const Navbar = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  const handleSetTheme = useCallback(
    (event) => {
      setTheme(event.target.checked ? "dark" : "light");
    },
    [setTheme]
  );

  return (
    <StyledNavContainer>
      <Container
        lg={true}
        as="nav"
        display="flex"
        wrap="nowrap"
        alignItems="center"
      >
        <Col>
          <Row justify="flex-start" align="center">
            Hello Fresh Recipe Search
          </Row>
        </Col>

        <Col>
          <Row justify="flex-end" align="center">
            <Switch checked={isDark} onChange={handleSetTheme} />
          </Row>
        </Col>
      </Container>
    </StyledNavContainer>
  );
};

export const Navbar1 = React.memo(function Navbar1() {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  const handleSetTheme = useCallback(
    (event) => {
      setTheme(event.target.checked ? "dark" : "light");
    },
    [setTheme]
  );

  return (
    <StyledNavContainer>
      <Container
        lg={true}
        as="nav"
        display="flex"
        wrap="nowrap"
        alignItems="center"
      >
        <Col>
          <Row justify="flex-start" align="center">
            Hello Fresh Recipe Search
          </Row>
        </Col>

        <Col>
          <Row justify="flex-end" align="center">
            <Switch
              checked={isDark}
              onChange={handleSetTheme}
              icon={isDark ? <MoonIcon /> : <SunIcon />}
            />
          </Row>
        </Col>
      </Container>
    </StyledNavContainer>
  );
});
