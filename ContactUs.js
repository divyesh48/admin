import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import DataTable from "react-data-table-component";
import styles from "../UserList/UserList.module.scss";
import Modal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Loader } from "../../Components/Loader/Loader";
import { getContactList } from "../../Services/Services";

const ContactUs = () => {
  const [getdata, setGetdata] = useState();
  const [search, setSearch] = useState();
  const [loader, setLoader] = useState(false);
  const [createdevmodal, setCreatedevmodal] = useState(false);
  const [editItem, setEditItem] = useState({});
  const [getuser, setUser] = useState("");
  const [data, setDate] = useState("text");
  const dateChange = () => {
    setDate("date");
  };
  function closeModal() {
    setCreatedevmodal(false);
  }

  const columns = [
    {
      name: <p>Sr. No.</p>,
      cell: (row, index) => index + 1,
      width: "50px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "subject",
      selector: (row) => row.subject,
      sortable: true,
    },
    {
      name: "Message",
      selector: (row) => row.message,
      sortable: true,
    },
  ];

  const getContactlist = async () => {
    setLoader(true);
    let formData = new FormData();
    const apiResponse = await getContactList(formData);
    if (apiResponse.ResponseCode === 1 || apiResponse.ResponseCode === "1") {
      setGetdata(apiResponse.data);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  useEffect(() => {
    getContactlist();
  }, []);

  // const getUserlist = async () => {
  //   setLoader(true);
  //   let userid = Tokendata.UserData;
  //   let formData = new FormData();
  //   formData.append("admin_id", userid._id);
  //   const apiResponse = await UserlistData(formData);
  //   if (apiResponse.ResponseCode === 1 || apiResponse.ResponseCode === "1") {
  //     setUserdata(apiResponse.data);
  //     setLoader(false);
  //   } else {
  //     setLoader(false);
  //   }
  // };
  // const handlesubmit = async (e, id) => {
  //   e.preventDefault();
  //   let userid = Tokendata.UserData;
  //   const profile = e.target.profile.files[0];
  //   const id_card = e.target.id_card.files[0];
  //   let formData = new FormData();
  //   formData.append("admin_id", userid._id);
  //   formData.append("user_id", editItem._id);
  //   formData.append("name", e.target.name.value);
  //   formData.append("ccode", e.target.ccode.value);
  //   formData.append("phone", e.target.phone.value);
  //   if (profile) {
  //     formData.append("profile", profile);
  //   }
  //   if (id_card) {
  //     formData.append("id_card", id_card);
  //   }
  //   if (id.user_type === "driver") {
  //     formData.append("registartion_upto", e.target.registartionupto.value);
  //     formData.append("registartion_date", e.target.registartiondate.value);
  //     formData.append("vehical_class", e.target.vehical_class.value);
  //     formData.append("registartion_no", e.target.registartion_no.value);
  //   }
  //   const apiResponse = await UpdateUser(formData);
  //   if (apiResponse.ResponseCode === 1 || apiResponse.ResponseCode === "1") {
  //     getUserlist();
  //     setCreatedevmodal(false);
  //   }
  // };
  // const handleDelete = async (e, id) => {
  //   setLoader(true);
  //   let userid = Tokendata.UserData;
  //   let formData = new FormData();
  //   formData.append("admin_id", userid._id);
  //   formData.append("user_id", id._id);
  //   const apiResponse = await DeleteUser(formData);
  //   if (apiResponse.ResponseCode === 1 || apiResponse.ResponseCode === "1") {
  //     setLoader(false);
  //     getUserlist();
  //   }
  // };
  // useEffect(() => {
  //   document.title = "Runrz - User List";
  //   getUserlist();
  // }, []);
  return (
    <>
      {loader && <Loader />}
      <Layout>
        <div>
          <div className={styles.display_set}>
            <h2 className="table_heading">Contact Us</h2>
          </div>
          <p>{console.log(getdata)}</p>
          <DataTable
            pagination
            columns={columns}
            data={getdata && getdata}
            actions={
              <input
                className="table_search_input"
                type="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            }
          />
        </div>
      </Layout>
      <Modal
        isOpen={createdevmodal}
        onRequestClose={closeModal}
        className="comman_modal update_modal"
        ariaHideApp={false}
      >
        <button className="close_btn" onClick={() => closeModal()}>
          <AiOutlineCloseCircle />
        </button>
        <div className="model_bg">
          <div className="model_name">
            <h4>
              <b>Update Details</b>
            </h4>
            <form
            //  onSubmit={(e) => handlesubmit(e, editItem)}
            >
              <div className={styles.update_data}>
                {getuser === "user" ? (
                  <div>
                    <div className="form_control">
                      <label>Profile Image</label>
                      <input
                        type="file"
                        files={editItem.profile}
                        name="profile"
                      />
                    </div>
                    <div className="form_control">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={editItem.name}
                        required
                      />
                    </div>
                    <div className="form_control display_set">
                      <div className="country_code">
                        <label>Country Code</label>
                        <input
                          type="text"
                          defaultValue={editItem.ccode}
                          name="ccode"
                          required
                        />
                      </div>
                      <div className="mobile_number">
                        <label>Number</label>
                        <input
                          type="text"
                          name="phone"
                          defaultValue={editItem.phone}
                          required
                        />
                      </div>
                    </div>
                    <div className="form_control">
                      <label>Id Card</label>
                      <input type="file" name="id_card" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="form_control">
                      <label>Profile Image</label>
                      <input type="file" name="profile" />
                    </div>
                    <div className="form_control">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={editItem.name}
                      />
                    </div>
                    <div className="form_control display_set">
                      <div className="country_code">
                        <label>Country Code</label>
                        <input
                          type="text"
                          name="ccode"
                          required
                          defaultValue={editItem.ccode}
                        />
                      </div>
                      <div className="mobile_number">
                        <label>Number</label>
                        <input
                          type="text"
                          name="phone"
                          required
                          defaultValue={editItem.phone}
                        />
                      </div>
                    </div>
                    <div className="form_control">
                      <label>Registartion No</label>
                      <input
                        type="text"
                        name="registartion_no"
                        required
                        defaultValue={editItem.registartion_no}
                      />
                    </div>
                    <div className="form_control">
                      <label>Vehical Class</label>
                      <input
                        type="text"
                        name="vehical_class"
                        required
                        defaultValue={editItem.vehical_class}
                      />
                    </div>
                    <div className="form_control">
                      <label>Registartion Date</label>
                      <input
                        type={data}
                        name="registartiondate"
                        required
                        onChange={dateChange}
                        defaultValue={editItem.registartion_date}
                      />
                    </div>
                    <div className="form_control">
                      <label>Registartion Upto</label>
                      <input
                        type={data}
                        name="registartionupto"
                        required
                        onChange={dateChange}
                        defaultValue={editItem.registartion_upto}
                      />
                    </div>
                    <div className="form_control">
                      <label>Id Card</label>
                      <input type="file" name="id_card" />
                    </div>
                  </div>
                )}
              </div>
              <div className="submit_btn">
                <button>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ContactUs;
