import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useMemo, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
// acitons
import { changePass, fetchUserInfo, updateUserInfo } from "../actions/userAction";
import CloudImage from "../components/CloudImage";
// components
import RoundedBox from "../components/RoundedBox";
import SweetAlert from "../components/SweetAlert";

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
  select: {
    width: "100%",
    marginBottom: 10,
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

  const [imageInputState, _] = useState("");
  const [previewSource, setPreviewSource] = useState(null);
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
    birthday: "",
    gender: "",
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
    (async () => {
      await dispatch(fetchUserInfo(userId));
    })();

    return async () => {
      await dispatch({ type: "LOADING_USER" });
      await dispatch({ type: "CLEAR_USER" });
    };
  }, [dispatch, userId]);

  useMemo(() => {
    if (!isLoading && user) {
      setOldData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        tagLine: user.tagLine || "",
        location: user.location || "",
        description: user.description || "",
        avatar: user.avatar || "",
        birthday: user.birthday || "",
        gender: user.gender || "",
      });

      if (user.skills) {
        setSkills([...user.skills]);
      }
      if (user.languages) {
        setLanguages([...user.languages]);
      }
      if (user.educations) {
        setEducations([...user.educations]);
      }
      if (user.linkedAccounts) {
        setLinkedAccounts([...user.linkedAccounts]);
      }
    }
  }, [isLoading, user]);

  // file input hanlder
  const fileInputHanlder = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // handle submit
  const submitHandler = async (e) => {
    e.preventDefault();
    let data = {
      ...oldData,
      skills,
      languages,
      educations,
      linkedAccounts,
    };
    if (previewSource) {
      data = {
        ...oldData,
        skills,
        languages,
        educations,
        linkedAccounts,
        avatar: previewSource,
      };
    }

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

  // update success
  if (res) {
    SweetAlert.fire({
      title: "Success",
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: "top-right",
    });
  }

  if (isLoading && !user) {
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
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gridGap={5}
              flexWrap="wrap"
            >
              {oldData.avatar && !previewSource && (
                <CloudImage
                  uploadPreset="projectory_avatars"
                  publicId={oldData.avatar}
                  width="200"
                  height="200"
                  radius="max"
                  crop="fill"
                />
              )}

              {previewSource && (
                <Box
                  onClick={() => {
                    setPreviewSource(null);
                  }}
                >
                  <img
                    src={previewSource}
                    alt="choosen"
                    className={classes.hover}
                    style={{
                      width: "200px",
                      minWidth: "100px",
                      height: "200px",
                      minHeight: "100px",
                    }}
                  />
                </Box>
              )}
            </Box>
            <Box m={3}>
              <Button variant="outlined" color="secondary" component="label">
                Choose Avatar
                <input type="file" value={imageInputState} onChange={fileInputHanlder} hidden />
              </Button>
            </Box>

            <TextField
              label="First Name"
              variant="outlined"
              value={oldData.firstName}
              onChange={(e) => setOldData((prev) => ({ ...prev, firstName: e.target.value }))}
              className={classes.formInput}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              value={oldData.lastName}
              onChange={(e) => setOldData((prev) => ({ ...prev, lastName: e.target.value }))}
              className={classes.formInput}
            />
            <TextField
              label="Tag Line"
              variant="outlined"
              value={oldData.tagLine}
              onChange={(e) => setOldData((prev) => ({ ...prev, tagLine: e.target.value }))}
              className={classes.formInput}
            />
            <TextField
              label="Location"
              variant="outlined"
              value={oldData.location}
              onChange={(e) => setOldData((prev) => ({ ...prev, location: e.target.value }))}
              className={classes.formInput}
            />
            <FormControl variant="outlined" className={classes.select}>
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                labelId="gender"
                label="Gender"
                variant="outlined"
                value={oldData.gender}
                onChange={(e) => setOldData((prev) => ({ ...prev, gender: e.target.value }))}
                className={classes.select}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Birthday"
              variant="outlined"
              type="date"
              value={oldData.birthday}
              onChange={(e) => setOldData((prev) => ({ ...prev, birthday: e.target.value }))}
              className={classes.formInput}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              multiline
              rows={8}
              label="Description"
              variant="outlined"
              value={oldData.description}
              onChange={(e) => setOldData((prev) => ({ ...prev, description: e.target.value }))}
              className={classes.formInput}
            />
            {/* skillS */}
            <Box border={2} borderColor="textSecondary" borderRadius={5} padding={2} width="90%">
              <Box display="flex" justifyContent="center" alignItems="center">
                <TextField
                  label="Skills"
                  variant="outlined"
                  value={oldData.skills}
                  onChange={(e) => setOldData((prev) => ({ ...prev, skills: e.target.value }))}
                  className={`${classes.formInput} ${classes.withBtn}`}
                />
                <Box ml={1} mt={-5}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (oldData.skills === "") return;
                      setSkills((prev) => (prev ? [...prev, oldData.skills] : [oldData.skills]));
                      setOldData((prev) => ({ ...prev, skills: "" }));
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
                      key={idx}
                      className={classes.hover}
                      onClick={() => setSkills((prev) => prev.filter((item) => item !== skill))}
                    >
                      <RoundedBox
                        light
                        icon
                        borderColor={idx % 2 === 0 ? "primary.main" : "secondary.main"}
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
                  onChange={(e) => setOldData((prev) => ({ ...prev, languages: e.target.value }))}
                  className={`${classes.formInput} ${classes.withBtn}`}
                />
                <Box ml={1} mt={-5}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (oldData.languages === "") return;
                      setLanguages((prev) =>
                        prev ? [...prev, oldData.languages] : [oldData.languages]
                      );
                      setOldData((prev) => ({ ...prev, languages: "" }));
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
                      key={idx}
                      className={classes.hover}
                      onClick={() => setLanguages((prev) => prev.filter((item) => item !== lan))}
                    >
                      <RoundedBox
                        light
                        icon
                        borderColor={idx % 2 === 0 ? "primary.main" : "secondary.main"}
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
                  onChange={(e) => setOldData((prev) => ({ ...prev, educations: e.target.value }))}
                  className={`${classes.formInput} ${classes.withBtn}`}
                />
                <Box ml={1} mt={-5}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (oldData.educations === "") return;
                      setEducations((prev) =>
                        prev ? [...prev, oldData.educations] : [oldData.educations]
                      );
                      setOldData((prev) => ({ ...prev, educations: "" }));
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
                      key={idx}
                      className={classes.hover}
                      onClick={() => setEducations((prev) => prev.filter((item) => item !== edu))}
                    >
                      <RoundedBox
                        light
                        icon
                        borderColor={idx % 2 === 0 ? "primary.main" : "secondary.main"}
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
                  onChange={(e) => setOldData((prev) => ({ ...prev, linkName: e.target.value }))}
                  className={`${classes.formInput} ${classes.withBtn}`}
                />
                <TextField
                  label="Url"
                  variant="outlined"
                  value={oldData.url}
                  onChange={(e) => setOldData((prev) => ({ ...prev, link: e.target.value }))}
                  className={`${classes.formInput} ${classes.withBtn}`}
                />
                <Box mt={-2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (oldData.linkName === "" || oldData.link === "") return;
                      setLinkedAccounts((prev) =>
                        prev
                          ? [...prev, { title: oldData.linkName, link: oldData.link }]
                          : [{ title: oldData.linkName, link: oldData.link }]
                      );
                      setOldData((prev) => ({ ...prev, linkName: "", link: "" }));
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
                      key={idx}
                      className={classes.hover}
                      onClick={() =>
                        setLinkedAccounts((prev) =>
                          prev.filter((item) => item.title !== link.title)
                        )
                      }
                    >
                      <RoundedBox
                        light
                        icon
                        borderColor={idx % 2 === 0 ? "primary.main" : "secondary.main"}
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
              <Button variant="outlined" color="primary" size="large" onClick={submitHandler}>
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
            required
            value={changePassData.currentPassword}
            onChange={(e) =>
              setChangePassData((prev) => ({ ...prev, currentPassword: e.target.value }))
            }
            className={classes.formInput}
          />
          <TextField
            label="New Password"
            variant="outlined"
            type="password"
            required
            value={changePassData.password}
            onChange={(e) => setChangePassData((prev) => ({ ...prev, password: e.target.value }))}
            className={classes.formInput}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            required
            value={changePassData.confirmPassword}
            onChange={(e) =>
              setChangePassData((prev) => ({ ...prev, confirmPassword: e.target.value }))
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
