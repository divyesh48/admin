import React, { useEffect, useState } from "react";
import { Loader } from "../../Components/Loader/Loader";
import Layout from "../../Components/Layout/Layout";
import styles from "../UserList/UserList.module.scss";
import DataTable from "react-data-table-component";
import { getBookingList } from "../../Services/Services";
import ModalImage from "react-modal-image";
import Modal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import moment from "moment/moment";

const Booking = () => {
  const [getdata, setGetdata] = useState();
  const [search, setSearch] = useState();
  const [loader, setLoader] = useState(false);
  const [addressmodal, setAddressmodal] = useState(false);
  const [transacModal, setTransacModal] = useState(false);
  const [viewaddress, setViewAddress] = useState("");
  const [viewtransaction, setViewtransaction] = useState("");
  const [isItemsList, setIsItemsList] = useState(false)
  const [itemListData, setItemListData] = useState([])

  function closeModal() {
    setAddressmodal(false);
    setTransacModal(false);
  }

  const handleAddressView = (e, row) => {
    let setaddress = [row.deliver_address];
    // console.log('setaddress->>>', setaddress);
    setViewAddress(setaddress);
    setAddressmodal(true);
  };

  const handleTransacView = (e, row) => {
    let transactionList = [row.transaction];
    // console.log('row-->>>', row);
    // console.log('transactionList-->>>', transactionList);
    setViewtransaction(transactionList);
    setTransacModal(true);
  };

  const columns = [
    {
      name: <p>Sr. No.</p>,
      cell: (row, index) => index + 1,
      width: "50px",
    },
    {
      name: "User's Name",
      selector: (row) => row.user_dtl.name,
      sortable: "true",
    },
    {
      name: "User's Profile Picture",
      cell: (row, index) => (
        <div className="table_prifileimg">
          {row.user_dtl.profile !== "" ? (
            <ModalImage
              hideZoom={true}
              showRotate={true}
              small={row.user_dtl.profile}
              large={row.user_dtl.profile}
            />
          ) : (
            "No Image"
          )}
        </div>
      ),
    },
    {
      name: "Runner's Name",
      selector: (row) => row.runner_dtl.name,
      sortable: "true",
    },
    {
      name: "Runner's Profile Picture",
      cell: (row, index) => (
        <div className="table_prifileimg">
          {row.runner_dtl.profile !== "" ? (
            <ModalImage
              hideZoom={true}
              showRotate={true}
              small={row.runner_dtl.profile}
              large={row.runner_dtl.profile}
            />
          ) : (
            "No Image"
          )}
        </div>
      ),
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Receipt",
      cell: (row, index) => (
        <div className="table_cardimg">
          {row.receipt_img !== "" ? (
            <ModalImage
              hideZoom={true}
              showRotate={true}
              small={row.receipt_img}
              large={row.receipt_img}
              alt="Id Card"
            />
          ) : (
            "No Image"
          )}
        </div>
      ),
      width: "160px",
    },
    {
      name: "Address",
      cell: (row, index) => (
        <div className="status_btn_group">
          <button
            className="info_btn btn"
            onClick={(e) => handleAddressView(e, row)}
          >
            View
          </button>
        </div>
      ),
    },

    {
      name: "Pickup Address",
      selector: (row) => row.pickup_address,
    },
    {
      name: "Request Payment",
      selector: (row) => row.request_payment,
    },
    {
      name: "Transaction Detail",
      cell: (row, index) => (
        <div className="status_btn_group">
          <button
            className="info_btn btn"
            onClick={(e) => handleTransacView(e, row)}
          >
            View
          </button>
        </div>
      ),
    },
    {
      name: "Request Status",
      cell: row => row.req_status,
    },
    {
      name: "Items Detail",
      cell: row => <div className="status_btn_group">
        <button
          className="info_btn btn"
          onClick={() => {
            setIsItemsList(true)
            setItemListData(row.items_list)
          }}
        >
          View
        </button>
      </div>,
    },
    {
      name: "Created At",
      cell: row => moment(row.created_at).format("DD-MM-YYYY"),
    },
  ];

  const Addresscolumns = [
    {
      name: "Address Type",
      selector: (row) => row.adres_type,
      width: "130px",
    },
    {
      name: "Address",
      selector: (row) => row.adres,
      width: "180px",
    },
    {
      name: "City",
      selector: (row) => row.city,
    },
    {
      name: "State",
      selector: (row) => row.state,
    },
    {
      name: "Country",
      selector: (row) => row.country,
    },
    {
      name: "Pincode",
      selector: (row) => row.postal_code,
    },
  ];

  const transcol = [
    {
      name: "Amount",
      selector: (row) => row.amount,
      width: "200px",
    },
    {
      name: "Tip Amount",
      selector: (row) => row.tip_amount,
      width: "200px",
    },
    {
      name: "Total Amount",
      selector: (row) => row.total_amount,
    },
  ];

  const itemList = [
    {
      name: "Item Name",
      selector: row => row.item_name
    },
    {
      name: "Item Image",
      selector: row => <div className="table_cardimg">
        {row.item_img !== "" ? (
          <ModalImage
            hideZoom={true}
            showRotate={true}
            small={row.item_img}
            large={row.item_img}
            alt="Id Card"
          />
        ) : (
          "No Image"
        )}
      </div>
    },
    {
      name: "Notes",
      selector: row => row.notes
    },
  ]

  const getContactlist = async () => {
    setLoader(true);
    let formData = new FormData();
    const apiResponse = await getBookingList(formData);
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
  return (
    <>
      {loader && <Loader />}
      <Layout>
        <div>
          <div className={styles.display_set}>
            <h2 className="table_heading">Booking List</h2>
          </div>
          <DataTable
            pagination
            columns={columns}
            data={getdata && getdata}
            defaultSortAsc={false}
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

      {/* Address Modal */}
      <Modal
        isOpen={addressmodal}
        onRequestClose={closeModal}
        className="comman_modal address_modal"
        ariaHideApp={false}
      >
        <button className="close_btn" onClick={() => closeModal()}>
          <AiOutlineCloseCircle />
        </button>
        <div className="model_bg">
          <div className="model_name">
            <h4>
              <b>Address Details</b>
            </h4>
            <DataTable
              pagination
              columns={Addresscolumns}
              data={viewaddress && viewaddress}
            />
          </div>
        </div>
      </Modal>

      {/* Transaction Modal */}
      <Modal
        isOpen={transacModal}
        onRequestClose={closeModal}
        className="comman_modal address_modal"
        ariaHideApp={false}
      >
        <button className="close_btn" onClick={() => closeModal()}>
          <AiOutlineCloseCircle />
        </button>
        <div className="model_bg">
          <div className="model_name">
            <h4>
              <b>Transaction Details</b>
            </h4>
            <p>{viewtransaction.amount}</p>
            <DataTable
              pagination
              columns={transcol}
              data={viewtransaction && viewtransaction}
            />
          </div>
        </div>
      </Modal>

      {/* Items List Modal */}
      <Modal
        isOpen={isItemsList}
        onRequestClose={() => setIsItemsList(false)}
        className="comman_modal address_modal"
        ariaHideApp={false}
      >
        <button className="close_btn" onClick={() => setIsItemsList(false)}>
          <AiOutlineCloseCircle />
        </button>
        <div className="model_bg">
          <div className="model_name">
            <h4>
              <b>Item List Details</b>
            </h4>
            {/* <p>{viewtransaction.amount}</p> */}
            <DataTable
              pagination
              columns={itemList}
              data={itemListData}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Booking;
