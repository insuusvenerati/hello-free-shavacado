import { Switch, useTheme, Container, Col, Row } from "@nextui-org/react";
import { StyledNavContainer } from "./StyledNavContainer";
import { useTheme as useNextTheme } from "next-themes";

export const Navbar = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <StyledNavContainer detached={true}>
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
              onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            />
          </Row>
        </Col>
      </Container>
    </StyledNavContainer>
  );
};
