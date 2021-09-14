import { Box, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
// actions
import { fetchServices } from "../../actions/serviceAction";
// components
import SiteLayout from "../../components/layouts/SiteLayout";
import Loading from "../../components/Loading";
import Search from "../../components/Search";
import ServiceCard from "../../components/ServiceCard";

// styles
const useStyles = makeStyles(() => ({
  linkHover: {
    cursor: "pointer",
  },
}));

const Services = () => {
  const classes = useStyles();
  const history = useHistory();
  const search = new URLSearchParams(useLocation().search);
  const queryCat = search.get("cat");
  const querySearch = search.get("search");
  const dispatch = useDispatch();
  const { isLoading, services } = useSelector((state) => state.services);
  const [searchQuery, setSearchQuery] = useState("");

  // fetch services
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
      await dispatch(fetchServices(data));
    })();
    return async () => {
      await dispatch({
        type: "RESET_SERVICES",
      });
      setSearchQuery("");
    };
  }, [dispatch, queryCat, querySearch]);

  // -------------------- handle search ------------------
  const handleSearch = () => {
    if (searchQuery !== "") {
      if (queryCat) {
        history.push(`/services?cat=${queryCat}&search=${searchQuery}`);
      } else if (!queryCat) {
        history.push(`/services?search=${searchQuery}`);
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
            Services
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

        <Box display="flex" flexWrap="wrap">
          <Box mt={5} flex="20%">
            <Typography variant="h6" align="center" color="textPrimary">
              Filters
            </Typography>
            <Typography variant="body1" align="center" color="textSecondary">
              ({(services && services.length) || 0} services)
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
                  onClick={() => history.replace("/services")}
                >
                  All
                </Typography>
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.replace("/services?cat=web-development")}
                >
                  Web Development
                </Typography>
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.replace("/services?cat=mobile-development")}
                >
                  Mobile Development
                </Typography>
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.replace("/services?cat=digital-marketing")}
                >
                  Digital Marketing
                </Typography>
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.replace("/services?cat=seo")}
                >
                  SEO
                </Typography>
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.replace("/services?cat=graphics-designing")}
                >
                  Graphics Designing
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box flex="80%" minWidth="300px" my={5}>
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
            <Box display="flex" justifyContent="center" flexWrap="wrap" gridGap={15} my={5}>
              {services && services.length > 0 ? (
                services.map((service, idx) => (
                  <ServiceCard
                    key={idx}
                    sid={service._id}
                    onclick={() => history.push(`/services/${service._id}`)}
                    userId={service.userId}
                    title={service.title}
                    imgs={service.images}
                    star={service.rating?.rating || 0}
                    starCount={service.rating?.count || 0}
                    price={service.packages[0]?.price || 0}
                    userName={service.userName}
                    userImg={service.userImg}
                  />
                ))
              ) : (
                <Typography variant="body1" align="center">
                  No Services Found!
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </SiteLayout>
  );
};

export default Services;
