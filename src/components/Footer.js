import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";
const useStyles = makeStyles((theme) => ({
  footer: {
    position: "relative",
    bottom: 0,
    width: "100%",
  },
  top: {
    height: "fit-content",
    backgroundColor: "#202c39",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    color: "white",
  },
  bottom: {
    height: "3em",
    backgroundColor: "#f29559",
    display: "flex",
    alignItems: "center",
    paddingLeft: "1em",
    fontWeight: "bold",
  },
  icon: {
    display: "flex",
    alignItems: "center",
    width: "30vw",
    marginBottom: "1em",
    justifyContent: "space-evenly",
    fontSize: "1.1em",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <div className={classes.top}>
        <h2 style={{ color: "#F2D492" }}>Contact Online</h2>
        <div style={{ marginDown: "50vw" }}>
          <div className={classes.icon}>
            <FacebookIcon />
            @funiture
            <TwitterIcon /> @funiture
            <YouTubeIcon /> Funiture Online
          </div>
        </div>
      </div>
      <div className={classes.bottom}>
        {" "}
        Copyright © 2021 Funiture All Rights Reserved
      </div>
    </div>
  );
};
export default Footer;
