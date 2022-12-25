import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, Paper, Typography} from "@mui/material";
import React, {FunctionComponent} from "react";
import {useCapabilitiesSupported} from "../CapabilitiesProvider";
import {Capability, useBasicControlMutation, useDismissWelcomeDialogMutation} from "../api";
import {MappingPassButtonItem, PersistentMapSwitchListItem} from "../settings/MapManagement";
import {ButtonListMenuItem} from "./list_menu/ButtonListMenuItem";
import {
    Layers as MappingPassIcon
} from "@mui/icons-material";

const FullCleanupButtonItem = (): JSX.Element => {
    const {
        mutate: executeBasicControlCommand,
        isLoading: basicControlIsExecuting
    } = useBasicControlMutation();

    return (
        <ButtonListMenuItem
            primaryLabel="Full Cleanup"
            secondaryLabel="Create a new map"
            icon={<MappingPassIcon/>}
            buttonLabel="Go"
            confirmationDialog={{
                title: "Start full cleanup?",
                body: "The robot needs to return to the dock on its own to save the newly created map. Do not interfere with the cleanup or else it won't be saved."
            }}
            action={() => {
                executeBasicControlCommand("start");
            }}
            actionLoading={basicControlIsExecuting}
        />
    );
};

const WelcomeDialog: FunctionComponent<{open: boolean}> = ({
    open
}): JSX.Element => {
    const [
        basicControlSupported,
        persistentMapControlSupported,
        mappingPassSupported
    ] = useCapabilitiesSupported(
        Capability.BasicControl,
        Capability.PersistentMapControl,
        Capability.MappingPass
    );
    const {
        mutate: dismissWelcomeDialog,
    } = useDismissWelcomeDialogMutation();

    return (
        <Dialog
            open={open}
        >
            <DialogTitle>
                Hello I am Laura!
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    style={{
                        whiteSpace: "pre-wrap"
                    }}
                    component="span"
                >
                    <Typography component="span">
                        For the initial mapping, please ensure that:
                        <ul>
                            <li>the robot is docked</li>
                            <li>all relevant doors are open</li>
                            <li>there are no loose cables lying around</li>
                            <li>all areas you don&apos;t want it to go are blocked off</li>
                        </ul>
                        With that done, here&apos;s what you&apos;ll need to let your robot create a new map:
                    </Typography>
                    {
                        persistentMapControlSupported &&
                        (
                            <>
                                <Paper
                                    elevation={2}
                                    sx={{marginTop: "1rem"}}
                                >
                                    <PersistentMapSwitchListItem/>
                                </Paper>
                            </>
                        )
                    }
                    {
                        mappingPassSupported &&
                        (
                            <>
                                <Paper
                                    elevation={2}
                                    sx={{marginTop: "1rem"}}
                                >
                                    <MappingPassButtonItem/>
                                </Paper>
                            </>
                        )
                    }
                    {
                        basicControlSupported &&
                        !mappingPassSupported &&
                        (
                            <>
                                <Paper
                                    elevation={2}
                                    sx={{marginTop: "1rem"}}
                                >
                                    <FullCleanupButtonItem/>
                                </Paper>
                            </>
                        )
                    }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    dismissWelcomeDialog();
                }}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WelcomeDialog;
