import {Box, Button, ButtonGroup, CircularProgress, Grid, Paper, styled, Typography, useTheme} from "@mui/material";
import React from "react";
import RobotStatus from "./controls/RobotStatus";
import {
    BasicControlCommand,
    Capability,
    StatusState,
    useBasicControlMutation,
    useMapSegmentationPropertiesQuery,
    useRobotMapQuery,
    useRobotStatusQuery
} from "./api";
import LiveMap from "./map/LiveMap";
import {Home as HomeIcon, PlayArrow as StartIcon, Stop as StopIcon, SvgIconComponent} from "@mui/icons-material";
import {usePendingMapAction} from "./map/Map";

const AbsBox = styled(Box)({
    position: "absolute",
    left: "0px",
    right: "0px"
});

const Container = styled(Box)({
    flex: "1",
    height: "100%",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
});


interface CommandButton {
    command: BasicControlCommand;
    enabled: boolean;
    label: string;
    Icon: SvgIconComponent;
}

const HajoDashboard = (): JSX.Element => {
    const { data: status, isLoading: statusLoading } = useRobotStatusQuery();

    const {
        mutate: executeBasicControlCommand,
        isLoading: basicControlIsExecuting
    } = useBasicControlMutation();

    const {
        hasPendingMapAction: hasPendingMapAction
    } = usePendingMapAction();

    const {
        data: mapData,
        isLoading: mapIsLoading,
        isError: mapLoadError,
        refetch: refetchMap
    } = useRobotMapQuery();

    const {
        data: mapSegmentationProperties,
        isLoading: mapSegmentationPropertiesLoading
    } = useMapSegmentationPropertiesQuery(true);

    const theme = useTheme();

    if (statusLoading || (status === undefined) || (!mapData && mapIsLoading) || (!mapSegmentationProperties && mapSegmentationPropertiesLoading) ) {
        return (
            <Container>
                <CircularProgress/>
            </Container>
        );
    }

    if (!mapData) {
        return (
            <Container>
                <Typography align="center">No map data</Typography>;
            </Container>
        );
    }

    const { flag, value: state } = status;

    return (
        <AbsBox sx={{
            top: "0px",
            bottom: "0px",
        }}>
            <AbsBox sx={{
                top: "0px",
                height: "64px",
                padding: "4px"
            }}>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={6} container direction="column" sx={{paddingLeft:"8px"}}>
                        <Grid item>
                            <Typography variant="subtitle2">State</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="overline" color="textSecondary">
                                {status.value}
                                {status.flag !== "none" ? <> &ndash; {status.flag}</> : ""}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <ButtonGroup fullWidth variant="outlined">
                            <Button key="start" variant="outlined" size="medium"
                                disabled={!(state === "idle" || state === "docked" || state === "paused" || state === "error" ) || basicControlIsExecuting || hasPendingMapAction}
                                onClick={() => {
                                    executeBasicControlCommand("start");
                                }}
                                color="inherit" style={{height: "3.5em", borderColor: "inherit"}}><StartIcon /></Button>
                            <Button key="stop" variant="outlined" size="medium"
                                disabled={!(flag === "resumable" || (state !== "idle" && state !== "docked")) || basicControlIsExecuting || hasPendingMapAction}
                                onClick={() => {
                                    executeBasicControlCommand("stop");
                                }}
                                color="inherit" style={{height: "3.5em", borderColor: "inherit"}}><StopIcon /></Button>
                            <Button key="home" variant="outlined" size="medium"
                                disabled={!(state === "idle" || state === "paused" || state === "error" ) || basicControlIsExecuting || hasPendingMapAction}
                                onClick={() => {
                                    executeBasicControlCommand("home");
                                }}
                                color="inherit" style={{height: "3.5em", borderColor: "inherit"}}><HomeIcon /></Button>
                        </ButtonGroup >
                    </Grid>
                </Grid>
            </AbsBox>
            <AbsBox sx={{
                top: "64px",
                bottom: "0px",
            }}>
                <LiveMap
                    rawMap={mapData}
                    theme={theme}
                    trackSegmentSelectionOrder={true}

                    supportedCapabilities={{
                        [Capability.MapSegmentation]: true,
                        [Capability.ZoneCleaning]: true,
                        [Capability.GoToLocation]: false,
                        [Capability.Locate]: false
                    }}
                />
            </AbsBox>
        </AbsBox>
    );
};

export default HajoDashboard;
