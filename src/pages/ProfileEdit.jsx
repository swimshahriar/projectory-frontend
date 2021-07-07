import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  TextField,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { AiFillDelete } from "react-icons/ai";

// components
import RoundedBox from "../components/RoundedBox";

// acitons
import {
  fetchUserInfo,
  updateUserInfo,
  changePass,
} from "../actions/userAction";

// styles
const useStyles = makeStyles((theme) => ({
  hover: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  mtLg: {
    marginTop: 10,
  },
  formContainer: {
    marginTop: 50,
    marginBottom: 50,
    width: "80%",

    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
  },
  form: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    "& button": {
      marginTop: 20,
    },
  },
  formInput: {
    marginBottom: 20,
    width: "100%",
  },
  withBtn: {
    width: "80%",
  },
}));

const ProfileEdit = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { res, user, isLoading, error } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const userId = pathname.split("/")[2];

  const [oldData, setOldData] = useState({
    firstName: "",
    lastName: "",
    tagLine: "",
    location: "",
    description: "",
    avatar: "",
    skills: "",
    languages: "",
    educations: "",
    linkName: "",
    link: "",
  });
  const [skills, setSkills] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [educations, setEducations] = useState(null);
  const [linkedAccounts, setLinkedAccounts] = useState(null);
  const [changePassData, setChangePassData] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  // if not logged in
  if (!token) {
    history.push("/auth");
  }

  // fetch user data
  useEffect(() => {
    const fetchInfo = async () => await dispatch(fetchUserInfo(userId));
    fetchInfo();

    if (user) {
      setOldData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        tagLine: user.tagLine || "",
        location: user.location || "",
        description: user.description || "",
        avatar: user.avatar || "",
      });

      user.skills && setSkills([...user.skills]);
      user.languages && setLanguages([...user.languages]);
      user.educations && setEducations([...user.educations]);
      user.linkedAccounts && setLinkedAccounts([...user.linkedAccounts]);
    }

    return async () => {
      await dispatch({ type: "LOADING_USER" });
      await dispatch({ type: "CLEAR_USER" });
    };
  }, []);

  // handle submit
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      ...oldData,
      skills,
      languages,
      educations,
      linkedAccounts,
    };

    await dispatch(updateUserInfo(data, token));
  };

  // change pass handler
  const changePassHandler = async (e) => {
    e.preventDefault();
    if (
      changePassData.confirmPassword === "" ||
      changePassData.password === "" ||
      changePassData.currentPassword === ""
    ) {
      return;
    }
    await dispatch(changePass(changePassData, token));
  };

  if (isLoading) {
    return (
      <Container>
        <Typography variant="h4" align="center">
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box mt={3}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gridGap={20}
          boxShadow={3}
          borderRadius={5}
          p={5}
          mb={5}
        >
          <Box>
            <Typography variant="h6" className={classes.mtLg}>
              Email: {user.email}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" className={classes.mtLg}>
              User Name: {user.userName}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h4" align="center" className={classes.mtLg}>
          Edit Info
        </Typography>

        {/* update form */}
        <Container className={classes.formContainer}>
          {error && (
            <Alert className={classes.mtLg} severity="error">
              {error}
            </Alert>
          )}
          {res && (
            <Alert className={classes.errorText} severity="success">
              {res}
            </Alert>
          )}
          <form onSubmit={submitHandler} className={classes.form}>
            <TextField
              label="Avatar"
              variant="outlined"
              value={oldData.avatar}
              onChange={(e) =>
                setOldData((prev) => {
                  return { ...prev, avatar: e.target.value };
                })
              }
              className={classes.formInput}
            />
            <TextField
              label="First Name"
              variant="outlined"
              value={oldData.firstName}
              onChange={(e) =>
                setOldData((prev) => {
                  return { ...prev, firstName: e.target.value };
                })
              }
              className={classes.formInput}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              value={oldData.lastName}
              onChange={(e) =>
                setOldData((prev) => {
                  return { ...prev, lastName: e.target.value };
                })
              }
              className={classes.formInput}
            />
            <TextField
              label="Tag Line"
              variant="outlined"
              value={oldData.tagLine}
              onChange={(e) =>
                setOldData((prev) => {
                  return { ...prev, tagLine: e.target.value };
                })
              }
              className={classes.formInput}
            />
            <TextField
              label="Location"
              variant="outlined"
              value={oldData.location}
              onChange={(e) =>
                setOldData((prev) => {
                  return { ...prev, location: e.target.value };
                })
              }
              className={classes.formInput}
            />
            <TextField
              label="Description"
              variant="outlined"
              value={oldData.description}
              onChange={(e) =>
                setOldData((prev) => {
                  return { ...prev, description: e.target.value };
                })
              }
              className={classes.formInput}
            />
            {/* skillS */}
            <Box
              border={2}
              borderColor="textSecondary"
              borderRadius={5}
              padding={2}
              width="90%"
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <TextField
                  label="Skills"
                  variant="outlined"
                  value={oldData.skills}
                  onChange={(e) =>
                    setOldData((prev) => {
                      return { ...prev, skills: e.target.value };
                    })
                  }
                  className={classes.formInput + " " + classes.withBtn}
                />
                <Box ml={1} mt={-5}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (oldData.skills === "") return;
                      setSkills((prev) =>
                        prev ? [...prev, oldData.skills] : [oldData.skills]
                      );
                      setOldData((prev) => {
                        return { ...prev, skills: "" };
                      });
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </Box>
              <Box display="flex" flexWrap="wrap">
                {!skills ? (
                  <Typography>Not yet added.</Typography>
                ) : (
                  skills.map((skill, idx) => (
                    <Box
                      className={classes.hover}
                      onClick={() =>
                        setSkills((prev) =>
                          prev.filter((item) => item !== skill)
                        )
                      }
                    >
                      <RoundedBox
                        key={idx}
                        light={true}
                        icon={true}
                        borderColor={
                          idx % 2 == 0 ? "primary.main" : "secondary.main"
                        }
                      >
                        {skill}
                        <AiFillDelete />
                      </RoundedBox>
                    </Box>
                  ))
                )}
              </Box>
            </Box>

            {/* languages */}
            <Box
              border={2}
              borderColor="textSecondary"
              borderRadius={5}
              padding={2}
              mt={2}
              width="90%"
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <TextField
                  label="Languages"
                  variant="outlined"
                  value={oldData.languages}
                  onChange={(e) =>
                    setOldData((prev) => {
                      return { ...prev, languages: e.target.value };
                    })
                  }
                  className={classes.formInput + " " + classes.withBtn}
                />
                <Box ml={1} mt={-5}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (oldData.languages === "") return;
                      setLanguages((prev) =>
                        prev
                          ? [...prev, oldData.languages]
                          : [oldData.languages]
                      );
                      setOldData((prev) => {
                        return { ...prev, languages: "" };
                      });
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </Box>
              <Box display="flex" flexWrap="wrap">
                {!languages ? (
                  <Typography>Not yet added.</Typography>
                ) : (
                  languages.map((lan, idx) => (
                    <Box
                      className={classes.hover}
                      onClick={() =>
                        setLanguages((prev) =>
                          prev.filter((item) => item !== lan)
                        )
                      }
                    >
                      <RoundedBox
                        key={idx}
                        light={true}
                        icon={true}
                        borderColor={
                          idx % 2 == 0 ? "primary.main" : "secondary.main"
                        }
                      >
                        {lan}
                        <AiFillDelete />
                      </RoundedBox>
                    </Box>
                  ))
                )}
              </Box>
            </Box>

            {/* education */}
            <Box
              border={2}
              borderColor="textSecondary"
              borderRadius={5}
              padding={2}
              mt={2}
              width="90%"
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <TextField
                  label="Educations"
                  variant="outlined"
                  value={oldData.educations}
                  onChange={(e) =>
                    setOldData((prev) => {
                      return { ...prev, educations: e.target.value };
                    })
                  }
                  className={classes.formInput + " " + classes.withBtn}
                />
                <Box ml={1} mt={-5}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (oldData.educations === "") return;
                      setEducations((prev) =>
                        prev
                          ? [...prev, oldData.educations]
                          : [oldData.educations]
                      );
                      setOldData((prev) => {
                        return { ...prev, educations: "" };
                      });
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </Box>
              <Box display="flex" flexWrap="wrap">
                {!educations ? (
                  <Typography>Not yet added.</Typography>
                ) : (
                  educations.map((edu, idx) => (
                    <Box
                      className={classes.hover}
                      onClick={() =>
                        setEducations((prev) =>
                          prev.filter((item) => item !== edu)
                        )
                      }
                    >
                      <RoundedBox
                        key={idx}
                        light={true}
                        icon={true}
                        borderColor={
                          idx % 2 == 0 ? "primary.main" : "secondary.main"
                        }
                      >
                        {edu}
                        <AiFillDelete />
                      </RoundedBox>
                    </Box>
                  ))
                )}
              </Box>
            </Box>

            {/* links */}
            <Box
              border={2}
              borderColor="textSecondary"
              borderRadius={5}
              padding={2}
              mt={2}
              width="90%"
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <TextField
                  label="Link Name"
                  variant="outlined"
                  value={oldData.linkName}
                  onChange={(e) =>
                    setOldData((prev) => {
                      return { ...prev, linkName: e.target.value };
                    })
                  }
                  className={classes.formInput + " " + classes.withBtn}
                />
                <TextField
                  label="Url"
                  variant="outlined"
                  value={oldData.url}
                  onChange={(e) =>
                    setOldData((prev) => {
                      return { ...prev, link: e.target.value };
                    })
                  }
                  className={classes.formInput + " " + classes.withBtn}
                />
                <Box mt={-2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (oldData.linkName === "" || oldData.url === "") return;
                      setLinkedAccounts((prev) =>
                        prev
                          ? [
                              ...prev,
                              { title: oldData.linkName, link: oldData.link },
                            ]
                          : [{ title: oldData.linkName, link: oldData.link }]
                      );
                      setOldData((prev) => {
                        return { ...prev, linkName: "", link: "" };
                      });
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </Box>
              <Box display="flex" flexWrap="wrap" mt={2}>
                {!linkedAccounts || linkedAccounts.length <= 0 ? (
                  <Typography>Not yet added.</Typography>
                ) : (
                  linkedAccounts.map((link, idx) => (
                    <Box
                      className={classes.hover}
                      onClick={() =>
                        setLinkedAccounts((prev) =>
                          prev.filter((item) => item.title !== link.title)
                        )
                      }
                    >
                      <RoundedBox
                        key={idx}
                        light={true}
                        icon={true}
                        borderColor={
                          idx % 2 == 0 ? "primary.main" : "secondary.main"
                        }
                      >
                        {link.title}
                        <AiFillDelete />
                      </RoundedBox>
                    </Box>
                  ))
                )}
              </Box>
            </Box>

            {isLoading ? (
              <CircularProgress color="primary" />
            ) : (
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={submitHandler}
              >
                Update
              </Button>
            )}
          </form>
        </Container>
      </Box>
      {/* change pass form */}
      <Container className={classes.formContainer}>
        <Typography variant="h4" align="center" className={classes.mtLg}>
          Change Password
        </Typography>
        {error && (
          <Alert className={classes.mtLg} severity="error">
            {error}
          </Alert>
        )}
        <form onSubmit={changePassHandler} className={classes.form}>
          <TextField
            label="Current Password"
            variant="outlined"
            type="password"
            required={true}
            value={changePassData.currentPassword}
            onChange={(e) =>
              setChangePassData((prev) => {
                return { ...prev, currentPassword: e.target.value };
              })
            }
            className={classes.formInput}
          />
          <TextField
            label="New Password"
            variant="outlined"
            type="password"
            required={true}
            value={changePassData.password}
            onChange={(e) =>
              setChangePassData((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
            className={classes.formInput}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            required={true}
            value={changePassData.confirmPassword}
            onChange={(e) =>
              setChangePassData((prev) => {
                return { ...prev, confirmPassword: e.target.value };
              })
            }
            className={classes.formInput}
          />

          {isLoading ? (
            <CircularProgress color="primary" />
          ) : (
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={(e) => changePassHandler(e)}
            >
              Change
            </Button>
          )}
        </form>
      </Container>
    </Container>
  );
};

export default ProfileEdit;
