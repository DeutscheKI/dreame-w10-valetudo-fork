import {Box, Grid, Icon, Paper, styled} from "@mui/material";
import ControlsBody from "./ControlsBody";
import Logo from "../assets/icons/robomaid_logo_large.png";
import {ExpandLess as OpenIcon, ExpandMore as CloseIcon,} from "@mui/icons-material";
import React from "react";

const MobileControls: React.FunctionComponent<{ open: boolean, setOpen: (newOpen: boolean) => void }> = ({
    open,
    setOpen
}): JSX.Element => {
    const StyledIcon = styled(Icon)(({theme}) => {
        return {
            fontSize: "2.5em"
        };
    });
    const ControlsSheetContainer = styled(Box)(({ theme }) => {
        const color = theme.palette.mode === "light" ? "#ededed" : "#242424";

        return {
            backgroundColor: color,
            borderColor: color,
            borderTopWidth: "4px",
            borderLeftWidth: "1px",
            borderRightWidth: "1px",
            borderBottomWidth: "1px",
            borderStyle: "solid",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
            paddingTop: "0.125rem",
        };
    });


    return (
        <Paper sx={{
            height: "100%"
        }}>
            <ControlsSheetContainer
                style={{
                    display: open ? "" : "none",
                    height: "calc(95% - 36px)",
                }}
            >
                <Box p={1} sx={{
                    overflow: open ? "scroll" : "hidden",
                    height: "100%",
                }}>
                    <ControlsBody />
                </Box>
            </ControlsSheetContainer>
            <Grid
                container
                direction="row"
                sx={{
                    height: "36px"
                }}
                onClick={() => {
                    setOpen(!open);
                }}
            >
                <Grid item>
                        <img src={Logo}
                            style={{}}
                            height={36}
                        />
                </Grid>
                <Grid item sx={{
                    marginLeft: "auto"
                }}>
                    <StyledIcon as={open ? CloseIcon : OpenIcon}/>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default MobileControls;
