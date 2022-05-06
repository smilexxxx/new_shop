import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./CustomTextField";
import { commerce } from "../../lib/Commerce";
import { Link } from "react-router-dom";

const AddressForm = ({ checkoutToken, next }) => {
  const methods = useForm();
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  //looping countries array
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  //looping subdivisions array
  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({ id: code, label: name })
  );

  //looping shipping options array
  const options = shippingOptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
  }));

  //fetch shipping options countries
  useEffect(() => {
    let isMounted = true;
    const fetchShippingCountries = async (checkoutTokenId) => {
      const { countries } = await commerce.services.localeListShippingCountries(
        checkoutTokenId
      );
      if (isMounted) {
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
      }
    };

    fetchShippingCountries(checkoutToken.id);
    return () => {
      isMounted = false;
    };
  }, []);

  //fetch shipping subdivisions
  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };
  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  //fetch shipping options
  useEffect(() => {
    let isMounted = true;
    const fetchShippingOptions = async (
      checkoutTokenId,
      country,
      region = null
    ) => {
      const options = await commerce.checkout.getShippingOptions(
        checkoutTokenId,
        { country, region }
      );
      if (isMounted) {
        setShippingOptions(options);
        setShippingOption(options[0].id);
      }
    };
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
    return () => {
      isMounted = false;
    };
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address1" label="Address line 1" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="Zip / Postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.vale)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} variant="outlined" to="/cart">
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
