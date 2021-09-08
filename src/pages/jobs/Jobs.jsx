import { Box, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
// internal imports
import { fetchJobs } from "../../actions/jobAction";
import JobCard from "../../components/JobCard";
import SiteLayout from "../../components/layouts/SiteLayout";
import Loading from "../../components/Loading";

const useStyles = makeStyles(() => ({
  linkHover: {
    cursor: "pointer",
  },
}));

const Jobs = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, jobs } = useSelector((state) => state.jobs);
  const search = new URLSearchParams(useLocation().search);
  const queryCat = search.get("cat");
  const querySearch = search.get("search");

  useEffect(() => {
    let data = {};
    if (queryCat) {
      data = {
        cat: queryCat,
      };
    }
    (async () => {
      await dispatch(fetchJobs(data));
    })();
    return async () => {
      await dispatch({
        type: "RESET_JOBS",
      });
    };
  }, [dispatch, queryCat]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SiteLayout>
      <Container maxWidth="lg">
        <Box mt={5}>
          <Typography variant="h4" align="center">
            Jobs
          </Typography>
        </Box>
        <Box display="flex" flexWrap="wrap" my={3}>
          <Box mt={5} flex="20%">
            <Typography variant="h5" align="center" color="textPrimary">
              Filters
            </Typography>
            <Typography variant="body1" align="center" color="textSecondary">
              ({jobs ? jobs.length : 0} Jobs)
            </Typography>
            {/* -------------------- Categories -------------------- */}
            <Box my={3} minWidth="10rem" display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h6" color="textPrimary" align="start">
                Categories
              </Typography>
              <Box
                my={2}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                gridGap={10}
              >
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.push("/jobs")}
                >
                  All
                </Typography>
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.push("/jobs?cat=web-development")}
                >
                  Web Development
                </Typography>
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.push("/jobs?cat=mobile-development")}
                >
                  Mobile Development
                </Typography>
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.push("/jobs?cat=digital-marketing")}
                >
                  Digital Marketing
                </Typography>
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.push("/jobs?cat=seo")}
                >
                  SEO
                </Typography>
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.push("/jobs?cat=graphics-designing")}
                >
                  Graphics Designing
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box flex="80%" minWidth="300px">
            <Box>
              <Typography variant="h6" align="center">
                Showing "{queryCat || "all"}"
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" flexWrap="wrap" my={3}>
              {jobs && jobs.length > 0 ? (
                jobs.map((job, idx) => <JobCard job={job} key={idx} />)
              ) : (
                <Typography variant="body1" align="center">
                  No Jobs Found!
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </SiteLayout>
  );
};

export default Jobs;
