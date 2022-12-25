import SplashLogo from "../assets/icons/robomaid_splash.png";
import {CircularProgress, Grid} from "@mui/material";

const ValetudoSplash = (): JSX.Element => {

    return (
        <Grid
            container
            sx={{
                width: "90%",
                height: "50%",
                margin: "auto",
                marginTop: "25%",
                marginBottom: "25%",
                maxWidth: "600px",
                minHeight: "90%",
            }}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Grid
                item
            >
                <img src={SplashLogo}
                    style={{
                        width: "90%",
                        marginLeft: "5%"
                    }}
                />
            </Grid>
            <Grid
                item
                sx={{marginTop: "3em"}}
            >
                <CircularProgress/>
            </Grid>
        </Grid>
    );
};

export default ValetudoSplash;
