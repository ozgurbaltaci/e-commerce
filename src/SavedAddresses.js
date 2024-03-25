import React, { useEffect, useState } from "react";
import {
  Card,
  Divider,
  TextField,
  Grid,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./AccountSettings.css";
import axios from "axios";
import Toast, { successToast, errorToast } from "./Toaster";
import sehirler from "./json_files/sehir.json";
import ilceler from "./json_files/ilce.json";
import mahalleler from "./json_files/mahalle.json";
import sokaklar_caddeler from "./json_files/sokak_cadde.json";

const SavedAddresses = () => {
  const [savedAddresses, setSavedAddresses] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [addressTitle, setAddressTitle] = useState("");
  const [receiverFullName, setReceiverFullName] = useState("");
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [streets, setStreets] = useState([]);
  const [selectedStreet, setSelectedStreet] = useState("");
  const [selectedBuildingNumber, setSelectedBuildingNumber] = useState("");
  const [selectedFloorNumber, setSelectedFloorNumber] = useState("");
  const [selectedDoorNumber, setSelectedDoorNumber] = useState("");
  const [provinceError, setProvinceError] = useState(false);
  const [districtError, setDistrictError] = useState(false);
  const [neighborhoodError, setNeighborhoodError] = useState(false);
  const [streetError, setStreetError] = useState(false);
  const [buildingNumberError, setBuildingNumberError] = useState(false);
  const [floorError, setFloorError] = useState(false);
  const [doorNumberError, setDoorNumberError] = useState(false);
  const [addressTitleError, setAddressTitleError] = useState(false);

  const [receiverFullNameError, setReceiverFullNameError] = useState(false);
  const [receiverPhoneNumberError, setReceiverPhoneNumberError] =
    useState(false);

  const [savedAddressesLoading, setSavedAddressesLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3002/getSavedAddressesOfUser/${localStorage.getItem(
          "user_id"
        )}`
      )
      .then((response) => {
        if (response.data) {
          setSavedAddresses(response.data);
          setSavedAddressesLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  useEffect(() => {
    setProvinces(sehirler[2].data);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveNewAddress = async () => {
    try {
      const address_data = {
        province: selectedProvince,
        district: selectedDistrict,
        neighborhood: selectedNeighborhood,
        street: selectedStreet,
        building_number: selectedBuildingNumber,
        floor_number: selectedFloorNumber,
        door_number: selectedDoorNumber,
        receiver_full_name: receiverFullName,
        receiver_phone_number: receiverPhoneNumber,
        address_title: addressTitle,
      };

      // Make an Axios request to save the new address
      const response = await axios.put(
        `http://localhost:3002/saveNewAddressToCurrentUser/${localStorage.getItem(
          "user_id"
        )}`,
        { address_data }
      );

      if (response.status === 201) {
        alert(response.data.message);
      } else {
        console.error("Failed to save the address.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error appropriately, e.g., show an error message
    }
  };

  const handleSelectProvince = (event) => {
    const sehir_title = event.target.value;
    setSelectedProvince(sehir_title);

    const provinceObject = provinces.find(
      (provinceObject) => provinceObject.sehir_title === sehir_title
    );
    const sehir_key = provinceObject.sehir_key;
    const selectedProvinceDistricts = ilceler[2].data.filter(
      (ilce) => ilce.ilce_sehirkey === sehir_key
    );
    setDistricts(selectedProvinceDistricts);
    setProvinceError(false);
    setSelectedDistrict("");
    setSelectedNeighborhood("");
    setSelectedStreet("");
    setNeighborhoods([]);
    setStreets([]);
  };

  const handleDistrictChange = (event) => {
    const ilce_title = event.target.value;
    setSelectedDistrict(ilce_title);
    setDistrictError(false);

    const districtObject = districts.find(
      (districtObject) => districtObject.ilce_title === ilce_title
    );
    const ilce_key = districtObject.ilce_key;
    const selectedDistrictNeigbourhoods = mahalleler[2].data.filter(
      (mahalle) => mahalle.mahalle_ilcekey === ilce_key
    );
    setNeighborhoods(selectedDistrictNeigbourhoods);
    setSelectedNeighborhood("");
    setSelectedStreet("");
    setStreets([]);
  };

  const handleNeighborChange = (event) => {
    const mahalle_title = event.target.value;
    setSelectedNeighborhood(mahalle_title);
    setNeighborhoodError(false);

    const neighborhoodObject = neighborhoods.find(
      (neighborhoodObject) => neighborhoodObject.mahalle_title === mahalle_title
    );
    const mahalle_key = neighborhoodObject.mahalle_key;
    const selectedNeighborhoodsStreets = sokaklar_caddeler[2].data.filter(
      (sokak) => sokak.sokak_cadde_mahallekey === mahalle_key
    );
    setStreets(selectedNeighborhoodsStreets);
    setSelectedStreet("");
  };
  const handleStreetChange = (event) => {
    const street_title = event.target.value;
    setSelectedStreet(street_title);
    setStreetError(false);
  };

  const handleBuildingNumberChange = (event) => {
    setSelectedBuildingNumber(event.target.value);
    setBuildingNumberError(false);
  };

  const handleFloorNumberChange = (event) => {
    setSelectedFloorNumber(event.target.value);
    setFloorError(false);
  };
  const handleDoorNumberChange = (event) => {
    setSelectedDoorNumber(event.target.value);
    setDoorNumberError(false);
  };

  const handleAddressTitleChange = (event) => {
    setAddressTitle(event.target.value);
    setAddressTitleError(false);
  };
  const handleReceiverFullNameChange = (event) => {
    setReceiverFullName(event.target.value);
    setReceiverFullNameError(false);
  };

  const handleReceiverPhoneNumberChange = (event) => {
    setReceiverPhoneNumber(event.target.value);
    setReceiverPhoneNumberError(false);
  };

  const renderSavedAddressesCard = (savedAddress) => {
    return (
      <>
        <Card style={{ width: "100%" }}>
          <div style={{ padding: "8px", fontSize: "11px" }}>
            <div style={{ fontWeight: "bold" }}>
              {savedAddress && savedAddress.address_title.toUpperCase()}
            </div>
          </div>
          <Divider></Divider>
          <div style={{ padding: "8px", fontSize: "10px" }}>
            <div style={{ fontWeight: "bold", marginBottom: "2px" }}>
              {savedAddress.receiver_full_name}
            </div>
            <div style={{ marginBottom: "2px" }}>
              {" "}
              {savedAddress.neighborhood}
            </div>

            <div style={{ display: "flex", marginBottom: "2px" }}>
              {savedAddress.building_number} {savedAddress.street},{" "}
              {savedAddress.neighborhood}, {savedAddress.district}/
              {savedAddress.province}
            </div>
            <div style={{ display: "flex", marginBottom: "2px" }}>
              {savedAddress.district}/{savedAddress.province}
            </div>
            <div style={{ marginBottom: "5px" }}>
              {savedAddress.receiver_phone_number}
            </div>
            <Grid container spacing={"3px"}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                {" "}
                <button
                  style={{
                    width: "100%",
                    fontWeight: "bold",
                    height: "18px",
                    fontSize: "9px",
                    backgroundColor: "rgba(0,139,255,0.16)",
                    border: "none",
                    color: "rgba(0,139,255)",
                    borderRadius: "2px",
                    cursor: "pointer",
                  }}
                  onClick={() => {}}
                >
                  Edit
                </button>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                {" "}
                <button
                  style={{
                    width: "100%",
                    height: "18px",
                    fontSize: "9px",
                    fontWeight: "bold",

                    backgroundColor: "rgba(237,74,0,0.16)",
                    border: "none",
                    color: "rgba(237,74,0)",
                    borderRadius: "2px",
                    cursor: "pointer",
                  }}
                  onClick={() => {}}
                >
                  Delete
                </button>
              </Grid>
            </Grid>
          </div>
        </Card>
      </>
    );
  };

  return (
    <>
      <Toast></Toast>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Add new address</DialogTitle>
        <DialogContent>
          <div className="DialogContent">
            {" "}
            <DialogContentText>
              To add new address, please fill the form respectively.
            </DialogContentText>
            <TextField
              required
              label="Address Title"
              value={addressTitle}
              onChange={handleAddressTitleChange}
              error={addressTitleError}
              style={{ width: "100%" }}
            />
            <TextField
              required
              label="Receiver full name"
              value={receiverFullName}
              onChange={handleReceiverFullNameChange}
              error={receiverFullNameError}
              style={{ width: "100%" }}
            />
            <TextField
              required
              label="Receiver phone number"
              value={receiverPhoneNumber}
              onChange={handleReceiverPhoneNumberChange}
              error={receiverPhoneNumberError}
              style={{ width: "100%" }}
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel required id="demo-simple-select-label">
                  Province
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedProvince}
                  label="Province"
                  onChange={handleSelectProvince}
                  error={provinceError}
                >
                  {provinces.map((province, index) => {
                    return (
                      <MenuItem
                        key={province.sehir_id}
                        value={province.sehir_title}
                      >
                        {province.sehir_title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel required id="districts">
                  District
                </InputLabel>
                <Select
                  labelId="districts"
                  id="districts"
                  value={selectedDistrict}
                  label="Districts"
                  onChange={handleDistrictChange}
                  error={districtError}
                >
                  {districts.map((district, index) => {
                    return (
                      <MenuItem
                        key={district.ilce_id}
                        value={district.ilce_title}
                      >
                        {district.ilce_title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel required id="neighborhoods">
                  Neighborhood
                </InputLabel>
                <Select
                  labelId="neighborhoods"
                  id="neighborhoods"
                  value={selectedNeighborhood}
                  label="neighborhoods"
                  onChange={handleNeighborChange}
                  error={neighborhoodError}
                >
                  {neighborhoods.map((neighbor, index) => {
                    return (
                      <MenuItem
                        key={neighbor.mahalle_id}
                        value={neighbor.mahalle_title}
                      >
                        {neighbor.mahalle_title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel required id="streets">
                  Street
                </InputLabel>
                <Select
                  labelId="streets"
                  id="streets"
                  value={selectedStreet}
                  label="streets"
                  onChange={handleStreetChange}
                  error={streetError}
                >
                  {streets.map((street, index) => {
                    return (
                      <MenuItem
                        key={street.sokak_cadde_id}
                        value={street.sokak_cadde_title}
                      >
                        {street.sokak_cadde_title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
                gap: "8px",
                justifyContent: "space-between",
                marginTop: "12px",
              }}
            >
              <TextField
                required
                label="Building number"
                value={selectedBuildingNumber}
                onChange={handleBuildingNumberChange}
                error={buildingNumberError}
              />
              <TextField
                required
                label="Floor number"
                value={selectedFloorNumber}
                onChange={handleFloorNumberChange}
                error={floorError}
              />
              <TextField
                required
                label="Door number"
                value={selectedDoorNumber}
                onChange={handleDoorNumberChange}
                error={doorNumberError}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              setProvinceError(false);
              setDistrictError(false);
              setNeighborhoodError(false);
              setStreetError(false);
              setBuildingNumberError(false);
              setFloorError(false);
              setDoorNumberError(false);
              setReceiverFullNameError(false);
              setReceiverPhoneNumberError(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (
                selectedProvince !== "" &&
                selectedDistrict !== "" &&
                selectedNeighborhood !== "" &&
                selectedStreet !== "" &&
                selectedBuildingNumber !== "" &&
                selectedFloorNumber !== "" &&
                receiverFullName !== "" &&
                receiverPhoneNumber !== "" &&
                addressTitle !== "" &&
                selectedDoorNumber !== ""
              ) {
                saveNewAddress();
                handleClose();
              } else {
                if (receiverFullName === "") {
                  setReceiverFullNameError(true);
                }
                if (receiverPhoneNumber === "") {
                  setReceiverPhoneNumberError(true);
                }
                if (addressTitle === "") {
                  setAddressTitleError(true);
                }
                if (selectedProvince === "") {
                  setProvinceError(true);
                }
                if (selectedDistrict === "") {
                  setDistrictError(true);
                }
                if (selectedNeighborhood === "") {
                  setNeighborhoodError(true);
                }
                if (selectedStreet === "") {
                  setStreetError(true);
                }
                if (selectedBuildingNumber === "") {
                  setBuildingNumberError(true);
                }
                if (selectedFloorNumber === "") {
                  setFloorError(true);
                }
                if (selectedDoorNumber === "") {
                  setDoorNumberError(true);
                }
              }
            }}
          >
            Add this address
          </Button>
        </DialogActions>
      </Dialog>
      {savedAddressesLoading ? (
        <div>Your saved addresses are loading...</div>
      ) : (
        <div className="accountSettings">
          <Card
            style={{
              width: "100%",
              display: "flex",
              height: "100%",
              padding: "15px",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Card
                  style={{
                    height: savedAddresses.length > 0 ? "100%" : "140px",
                    width: "100%",
                    border: "1px dashed rgba(47, 176, 9)",
                    backgroundColor: "rgba(47, 176, 9, 0.14)",
                    boxShadow: "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={handleClickOpen}
                >
                  {" "}
                  <div>
                    <img
                      src={require("./add_new_icon.png")}
                      width={"35px"}
                      height={"35px"}
                    ></img>
                  </div>
                  <div
                    style={{
                      color: "rgba(47, 176, 9)",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Add New Address
                  </div>
                </Card>
              </Grid>
              {savedAddresses.map((savedAddress, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    {renderSavedAddressesCard(savedAddress)}
                  </Grid>
                );
              })}
            </Grid>
          </Card>
        </div>
      )}
    </>
  );
};
export default SavedAddresses;
