import { Box, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
// internal imports
import { fetchJobs } from "../../actions/jobAction";
import JobCard from "../../components/JobCard";
import SiteLayout from "../../components/layouts/SiteLayout";
import Loading from "../../components/Loading";
import PaginationComponent from "../../components/PaginationComponent";
import Search from "../../components/Search";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [loadedItems, setLoadedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    let data = {};
    if (queryCat && querySearch) {
      data = {
        cat: queryCat,
        search: querySearch,
      };
    } else if (!querySearch && queryCat) {
      data = {
        cat: queryCat,
      };
    } else if (!queryCat && querySearch) {
      data = {
        search: querySearch,
      };
    }
    (async () => {
      await dispatch(fetchJobs(data));
    })();
    return async () => {
      await dispatch({
        type: "RESET_JOBS",
      });
      setSearchQuery("");
    };
  }, [dispatch, queryCat, querySearch]);

  // ------------------ on jobs load ---------------------
  useEffect(() => {
    setLoadedItems(jobs);
  }, [jobs]);

  // ----------------------- Pagination helper ------------------------
  let currentItems;
  if (loadedItems) {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstPage = indexOfLastItem - itemsPerPage;
    currentItems = loadedItems.slice(indexOfFirstPage, indexOfLastItem);
  }

  // -------------------- handle search ------------------
  const handleSearch = () => {
    if (searchQuery !== "") {
      if (queryCat) {
        history.push(`/jobs?cat=${queryCat}&search=${searchQuery}`);
      } else if (!queryCat) {
        history.push(`/jobs?search=${searchQuery}`);
      }
    }
  };

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

        {/* ------------------------------ search box ----------------------- */}
        <Box mt={5} mb={3} display="flex" justifyContent="center" alignItems="center">
          <Search
            cat={queryCat}
            search={searchQuery}
            setSearch={setSearchQuery}
            onclick={handleSearch}
          />
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
                Category "{queryCat || "all"}"
              </Typography>
              {querySearch && (
                <Typography variant="h6" align="center">
                  Search Query "{querySearch || "all"}"
                </Typography>
              )}
            </Box>
            <Box display="flex" justifyContent="center" flexWrap="wrap" my={3}>
              {currentItems && currentItems.length > 0 ? (
                currentItems.map((job, idx) => <JobCard job={job} key={idx} />)
              ) : (
                <Typography variant="body1" align="center">
                  No Jobs Found!
                </Typography>
              )}
            </Box>
            {currentItems && currentItems.length > 0 && (
              <PaginationComponent
                totalItems={loadedItems.length}
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage}
                page={currentPage}
              />
            )}
          </Box>
        </Box>
      </Container>
    </SiteLayout>
  );
};

export default Jobs;
