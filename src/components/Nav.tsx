import {
  Switch,
  useTheme,
  Container,
  Col,
  Row,
  SwitchEvent,
} from "@nextui-org/react";
import { StyledNavContainer } from "./StyledNavContainer";
import { useTheme as useNextTheme } from "next-themes";
import { useCallback } from "react";
import React from "react";
import { MoonIcon } from "./Icons/MoonIcon";
import { SunIcon } from "./Icons/SunIcon";
import { Burger } from "@mantine/core";

// export const Navbar = () => {
//   const { setTheme } = useNextTheme();
//   const { isDark } = useTheme();

//   const handleSetTheme = useCallback(
//     (event) => {
//       setTheme(event.target.checked ? "dark" : "light");
//     },
//     [setTheme],
//   );

//   return (
//     <StyledNavContainer>
//       <Container
//         alignItems="center"
//         as="nav"
//         display="flex"
//         lg={true}
//         wrap="nowrap"
//       >
//         <Col>
//           <Burger />
//         </Col>
//         <Col>
//           <Row align="center" justify="flex-start">
//             Hello Fresh Recipe Search
//           </Row>
//         </Col>

//         <Col>
//           <Row align="center" justify="flex-end">
//             <Switch checked={isDark} onChange={handleSetTheme} />
//           </Row>
//         </Col>
//       </Container>
//     </StyledNavContainer>
//   );
// };

export const Navbar1 = ({ handleDrawer, opened }) => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  const handleSetTheme = useCallback(
    (event: SwitchEvent) => {
      setTheme(event.target.checked ? "dark" : "light");
    },
    [setTheme],
  );

  return (
    <StyledNavContainer>
      <Burger onClick={handleDrawer} opened={opened} />
      <Container
        alignItems="center"
        as="nav"
        display="flex"
        lg={true}
        wrap="nowrap"
      >
        <Col>
          <Row align="center" justify="flex-start">
            Hello Fresh Recipe Search
          </Row>
        </Col>

        <Col>
          <Row align="center" justify="flex-end">
            <Switch
              checked={isDark}
              icon={isDark ? <MoonIcon /> : <SunIcon />}
              onChange={handleSetTheme}
            />
          </Row>
        </Col>
      </Container>
    </StyledNavContainer>
  );
};
