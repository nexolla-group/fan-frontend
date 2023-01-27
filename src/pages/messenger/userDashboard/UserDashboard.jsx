import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Navbar } from "../../../Home/Components";
import "./userDashboard.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import Featured from "../../../admin/components/featuresChart/Featured";
import { toastMessage } from "../../../helpers";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const { token } = useSelector((state) => state.user);
  const { groupId } = useParams();
  const [fullNames, setFullNames] = useState("");
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [task, setTask] = useState([]);
  const [currentTask, setCurrentTask] = useState([]);
  const [loading, setLoading] = useState(false);

  const [group, setGroup] = useState({});

  const fetchTarget = () => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "/api/groups/" +
          groupId +
          "?token=" +
          token
      )
      .then((res) => {
        console.log("res", res.data);
        setGroup(res.data.group);
      })

      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchTarget();
  }, [groupId]);

  useEffect(() => {
    // const last = task.length - 1;
    // if (last > 0) {
    //   setCurrentTask(task[last]);
    // }
  }, [task]);

  const percentage = 66;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      amount === "" ||
      fullNames === "" ||
      phoneNumber.trim() === "" ||
      address.trim() === ""
    ) {
      toastMessage("error", "All fields on the form are required");
      setLoading(false);
    } else {
      try {
        let transactionId = uuidv4();
        if (transactionId) {
          console.log(`Generated transaction Id: ${transactionId}`);
          const organizationId = "89a16c04-75b0-4c18-ba18-b990f03d95fd";
          const description = "Sun Rise payment integration";
          let callbackUrl = `https://fan-backend.onrender.com/api/transactions/callback/payment/${transactionId}`;
          const paymentRes = await axios.post(
            "https://opay-api.oltranz.com/opay/paymentrequest",
            {
              telephoneNumber: phoneNumber,
              amount,
              organizationId: organizationId,
              description: description,
              callbackUrl: callbackUrl,
              transactionId: transactionId,
            }
          );
          if (paymentRes) {
            console.log("+++++++++++Kwishyura byakunze++++++++++++++");
            console.log("payment result", paymentRes);
            toastMessage("success", paymentRes.data.description);
            const data = {
              transactionId,
              groupId: groupId,
              amount,
              transactionStatus: paymentRes.data.status,
              senderName: fullNames,
              telephoneNumber: phoneNumber,
              address,
              token,
            };
            const localSave = await axios.post(
              process.env.REACT_APP_BACKEND_URL + "/api/transactions/",
              { data }
            );
            console.log(
              "+++++++++++dutanze komnde yo kubika transaction++++++++++++++"
            );

            if (localSave) {
              console.log(
                "+++++++++++Ya command yo kubika transaction irakunze++++++++++++++"
              );
              console.log("data is saved in db");
              // toastMessage("success", localSave);
              setAmount("");
              setFullNames("");
              setPhoneNumber("");
              setAddress("");
              setLoading(false);
              console.log("response from saving data", localSave);
            } else {
              console.log("+++++++++++Commande iranze pe++++++++++++++");
              setLoading(false);
              console.log("error in save data to database");
              toastMessage("error", "transaction not saved");
            }
          } else {
            console.log("payment to oltranz error");
          }
        } else {
          toastMessage("error", "Network error");
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    }

    // axios
    //   .post(process.env.REACT_APP_BACKEND_URL + "/api/transactions/", {
    //     transactionId: uuidv4(),
    //     amount,
    //     transactionStatus: "SUCCESS",
    //     senderName: fullNames,
    //     telephoneNumber: phoneNumber,
    //     address,
    //     task: currentTask.id,
    //   })
    //   .then((res) => {})
    //   .catch((error) => {});
  };

  return (
    <>
      <Navbar />
      <div className='userDashboard d-flex'>
        <div className='profile-main ' style={{ flex: 5 }}>
          <div className='profile-description'>
            <h2>fill the form below to make contribution</h2>
            <form className='row g-3' onSubmit={handleSubmit}>
              <div className='col-md-6'>
                <label htmlFor='Sender' className='form-label'>
                  Sender full names
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter your names'
                  required
                  value={fullNames}
                  onChange={(e) => setFullNames(e.target.value)}
                />
              </div>
              <div className='col-md-6'>
                <label htmlFor='amount' className='form-label'>
                  amount | Rwf
                </label>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Enter your support amount here'
                  value={amount}
                  required
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className='col-md-12'>
                <label htmlFor='inputText' className='form-label'>
                  telephone Number
                </label>
                <input
                  required
                  type='text'
                  className='form-control'
                  maxLength={10}
                  placeholder='enter the phone number you want to use for Mobile Money payment'
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className='col-12'>
                <label htmlFor='inputAddress' className='form-label'>
                  Address
                </label>
                <input
                  required
                  type='text'
                  className='form-control'
                  id='inputAddress'
                  placeholder='Where are you from? ex: 1234 Main St'
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </div>

              <div className='col-12'>
                <button type='submit' className='btn btn-primary'>
                  {loading ? "proceeding..." : "proceed payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div style={{ flex: 3 }}>
          <Featured group={group} />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
